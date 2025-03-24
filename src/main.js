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

// Use plugins
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(VueSweetalert2);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
