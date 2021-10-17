import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
import Orders from "@/views/Orders.vue";
import Cart from "@/views/Cart.vue";
import Profile from "@/views/Profile.vue";

export default [
  {
    path: "/",
    name: "IndexHome",
    component: Index,
    meta: { layout: "AppLayoutDefault" },
    children: [
      {
        path: "/login",
        name: "LoginView",
        component: Login,
        meta: { layout: "AppLayoutDefault" },
      },
    ],
  },
  {
    path: "/orders",
    name: "OrdersView",
    component: Orders,
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/cart",
    name: "CartView",
    component: Cart,
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: Profile,
    meta: { layout: "AppLayoutWithSidebar" },
  },
];
