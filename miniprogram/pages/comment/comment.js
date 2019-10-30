// pages/comment/comment.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieid: 33391779,
    detail:[],
    content:'',
    score:0,
    images:[],
    fileIds:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      movieid:options.movieid
    })
    this.getDetail()
  },
  getDetail:function(){
    wx.cloud.callFunction({
      name: 'getDetail',
      data: {
        movieid:this.data.movieid
      }
    }).then(res=>{
      this.setData({
        detail:JSON.parse(res.result)
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  onContentChange:function(e){
    this.setData({
      content:e.detail
    })
  },
  onScoreChange: function (e) { 
    this.setData({
      score: e.detail
    })
  },
  upLoadImg:function(){
    let that=this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          images:that.data.images.concat(tempFilePaths)
        })
      }
    })
  },
  commit:function(){
    wx.showLoading({
      title: '请稍候...',
    })
    let that=this;
   let promiseArr=[];
   for(let i=0;i<that.data.images.length;i++){
     promiseArr.push(new Promise((reslove,reject)=>{
       let item=that.data.images[i];
       let suffix=/\.\w+$/.exec(item)[0];
       wx.cloud.uploadFile({
         cloudPath: new Date().getTime()+suffix,
         filePath: item, // 文件路径
         success: res => {
           // get resource ID
           console.log(res.fileID)
          that.setData({
            fileIds:that.data.fileIds.concat(res.fileID)
          });
          reslove();
         },
         fail: err => {
           wx.showToast({
             title: '上传失败',
           })
         }
       })
     }))
   }
   Promise.all(promiseArr).then(res=>{
     db.collection("comment").add({
       data:{
         movieId:that.data.movieid,
         content: that.data.content,
         score: that.data.score,
         fileIds: that.data.fileIds
       }
     }).then(res=>{
       wx.hideLoading();
       wx.showToast({
         title: '评价成功',
         icon:'none'
       })
     }).catch(err=>{
       wx.hideLoading();
       wx.showToast({
         title: '评价失败',
         icon: 'none'
       })
     })
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})