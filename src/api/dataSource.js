import request from '@/utils/request'

const mode = '/ips/a/ips'

export function getPageConfig() {
  return request({
    url: mode + '/website/config',
    method: 'get'
  })
}

export function getWebsite(params) {
  return request({
    url: mode + '/website/list',
    method: 'get',
    params
  })
}

export function getType(params) {
  return new Promise(resolve => {
    const res = {
      'ret': 0,
      'msg': '',
      'data': {
        'list': [
          {
            'id': 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff',
            'name': 'POI类数据',
            'parentId': '1',
            parentIds: '1'
          },
          {
            'id': '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d',
            'name': '百度POI',
            'parentId': 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff',
            parentIds: 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff'
          },
          {
            'id': '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD',
            'name': '高德POI',
            'parentId': 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff',
            parentIds: 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff'
          },
          {
            'id': '87E7BaBb-ccfb-2cf1-e9af-Ffb7DBDB855a',
            'name': '房屋信息',
            'parentId': '1',
            parentIds: '1'
          },
          {
            'id': '14B26EfC-08C4-15F3-dDFE-aBaefC911B16',
            'name': '链家',
            'parentId': '87E7BaBb-ccfb-2cf1-e9af-Ffb7DBDB855a',
            parentIds: '87E7BaBb-ccfb-2cf1-e9af-Ffb7DBDB855a'
          },
          {
            'id': 'Bb48934A-20BA-bfBb-9Dd4-bda5ebdDBbc8',
            'name': '房天下',
            'parentId': '87E7BaBb-ccfb-2cf1-e9af-Ffb7DBDB855a',
            parentIds: '87E7BaBb-ccfb-2cf1-e9af-Ffb7DBDB855a'
          },
          {
            'id': 'CDFA8a2b-e7A9-3Ec9-710A-eEB6c4DFCF8a',
            'name': '315house',
            'parentId': '87E7BaBb-ccfb-2cf1-e9af-Ffb7DBDB855a',
            parentIds: '87E7BaBb-ccfb-2cf1-e9af-Ffb7DBDB855a'
          },
          {
            'id': '5eA2F1A6-FE8f-2A4C-bEe4-9D8Ff482d329',
            'name': '团购、外卖类数据',
            'parentId': '1',
            parentIds: '1'
          },
          {
            'id': 'f62c973b-3E5f-8a7F-7b78-D69eeEE0d87E',
            'name': '大众点评',
            'parentId': '5eA2F1A6-FE8f-2A4C-bEe4-9D8Ff482d329',
            parentIds: '5eA2F1A6-FE8f-2A4C-bEe4-9D8Ff482d329'
          },
          {
            'id': '9dEd388d-a1aa-EfeA-24CD-CFc99AD346eF',
            'name': '美团',
            'parentId': '5eA2F1A6-FE8f-2A4C-bEe4-9D8Ff482d329',
            parentIds: '5eA2F1A6-FE8f-2A4C-bEe4-9D8Ff482d329'
          },
          {
            'id': '952Ed388d-a1aa-EfeA-24CD-CFc99AD346eF',
            'name': '百度糯米',
            'parentId': '5eA2F1A6-FE8f-2A4C-bEe4-9D8Ff482d329',
            parentIds: '5eA2F1A6-FE8f-2A4C-bEe4-9D8Ff482d329'
          },
          {
            'id': '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b',
            'name': '旅游类垂直电商',
            'parentId': '1',
            parentIds: '1'
          },
          {
            'id': 'fA4E4fdB-1890-BCe3-89AE-75b4AF2c44DF',
            'name': '重庆农家网',
            'parentId': '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b',
            parentIds: '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b'
          },
          {
            'id': '7f1C21eD-C7f9-e2dC-54BB-A27653e09664',
            'name': '重庆农家乐网',
            'parentId': '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b',
            parentIds: '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b'
          },
          {
            'id': '7fBFAc1c-fdf2-e4EF-13dc-A0C539fC9928',
            'name': '村游网',
            'parentId': '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b',
            parentIds: '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b'
          },
          {
            'id': '6CaD8AFF-Df6f-18cB-Ae56-87E72Bb2CcA1',
            'name': '爱打听周边游网',
            'parentId': '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b',
            parentIds: '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b'
          }
        ]
      }
    }
    resolve(res)
  })
}

export function getList(params) {
  return request({
    url: mode + '/collectData/list',
    method: 'get',
    params
  })
}
