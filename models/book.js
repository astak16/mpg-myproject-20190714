import HTTP from '../utils/http-p';

class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: 'book/hot_list',
    });
  }

  search(start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        start,
        q,
      },
    });
  }
}

export default BookModel;
