//app.js
import { COMMONFN } from "utils/util.js" //公共函数
import { HttpRequest } from "utils/HttpRequest.js" //网络请求方法
// import WxValidate from 'utils/plugins/wx-validate/WxValidate'//验证方法
import WxService from 'utils/plugins/wx-service/WxService' //Promise API
const watch = require("./utils/watch.js");//数据监听--只能在页面中使用
const WxValidate = require("./utils/plugins/wx-validate/WxValidate.js");//验证方法



App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        this.globalData.WindowHeight = e.windowHeight
        this.globalData.WindowWidth = e.windowWidth
        this.globalData.ScreenHeight = e.screenHeight
        this.globalData.PxToRpx = 750 / e.screenWidth
        this.globalData.RpxToPx = e.screenWidth / 750 
        this.globalData.BaseViewH = e.windowHeight - this.globalData.CustomBar//页面基础高度
      }
    })
    this.WxService = new WxService
    // this.WxValidate = new WxValidate


    console.log(WxValidate)
    console.log(WxValidate.default)


    
  },
  globalData: {
    userInfo: null
  },
  setWatcher(page) {
    watch.setWatcher(page);
  },
  HttpRequest: HttpRequest, //网络请求
  COMMONFN: COMMONFN, //公共函数
  // SetWatcher: SetWatcher,//数据监听
  WxValidate: WxValidate//表单验证方法
})