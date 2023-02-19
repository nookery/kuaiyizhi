import fs from "fs"
import path from "path"
import Id from "./Id";
import Variables from "./Variables";
import RouteController from "../controllers/RouteController";
import Markdown from "./Markdown";
import FileTree from "../tools/FileTree";
import Config from "./Config";

class BookNode {
    public path: string = ''
    public name: string = ''
    public id: string = ''
    public errorTitle: string = ''
    public errorLines: string[] = []

    public constructor(absolutePath?: string) {
        if (absolutePath != undefined) {
            // console.log('初始化图书节点', absolutePath)

            if (!fs.existsSync(absolutePath)) {
                this.errorTitle = '文件或目录不存在'
                this.errorLines.push(absolutePath)
            }

            if (BookNode.shouldIgnore(absolutePath)) {
                this.errorTitle = '该节点应该被忽略'
                this.errorLines.push(absolutePath)
            }

            this.path = absolutePath
            this.name = path.basename(this.path)
            this.id = Id.pathToId(this.path)
        } else {
            this.errorTitle = '当前节点为空节点'
        }
    }

    public isEmpty(): boolean {
        return this.hasError()
    }

    public isPage(): boolean {
        return this.isEmpty() || fs.statSync(this.path).isFile()
    }

    public isChapter(): boolean {
        return !this.isPage() && !this.isBook()
    }

    public refreshChildren(): BookNode[] {
        if (this.isPage()) return []

        // 从配置文件读取
        let childrenConfig = this.getChildrenConfig()
        if (childrenConfig.length > 0) {
            return childrenConfig.map((childId: string) => {
                return new BookNode(Id.idToPath(childId))
            });
        }

        // 从文件系统读取
        let children = fs.readdirSync(this.path).filter(element => {
            return !BookNode.shouldIgnore(element)
        }).map(child => {
            return new BookNode(path.join(this.path, child))
        })

        this.setChildrenConfig(children)

        return children
    }

    public getChildren(): BookNode[] {
        return this.refreshChildren()
    }

    public getChildrenIds(): string[] {
        return this.getChildren().map(child => {
            return child.id
        })
    }

    private getChildrenConfig(): string[] {
        return Config.get('children_settings:' + this.id)
    }

    private setChildrenConfig(children: BookNode[]) {
        Config.set('children_settings:' + this.id, children.map(child => {
            return child.id
        }))
    }

    public isBook(): boolean {
        return path.dirname(this.path) == Variables.markdownRootPath
    }

    public siblings(): BookNode[] {
        // console.log('get siblings', this.id)
        return this.getParent().getChildren().filter(child => {
            return child.id != this.id
        })
    }

    public getParent(): BookNode {
        if (this.isEmpty()) return Variables.emptyBookNode

        let dir = path.dirname(this.path)

        return new BookNode(dir)
    }

    public getParents(): BookNode[] {
        if (this.isEmpty()) return []

        let parents = (new FileTree(this.path)).getParentsPaths(Variables.markdownRootPath)

        return parents.map(parent => {
            return new BookNode(parent)
        }).reverse()
    }

    public getFirstChild(): BookNode {
        let children = this.getChildren()
        let first = children.at(0)

        return first == undefined ? new BookNode : first
    }

    public getBook(): BookNode {
        if (this.isEmpty()) return Variables.emptyBookNode

        let parent = this.getParent()

        if (parent.isBook()) return parent

        return parent.getBook()
    }

    public hasError(): boolean {
        return this.errorTitle.length > 0
    }

    public isActivated() {
        let currentPage = RouteController.getCurrentPage()
        let activatedBookNodes = currentPage.getParents()

        return activatedBookNodes.includes(this)
    }

    static shouldIgnore(absolutePath: string) {
        return Variables.nodeExcepts.includes(path.basename(absolutePath))
    }

    public content(): string {
        return this.hasError() ? Markdown.renderErrorPage(this.errorTitle, this.errorLines) : (new Markdown(this.path)).content()
    }

    // 获取markdown渲染后的HTML
    public html() {
        return this.hasError() ? Markdown.renderErrorPage(this.errorTitle, this.errorLines) : (new Markdown(this.path)).html()
    }

    // 获取markdown渲染后的HTML，带TOC
    public htmlWithToc() {
        return this.hasError() ? Markdown.renderErrorPage(this.errorTitle, this.errorLines) : (new Markdown(this.path)).htmlWithToc()
    }

    public toc(): string {
        return this.hasError() ? Markdown.renderErrorPage(this.errorTitle, this.errorLines) : (new Markdown(this.path)).toc()
    }


    public firstPage(): BookNode {
        return this.isPage() ? this : this.getFirstChild().firstPage()
    }

    public prev(): BookNode | null {
        let siblingsIncludeCurrent = this.getParent().getChildren()
        for (let i = 0; i < siblingsIncludeCurrent.length; i++) {
            let current = siblingsIncludeCurrent[i]
            if (current.id == this.id && i - 1 >= 0) {
                return siblingsIncludeCurrent[i - 1]
            }
        }

        return new BookNode
    }

    public next(): BookNode {
        let siblingsIncludeCurrent = this.getParent().getChildren()
        for (let i = 0; i < siblingsIncludeCurrent.length; i++) {
            let current = siblingsIncludeCurrent[i]
            if (current.id == this.id && i + 1 < siblingsIncludeCurrent.length) {
                return siblingsIncludeCurrent[i + 1]
            }
        }

        return new BookNode
    }
}

export default BookNode