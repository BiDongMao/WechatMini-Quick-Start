//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    activeIndex:0,
    inputValue:"",
    isFocus:true
   
  },
  watch: {
    activeIndex: function (newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  },
  onLoad: function () {
    app.setWatcher(this)
  },
  getTabIndex(e){
    let activeIndex=e.detail.index
    this.setData({ activeIndex})
  },
  bindValueBlur(e){
    console.log("blur",e)
  },
  buttonClick(){
    console.log("click")
  },
  getFocus(){
    console.log("get")
    // this.setData({
    //   isFocus:!this.data.isFocus
    // })
  }
 
})
