<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Left side -->
      <div class="navbar-left">
        <button class="menu-toggle" @click="toggleSidebar" v-if="showSidebarToggle">
          <i class="fas fa-bars"></i>
        </button>
        <span class="page-title">{{ pageTitle }}</span>
      </div>

      <!-- Right side -->
      <div class="navbar-right">
        <!-- Search -->
        <div class="navbar-search">
          <button class="icon-button" @click="showSearchDialog = true">
            <i class="fas fa-search"></i>
            <span class="search-label">Search</span>
          </button>
          <SearchDialog 
            :show="showSearchDialog"
            @close="showSearchDialog = false"
          />
        </div>

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
      console.log('Logging out...');
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
  background-color: var(--bg-color);
  box-shadow: var(--shadow);
  z-index: 1000;

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
    padding: 0 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 1rem;

    .menu-toggle {
      background: none;
      border: none;
      color: var(--text-color);
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;

      &:hover {
        color: var(--primary-color);
      }
    }

    .page-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-color);
    }
  }

  .navbar-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

@media screen and (max-width: 991px) {
  .navbar {
    width: 100% !important;
    left: 0 !important;
    
    .navbar-container {
      padding: 0 1rem;
    }
  }
}

.navbar-search {
  margin-right: 1rem;

  .search-label {
    font-size: 0.875rem;
    margin-left: 0.5rem;
  }
}

.icon-button {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  position: relative;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--primary-color);
  }
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--danger-color);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

.notifications-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: var(--shadow);
  margin-top: 0.5rem;

  .notifications-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);

    h3 {
      margin: 0;
      font-size: 1rem;
    }

    .mark-all-read {
      background: none;
      border: none;
      color: var(--primary-color);
      cursor: pointer;
      font-size: 0.875rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .notifications-list {
    max-height: 300px;
    overflow-y: auto;

    .notification-item {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      transition: background-color 0.2s ease;

      &:hover {
        background-color: var(--bg-color-secondary);
      }

      &.unread {
        background-color: var(--bg-color-secondary);
      }

      .notification-icon {
        margin-right: 1rem;
        color: var(--primary-color);
      }

      .notification-content {
        flex: 1;

        p {
          margin: 0;
          font-size: 0.875rem;
        }

        .notification-time {
          font-size: 0.75rem;
          color: var(--text-color-secondary);
        }
      }
    }
  }
}

.user-profile-container {
  position: relative;

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-name {
    font-size: 0.875rem;
    margin-left: 0.5rem;
  }
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 250px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: var(--shadow);
  margin-top: 0.5rem;

  .user-menu-header {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 1rem;

    .user-avatar-large {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-info {
      h4 {
        margin: 0;
        font-size: 1rem;
      }

      p {
        margin: 0;
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
      padding: 0.75rem;
      color: var(--text-color);
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: var(--bg-color-secondary);
      }

      i {
        width: 20px;
        text-align: center;
      }
    }
  }
}

.theme-toggle-container {
  margin-right: 0.5rem;

  .theme-label {
    font-size: 0.875rem;
    margin-left: 0.5rem;
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
</style>
