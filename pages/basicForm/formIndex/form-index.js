// pages/basicForm/formIndex/form-index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id:{ //数据id 跳转页面时传值
      type:Number,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    BaseViewH: app.globalData.BaseViewH,
    RpxToPx: app.globalData.RpxToPx,
    WxValidate: app.WxValidate,
    form:{//表单数据
      uname:'',
      mobile:'',
      age:'',
      area:[],
      birthday:'',
      materialList:[]
    },
    Error:{},//表单验证错误对象
  },
  // 生命周期
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log("id", this.properties.id)
      this.initValidate()
      this.initForm(this.properties.id)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化表单
    initForm(id){
      console.log("id",id)
      let form = this.data.form
      
      if(id>0){
        // 请求数据。。。。。
        form = {
          uname: '壁咚猫',
          mobile: '18258298054',
          age: '18',
          area: [926, 979, 981],
          birthday: '1993-02-03',
          materialList:[
            {id:1,name:'巧克力',price:20.00,count:2,totalPrice:40.00},
            { id: 2, name: '果冻', price: 15.00, count: 10, totalPrice: 150.00 }
          ]
        }
       
      }else{
        form = {
          uname: '',
          mobile: '',
          age: '',
          area: [],
          birthday: '',
          materialList: []
        }
      }

      this.setData({ form })
      wx.setStorageSync("formData", form)//缓存表单信息，子页表单需要获取
    },
    // 刷新页面数据
    refreshPageData(){
      let form = wx.getStorageSync("formData")
      this.setData({ form })
    },
    // 初始化表单验证
    initValidate(){
      // 验证字段的规则
      const rules = {
        uname: {
          required: true,
        },
        mobile: {
          required: true,
          tel: true,
        },
        age: {
          required: true,
          number:true
        },
        area: {
          required: true,
        },
        birthday: {
          required: true,
        },
        materialList:{
          required: true,
        }
      }
      // 验证字段的提示信息，若不传则调用默认的信息
      const messages = {
        uname: {
          required: '姓名不能为空',
        },
        mobile: {
          required: '手机号码不能为空',
          tel: '手机号格式错误',
        },
        age: {
          required: '年龄不能为空',
          number: '年龄只能是数字'
        },
        area: {
          required: '地区不能为空',
        },
        birthday: {
          required: '生日不能为空',
        },
        materialList: {
          required: '物品个数必须大于零',
        }
      }
     
      // 创建实例对象
      const WxValidate = app.WxValidate.default
      this.WxValidate = new WxValidate(rules, messages)


      // 自定义验证规则
      // this.WxValidate.addMethod('assistance', (value, param) => {
      //   return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
      // }, '请勾选1-2个敲码助手')
    },
   
    // 输入框blur后验证
    onInputBlur(e){
      let name=e.currentTarget.dataset.name
      let value = e.detail.value
      let Error=this.data.Error
      let flag=false
      let msg=""
      const params={}
      params[name] = value
      console.log(params)

      if (!this.WxValidate.checkForm(params)) {
        const errorList = this.WxValidate.errorList
        errorList.map(item=>{
          if(item.param==name){
            flag=true
            msg = item.msg
           
          }
        })
        
      }
      Error[name] = flag ? msg : ''
      console.log("Error", Error)
      this.setData({ Error })
      console.log(this.WxValidate.errorList)
    },
    // 选择日期
    onDateChange(e){
      let birthday = e.detail.value
      let form=this.data.form
      form.birthday = birthday
      this.setData({ form })

    },
    // 进入列表表单页
    jumpFormListPage(){
      app.WxService.navigateTo('/pages/basicForm/formList/form-list', {type:1})
    },
    // 提交表单
    onFormSubmit(e){
      const params = e.detail.value

      console.log("params",params)
      const valid=this.validateForm(params)
      console.log("valid",valid)


    },
    // 验证表单
    validateForm(params){
      // 传入表单数据，调用验证方法
      if (!this.WxValidate.checkForm(params)) {
        const errorFirst = this.WxValidate.errorList[0]
        console.log(this.WxValidate.errorList)

          ////////////提交时显示所有提示s/////////////
        // const Error = {}
        // this.WxValidate.errorList.forEach(item => {
        //   Error[item.param] = item.msg
        // })
        // console.log(Error)
        // this.setData({ Error })
          ////////////提交时显示所有提示e/////////////

        app.WxService
          .showToast({
            title: errorFirst.msg,
            duration: 1000,
            icon: 'none'
          })
          .then(data => { console.log(data) })
        return false
      }
      return true
    },
  }
})
