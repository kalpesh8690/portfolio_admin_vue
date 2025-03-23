<template>
  <div 
    class="checkbox-wrapper"
    :class="[
      { 'is-disabled': disabled },
      { 'is-inline': inline },
      { 'is-checked': model },
      { 'is-touched': touched }
    ]"
  >
    <label :for="cbId" class="checkbox-label">
      <input
        :id="cbId"
        type="checkbox"
        :disabled="disabled"
        :required="required"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${cbId}-error` : undefined"
        v-model="model"
        class="checkbox-input"
        @focus="onFocus"
        @blur="onBlur"
      />
      <span class="checkbox-control">
        <svg class="checkbox-check" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 6L9 17L4 12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="checkbox-text">
        <slot>
          <span v-if="inline">&nbsp;</span>
        </slot>
      </span>
    </label>
    <div v-if="error" :id="`${cbId}-error`" class="checkbox-error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "base-checkbox",
  model: {
    prop: "checked"
  },
  props: {
    checked: {
      type: [Array, Boolean],
      description: "Whether checkbox is checked"
    },
    disabled: {
      type: Boolean,
      default: false,
      description: "Whether checkbox is disabled"
    },
    required: {
      type: Boolean,
      default: false,
      description: "Whether checkbox is required"
    },
    inline: {
      type: Boolean,
      default: false,
      description: "Whether checkbox should be inline"
    },
    error: {
      type: String,
      default: "",
      description: "Error message"
    }
  },
  data() {
    return {
      cbId: `cb-${Math.random().toString(36).substr(2, 9)}`,
      touched: false,
      focused: false
    };
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(checked) {
        if (!this.touched) {
          this.touched = true;
        }
        this.$emit("input", checked);
        this.$emit("change", checked);
      }
    }
  },
  methods: {
    onFocus() {
      this.focused = true;
      this.$emit("focus");
    },
    onBlur() {
      this.focused = false;
      this.$emit("blur");
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  position: relative;
  margin-bottom: 1rem;

  &.is-inline {
    display: inline-flex;
    margin-right: 1rem;
  }

  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;

    .checkbox-label {
      cursor: not-allowed;
    }
  }
}

.checkbox-label {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 0.25rem 0;
  margin: 0;
  user-select: none;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:focus + .checkbox-control {
    box-shadow: 0 0 0 3px var(--primary-color-light);
  }

  &:checked + .checkbox-control {
    background-color: var(--primary-color);
    border-color: var(--primary-color);

    .checkbox-check {
      transform: scale(1);
      opacity: 1;
    }
  }

  &:disabled + .checkbox-control {
    background-color: var(--bg-color-secondary);
    border-color: var(--border-color);
  }
}

.checkbox-control {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--border-color);
  border-radius: 0.25rem;
  background-color: var(--bg-color);
  transition: all 0.2s ease;

  .checkbox-check {
    width: 0.75rem;
    height: 0.75rem;
    color: white;
    transform: scale(0);
    opacity: 0;
    transition: all 0.2s ease;
  }
}

.checkbox-text {
  padding-left: 0.75rem;
  font-size: 0.875rem;
  color: var(--text-color);
  line-height: 1.25;
}

.checkbox-error {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--danger-color);
}

// Dark theme support
@media (prefers-color-scheme: dark) {
  .checkbox-text {
    color: #e2e8f0;
  }

  .checkbox-control {
    border-color: #4a5568;
    background-color: #2d3748;
  }

  .checkbox-input {
    &:checked + .checkbox-control {
      background-color: #63b3ed;
      border-color: #63b3ed;
    }

    &:disabled + .checkbox-control {
      background-color: #1a202c;
      border-color: #4a5568;
    }

    &:focus + .checkbox-control {
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
    }
  }
}
</style>
