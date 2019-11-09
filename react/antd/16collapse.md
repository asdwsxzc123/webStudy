---
category: Components
type: 数据展示
title: Collapse
subtitle: 折叠面板
cols: 1
---

可以折叠/展开的内容区域。

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。

## API

### Collapse

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| activeKey | 当前激活 tab 面板的 key | string\[]\|string\| number\[]\|number | 默认无，accordion 模式下默认第一个元素 |  |
| defaultActiveKey | 初始化选中面板的 key | string\[]\|string\| number\[]\|number | 无 |  |
| bordered | 带边框风格的折叠面板 | boolean | `true` | 3.13.0 |
| accordion | 手风琴模式 | boolean | `false` | 3.13.0 |
| onChange | 切换面板的回调 | Function | 无 |  |
| expandIcon | 自定义切换图标 | (panelProps) => ReactNode | - | 3.13.0 |
| expandIconPosition | 设置图标位置： `left`, `right` | `left` | - | 3.17.0 |
| destroyInactivePanel | 销毁折叠隐藏的面板 | boolean | `false` | 3.13.0 |

### Collapse.Panel

| 参数        | 说明                                       | 类型              | 默认值 | 版本   |
| ----------- | ------------------------------------------ | ----------------- | ------ | ------ |
| disabled    | 禁用后的面板展开与否将无法通过用户交互改变 | boolean           | false  |        |
| forceRender | 被隐藏时是否渲染 DOM 结构                  | boolean           | false  | 3.2.0  |
| header      | 面板头内容                                 | string\|ReactNode | 无     |        |
| key         | 对应 activeKey                             | string\|number    | 无     |        |
| showArrow   | 是否展示当前面板上的箭头                   | boolean           | `true` | 3.13.0 |
| extra       | 自定义渲染每个面板右上角的内容             | ReactNode         | -      | 3.14.0 |

## 引入文件
```js
import * as React from 'react';
import RcCollapse from 'rc-collapse'; // rc组件
import classNames from 'classnames';
import CollapsePanel from './CollapsePanel'; // 内容部分
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import animation from '../_util/openAnimation';

```

## 声明接口
```js

export type ExpandIconPosition = 'left' | 'right';

export interface CollapseProps {
  activeKey?: Array<string | number> | string | number;
  defaultActiveKey?: Array<string | number> | string | number;
  /** 手风琴效果 */
  accordion?: boolean;
  destroyInactivePanel?: boolean;
  onChange?: (key: string | string[]) => void;
  style?: React.CSSProperties;
  className?: string;
  bordered?: boolean;
  prefixCls?: string;
  expandIcon?: (panelProps: PanelProps) => React.ReactNode;
  expandIconPosition?: ExpandIconPosition;
}

interface PanelProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  disabled?: boolean;
  extra?: React.ReactNode;
}
```

## 结构
```js

export default class Collapse extends React.Component<CollapseProps, any> {
  static Panel = CollapsePanel;

  static defaultProps = {
    bordered: true,
    openAnimation: { ...animation, appear() {} }, // 动画
    expandIconPosition: 'left',
  };

  renderExpandIcon = (panelProps: PanelProps = {}, prefixCls: string) => {
    const { expandIcon } = this.props;
    const icon = (expandIcon ? (
      expandIcon(panelProps)
    ) : (
        // 如果是isactive,旋转90度
      <Icon type="right" rotate={panelProps.isActive ? 90 : undefined} />
    )) as React.ReactNode;

    // 代码健壮性，判断是否不是React组件的，如果不是react组件
    return React.isValidElement(icon)
      ? React.cloneElement(icon as any, {
          className: classNames(icon.props.className, `${prefixCls}-arrow`),
        })
      : icon;
  };

  renderCollapse = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className = '',
      bordered,
      expandIconPosition,
    } = this.props;
    const prefixCls = getPrefixCls('collapse', customizePrefixCls);
    const collapseClassName = classNames(
      {
        [`${prefixCls}-borderless`]: !bordered,
        [`${prefixCls}-icon-position-${expandIconPosition}`]: true,
      },
      className,
    );
    return (
      <RcCollapse
        {...this.props}
        expandIcon={(panelProps: PanelProps) => this.renderExpandIcon(panelProps, prefixCls)}
        prefixCls={prefixCls}
        className={collapseClassName}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCollapse}</ConfigConsumer>;
  }
}
```

## collapsePanel
```js
import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface CollapsePanelProps {
  key: string | number;
  header: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean; // 先生
  prefixCls?: string;
  forceRender?: boolean;
  id?: string;
  extra?: React.ReactNode;
}

export default class CollapsePanel extends React.Component<CollapsePanelProps, {}> {
  renderCollapsePanel = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className = '', showArrow = true } = this.props;
    const prefixCls = getPrefixCls('collapse', customizePrefixCls);
    const collapsePanelClassName = classNames(
      {
        [`${prefixCls}-no-arrow`]: !showArrow,
      },
      className,
    );
    return (
      <RcCollapse.Panel {...this.props} prefixCls={prefixCls} className={collapsePanelClassName} />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCollapsePanel}</ConfigConsumer>;
  }
}

```