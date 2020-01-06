const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    }, 
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    tabList:[
      { id: 1, title: "首页", icon:"cuIcon-homefill",isBtn:false,tag:false ,tagCount:''},
      { id: 2, title: "列表", icon: "cuIcon-similar", isBtn: false, tag: false, tagCount: ''},
      { id: 3, title: "发布", icon: "cuIcon-add", isBtn: true, tag: false, tagCount: ''},
      { id: 4, title: "基础", icon: "cuIcon-sort", isBtn: false, tag: true, tagCount: 99},
      { id: 5, title: "我的", icon: "cuIcon-my", isBtn: false, tag: true, tagCount: 0}
    ],
    activeIndex:0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击tab
    onTabClick(e){
      let index =e.currentTarget.dataset.index
      this.setData({
        activeIndex:index
      })

      this.triggerEvent('listenIndex', { index: index });
    }
  }
})