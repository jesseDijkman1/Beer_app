import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Categories from "./views/Categories.vue";
import Random from "./views/Random.vue";

// Probably don't need a Random page, just a detail page with a random button

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/categories",
      name: "categories",
      component: Categories,
    },
    {
      path: "/random",
      name: "random",
      component: Random,
    },
  ],
});
