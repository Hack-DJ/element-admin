/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: '/abc',
  name: 'Abc',
  component: Layout,
  redirect: '/abc/storeDataQuick3',
  meta: { title: '统计管理', icon: 'power' },
  children: [
    {
      path: 'storeDataQuick3',
      name: 'StoreDataQuick3',
      component: () => import('@/views/storeData/quick/index'),
      meta: { title: '快捷存储2', icon: 'quick' }
    },
    {
      path: 'storeDataIndex1',
      name: 'StoreDataIndex1',
      redirect: '/abc/storeDataIndex1/storeDataIndex5',
      meta: { title: '存储管理1', icon: 'quick' },
      children: [
        {
          path: 'storeDataIndex5',
          name: 'StoreDataIndex5',
          component: () => import('@/views/storeData/index/index'),
          meta: { title: '存储管理5', icon: 'quick' }
        },
        {
          path: 'storeDataIndex6',
          name: 'StoreDataIndex6',
          component: () => import('@/views/storeData/index/index'),
          meta: { title: '存储管理6', icon: 'quick' }
        }
      ]
    },
    {
      path: 'external-link',
      children: [
        {
          path: 'https://github.com/PanJiaChen/vue-element-admin',
          meta: { title: 'externalLink', icon: 'link' }
        }
      ]
    }]
}
