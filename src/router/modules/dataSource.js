/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: '/dataSource',
  component: Layout,
  redirect: '/dataSource/dataSourceWebsite',
  meta: { title: '数据源管理', icon: 'summary' },
  children: [
    {
      path: 'dataSourceWebsite',
      name: 'DataSourceWebsite',
      component: () => import('@/views/dataSource/website/index'),
      meta: { title: '网站信息', icon: 'info' }
    },
    {
      path: 'dataSourceList',
      name: 'DataSourceList',
      component: () => import('@/views/dataSource/list/index'),
      meta: { title: '采集数据', icon: 'chart' }
    }
    // {
    //   path: 'dataSourceType',
    //   name: 'DataSourceType',
    //   component: () => import('@/views/dataSource/type/index'),
    //   meta: { title: '网站类型', icon: 'component' }
    // },
    // {
    //   path: 'dataSourceStrategy',
    //   name: 'DataSourceStrategy',
    //   component: () => import('@/views/dataSource/strategy/index'),
    //   meta: { title: '采集策略', icon: 'strategy' }
    // },
  ]
}
