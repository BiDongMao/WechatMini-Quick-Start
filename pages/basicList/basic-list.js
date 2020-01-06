var listControls = require('../../behaviors/list-controls.js')//注入公用属性
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


  }
})