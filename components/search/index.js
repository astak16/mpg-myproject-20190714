import KeyWords from '../../models/keywords';
import BookModel from '../../models/book';

const keyWords = new KeyWords();
const bookModel = new BookModel();

Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    q: '',
    historyWords: [],
    hotWords: [],
    search: false,
    bookArr: [],
  },

  attached() {
    this.setData({
      historyWords: keyWords.getHistory(),
    });
    keyWords.getHot().then((res) => {
      this.setData({
        hotWords: res.hot,
      });
    });
  },
  /**
   * Component methods
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel', {}, {});
    },
    onDelete() {
      this.setData({
        q: '',
      });
    },
    onConfirm(e) {
      const value = e.detail.value || e.detail.text;
      console.log(e);
      bookModel.search(0, value).then((res) => {
        console.log(res.books);
        this.setData({
          bookArr: res.books,
          search: true,
        });
        keyWords.addToHistory(value);
      });
    },
  },
});
