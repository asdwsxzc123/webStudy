---
category: Components
subtitle: 警告提示
type: 反馈
title: Alert
---

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## API

| 参数        | 说明                                                                 | 类型                    | 默认值                                    | 版本   |
| ----------- | -------------------------------------------------------------------- | ----------------------- | ----------------------------------------- | ------ |
| afterClose  | 关闭动画结束后触发的回调函数                                         | () => void              | -                                         | 3.3.1  |
| banner      | 是否用作顶部公告                                                     | boolean                 | false                                     |        |
| closable    | 默认不显示关闭按钮                                                   | boolean                 | 无                                        |        |
| closeText   | 自定义关闭按钮                                                       | string                  | ReactNode                                 | 无     |  |
| description | 警告提示的辅助性文字介绍                                             | string\|ReactNode       | 无                                        |        |
| icon        | 自定义图标，`showIcon` 为 `true` 时有效                              | ReactNode               | -                                         | 3.10.0 |
| message     | 警告提示内容                                                         | string\|ReactNode       | 无                                        |        |
| showIcon    | 是否显示辅助图标                                                     | boolean                 | false，`banner` 模式下默认值为 true       |        |
| type        | 指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`error` | string                  | `info`，`banner` 模式下默认值为 `warning` |        |
| onClose     | 关闭时触发的回调函数                                                 | (e: MouseEvent) => void | 无                                        |        |

## 引入的文件

```js
import * as React from "react";
import * as ReactDOM from "react-dom";
import Animate from "rc-animate";
import classNames from "classnames";
import Icon, { ThemeType } from "../icon";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
import getDataOrAriaProps from "../_util/getDataOrAriaProps";
import warning from "../_util/warning";
```

1. rc-animate
   动画库

2. getDataOrAriaProps
   获取所有 props 的 keyslist,将自定义属性为 data,aria,role 的赋值给新 data

```js
export default function getDataOrAriaProps(props: any) {
  return Object.keys(props).reduce((prev: any, key: string) => {
    if (
      (key.substr(0, 5) === "data-" ||
        key.substr(0, 5) === "aria-" ||
        key === "role") &&
      key.substr(0, 7) !== "data-__"
    ) {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}
```

## Alert 组件 props 和 state 接口定义

```js
export interface AlertProps {
  /**
   * Type of Alert styles, options:`success`, `info`, `warning`, `error`
   */
  type?: "success" | "info" | "warning" | "error";
  /** Whether Alert can be closed */
  closable?: boolean;
  /** Close text to show */
  closeText?: React.ReactNode;
  /** Content of Alert */
  message: React.ReactNode;
  /** Additional content of Alert */
  description?: React.ReactNode;
  /** Callback when close Alert */
  onClose?: React.MouseEventHandler<HTMLAnchorElement>;
  /** Trigger when animation ending of Alert */
  afterClose?: () => void;
  /** Whether to show icon */
  showIcon?: boolean;
  iconType?: string;
  style?: React.CSSProperties;
  prefixCls?: string; //
  className?: string;
  banner?: boolean;
  icon?: React.ReactNode;
}

export interface AlertState {
  closing: boolean;
  closed: boolean;
}
```

## Alert 组件主体

```js
export default class Alert extends React.Component<AlertProps, AlertState> {
  constructor(props: AlertProps) {}
  // 处理关闭
  handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {};
  // 动画结束
  animationEnd = () => {};
  // 渲染Alert
  renderAlert = ({ getPrefixCls }: ConfigConsumerProps) => {};
  // render
  render() {}
}
```

## 组件生命周期

### constructor

```js
constructor(props: AlertProps) {
    super(props);
  // 如果不存在iconType就告警
    warning(
      !('iconType' in props),
      'Alert',
      '`iconType` is deprecated. Please use `icon` instead.',
    );
    // 设置state
    this.state = {
      closing: true,
      closed: false,
    };
  }
```

### render

阅读该部分源码,感觉像一个新手写的, 用了中文注释,整个 renderAlert 非常庞大,没有拆分

```js
  // 从configconsumer获取getPrefixCls
  renderAlert = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      description,  // 描述
      prefixCls: customizePrefixCls, // 自定义class
      message, // 消息
      closeText, // 关闭的文案
      banner, // 是否为banner
      className = '', // className
      style, // 自定义样式
      icon, // icon
    } = this.props;
    // 是否可关闭,类型,显示icon,默认bannerTrue,如果为false不显示icon,icon类型
    let { closable, type, showIcon, iconType } = this.props;

    // 混入类名,给alert的类名加前缀ant-
    const prefixCls = getPrefixCls('alert', customizePrefixCls);

    // banner模式默认有 Icon
    showIcon = banner && showIcon === undefined ? true : showIcon;
    // banner模式默认为警告
    type = banner && type === undefined ? 'warning' : type || 'info';

    // icon主题默认是filled
    let iconTheme: ThemeType = 'filled';
    if (!iconType) {
      switch (type) {
        case 'success':
          iconType = 'check-circle';
          break;
        case 'info':
          iconType = 'info-circle';
          break;
        case 'error':
          iconType = 'close-circle';
          break;
        case 'warning':
          iconType = 'exclamation-circle';
          break;
        default:
          iconType = 'default';
      }

      // use outline icon in alert with description
      if (description) {
        iconTheme = 'outlined';
      }
    }

    // closeable when closeText is assigned
    if (closeText) {
      closable = true;
    }
    // prefixCls= 'ant-alert'
    // 将整个className合并在一起
    const alertCls = classNames(
      prefixCls,
      `${prefixCls}-${type}`,
      {
        [`${prefixCls}-close`]: !this.state.closing,
        [`${prefixCls}-with-description`]: !!description,
        [`${prefixCls}-no-icon`]: !showIcon,
        [`${prefixCls}-banner`]: !!banner,
        [`${prefixCls}-closable`]: closable,
      },
      className,
    );

    // 关闭的icon
    const closeIcon = closable ? (
      <span
        role="button"
        onClick={this.handleClose}
        className={`${prefixCls}-close-icon`}
        tabIndex={0}
      >
        {closeText ? (
          <span className={`${prefixCls}-close-text`}>{closeText}</span>
        ) : (
          <Icon type="close" />
        )}
      </span>
    ) : null;

    // 将data,role,aria的props返回
    const dataOrAriaProps = getDataOrAriaProps(this.props);

    // iconNode复制
    const iconNode = (icon &&
      (React.isValidElement<{ className?: string }>(icon) ? (
        React.cloneElement(icon, {
          className: classNames({
            [icon.props.className as string]: icon.props.className,
            [`${prefixCls}-icon`]: true,
          }),
        })
      ) : (
        <span className={`${prefixCls}-icon`}>{icon}</span>
      ))) || <Icon className={`${prefixCls}-icon`} type={iconType} theme={iconTheme} />;

    // 如果closed为true,显示节点,在外层包裹Animate组件,做动画
    return this.state.closed ? null : (
      <Animate
        component=""
        showProp="data-show"
        transitionName={`${prefixCls}-slide-up`}
        onEnd={this.animationEnd} //动画结束的回调
      >
        <div data-show={this.state.closing} className={alertCls} style={style} {...dataOrAriaProps}>
          {showIcon ? iconNode : null}
          <span className={`${prefixCls}-message`}>{message}</span>
          <span className={`${prefixCls}-description`}>{description}</span>
          {closeIcon}
        </div>
      </Animate>
    );
  };

  render() {
    // 配置消费者,可以全局设置,Alert的一些配置
    return <ConfigConsumer>{this.renderAlert}</ConfigConsumer>;
  }
```

## 其他的函数

### handleClose

处理关闭函数

```js
  // 鼠标事件
  handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 阻止默认事件,事件冒泡,事件捕获
    e.preventDefault();
    // this是整个Alert组件,findDOMNode可以获取当前节点
    const dom = ReactDOM.findDOMNode(this) as HTMLElement;
    dom.style.height = `${dom.offsetHeight}px`;
    // Magic code
    // 重复一次后才能正确设置 height
    dom.style.height = `${dom.offsetHeight}px`;

    // 让closing为false
    this.setState({
      closing: false,
    });
    // 调用外部onClose回调事件
    (this.props.onClose || noop)(e);
  };
```

### animationEnd

动画结束事件

```js
animationEnd = () => {
  this.setState({
    closed: true,
    closing: true
  });
  // 关闭动画结束后触发的回调函数,如果不存在,执行noop这个空函数?没搞懂,为啥要执行noop这个空函数,可以直接判断afterClose是否存在,并且是函数,来调用呀,是为了以后做拓展吗,noop可能会执行其他的回调事件
  (this.props.afterClose || noop)();
};
```
