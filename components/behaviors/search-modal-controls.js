module.exports = Behavior({
  data:{
    listTitle:"hahhah "
  },
  methods:{
    resetChose(){
      console.log("重置筛选列表")
      this.setData({ listTitle:"ixixix"})
    }
  }
})