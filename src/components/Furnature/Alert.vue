<template>
  <div>
    <div class="w-full p-4 border-l-4" :class="classes" role="alert">
      <p class="font-bold mb-0">{{ title }}</p>
      <p class="text-sm mb-0"><slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type'],
  data () {
    return {
      alertTypes: {
        info: {
          title: 'Info',
          classes: 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-800 dark:border-blue-600 dark:text-white'
        },
        success: {
          title: 'Success',
          classes: 'bg-green-100 border-green-500 text-green-700 dark:bg-green-800 dark:border-green-600 dark:text-white'
        },
        warning: {
          title: 'Warning',
          classes: 'bg-orange-100 border-orange-500 text-orange-700 dark:bg-orange-800 dark:border-orange-600 dark:text-white'
        },
        error: {
          title: 'Error',
          classes: 'bg-red-100 border-red-500 text-red-700 dark:bg-red-800 dark:border-red-600 dark:text-white'
        }
      }
    }
  },
  methods: {},
  computed: {
    classes () {
      return this.alertTypes[this.type].classes
    },
    title () {
      return this.alertTypes[this.type].title
    }
  }
}
</script>
