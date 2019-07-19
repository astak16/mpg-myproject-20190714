// components/calendar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: String,
    pubdate: String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  observers: {
    index(newVal) {
      console.log(newVal);
      const val = newVal < 10 ? `0${newVal}` : newVal;
      this.setData({
        _index: val,
      });
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  },
});
