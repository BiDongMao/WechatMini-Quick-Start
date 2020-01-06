var listControls = require('../../behaviors/list-controls.js')//注入列表公用属性
const app = getApp();
Component({
  behaviors: [listControls],
  /**
   * 组件的一些选项
   */
  options: {

  },
  /**
   * 组件的对外属性
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0,//tab激活下标
    tabList:[
      { id: 1, name: '入库单'},
      { id: 2 ,name: '出库单' },
      { id: 3, name: '采购单' },
      { id: 4, name: '销售单' },
    ]
  },
  // 生命周期
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取tab激活状态
    getTabIndex(e){
      console.log("tab激活状态",e.detail.index)
      let currentIndex=e.detail.index
      let searchForm=this.data.searchForm
      let tabList = this.data.tabList

      searchForm.type = tabList[currentIndex].id
      this.setData({ currentIndex, searchForm})
      this.init()
      this.getDataList()
    }

  }
})