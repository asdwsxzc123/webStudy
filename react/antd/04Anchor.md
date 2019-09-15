---
category: Components
subtitle: 锚点
cols: 2
type: 其他
title: Anchor
---

## Anchor

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## API

### Anchor Props

| 成员             | 说明                                                                                | 类型                             | 默认值       | 版本   |
| ---------------- | ----------------------------------------------------------------------------------- | -------------------------------- | ------------ | ------ |
| affix            | 固定模式                                                                            | boolean                          | true         |        |
| bounds           | 锚点区域边界                                                                        | number                           | 5(px)        |        |
| getContainer     | 指定滚动的容器                                                                      | () => HTMLElement                | () => window | 3.4.0  |
| offsetBottom     | 距离窗口底部达到指定偏移量后触发                                                    | number                           |              |        |
| offsetTop        | 距离窗口顶部达到指定偏移量后触发                                                    | number                           |              |        |
| showInkInFixed   | 固定模式是否显示小圆点                                                              | boolean                          | false        |        |
| onClick          | `click` 事件的 handler                                                              | Function(e: Event, link: Object) | -            | 3.9.0  |
| getCurrentAnchor | 自定义高亮的锚点                                                                    | () => string                     | -            | 3.22.0 |
| targetOffset     | 锚点滚动偏移量，默认与 offsetTop 相同，[例子](#components-anchor-demo-targetOffset) | number                           | `offsetTop`  | 3.22.0 |

### Link Props

| 成员  | 说明     | 类型              | 默认值 | 版本 |
| ----- | -------- | ----------------- | ------ | ---- |
| href  | 锚点链接 | string            |        |      |
| title | 文字内容 | string\|ReactNode |        |      |

## index.ts

```js
import Anchor from "./Anchor";
import AnchorLink from "./AnchorLink";

export { AnchorProps } from "./Anchor";
export { AnchorLinkProps } from "./AnchorLink";

// 简写方式,可以少引入一个组件,让Anchor这个组件挂载静态属性等于 AnchorLink
Anchor.Link = AnchorLink;
export default Anchor;
```

## Anchor 引入文件

```js
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types"; // 使用了propTypes做props参数的类型校验
import classNames from "classnames";
import addEventListener from "rc-util/lib/Dom/addEventListener"; // 添加dom事件
import Affix from "../affix"; // 引入Affix固钉
import AnchorLink from "./AnchorLink"; // 引入AnchorLink
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
import scrollTo from "../_util/scrollTo"; // scrollTo滚动方法
import getScroll from "../_util/getScroll"; // 获取滚动位置
```

## 接口类型定义

```js
// section
type Section = {
  link: string,
  top: number
};

// anchor容器,dom元素
export type AnchorContainer = HTMLElement | Window;

// anchorProps定义
export interface AnchorProps {
  prefixCls?: string; // 前缀
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  offsetTop?: number;
  bounds?: number; // 	锚点区域边界
  affix?: boolean; // 是否有固钉
  showInkInFixed?: boolean; // 固定模式是否显示小圆点
  getContainer?: () => AnchorContainer; // 获取容器
  /** Return customize highlight anchor */
  // 返回自定义高亮定位
  getCurrentAnchor?: () => string; // 获取当前锚点
  onClick?: (
    // 点击事件
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode, href: string }
  ) => void;
  /** Scroll to target offset value, if none, it's offsetTop prop value or 0. */
  targetOffset?: number; // 锚点滚动偏移量，默认与 offsetTop 相同
}

// anchor的state定义
export interface AnchorState {
  activeLink: null | string; // 活动的link
}

// anchor默认的props
export interface AnchorDefaultProps extends AnchorProps {
  prefixCls: string; // 类名前缀
  affix: boolean; // 是否有固钉
  showInkInFixed: boolean; // 固定模式是否显示小圆点
  getContainer: () => AnchorContainer; // 获取容器
}

// antAnchor接口,不知道是干嘛的,要看后面
export interface AntAnchor {
  registerLink: (link: string) => void; // 注册link
  unregisterLink: (link: string) => void; // 注销link
  activeLink: string | null; // 活动link
  scrollTo: (link: string) => void; // 滚动
  onClick?: (
    // 点击事件
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode, href: string }
  ) => void;
}
```

## anchor 组件主体

```js
export default class Anchor extends React.Component<AnchorProps, AnchorState> {
  // 静态实例 Link
  static Link: typeof AnchorLink;

  // 默认props
  static defaultProps = {
    affix: true,
    showInkInFixed: false,
    getContainer: getDefaultContainer,
  };
  // 子组件上下文类型
  static childContextTypes = {
    antAnchor: PropTypes.object,
  };
  // state
  state = {
    activeLink: null,
  };

  // 私有变量
  private inkNode: HTMLSpanElement;

  // scroll scope's container
  private scrollContainer: HTMLElement | Window;

  private links: string[] = [];

  private scrollEvent: any;

  private animating: boolean;

  private prefixCls?: string;
  // 获取子组件上下文
  getChildContext() {
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }
  // 获取当前anchor
  getCurrentAnchor(offsetTop = 0, bounds = 5): string {
  }
  // 处理scrollto事件
  handleScrollTo = (link: string) => {
  };
  // 保存ink节点
  saveInkNode = (node: HTMLSpanElement) => {
  };
  // 处理滚动事件
  handleScroll = () => {
  };

  // 根系ink
  updateInk = () => {
  };
  // 渲染Anchor
  renderAnchor = ({ getPrefixCls }: ConfigConsumerProps) => {
  };
  // 渲染
  render() {
  }
}
```

## 声明周期

没有使用 constructor 声明周期,而是直接声明了静态方法 state

### componentDidMount

```js

  componentDidMount() {
    // 获取容器
    const { getContainer } = this.props as AnchorDefaultProps;
    this.scrollContainer = getContainer();
    this.scrollEvent = addEventListener(this.scrollContainer, 'scroll', this.handleScroll);
    this.handleScroll();
  }
```

### componentDidUpdate

```js

  componentDidUpdate() {
    // 如果scrollEvent存在
    if (this.scrollEvent) {
      const { getContainer } = this.props as AnchorDefaultProps;
      const currentContainer = getContainer();
      // 之前存的container和现在的不相等
      if (this.scrollContainer !== currentContainer) {
        this.scrollContainer = currentContainer;
        // 移除滑动事件
        this.scrollEvent.remove();
        // 重新绑定
        this.scrollEvent = addEventListener(this.scrollContainer, 'scroll', this.handleScroll);
        this.handleScroll();
      }
    }
    // 更新ink
    this.updateInk();
  }

  "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addEventListenerWrap;

var _addDomEventListener = _interopRequireDefault(require("add-dom-event-listener"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addEventListenerWrap(target, eventType, cb, option) {
  /* eslint camelcase: 2 */
  var callback = _reactDom.default.unstable_batchedUpdates ? function run(e) {
    _reactDom.default.unstable_batchedUpdates(cb, e);
  } : cb;
  return (0, _addDomEventListener.default)(target, eventType, callback, option);
}
```

### componentWillUnmount

```js
  // 移除滚动事件
  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }
```

### render

```js
renderAnchor = ({ getPrefixCls }: ConfigConsumerProps) => {
  const {
    prefixCls: customizePrefixCls, // 自定义类名
    className = '',
    style,
    offsetTop,
    affix,
    showInkInFixed, // 固定模式是否显示小圆点
    children,
    getContainer
  } = this.props;
  const { activeLink } = this.state;  // 活动link

  // 给类名赋值 ant-anchor
  const prefixCls = getPrefixCls('anchor', customizePrefixCls);

  // 兼容老版本,在实例中添加prefixCls
  // To support old version react.
  // Have to add prefixCls on the instance.
  // https://github.com/facebook/react/issues/12397
  this.prefixCls = prefixCls;

  // ink的class类名,如果activeLink存在,添加visible
  const inkClass = classNames(`${prefixCls}-ink-ball`, {
    visible: activeLink
  });

  // 外层容器的类名
  const wrapperClass = classNames(className, `${prefixCls}-wrapper`);

  // anchor的类名,如果有affix和showInkInFixed存在,fixed
  const anchorClass = classNames(prefixCls, {
    fixed: !affix && !showInkInFixed
  });

  // 外层的行内样式,vh减去ps
  const wrapperStyle = {
    maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
    ...style
  };

  // anchor内容
  const anchorContent = (
    <div className={wrapperClass} style={wrapperStyle}>
      <div className={anchorClass}>
        <div className={`${prefixCls}-ink`}>
          <span className={inkClass} ref={this.saveInkNode} />
        </div>
        {children}
      </div>
    </div>
  );
  // 如果affix不存在,直接
  return !affix ? (
    anchorContent
  ) : (
    <Affix offsetTop={offsetTop} target={getContainer}>
      {anchorContent}
    </Affix>
  );
};

render() {
    return <ConfigConsumer>{this.renderAnchor}</ConfigConsumer>;
  }
```

## getChildContext

该函数返回 antAnchor 的对象,提供了注册 link,解除绑定 link,activeLink( 是否存在活动 link),scrollTo,onClick 方法.
没有在 anchor 中有使用

```js

  getChildContext() {
    const antAnchor: AntAnchor = {
      registerLink: (link: string) => {
        // 将link放入links队列中
        if (!this.links.includes(link)) {
          this.links.push(link);
        }
      },
      unregisterLink: (link: string) => {
        const index = this.links.indexOf(link);
        if (index !== -1) {
          this.links.splice(index, 1);
        }
      },
      activeLink: this.state.activeLink,
      scrollTo: this.handleScrollTo,
      onClick: this.props.onClick,
    };
    return { antAnchor };
  }
```

## getCurrentAnchor

获取当前 anchor

```js

  getCurrentAnchor(offsetTop = 0, bounds = 5): string {
    // 自定义高亮的锚点
    const { getCurrentAnchor } = this.props;

    if (typeof getCurrentAnchor === 'function') {
      return getCurrentAnchor();
    }

    const activeLink = '';
    if (typeof document === 'undefined') {
      return activeLink;
    }

    const linkSections: Array<Section> = [];
    // 获取容器
    const { getContainer } = this.props as AnchorDefaultProps;
    const container = getContainer();
    // links队列循环
    this.links.forEach(link => {
      // exec返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。以#开始 如#components-anchor-demo-basic
      // const sharpMatcherRegx = /#([^#]+)$/;
      const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
      // 如果不存在,直接返回
      if (!sharpLinkMatch) {
        return;
      }
      // 通过id选择器获取目标的dom
      const target = document.getElementById(sharpLinkMatch[1]);
      if (target) {
        // 获取offsetTop高度
        const top = getOffsetTop(target, container);
        // 边界,相当于是border,如果top小于offsetTop+bounds,将link和top的信息放入linkSections队列中
        if (top < offsetTop + bounds) {
          linkSections.push({
            link,
            top,
          });
        }
      }
    });
    // 如果存在linkSections
    if (linkSections.length) {
      // 获取最大section,还是用数组reduce方法
      const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
      return maxSection.link;
    }
    return '';
  }

  const sharpMatcherRegx = /#([^#]+)$/;


  function getOffsetTop(element: HTMLElement, container: AnchorContainer): number {
    if (!element) {
      return 0;
    }
    // 获取位置信息
    if (!element.getClientRects().length) {
      return 0;
    }
    // 获取宽度,高度,left、top、right和botto
    const rect = element.getBoundingClientRect();

    if (rect.width || rect.height) {
      if (container === window) {
        container = element.ownerDocument!.documentElement!;
        return rect.top - container.clientTop;
      }
      return rect.top - (container as HTMLElement).getBoundingClientRect().top;
    }

    return rect.top;
  }
```

## handleScrollTo

处理滚动到

```js
 handleScrollTo = (link: string) => {
    const { offsetTop, getContainer, targetOffset } = this.props as AnchorDefaultProps;

    this.setState({ activeLink: link });
    const container = getContainer();
    // 获取滚动高度
    const scrollTop = getScroll(container, true);
    // 得到link的id
    const sharpLinkMatch = sharpMatcherRegx.exec(link);
    if (!sharpLinkMatch) {
      return;
    }
    const targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
      return;
    }
    // 获取元素偏移高度
    const eleOffsetTop = getOffsetTop(targetElement, container);
    let y = scrollTop + eleOffsetTop;
    y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
    this.animating = true;
    // 滚动操作
    scrollTo(y, {
      callback: () => {
        this.animating = false;
      },
      getContainer,
    });
  };

  export default function getScroll(target: HTMLElement | Window | null, top: boolean): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;

  let ret = isWindow ? (target as Window)[prop] : (target as HTMLElement)[method];
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== 'number') {
    ret = (document.documentElement as HTMLElement)[method];
  }

  return ret;
}

export default function scrollTo(y: number, options: ScrollToOptions = {}) {
  const { getContainer = () => window, callback, duration = 450 } = options;

  const container = getContainer();
  const scrollTop = getScroll(container, true);
  const startTime = Date.now();

  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop);
    } else {
      (container as HTMLElement).scrollTop = nextScrollTop;
    }
    if (time < duration) {
      // 对应node和浏览器请求动画frame的垫片
      // requestAnimationFrame polyfill for node and the browser.
      raf(frameFunc);
    } else if (typeof callback === 'function') {
      callback();
    }
  };
  raf(frameFunc);
}
// 运动方式
export function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  }
  return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}

```

## saveInkNode

保存 inknode 节点

```js
saveInkNode = (node: HTMLSpanElement) => {
  this.inkNode = node;
};
```

## handleScroll

处理滚动事件

```js
handleScroll = () => {
  if (this.animating) {
    return;
  }
  const { activeLink } = this.state;
  const { offsetTop, bounds, targetOffset } = this.props;
  // 获取当前anchor
  const currentActiveLink = this.getCurrentAnchor(
    targetOffset !== undefined ? targetOffset : offsetTop || 0,
    bounds
  );
  if (activeLink !== currentActiveLink) {
    this.setState({
      activeLink: currentActiveLink
    });
  }
};
```

## updateInk

更新 ink

```js

  updateInk = () => {
    if (typeof document === 'undefined') {
      return;
    }
    const { prefixCls } = this;
    const anchorNode = ReactDOM.findDOMNode(this) as Element;
    const linkNode = anchorNode.getElementsByClassName(`${prefixCls}-link-title-active`)[0];
    if (linkNode) {
      this.inkNode.style.top = `${(linkNode as any).offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
    }
  };
```

## AnchorLink 引入文件

```js
import * as React from "react";
import * as PropTypes from "prop-types";
import { polyfill } from "react-lifecycles-compat";
import classNames from "classnames";
import { AntAnchor } from "./Anchor";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
```
