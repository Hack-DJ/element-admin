/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: '/reptile',
  component: Layout,
  redirect: '/reptile/reptileTask',
  meta: { title: '爬虫管理', icon: 'power' },
  children: [
    {
      path: 'reptileTask',
      name: 'ReptileTask',
      component: () => import('@/views/reptile/task/index'),
      meta: { title: '任务', icon: 'power' }
    },
    {
      path: 'reptileService',
      name: 'ReptileService',
      component: () => import('@/views/reptile/service/index'),
      meta: { title: '服务', icon: 'power' }
    },
    {
      path: 'reptileServiceStask',
      name: 'ReptileServiceStask',
      component: () => import('@/views/reptile/serviceStask/index'),
      meta: { title: '服务的任务', icon: 'power' }
    },
    {
      path: 'reptileGovern',
      name: 'ReptileGovern',
      component: () => import('@/views/reptile/govern/index'),
      meta: { title: '服务治理', icon: 'power' }
    }
    // ,
    // {
    //   path: 'https://github.com/',
    //   meta: { title: '解析模版', icon: 'power' }
    // }
  ]
}
