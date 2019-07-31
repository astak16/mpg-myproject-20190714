import BookModel from '../../models/book';

const bookModel = new BookModel();

Page({

  /**
   * Page initial data
   */
  data: {
    books: null,
    searching: false,
  },
  onSearch() {
    this.setData({
      searching: true,
    });
  },
  onCancel() {
    this.setData({
      searching: false,
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad() {
    bookModel.getHotList().then((res) => {
      this.setData({
        books: res,
      });
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },
});
