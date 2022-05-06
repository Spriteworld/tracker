<template>
  <ul class="p-0 leading-tight">
    <li
      v-for="item in items"
      @click="handleNavClick(item)"
      class="rounded mb-1 flex items-center p-2 transition transition-bg select-none"
      :class="{
        'cursor-pointer': activeRoute !== item.route,
        'bg-gray-700': activeRoute === item.route,
        'text-gray-600 cursor-not-allowed': item.disabled,
        'hover:bg-gray-700': !item.disabled
      }"
      :key="item.route"
    >
      <span class="leading-normal">{{ item.title }}</span>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',

  data () {
    return {
      route: '',
      items: [
      ]
    }
  },

  methods: {
    handleNavClick (item) {
      if (item.disabled) {
        return;
      }

      const route = { name: item.route };
      if (route.name === this.$route.name) {
        return;
      }

      this.$emit('navigated');
      this.$router.push(route).catch(err => err);
    },
    isActive (item) {
      return item.route === this.$route.name;
    }
  },

  computed: {
    activeRoute () {
      return this.$route.name;
    }
  }
}
</script>
