---
category: Components
type: 通用
title: Button
subtitle: 按钮
---

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`。

按钮的属性说明如下：

| 属性     | 说明                                                                                                                                 | 类型                         | 默认值    | 版本  |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | --------- | ----- |
| disabled | 按钮失效状态                                                                                                                         | boolean                      | `false`   | 3.5.1 |
| ghost    | 幽灵属性，使按钮背景透明，版本 2.7 中增加                                                                                            | boolean                      | false     |       |
| href     | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致                                                                                | string                       | -         |       |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string                       | `button`  |       |
| icon     | 设置按钮的图标类型                                                                                                                   | string                       | -         |       |
| loading  | 设置按钮载入状态                                                                                                                     | boolean \| { delay: number } | `false`   |       |
| shape    | 设置按钮形状，可选值为 `circle`、 `round` 或者不设                                                                                   | string                       | -         |       |
| size     | 设置按钮大小，可选值为 `small` `large` 或者不设                                                                                      | string                       | `default` |       |
| target   | 相当于 a 链接的 target 属性，href 存在时生效                                                                                         | string                       | -         |       |
| type     | 设置按钮类型，可选值为 `primary` `dashed` `danger` `link`(3.17 中增加) 或者不设                                                      | string                       | -         |       |
| onClick  | 点击按钮时的回调                                                                                                                     | (event) => void              | -         |       |
| block    | 将按钮宽度调整为其父宽度的选项                                                                                                       | boolean                      | `false`   | 3.8.0 |

支持原生 button 的其他所有属性。

## FAQ

### 如何移除两个汉字之间的空格？

根据 Ant Design 设计规范要求，我们会在按钮内只有两个汉字时自动添加空格，如果你不需要这个特性，可以设置 [ConfigProvider](/components/config-provider/#API) 的 `autoInsertSpaceInButton` 为 `false`。

![](https://gw.alipayobjects.com/zos/antfincdn/Hz5HL9gsT4/f29f170d-b78d-4d2b-aa71-0da6a9ead4d9.png)

<style>
[id^="components-button-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-button-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>

## 引入文件

```js
import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import { polyfill } from "react-lifecycles-compat";
import omit from "omit.js";
import Group from "./button-group"; // button组
import Icon from "../icon";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
import Wave from "../_util/wave";
// ts的Omit和元组辅助类
import { Omit, tuple } from "../_util/type";
```

## 接口

```js

const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'danger', 'link');
export type ButtonType = (typeof ButtonTypes)[number];
const ButtonShapes = tuple('circle', 'circle-outline', 'round');
export type ButtonShape = (typeof ButtonShapes)[number];
const ButtonSizes = tuple('large', 'default', 'small');
export type ButtonSize = (typeof ButtonSizes)[number];
const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];

export interface BaseButtonProps {
  type?: ButtonType;
  icon?: string;
  shape?: ButtonShape;
  size?: ButtonSize;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

// Typescript will make optional not optional if use Pick with union.
// Should change to `AnchorButtonProps | NativeButtonProps` and `any` to `HTMLAnchorElement | HTMLButtonElement` if it fixed.
// ref: https://github.com/ant-design/ant-design/issues/15930
export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

interface ButtonState {
  loading?: boolean | { delay?: number };
  hasTwoCNChar: boolean;
}

```

## 结构

```js

class Button extends React.Component<ButtonProps, ButtonState> {
  static Group: typeof Group;

  static __ANT_BUTTON = true;

  static defaultProps = {
    loading: false,
    ghost: false, // 按键背景透明
    block: false, // width和父级相等
    htmlType: 'button',
  };

  static propTypes = {
    type: PropTypes.string,
    shape: PropTypes.oneOf(ButtonShapes), // 用ts做校验
    size: PropTypes.oneOf(ButtonSizes),
    htmlType: PropTypes.oneOf(ButtonHTMLTypes),
    onClick: PropTypes.func,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    className: PropTypes.string,
    icon: PropTypes.string,
    block: PropTypes.bool,
    title: PropTypes.string,
  };

  static getDerivedStateFromProps(nextProps: ButtonProps, prevState: ButtonState) {
    // loading是bool类型,更新state
    if (nextProps.loading instanceof Boolean) {
      return {
        ...prevState,
        loading: nextProps.loading,
      };
    }
    return null;
  }

  private delayTimeout: number;

  private buttonNode: HTMLElement | null;

  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      // 通过外部传入loading,实现内部控制loading
      loading: props.loading,
      hasTwoCNChar: false,
    };
  }

  componentDidMount() {
    // 中文编码
    this.fixTwoCNChar();
  }

  componentDidUpdate(prevProps: ButtonProps) {
  }

  componentWillUnmount() {
  }
  // 保存按钮的dom对象
  saveButtonRef = (node: HTMLElement | null) => {
    this.buttonNode = node;
  };

  handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
  };

  fixTwoCNChar() {
  }
  // 是否需要被插入
  isNeedInserted() {
  }

  renderButton = ({ getPrefixCls, autoInsertSpaceInButton }: ConfigConsumerProps) => {
  };

  render() {
    return <ConfigConsumer>{this.renderButton}</ConfigConsumer>;
  }
}
```

## 生命周期

```js
  const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
  const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
  componentDidMount() {
    this.fixTwoCNChar();
  }

  componentDidUpdate(prevProps: ButtonProps) {
    this.fixTwoCNChar();

    if (prevProps.loading && typeof prevProps.loading !== 'boolean') {
      clearTimeout(this.delayTimeout);
    }

    const { loading } = this.props;
    // loading存在,不是bool,loading.delay存在,说明是对象类型
    if (loading && typeof loading !== 'boolean' && loading.delay) {
      this.delayTimeout = window.setTimeout(() => this.setState({ loading }), loading.delay);
    } else if (prevProps.loading !== this.props.loading) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading });
    }
  }

  componentWillUnmount() {
    // 存在timeId直接清空
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }

 renderButton = ({ getPrefixCls, autoInsertSpaceInButton }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      type,
      shape,
      size,
      className,
      children,
      icon,
      ghost,
      block,
      ...rest
    } = this.props;
    const { loading, hasTwoCNChar } = this.state;

    const prefixCls = getPrefixCls('btn', customizePrefixCls);
    // 默认自动插入空格
    const autoInsertSpace = autoInsertSpaceInButton !== false;

    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
        break;
      default:
        break;
    }

    const iconType = loading ? 'loading' : icon;

    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && children !== 0 && iconType,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-background-ghost`]: ghost,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
      [`${prefixCls}-block`]: block,
    });

    const iconNode = iconType ? <Icon type={iconType} /> : null;
    // 对文本进行空格
    const kids =
      children || children === 0
        ? spaceChildren(children, this.isNeedInserted() && autoInsertSpace)
        : null;

    const linkButtonRestProps = omit(rest as AnchorButtonProps, ['htmlType', 'loading']);
    // 如果有href,使用a标签
    if (linkButtonRestProps.href !== undefined) {
      return (
        <a
          {...linkButtonRestProps}
          className={classes}
          onClick={this.handleClick}
          ref={this.saveButtonRef}
        >
          {iconNode}
          {kids}
        </a>
      );
    }

    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    const { htmlType, ...otherProps } = rest as NativeButtonProps;
    // 使用type=htmlType设置
    const buttonNode = (
      <button
        {...(omit(otherProps, ['loading']) as NativeButtonProps)}
        type={htmlType}
        className={classes}
        onClick={this.handleClick}
        ref={this.saveButtonRef}
      >
        {iconNode}
        {kids}
      </button>
    );

    if (type === 'link') {
      return buttonNode;
    }
    // wave 动效
    return <Wave>{buttonNode}</Wave>;
  };
  fixTwoCNChar() {
    // Fix for HOC usage like <FormatMessage />
    if (!this.buttonNode) {
      return;
    }
    // 获取文本内容
    const buttonText = this.buttonNode.textContent || this.buttonNode.innerText;
    // 需要插入
    if (this.isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!this.state.hasTwoCNChar) {
        this.setState({
          hasTwoCNChar: true,
        });
      }
    } else if (this.state.hasTwoCNChar) {
      this.setState({
        hasTwoCNChar: false,
      });
    }
  }

  isNeedInserted() {
    const { icon, children } = this.props;
    // 获取子元素的格式,Children还有其他的方法only,map,toArray等
    // 如果个数为1,并且icon不存在,需要插入
    return React.Children.count(children) === 1 && !icon;
  }
  // 处理点击事件
  handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    const { loading } = this.state;
    const { onClick } = this.props;
    if (loading) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

// 空格子元素,纯函数直接写在组件外面
function spaceChildren(children: React.ReactNode, needInserted: boolean) {
  let isPrevChildPure: boolean = false;
  const childList: React.ReactNode[] = [];
  React.Children.forEach(children, child => {
    const type = typeof child;
    const isCurrentChildPure = type === 'string' || type === 'number';
    // 默认是false,isCurrentChildPure如果类型是string和number为true
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1;
      const lastChild = childList[lastIndex];
      // 改写最后一个list
      childList[lastIndex] = `${lastChild}${child}`;
    } else {
      childList.push(child);
    }

    isPrevChildPure = isCurrentChildPure;
  });

  // Pass to React.Children.map to auto fill key
  return React.Children.map(childList, child =>
    insertSpace(child as React.ReactChild, needInserted),
  );
}


// Insert one space between two chinese characters automatically.
function insertSpace(child: React.ReactChild, needInserted: boolean) {
  // Check the child if is undefined or null.
  if (child == null) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  // strictNullChecks oops.
  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return React.cloneElement(child, {}, child.props.children.split('').join(SPACE));
  }
  if (typeof child === 'string') {
    if (isTwoCNChar(child)) {
      child = child.split('').join(SPACE);
    }
    return <span>{child}</span>;
  }
  return child;
}

```

## Group 引入文件

```js
import * as React from "react";
import classNames from "classnames";
import { ButtonSize } from "./button"; // 引入了ButtonSize接口
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
```

## Group 接口定义

```js
export interface ButtonGroupProps {
  size?: ButtonSize;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}
```

## Group 结构

```js
// 无状态函数组件被设计为 React.SFC,它只能接收 props,
const ButtonGroup: React.SFC<ButtonGroupProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls: customizePrefixCls,
        size,
        className,
        ...others
      } = props;
      const prefixCls = getPrefixCls("btn-group", customizePrefixCls);

      // large => lg
      // small => sm
      let sizeCls = "";
      switch (size) {
        case "large":
          sizeCls = "lg";
          break;
        case "small":
          sizeCls = "sm";
          break;
        default:
          break;
      }

      const classes = classNames(
        prefixCls,
        {
          [`${prefixCls}-${sizeCls}`]: sizeCls
        },
        className
      );
      // group里面的children在others里面
      return <div {...others} className={classes} />;
    }}
  </ConfigConsumer>
);
```
