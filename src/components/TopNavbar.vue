<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import notificationService from '@/services/notificationService'

const router = useRouter()
const authStore = useAuthStore()

const isMenuOpen = ref(false)
const isProfileOpen = ref(false)
const isNotificationOpen = ref(false)
const notifications = ref([])
const loading = ref(false)
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const user = computed(() => authStore.user)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value
}

const toggleNotifications = () => {
  isNotificationOpen.value = !isNotificationOpen.value
  if (isNotificationOpen.value) {
    loadNotifications()
  }
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const loadNotifications = async () => {
  try {
    loading.value = true
    const response = await notificationService.getNotifications(1, 10)
    notifications.value = response.notifications
  } catch (error) {
    console.error('Failed to load notifications:', error)
  } finally {
    loading.value = false
  }
}

const markAsRead = async (notificationId) => {
  try {
    await notificationService.markAsRead(notificationId)
    const notification = notifications.value.find(n => n._id === notificationId)
    if (notification) {
      notification.read = true
    }
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
  }
}

const markAllAsRead = async () => {
  try {
    await notificationService.markAllAsRead()
    notifications.value.forEach(notification => {
      notification.read = true
    })
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error)
  }
}

const handleNewNotification = (notification) => {
  notifications.value.unshift(notification)
  // Show toast notification
  const toast = document.createElement('div')
  toast.className = 'fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500'
  toast.innerHTML = `
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-gray-900">New Notification</p>
        <p class="text-sm text-gray-500">${notification.message}</p>
      </div>
    </div>
  `
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 5000)
}

onMounted(() => {
  notificationService.subscribeToNotifications(handleNewNotification)
})

onBeforeUnmount(() => {
  notificationService.unsubscribeFromNotifications()
})
</script>

<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Left side -->
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-8 w-auto" src="@/assets/logo.png" alt="Logo" />
          </div>
        </div>

        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <div class="relative">
            <button
              @click="toggleNotifications"
              class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span
                v-if="unreadCount > 0"
                class="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
              >
                {{ unreadCount }}
              </span>
            </button>

            <!-- Notifications dropdown -->
            <div
              v-if="isNotificationOpen"
              class="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              role="menu"
              aria-orientation="vertical"
              tabindex="-1"
            >
              <div class="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-sm font-medium text-gray-900">Notifications</h3>
                <button
                  v-if="notifications.length > 0"
                  @click="markAllAsRead"
                  class="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  Mark all as read
                </button>
              </div>
              
              <div class="max-h-96 overflow-y-auto">
                <div v-if="loading" class="px-4 py-2 text-sm text-gray-500">
                  Loading...
                </div>
                <div v-else-if="notifications.length === 0" class="px-4 py-2 text-sm text-gray-500">
                  No notifications
                </div>
                <div v-else>
                  <div
                    v-for="notification in notifications"
                    :key="notification._id"
                    class="px-4 py-2 hover:bg-gray-50 border-b border-gray-100"
                    :class="{ 'bg-gray-50': !notification.read }"
                  >
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <p class="text-sm text-gray-900">{{ notification.message }}</p>
                        <p class="text-xs text-gray-500 mt-1">
                          {{ new Date(notification.createdAt).toLocaleString() }}
                        </p>
                      </div>
                      <button
                        v-if="!notification.read"
                        @click="markAsRead(notification._id)"
                        class="ml-2 text-xs text-indigo-600 hover:text-indigo-900"
                      >
                        Mark as read
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <div>
              <button
                @click="toggleProfile"
                class="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <div class="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  {{ user?.name?.[0]?.toUpperCase() || 'U' }}
                </div>
              </button>
            </div>

            <!-- Profile dropdown menu -->
            <div
              v-if="isProfileOpen"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <div class="px-4 py-3 border-b border-gray-200">
                <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
                <p class="text-sm text-gray-500">{{ user?.email }}</p>
              </div>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
                @click="handleLogout"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  @apply text-indigo-600;
}
</style> 