import Vue from "vue";
import { h } from "vue-demi";

import App from "@/App.vue";
import router from "@/router";
import store from "@/stores";
import '@/assets/styles/app.css';

Vue.config.productionTip = false;
Vue.config.devtools = true;

const app = new Vue({
  router,
  store,
  render: () => h(App),
});
app.$mount("#app");
