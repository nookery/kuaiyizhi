<template>
  <Link v-bind:href="link" v-bind:class="disabled ? 'btn-disabled' : ''" class="btn-sm btn rounded-none"
    ><Home></Home
  ></Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "../icons/home.vue";
import Link from "./Link.vue";
import store from "../models/store";

export default defineComponent({
  components: {
    Home,
    Link,
  },
  computed: {
    link(): string {
      return store.root.id;
    },
    disabled(): boolean {
      return store.current.isRoot() || store.current === store.root.first();
    },
  },
});
</script>
