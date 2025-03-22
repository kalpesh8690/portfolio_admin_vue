<template>
  <div
    class="form-group"
    :class="{
      'has-icon': hasIcon,
      'is-focused': focused,
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
      <slot name="addonLeft">
        <span v-if="addonLeftIcon" class="input-icon input-icon-left">
          <i :class="addonLeftIcon"></i>
        </span>
      </slot>

      <slot>
        <input
          :id="inputId"
          :value="value"
          v-bind="$attrs"
          v-on="listeners"
          :disabled="disabled"
          :required="required"
          :aria-invalid="!!error"
          :aria-describedby="helperTextId"
          class="form-control"
        />
      </slot>

      <slot name="addonRight">
        <span v-if="addonRightIcon" class="input-icon input-icon-right">
          <i :class="addonRightIcon"></i>
        </span>
      </slot>

      <span 
        v-if="clearable && value" 
        class="clear-button"
        @click="clearInput"
        role="button"
        tabindex="0"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>
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
  inheritAttrs: false,
  name: "base-input",
  props: {
    label: {
      type: String,
      description: "Input label"
    },
    value: {
      type: [String, Number],
      description: "Input value"
    },
    addonRightIcon: {
      type: String,
      description: "Input icon on the right"
    },
    addonLeftIcon: {
      type: String,
      description: "Input icon on the left"
    },
    error: {
      type: String,
      description: "Error message"
    },
    success: {
      type: String,
      description: "Success message"
    },
    helperText: {
      type: String,
      description: "Helper text below input"
    },
    required: {
      type: Boolean,
      default: false,
      description: "Whether the field is required"
    },
    disabled: {
      type: Boolean,
      default: false,
      description: "Whether the input is disabled"
    },
    clearable: {
      type: Boolean,
      default: false,
      description: "Whether to show clear button"
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    return {
      focused: false,
      inputId: `input-${Math.random().toString(36).substr(2, 9)}`
    };
  },
  computed: {
    hasIcon() {
      const { addonRight, addonLeft } = this.$slots;
      return (
        addonRight !== undefined ||
        addonLeft !== undefined ||
        this.addonRightIcon !== undefined ||
        this.addonLeftIcon !== undefined
      );
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
        focus: this.onFocus
      };
    },
    helperTextId() {
      return `helper-${this.inputId}`;
    }
  },
  methods: {
    onInput(evt) {
      this.$emit("input", evt.target.value);
    },
    onFocus() {
      this.focused = true;
      this.$emit("focus");
    },
    onBlur() {
      this.focused = false;
      this.$emit("blur");
    },
    clearInput() {
      this.$emit("input", "");
      this.$emit("clear");
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
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4a5568;
    transition: color 0.2s ease;

    .required-indicator {
      color: #e53e3e;
      margin-left: 0.25rem;
    }
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #2d3748;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    transition: all 0.2s ease;

    &::placeholder {
      color: #a0aec0;
    }

    &:focus {
      outline: none;
      border-color: #4299e1;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
    }

    &:disabled {
      background-color: #f7fafc;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  .input-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    pointer-events: none;

    &.input-icon-left {
      left: 0;
      + .form-control {
        padding-left: 2.5rem;
      }
    }

    &.input-icon-right {
      right: 0;
      + .form-control {
        padding-right: 2.5rem;
      }
    }

    i {
      font-size: 1rem;
    }
  }

  .clear-button {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a0aec0;
    transition: all 0.2s ease;

    svg {
      width: 1rem;
      height: 1rem;
    }

    &:hover {
      color: #718096;
      background-color: #f7fafc;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
    }
  }

  .helper-text {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    line-height: 1.25;
    
    .error-text {
      color: #e53e3e;
    }
    
    .success-text {
      color: #48bb78;
    }
    
    .helper-text {
      color: #718096;
    }
  }

  // States
  &.is-focused {
    .form-label {
      color: #4299e1;
    }

    .input-icon {
      color: #4299e1;
    }
  }

  &.has-error {
    .form-label {
      color: #e53e3e;
    }

    .form-control {
      border-color: #e53e3e;
      
      &:focus {
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.15);
      }
    }

    .input-icon {
      color: #e53e3e;
    }
  }

  &.is-success {
    .form-control {
      border-color: #48bb78;
      
      &:focus {
        box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.15);
      }
    }
  }

  &.is-disabled {
    .form-label {
      opacity: 0.7;
    }

    .input-icon {
      opacity: 0.7;
    }
  }

  // Dark theme support
  @media (prefers-color-scheme: dark) {
    .form-label {
      color: #e2e8f0;
    }

    .form-control {
      color: #f7fafc;
      background-color: #2d3748;
      border-color: #4a5568;

      &::placeholder {
        color: #718096;
      }

      &:focus {
        border-color: #63b3ed;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
      }

      &:disabled {
        background-color: #1a202c;
      }
    }

    .input-icon {
      color: #718096;
    }

    .clear-button {
      color: #718096;

      &:hover {
        color: #e2e8f0;
        background-color: #4a5568;
      }
    }

    &.is-focused {
      .form-label {
        color: #63b3ed;
      }

      .input-icon {
        color: #63b3ed;
      }
    }
  }
}
</style>
