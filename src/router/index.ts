import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/beers",
    name: "beers",
    component: () => import("../views/List.vue")
  },
  {
    path: "/beers/:id",
    name: "detail",
    component: () => import("../views/Detail.vue"),
    props: true
  },
  {
    path: "/random",
    redirect: `/beers/${Math.floor(Math.random() * 325) + 1}`
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
