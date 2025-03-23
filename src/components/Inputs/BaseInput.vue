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
    margin-bottom: 0.75rem;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-color);
    transition: all 0.3s ease;
    letter-spacing: -0.01em;

    .required-indicator {
      color: var(--danger-color);
      margin-left: 0.25rem;
      font-weight: 700;
    }
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--bg-color);
    border-radius: 12px;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);

    &:hover {
      border-color: var(--primary-color-light);
    }
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 0.875rem 1.25rem;
    font-size: 0.9375rem;
    line-height: 1.5;
    color: var(--text-color);
    background-color: transparent;
    border: none;
    border-radius: 12px;
    transition: all 0.3s ease;

    &::placeholder {
      color: var(--text-color-secondary);
      opacity: 0.7;
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      background-color: var(--bg-color-secondary);
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  .input-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-color-secondary);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    pointer-events: none;

    &.input-icon-left {
      left: 0;
      + .form-control {
        padding-left: 3rem;
      }
    }

    &.input-icon-right {
      right: 0;
      + .form-control {
        padding-right: 3rem;
      }
    }

    i {
      font-size: 1.125rem;
    }
  }

  .clear-button {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-color-secondary);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;

    &:hover {
      background-color: var(--hover-bg);
      color: var(--text-color);
      transform: translateY(-50%) scale(1.1);
    }

    svg {
      width: 1.125rem;
      height: 1.125rem;
    }
  }

  .helper-text {
    margin-top: 0.5rem;
    font-size: 0.8125rem;
    line-height: 1.5;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .error-text {
      color: var(--danger-color);
      display: flex;
      align-items: center;
      gap: 0.375rem;

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        background: var(--danger-color);
        border-radius: 50%;
      }
    }

    .success-text {
      color: var(--success-color);
      display: flex;
      align-items: center;
      gap: 0.375rem;

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        background: var(--success-color);
        border-radius: 50%;
      }
    }

    .helper-text {
      color: var(--text-color-secondary);
    }
  }

  // States
  &.is-focused {
    .form-label {
      color: var(--primary-color);
    }

    .input-wrapper {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px var(--primary-color-light);
    }

    .input-icon {
      color: var(--primary-color);
    }
  }

  &.has-error {
    .input-wrapper {
      border-color: var(--danger-color);
      box-shadow: 0 0 0 4px var(--danger-color-light);
    }

    .input-icon {
      color: var(--danger-color);
    }
  }

  &.is-success {
    .input-wrapper {
      border-color: var(--success-color);
      box-shadow: 0 0 0 4px var(--success-color-light);
    }

    .input-icon {
      color: var(--success-color);
    }
  }

  &.is-disabled {
    .input-wrapper {
      background-color: var(--bg-color-secondary);
      border-color: var(--border-color);
    }

    .input-icon {
      opacity: 0.7;
    }
  }

  // Responsive adjustments
  @media (max-width: 768px) {
    margin-bottom: 1.25rem;

    .form-label {
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .form-control {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
    }

    .input-icon {
      width: 2.5rem;

      &.input-icon-left + .form-control {
        padding-left: 2.5rem;
      }

      &.input-icon-right + .form-control {
        padding-right: 2.5rem;
      }
    }
  }
}
</style>
