const SERVSERS = 'https://w.ruiztech.cn/ruiz' //接口地址--测试
// const SERVSERS = 'https://warehouse.ruizcloud.cn/ruiz' //接口地址--正式

// 
/*** 
 ************* post请求*****************

 * method---请求方法
 * url------接口地址
 * data-----请求参数
 * msg--请求中提示语
 * success--请求成功回调
 * fail--请求失败(异常)回调
***/
const Request=(method,url, data, msg, success, fail)=>{
  if (msg) {
    wx.showLoading({
      title: msg,
      mask: true
    })
  }
  const TOKEN = wx.getStorageSync("token");
  wx.request({
    url: SERVSERS + url, 
    data: data,
    method: method,
    header: {
      'content-type': 'application/json', // 默认值
      "token": TOKEN
    },
    success: (res) => {
      if (res.data.code == 0) { //请求成功
        success(res)
      } else { //请求异常
        wx.hideLoading()
        exceptionHandle(res.data) //执行通用异常处理函数
        if (fail) fail(res) //有错误回调函数执行回调
      }

    },
    fail: (res) => {
      if (!fail) {
        wx.showModal({
          title: "提示",
          content: '网络异常',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            }
          }
        });
      }
    },
    complete: (res) => {
      wx.hideLoading()
      // wx.stopPullDownRefresh();
      
    }
  })
}
// post请求 end

/***
 ************* 请求异常处理**********
 * data--返回的数据
 * ***/ 
const exceptionHandle = function (data) {
  var msg = data.msg ? data.msg.replace(/<br>/, "") : ""
  // console.log(msg)
  // console.log(data.code)
  if (data.code == 501 && msg == "请先绑定手机号" ){
    wx.showModal({
      title: '提示',
      content: '请先绑定手机',
      duration: 1500,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/User/BindPhone/BindPhone',
          })         
        } else if (res.cancel) {
          console.log('用户点击取消')
          // 重新获取code
          wx.login({
            success: res => {
              wx.setStorageSync("code", res.code)
            }
          })
        }
      }
    })
    return
  }
  if (msg == "该手机号已注册，请直接登录"){
    wx.showModal({
      title: '提示',
      content: '该手机号已经注册，请直接登录',
      duration: 1500,
      success: function (res) {
        if (res.confirm && data.code == 500) {
          wx.navigateTo({
            url: '/pages/User/Login/Login',
          })         
        }
      }
    })
    return
  }
  if (msg == "图形验证码不正确"){
    wx.showToast({
      icon: 'none',
      title: '验证码错误',
    })
    return
  }
  
  switch (data.code) {
    case 401:
      msg = "登录超时，请重新登录";
      break;
    case 500:
      msg = msg;
      break;
    default:
    msg="网络异常"
  }
  wx.showModal({
    title: '提示',
    content: msg,
    duration: 1500,
    success: function (res) {
      if (res.confirm && data.code == 401) {
        wx.setStorageSync("token", "")
        wx.reLaunch({
          url: "/pages/User/Login/Login",
        })
      }
    }
  })
  
  
}
//end  请求异常处理


module.exports = {
  HttpRequest:{
    SERVSERS: SERVSERS,//服务器地址
    Request: Request, //请求方法
  }
}
