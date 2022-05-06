<template>
  <button
    :class="[this.buttonClasses]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script>

const PRIMARY = 'PRIMARY'
const WARN = 'WARN'
const INFO = 'INFO'
const SUCCESS = 'SUCCESS'
const SUBMIT = 'SUBMIT'

const ButtonTypes = [
  PRIMARY,
  WARN,
  INFO,
  SUCCESS,
  SUBMIT
]

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ButtonTypes.includes(value.toUpperCase())
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      buttonData: {
        PRIMARY: {
          title: PRIMARY,
          classes: 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-800 dark:border-blue-600 dark:text-white'
        },
        WARN: {
          title: WARN,
          // classes: 'bg-green-100 border-green-500 text-green-700 dark:bg-green-800 dark:border-green-600 dark:text-white'
          classes: 'bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white rounded p-3 py-1 h-12 mx-1 transition'
        },
        INFO: {
          title: INFO,
          classes: 'bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white rounded shadow-lg p-3 py-1 h-12 mx-1 text-base align-baseline'
        },
        SUCCESS: {
          title: SUCCESS,
          classes: 'bg-green-500 hover:bg-green-700 text-white dark:text-white hover:cursor-pointer'
          // dark:bg-green-800 dark:border-green-600
        },
        SUBMIT: {
          title: SUBMIT,
          classes: 'w-full flex justify-center py-2 px-4 border-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-portal-orange hover:bg-portal-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-portal-orange-500/40'
        }
      }
    }
  },
  computed: {
    typeName () {
      return this.type.toUpperCase()
    },
    buttonClasses () {
      const defaultClasses = ' rounded p-3 shadow-lg '
      if (this.disabled) {
        return defaultClasses + 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed hover:cursor-not-allowed';
      }

      if (this.buttonData.hasOwnProperty(this.typeName)) {
        return this.buttonData[this.typeName].classes + defaultClasses;
      }

      return ''
    }
  }
}
</script>
