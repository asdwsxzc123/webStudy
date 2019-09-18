---
category: Components
subtitle: 头像
type: 数据展示
title: Avatar
---

用来代表用户或事物，支持图片、图标或字符展示。

## 设计师专属

安装 [Kitchen Sketch 插件 💎](https://kitchen.alipay.com)，一键填充高逼格头像和文本.

## API

| 参数    | 说明                                                          | 类型                                          | 默认值    | 版本   |
| ------- | ------------------------------------------------------------- | --------------------------------------------- | --------- | ------ |
| icon    | 设置头像的图标类型，参考 `Icon` 组件                          | string                                        | -         |        |
| shape   | 指定头像的形状                                                | Enum{ 'circle', 'square' }                    | `circle`  |        |
| size    | 设置头像的大小                                                | number \| Enum{ 'large', 'small', 'default' } | `default` |        |
| src     | 图片类头像的资源地址                                          | string                                        | -         |        |
| srcSet  | 设置图片类头像响应式资源地址                                  | string                                        | -         | 3.11.0 |
| alt     | 图像无法显示时的替代文本                                      | string                                        | -         | 3.7.0  |
| onError | 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为 | () => boolean                                 | -         | 3.8.0  |

## 引入文件

```js
import * as React from "react";
import classNames from "classnames";
import Icon from "../icon"; // 基于icon组件
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
```

## 声明的接口

没什么需要写的了,该组件的作者已经将所有的注释都写好了,挺不错的

```js
export interface AvatarProps {
  /** Shape of avatar, options:`circle`, `square` */
  shape?: "circle" | "square";
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size?: "large" | "small" | "default" | number;
  /** Src of image avatar */
  src?: string;
  /** Srcset of image avatar */
  srcSet?: string;
  /** Type of the Icon to be used in avatar */
  icon?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  alt?: string;
  /* callback when img load error */
  /* return false to prevent Avatar show default fallback behavior, then you can do fallback by your self */
  onError?: () => boolean;
}

export interface AvatarState {
  scale: number;
  isImgExist: boolean;
}
```

## 结构

```js

export default class Avatar extends React.Component<AvatarProps, AvatarState> {
  // 设置默认值,并使用ts接口定义的类型校验
  static defaultProps = {
    shape: 'circle' as AvatarProps['shape'],
    size: 'default' as AvatarProps['size'],
  };

  state = {
    scale: 1,
    isImgExist: true,
  };
  // html节点
  private avatarNode: HTMLElement;
  // avatarChildren子元素
  private avatarChildren: HTMLElement;
  // 最新子元素的宽度
  private lastChildrenWidth: number;
  // 最新节点的宽度
  private lastNodeWidth: number;

  componentDidMount() {
  }

  componentDidUpdate(prevProps: AvatarProps) {
  }
  // 设置缩放
  setScale = () => {
  };
  // 处理图片加载失败
  handleImgLoadError = () => {
  };

  renderAvatar = ({ getPrefixCls }: ConfigConsumerProps) => {
  };

  render() {
    return <ConfigConsumer>{this.renderAvatar}</ConfigConsumer>;
  }
}

```

## 生命周期

### componentDidMount

```js

  componentDidMount() {
    this.setScale();
  }
  // 设置缩放
  setScale = () => {
    // chilren和当前dom节点都存在
    if (!this.avatarChildren || !this.avatarNode) {
      return;
    }

    const childrenWidth = this.avatarChildren.offsetWidth; // offsetWidth avoid affecting be transform scale
    const nodeWidth = this.avatarNode.offsetWidth;
    // denominator is 0 is no meaning
    if (
      childrenWidth === 0 ||
      nodeWidth === 0 ||
      (this.lastChildrenWidth === childrenWidth && this.lastNodeWidth === nodeWidth)
    ) {
      return;
    }
    this.lastChildrenWidth = childrenWidth;
    this.lastNodeWidth = nodeWidth;
    // add 4px gap for each side to get better performance
    this.setState({
      scale: nodeWidth - 8 < childrenWidth ? (nodeWidth - 8) / childrenWidth : 1,
    });
  };
```

### componentDidUpdate

```js
  // 更新的时候缩放
  componentDidUpdate(prevProps: AvatarProps) {
    this.setScale();
    // 如果之前和现在的src不相等
    if (prevProps.src !== this.props.src) {
      // 没明白为什么要将缩放又调到1
      this.setState({ isImgExist: true, scale: 1 });
    }
```

### render

```js

  renderAvatar = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      shape, // 指定头像的形状,圆形和方形
      size,
      src,
      srcSet, // 	设置图片类头像响应式资源地址
      icon,
      className,
      alt,
      ...others
    } = this.props;

    const { isImgExist, scale } = this.state;

    const prefixCls = getPrefixCls('avatar', customizePrefixCls);

    // 设置图片尺寸的类名
    const sizeCls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    });

    // 设置class类名
    const classString = classNames(prefixCls, className, sizeCls, {
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-image`]: src && isImgExist,
      [`${prefixCls}-icon`]: icon,
    });

    // react hook
    const sizeStyle: React.CSSProperties =
      typeof size === 'number'
        ? {
            width: size,
            height: size,
            lineHeight: `${size}px`,
            fontSize: icon ? size / 2 : 18,
          }
        : {};

    let { children } = this.props;
    // 是图片存在且有src
    if (src && isImgExist) {
      children = <img src={src} srcSet={srcSet} onError={this.handleImgLoadError} alt={alt} />;
      // 是icon
    } else if (icon) {
      children = <Icon type={icon} />;
    } else {
      const childrenNode = this.avatarChildren;
      if (childrenNode || scale !== 1) {
        const transformString = `scale(${scale}) translateX(-50%)`;
        // 做css兼容处理
        const childrenStyle: React.CSSProperties = {
          msTransform: transformString,
          WebkitTransform: transformString,
          transform: transformString,
        };
        const sizeChildrenStyle: React.CSSProperties =
          typeof size === 'number'
            ? {
                lineHeight: `${size}px`,
              }
            : {};
        children = (
          <span
            className={`${prefixCls}-string`}
            ref={(node: HTMLElement) => (this.avatarChildren = node)}
            style={{ ...sizeChildrenStyle, ...childrenStyle }}
          >
            {children}
          </span>
        );
      } else {
        children = (
          <span
            className={`${prefixCls}-string`}
            ref={(node: HTMLElement) => (this.avatarChildren = node)}
          >
            {children}
          </span>
        );
      }
    }
    return (
      <span
        {...others}
        style={{ ...sizeStyle, ...others.style }}
        className={classString}
        ref={(node: HTMLElement) => (this.avatarNode = node)}
      >
        {children}
      </span>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderAvatar}</ConfigConsumer>;
  }
```

## handleImgLoadError

```js
handleImgLoadError = () => {
  const { onError } = this.props;
  // 错误的回调处理,回到返回值不是false,就将imgExist变成false
  const errorFlag = onError ? onError() : undefined;
  if (errorFlag !== false) {
    this.setState({ isImgExist: false });
  }
};
```
