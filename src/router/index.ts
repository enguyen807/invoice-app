import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { name: "dashboard" },
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
      },
      {
        path: "/invoice/:id",
        name: "Invoice",
        component: () =>
          import(
            /* webpackChunkName: "invoice" */ "@/views/Invoice/Invoice.vue"
          ),
      },
    ],
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () =>
      import(/* webpackChunkName: "sign-in" */ "@/views/auth/LoginView.vue"),
  },
  // {
  //   path: "/sign-up/:token?",
  //   name: "sign-up",
  //   props: true,
  //   meta: { requiresAuth: false, allowedContractorPage: true },
  //   component: () =>
  //     import(/* webpackChunkName: "sign-up" */ "@/views/auth/SignUp.vue"),
  // },
  // {
  //   path: "/forgot-password",
  //   name: "forgot-password",
  //   meta: { requiresAuth: false, allowedContractorPage: true },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "forgot-password" */ "@/views/auth/ForgotPassword.vue"
  //     ),
  // },
  // {
  //   path: "/reset-password/:token",
  //   name: "reset-password",
  //   props: true,
  //   meta: { requiresAuth: false, allowedContractorPage: true },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "reset-password" */ "@/views/auth/ResetPassword.vue"
  //     ),
  // },
  // {
  //   path: "/thank-you-signup",
  //   name: "thank-you-signup",
  //   props: true,
  //   meta: { requiresAuth: false, allowedContractorPage: true },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "thank-you-signup" */ "@/views/auth/ThankYouSignup.vue"
  //     ),
  // },
  // {
  //   path: "/:catchAll(.*)",
  //   redirect: "/404",
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/sign-in"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/sign-in";
  }
});

export default router;

// export const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   linkActiveClass: "active",
//   routes: [
//     { path: "/", component: HomeView },
//     { path: "/login", component: LoginView },
//   ],
// });

// router.beforeEach(async (to) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ["/login"];
//   const authRequired = !publicPages.includes(to.path);
//   const auth = useAuthStore();

//   if (authRequired && !auth.user) {
//     auth.returnUrl = to.fullPath;
//     return "/login";
//   }
// });
