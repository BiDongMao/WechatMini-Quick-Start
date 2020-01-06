// components/modal-button/modal-button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
     // 重置
    resetChose() {
      this.triggerEvent('onResetClick');
     
    },
    // 确定
    confirmChose() {
      this.triggerEvent('onComfirmClick');
    },
  }
})
