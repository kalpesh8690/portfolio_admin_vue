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

// Use plugins
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
