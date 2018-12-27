export default [
  {
    id: 2,
    parentId: '1',
    name: '统计管理',
    href: '/abc',
    component: 'Layout',
    redirect: '/abc/storeDataQuick3',
    icon: 'power'
  },
  {
    id: 3,
    parentId: '2',
    name: '快捷存储2',
    href: '/storeDataQuick3',
    component: 'test',
    icon: 'quick'
  },
  {
    id: 4,
    parentId: '2',
    name: '存储管理1',
    href: '/storeDataIndex1',
    component: 'test',
    icon: 'quick',
    redirect: '/abc/storeDataIndex1/storeDataIndex5'
  },
  {
    id: 5,
    parentId: '4',
    name: '存储管理5',
    href: '/storeDataIndex5',
    component: 'test',
    icon: 'quick',
    redirect: ''
  },
  {
    id: 6,
    parentId: '4',
    name: '存储管理6',
    href: '/storeDataIndex6',
    component: 'test',
    icon: 'quick',
    redirect: ''
  }
]
