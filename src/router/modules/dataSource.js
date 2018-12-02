/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: 'source',
  component: Layout,
  meta: { title: '数据源管理', icon: 'power' },
  children: [
    {
      path: 'https://github.com/',
      meta: { title: '网站类型', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '网站信息', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '采集策略', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '采集数据', icon: 'power' }
    }
  ]
}
