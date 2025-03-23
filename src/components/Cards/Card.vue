<template>
  <div 
    class="card" 
    :class="[
      type && `card-${type}`,
      { 'card-hover': hover }
    ]"
  >
    <div class="card-image" v-if="$slots.image">
      <slot name="image"></slot>
    </div>
    <div
      class="card-header"
      v-if="$slots.header || title"
      :class="headerClasses"
    >
      <slot name="header">
        <h4 class="card-title">{{ title }}</h4>
        <p class="card-category" v-if="subTitle">{{ subTitle }}</p>
      </slot>
    </div>
    <div 
      class="card-body" 
      v-if="$slots.default"
      :class="bodyClasses"
    >
      <slot></slot>
    </div>
    <div class="card-image" v-if="$slots['image-bottom']">
      <slot name="image-bottom"></slot>
    </div>
    <slot name="raw-content"></slot>
    <div 
      class="card-footer" 
      :class="footerClasses" 
      v-if="$slots.footer"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    title: {
      type: String,
      description: "Card title"
    },
    subTitle: {
      type: String,
      description: "Card subtitle"
    },
    type: {
      type: String,
      description: "Card type (e.g primary/danger etc)"
    },
    headerClasses: {
      type: [String, Object, Array],
      description: "Card header css classes"
    },
    bodyClasses: {
      type: [String, Object, Array],
      description: "Card body css classes"
    },
    footerClasses: {
      type: [String, Object, Array],
      description: "Card footer css classes"
    },
    hover: {
      type: Boolean,
      default: true,
      description: "Whether to show hover effect"
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  background: var(--card-bg);
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  margin-bottom: 24px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border-color);
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-color-light));
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &.card-hover {
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border-color: var(--primary-color-light);

      &::before {
        opacity: 1;
      }
    }

    &:active {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  }

  .card-image {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: var(--bg-color);
    
    img {
      width: 100%;
      border-radius: 20px 20px 0 0;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      object-fit: cover;
      aspect-ratio: 16/9;

      &:hover {
        transform: scale(1.05);
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    &:hover::after {
      opacity: 1;
    }
  }

  .card-header {
    padding: 1.75rem;
    border-bottom: 1px solid var(--border-color);
    background: var(--card-bg);
    transition: all 0.4s ease;

    &:first-child {
      border-radius: 20px 20px 0 0;
    }

    .card-title {
      margin-bottom: 0.75rem;
      font-size: 1.375rem;
      font-weight: 700;
      color: var(--text-color);
      line-height: 1.3;
      transition: color 0.4s ease;
      letter-spacing: -0.025em;
    }

    .card-category {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-color-secondary);
      transition: color 0.4s ease;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0.5;
      }
    }
  }

  .card-body {
    padding: 1.75rem;
    flex: 1 1 auto;
    color: var(--text-color);
    font-size: 0.9375rem;
    line-height: 1.7;
    transition: color 0.4s ease;
    background: var(--card-bg);
  }

  .card-footer {
    padding: 1.5rem;
    background: var(--card-bg);
    border-top: 1px solid var(--border-color);
    transition: all 0.4s ease;

    &:last-child {
      border-radius: 0 0 20px 20px;
    }
  }

  // Card types with enhanced hover effects
  &.card-primary {
    border-top: 3px solid var(--primary-color);
    transition: all 0.4s ease;

    &:hover {
      border-top-color: var(--primary-color-dark);
      box-shadow: 0 20px 25px -5px rgba(var(--primary-color-rgb), 0.15), 0 10px 10px -5px rgba(var(--primary-color-rgb), 0.1);
    }
  }

  &.card-success {
    border-top: 3px solid var(--success-color);
    transition: all 0.4s ease;

    &:hover {
      border-top-color: var(--success-color-dark);
      box-shadow: 0 20px 25px -5px rgba(var(--success-color-rgb), 0.15), 0 10px 10px -5px rgba(var(--success-color-rgb), 0.1);
    }
  }

  &.card-warning {
    border-top: 3px solid var(--warning-color);
    transition: all 0.4s ease;

    &:hover {
      border-top-color: var(--warning-color-dark);
      box-shadow: 0 20px 25px -5px rgba(var(--warning-color-rgb), 0.15), 0 10px 10px -5px rgba(var(--warning-color-rgb), 0.1);
    }
  }

  &.card-danger {
    border-top: 3px solid var(--danger-color);
    transition: all 0.4s ease;

    &:hover {
      border-top-color: var(--danger-color-dark);
      box-shadow: 0 20px 25px -5px rgba(var(--danger-color-rgb), 0.15), 0 10px 10px -5px rgba(var(--danger-color-rgb), 0.1);
    }
  }

  &.card-info {
    border-top: 3px solid var(--info-color);
    transition: all 0.4s ease;

    &:hover {
      border-top-color: var(--info-color-dark);
      box-shadow: 0 20px 25px -5px rgba(var(--info-color-rgb), 0.15), 0 10px 10px -5px rgba(var(--info-color-rgb), 0.1);
    }
  }

  // Responsive adjustments
  @media (max-width: 768px) {
    margin-bottom: 16px;
    border-radius: 16px;

    .card-header {
      padding: 1.5rem;

      .card-title {
        font-size: 1.25rem;
      }
    }

    .card-body {
      padding: 1.5rem;
    }

    .card-footer {
      padding: 1.25rem;
    }

    .card-image img {
      border-radius: 16px 16px 0 0;
    }
  }
}
</style>
