// components/top-tab-bar/top-tab-bar.js
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
    list:{
      type:Array,
      value:[]
    },
    TabCur:{
      type:Number,
      value:0
    }
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
    // 切换标签页
    tabSelect(e){
      let index=e.currentTarget.dataset.index
      console.log("标签页切换-index",index)
      this.triggerEvent('watchIndex', { index: index }, { bubbles: true, composed: true });
    }
  }
})
