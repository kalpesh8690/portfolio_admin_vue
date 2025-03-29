import axios from 'axios';
import socketService from './socket';

class NotificationService {
  constructor() {
    this.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000';
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // Get auth header
  getAuthHeader() {
    return {
      Authorization: `Bearer ${this.getAuthToken()}`
    };
  }

  // Get all notifications with pagination
  async getNotifications(page = 1, limit = 10) {
    try {
      const response = await axios.get(`${this.baseURL}/notifications`, {
        headers: this.getAuthHeader(),
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const response = await axios.put(
        `${this.baseURL}/notifications/${notificationId}/read`,
        {},
        { headers: this.getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  // Mark all notifications as read
  async markAllAsRead() {
    try {
      const response = await axios.put(
        `${this.baseURL}/notifications/read-all`,
        {},
        { headers: this.getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  // Send test notification
  async sendTestNotification() {
    try {
      const response = await axios.post(
        `${this.baseURL}/notifications/test`,
        {},
        { headers: this.getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending test notification:', error);
      throw error;
    }
  }

  // Subscribe to real-time notifications
  subscribeToNotifications(callback) {
    socketService.socket.on('notification', callback);
  }

  // Unsubscribe from real-time notifications
  unsubscribeFromNotifications() {
    socketService.socket.off('notification');
  }
}

export default new NotificationService(); 