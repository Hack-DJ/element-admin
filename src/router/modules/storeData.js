/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: 'stored',
  component: Layout,
  meta: { title: '存储数据管理', icon: 'power' },
  children: [
    {
      path: 'https://github.com/',
      meta: { title: '数据库信息', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '数据表信息', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '采集内容', icon: 'power' }
    }
  ]
}
