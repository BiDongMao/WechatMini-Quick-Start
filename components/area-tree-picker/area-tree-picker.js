const app = getApp();
import areaList from '../../utils/areaList.js'//地区列表
Component({
  behaviors: ['wx://form-field'],//设置表单控件行为
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的对外属性
   */
  properties: {
    ids:{  //[37,67,69]省市区id 
      type:Array,
      default:""
    },
   
    
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    list:[],//列表
    multiList: [],//多选联动列表
    multiIndex:[0,0,0],
    pickerValue:{
      ids:[],
      names:[]
    },
    value:[]
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    refresh(ids){
      let multiList = wx.getStorageSync("areaTreeMultiList")
      let list = wx.getStorageSync("areaTree")
      if (ids) this.defaultDataHandle(ids, list, multiList)
      
    },
    // 获取仓库货架列表
    // 地区树状列表
    getAddressSelect(ids) {
      // //////本地地区数据s//////////
      wx.setStorageSync("areaTree", areaList)
      this.multiListHandle(ids, areaList)
      // //////本地地区数据e//////////


      // let _this = this
      // app.HttpRequest.Request(
      //   "get",
      //   `/area/tree`,
      //   {},
      //   '请求中',
      //   function (res) {
      //     wx.setStorageSync("areaTree", res.data.list)
      //     let list=res.data.list
      //     _this.multiListHandle(ids, list)

      //   }
      // )

    },
    // 处理级联多选列表
    multiListHandle(ids,list){
      let multiList = []
      let subList = list.length > 0 ? list[0].children : []//初始化第一个选项的子级选项列表
      let subSubList=[]
      if (list.length > 0 && list[0].children && list[0].children[0].length>0){
        subSubList = list[0].children[0].children //初始化第一个选项的第三列选项列表
      }
      

      multiList = [
        list,
        subList,
        subSubList
      ]
      if (ids) this.defaultDataHandle(ids, list, multiList)

      this.setData({
        list,
        multiList
      });
      // console.log("areaTreeMultiList", multiList)
      wx.setStorageSync("areaTreeMultiList", multiList)

    },
    // 默认值处理
    defaultDataHandle(ids, list, multiList){
      wx.showLoading({
        title: '加载中',
      })
      let pickerValue = this.data.pickerValue
      let multiIndex = this.data.multiIndex
      pickerValue.ids = ids
      list =list || []
      // 第一列
      if(ids.length>1){
        list.forEach((item, index) => {
            if (item.id==ids[0]){
              // console.log(item)
              pickerValue.names[0]=item.name
              multiIndex[0]=index
              multiList[1] = item.children
              // 第二列
              if (item.children) {
                item.children.forEach((cItem, cIndex) => {

                  if (cItem.id == ids[1]) {
                    // console.log(cItem)

                    pickerValue.names[1] = cItem.name
                    multiIndex[1] = cIndex
                    multiList[2] = cItem.children ? cItem.children:[]
                  }
                  // 第三列
                  if (cItem.children){
                    cItem.children.forEach((tItem, tIndex) => {
                      
                      if (tItem.id == ids[2]) {
                        // console.log(cItem)
                        pickerValue.names[2] = tItem.name
                        multiIndex[2] = tIndex
                      }

                    })
                  }
                })
              }
            }
        })
      }
      // console.log(pickerValue)
      // console.log(multiIndex)
      // console.log(multiList)

      this.setData({ pickerValue, multiIndex, multiList})
      wx.hideLoading()
    },
    // 选择确定
    bindMultiPickerChange: function (e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      let value = e.detail.value
      let list = this.data.list
      let pickerValue = this.data.pickerValue
      pickerValue.ids=[
        list[value[0]].id,
        list[value[0]].children[value[1]].id,
        list[value[0]].children[value[1]].children ? list[value[0]].children[value[1]].children[value[2]].id:0
      ]
      pickerValue.names = [
        list[value[0]].name,
        list[value[0]].children[value[1]].name,
        list[value[0]].children[value[1]].children ? list[value[0]].children[value[1]].children[value[2]].name : ''
      ]
      
      // console.log(pickerValue)
      let val = pickerValue.ids
      this.setData({
        pickerValue,
        value:val
      })
      // this.triggerEvent('linstenValue', { pickerValue: pickerValue});

    },
    // 联动处理
    bindMultiPickerColumnChange: function (e) {
      // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      let col=e.detail.column
      let index=e.detail.value
      let multiList = this.data.multiList
      let multiIndex = this.data.multiIndex
      let list = this.data.list

      if(col==0){
        multiIndex=[index,0,0]
        multiList[1] = list[index].children
        multiList[2] = list[index].children[0].children || []
      }else if(col==1){
        multiIndex[1] = index
        multiIndex[2] = 0
        multiList[2] = list[multiIndex[0]].children[index].children||[]
      }else if(col==2){
        multiIndex[2] = index
      }
      this.setData({ multiList, multiIndex})
    }

  },
  ready(){
    let ids = this.properties.ids
    // console.log(ids)

    let multiList = wx.getStorageSync("areaTreeMultiList")
    let list = wx.getStorageSync("areaTree")
    if (!(multiList && multiList.length>0)){
      this.getAddressSelect(ids)
    }else{
      this.setData({ multiList, list})
      if (ids) this.defaultDataHandle(ids, list, multiList)
    }

    // console.log(list)

    
  }
})