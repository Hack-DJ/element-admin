'use strict'
import Vue from 'vue'

export default function treeToArray(data, expandAll) {
  const tmp = []
  data.forEach(function(record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    const parentIds = record.parentIds.split(',').filter(item => item)
    const _level = parentIds.length > 2 ? parentIds.length - 1 : 1
    Vue.set(record, '_level', _level)
    // 查找父节点及子节点
    let parent = null
    const children = []
    data.forEach(item => {
      if (parseInt(record.parentId) !== 1) {
        // 父节点
        if (item.id === record.parentId) {
          parent = item
        }
      }
      // 子节点
      if (item.parentId === record.id) {
        children.push(item)
      }
    })
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    if (children.length > 0) {
      Vue.set(record, 'children', children)
    }

    tmp.push(record)
  })
  return tmp
}
