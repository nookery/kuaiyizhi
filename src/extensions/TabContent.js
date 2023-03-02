import { Node } from "@tiptap/core";

export default Node.create({
  name: "tabContent",
  group: "block",
  // draggable: true,
  // 子元素都是block
  content: "block*",

  // 将什么样的HTML转化成tab
  // 这样的：<tab-content></tab-content>
  parseHTML() {
    return [{ tag: "tab-content" }];
  },

  // 将数据转换成HTML
  renderHTML({ HTMLAttributes, node }) {
    // 第一个参数是HTML标签的名字
    // 第二个参数如果是object，将会被当成标签的属性
    // 后面的参数都是标签的子元素
    return ["tab-content", HTMLAttributes, 0];
  },
});
