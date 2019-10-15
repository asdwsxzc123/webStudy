---
category: Components
subtitle: 徽标数
type: 数据展示
title: Badge
---

图标右上角的圆形徽标数字。

## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## API

```jsx
<Badge count={5}>
  <a href="#" className="head-example" />
</Badge>
```

```jsx
<Badge count={5} />
```

| 参数          | 说明                                                                     | 类型                                                          | 默认值  | 版本   |
| ------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- | ------- | ------ |
| color         | 自定义小圆点的颜色                                                       | string                                                        | -       | 3.16.0 |
| count         | 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏 | ReactNode                                                     |         |        |
| dot           | 不展示数字，只有一个小红点                                               | boolean                                                       | false   |        |
| offset        | 设置状态点的位置偏移，格式为 `[x, y]`                                    | `[number, number]`                                            | -       |        |
| overflowCount | 展示封顶的数字值                                                         | number                                                        | 99      |        |
| showZero      | 当数值为 0 时，是否展示 Badge                                            | boolean                                                       | false   |        |
| status        | 设置 Badge 为状态点                                                      | Enum{ 'success', 'processing, 'default', 'error', 'warning' } | ''      |        |
| text          | 在设置了 `status` 的前提下有效，设置状态点的文本                         | string                                                        | ''      |        |
| title         | 设置鼠标放在状态点上时显示的文字                                         | string                                                        | `count` | 3.5.0  |

## 引入文件

```js
import * as React from "react";
import * as PropTypes from "prop-types";
import Animate from "rc-animate";
import omit from "omit.js";
import classNames from "classnames";
import ScrollNumber from "./ScrollNumber";
import { PresetColorTypes } from "../_util/colors";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";

export { ScrollNumberProps } from "./ScrollNumber";
```

### PresetColorTypes

```js
import { tuple } from './type';

// eslint-disable-next-line import/prefer-default-export
// 内置颜色类型
export const PresetColorTypes = tuple(
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
);

export type PresetColorType = (typeof PresetColorTypes)[number];
// 泛类
export const tuple = <T extends string[]>(...args: T) => args;

```

## 接口定义

```js
export interface BadgeProps {
  /** Number to show in badge */
  count?: React.ReactNode;
  showZero?: boolean;
  /** Max count to show */
  overflowCount?: number;
  /** whether to show red dot without number */
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  scrollNumberPrefixCls?: string;
  className?: string;
  status?: "success" | "processing" | "default" | "error" | "warning";
  color?: string;
  text?: React.ReactNode;
  offset?: [number | string, number | string];
  title?: string;
}
```

## 结构

```js
export default class Badge extends React.Component<BadgeProps, any> {
  // 默认值
  static defaultProps = {
    count: null,
    showZero: false,
    dot: false,
    overflowCount: 99
  };

  // props类型定义
  static propTypes = {
    count: PropTypes.node,
    showZero: PropTypes.bool,
    dot: PropTypes.bool,
    overflowCount: PropTypes.number
  };

  // 展示的数字,如果设置了最大值,用overflowCount+表示
  getNumberedDispayCount() {
    const { count, overflowCount } = this.props;
    const displayCount =
      (count as number) > (overflowCount as number) ? `${overflowCount}+` : count;
    return displayCount as string | number | null;
  }
  // 展示的数字,如果是dot,不显示数字,否则显示
  getDispayCount() {
    const isDot = this.isDot();
    // dot mode don't need count
    if (isDot) {
      return '';
    }
    return this.getNumberedDispayCount();
  }
  // 如果有title,显示title,否则显示
  getScrollNumberTitle() {
    const { title, count } = this.props;
    if (title) {
      return title;
    }
    return typeof count === 'string' || typeof count === 'number' ? count : undefined;
  }
  // 获取样式和偏移
  getStyleWithOffset() {
     const { offset, style } = this.props;
    //  right和marginTop
    return offset
      ? {
          right: -parseInt(offset[0] as string, 10),
          marginTop: offset[1],
          ...style,
        }
      : style;
  }

  // 获取badge的classname
  getBadgeClassName(prefixCls: string) {
    const { className, children } = this.props;
    return classNames(className, prefixCls, {
      [`${prefixCls}-status`]: this.hasStatus(),
      [`${prefixCls}-not-a-wrapper`]: !children,
    }) as string;
  }

  // 有状态吗
  hasStatus(): boolean {
    const { status, color } = this.props;
    return !!status || !!color;
  }

  // 是0吗
  isZero() {
    const numberedDispayCount = this.getNumberedDispayCount();
    return numberedDispayCount === '0' || numberedDispayCount === 0;
  }

  // 是dot吗
  isDot() {
     const { dot } = this.props;
    const isZero = this.isZero();
    return (dot && !isZero) || this.hasStatus();
  }

  isHidden() {}

  renderStatusText(prefixCls: string) {}

  renderDispayComponent() {}

  renderBadgeNumber(prefixCls: string, scrollNumberPrefixCls: string) {}

  renderBadge = ({ getPrefixCls }: ConfigConsumerProps) => {};

  render() {
    return <ConfigConsumer>{this.renderBadge}</ConfigConsumer>;
  }
}
```

## 生命周期

```js
renderBadge = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      scrollNumberPrefixCls: customizeScrollNumberPrefixCls,
      children,
      status,
      text,
      color,
      ...restProps
    } = this.props;
    const omitArr = [
      'count',
      'showZero',
      'overflowCount',
      'className',
      'style',
      'dot',
      'offset',
      'title',
    ];

    const prefixCls = getPrefixCls('badge', customizePrefixCls);
    const scrollNumberPrefixCls = getPrefixCls('scroll-number', customizeScrollNumberPrefixCls);
    // 渲染badgeNumber
    const scrollNumber = this.renderBadgeNumber(prefixCls, scrollNumberPrefixCls);
    // 渲染状态文本
    const statusText = this.renderStatusText(prefixCls);

    const statusCls = classNames({
      [`${prefixCls}-status-dot`]: this.hasStatus(),
      [`${prefixCls}-status-${status}`]: !!status,
      [`${prefixCls}-status-${color}`]: isPresetColor(color),
    });
    const statusStyle: React.CSSProperties = {};
    if (color && !isPresetColor(color)) {
      statusStyle.background = color;
    }

    // <Badge status="success" />
    // 如果badge没有子元素,有状态(状态类型或者有颜色)))
    if (!children && this.hasStatus()) {
      const styleWithOffset = this.getStyleWithOffset();
      const statusTextColor = styleWithOffset && styleWithOffset.color;
      return (
        <span
        // 过滤掉omitArr的参数
          {...omit(restProps, omitArr)}
          className={this.getBadgeClassName(prefixCls)}
          style={styleWithOffset}
        >
          <span className={statusCls} style={statusStyle} />
          <span style={{ color: statusTextColor }} className={`${prefixCls}-status-text`}>
            {text}
          </span>
        </span>
      );
    }
    // 没有颜色和状态,有子节点
    return (
      <span {...omit(restProps, omitArr)} className={this.getBadgeClassName(prefixCls)}>
        {children}
        <Animate
          component=""
          showProp="data-show"
          transitionName={children ? `${prefixCls}-zoom` : ''}
          transitionAppear
        >
          {scrollNumber}
        </Animate>
        {statusText}
      </span>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderBadge}</ConfigConsumer>;
  }
```

## 其他函数

```js
  // 是否隐藏
  isHidden() {
    const { showZero } = this.props;
    const displayCount = this.getDispayCount();
    const isZero = this.isZero();
    const isDot = this.isDot();
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
    // 数字是空值,或者是0并不显示0,并且不是点
    return (isEmpty || (isZero && !showZero)) && !isDot;
  }

  renderStatusText(prefixCls: string) {
    const { text } = this.props;
    const hidden = this.isHidden();
    return hidden || !text ? null : <span className={`${prefixCls}-status-text`}>{text}</span>;
  }

  renderDispayComponent() {
    const { count } = this.props;
    const customNode = count as React.ReactElement<any>;
    if (!customNode || typeof customNode !== 'object') {
      return undefined;
    }
    // 克隆count节点,并添加style样式
    return React.cloneElement(customNode, {
      style: {
        ...this.getStyleWithOffset(),
        ...(customNode.props && customNode.props.style),
      },
    });
  }

  renderBadgeNumber(prefixCls: string, scrollNumberPrefixCls: string) {
    const { status, count } = this.props;

    const displayCount = this.getDispayCount();
    const isDot = this.isDot();
    const hidden = this.isHidden();

    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
      [`${prefixCls}-multiple-words`]:
        !isDot && count && count.toString && count.toString().length > 1,
      [`${prefixCls}-status-${status}`]: this.hasStatus(),
    });

    return hidden ? null : (
      <ScrollNumber
        prefixCls={scrollNumberPrefixCls}
        data-show={!hidden}
        className={scrollNumberCls}
        count={displayCount}
        displayComponent={this.renderDispayComponent()} // <Badge status="success" count={<Icon type="xxx" />}></Badge>
        title={this.getScrollNumberTitle()}
        style={this.getStyleWithOffset()}
        key="scrollNumber"
      />
    );
  }
```

## ScrollNumber 引入文件

引入的文件没有什么需要讲的

```js
import * as React from "react";
import omit from "omit.js";
import classNames from "classnames";
import { polyfill } from "react-lifecycles-compat";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
```

## 接口定义

```js
export interface ScrollNumberProps {
  prefixCls?: string;
  className?: string;
  count?: string | number | null;
  displayComponent?: React.ReactElement<HTMLElement>;
  component?: string;
  onAnimated?: Function;
  style?: React.CSSProperties;
  title?: string | number | null;
}

export interface ScrollNumberState {
  animateStarted?: boolean;
  count?: string | number | null;
}
```

## 整体结构

```js

class ScrollNumber extends React.Component<ScrollNumberProps, ScrollNumberState> {
  // 默认值
  static defaultProps = {
    count: null,
    onAnimated() {}, // 动画结束后的回调
  };
  // 传入的props和state
  static getDerivedStateFromProps(nextProps: ScrollNumberProps, nextState: ScrollNumberState) {
  }

  lastCount?: string | number | null;

  constructor(props: ScrollNumberProps) {
    super(props);
    this.state = {
      animateStarted: true,
      count: props.count,
    };
  }

  componentDidUpdate(_: any, prevState: ScrollNumberState) {
  }
  // 获取数字的位置信息
  getPositionByNum(num: number, i: number) {
  }

  onAnimated = () => {
  };

  renderCurrentNumber(prefixCls: string, num: number | string, i: number) {
  }

  renderNumberElement(prefixCls: string) {
  }

  renderScrollNumber = ({ getPrefixCls }: ConfigConsumerProps) => {
  };

  render() {
    return <ConfigConsumer>{this.renderScrollNumber}</ConfigConsumer>;
  }
}
```

## 生命周期

```js
  static getDerivedStateFromProps(nextProps: ScrollNumberProps, nextState: ScrollNumberState) {
    // 如果count存在,
    if ('count' in nextProps) {
      // state的count和props的count相等,返回null
      if (nextState.count === nextProps.count) {
        return null;
      }
      // 否则state的animateStarted为true
      return {
        animateStarted: true,
      };
    }
    return null;
  }


  componentDidUpdate(_: any, prevState: ScrollNumberState) {
    // 最新的count
    this.lastCount = prevState.count;
    const { animateStarted } = this.state;
    if (animateStarted) {
      // eslint-disable-next-line react/no-did-update-set-state
      // 更新完成后,设置animateStarted为false,count为props的count
      this.setState(
        (__, props) => ({
          animateStarted: false,
          count: props.count,
        }),
        this.onAnimated,
      );
    }
  }
  renderNumberElement(prefixCls: string) {
    const { count } = this.state;
    if (count && Number(count) % 1 === 0) {
      // 获取数字的每位数,个位数在前面
      return getNumberArray(count)
        .map((num, i) => this.renderCurrentNumber(prefixCls, num, i))
        .reverse();
    }
    return count;
  }

  renderScrollNumber = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      style,
      title,
      component = 'sup',
      displayComponent,
    } = this.props;
    // fix https://fb.me/react-unknown-prop
    const restProps = omit(this.props, [
      'count',
      'onAnimated',
      'component',
      'prefixCls',
      'displayComponent',
    ]);
    const prefixCls = getPrefixCls('scroll-number', customizePrefixCls);
    const newProps = {
      ...restProps,
      className: classNames(prefixCls, className),
      title: title as string,
    };

    // allow specify the border
    // mock border-color by box-shadow for compatible with old usage:
    // <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />
    if (style && style.borderColor) {
      newProps.style = {
        ...style,
        boxShadow: `0 0 0 1px ${style.borderColor} inset`,
      };
    }
    if (displayComponent) {
      return React.cloneElement(displayComponent, {
        className: classNames(
          `${prefixCls}-custom-component`,
          displayComponent.props && displayComponent.props.className,
        ),
      });
    }
    return React.createElement(component as any, newProps, this.renderNumberElement(prefixCls));
  };

  render() {
    return <ConfigConsumer>{this.renderScrollNumber}</ConfigConsumer>;
  }


function getNumberArray(num: string | number | undefined | null) {
  return num
    ? num
        .toString()
        .split('')
        .reverse()
        .map(i => {
          const current = Number(i);
          return isNaN(current) ? i : current;
        })
    : [];
}

function renderNumberList(position: number) {
  const childrenToReturn: React.ReactElement<any>[] = [];
  for (let i = 0; i < 30; i++) {
    const currentClassName = position === i ? 'current' : '';
    childrenToReturn.push(
      <p key={i.toString()} className={currentClassName}>
        {i % 10}
      </p>,
    );
  }

  return childrenToReturn;
}

  renderCurrentNumber(prefixCls: string, num: number | string, i: number) {
    if (typeof num === 'number') {
      // 获取位置信息,每次加10或者20
      const position = this.getPositionByNum(num, i);
      const removeTransition =
        this.state.animateStarted || getNumberArray(this.lastCount)[i] === undefined;
      return React.createElement(
        'span',
        {
          className: `${prefixCls}-only`,
          style: {
            transition: removeTransition ? 'none' : undefined,
            msTransform: `translateY(${-position * 100}%)`,
            WebkitTransform: `translateY(${-position * 100}%)`,
            transform: `translateY(${-position * 100}%)`,
          },
          key: i,
        },
        renderNumberList(position),
      );
    }

    return (
      <span key="symbol" className={`${prefixCls}-symbol`}>
        {num}
      </span>
    );
  }

  getPositionByNum(num: number, i: number) {
    const { count } = this.state;
    // Math.abs取绝对值
    const currentCount = Math.abs(Number(count));
    const lastCount = Math.abs(Number(this.lastCount));
    const currentDigit = Math.abs(getNumberArray(this.state.count)[i] as number);
    const lastDigit = Math.abs(getNumberArray(this.lastCount)[i] as number);

    if (this.state.animateStarted) {
      return 10 + num;
    }

    // 同方向则在同一侧切换数字
    if (currentCount > lastCount) {
      if (currentDigit >= lastDigit) {
        return 10 + num;
      }
      return 20 + num;
    }
    if (currentDigit <= lastDigit) {
      return 10 + num;
    }
    return num;
  }

```
