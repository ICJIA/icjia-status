import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  {
    path: "/",
    name: "Home",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  // {
  //   path: "*",
  //   redirect: "/"
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
