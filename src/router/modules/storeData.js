/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: '/storeData',
  component: Layout,
  redirect: '/storeData/storeDataLibrary',
  meta: { title: '存储数据管理', icon: 'power' },
  children: [
    {
      path: 'storeDataLibrary',
      name: 'StoreDataLibrary',
      component: () => import('@/views/storeData/library/index'),
      meta: { title: '数据库信息', icon: 'power' }
    },
    {
      path: 'storeDataTable',
      name: 'StoreDataTable',
      component: () => import('@/views/storeData/table/index'),
      meta: { title: '数据表信息', icon: 'power' }
    },
    {
      path: 'storeDataData',
      name: 'StoreDataData',
      component: () => import('@/views/storeData/data/index'),
      meta: { title: '采集内容', icon: 'power' }
    }
  ]
}
