<template>
  <label class="base-checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      :disabled="disabled"
      :required="required"
    >
    <span class="checkbox-custom"></span>
    <span class="checkbox-label">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss" scoped>
.base-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-left: 0.5rem;
  color: var(--text-color);
  font-size: 0.9375rem;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked + .checkbox-custom {
      background-color: var(--primary-color);
      border-color: var(--primary-color);

      &::after {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    &:focus + .checkbox-custom {
      box-shadow: 0 0 0 3px var(--primary-color-light);
    }

    &:disabled + .checkbox-custom {
      background-color: var(--bg-color-secondary);
      border-color: var(--border-color);
      cursor: not-allowed;
      opacity: 0.7;
    }

    &:disabled ~ .checkbox-label {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .checkbox-custom {
    position: relative;
    height: 20px;
    width: 20px;
    background-color: transparent;
    border: 2px solid var(--border-color);
    border-radius: 6px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      color: white;
      font-size: 0.875rem;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      border-color: var(--primary-color-light);
    }
  }

  .checkbox-label {
    font-weight: 500;
    transition: all 0.3s ease;
  }
}
</style> 