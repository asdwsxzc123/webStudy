---
type: 反馈
category: Components
subtitle: 抽屉
title: Drawer
---

屏幕边缘滑出的浮层面板。

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

## API

| 参数               | 说明                                                 | 类型                                                     | 默认值  | 版本   |
| ------------------ | ---------------------------------------------------- | -------------------------------------------------------- | ------- | ------ |
| closable           | 是否显示右上角的关闭按钮                             | boolean                                                  | true    | 3.7.0  |
| destroyOnClose     | 关闭时销毁 Drawer 里的子元素                         | boolean                                                  | false   | 3.7.0  |
| getContainer       | 指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom | HTMLElement \| `() => HTMLElement` \| Selectors \| false | 'body'  | 3.7.0  |
| maskClosable       | 点击蒙层是否允许关闭                                 | boolean                                                  | true    | 3.7.0  |
| mask               | 是否展示遮罩                                         | Boolean                                                  | true    | 3.7.0  |
| maskStyle          | 遮罩样式                                             | object                                                   | {}      | 3.7.0  |
| style              | 可用于设置 Drawer 最外层容器的样式                   | object                                                   | -       | 3.7.0  |
| bodyStyle          | 可用于设置 Drawer 的样式，调整浮层位置等             | object                                                   | -       | 3.12.0 |
| title              | 标题                                                 | string \| ReactNode                                      | -       | 3.7.0  |
| visible            | Drawer 是否可见                                      | boolean                                                  | -       | 3.7.0  |
| width              | 宽度                                                 | string \| number                                         | 256     | 3.7.0  |
| height             | 高度, 在 `placement` 为 `top` 或 `bottom` 时使用     | string \| number                                         | 256     | 3.9.0  |
| className          | 对话框外层容器的类名                                 | string                                                   | -       | 3.8.0  |
| zIndex             | 设置 Drawer 的 `z-index`                             | Number                                                   | 1000    | 3.7.0  |
| placement          | 抽屉的方向                                           | 'top' \| 'right' \| 'bottom' \| 'left'                   | 'right' | 3.7.0  |
| onClose            | 点击遮罩层或右上角叉或取消按钮的回调                 | function(e)                                              | 无      | 3.7.0  |
| afterVisibleChange | 切换抽屉时动画结束后的回调                           | function(visible)                                        | 无      | 3.17.0 |
| keyboard           | 是否支持键盘 esc 关闭                                | boolean                                                  | true    | 3.19.8 |

<style>
#_hj_feedback_container {
  display: none;
}
</style>

## 引入文件

```js
import * as React from "react";
import RcDrawer from "rc-drawer";
import createReactContext from "@ant-design/create-react-context"; // ts声明
import classNames from "classnames";
import omit from "omit.js";
import warning from "../_util/warning";
import Icon from "../icon";
import { withConfigConsumer, ConfigConsumerProps } from "../config-provider";
import { tuple } from "../_util/type"; // 声明类型
```

## 声明

```js

const DrawerContext = createReactContext<Drawer | null>(null);

type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

type getContainerFunc = () => HTMLElement;

const PlacementTypes = tuple('top', 'right', 'bottom', 'left');
type placementType = (typeof PlacementTypes)[number];
export interface DrawerProps {
  closable?: boolean;
  destroyOnClose?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  maskClosable?: boolean;
  mask?: boolean;
  maskStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  title?: React.ReactNode;
  visible?: boolean;
  width?: number | string;
  height?: number | string;
  /* deprecated, use className instead */
  wrapClassName?: string;
  zIndex?: number;
  prefixCls?: string;
  push?: boolean;
  placement?: placementType;
  onClose?: (e: EventType) => void;
  afterVisibleChange?: (visible: boolean) => void;
  className?: string;
  handler?: React.ReactNode;
  keyboard?: boolean;
}

export interface IDrawerState {
  push?: boolean;
}
```

## 结构

```js
class Drawer extends React.Component<DrawerProps & ConfigConsumerProps, IDrawerState> {
  static defaultProps = {
    width: 256,
    height: 256,
    closable: true,
    placement: 'right' as placementType,
    maskClosable: true,
    mask: true,
    level: null,
    keyboard: true,
  };

  readonly state = {
    push: false,
  };

  parentDrawer: Drawer | null;

  destroyClose: boolean;

  public componentDidMount() {
    // fix: delete drawer in child and re-render, no push started.
    // <Drawer>{show && <Drawer />}</Drawer>
    const { visible } = this.props;
    if (visible && this.parentDrawer) {
      this.parentDrawer.push();
    }
  }

  public componentDidUpdate(preProps: DrawerProps) {
    const { visible } = this.props;
    if (preProps.visible !== visible && this.parentDrawer) {
      if (visible) {
        this.parentDrawer.push(); // 开
      } else {
        this.parentDrawer.pull(); // 关
      }
    }
  }

  public componentWillUnmount() {
    // unmount drawer in child, clear push.
    if (this.parentDrawer) {
      this.parentDrawer.pull();
      this.parentDrawer = null;
    }
  }

  push = () => {
    this.setState({
      push: true,
    });
  };

  pull = () => {
    this.setState({
      push: false,
    });
  };

  onDestroyTransitionEnd = () => {
    // 关闭时销毁 Drawer 里的子元素
    const isDestroyOnClose = this.getDestroyOnClose();
    if (!isDestroyOnClose) {
      return;
    }
    // 如果是关闭,并且visible是false,强制刷新,并且destroyClose = true
    if (!this.props.visible) {
      this.destroyClose = true;
      this.forceUpdate();
    }
  };

  getDestroyOnClose = () => this.props.destroyOnClose && !this.props.visible;

  // get drawer push width or height
  getPushTransform = (placement?: placementType) => {
    if (placement === 'left' || placement === 'right') {
      return `translateX(${placement === 'left' ? 180 : -180}px)`;
    }
    if (placement === 'top' || placement === 'bottom') {
      return `translateY(${placement === 'top' ? 180 : -180}px)`;
    }
  };
  // 设置样式,zIndex,placement/方向, style
  getRcDrawerStyle = () => {
    const { zIndex, placement, style } = this.props;
    const { push } = this.state;
    return {
      zIndex,
      transform: push ? this.getPushTransform(placement) : undefined,
      ...style,
    };
  };
  // 渲染头部
  renderHeader() {
    const { title, prefixCls, closable } = this.props;
    if (!title && !closable) {
      return null;
    }

    const headerClassName = title ? `${prefixCls}-header` : `${prefixCls}-header-no-title`;
    return (
      <div className={headerClassName}>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {closable && this.renderCloseIcon()}
      </div>
    );
  }
  // 渲染关闭icon,都是单一职责,一个函数做一件事情
  renderCloseIcon() {
    const { closable, prefixCls, onClose } = this.props;
    return (
      closable && (
        // eslint-disable-next-line react/button-has-type
        <button onClick={onClose} aria-label="Close" className={`${prefixCls}-close`}>
          <Icon type="close" />
        </button>
      )
    );
  }

  // render drawer body dom
  renderBody = () => {
    const { bodyStyle, placement, prefixCls, visible } = this.props;
    // 销毁子元素
    if (this.destroyClose && !visible) {
      return null;
    }
    this.destroyClose = false;

    const containerStyle: React.CSSProperties =
      placement === 'left' || placement === 'right'
        ? {
            overflow: 'auto',
            height: '100%',
          }
        : {};

    const isDestroyOnClose = this.getDestroyOnClose();

    if (isDestroyOnClose) {
      // Increase the opacity transition, delete children after closing.
      containerStyle.opacity = 0;
      containerStyle.transition = 'opacity .3s';
    }

    return (
      <div
        className={`${prefixCls}-wrapper-body`}
        style={containerStyle}
        onTransitionEnd={this.onDestroyTransitionEnd}
      >
        {this.renderHeader()}
        <div className={`${prefixCls}-body`} style={bodyStyle}>
          {this.props.children}
        </div>
      </div>
    );
  };

  // render Provider for Multi-level drawer
  renderProvider = (value: Drawer) => {
    const {
      prefixCls,
      placement,
      className,
      wrapClassName,
      width,
      height,
      mask,
      ...rest
    } = this.props;
    warning(
      wrapClassName === undefined,
      'Drawer',
      'wrapClassName is deprecated, please use className instead.',
    );
    const haveMask = mask ? '' : 'no-mask';
    this.parentDrawer = value;
    const offsetStyle: any = {};
    if (placement === 'left' || placement === 'right') {
      offsetStyle.width = width;
    } else {
      offsetStyle.height = height;
    }
    return (
      <DrawerContext.Provider value={this}>
        <RcDrawer
          handler={false}
          {...omit(rest, [
            'zIndex',
            'style',
            'closable',
            'destroyOnClose',
            'bodyStyle',
            'title',
            'push',
            'visible',
            'getPopupContainer',
            'rootPrefixCls',
            'getPrefixCls',
            'renderEmpty',
            'csp',
            'autoInsertSpaceInButton',
          ])}
          {...offsetStyle}
          prefixCls={prefixCls}
          open={this.props.visible}
          showMask={mask}
          placement={placement}
          style={this.getRcDrawerStyle()}
          className={classNames(wrapClassName, className, haveMask)}
        >
          {this.renderBody()}
        </RcDrawer>
      </DrawerContext.Provider>
    );
  };

  render() {
    return <DrawerContext.Consumer>{this.renderProvider}</DrawerContext.Consumer>;
  }
}

// 设置默认prefixCls = drawer
export default withConfigConsumer<DrawerProps>({
  prefixCls: 'drawer',
})(Drawer);

```
