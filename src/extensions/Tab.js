import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import Tab from "./Tab.vue";

export default Node.create({
  name: "tab",
  group: "block",
  // content: "block*",

  // 将什么样的HTML转化成tab
  // 这样的：<tab tabs="第一个tab的内容,第二个tab的内容,第三个tab的内容"></tab>
  parseHTML() {
    return [
      {
        tag: "tab",
      },
    ];
  },

  // 定义属性
  // 存储到HTML中是这样的：<tab tabs="[第一个tab的内容,第二个tab的内容,第三个tab的内容]"></tab>
  addAttributes() {
    return {
      tabs: {
        default: [],
      },
    };
  },

  // 将数据转换成HTML
  renderHTML({ HTMLAttributes, node }) {
    // 第一个参数是HTML标签的名字
    // 第二个参数如果是object，将会被当成标签的属性
    // 后面的参数都是标签的子元素
    return ["tab", HTMLAttributes];
  },

  addNodeView() {
    return VueNodeViewRenderer(Tab);
  },

  addCommands() {
    return {
      addTab:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent('<tab tabs=["1","2","3"]></tab>');
        },
    };
  },
});