<template>
  <button
    id="navbartoggle"
    type="button"
    class="inline-flex items-center justify-center text-gray-800 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none focus:ring-0"
    aria-controls="sidebar-menu"
    aria-expanded="false"
    x-bind:aria-expanded="navOpen.toString()"
    @click="$emit('toggled', !navOpen)"
  >
    <span class="sr-only">Mobile menu</span>
    <svg
      :x-description="navOpen ? 'Icon Open' : 'Icon Closed'"
      x-state:on="Menu open"
      x-state:off="Menu closed"
      class="h-8 w-8 block"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        :class="{
          '': navOpen,
          'hidden': !navOpen,
        }"
        fill-rule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      ></path>
      <path
        :class="{
          'hidden': navOpen,
          '': !navOpen,
        }"
        d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
      ></path>
    </svg>
  </button>
</template>

<script>
export default {
  props: ['navOpen']
}
</script>
