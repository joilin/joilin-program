const sortMap = {
    '国内': 'gn',
    '国际': 'gj',
    '财经': 'cj',
    '娱乐': 'yl',
    '军事': 'js',
    '体育': 'ty',
    '其他':'other'
}

// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        newsSort: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
        indicatorDots: false,
        autoplay: false,
        interval: 0,
        duration: 0,
      
        outlineNewsList: [new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array()],
        hotNewsList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOutlineNews() 
        this.setData({
            currentTab: 0
        })  
    },

    onPullDownRefresh() {
        this.getOutlineNews(() => {
            wx.stopPullDownRefresh()
        })
    },

    swichNav: function (e) {
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            this.setData({
                currentTab: e.target.dataset.current,
            })
        }
    },

    swiperChange: function (e) {
        this.setData({ 
            currentTab: e.detail.current,
        });

    },

    onTapOutlineNews(e) {
        /*console.log(e)*/
        let newsID = e.target.dataset.newsid
        
         wx.navigateTo({
            url: '/pages/detail/detail?newsID=' + newsID ,
        })
    },

    getOutlineNews(callback){
        let allHotNews = []
        let allNews = []
        for (let i = 0; i < this.data.newsSort.length;i++){
            let typeEN = sortMap[this.data.newsSort[i]]  
 
            wx.request({
                url: 'https://test-miniprogram.com/api/news/list',
                data: {
                    type: typeEN
                },
                success: res => {
                    let result = res.data.result
                    this.setNewsList(result, i, allHotNews, allNews)
                },
                fail: () => {
                    /*console.log("fail")*/
                },
                complete: () => {
                    callback && callback()
                }
            })
        }
    },
    setNewsList(result, index, allHotNews, allNews){

        let oneSortNews = []  
        for (let i = 0; i < result.length; i++) {
            
            if (i == 0) {
                let datetime = new Date(result[i].date)
                let hour = datetime.getHours()
                let minute = datetime.getMinutes()

                allHotNews.push({
                    id: result[i].id,
                    title: result[i].title,
                    date: hour + ":" + minute,
                    source: result[i].source,
                    firstImage: result[i].firstImage
                })
            }
            else {
                let datetime = new Date(result[i].date)
                let hour = datetime.getHours()
                let minute = datetime.getMinutes()

                oneSortNews.push({
                    id: result[i].id,
                    title: result[i].title,
                    date: hour + ":" + minute,
                    source: result[i].source,
                    firstImage: result[i].firstImage
                })
            }
        }
        allNews.push(oneSortNews)

        if (index == 6) {
            this.setData({
                hotNewsList: allHotNews,
                outlineNewsList: allNews,
            })
        }  
    }
})

