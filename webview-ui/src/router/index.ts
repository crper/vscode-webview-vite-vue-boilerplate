import { createRouter, createMemoryHistory } from "vue-router";
const DemoLayout = () => import('@/layout/DemoLayout.vue')

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      component: DemoLayout,
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "tech",
          name: "Tech",
          component: () => import("@/views/Tech.vue"),
        },
        {
          path: "about",
          name: "About",
          component: () => import("@/views/About.vue"),
        },
        {
          path: "github",
          name: "Github",
          component: () => import("@/views/Github.vue"),
        },
        {
          path: "wallpaper",
          name: "Wallpaper",
          component: () => import("@/views/Wallpaper.vue"),
        },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' },
  ],
});

export default router;
