<template>
  <div
    class="justify-center flex flex-grow p-0 breadcrumbs overflow-visible"
    v-bind:class="inEditMode ? 'text-yellow-500' : ''"
  >
    <ul class="flex flex-row justify-center">
      <li v-for="breadcrumb in breadcrumbs" class="flex justify-center">
        <div class="dropdown dropdown-top flex justify-center" v-if="breadcrumb.children.length > 0">
          <label tabindex="0" class="self-center">{{ breadcrumb.title }}</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 h-96 overflow-scroll">
            <li
              v-for="child in breadcrumb.children"
              draggable="true"
              v-on:dragend="dragEnd()"
              v-on:dragstart="dragStart(child)"
              v-on:dragenter="dragEnter(child)"
              class="flex flex-row min-w-fit"
            >
              <!-- 拖移时显示 -->
              <div class="bg-base-content w-full p-0" v-bind:class="child === hovered ? 'h-4' : ''"></div>
              <router-link v-bind:to="child.link" active-class="active">
                <span v-text="child.getParent()?.findKey(child.id)"></span>
                <span>{{ child.title }}</span>
              </router-link>
            </li>

            <li
              draggable="true"
              v-on:dragend="dragEnd()"
              v-on:dragenter="dragEnter(bottomNode)"
              class="flex flex-row min-w-fit"
            >
              <!-- 拖移时显示 -->
              <div class="w-full p-0 h-4" v-bind:class="bottomNode !== hovered ? '' : 'bg-base-content '"></div>
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
import ArrowRightCircle from "../icons/arrow-right-circle.vue";
import Address from "./Address.vue";
import node from "../models/node";
import { unescape } from "querystring";

export default defineComponent({
  data() {
    let emptyNode = new node();
    return {
      dragged: emptyNode,
      hovered: emptyNode,
      emptyNode: emptyNode,
      bottomNode: new node("/bottom"),
    };
  },
  computed: {
    breadcrumbs() {
      let breadcrumbs = store.root.activated(unescape(this.$route.path));

      return breadcrumbs;
    },
    inEditMode(): boolean {
      return this.$route.name === "editor";
    },
  },
  methods: {
    dragStart(navigator: node) {
      this.dragged = navigator;
    },
    dragEnd() {
      let newOrder =
        this.bottomNode == this.hovered
          ? this.dragged.getParent().children.length + 1
          : this.dragged.getParent().findKey(this.hovered.id);

      this.$router.push(this.hovered.link);
      store.updateOrder(this.dragged, newOrder);
    },
    dragEnter(navigator: node) {
      this.hovered = navigator;
    },
  },
  // created: function () {
  //   console.log("breadcrumbs created,current route path is", this.$route.path);
  // },
  // mounted: function () {
  //   console.log("breadcrumbs mounted,current route path is", this.$route.path);
  // },
  components: { ArrowRightCircle, Address },
});
</script>