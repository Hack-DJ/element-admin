/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: '/storeData',
  component: Layout,
  redirect: '/storeData/storeDataLibrary',
  meta: { title: '存储数据管理', icon: 'storeData' },
  children: [
    {
      path: 'storeDataQuick',
      name: 'storeDataQuick',
      component: () => import('@/views/storeData/quick/index'),
      meta: { title: '快捷存储', icon: 'quick' }
    },
    {
      path: 'storeDataLibrary',
      name: 'storeDataLibrary',
      component: () => import('@/views/storeData/library/index'),
      meta: { title: '数据库信息', icon: 'database' }
    },
    {
      path: 'storeDataTable',
      name: 'StoreDataTable',
      component: () => import('@/views/storeData/table/index'),
      meta: { title: '数据表信息', icon: 'databaseTable' }
    },
    {
      path: 'storeDataData',
      name: 'StoreDataData',
      component: () => import('@/views/storeData/data/index'),
      meta: { title: '采集内容', icon: 'databaseData' }
    }
  ]
}
