<template>
  <div>
    <!-- Overlay for mobile -->
    <div 
      class="sidebar-overlay" 
      :class="{ show: $sidebar.showSidebar }"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <div 
      class="sidebar" 
      :class="[
        { show: $sidebar.showSidebar },
        { collapsed: !$sidebar.showSidebar && !isMobile }
      ]"
      :data="backgroundColor"
    >
      <div class="sidebar-wrapper" ref="sidebarWrapper">
        <div class="logo">
          <a
            href="#"
            class="simple-text logo-mini"
            @click.prevent
          >
            <i class="tim-icons icon-chart-pie-36"></i>
          </a>
          <a 
            href="#" 
            class="simple-text logo-normal"
            @click.prevent
          >
            {{ title }}
          </a>
        </div>

        <slot></slot>
        <ul class="nav">
          <slot name="links">
            <sidebar-link
              v-for="(link, index) in sidebarLinks"
              :key="index"
              :to="link.path"
              :name="link.name"
              :icon="link.icon"
            >
            </sidebar-link>
          </slot>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink";

export default {
  name: "SideBar",
  components: {
    SidebarLink,
  },
  props: {
    title: {
      type: String,
      default: "Portfolio Admin",
    },
    backgroundColor: {
      type: String,
      default: "vue",
    },
    activeColor: {
      type: String,
      default: "success",
      validator: (value) => {
        return ["primary", "info", "success", "warning", "danger"].includes(value);
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isMobile: false,
      windowWidth: window.innerWidth,
      links: [],
    };
  },
  provide() {
    return {
      autoClose: this.autoClose,
      addLink: this.addLink,
      removeLink: this.removeLink,
    };
  },
  watch: {
    '$sidebar.showSidebar'(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  methods: {
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.isMobile = this.windowWidth < 992;
      
      if (this.isMobile) {
        this.$sidebar.displaySidebar(false);
      }
    },
    addLink(link) {
      const index = this.$slots.links.indexOf(link.$vnode);
      this.links.splice(index, 0, link);
    },
    removeLink(link) {
      const index = this.links.indexOf(link);
      if (index > -1) {
        this.links.splice(index, 1);
      }
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    document.body.style.overflow = '';
  },
};
</script>

<style lang="scss">
@import "../../assets/sass/black-dashboard/custom/variables";

// Base sidebar styles
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9;
  display: none;
  transition: opacity 0.3s ease;
  opacity: 0;

  &.show {
    display: block;
    opacity: 1;
  }
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 260px;
  background: $primary;
  box-shadow: 0 0 45px 0 rgba(0, 0, 0, 0.6);
  z-index: 10;
  transition: all 0.3s ease;
  transform: translateX(0);

  &.collapsed {
    transform: translateX(-230px);
    
    .logo-normal {
      opacity: 0;
      transform: translate3d(-25px, 0, 0);
    }
    
    .nav {
      p {
        opacity: 0;
        transform: translate3d(-25px, 0, 0);
      }
    }
    
    &:hover {
      transform: translateX(0);
      
      .logo-normal {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      
      .nav p {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  }

  @media (max-width: 991.98px) {
    transform: translateX(-260px);
    
    &.show {
      transform: translateX(0);
    }
  }

  .sidebar-wrapper {
    position: relative;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 100px;
  }

  .nav {
    margin-top: 20px;
    
    li {
      &:hover:not(.active) {
        & > a,
        & > a i {
          opacity: 0.8;
        }
      }
      
      &.active {
        & > a,
        & > a i {
          color: $white;
        }
        
        & > a i {
          background: rgba(0, 0, 0, 0.2);
        }
      }
    }
    
    p {
      margin: 0;
      line-height: 30px;
      position: relative;
      display: block;
      height: auto;
      white-space: nowrap;
      transition: all 0.3s ease;
    }
    
    i {
      font-size: 24px;
      float: left;
      margin-right: 12px;
      line-height: 30px;
      width: 34px;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      position: relative;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
  }
  
  .logo {
    position: relative;
    padding: 20px 15px;
    z-index: 4;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 15px;
      height: 1px;
      width: calc(100% - 30px);
      background: rgba(255, 255, 255, 0.1);
    }
    
    .simple-text {
      text-transform: uppercase;
      padding: 0;
      display: block;
      white-space: nowrap;
      color: $white;
      text-decoration: none;
      font-weight: 400;
      line-height: 30px;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &.logo-mini {
        opacity: 1;
        float: left;
        width: 34px;
        text-align: center;
        margin-left: 10px;
        margin-right: 12px;
        
        i {
          font-size: 18px;
          color: $white;
        }
      }
      
      &.logo-normal {
        display: block;
        opacity: 1;
        transform: translate3d(0px, 0, 0);
      }
    }
  }
}
</style>
