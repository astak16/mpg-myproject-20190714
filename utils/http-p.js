import config from '../config';

const tips = {
  1: '抱歉有一个错误',
  1005: 'appkey无效，请前往7yue.pro网站申请',
  2000: '无法进行喜欢操作',
  2001: '已经取消点赞了，不能再取消点赞',
  3000: '期刊不存在',
};
export default class HTTP {
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this.request1({
        url, data, method, resolve, reject,
      });
    });
  }

  request1({
    url, resolve, reject, method = 'GET', data = {},
  }) {
    const that = this;
    wx.request({
      url: config.api_base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey,
      },
      success(res) {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data);
        } else {
          reject();
          that.showError(res.data.error_code);
        }
      },
      fail() {
        that.showError(1);
      },
    });
  }

  showError(errorCode) {
    const code = errorCode || 1;
    const tip = tips[code];
    wx.showToast({
      title: tip,
      icon: 'none',
      duration: 2000,
    });
  }
}
