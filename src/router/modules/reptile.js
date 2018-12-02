/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: 'reptile',
  component: Layout,
  meta: { title: '爬虫管理', icon: 'power' },
  children: [
    {
      path: 'https://github.com/',
      meta: { title: '任务', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '服务', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '服务治理', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '解析模版', icon: 'power' }
    }
  ]
}
