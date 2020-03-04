import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/components/_globals";
import "@/assets/css/github-markdown.css";
import "@/assets/css/app.css";
import "@/filters";
const NProgress = require("nprogress");
(function() {
  if (typeof NodeList.prototype.forEach === "function") return false;
  NodeList.prototype.forEach = Array.prototype.forEach;
})();

(function() {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
})();
NProgress.configure({ showSpinner: true });

import browserDetect from "vue-browser-detect-plugin";
Vue.use(browserDetect);

import VueMeta from "vue-meta";
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});

// import VueAnalytics from "vue-analytics";
// Vue.use(VueAnalytics, {
//   id: "UA-xxxxxx-x",
//   debug: {
//     sendHitTask: process.env.NODE_ENV === "production"
//   }
// });

// Set up app wide read-only configs and install as plugin
import { myApp } from "./services/AppInit";
myApp.install = function() {
  Object.defineProperty(Vue.prototype, "$myApp", {
    get() {
      return myApp;
    }
  });
};
Vue.use(myApp);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
