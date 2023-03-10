import fs from "fs"
import path from "path"
import hljs from 'highlight.js'

const md = require('markdown-it')({
    html: true,
    highlight: function (str: any, lang: any) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) { }
        }

        return ''; // 使用额外的默认转义
    }
});

md.use(require("markdown-it-anchor").default)
md.use(require("markdown-it-table-of-contents"), {
    'includeLevel': [1, 2, 3, 4]
})

/**
 * 项目的定义
 */
class project {
    public static excepts = ['.DS_Store']
    public file: string = ''
    public id: string = ''
    public title: string = ''
    public children: project[] = []
    public isFolder: boolean = false

    public constructor(file?: string) {
        if (file && path.basename(file) != '.DS_Store') {
            this.file = file
            this.id = file
            this.title = path.basename(this.file)
            this.isFolder = fs.statSync(file).isDirectory()
            if (fs.statSync(file).isDirectory()) {
                this.children = this.getChildren()
            }
        }
    }

    /**
     * 判断是否是空项目
     * 
     * @returns boolean
     */
    public isEmpty(): boolean {
        return this.file == '' || this.file == undefined
    }

    /**
     * 不是空项目则返回true
     * 
     * @returns boolean
     */
    public notEmpty(): boolean {
        return !this.isEmpty()
    }

    /**
     * 新建文件
     * 
     * @param $name 
     * @returns 
     */
    public makeFile($name = ''): void {
        fs.writeFileSync(path.join(this.file, $name), '')
        this.children = this.getChildren()
    }

    /**
     * 删除文件
     * 
     * @param $name 
     * @returns 
     */
    public deleteFile($name = ''): void {
        fs.unlinkSync(path.join(this.file, $name))
        this.children = this.getChildren()
    }

    private getChildren(): project[] {
        let projectPath = this.file
        let files: project[] = []
        let folders: project[] = []

        fs.readdirSync(this.file).forEach(function (child) {
            if (!project.excepts.includes(child)) {
                let childPath = path.join(projectPath, child)
                if (fs.statSync(childPath).isDirectory()) {
                    folders.push(new project(childPath))
                } else {
                    files.push(new project(childPath))
                }
            }
        })

        return folders.concat(files)
    }

    public getContent(): string {
        return fs.readFileSync(this.file, 'utf-8')
    }

    public getLanguage(): string {
        let extname = path.extname(this.file)
        console.log(extname)

        switch (extname) {
            case '.ts':
                return 'typescript'
            case '.css':
                return 'css'
            case '.go':
                return 'go'
            case '.py':
            default:
                return 'python'
        }
    }
}

export default project