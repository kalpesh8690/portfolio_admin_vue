<template>
  <div>
    <ThemeToggle class="theme-toggle-position" />
    <router-view></router-view>
  </div>
</template>

<script>
import ThemeToggle from './components/ThemeToggle.vue'

export default {
  name: "App",
  components: {
    ThemeToggle
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

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.theme-toggle-position {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}
</style>
