import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
import List from "./pages/List.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/list",
      name: "list",
      component: List
    }
  ]
});
