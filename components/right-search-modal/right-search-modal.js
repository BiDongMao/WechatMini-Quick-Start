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
    showModal: {
      type: Boolean,
      value: false
    },
    type: {
      type: Number,//1-单条筛选 2-多条筛选
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    RpxToPx: app.globalData.RpxToPx,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 隐藏弹窗
    hideModal() {
      // this.setData({
      //   showModal:false//直接改变组件中的值，会导致父组件的值没有改变
      // })
      this.triggerEvent('onShowModal')//调用父组件的方法
    }
  }
})
