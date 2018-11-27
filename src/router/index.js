import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/* modules */

const POWER = 'admin'
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
// 不需要动态判断权限的路由，如登录页、404、等通用页面。
export const constantRouterMap = [
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: process.env.index_name,
          icon: 'dashboard',
          noCache: true
        }
      }
    ]
  }
]
// 需求动态判断权限并通过 addRouters 动态添加的页面。
export const asyncRouterMap = [
  {
    path: '/power',
    component: Layout,
    redirect: '/power/svg-icons',
    name: 'Power',
    meta: { title: '权限', icon: 'power' },
    children: [
      {
        path: 'svg-icons',
        name: 'Icons',
        component: () => import('@/views/power/svg-icons/index'),
        meta: { title: '图标', icon: 'icon', roles: [POWER] }
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/power/permission/index'),
        meta: { title: '规则', icon: 'power', roles: [POWER] }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '案例', icon: 'example', roles: [POWER] },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '表格', icon: 'table', roles: [POWER] }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '树', icon: 'tree', roles: [POWER] }
      }
    ]
  },

  {
    path: '/form',
    redirect: '/form/index',
    name: 'Form',
    component: Layout,
    meta: {
      title: '表单',
      icon: 'nested',
      roles: [POWER], noCache: true
    },
    children: [
      {
        path: 'index',
        name: 'Form1',
        component: () => import('@/views/form/index'),
        meta: {
          title: 'Form', icon: 'form', roles: [POWER, 'admin2'], noCache: true
        }
      },
      {
        path: 'index2',
        name: 'Form2',
        component: () => import('@/views/form/index2'),
        meta: {
          title: 'Form2',
          icon: 'form',
          roles: [POWER, 'admin2']
        }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
      roles: [POWER]
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1', roles: [POWER] },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2', roles: [POWER] }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    name: 'Link',
    meta: { title: 'Link', icon: 'example', roles: [POWER, 'admin2'] },
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link1', icon: 'link', roles: [POWER] }
      },
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: {
          title: 'External Link2',
          icon: 'link',
          roles: [POWER, 'admin2']
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
