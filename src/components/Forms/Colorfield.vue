<template>
  <div
    class="group w-full field-wrapper select-none mb-2"
    :class="{
      focused: labelIsActive,
      'hasPrefix': !!this.prefixText
    }"
  >
    <label :for="fieldName"
      @click="$refs.modelValue.focus()"
      v-if="floatingLabel && label"
      class="text-black dark:text-white"
    >
      {{ label }}
    </label>
    <input
      :name="fieldName"
      :disabled="disabled"
      type="color"
      ref="modelValue"
      @input="updateInput"
      @change="updateInput"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="onEnter"
      class="form-control"
      :class="fieldStyleClasses"
      :style="inputStyles"
      :value="modelValue"
    />
    <span v-if="prefixText"
      class="prefixText"
      :class="prefixStyleClasses"
      ref="prefix"
    >
      {{ prefixText }}
    </span>
    <span
      class="text-gray-400 text-sm inset-0 italic"
      v-if="helpText"
      v-html="helpText"
    ></span>
  </div>
</template>

<script>
export default {
  name: 'ColorField',
  emits: ['update:modelValue', 'inputChange'],
  data() {
    return {
      focused: false
    }
  },
  mounted () {
    if (this.modelValue !== null && this.modelValue !== '') {
      this.focused = true
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      required: false
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
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    onBlur(event) {
      this.focused = false;
      this.saveInputValue(event);
    },
    onFocus() {
      this.focused = true;
    },
    onEnter(event) {
      this.saveInputValue(event);
    },
    saveInputValue(event) {
      let value = event.target.value;

      console.log('[ColorField] updated ', {
        name: this.$refs.modelValue.name,
        value: value
      });
      this.$emit('inputChange', {
        name: this.$refs.modelValue.name,
        value: value
      });
      this.oldValue = value;
      this.$refs.modelValue.blur();
    }
  },
  computed: {
    fieldName () {
      return this.name || null
    },
    labelIsActive () {
      if (this.focused === true) {
        return true;
      }
      if (this.$refs.modelValue && this.$refs.modelValue.value.trim() !== '') {
        return true;
      }

      return false;
    },
    helpText () {
      if (this.disabled && this.disabledText) return this.disabledText
      if (this.hint) return this.hint
      return null
    },
    fieldStyleClasses () {
      let classes = 'appearance-none block w-full text-gray-700 border border-gray-300 rounded mb-1 leading-tight outline-none focus:ring-lightBlue-100 focus:bg-white bg-gray-300 h-10'.split(' ')

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
