<template>
  <div
    class="justify-center h-full flex flex-grow p-0 breadcrumbs overflow-visible bg-gradient-to-r from-sky-200/60 via-sky-200/90 to-sky-200/60 dark:from-sky-800/80 dark:via-sky-900 dark:to-sky-800/80"
    v-bind:class="{ 'text-yellow-500': inEditMode }"
  >
    <ul class="flex flex-row justify-center">
      <li v-for="breadcrumb in breadcrumbs" class="flex justify-center">
        <div class="dropdown dropdown-top flex justify-center" v-if="breadcrumb.brothers().length > 0">
          <label tabindex="0" class="self-center">{{ breadcrumb.title }}</label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 h-96 mt-8 overflow-scroll"
          >
            <li
              v-for="brother in breadcrumb.brothers()"
              draggable="true"
              v-on:dragend="dragEnd()"
              v-on:dragstart="dragStart(brother)"
              v-on:dragenter="dragEnter(brother)"
              class="flex flex-row min-w-fit"
            >
              <!-- 拖移时显示 -->
              <div
                class="w-full mx-0 min-w-fit overflow-hidden"
                v-bind:class="brother.id == hovered.id ? 'h-12 py-6 px-0' : 'h-0 py-0 px-0'"
              >
                <div class="bg-base-content/10 w-full h-12 rounded"></div>
              </div>

              <Link
                v-bind:href="brother.id"
                v-bind:class="{
                  active: brother.isActivated(),
                  'hover:bg-transparent': dragged !== emptyNode,
                }"
              >
                <span v-text="brother.order"></span>
                <span>{{ brother.title }}</span>
              </Link>
            </li>

            <li
              draggable="true"
              v-on:dragend="dragEnd()"
              v-on:dragenter="dragEnter(bottomNode)"
              class="flex flex-row min-w-fit"
            >
              <!-- 拖移时显示 -->
              <div class="w-full px-0 h-0" v-bind:class="bottomNode !== hovered ? '' : 'bg-base-content/10 h-12'"></div>
            </li>
          </ul>
        </div>
        <div class="dropdown dropdown-top flex justify-center" v-else>
          <label tabindex="0" class="rounded-none self-center">{{ breadcrumb.title }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import node from "../models/node";
import Link from "./Link.vue";
import log from "../models/log";

export default defineComponent({
  data() {
    let emptyNode = new node();
    let bottomNode = new node("/dev/null");
    return {
      dragged: emptyNode,
      hovered: emptyNode,
      emptyNode: emptyNode,
      bottomNode: bottomNode,
    };
  },
  computed: {
    breadcrumbs() {
      log.info("Breadcrumbs.vue", "获取breadcrumbs");
      let breadcrumbs = store.getRoot().activated(store.getCurrentNode().id);

      return breadcrumbs;
    },
    inEditMode(): boolean {
      return store.edit_mode;
    },
  },
  methods: {
    dragStart(navigator: node) {
      this.dragged = navigator;
    },
    dragEnd() {
      let newOrder = this.bottomNode == this.hovered ? this.dragged.parent().children.length + 1 : this.hovered.order;
      store.goto(this.dragged.parent().id);
      store.updateOrder(this.dragged, newOrder).id;
      this.hovered = null;
    },
    dragEnter(navigator: node) {
      this.hovered = navigator;
    },
  },
  components: { Link },
});
</script>
