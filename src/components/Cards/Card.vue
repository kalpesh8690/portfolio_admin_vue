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
  background: linear-gradient(145deg, var(--card-bg), var(--bg-color-secondary));
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border-color);
  overflow: hidden;

  &.card-hover {
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      background: linear-gradient(145deg, var(--card-bg), var(--bg-color));
    }

    &:active {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .card-image {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: var(--bg-color);
    
    img {
      width: 100%;
      border-radius: 15px 15px 0 0;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .card-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    background: linear-gradient(to right, var(--card-bg), transparent);
    transition: all 0.3s ease;

    &:first-child {
      border-radius: 15px 15px 0 0;
    }

    .card-title {
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-color);
      line-height: 1.2;
      transition: color 0.3s ease;
    }

    .card-category {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-color-secondary);
      transition: color 0.3s ease;
    }
  }

  .card-body {
    padding: 1.5rem;
    flex: 1 1 auto;
    color: var(--text-color);
    font-size: 0.875rem;
    line-height: 1.5;
    transition: color 0.3s ease;
    background: var(--card-bg);
  }

  .card-footer {
    padding: 1.25rem 1.5rem;
    background: linear-gradient(to right, transparent, var(--card-bg));
    border-top: 1px solid var(--border-color);
    transition: all 0.3s ease;

    &:last-child {
      border-radius: 0 0 15px 15px;
    }
  }

  // Card types with enhanced hover effects
  &.card-primary {
    border-top: 3px solid var(--primary-color);
    transition: all 0.3s ease;

    &:hover {
      border-top-color: var(--primary-color-dark);
      background: linear-gradient(145deg, var(--card-bg), var(--primary-color-light));
    }
  }

  &.card-success {
    border-top: 3px solid var(--success-color);
    transition: all 0.3s ease;

    &:hover {
      border-top-color: var(--success-color-dark);
      background: linear-gradient(145deg, var(--card-bg), var(--success-color-light));
    }
  }

  &.card-warning {
    border-top: 3px solid var(--warning-color);
    transition: all 0.3s ease;

    &:hover {
      border-top-color: var(--warning-color-dark);
      background: linear-gradient(145deg, var(--card-bg), var(--warning-color-light));
    }
  }

  &.card-danger {
    border-top: 3px solid var(--danger-color);
    transition: all 0.3s ease;

    &:hover {
      border-top-color: var(--danger-color-dark);
      background: linear-gradient(145deg, var(--card-bg), var(--danger-color-light));
    }
  }

  &.card-info {
    border-top: 3px solid var(--info-color);
    transition: all 0.3s ease;

    &:hover {
      border-top-color: var(--info-color-dark);
      background: linear-gradient(145deg, var(--card-bg), var(--info-color-light));
    }
  }

  // Responsive adjustments
  @media (max-width: 768px) {
    margin-bottom: 16px;

    .card-header {
      padding: 1rem 1.25rem;

      .card-title {
        font-size: 1.125rem;
      }
    }

    .card-body {
      padding: 1.25rem;
    }

    .card-footer {
      padding: 1rem 1.25rem;
    }
  }
}
</style>
