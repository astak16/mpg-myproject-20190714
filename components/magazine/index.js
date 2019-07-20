Component({
  properties: {
    index: String,
    pubdate: String,
  },
  data: {
    _index: 0,
    year: 0,
    month: 0,
  },
  observers: {
    index(newVal) {
      const val = newVal < 10 ? `0${newVal}` : newVal;
      this.setData({
        _index: val,
      });
    },
    pubdate(newVal) {
      const pubdateArr = newVal.split('-');
      const month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
      this.setData({
        year: pubdateArr[0],
        month: month[pubdateArr[1] - 1],
      });
    },
  }
});
