import { createApp } from 'vue'
import { createStore } from 'vuex'
import { ipcRenderer } from 'electron'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from './components/Layout.vue'
import EditorVue from './components/Editor.vue'
import mavonEditor from 'mavon-editor'
import MarkdownVue from './components/Markdown.vue'
import 'mavon-editor/dist/css/index.css'
import './app.css'

const routes = [
  { path: '/', redirect: '/article/welcome' },
  { path: '/article/:path', component: MarkdownVue, props: true },
  { path: '/editor/:path', component: EditorVue, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      full_screen: false
    }
  },
  mutations: {
    setFullScreen(state: { full_screen: boolean }) {
      state.full_screen = true
    },
    setNotFullScreen(state) {
      state.full_screen = false
    },
  }
})

ipcRenderer.on('main-process-message', (_event, ...args) => {
  if (args[0] === 'enter-full-screen') {
    // console.log('enter full screen')
    store.commit('setFullScreen')
  }

  if (args[0] === 'leave-full-screen') {
    // console.log('leave full screen')
    store.commit('setNotFullScreen')
  }

  console.log('[main process message]', ...args)
})

const app = createApp(Layout)
app.use(router)
app.use(mavonEditor)
app.use(store)
app.mount('#app')