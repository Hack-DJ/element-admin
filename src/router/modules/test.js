/* Layout */
import Layout from '../../views/layout/Layout'

export default {
  path: '/template',
  name: 'Template',
  component: Layout,
  meta: { title: '公共模板测试', icon: 'power' },
  children: [
    {
      path: 'baseForm',
      name: 'BaseForm',
      component: () => import('@/views/publicTemplate/baseTable/index'),
      meta: { title: '基础table表单', icon: 'quick' }
    }
  ]
}
