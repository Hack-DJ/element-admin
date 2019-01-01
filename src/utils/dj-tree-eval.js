'use strict'
import groupBy from 'lodash/groupBy'
import Vue from 'vue'

const permissionIdKey = function(list = []) {
  const id = {}
  list.map(row => {
    const index = row.id
    id[index] = row
  })
  return id
}
const generationTree = function(list, idKey = []) {
  const children = groupBy(list, 'parentId')
  for (const index in idKey) {
    const row = idKey[index]
    if (children[index]) {
      row.children = children[index]
    }
  }
  return children['allList']
}

export default function treeToArray(data, expandAll) {
  const tmp = []
  data.forEach(function(record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    const parentIds = record.parentIds.split(',').filter(item => item)
    const _level = parentIds.length
    Vue.set(record, '_level', _level)
    // 查找父节点及子节点
    let parent = null
    const children = []
    data.forEach(item => {
      // 父节点
      if (item.id === record.parentId) {
        parent = item
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

  return generationTree(tmp, permissionIdKey(tmp))

  // return tmp
}
