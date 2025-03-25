import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  connect(token) {
    if (this.connected) return;

    this.socket = io(process.env.VUE_APP_SOCKET_URL || 'http://localhost:3000', {
      auth: {
        token
      }
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.connected = false;
    });

    this.socket.on('notification', (notification) => {
      console.log('New notification:', notification);
      // Emit a Vue event that can be listened to by components
      this.$emit('notification', notification);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  // Method to emit events
  emit(event, data) {
    if (this.socket && this.connected) {
      this.socket.emit(event, data);
    }
  }
}

export default new SocketService(); 