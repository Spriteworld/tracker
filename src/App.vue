<template>
  <div id="app" class="flex min-h-screen text-gray-200 dark:text-white">
    <RouterView />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapFields } from 'vuex-map-fields';
import DebugFlag from "@/mixins/DebugFlag";

export default {
  name: "App",

  beforeMount() {
    this.$store.dispatch('app/initTheme');
  },

  computed: {
    ...mapFields('app', [
      'theme'
    ]),
  },

  watch: {
    theme(newTheme) {
      if (DebugFlag('store')) {
        console.log('[THEME] watch '+newTheme);
      }
      newTheme.toLowerCase() === "light"
        ? document.querySelector("html").classList.remove("dark")
        : document.querySelector("html").classList.add("dark");
    },
  },
};
</script>
