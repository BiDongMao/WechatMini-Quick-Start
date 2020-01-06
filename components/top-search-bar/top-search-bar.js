const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    
  },
  /**
   * 组件的对外属性
   */
  properties: {
    pld:{
      type:String,
      default:"请输入"
    },
    // 搜索框类型 full-input--只有输入框，left-input--左侧输入框，右侧按钮
    type:{
      type:String,
      default:"full-input"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    searchKey:''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 输入框失去焦点事件
    onInputBlur(val){
      console.log(val)
      let key=val.detail.value
      console.log(key)
      this.triggerEvent('onInputBlur', { searchKey: key});
    },
    // 输入框输入事件
    onInputInput(val){
      let key = val.detail.value
      this.setData({
        searchKey: key
      })
    },
    // 点击删除按钮
    onClearClick(){
      this.setData({
        searchKey: ''
      })
      this.triggerEvent('onInputBlur', { searchKey: '' });
    },
    // 点击右侧筛选按钮
    onSideBtnClick(){
      this.triggerEvent('onSideBtnClick');
    }

  }
})