<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Left side -->
      <div class="navbar-left">
        <button 
          class="menu-toggle" 
          :class="{ 'is-active': isSidebarOpen }"
          @click="toggleSidebar" 
          v-if="showSidebarToggle"
        >
          <transition name="icon-transition" mode="out-in">
            <i :key="isSidebarOpen" :class="isSidebarOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
          </transition>
        </button>
        <span class="page-title">{{ pageTitle }}</span>
      </div>

      <!-- Right side -->
      <div class="navbar-right">
        <!-- Search -->
        <div class="navbar-search">
          <button class="search-button" @click="showSearchDialog = true">
            <i class="fas fa-search"></i>
            <span class="search-label">Search...</span>
            <span class="search-shortcut">⌘K</span>
          </button>
        </div>
        <SearchDialog 
            :show="showSearchDialog"
            @close="showSearchDialog = false"
          />

        <!-- Notifications -->
        <div class="notifications-container">
          <button class="icon-button" @click="toggleNotifications">
            <i class="fas fa-bell"></i>
            <span class="notification-badge" v-if="unreadNotifications">3</span>
          </button>
          <div class="notifications-dropdown" v-if="showNotifications">
            <div class="notifications-header">
              <h3>Notifications</h3>
              <button class="mark-all-read" @click="markAllAsRead">Mark all as read</button>
            </div>
            <div class="notifications-list">
              <div v-for="notification in notifications" :key="notification.id" 
                   class="notification-item" :class="{ unread: !notification.read }">
                <div class="notification-icon">
                  <i :class="notification.icon"></i>
                </div>
                <div class="notification-content">
                  <p>{{ notification.message }}</p>
                  <span class="notification-time">{{ notification.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Theme Toggle -->
        <div class="theme-toggle-container">
          <button class="icon-button" @click="toggleTheme">
            <transition name="rotate" mode="out-in">
              <i 
                :key="isDarkMode"
                class="fas" 
                :class="isDarkMode ? 'fa-sun' : 'fa-moon'"
              ></i>
            </transition>
            <span class="theme-label">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>
        </div>

        <!-- User Profile -->
        <div class="user-profile-container">
          <button class="icon-button" @click="toggleUserMenu">
            <img :src="userAvatar" alt="User avatar" class="user-avatar">
            <span class="user-name">{{ userName }}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="user-menu" v-if="showUserMenu">
            <div class="user-menu-header">
              <img :src="userAvatar" alt="User avatar" class="user-avatar-large">
              <div class="user-info">
                <h4>{{ userName }}</h4>
                <p>{{ userRole }}</p>
              </div>
            </div>
            <div class="user-menu-items">
              <a href="#" class="menu-item">
                <i class="fas fa-user"></i>
                <span>Profile</span>
              </a>
              <a href="#" class="menu-item">
                <i class="fas fa-cog"></i>
                <span>Settings</span>
              </a>
              <a href="#" class="menu-item" @click="logout">
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import SearchDialog from '@/components/SearchDialog.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TopNavbar',
  components: {
    SearchDialog
  },
  computed: {
    ...mapGetters('theme', ['isDarkMode']),
    showSidebarToggle() {
      // Only show sidebar toggle on dashboard layout
      return true
    },
    pageTitle() {
      const { name, meta } = this.$route;
      if (meta && meta.title) {
        return meta.title;
      }
      return this.capitalizeFirstLetter(name || 'Dashboard');
    }
  },
  data() {
    return {
      showSearchDialog: false,
      showNotifications: false,
      showUserMenu: false,
      unreadNotifications: true,
      notifications: [
        {
          id: 1,
          message: 'New project created',
          time: '5 minutes ago',
          icon: 'fas fa-folder-plus',
          read: false
        },
        {
          id: 2,
          message: 'Task completed',
          time: '1 hour ago',
          icon: 'fas fa-check-circle',
          read: false
        },
        {
          id: 3,
          message: 'New comment on project',
          time: '2 hours ago',
          icon: 'fas fa-comment',
          read: true
        }
      ],
      userAvatar: 'https://via.placeholder.com/40',
      userName: 'John Doe',
      userRole: 'Administrator'
    }
  },
  mounted() {
    // Add keyboard shortcut listener
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeDestroy() {
    // Remove keyboard shortcut listener
    window.removeEventListener('keydown', this.handleKeyPress);
  },
  methods: {
    ...mapActions('theme', ['toggleTheme']),
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleSidebar() {
      if (this.$sidebar) {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      }
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      this.showUserMenu = false;
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
      this.showNotifications = false;
    },
    markAllAsRead() {
      this.notifications.forEach(notification => {
        notification.read = true;
      });
      this.unreadNotifications = false;
    },
    logout() {
      // Implement logout functionality
      localStorage.removeItem('token');
      this.$router.push('/login');
      console.log('Logging out...');
    },
    handleKeyPress(event) {
      // Check for Ctrl+K (Windows) or Cmd+K (Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault(); // Prevent default browser behavior
        this.showSearchDialog = true;
      }
    }
  }
};
</script>

<style lang="scss">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: linear-gradient(to right, var(--bg-color), var(--bg-color-secondary));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &.with-sidebar {
    width: calc(100% - 260px);
    right: 0;
    left: auto;
  }

  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 2rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    .menu-toggle {
      background: none;
      border: none;
      padding: 10px;
      cursor: pointer;
      color: var(--text-color);
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background: var(--primary-color-light);
        border-radius: 12px;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:hover {
        color: var(--primary-color);
        
        &::before {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.1;
        }
      }

      &:active {
        transform: scale(0.95);
      }

      i {
        font-size: 22px;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    .page-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-color);
      transition: color 0.3s ease;
      letter-spacing: -0.5px;
    }
  }

  .navbar-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
}

@media screen and (max-width: 991px) {
  .navbar {
    width: 100% !important;
    left: 0 !important;
    
    .navbar-container {
      padding: 0 1.25rem;
    }

    .navbar-left {
      gap: 1rem;
    }

    .navbar-right {
      gap: 1rem;
    }
  }
}

.navbar-search {
  margin-right: 1rem;

  .search-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    background: var(--bg-color-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    color: var(--text-color-secondary);
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-width: 240px;

    &:hover {
      background: var(--bg-color-hover);
      border-color: var(--primary-color-light);
      color: var(--text-color);
    }

    i {
      font-size: 1rem;
      color: var(--text-color-secondary);
      transition: color 0.3s ease;
    }

    .search-label {
      flex: 1;
      text-align: left;
    }

    .search-shortcut {
      padding: 0.25rem 0.5rem;
      background: var(--bg-color);
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-color-secondary);
      border: 1px solid var(--border-color);
    }
  }
}

.icon-button {
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  position: relative;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: var(--primary-color-light);
    border-radius: 12px;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: var(--primary-color);
    
    &::before {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.1;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  i {
    font-size: 20px;
  }

  span {
    font-size: 0.9375rem;
    font-weight: 500;
  }
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--danger-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: translate(25%, -25%);
}

.notifications-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 360px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  overflow: hidden;
  transform-origin: top right;
  animation: dropdownEnter 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .notifications-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    border-bottom: 1px solid var(--border-color);

    h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-color);
    }

    .mark-all-read {
      background: none;
      border: none;
      color: var(--primary-color);
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        background: var(--primary-color-light);
        opacity: 0.8;
      }
    }
  }

  .notifications-list {
    max-height: 400px;
    overflow-y: auto;
    padding: 0.5rem;

    .notification-item {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      border-radius: 12px;
      transition: all 0.3s ease;
      margin-bottom: 0.5rem;

      &:hover {
        background-color: var(--bg-color-secondary);
      }

      &.unread {
        background-color: var(--bg-color-secondary);
      }

      .notification-icon {
        margin-right: 1rem;
        color: var(--primary-color);
        font-size: 1.25rem;
      }

      .notification-content {
        flex: 1;

        p {
          margin: 0;
          font-size: 0.9375rem;
          line-height: 1.5;
          color: var(--text-color);
        }

        .notification-time {
          font-size: 0.8125rem;
          color: var(--text-color-secondary);
          margin-top: 0.25rem;
        }
      }
    }
  }
}

.user-profile-container {
  position: relative;

  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--primary-color-light);
    transition: all 0.3s ease;
  }

  .user-name {
    font-size: 0.9375rem;
    font-weight: 500;
    margin-left: 0.75rem;
    color: var(--text-color);
  }

  .fa-chevron-down {
    font-size: 0.875rem;
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
}

.user-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 280px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  overflow: hidden;
  transform-origin: top right;
  animation: dropdownEnter 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .user-menu-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 1rem;

    .user-avatar-large {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--primary-color-light);
    }

    .user-info {
      h4 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-color);
      }

      p {
        margin: 0.25rem 0 0;
        font-size: 0.875rem;
        color: var(--text-color-secondary);
      }
    }
  }

  .user-menu-items {
    padding: 0.5rem;

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      color: var(--text-color);
      text-decoration: none;
      border-radius: 12px;
      transition: all 0.3s ease;
      font-weight: 500;

      &:hover {
        background-color: var(--bg-color-secondary);
        color: var(--primary-color);
      }

      i {
        width: 20px;
        text-align: center;
        font-size: 1.125rem;
      }
    }
  }
}

@keyframes dropdownEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media screen and (max-width: 768px) {
  .navbar {
    .navbar-container {
      padding: 0 1rem;
    }

    .page-title {
      font-size: 1.25rem;
    }

    .icon-button span {
      display: none;
    }

    .notifications-dropdown,
    .user-menu {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      width: 100%;
      max-width: 100%;
      border-radius: 0;
      margin-top: 0;
    }

    .navbar-search {
      .search-button {
        min-width: auto;
        padding: 0.75rem;
        
        .search-label,
        .search-shortcut {
          display: none;
        }
      }
    }
  }
}

/* Theme Toggle Animation */
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
.theme-toggle-container .icon-button:hover i {
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

/* Icon Transition Animation */
.icon-transition-enter-active,
.icon-transition-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-transition-enter {
  transform: rotate(-180deg) scale(0.6);
  opacity: 0;
}

.icon-transition-leave-to {
  transform: rotate(180deg) scale(0.6);
  opacity: 0;
}

.icon-transition-enter-to,
.icon-transition-leave {
  transform: rotate(0) scale(1);
  opacity: 1;
}
</style>
