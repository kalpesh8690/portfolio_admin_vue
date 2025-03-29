<template>
  <div
    class="form-group"
    :class="{
      'has-error': error,
      'is-disabled': disabled,
      'is-success': success,
    }"
  >
    <slot name="label">
      <label v-if="label" class="form-label" :for="inputId">
        {{ label }}
        <span v-if="required" class="required-indicator">*</span>
      </label>
    </slot>

    <div class="input-wrapper">
      <input
        :id="inputId"
        type="date"
        :value="value"
        @input="handleInput"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        class="form-control"
        :min="min"
        :max="max"
      />

      <!-- <span 
        v-if="clearable && value" 
        class="clear-button"
        @click="clearInput"
        role="button"
        tabindex="0"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span> -->
    </div>

    <div class="helper-text" :id="helperTextId">
      <slot name="helperText">
        <span v-if="error" class="error-text">{{ error }}</span>
        <span v-else-if="success" class="success-text">{{ success }}</span>
        <span v-else-if="helperText" class="helper-text">{{ helperText }}</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDatePicker',
  props: {
    label: {
      type: String,
      description: 'Input label'
    },
    modelValue: {
      type: String,
      description: 'Input value'
    },
    placeholder: {
      type: String,
      default: 'Select date',
      description: 'Placeholder text'
    },
    error: {
      type: String,
      description: 'Error message'
    },
    success: {
      type: String,
      description: 'Success message'
    },
    helperText: {
      type: String,
      description: 'Helper text below input'
    },
    required: {
      type: Boolean,
      default: false,
      description: 'Whether the field is required'
    },
    disabled: {
      type: Boolean,
      default: false,
      description: 'Whether the input is disabled'
    },
    clearable: {
      type: Boolean,
      default: false,
      description: 'Whether to show clear button'
    },
    min: {
      type: String,
      description: 'Minimum date allowed'
    },
    max: {
      type: String,
      description: 'Maximum date allowed'
    }
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  data() {
    return {
      focused: false,
      inputId: `datepicker-${Math.random().toString(36).substr(2, 9)}`
    };
  },
  computed: {
    helperTextId() {
      return `helper-${this.inputId}`;
    },
    value: {
      get() {
        this.loadValue();
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
        this.$emit('change', value);
      }
    }
  },
  methods: {
    loadValue() {
      if (this.modelValue) {
        const date = new Date(this.modelValue);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        this.value = `${year}-${month}-${day}`;
      } else {
        this.value = '';
      }
    },
    handleInput(event) {
      this.value = event.target.value;
    },
    handleFocus() {
      this.focused = true;
      this.$emit('focus');
    },
    handleBlur() {
      this.focused = false;
      this.$emit('blur');
    },
    clearInput() {
      this.$emit('update:modelValue', '');
      this.$emit('clear');
    }
  }
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 1.5rem;
  position: relative;

  .form-label {
    display: block;
    margin-bottom: 0.75rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--text-color);
    transition: all 0.2s ease;
    letter-spacing: -0.01em;

    .required-indicator {
      color: var(--danger-color);
      margin-left: 0.25rem;
      font-weight: 600;
    }
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--bg-color);
    border-radius: 8px;
    transition: all 0.2s ease;
    border: 1px solid var(--border-color);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    &:hover {
      border-color: var(--primary-color-light);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    &.is-focused {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px var(--primary-color-light);
    }

    &.has-error {
      border-color: var(--danger-color);
      box-shadow: 0 0 0 3px var(--danger-color-light);
    }

    &.is-success {
      border-color: var(--success-color);
      box-shadow: 0 0 0 3px var(--success-color-light);
    }
  }

  .form-control {
    display: block;
    width: 100%;
    height: 44px;
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
    line-height: 1.5;
    color: var(--text-color);
    background-color: transparent;
    border: none;
    border-radius: 8px;
    transition: all 0.2s ease;

    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.2s ease;
      padding: 4px;
      border-radius: 4px;
    }

    &:hover::-webkit-calendar-picker-indicator {
      opacity: 1;
      background-color: var(--bg-color-secondary);
    }

    &::placeholder {
      color: var(--text-color-secondary);
      opacity: 0.6;
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      background-color: var(--bg-color-secondary);
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .clear-button {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-color-secondary);
    transition: all 0.2s ease;
    border-radius: 6px;
    z-index: 1;

    &:hover {
      color: var(--text-color);
      background: var(--bg-color-secondary);
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .helper-text {
    margin-top: 0.5rem;
    font-size: 0.8125rem;
    line-height: 1.5;

    .error-text {
      color: var(--danger-color);
      font-weight: 500;
    }

    .success-text {
      color: var(--success-color);
      font-weight: 500;
    }

    .helper-text {
      color: var(--text-color-secondary);
      opacity: 0.8;
    }
  }
}
</style> 