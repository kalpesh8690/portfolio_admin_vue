<template>
  <nav
    class="navbar"
    :class="[
      { 'navbar-expand-lg': expand },
      { [`navbar-${effect}`]: effect },
      { 'navbar-transparent': transparent },
      { [`bg-${type}`]: type },
      { 'navbar-rounded': round },
      { 'navbar-scrolled': isScrolled }
    ]"
  >
    <div class="container">
      <slot name="container-pre"></slot>
      
      <slot name="brand">
        <a 
          class="navbar-brand"
          href="#" 
          @click.prevent="onTitleClick"
          :class="{ 'has-logo': $slots.logo }"
        >
          <slot name="logo"></slot>
          <span class="brand-text">{{ title }}</span>
        </a>
      </slot>

      <navbar-toggle-button
        :toggled="toggled"
        :target="contentId"
        @click.native.stop="toggled = !toggled"
        class="navbar-toggler"
      >
      </navbar-toggle-button>

      <slot name="container-after"></slot>

      <div
        class="navbar-collapse"
        :class="{ 
          'show': toggled,
          'collapsing': isCollapsing 
        }"
        :id="contentId"
        v-click-outside="closeMenu"
      >
        <div class="navbar-collapse-header">
          <slot name="content-header" :close-menu="closeMenu"></slot>
        </div>
        <slot :close-menu="closeMenu"></slot>
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarToggleButton from "./NavbarToggleButton";

export default {
  name: "base-nav",
  components: {
    NavbarToggleButton
  },
  props: {
    type: {
      type: String,
      default: "primary",
      description: "Navbar type (e.g default, primary etc)"
    },
    title: {
      type: String,
      default: "",
      description: "Title of navbar"
    },
    contentId: {
      type: [String, Number],
      default: () => `nav-${Math.random().toString(36).substring(2, 9)}`,
      description: "Explicit id for the menu. By default it's a generated random number"
    },
    effect: {
      type: String,
      default: "dark",
      description: "Effect of the navbar (light|dark)"
    },
    round: {
      type: Boolean,
      default: false,
      description: "Whether nav has rounded corners"
    },
    transparent: {
      type: Boolean,
      default: false,
      description: "Whether navbar is transparent"
    },
    expand: {
      type: Boolean,
      default: false,
      description: "Whether navbar should contain `navbar-expand-lg` class"
    },
    sticky: {
      type: Boolean,
      default: false,
      description: "Whether navbar should stick to top"
    }
  },
  data() {
    return {
      toggled: false,
      isCollapsing: false,
      isScrolled: false
    };
  },
  mounted() {
    if (this.sticky) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  beforeDestroy() {
    if (this.sticky) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    onTitleClick(evt) {
      this.$emit("title-click", evt);
    },
    closeMenu() {
      if (this.toggled) {
        this.isCollapsing = true;
        this.toggled = false;
        setTimeout(() => {
          this.isCollapsing = false;
        }, 300);
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  padding: 1rem;
  transition: all 0.3s ease;
  
  &.navbar-sticky {
    position: sticky;
    top: 0;
    z-index: 1030;
  }
  
  &.navbar-scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }
  
  &.navbar-rounded {
    border-radius: 0.5rem;
  }
  
  &.navbar-transparent {
    background-color: transparent !important;
    
    &.navbar-scrolled {
      background: rgba(255, 255, 255, 0.95) !important;
    }
  }
  
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  margin-right: 1rem;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
  
  &.has-logo {
    .brand-text {
      margin-left: 0.75rem;
    }
  }
}

.navbar-collapse {
  flex-grow: 1;
  align-items: center;
  
  @media (max-width: 991.98px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform-origin: top;
    transform: scaleY(0);
    opacity: 0;
    transition: all 0.3s ease;
    
    &.show {
      transform: scaleY(1);
      opacity: 1;
    }
    
    &.collapsing {
      transform: scaleY(0);
      opacity: 0;
    }
  }
  
  @media (min-width: 992px) {
    display: flex !important;
    transform: none !important;
    opacity: 1 !important;
    position: static;
    background: transparent;
    box-shadow: none;
    padding: 0;
  }
}

.navbar-collapse-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  @media (min-width: 992px) {
    display: none;
  }
}

// Dark theme support
@media (prefers-color-scheme: dark) {
  .navbar {
    &.navbar-scrolled {
      background: rgba(26, 32, 44, 0.95);
    }
    
    &.navbar-transparent.navbar-scrolled {
      background: rgba(26, 32, 44, 0.95) !important;
    }
  }
  
  .navbar-collapse {
    @media (max-width: 991.98px) {
      background: #1a202c;
      border: 1px solid #2d3748;
    }
  }
  
  .navbar-collapse-header {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
}

// Navbar types
.navbar {
  &.bg-primary {
    background-color: #4299e1;
    color: white;
  }
  
  &.bg-success {
    background-color: #48bb78;
    color: white;
  }
  
  &.bg-danger {
    background-color: #f56565;
    color: white;
  }
  
  &.bg-warning {
    background-color: #ecc94b;
    color: #2d3748;
  }
  
  &.bg-info {
    background-color: #4299e1;
    color: white;
  }
  
  &.navbar-dark {
    color: white;
    
    .navbar-collapse {
      @media (max-width: 991.98px) {
        background: #2d3748;
      }
    }
  }
  
  &.navbar-light {
    color: #2d3748;
    
    .navbar-collapse {
      @media (max-width: 991.98px) {
        background: white;
      }
    }
  }
}
</style>
