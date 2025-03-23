<template>
  <div class="app-wrapper">
    <top-navbar v-if="!isLoginPage"></top-navbar>
    <div class="main-content" :class="{ 'with-navbar': !isLoginPage }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopNavbar from "@/layout/dashboard/TopNavbar";

export default {
  name: "App",
  components: {
    TopNavbar
  },
  computed: {
    isLoginPage() {
      return this.$route.name === 'login' || this.$route.path === '/login';
    }
  },
  created() {
    // Check authentication on app creation
    const token = localStorage.getItem('token');
    if (!token && !this.isLoginPage) {
      this.$router.push('/login');
    }
  }
};
</script>

<style>
:root {
  /* Light theme variables */
  --bg-color: #ffffff;
  --text-color: #333333;
  --primary-color: #1976d2;
  --secondary-color: #424242;
  --hover-bg: rgba(0, 0, 0, 0.05);
  --border-color: #e0e0e0;
  --card-bg: #ffffff;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:root[data-theme="dark"] {
  /* Dark theme variables */
  --bg-color: #121212;
  --text-color: #ffffff;
  --primary-color: #90caf9;
  --secondary-color: #a0a0a0;
  --hover-bg: rgba(255, 255, 255, 0.05);
  --border-color: #333333;
  --card-bg: #1e1e1e;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
  overflow-x: hidden;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.main-content {
  flex: 1;
  width: 100%;
  position: relative;
  
  &.with-navbar {
    padding-top: 0
  }
}

.theme-toggle-position {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1060;
}
</style>
