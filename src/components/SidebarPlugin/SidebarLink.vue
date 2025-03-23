<template>
  <li class="nav-item">
    <component
      :is="tag"
      class="nav-link"
      v-bind="$attrs"
      @click.native="hideSidebar"
    >
      <slot>
        <i v-if="icon" :class="icon"></i>
        <p>{{ name }}</p>
      </slot>
    </component>
  </li>
</template>
<script>
export default {
  name: "sidebar-link",
  inheritAttrs: false,
  inject: {
    autoClose: {
      default: true,
    },
    addLink: {
      default: () => {},
    },
    removeLink: {
      default: () => {},
    },
  },
  props: {
    name: String,
    icon: String,
    tag: {
      type: String,
      default: "router-link",
    },
  },
  methods: {
    hideSidebar() {
      if (this.autoClose) {
        this.$sidebar.displaySidebar(false);
      }
    },
    isActive() {
      return this.$el.classList.contains("active");
    },
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
  },
  beforeDestroy() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.removeLink) {
      this.removeLink(this);
    }
  },
};
</script>
<style>
.nav-item {
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: var(--text-color);
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: var(--primary-color);
      background-color: var(--hover-bg);
    }

    &.active {
      color: var(--primary-color);
      background-color: var(--primary-color-light);
    }

    i {
      font-size: 1.25rem;
      margin-right: 0.75rem;
      width: 2rem;
      text-align: center;
      transition: all 0.3s ease;
    }

    p {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }
  }
}
</style>
