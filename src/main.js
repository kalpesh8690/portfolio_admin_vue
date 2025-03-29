import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from "vue-router-prefetch";
import BlackDashboard from "./plugins/blackDashboard";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import "./registerServiceWorker";
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/css/tailwind.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import socketService from './services/socket'

// Use plugins
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(VueSweetalert2);

// Make socket service available globally
Vue.prototype.$socket = socketService;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  created() {
    // Initialize socket connection when the app starts
    // You should replace this with your actual JWT token
    const token = localStorage.getItem('token'); // or however you store your JWT token
    
    if (token) {
      this.$socket.connect(token);
    }
  },
  mounted() {
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);
    socketService.joinRoom(userData._id);
  },
  beforeDestroy() {
    // Clean up socket connection when the app is destroyed
    this.$socket.disconnect();
  }
});
