## Affix

Affix 是固钉的作用,将需要固定 div 固定在浏览器顶部

## 引入的文件

```js
import * as React from "react";
import { polyfill } from "react-lifecycles-compat";
import classNames from "classnames";
import omit from "omit.js";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
import { throttleByAnimationFrameDecorator } from "../_util/throttleByAnimationFrame";
import ResizeObserver from "../_util/resizeObserver";

import warning from "../_util/warning";
import {
  addObserveTarget,
  removeObserveTarget,
  getTargetRect,
  getFixedTop,
  getFixedBottom
} from "./utils";
```

1. react

这个就不用说了.是引入 react 框架用的

2. react-lifecycles-compat

这个是 react 官方用来让老版本使用新的生命周期

3. classnames

这个包是用来让 React className 灵活使用

```
<div className=classnames({
    'class1': true,
    'class2': true
    )>
</div>

classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```
