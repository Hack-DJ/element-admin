/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: '/dataSource',
  component: Layout,
  redirect: '/dataSource/dataSourceType',
  meta: { title: '数据源管理', icon: 'power' },
  children: [
    {
      path: 'dataSourceType',
      name: 'DataSourceType',
      component: () => import('@/views/dataSource/type/index'),
      meta: { title: '网站类型', icon: 'power' }
    },
    {
      path: 'dataSourceInfo',
      name: 'DataSourceInfo',
      component: () => import('@/views/dataSource/info/index'),
      meta: { title: '网站信息', icon: 'power' }
    },
    {
      path: 'dataSourceStrategy',
      name: 'DataSourceStrategy',
      component: () => import('@/views/dataSource/strategy/index'),
      meta: { title: '采集策略', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '采集数据', icon: 'power' }
    }
  ]
}
