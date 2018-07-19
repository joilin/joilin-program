// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsID:"",
    id:"",
    title:"",
    date:"",
    source:"",
    firstImage:"",
    readCount:"",
    content:[]
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
      this.setData({
          newsID: options.newsID
      })
      this.getDetail()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#fff'
      })
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

   getDetail() {
        wx.request({
            url: 'https://test-miniprogram.com/api/news/detail',
            data: {
                id: this.data.newsID
            },
            success: res => {
                let content = []

                let result = res.data.result
                for (let i = 0; i < result.content.length; i++) {
                    content.push({
                        contentType: result.content[i].type,
                        text: result.content[i].text,
                        src: result.content[i].src
                    })
                }
                let datetime = new Date(result.date)
                let hour = datetime.getHours()
                let minute = datetime.getMinutes()
                this.setData({
                    id: result.id,
                    title: result.title,
                    date: hour + ":" + minute,
                    source:result.source,
                    firstImage:result.firstImage,
                    readCount:"阅读 " + result.readCount,
                    content: content
                })               
      
            }
        })
    },
})