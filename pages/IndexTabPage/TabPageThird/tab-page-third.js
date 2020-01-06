// components/right-search-modal/right-search-modal.js
const app = getApp();
Component({
  /**
  * 组件的一些选项
  */
  options: {
    addGlobalClass: true,//允许全局样式覆盖，本组件的样式不影响其他组件
    multipleSlots: true  // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    RpxToPx: app.globalData.RpxToPx,
    pathList:[
      { path: '/pages/basicList/basic-list', name:' 列表', id: 1},
      { path: '/pages/tabsList/tabs-list', name: 'tabs列表', id: 2 },
      { path: '/pages/basicForm/formIndex/form-index', name: '表单', id: 3 }

    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转页面
    jumpToPage(e){
      let d = e.currentTarget.dataset
      let index=d.index
      let id = d.id ? d.id:0
      let pathList=this.data.pathList
      let url = pathList[index] ? pathList[index].path:''
      app.WxService.navigateTo(url, { id: id })
    }
  }
})
