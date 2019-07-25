## magazine 组件

### `observers`观察属性
```js
properties: {
    index: {
        type: Number,
        observer (newVal) {
            let val = newVal < 10 ? '0' + newVal : newVal
            this.setData({
                index: val
            })
        }
    }
}
```
外部传递进来的`index`值是`8`，实际显示效果是`08`。所以需要根据外部传递进来的`index`动态更新`index`。

1、如果设置为`index`设置为`Number`，调用`setData`后，`08`会变成`8`，并不是我们想要的效果。
2、如果将`index`设置为`String`，调用`setData`后，页面会死循环，这是因为`observer`是个监听器，`properties`变化就会被触发，因为是`String`类型，设置时`index`会相对之前的`index`发生变化从而每次都会会触发`observer`。

解决方法是：用一个新变量来存在这个值
```js
properties: {
    index: {
        type: Number,
        observer (newVal) {
            let val = newVal < 10 ? '0' + newVal : newVal
            this.setData({
                _index: val
            })
        }
    }
},
data: {
    _index: 0
}
```
官方推荐使用`observers`
```js
observers: {
    index(newVal) {
      console.log(newVal);
      const val = newVal < 10 ? `0${newVal}` : newVal;
      this.setData({
        _index: val,
      });
    },
}
```

### 生命周期
在`component`生命周期函数中，无法读取`data`或者`properties`中的数据，在初始化组件时，就需要用到`data`、`properties`上的数据，有两种方法

1. 使用`observers`
```js
properties: {
    pubdate: String,
},
data: {
    year: 0,
    month: 0,
},
observers: {
    pubdate(newVal) {
      const pubdateArr = newVal.split('-');
      const month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
      this.setData({
        year: pubdateArr[0],
        month: month[pubdateArr[1] - 1],
      });
    },
}
```

2. 使用生命周期函数`ready`

无法在`attached`、`created`、`ready`中直接操作`data`或`properties`，只有在`ready`中间接操作`data`或者`properties`
```js
properties: {
    pubdate: String,
},
data: {
    year: 0,
    month: 0,
},
lifetimes() {
    ready() {
        this.onLoad()
    }
},
methods: {
    onLoad() {
        const pubdateArr = newVal.split('-');
        const month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        this.setData({
            year: pubdateArr[0],
            month: month[pubdateArr[1] - 1],
        });
    }
}
```

## nav 组件和 classic 组件
期刊更新的不是很频繁，可以使用缓存技术，将每次请求到的期刊存入缓存中，每次切换的时候先读取缓存中的期刊，如果有，就不发送请求，如果没有就发送请求。

在切换`classic`组件的时候，怎么知道现在是不是最新的一期或者是第一期。第一期的比较好确定，期刊号是确定的，可以对比当前期刊和确定的期刊号是不是一致就行。关键在于最新的一期期刊怎么确定。在首次进入期刊页面的时候，会去调用最新的期刊，将这个期刊号存入缓存就行。
```js
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
```

怎么确定当前期刊是不是最新期刊的或者第一期，这里抽象出了两个方法，直接调用这两个方法就确定是不是最新一期或者第一期
```js
isFirst(index) {
    return index === 1;
}

isLatest(index) {
    return index === this.getCache('latest');
}
getCache(key) {
    return wx.getStorageSync(key);
}
```

切换期刊时，首先读写缓存，如果缓存有，直接渲染出来；如果没有需要将获取到的期刊存入缓存。
```js
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
```
### 自定义组件的`hidden`
自定义组件没有`hidden`属性特性，可以自己实现。用`properties`接收外部传递进来的`hidden`属性，并绑到原生组件上。

## 音乐播放

这里音乐播放使用的是`wx.getBackgroundAudioManager()`，它返回一个实例`BackgroundAudioManager`

```js
const bgMusic = wx.getBackgroundAudioManager()
```

这里实现背景音乐的难点是在切换时候怎么判断当前的音乐状态，有两种方案：

### 方案一：监听切换按钮的事件
监听切换按钮的事件，当我离开当前期刊时，暂停音乐播放

### 方案二：在当前期刊判断音乐播放状态
用这种方案可以抽象出了一个状态：
> `bgMusic.paused`可以获取到当前音乐的播放状态，暂停还是停止，用来设置显示暂停按钮
> `bgMusic.src === this.data.src` 用来判断在当前音乐期刊中显示暂停按钮，其他音乐期刊显示播放按钮

```js
recoverStatus() {
    if (bgMusic.paused) {
        this.setData({
            playing: false,
        });
        return;
    }
    if (bgMusic.src === this.data.src) {
        this.setData({
            playing: true,
        });
    }
},
```

在当前音乐期刊中监听，背景音乐的`onPlay`、`onPause`、`onEnded`、`onStop`，因为之前抽象出了重置状态的函数，这里直接调用就行了。
```js
monitorStatus() {
    bgMusic.onPlay(() => {
        this.recoverStatus();
    });
    bgMusic.onPause(() => {
        this.recoverStatus();
    });
    bgMusic.onEnded(() => {
        this.recoverStatus();
    });
    bgMusic.onStop(() => {
        this.recoverStatus();
    });
},
```