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
  --text-color-secondary: #666666;
  --primary-color: #1976d2;
  --primary-color-light: rgba(25, 118, 210, 0.1);
  --primary-color-dark: #1565c0;
  --secondary-color: #424242;
  --hover-bg: rgba(0, 0, 0, 0.05);
  --border-color: #e0e0e0;
  --card-bg: #ffffff;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --bg-color-secondary: #f5f5f5;
  --success-color: #4caf50;
  --success-color-light: rgba(76, 175, 80, 0.1);
  --danger-color: #f44336;
  --danger-color-light: rgba(244, 67, 54, 0.1);
  --warning-color: #ff9800;
  --warning-color-light: rgba(255, 152, 0, 0.1);
  --info-color: #2196f3;
  --info-color-light: rgba(33, 150, 243, 0.1);
  --primary-color-rgb: 25, 118, 210;
  --success-color-rgb: 76, 175, 80;
  --danger-color-rgb: 244, 67, 54;
  --warning-color-rgb: 255, 152, 0;
  --info-color-rgb: 33, 150, 243;
}

:root[data-theme="dark"] {
  /* Dark theme variables */
  --bg-color: #121212;
  --text-color: #ffffff;
  --text-color-secondary: #a0a0a0;
  --primary-color: #90caf9;
  --primary-color-light: rgba(144, 202, 249, 0.1);
  --primary-color-dark: #64b5f6;
  --secondary-color: #a0a0a0;
  --hover-bg: rgba(255, 255, 255, 0.05);
  --border-color: #333333;
  --card-bg: #1e1e1e;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  --bg-color-secondary: #2d2d2d;
  --success-color: #81c784;
  --success-color-light: rgba(129, 199, 132, 0.1);
  --danger-color: #e57373;
  --danger-color-light: rgba(229, 115, 115, 0.1);
  --warning-color: #ffb74d;
  --warning-color-light: rgba(255, 183, 77, 0.1);
  --info-color: #64b5f6;
  --info-color-light: rgba(100, 181, 246, 0.1);
  --primary-color-rgb: 144, 202, 249;
  --success-color-rgb: 129, 199, 132;
  --danger-color-rgb: 229, 115, 115;
  --warning-color-rgb: 255, 183, 77;
  --info-color-rgb: 100, 181, 246;
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
