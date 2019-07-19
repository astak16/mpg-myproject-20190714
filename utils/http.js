import config from '../config';

const tips = {
  1: '抱歉有一个错误',
  1005: 'appkey无效，请前往7yue.pro网站申请',
  3000: '期刊不存在',
};
export default class HTTP {
  request({
    url, method = 'GET', data = {}, success,
  }) {
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
          if (success) {
            success(res.data);
          }
        } else {
          this.showError(res.data.error_code);
        }
      },
      fail() {
        this.showError(1);
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
