import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.currentRoom = null;
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
      // Start ping interval after connection
      this.startPingInterval();
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.connected = false;
      // Clear ping interval on disconnect
      this.clearPingInterval();
    });

    this.socket.on('joined', (response) => {
      if (response.success) {
        console.log(`Successfully joined room: ${response.room}`);
        this.currentRoom = response.room;
      }
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    this.socket.on('notification', (notification) => {
      console.log('New notification:', notification);
      // Emit a Vue event that can be listened to by components
      this.$emit('notification', notification);
    });

    this.socket.on('pong', () => {
      console.log('Received pong from server');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
      this.currentRoom = null;
      this.clearPingInterval();
    }
  }

  // Method to join a user's notification room
  joinRoom(userId) {
    if (this.socket && this.connected) {
      this.socket.emit('join', userId);
    }
  }

  // Method to emit events
  emit(event, data) {
    if (this.socket && this.connected) {
      this.socket.emit(event, data);
    }
  }

  // Ping interval management
  startPingInterval() {
    this.pingInterval = setInterval(() => {
      if (this.socket && this.connected) {
        this.socket.emit('ping');
      }
    }, 30000); // Send ping every 30 seconds
  }

  clearPingInterval() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}

export default new SocketService(); 