import HTTP from '../utils/http';

class ClassicModel extends HTTP {
  classicKey = ''

  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        this.setCache('latest', res.index);
        sCallback(res);
        this.classicKey = this.buildCacheKey(res.index);
        this.setCache(this.classicKey, res);
      },
    });
  }

  getClassic(index, nextOrPrevious, sCallback) {
    const key = nextOrPrevious === 'next' ? this.buildCacheKey(index + 1) : this.buildCacheKey(index - 1);
    const classic = this.getCache(key);
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          const classicKey = this.buildCacheKey(res.index);
          this.setCache(classicKey, res);
          sCallback(res);
        },
      });
    } else {
      sCallback(classic);
    }
  }

  isFirst(index) {
    return index === 1;
  }

  isLatest(index) {
    return index === this.getCache('latest');
  }

  getCache(key) {
    return wx.getStorageSync(key);
  }

  setCache(key, value) {
    wx.setStorageSync(key, value);
  }

  buildCacheKey(index) {
    return `classic-${index}`;
  }
}
export default ClassicModel;
