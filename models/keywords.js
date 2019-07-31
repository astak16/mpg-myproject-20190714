import HTTP from '../utils/http-p';

class KeyWords extends HTTP {
  key = 'keys'

  maxLength = 10

  getHistory() {
    const words = wx.getStorageSync(this.key);
    return words || [];
  }

  getHot() {
    return this.request({
      url: 'book/hot_keyword',
    });
  }

  addToHistory(keywords) {
    const words = this.getHistory();
    const hasWord = words.includes(keywords);
    if (!hasWord) {
      if (words.length >= this.maxLength) {
        words.pop();
      }
      words.unshift(keywords);
      wx.setStorageSync(this.key, words);
    }
  }
}

export default KeyWords;
