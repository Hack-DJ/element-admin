/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: '/power',
  name: 'Power',
  component: Layout,
  redirect: '/power/permission',
  meta: { title: '系统管理', icon: 'system' },
  children: [
    {
      path: 'permission',
      name: 'Permission',
      component: () => import('@/views/power/permission/index'),
      meta: { title: '菜单管理', icon: 'power' }
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/power/role/index'),
      meta: { title: '角色管理', icon: 'role' }
    },
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/power/user/index'),
      meta: { title: '用户管理', icon: 'user' }
    },
    {
      path: 'dict',
      name: 'Dict',
      component: () => import('@/views/power/dict/index'),
      meta: { title: '系统字典', icon: 'dict' }
    }
    // {
    //   path: 'permission3',
    //   name: 'Permission3',
    //   component: () => import('@/views/power/permission/index'),
    //   meta: { title: '系统业务参数', icon: 'power' }
    // },
    // {
    //   path: 'permission4',
    //   name: 'Permission4',
    //   component: () => import('@/views/power/permission/index'),
    //   meta: { title: '设置', icon: 'power' }
    // },
    // {
    //   path: 'svg-icons',
    //   name: 'Icons',
    //   component: () => import('@/views/power/svg-icons/index'),
    //   meta: { title: '图标管理', icon: 'icon' }
    // }
  ]
}
