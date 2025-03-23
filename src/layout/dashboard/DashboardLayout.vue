<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          to="/dashboard"
          name="Dashboard"
          icon="tim-icons icon-chart-pie-36"
        />
        <sidebar-link
          to="/experience"
          name="Experience"
          icon="tim-icons icon-user-run"
        />
        <sidebar-link
          to="/education"
          name="Education"
          icon="tim-icons icon-book-bookmark"
        />
        <sidebar-link
          to="/notifications"
          name="Notifications"
          icon="tim-icons icon-bell-55"
        />
        <sidebar-link
          to="/profile"
          name="User Profile"
          icon="tim-icons icon-single-02"
        />
        <sidebar-link
          to="/projects"
          name="Projects"
          icon="tim-icons icon-components"
        />
        <sidebar-link
          to="/skills"
          name="Skills"
          icon="tim-icons icon-settings"
        />
        <sidebar-link
          to="/certificates"
          name="Certificates"
          icon="tim-icons icon-badge"
        />
      </template>
    </side-bar>
    <div class="main-panel">
      <div class="content">
        <router-view></router-view>
      </div>
      <content-footer></content-footer>
    </div>
  </div>
</template>

<script>
import ContentFooter from "./ContentFooter.vue";

export default {
  name: 'DashboardLayout',
  components: {
    ContentFooter,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  height: 100vh;
  overflow-x: hidden;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.main-panel {
  position: relative;
  float: right;
  width: calc(100% - 260px);
  min-height: 100%;
  background-color: var(--bg-color);
  transition: background-color 0.3s;
  
  @media screen and (max-width: 991px) {
    width: 100%;
  }
}

.content {
  padding: 1.5rem;
  background-color: var(--bg-color);
  transition: background-color 0.3s;
  
  .mb-4 {
    margin-bottom: 1.5rem;
  }
}
</style>
