<template>
  <div class="notification-center">
    <div class="notification-header">
      <h3>Notifications</h3>
      <div class="notification-actions">
        <button 
          class="btn btn-sm btn-primary" 
          @click="markAllAsRead"
          :disabled="loading"
        >
          Mark all as read
        </button>
        <button 
          class="btn btn-sm btn-info" 
          @click="sendTestNotification"
          :disabled="loading"
        >
          Send test notification
        </button>
      </div>
    </div>

    <div class="notification-list" v-if="notifications.length > 0">
      <div 
        v-for="notification in notifications" 
        :key="notification._id"
        class="notification-item"
        :class="{ 'unread': !notification.read }"
      >
        <div class="notification-content">
          <p>{{ notification.message }}</p>
          <small class="text-muted">{{ formatDate(notification.createdAt) }}</small>
        </div>
        <button 
          v-if="!notification.read"
          class="btn btn-sm btn-outline-primary"
          @click="markAsRead(notification._id)"
          :disabled="loading"
        >
          Mark as read
        </button>
      </div>
    </div>
    <div v-else class="no-notifications">
      No notifications
    </div>

    <div v-if="loading" class="loading">
      Loading...
    </div>
  </div>
</template>

<script>
import notificationService from '../services/notificationService';

export default {
  name: 'NotificationCenter',
  data() {
    return {
      notifications: [],
      loading: false,
      page: 1,
      limit: 10
    };
  },
  created() {
    this.loadNotifications();
    this.subscribeToNotifications();
  },
  beforeDestroy() {
    this.unsubscribeFromNotifications();
  },
  methods: {
    async loadNotifications() {
      try {
        this.loading = true;
        const response = await notificationService.getNotifications(this.page, this.limit);
        this.notifications = response.notifications;
      } catch (error) {
        this.$swal({
          title: 'Error',
          text: 'Failed to load notifications',
          icon: 'error'
        });
      } finally {
        this.loading = false;
      }
    },
    async markAsRead(notificationId) {
      try {
        this.loading = true;
        await notificationService.markAsRead(notificationId);
        const notification = this.notifications.find(n => n._id === notificationId);
        if (notification) {
          notification.read = true;
        }
      } catch (error) {
        this.$swal({
          title: 'Error',
          text: 'Failed to mark notification as read',
          icon: 'error'
        });
      } finally {
        this.loading = false;
      }
    },
    async markAllAsRead() {
      try {
        this.loading = true;
        await notificationService.markAllAsRead();
        this.notifications.forEach(notification => {
          notification.read = true;
        });
      } catch (error) {
        this.$swal({
          title: 'Error',
          text: 'Failed to mark all notifications as read',
          icon: 'error'
        });
      } finally {
        this.loading = false;
      }
    },
    async sendTestNotification() {
      try {
        this.loading = true;
        await notificationService.sendTestNotification();
        this.$swal({
          title: 'Success',
          text: 'Test notification sent successfully',
          icon: 'success'
        });
      } catch (error) {
        this.$swal({
          title: 'Error',
          text: 'Failed to send test notification',
          icon: 'error'
        });
      } finally {
        this.loading = false;
      }
    },
    subscribeToNotifications() {
      notificationService.subscribeToNotifications((notification) => {
        this.notifications.unshift(notification);
        this.$swal({
          title: 'New Notification',
          text: notification.message,
          icon: 'info',
          timer: 3000,
          showConfirmButton: false
        });
      });
    },
    unsubscribeFromNotifications() {
      notificationService.unsubscribeFromNotifications();
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    }
  }
};
</script>

<style scoped>
.notification-center {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.notification-actions {
  display: flex;
  gap: 0.5rem;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.notification-item.unread {
  background-color: #f8f9fa;
  border-left: 4px solid #007bff;
}

.notification-content {
  flex: 1;
}

.notification-content p {
  margin: 0;
}

.notification-content small {
  display: block;
  margin-top: 0.25rem;
}

.no-notifications {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.loading {
  text-align: center;
  padding: 1rem;
  color: #6c757d;
}
</style> 