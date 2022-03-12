import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import AddWork from "../views/works/AddWork.vue";
import WorkDetail from "../views/works/WorkDetail.vue";
import { authRef } from "../firebase/config";

const authLogin = (to, from, next) => {
  let user = authRef.currentUser;

  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: authLogin,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/addwork",
    name: "AddWork",
    component: AddWork,
    beforeEnter: authLogin,
  },
  {
    path: "/works/:id",
    name: "WorkDetail",
    component: WorkDetail,
    beforeEnter: authLogin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
