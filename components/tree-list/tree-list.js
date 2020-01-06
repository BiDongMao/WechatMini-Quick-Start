// components/right-search-modal/tree-list/tree-list.js
Component({
  /**
 * 组件的一些选项
 */
  options: {
    addGlobalClass: true,//允许全局样式覆盖，本组件的样式不影响其他组件
  },
  /**
   * 组件的属性列表
   */
  properties: {
    optionsType: {//列表数据额类型 userId-用户 materialId-产品  (对应搜索表单中的字段名)
      type:String,
      value:""
    },
    childList:{//子级列表
      type:Array,
      value:[]
    },
    activeId: {//激活状态的id
      type: String,
      value: 0
    },
    isChild:{ //是否是子级
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    listTitle:'',
    list:[],
    activeId:null
  },
  // 在组件实例进入页面节点树时执行
  attached: function () {
    let optionsType=this.properties.optionsType
    let childList = this.properties.childList
    if(childList&&childList.length>0){
      this.setData({ list: childList})
    }else{
      // 根据不同类型获取数据
      this.getDataList(optionsType)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取数据
    getDataList(optionsType){
      optionsType = optionsType ? optionsType : this.data.optionsType
      console.log(optionsType)
      if (optionsType == "userId") {
        this.getUserList()// 获取用户列表
        this.setData({ listTitle:'人员筛选'})
      } else if (optionsType == "materialId") {
        this.getMaterialList()// 获取用户列表
        this.setData({ listTitle: '物品筛选' })
      }
    },
    // 点击事件
    onTreeItemClick(e) {
      let d = e.currentTarget.dataset
      let id = d.id
      let index = d.index
      let children = d.children


      let list = this.data.list
      if (children&&children.length>0) {//有子级就展开或折叠子级

        list[index].open = !list[index].open

      } else {//无子级完成选择
        // console.log("id", id)
        this.triggerEvent('watchId', { id: id, optionsType: this.properties.optionsType }, { bubbles: true, composed: true });
      }
      this.setData({
        list
      })
    },
    // 获取用户列表
    getUserList(){
      let _this = this

      ///////////////////模拟数据请求s///////////////////

      setTimeout(()=>{
        let list=[
          {
            id: 0,
            name: "所有人员",
            children: []
          },
          {id:1,
          name:"销售部",
          children:[
            {id:10,
            name:'张三',
            children:[]
            },
            {
              id: 11,
              name: '李四',
              children: []
            }
          ]},
          {
            id: 2,
            name: "秘书长",
            children: []
          },
          {
            id: 3,
            name: "采购部",
            children: [
              {
                id: 13,
                name: '壁咚',
                children: []
              },
              {
                id: 14,
                name: '妖妖',
                children: []
              }
            ]
          },

        ]
        this.setData({
          list
        })
      },500)
      ///////////////////模拟数据请求e///////////////////

      // app.HttpRequest.Request(
      //   'get',
      //   '/product/type/tree',
      //   '',
      //   "加载中",
      //   function (res) {
      //     let typeList = res.data.list

      //     typeList.unshift({
      //       id: '',
      //       typeName: '所有分类'
      //     })

      //     _this.setData({
      //       typeList
      //     });
      //   }
      // )
    },
    // 获取物品列表
    getMaterialList(){
      let _this = this

      ///////////////////模拟数据请求s///////////////////

      setTimeout(() => {
        let list = [
          {
            id: 0,
            name: "所有物品",
            children: []
          },
          {
            id: 1,
            name: "食品",
            children: [
              {
                id: 10,
                name: '海鲜',
                children: [
                  {
                    id: 15,
                    name: '龙虾',
                    children: []
                  },
                ]
              },
              {
                id: 11,
                name: '巧克力',
                children: []
              }
            ]
          },
          {
            id: 2,
            name: "手机",
            children: []
          },
          {
            id: 3,
            name: "餐具",
            children: [
              {
                id: 13,
                name: '盘子',
                children: []
              },
              {
                id: 14,
                name: '勺子',
                children: []
              }
            ]
          },

        ]
        _this.setData({
          list
        })
      }, 500)
      ///////////////////模拟数据请求e///////////////////
    }

  }
})
