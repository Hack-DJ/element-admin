/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: 'select',
  component: Layout,
  meta: { title: '统计管理', icon: 'power' },
  children: [
    {
      path: 'https://github.com/',
      meta: { title: '查看数据', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '操作日志', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '查看HTML文件', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '任务数据统计', icon: 'power' }
    },
    {
      path: 'https://github.com/',
      meta: { title: '配置管理', icon: 'power' }
    }
  ]
}
