---
category: Components
subtitle: 固钉
type: 导航
title: Affix
---

## Affix

将页面元素钉在可视范围。

## 何时使用

当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。

页面可视范围过小时，慎用此功能以免遮挡页面内容。

## API

| 成员         | 说明                                                                 | 类型                           | 默认值 | 版本 |
| ------------ | -------------------------------------------------------------------- | ------------------------------ | ------ | ---- |
| offsetBottom | 距离窗口底部达到指定偏移量后触发                                     | number                         |
| offsetTop    | 距离窗口顶部达到指定偏移量后触发                                     | number                         |
| target       | 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement () => window |
| onChange     | 固定状态改变时触发的回调函数                                         | Function(affixed)              | 无     |

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

## Affix 组件 props AffixProps 接口定义

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

## Affix 组件主体

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

## componentDidUpdate

```js
componentDidUpdate(prevProps: AffixProps) {
    const { prevTarget } = this.state;
    const { target } = this.props;
    let newTarget = null;
    if (target) {
      newTarget = target() || null;
    }

    // 如果位置不相等,就删除当前节点,重新添加到观察者队列中
    if (prevTarget !== newTarget) {
      removeObserveTarget(this);
      if (newTarget) {
        addObserveTarget(newTarget, this);
        // Mock Event object.
        this.updatePosition();
      }

      this.setState({ prevTarget: newTarget });
    }
    // 如果位置不相等,更新位置
    if (
      prevProps.offsetTop !== this.props.offsetTop ||
      prevProps.offsetBottom !== this.props.offsetBottom
    ) {
      this.updatePosition();
    }
    // 测量位置
    this.measure();
  }
```

## componentWillUnmount

```js
componentWillUnmount() {
  // 删除定时器
  clearTimeout(this.timeout);
  // 清除当前节点的观察者
  removeObserveTarget(this);
  // any类型的作用是不需要明确定义值的结构和类型, 也就是声明为任意类型
  (this.updatePosition as any).cancel();
}
```

## render

```js
// 这里getPrefixCls来源于ConfigConPorvider广播过来的数据,属于消费者
renderAffix = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { affixStyle, placeholderStyle } = this.state;
    const { prefixCls, children } = this.props;
    const className = classNames({
      [getPrefixCls('affix', prefixCls)]: affixStyle,
    });

    // 将'prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange'从props去除出来,可以用es6的拓展运算符也可以,只是es6需要声明更多的变量,不方便
    let props = omit(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']);
    // Omit this since `onTestUpdatePosition` only works on test.
    if (process.env.NODE_ENV === 'test') {
      props = omit(props, ['onTestUpdatePosition']);
    }

    return (
      // 第三方库用来监听元素的变化
      <ResizeObserver
        onResize={() => {
          this.updatePosition();
        }}
      >
        <div {...props} ref={this.savePlaceholderNode}>
          // 占位节点
          {affixStyle && <div style={placeholderStyle} aria-hidden="true" />}
          // 固定定位节点
          <div className={className} ref={this.saveFixedNode} style={affixStyle}>
            <ResizeObserver
              onResize={() => {
                this.updatePosition();
              }}
            >
              {children}
            </ResizeObserver>
          </div>
        </div>
      </ResizeObserver>
    );
  };

render() {
    // ConfigConsumer这里是消费者,使用的是Context.Provider和Context.Consumer,为了共享那些对于一个组件树而言是“全局”的数据,Context 能让你将这些数据向组件树下所有的组件进行“广播”
    return <ConfigConsumer>{this.renderAffix}</ConfigConsumer>;
  }
```

## 一些组件函数

上面已经简单吧 affix 的组件结构,生命周期都讲完了.下面将一些调用的函数

### getOffsetTop

该函数用来获取距离顶部的偏移量,offset 和 offsetBottom,offsetTop 来源于外层传入的组件

如果 offsetTop 不存在,使用默认的 offset 作为值

如果 offsetBottom 和 offsetTop 都不存在,则 offsetTop 为 0

```js
getOffsetTop = () => {
  const { offset, offsetBottom } = this.props;
  let { offsetTop } = this.props;
  if (typeof offsetTop === "undefined") {
    offsetTop = offset;
    warning(
      typeof offset === "undefined",
      "Affix",
      "`offset` is deprecated. Please use `offsetTop` instead."
    );
  }

  if (offsetBottom === undefined && offsetTop === undefined) {
    offsetTop = 0;
  }
  return offsetTop;
};
```

### getOffsetBottom

从外层获取 offsetBottom

```js
getOffsetBottom = () => {
  return this.props.offsetBottom;
};
```

### savePlaceholderNode

保存占位节点的数据

```js
savePlaceholderNode = (node: HTMLDivElement) => {
  this.placeholderNode = node;
};
```

### saveFixedNode

保存固定定位节点的信息

```js
saveFixedNode = (node: HTMLDivElement) => {
  this.fixedNode = node;
};
```

### measure

该函数是用来测量

```js
measure = () => {
  // 状态none 0/prepare 1,最近的affix:boolean
    const { status, lastAffix } = this.state;
    // target:设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数,改变的回调事件
    const { target, onChange } = this.props;
    // 如果状态不等于prepare或者固定元素不存在,或者占位元素不存在,或者target函数不存在,只要有一个条件满足,就不再执行
    // 因此这里应该是针对已经affix的元素
    if (status !== AffixStatus.Prepare || !this.fixedNode || !this.placeholderNode || !target) {
      return;
    }

    const offsetTop = this.getOffsetTop();
    const offsetBottom = this.getOffsetBottom();

  // 获取滚动容器节点,不存在直接返回
    const targetNode = target();
    if (!targetNode) {
      return;
    }
    // 声明一个新的状态,默认为0
    const newState: Partial<AffixState> = {
      status: AffixStatus.None,
    };
    // 将容器元素和占位元素转化成DOMRect元素
    const targetRect = getTargetRect(targetNode);
    const placeholderReact = getTargetRect(this.placeholderNode);
    // 获取固定位置的偏移量
    const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
    const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);

    // fixedTop高度不为undefined,设置affix的和placeholder的样式
    if (fixedTop !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        top: fixedTop,
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
      newState.placeholderStyle = {
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
    } else if (fixedBottom !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        bottom: fixedBottom,
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
      newState.placeholderStyle = { width: placeholderReact.width,
        height: placeholderReact.height,
      };
    }

    newState.lastAffix = !!newState.affixStyle;
    if (onChange && lastAffix !== newState.lastAffix) {
      onChange(newState.lastAffix);
    }
    // 直接将整个state都重新渲染
    this.setState(newState as AffixState);
  };

```

- getTargetRect()

该函数将 targetNode 元素,转化为 DOMRect 元素,可以得到元素的位置大小信息

```js
export function getTargetRect(target: BindElement): ClientRect {
  return target !== window
    ? (target as HTMLElement).getBoundingClientRect()
    : ({ top: 0, bottom: window.innerHeight } as ClientRect);
}
```

```js
{
  bottom: -1258.4375;
  height: 32;
  left: 376.25;
  right: 632.125;
  top: -1290.4375;
  width: 255.875;
  x: 376.25;
  y: -1290.4375;
}
```

- getFixedTop(), getFixedBottom()
  获取固定定位的 top 位置

```js
export function getFixedTop(
  placeholderReact: Rect, // 占位元素的信息
  targetRect: Rect, // 容器的信息
  offsetTop: number | undefined // 需要偏移的信息
) {
  // 如果偏移高度不等于undefined并且容器的top大于(占位元素的高度-偏移的高度) 当前fixedTop = offsetTop + targetRect.top;
  if (
    offsetTop !== undefined &&
    targetRect.top > placeholderReact.top - offsetTop
  ) {
    return offsetTop + targetRect.top;
  }
  return undefined;
}
```

### prepareMeasure, updatePosition 和 lazyUpdatePosition

prepareMeasure 该函数用来重置 state 数据,同时让 status 为 1

updatePosition 用来更新位置信息,调用 prepareMeasure

```js
prepareMeasure = () => {
    // 以前使用过事件参数。保持兼容TS在此定义
    // event param is used before. Keep compatible ts define here.
    this.setState({
      status: AffixStatus.Prepare,
      affixStyle: undefined,
      placeholderStyle: undefined,
    });

    // Test if `updatePosition` called
    if (process.env.NODE_ENV === 'test') {
      const { onTestUpdatePosition } = this.props as any;
      if (onTestUpdatePosition) {
        onTestUpdatePosition();
      }
    }
  };

  // 处理重新调整逻辑
  // Handle realign logic
  @throttleByAnimationFrameDecorator()
  updatePosition() {
    this.prepareMeasure();
  }

  // 懒更新位置,在整个组件中没有被调用
  @throttleByAnimationFrameDecorator()
  lazyUpdatePosition() {
    const { target } = this.props;
    const { affixStyle } = this.state;
    // 测量前检查位置变化，使safari流畅进行
    // Check position change before measure to make Safari smooth
    if (target && affixStyle) {
      const offsetTop = this.getOffsetTop();
      const offsetBottom = this.getOffsetBottom();

      const targetNode = target();
      if (targetNode) {
        const targetRect = getTargetRect(targetNode);
        const placeholderReact = getTargetRect(this.placeholderNode);
        const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
        const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);

        if (
          (fixedTop !== undefined && affixStyle.top === fixedTop) ||
          (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
        ) {
          return;
        }
      }
    }

    // 直接调用prepare measure，因为它已经被节流了。
    // Directly call prepare measure since it's already throttled.
    this.prepareMeasure();
  }
```
