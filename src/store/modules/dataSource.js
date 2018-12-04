// import { getType, getInfo, getStrategy, getList } from '@/api/dataSource'
import { getType } from '@/api/dataSource'

const dataSource = {
  state: {
    typeList: []
  },

  mutations: {
    SET_TYPELIST: (state, roles) => {
      state.typeList = roles
    }
  },

  actions: {
    // 获取规则列表
    GetDataSourceType({ commit }) {
      return new Promise((resolve, reject) => {
        getType().then(response => {
          const data = [
            {
              'id': 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff',
              'name': '生查切级设单',
              'parentId': '1',
              parentIds: '1'
            },
            {
              'id': '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d',
              'name': '无他支小知',
              'parentId': 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff',
              parentIds: 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff'
            },
            {
              'id': '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD',
              'name': '论造表分教',
              'parentId': 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff',
              parentIds: 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff'
            },
            {
              'id': 'f627D54e-7E71-5C9F-36FC-18DACcAaDC4f',
              'name': '队发达快',
              'parentId': 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff',
              parentIds: 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff'
            },
            {
              'id': '87E7BaBb-ccfb-2cf1-e9af-Ffb7DBDB855a',
              'name': '历况利点美规',
              'parentId': '1',
              parentIds: '1'
            },
            {
              'id': '14B26EfC-08C4-15F3-dDFE-aBaefC911B16',
              'name': '五记段定',
              'parentId': '87E7BaBb-ccfb-2cf1-e9af-Ffb7DBDB855a',
              parentIds: 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff'
            },
            {
              'id': 'Bb48934A-20BA-bfBb-9Dd4-bda5ebdDBbc8',
              'name': '己新存叫联',
              'parentId': '87E7BaBb-ccfb-2cf1-e9af-Ffb7DBDB855a',
              parentIds: 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff'
            },
            {
              'id': 'CDFA8a2b-e7A9-3Ec9-710A-eEB6c4DFCF8a',
              'name': '线设候',
              'parentId': 'Bb48934A-20BA-bfBb-9Dd4-bda5ebdDBbc8',
              parentIds: 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff，Bb48934A-20BA-bfBb-9Dd4-bda5ebdDBbc8'
            },
            {
              'id': 'f62c973b-3E5f-8a7F-7b78-D69eeEE0d87E',
              'name': '众质和县便意',
              'parentId': 'CDFA8a2b-e7A9-3Ec9-710A-eEB6c4DFCF8a',
              parentIds: 'B15E3d8d-fc7C-9fdB-c27f-fCeCee40FEff，Bb48934A-20BA-bfBb-9Dd4-bda5ebdDBbc8,CDFA8a2b-e7A9-3Ec9-710A-eEB6c4DFCF8a'
            },
            {
              'id': '5eA2F1A6-FE8f-2A4C-bEe4-9D8Ff482d329',
              'name': '在历维',
              'parentId': '1',
              parentIds: '1'
            },
            {
              'id': '9dEd388d-a1aa-EfeA-24CD-CFc99AD346eF',
              'name': '种指天属单确',
              'parentId': '1',
              parentIds: '1'
            },
            {
              'id': '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b',
              'name': '之眼铁后号',
              'parentId': '1',
              parentIds: '1'
            },
            {
              'id': 'fA4E4fdB-1890-BCe3-89AE-75b4AF2c44DF',
              'name': '铁说越风',
              'parentId': '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b',
              parentIds: '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b'
            },
            {
              'id': '7f1C21eD-C7f9-e2dC-54BB-A27653e09664',
              'name': '条民行满',
              'parentId': '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b',
              parentIds: '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b'
            },
            {
              'id': '7fBFAc1c-fdf2-e4EF-13dc-A0C539fC9928',
              'name': '表作级',
              'parentId': '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b',
              parentIds: '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b'
            },
            {
              'id': '6CaD8AFF-Df6f-18cB-Ae56-87E72Bb2CcA1',
              'name': '议分斗林',
              'parentId': '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b',
              parentIds: '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b'
            },
            {
              'id': 'bbA12685-7Fa0-f545-f831-5F62CabBfd73',
              'name': '前权可更',
              'parentId': '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b',
              parentIds: '47A5caE3-AF8c-F8fb-B896-b5cb2D4EA74b'
            }
          ]
          commit('SET_TYPELIST', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default dataSource
