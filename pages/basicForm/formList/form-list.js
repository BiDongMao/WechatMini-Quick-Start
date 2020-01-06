// pages/basicForm/formList/form-list.js
const app = getApp()
Page({
  data: {
    BaseViewH: app.globalData.BaseViewH,
    RpxToPx: app.globalData.RpxToPx,
    form: {},
    materialList: [],
    Error: []
  },
 
  onLoad() {
    this.initValidate()
    let form = wx.getStorageSync("formData")
    let materialList = form.materialList
    this.setData({
      form,
      materialList
    })
  },
  onUnload() {
    this.validateForm() //验证表单

  },

  // 初始化表单验证
  initValidate() {
    // 验证字段的规则
    const rules = {
      name: {
        required: true,
      },
      price: {
        required: true,
        digits: true
      },
      count: {
        required: true,
        digits: true
      },
      totalPrice: {
        required: true,
        digits: true
      }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '物品名称不能为空',
      },
      price: {
        required: '价格不能为空',
        digits: '价格只能是数字'
      },
      count: {
        required: '数量不能为空',
        digits: '数量只能是数字'
      },
      totalPrice: {
        required: '总价不能为空',
        digits: '总价只能是数字'
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
  onInputBlur(e) {
    let d = e.currentTarget.dataset
    let name = d.name
    let index = d.index
    let value = e.detail.value
    let Error = this.data.Error
    let flag = false
    let msg = ""
    const params = {}
    params[name] = value
    // console.log("params", params)
    if (!this.WxValidate.checkForm(params)) {
      const errorList = this.WxValidate.errorList
      console.log(errorList)
      errorList.map(item => {
        if (item.param == name) {
          flag = true
          msg = item.msg

        }
      })
    }
    Error[index] = {}
    Error[index][name] = flag ? msg : ''
    this.setData({
      Error
    })

    this.updateFormData(index, name, value)
  },
  // 实时更新表单数据
  updateFormData(index, name, value) {
    let materialList = this.data.materialList
    materialList[index][name] = value
    //计算总价
    if(name=="count"||name=="price"){
      const totalPrice = parseFloat(materialList[index].count) * parseFloat(materialList[index].price)
      materialList[index].totalPrice=totalPrice.toFixed(2)
    }

    this.setData({
      materialList
    })
  },
  // 点击添加按钮
  onAddClick() {
    let materialList = this.data.materialList
    materialList.unshift({
      id: null,
      name: '',
      price: '',
      count: '',
      totalPrice: ''
    })
    this.setData({
      materialList
    })
  },
  // 点击删除按钮
  onDeleteClick(e) {
    let d = e.currentTarget.dataset
    let index = d.index
    let materialList = this.data.materialList
    materialList.splice(index, 1)
    this.setData({
      materialList
    })

  },
  // 验证表单
  validateForm() {
    let materialList = this.data.materialList
    let form = this.data.form
    let materialErrorList = []

    materialList.map(item => {
      console.log(item)
      if (!this.WxValidate.checkForm(item)) {
        const errorList = this.WxValidate.errorList
        console.log("errorList", errorList)
        materialErrorList.push(errorList)
      }
    })

    if (materialErrorList.length > 0) {
      app.WxService
        .showToast({
          title: '物品信息未完善',
          duration: 1000,
          icon: 'none'
        })
        .then(data => {})
    }
    form.materialList = materialList
    wx.setStorageSync("formData", form)
    console.log("formData", form)
    let page = app.COMMONFN.getPage(1)
    page.page.refreshPageData() //刷新前一页数据
  },
  onFormSubmit(e) {
    console.log(e)
  },
})