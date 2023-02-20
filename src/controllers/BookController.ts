import { reactive } from 'vue'
import Config from '../entities/Config'
import BookNode from '../entities/BookNode'

const BookController = reactive({
    rootBookNode: new BookNode,

    getRoot(): BookNode {
        return this.rootBookNode.isEmpty() ? new BookNode(Config.markdownRootPath) : this.rootBookNode
    },

    search(name: string): BookNode[] {
        return this.getRoot().search(name)
    }
})

export default BookController