
# iframe-shim

---

[![spm package](http://spmjs.io/badge/arale-iframe-shim)](http://spmjs.io/package/arale-iframe-shim)
[![Build Status](https://secure.travis-ci.org/aralejs/iframe-shim.png)](https://travis-ci.org/aralejs/iframe-shim)

工具类，在 IE6 下生成 iframe 遮挡 select。此组件对开发者透明，开发者无需再判断浏览器版本。

<span style="font-size:120px;line-height:0.4;color:rgb(255, 140, 42);font-family:Menlo;">☂</span>

---

## 使用说明


### Instantialize `new Shim(target)`

组件会根据传入的目标元素生成一个实例，实例化后会生成一个 iframe 插入到目标元素前，这样 iframe 的层级永远低于目标元素。

开发者需要手动调用 `sync` 方法来同步 iframe 和目标元素。

如果是 ie6 以外的浏览器只会返回一个空实例，什么都不执行。

参数 `target` 是需要被遮挡的目标元素，可以传 `DOM Element` 或 `Selector`。


```js
define(function(require, exports, module) {
    var Shim = require('iframe-shim');

    var shim = new Shim('#target');
    shim.sync();
});
```

**注意：**

* iframe 的宽高是根据目标元素计算的，目标元素的宽高是包括 border的，例如目标元素的 width 为 100px，border 为 1px，iframe 的 width 为 102px。

### sync `shim.sync()`

实例方法，此方法会根据目标元素的变化而改变 iframe 的样式。

有以下几种情况 iframe 会改变：

1. 目标元素的宽高及 border 改变后 iframe 的宽高也会相应改变。
1. 目标元素或父级元素 `display: none`，iframe 会隐藏。
1. 目标元素宽和高等于 0 （包括 border ），iframe 会隐藏。
1. 目标元素移动后 iframe 定位会改变。

sync 可进行链式操作，上面的例子可直接一行完成：

```js
var shim = new Shim('#target').sync();
```

**注意：**

* 如果目标元素有变化，需要同步 shim 时，需要在目标元素变化之后，再调用 `sync` 方法：

```js
target.show();
shim.sync(); // 在 target 显示之后，再同步 shim 的显示。
```


### destroy `shim.destroy()`

实例方法，销毁 iframe 等。




[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/aralejs/iframe-shim/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

