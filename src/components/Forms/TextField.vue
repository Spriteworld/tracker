<template>
  <div
    class="group w-full field-wrapper select-none"
    :class="{focused: labelIsActive, 'hasPrefix': !!this.prefixText}"
  >
    <label :for="fieldName" @click="$refs.inputValue.focus()" v-if="floatingLabel && label" class="text-black dark:group-focus:text-white">
      {{ label }}
    </label>
    <input
      :name="fieldName"
      :disabled="disabled"
      :value="value"
      type="text"
      @input="updateValue"
      ref="inputValue"
      @focus="focused = true"
      @blur="focused = false"
      @keydown.enter="enterPressed"
      class="form-control"
      :class="fieldStyleClasses"
      :style="inputStyles"
      :placeholder="placeholderText"
    >
    <span v-if="prefixText" class="prefixText" :class="prefixStyleClasses" ref="prefix">{{prefixText}}</span>
    <span
      class="text-gray-400 text-sm inset-0 italic"
      v-if="helpText"
    >
      {{helpText}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  data () {
    return {
      focused: false
    }
  },
  created () {
  },
  mounted () {
    if (this.value !== null && this.value !== '') {
      this.focused = true
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      required: true
    },
    label: {
      type: String,
      required: false
    },
    floatLabel: {
      type: Boolean,
      default () {
        return false
      }
    },
    autoFocus: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    disabledText: {
      type: String,
      required: false
    },
    hint: {
      type: String,
      required: false
    },
    prefixText: {
      type: String,
      required: false
    }
  },
  methods: {
    updateValue () {
      this.$emit('input', this.$refs.inputValue.value)
    },
    enterPressed () {
      this.$emit('input', this.$refs.inputValue.value)
      this.$refs.inputValue.blur()
      this.$emit('close')
    }
  },
  computed: {
    fieldName () {
      return this.name || null
    },
    labelIsActive () {
      return this.focused === true || this.value || (this.$refs.inputValue && this.$refs.inputValue.value !== '')
    },
    helpText () {
      if (this.disabled && this.disabledText) return this.disabledText
      if (this.hint) return this.hint
      return null
    },
    fieldStyleClasses () {
      let classes = 'appearance-none block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-portal-orange focus:border-portal-orange text-base'.split(' ')

      if (this.disabled) classes = [...classes, 'opacity-50', 'cursor-not-allowed']

      if (this.prefixText) classes = [...classes, '']

      return classes
    },
    prefixStyleClasses () {
      return 'text-gray-700 py-3 px-3'
    },
    inputStyles () {
      if (!this.prefixText) return

      return 'padding-left: 85px !important;'
    },
    floatingLabel () {
      return this.floatLabel ? this.label : null
    },
    placeholderText () {
      return this.floatLabel ? null : this.label
    }
  }
}
</script>
