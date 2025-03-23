<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : ''"
    :disabled="disabled || loading"
    @click="handleClick"
    class="btn"
    :class="[
      { 'btn-round': round },
      { 'btn-block': block },
      { 'btn-icon': icon },
      { 'btn-fab': icon && fab },
      { [`btn-${type}`]: type },
      { [`btn-${size}`]: size },
      { 'btn-simple': simple },
      { 'btn-link': link },
      { 'btn-loading': loading },
      { disabled: disabled && tag !== 'button' },
    ]"
  >
    <span class="btn-content" :class="{ 'opacity-0': loading }">
      <slot></slot>
    </span>
    <span v-if="loading" class="btn-loader">
      <slot name="loading">
        <svg class="animate-spin" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      </slot>
    </span>
  </component>
</template>

<script>
export default {
  name: "base-button",
  props: {
    tag: {
      type: String,
      default: "button",
      description: "Button html tag"
    },
    round: Boolean,
    icon: Boolean,
    fab: Boolean,
    block: Boolean,
    loading: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: "default",
      description: "Button type (primary|secondary|danger etc)"
    },
    nativeType: {
      type: String,
      default: "button",
      description: "Button native type (e.g button, input etc)"
    },
    size: {
      type: String,
      default: "",
      description: "Button size (sm|lg)"
    },
    simple: {
      type: Boolean,
      description: "Whether button is simple (outlined)"
    },
    link: {
      type: Boolean,
      description: "Whether button is a link (no borders or background)"
    }
  },
  methods: {
    handleClick(evt) {
      if (!this.loading && !this.disabled) {
        this.$emit("click", evt);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  background: transparent;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary-color-light);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    pointer-events: none;
  }

  // Content and loader positioning
  .btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;
  }

  .btn-loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    svg {
      width: 1.25rem;
      height: 1.25rem;
      animation: spin 1s linear infinite;
    }
  }

  // Button types
  &.btn-primary {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);

    &:hover:not(:disabled) {
      background: var(--primary-color-dark);
      border-color: var(--primary-color-dark);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background: var(--primary-color-darker);
      border-color: var(--primary-color-darker);
      transform: translateY(0);
    }

    &.btn-simple {
      background: transparent;
      color: var(--primary-color);

      &:hover:not(:disabled) {
        background: var(--primary-color-light);
      }
    }
  }

  &.btn-success {
    background: var(--success-color);
    color: white;
    border-color: var(--success-color);

    &:hover:not(:disabled) {
      background: var(--success-color-dark);
      border-color: var(--success-color-dark);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background: var(--success-color-darker);
      border-color: var(--success-color-darker);
      transform: translateY(0);
    }

    &.btn-simple {
      background: transparent;
      color: var(--success-color);

      &:hover:not(:disabled) {
        background: var(--success-color-light);
      }
    }
  }

  &.btn-danger {
    background: var(--danger-color);
    color: white;
    border-color: var(--danger-color);

    &:hover:not(:disabled) {
      background: var(--danger-color-dark);
      border-color: var(--danger-color-dark);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background: var(--danger-color-darker);
      border-color: var(--danger-color-darker);
      transform: translateY(0);
    }

    &.btn-simple {
      background: transparent;
      color: var(--danger-color);

      &:hover:not(:disabled) {
        background: var(--danger-color-light);
      }
    }
  }

  &.btn-warning {
    background: var(--warning-color);
    color: white;
    border-color: var(--warning-color);

    &:hover:not(:disabled) {
      background: var(--warning-color-dark);
      border-color: var(--warning-color-dark);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background: var(--warning-color-darker);
      border-color: var(--warning-color-darker);
      transform: translateY(0);
    }

    &.btn-simple {
      background: transparent;
      color: var(--warning-color);

      &:hover:not(:disabled) {
        background: var(--warning-color-light);
      }
    }
  }

  // Button sizes
  &.btn-sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;

    .btn-loader svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &.btn-lg {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;

    .btn-loader svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  // Button variants
  &.btn-round {
    border-radius: 9999px;
  }

  &.btn-block {
    display: flex;
    width: 100%;
  }

  &.btn-icon {
    padding: 0.625rem;
    border-radius: 0.5rem;

    &.btn-sm {
      padding: 0.375rem;
    }

    &.btn-lg {
      padding: 0.75rem;
    }

    &.btn-round {
      border-radius: 50%;
    }
  }

  &.btn-fab {
    width: 3rem;
    height: 3rem;
    padding: 0;
    border-radius: 50%;

    &.btn-sm {
      width: 2.5rem;
      height: 2.5rem;
    }

    &.btn-lg {
      width: 3.5rem;
      height: 3.5rem;
    }
  }

  &.btn-link {
    padding: 0;
    background: transparent;
    border: none;
    color: var(--primary-color);
    text-decoration: underline;

    &:hover:not(:disabled) {
      color: var(--primary-color-dark);
    }

    &:active:not(:disabled) {
      color: var(--primary-color-darker);
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
