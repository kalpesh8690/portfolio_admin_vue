<template>
  <li class="nav-item">
    <a
      href="#"
      class="nav-link theme-switch"
      @click.prevent="toggleTheme"
      :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <transition name="rotate" mode="out-in">
        <i 
          :key="isDarkMode"
          class="fas" 
          :class="isDarkMode ? 'fa-sun' : 'fa-moon'"
        ></i>
      </transition>
      <p class="d-lg-none">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</p>
    </a>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ThemeToggle',
  computed: {
    ...mapGetters('theme', ['isDarkMode'])
  },
  methods: {
    ...mapActions('theme', ['toggleTheme'])
  }
}
</script>

<style scoped>
.nav-link {
  position: relative;
  padding: 0.5rem 0.7rem;
  display: block;
  color: inherit;
  transition: color 0.3s ease;
}

.nav-link i {
  font-size: 1.2rem;
  vertical-align: middle;
  transform-origin: center;
  display: inline-block;
}

.nav-link:hover {
  color: #e14eca;
}

.theme-switch {
  cursor: pointer;
  perspective: 800px;
}

/* Rotate transition */
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.3s ease;
}

.rotate-enter {
  transform: rotateY(-180deg) scale(0.6);
  opacity: 0;
}

.rotate-leave-to {
  transform: rotateY(180deg) scale(0.6);
  opacity: 0;
}

.rotate-enter-to,
.rotate-leave {
  transform: rotateY(0) scale(1);
  opacity: 1;
}

/* Hover effect */
.theme-switch:hover i {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style> 