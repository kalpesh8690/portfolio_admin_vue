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
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 0;
  overflow: hidden;

  &.card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .card-image {
    position: relative;
    width: 100%;
    overflow: hidden;
    
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    background-color: transparent;

    &:first-child {
      border-radius: 15px 15px 0 0;
    }

    .card-title {
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: #2d3748;
      line-height: 1.2;
    }

    .card-category {
      margin: 0;
      font-size: 0.875rem;
      color: #718096;
    }
  }

  .card-body {
    padding: 1.5rem;
    flex: 1 1 auto;
    color: #4a5568;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .card-footer {
    padding: 1.25rem 1.5rem;
    background-color: transparent;
    border-top: 1px solid rgba(0, 0, 0, 0.05);

    &:last-child {
      border-radius: 0 0 15px 15px;
    }
  }

  // Card types
  &.card-primary {
    border-top: 3px solid #4299e1;
  }

  &.card-success {
    border-top: 3px solid #48bb78;
  }

  &.card-warning {
    border-top: 3px solid #ecc94b;
  }

  &.card-danger {
    border-top: 3px solid #f56565;
  }

  &.card-info {
    border-top: 3px solid #4fd1c5;
  }

  // Dark theme support
  @media (prefers-color-scheme: dark) {
    background: #2d3748;
    
    .card-header {
      border-bottom-color: rgba(255, 255, 255, 0.05);
      
      .card-title {
        color: #f7fafc;
      }
      
      .card-category {
        color: #a0aec0;
      }
    }
    
    .card-body {
      color: #e2e8f0;
    }
    
    .card-footer {
      border-top-color: rgba(255, 255, 255, 0.05);
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
