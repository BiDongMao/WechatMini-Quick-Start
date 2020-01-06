// 列表数据共享属性
const app = getApp();
module.exports = Behavior({

  behaviors: [],

  properties: {
    
  },

  data: {
    CustomBar: app.globalData.CustomBar,
    WindowHeight: app.globalData.WindowHeight,
    BaseViewH: app.globalData.BaseViewH,
    RpxToPx: app.globalData.RpxToPx,
    PxToRpx: app.globalData.PxToRpx,
    listUrl:'',//获取列表的接口名
    dataList: [],//列表数据
    searchForm: {//列表筛选条件
      key: '',
      userId: '',
      materialId: ''
    },
    page: 1,//当前页数
    limit: 5,//每页加载条数
    refreshing: false,
    nomore: false,//是否已加载全部数据
    nodata: false,//数据为空
    loading: true,
    isShowModal: false,//右侧筛选弹窗显示
  },

  attached: function () {
    this.getDataList()// 获取数据列表
  },

  methods: {
    // 初始化列表
    init() {
      this.setData({
        page: 1,
        dataList: [],
        refreshing: true,
        nomore: false,
        nodata: false
      })
    },
    // 打开或关闭右侧弹窗
    showModal() {
      this.setData({
        isShowModal: !this.data.isShowModal
      })
    },
    // 获取筛选条件
    getSearchFormData(e) {
      console.log("筛选值", e.detail)
      let id = e.detail.id
      let optionsType = e.detail.optionsType

      let searchForm = this.data.searchForm
      searchForm[optionsType] = id
      this.setData({ searchForm })
      console.log(this.data.searchForm)
      // 单条筛选直接请求列表数据
      // this.showModal()
      // this.init()
      // this.getDataList()
    },
    // 重置筛选列表
    resetSearchForm() {
      let searchForm = this.data.searchForm
      searchForm.userId = ''
      searchForm.materialId = ''
      this.setData({ searchForm })
      this.selectComponent("#userTree").getDataList();
      this.selectComponent("#materialTree").getDataList();
    },
    // 确定筛选
    comfirmForm() {
      console.log("searchForm", this.data.searchForm)
      this.showModal()
      this.init()
      this.getDataList()
    },
    // 搜索列表
    searchList(e) {
      console.log("搜索内容为", e.detail.searchKey)
      let searchKey = e.detail.searchKey
      let searchForm = this.data.searchForm
      searchForm.key = searchKey
      this.setData({
        searchForm: searchForm
      })
      this.init()
      this.getDataList()

    },
    // 下拉刷新
    refreshData: function () {
      this.init()
      this.getDataList()

    },
    // 上拉加载
    loadmoreData: function () {
      this.setData({
        refreshing: true,
        nodata: false
      })
      this.getDataList()
    },
    // 获取列表数据
    getDataList() {
      let _this = this
      let loading = _this.data.loading
      if (!loading) return
      _this.setData({ loading: false })//在数据请求和处理完成之前禁止再次加载

      let data = Object.assign({
        page: _this.data.page,
        limit: _this.data.limit
      }, _this.data.searchForm)

      console.log("请求参数", data)

      // /////////////模拟数据请求 s//////////////////
      wx.showLoading({
        title: '加载中',
        icon: 'none'
      })
      setTimeout(function () {

        let data = {
          page: {
            currPage: _this.data.page,
            list: [1, 2, 3, 4, 5],
            pageSize: _this.data.limit,
            totalCount: 22,
            totalPage: 5
          }
        }
        _this.handleData(data, _this.data.page)
      }, 1000)
      // ///////////////模拟数据请求e////////////////

      // app.HttpRequest.Request(
      //   "get",
      //   "/purchase/list",
      //   data,
      //   "加载中",
      //   function (res) {
      //     _this.handleData(res.data, _this.data.page)
      //   }
      // )
    },
    // 处理获取的数据
    handleData(data, page) {
      console.log("data", data)
      let dataList = this.data.dataList
      let list = data.page.list
      if (page === 1 && list == '') {//数据为0--暂无数据
        this.init()
        this.setData({
          nodata: true,
          loading: true
        })
        return
      }
      dataList = [...dataList, ...list]
      let totalPage = data.page.totalPage
      let currPage = data.page.currPage
      if (totalPage <= currPage) {//数据已全部加载
        this.setData({
          nomore: true
        })
      }
      ++page
      this.setData({
        dataList: dataList,
        page: page,
        refreshing: false,
        loading: true
      })
      wx.hideLoading()
    },
  }
})