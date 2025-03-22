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
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
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
    background: #4299e1;
    color: white;
    border-color: #4299e1;

    &:hover:not(:disabled) {
      background: #3182ce;
      border-color: #3182ce;
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background: #2c5282;
      border-color: #2c5282;
      transform: translateY(0);
    }

    &.btn-simple {
      background: transparent;
      color: #4299e1;

      &:hover:not(:disabled) {
        background: rgba(66, 153, 225, 0.1);
      }
    }
  }

  &.btn-success {
    background: #48bb78;
    color: white;
    border-color: #48bb78;

    &:hover:not(:disabled) {
      background: #38a169;
      border-color: #38a169;
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background: #2f855a;
      border-color: #2f855a;
      transform: translateY(0);
    }

    &.btn-simple {
      background: transparent;
      color: #48bb78;

      &:hover:not(:disabled) {
        background: rgba(72, 187, 120, 0.1);
      }
    }
  }

  &.btn-danger {
    background: #f56565;
    color: white;
    border-color: #f56565;

    &:hover:not(:disabled) {
      background: #e53e3e;
      border-color: #e53e3e;
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background: #c53030;
      border-color: #c53030;
      transform: translateY(0);
    }

    &.btn-simple {
      background: transparent;
      color: #f56565;

      &:hover:not(:disabled) {
        background: rgba(245, 101, 101, 0.1);
      }
    }
  }

  &.btn-warning {
    background: #ecc94b;
    color: white;
    border-color: #ecc94b;

    &:hover:not(:disabled) {
      background: #d69e2e;
      border-color: #d69e2e;
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background: #b7791f;
      border-color: #b7791f;
      transform: translateY(0);
    }

    &.btn-simple {
      background: transparent;
      color: #ecc94b;

      &:hover:not(:disabled) {
        background: rgba(236, 201, 75, 0.1);
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

  // Button variations
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
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    padding: 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    &.btn-sm {
      width: 2.5rem;
      height: 2.5rem;
    }

    &.btn-lg {
      width: 4.5rem;
      height: 4.5rem;
    }
  }

  &.btn-link {
    padding: 0;
    background: none;
    border: none;
    color: #4299e1;
    font-weight: 500;
    box-shadow: none;

    &:hover:not(:disabled) {
      text-decoration: underline;
      transform: none;
    }

    &:focus {
      box-shadow: none;
    }
  }

  // Dark theme support
  @media (prefers-color-scheme: dark) {
    &.btn-link {
      color: #63b3ed;
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.3);
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
