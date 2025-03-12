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
          icon="tim-icons icon-briefcase-24"
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
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
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
