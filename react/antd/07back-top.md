---
category: Components
type: 其他
subtitle: 回到顶部
title: BackTop
---

返回页面顶部的操作按钮。

## 何时使用

- 当页面内容区域比较长时；
- 当用户需要频繁返回顶部查看相关内容时。

## API

> 有默认样式，距离底部 `50px`，可覆盖。
>
> 自定义样式宽高不大于 40px \* 40px。

| 参数             | 说明                                                          | 类型     | 默认值       | 版本 |
| ---------------- | ------------------------------------------------------------- | -------- | ------------ | ---- |
| target           | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | Function | () => window |      |
| visibilityHeight | 滚动高度达到此参数值才出现 `BackTop`                          | number   | 400          |      |
| onClick          | 点击按钮的回调函数                                            | Function | -            |      |

## 引入的文件

没有其他特别的包,下面的这些包在之前的章节都介绍过了

```js
import * as React from "react";
import Animate from "rc-animate";
import addEventListener from "rc-util/lib/Dom/addEventListener";
import classNames from "classnames";
import omit from "omit.js";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
import getScroll from "../_util/getScroll";
import scrollTo from "../_util/scrollTo";
```

## 声明接口

```js
export interface BackTopProps {
  visibilityHeight?: number; // 滚动高度达到此参数值才出现 BackTop
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  visible?: boolean; // Only for test. Don't use it.
}
```

## 项目结构

```js
export default class BackTop extends React.Component<BackTopProps, any> {
  static defaultProps = {
    visibilityHeight: 400
  };

  scrollEvent: any;

  constructor(props: BackTopProps) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  // 滚动到顶部
  scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {};
  // 处理滚动
  handleScroll = () => {};

  renderBackTop = ({ getPrefixCls }: ConfigConsumerProps) => {};

  render() {
    return <ConfigConsumer>{this.renderBackTop}</ConfigConsumer>;
  }
}
```

## 声明周期

### componentDidMount

```js
componentDidMount() {
  // 外包传入的回调,默认是window
    const getTarget = this.props.target || getDefaultTarget;
    // 注册滚动事件,赋值给静态属性
    this.scrollEvent = addEventListener(getTarget(), 'scroll', this.handleScroll);
    // 默认执行一次滚动事件
    this.handleScroll();
  }


  handleScroll = () => {
    const { visibilityHeight, target = getDefaultTarget } = this.props;
    // 获取滚动高度
    const scrollTop = getScroll(target(), true);
    this.setState({
      visible: scrollTop > (visibilityHeight as number),
    });
  };
```

### componentWillUnmount

```js
  // 事件解绑
  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

```

### render

```js

  renderBackTop = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className = '', children } = this.props;
    const prefixCls = getPrefixCls('back-top', customizePrefixCls);
    const classString = classNames(prefixCls, className);

    const defaultElement = (
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-icon`} />
      </div>
    );

    // fix https://fb.me/react-unknown-prop
    // 拿到移除了
    const divProps = omit(this.props, [
      'prefixCls',
      'className',
      'children',
      'visibilityHeight',
      'target',
      'visible',
    ]);

    // 判断在不在props中,在的话选择props的
    const visible = 'visible' in this.props ? this.props.visible : this.state.visible;

    const backTopBtn = visible ? (
      <div {...divProps} className={classString} onClick={this.scrollToTop}>
        {children || defaultElement}
      </div>
    ) : null;

    return (
      <Animate component="" transitionName="fade">
        {backTopBtn}
      </Animate>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderBackTop}</ConfigConsumer>;
  }

  // 跳转到顶部
  scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const { target = getDefaultTarget, onClick } = this.props;
    scrollTo(0, {
      getContainer: target,
    });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };
```
