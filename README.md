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
```
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