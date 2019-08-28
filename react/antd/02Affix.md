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

4. omit

返回一个没有列入排除 key 属性的对象。其中，参数 object 为 JSON 格式的对象，\*keys 表示多个需要排除掉的 key 属性。

```js
import omit from "omit.js";

var data = {
  carNumber: "85C10783",
  createTime: 1565248477000,
  deptName: "营销中心OTO部-项目开发",
  name: "杨磊",
  passId: 36,
  passType: 2,
  remark: " ",
  type: null
};

console.log(omit(data, ["carNumber", "name"]));
// 输出
// {
// 	"createTime": 1565248477000,
// 	"deptName": "营销中心OTO部-项目开发",
// 	"passId": 36,
// 	"passType": 2,
// 	"remark": " ",
// 	"type": null
// }
```

替代方法,可以使用...的方式:

```js
var data = {
  carNumber: "85C10783",
  createTime: 1565248477000,
  deptName: "营销中心OTO部-项目开发",
  name: "杨磊",
  passId: 36,
  passType: 2,
  remark: " ",
  type: null
};

const { carNumber, name, ...otherProps } = data;
```

5. config-provider

```js
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
```

为组件提供统一的全局化配置,antd 提供的方法

6. ../\_util/throttleByAnimationFrame

```js
import { throttleByAnimationFrameDecorator } from "../_util/throttleByAnimationFrame";
```

装饰器写法的节流方法

7. resizeObserver

基于 resize-observer-polyfill 包,用来做响应式组件

是一项新的功能，监听元素的内容矩形大小的变更，并通知做出相应的反应。和 document.onresize 的功能很相似。

兼容性:
兼容 ie11

8. ../\_util/warning

用来告警

基于 rc-util/lib/warning 包,rc-系列的包是 antd 的基础组库

仓库地址: https://github.com/react-component

9. .utils

```js
import {
  addObserveTarget,
  removeObserveTarget,
  getTargetRect,
  getFixedTop,
  getFixedBottom
} from "./utils";
```

这个是当前 affix 的工具纯函数,被抽离出去了

10. 类型定义文件(\*.d.ts)

用 ts 写的模块在发布的时候仍然是用 js 发布，这就导致一个问题：ts 那么多类型数据都没了，所以需要一个 d.ts 文件来标记某个 js 库里面对象的类型

## Affix 组件 AffixProps 接口定义

```ts
export interface AffixProps {
  /**
   * 距离窗口顶部达到指定偏移量后触发
   */
  offsetTop?: number;
  offset?: number;
  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom?: number;
  style?: React.CSSProperties;
  /** 固定状态改变时触发的回调函数 */
  onChange?: (affixed?: boolean) => void;
  /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target?: () => Window | HTMLElement | null;
  prefixCls?: string;
  className?: string;
}
```

该部分是 ts 用来定义接口类型的,在下一节会单独讲 ts.

## enum affixStatus

```ts
enum AffixStatus {
  None,
  Prepare
}
// {
//   None: 0,
//   Prepare: 1
// }
```

该部分是 ts 用来声明枚举类型,

## interface AffixState

```js
export interface AffixState {
  affixStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  status: AffixStatus;
  lastAffix: boolean;

  prevTarget: Window | HTMLElement | null;
}
```

该部分用 ts 来声明 AffixState 的接口类型

## Affix 组件部分

```js
class Affix extends React.Component<AffixProps, AffixState> {
  // 默认属性
  static defaultProps = {
    target: getDefaultTarget,
  };

  // state
  state: AffixState = {
    status: AffixStatus.None,
    lastAffix: false,
    prevTarget: null,
  };

  placeholderNode: HTMLDivElement;

  fixedNode: HTMLDivElement;

  // 类的私有成员,还有其他类的语法定义形式: public(共有成员), protected(受保护的成员)
  private timeout: number;

  // 组件将要加载周期
  componentDidMount(){}

  // 性能优化使用的周期,组件将要更新周期,可以返回false,不更新
  componentDidUpdate(){}

  // 组件将要卸载
  componentWillUnmount(){}

  // 获取到顶部的偏移量,使用箭头函数,将this的执行绑定到class
  getOffsetTop()=>{}

  // 获取到底部的偏移量
  getOffsetBottom=()=>{}

  // 保存站位节点
  savePlaceholderNode = (node: HTMLDivElement) => {}

  // 保存固定节点
  saveFixedNode = (node: HTMLDivElement) => {}

  // ======Measure度量======
  measure= () =>{}

  // 准备度量
  // @ts-ignore TS6133
  prepareMeasure = () =>{}

  // 重新调整逻辑
  @throttleByAnimationFrameDecorator()
  updatePosition() {}

  // 懒调整位置
  @throttleByAnimationFrameDecorator()
  lazyUpdatePosition(){}

  // =================== Render ===================
  // 渲染affix的样式
  renderAffix = ({ getPrefixCls }: ConfigConsumerProps) => {}

  // 渲染
  render(){}
}
```

这个部分将整个组件的结构展示出来,具体的实现请看下

## componentDidMount 部分

```js
// Event handler
  componentDidMount() {
    const { target } = this.props;
    if (target) {
      // [Legacy] Wait for parent component ref has its value.
      // We should use target as directly element instead of function which makes element check hard.
      this.timeout = setTimeout(() => {
        addObserveTarget(target(), this);
        // Mock Event object.
        this.updatePosition();
      });
    }
  }


  // ======================== Observer ========================
  // 触发的事件
  const TRIGGER_EVENTS = [
    'resize',
    'scroll',
    'touchstart',
    'touchmove',
    'touchend',
    'pageshow',
    'load',
  ];
  // 定义观察者接口
  interface ObserverEntity {
    target: HTMLElement | Window;
    affixList: Affix[];
    eventHandlers: { [eventName: string]: any };
  }

  // 观察者队列
  let observerEntities: ObserverEntity[] = [];

  // addObserveTarget是utils里面的方法
  export function addObserveTarget(target: HTMLElement | Window | null, affix: Affix): void {
    if (!target) return;
    // 从队列中找到当前的affix实例
    let entity: ObserverEntity | undefined = observerEntities.find(item => item.target === target);

    if (entity) {
      entity.affixList.push(affix);
    } else {
      entity = {
        target,
        affixList: [affix],
        eventHandlers: {},
      };
      observerEntities.push(entity);

      // 添加订阅者,遍历所有事件,给当前订阅者绑定事件,然后对affixList,循环,做懒跟新位置
      TRIGGER_EVENTS.forEach(eventName => {
        entity!.eventHandlers[eventName] = addEventListener(target, eventName, () => {
          entity!.affixList.forEach(targetAffix => {
            targetAffix.lazyUpdatePosition();
          });
        });
      });
    }
  }
```
