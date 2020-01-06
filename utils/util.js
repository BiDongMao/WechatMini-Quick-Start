import { HttpRequest } from "./HttpRequest.js" //网络请求方法

// 日期格式化
const formatTime = (date, time, separator) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  let timedate = [year, month, day].map(formatNumber).join(separator ? separator : '-')
  if (time==1){
    timedate += ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  return timedate
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 上传图片
// path--文件路径
// index--下标
// success--成功回调
// fail--失败回调
const uploadImg = function ( path, index,success,fail) {
  wx.showLoading({
    title: "图片上传中",
    mask: true
  })
  var url = "/sys/oss/upload";//接口地址
  var token = wx.getStorageSync("token");//获取token值
  wx.uploadFile({
    url: HttpRequest.SERVSERS+url,
    filePath: path,
    name: 'file',
    formData: {
      'token': token
    },
    success: function (res) {
      var data = JSON.parse(res.data);
      if (data.code == 0) {
        // console.log(data)
        success(data)//上传成功回调
      } else {
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      }
    },
    fail:function(){
      wx.showToast({
        icon: 'none',
        title: '上传失败',
      })
    },
    complete:function(){
      wx.hideLoading()
    }
  })
  
}
// end 上传图片

// 选择图片
// count--上传张数限制
// success--成功回调
const chooseImage = function ( count,success) {
  wx.chooseImage({
    count: count,//默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      console.log(res)
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      res.tempFilePaths.forEach((item, index) => {
        uploadImg( item, index, function (data){
          // console.log(data.url)
          success(data.url)
        })
        
      })
    }
  })
}
// end 选择图片


// 获取当前页面栈中的某个页面。
// n--当前页面的前n个页面
// 返回 page-当前页面的前n个页面实例，router-当前页面的前n个页面路由名称
const getPage=function(n){
  let pages = getCurrentPages();// 当前页面栈 数组中第一个元素为首页，最后一个元素为当前页面
  let page = pages[pages.length - (n+1)];
  let router = page.route
  console.log("pages", pages)
  return { page, router}
}


module.exports = {
  COMMONFN:{
    formatTime: formatTime,
    uploadImg: uploadImg,
    chooseImage: chooseImage,
    getPage: getPage
  }
}
