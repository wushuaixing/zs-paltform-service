import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/common/layout';
import Login from '@/views/login/index';
import RouterSpace from '@/components/router-space';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'default',
    component: Layout,
    redirect: 'overview',
    children:[
      {
        path: '',
        name: 'main-default',
        redirect: 'overview',
        component:()=>import("@/views/main"),
        children: [
          {
            path: 'overview',
            name:'overview/workbench',
            component:()=>import("@/views/main/overview/workbench")
          },
          {
            path: 'provider',
            name:'service-provider',
            redirect: 'provider/review',
            component: RouterSpace,
            children:[
              {
                path: 'review',
                name:'service-provider/to-review',
                component:()=>import("@/views/main/service-provider/to-review"),
              },
              {
                path: 'storage',
                name:'service-provider/be-storage',
                component:()=>import("@/views/main/service-provider/be-storage"),
              },
            ]
          },
        ]
      },
      {
        path: 'center',
        name: 'investment-center',
        component:()=>import("@/views/investment-center"),
      },


      // {
      //   path: 'investment',
      //   name:'investment',
      //   redirect: 'investment/list',
      //   component:RouterSpace,
      //   children:[
      //     {
      //       path: 'list',
      //       name:'investment/item-list',
      //       component:()=>import("@/views/main/investment/item-list"),
      //     },
      //     {
      //       path: 'list/detail/:id',
      //       name:'investment/item-detail',
      //       component:()=>import("@/views/main/investment/item-detail"),
      //     },
      //   ]
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode:'history',
  routes
});

export default router
