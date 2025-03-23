<template>
  <div
    class="form-check form-check-radio"
    :class="[inlineClass, { disabled: disabled }]"
  >
    <label :for="cbId" class="form-check-label">
      <input
        :id="cbId"
        class="form-check-input"
        type="radio"
        :disabled="disabled"
        :value="name"
        v-model="model"
      />
      <slot></slot>
      <span class="form-check-sign"></span>
    </label>
  </div>
</template>
<script>
export default {
  name: "base-radio",
  props: {
    name: {
      type: [String, Number],
      description: "Radio label",
    },
    disabled: {
      type: Boolean,
      description: "Whether radio is disabled",
    },
    value: {
      type: [String, Boolean],
      description: "Radio value",
    },
    inline: {
      type: Boolean,
      description: "Whether radio is inline",
    },
  },
  data() {
    return {
      cbId: "",
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    inlineClass() {
      if (this.inline) {
        return `form-check-inline`;
      }
      return "";
    },
  },
  created() {
    this.cbId = Math.random().toString(16).slice(2);
  },
};
</script>

<style lang="scss" scoped>
.form-check {
  position: relative;
  display: block;
  padding-left: 1.75rem;
  margin-bottom: 1.25rem;

  &.form-check-inline {
    display: inline-flex;
    align-items: center;
    padding-left: 0;
    margin-right: 1.5rem;
    margin-bottom: 0;
  }

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;

    .form-check-label {
      cursor: not-allowed;
    }
  }
}

.form-check-label {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 0.25rem 0;
  margin: 0;
  user-select: none;
  font-size: 0.9375rem;
  color: var(--text-color);
  line-height: 1.5;
  transition: all 0.3s ease;

  &:hover {
    .form-check-sign {
      border-color: var(--primary-color-light);
      transform: scale(1.05);
    }
  }
}

.form-check-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:focus + .form-check-sign {
    box-shadow: 0 0 0 4px var(--primary-color-light);
    border-color: var(--primary-color);
  }

  &:checked + .form-check-sign {
    border-color: var(--primary-color);
    background-color: var(--primary-color);
    transform: scale(1.05);

    &::after {
      transform: scale(1);
      opacity: 1;
    }
  }

  &:disabled + .form-check-sign {
    background-color: var(--bg-color-secondary);
    border-color: var(--border-color);
    cursor: not-allowed;
    transform: none;
  }
}

.form-check-sign {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1.375rem;
  height: 1.375rem;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  background-color: var(--bg-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 0.5rem;
    height: 0.5rem;
    background-color: white;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .form-check {
    padding-left: 1.5rem;
    margin-bottom: 1rem;

    &.form-check-inline {
      margin-right: 1.25rem;
    }
  }

  .form-check-sign {
    width: 1.25rem;
    height: 1.25rem;

    &::after {
      width: 0.4375rem;
      height: 0.4375rem;
    }
  }

  .form-check-label {
    font-size: 0.875rem;
  }
}
</style>
