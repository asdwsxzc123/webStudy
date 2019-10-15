---
category: Components
type: 数据展示
title: Card
subtitle: 卡片
cols: 1
---

通用卡片容器。

## 何时使用

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## API

```html
<Card title="卡片标题">卡片内容</Card>
```

### Card

| 参数                | 说明                                                | 类型                                    | 默认值     | 版本   |
| ------------------- | --------------------------------------------------- | --------------------------------------- | ---------- | ------ |
| actions             | 卡片操作组，位置在卡片底部                          | Array&lt;ReactNode>                     | -          |        |
| activeTabKey        | 当前激活页签的 key                                  | string                                  | -          | 3.3.0  |
| headStyle           | 自定义标题区域样式                                  | object                                  | -          | 3.8.0  |
| bodyStyle           | 内容区域自定义样式                                  | object                                  | -          |        |
| bordered            | 是否有边框                                          | boolean                                 | true       |        |
| cover               | 卡片封面                                            | ReactNode                               | -          |        |
| defaultActiveTabKey | 初始化选中页签的 key，如果没有设置 activeTabKey     | string                                  | 第一个页签 | 3.3.0  |
| extra               | 卡片右上角的操作区域                                | string\|ReactNode                       | -          |        |
| hoverable           | 鼠标移过时可浮起                                    | boolean                                 | false      |        |
| loading             | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean                                 | false      |        |
| tabList             | 页签标题列表                                        | Array&lt;{key: string, tab: ReactNode}> | -          |        |
| size                | card 的尺寸                                         | `default` \| `small`                    | `default`  | 3.12.0 |
| title               | 卡片标题                                            | string\|ReactNode                       | -          |        |
| type                | 卡片类型，可设置为 `inner` 或 不设置                | string                                  | -          |        |
| onTabChange         | 页签切换的回调                                      | (key) => void                           | -          |        |

### Card.Grid

| 参数      | 说明                   | 类型   | 默认值 | 版本 |
| --------- | ---------------------- | ------ | ------ | ---- |
| className | 网格容器类名           | string | -      |      |
| style     | 定义网格容器类名的样式 | object | -      |      |

### Card.Meta

| 参数        | 说明               | 类型      | 默认值 | 版本 |
| ----------- | ------------------ | --------- | ------ | ---- |
| avatar      | 头像/图标          | ReactNode | -      |      |
| className   | 容器类名           | string    | -      |      |
| description | 描述内容           | ReactNode | -      |      |
| style       | 定义容器类名的样式 | object    | -      |      |
| title       | 标题内容           | ReactNode | -      |      |

## 引入文件

```js
import * as React from "react";
import classNames from "classnames";
import omit from "omit.js";
import Grid from "./Grid"; // 当前Grid格式
import Meta from "./Meta"; // 当前meta格式
import Tabs from "../tabs"; // 分页组件
import Row from "../row"; // row组件
import Col from "../col"; // col组件
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
import warning from "../_util/warning";
import { Omit } from "../_util/type";
```

## 接口

```js
export type CardType = "inner";
export type CardSize = "default" | "small";

export interface CardTabListType {
  key: string;
  tab: React.ReactNode;
  disabled?: boolean;
}

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  prefixCls?: string;
  title?: React.ReactNode; // 标题
  extra?: React.ReactNode; // 卡片右上角的操作区域
  bordered?: boolean; // 是否有边框
  headStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  loading?: boolean;
  noHovering?: boolean; // 鼠标移过时可浮起
  hoverable?: boolean; // 鼠标移过时可浮起
  children?: React.ReactNode;
  id?: string;
  className?: string;
  size?: CardSize;
  type?: CardType;
  cover?: React.ReactNode; // 卡片封面
  actions?: React.ReactNode[]; // 卡片操作组，位置在卡片底部
  tabList?: CardTabListType[];
  onTabChange?: (key: string) => void;
  activeTabKey?: string;
  defaultActiveTabKey?: string;
}
```

## 结构

```js
export default class Card extends React.Component<CardProps, {}> {
  static Grid: typeof Grid = Grid;

  static Meta: typeof Meta = Meta;

  componentDidMount() {}

  // For 2.x compatible
  getCompatibleHoverable() {}
  // tabChange
  onTabChange = (key: string) => {};
  // 判断是否为grid容器
  isContainGrid() {}
  // 渲染
  renderCard = ({ getPrefixCls }: ConfigConsumerProps) => {};

  render() {
    return <ConfigConsumer>{this.renderCard}</ConfigConsumer>;
  }
}
```

## 生命周期

```js

  componentDidMount() {
    if ('noHovering' in this.props) {
      warning(
        !this.props.noHovering,
        'Card',
        '`noHovering` is deprecated, you can remove it safely or use `hoverable` instead.',
      );
      warning(
        !!this.props.noHovering,
        'Card',
        '`noHovering={false}` is deprecated, use `hoverable` instead.',
      );
    }
  }

  renderCard = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      extra,
      headStyle = {},
      bodyStyle = {},
      title,
      loading,
      bordered = true,
      size = 'default', // 默认值写在size这里,没有使用defaultProps
      type,
      cover,
      actions,
      tabList,
      children,
      activeTabKey,
      defaultActiveTabKey,
      ...others
    } = this.props;

    const prefixCls = getPrefixCls('card', customizePrefixCls);
    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-hoverable`]: this.getCompatibleHoverable(),
      [`${prefixCls}-contain-grid`]: this.isContainGrid(),
      [`${prefixCls}-contain-tabs`]: tabList && tabList.length,
      [`${prefixCls}-${size}`]: size !== 'default',
      [`${prefixCls}-type-${type}`]: !!type,
    });

    const loadingBlockStyle =
      bodyStyle.padding === 0 || bodyStyle.padding === '0px' ? { padding: 24 } : undefined;

    const loadingBlock = (
      <div className={`${prefixCls}-loading-content`} style={loadingBlockStyle}>
        <Row gutter={8}>
          <Col span={22}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={15}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={6}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={18}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={13}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={9}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={3}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={16}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
        </Row>
      </div>
    );
    // activeTabKey选中的key
    const hasActiveTabKey = activeTabKey !== undefined;
    const extraProps = {
      [hasActiveTabKey ? 'activeKey' : 'defaultActiveKey']: hasActiveTabKey
        ? activeTabKey
        : defaultActiveTabKey,
    };

    let head;
    const tabs =
      tabList && tabList.length ? (
        <Tabs
          {...extraProps}
          className={`${prefixCls}-head-tabs`}
          size="large"
          onChange={this.onTabChange}
        >
          {tabList.map(item => (
            <Tabs.TabPane tab={item.tab} disabled={item.disabled} key={item.key} />
          ))}
        </Tabs>
      ) : null;
      // title,extra,tabs部分
    if (title || extra || tabs) {
      head = (
        <div className={`${prefixCls}-head`} style={headStyle}>
          <div className={`${prefixCls}-head-wrapper`}>
            {title && <div className={`${prefixCls}-head-title`}>{title}</div>}
            {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
          </div>
          {tabs}
        </div>
      );
    }
    // coverDom
    const coverDom = cover ? <div className={`${prefixCls}-cover`}>{cover}</div> : null;
    const body = (
      <div className={`${prefixCls}-body`} style={bodyStyle}>
        {loading ? loadingBlock : children}
      </div>
    );
    // actionDom
    const actionDom =
      actions && actions.length ? (
        <ul className={`${prefixCls}-actions`}>{getAction(actions)}</ul>
      ) : null;
    const divProps = omit(others, ['onTabChange', 'noHovering', 'hoverable']);
    return (
      <div {...divProps} className={classString}>
        {head}
        {coverDom}
        {body}
        {actionDom}
      </div>
    );
  };
// 按钮的render
function getAction(actions: React.ReactNode[]) {
  const actionList = actions.map((action, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
      <span>{action}</span>
    </li>
  ));
  return actionList;
}
// For 2.x compatible
//  判断是否有hover,改版过,兼容2.x,所以继续判断了noHovering
  getCompatibleHoverable() {
    const { noHovering, hoverable } = this.props;
    if ('noHovering' in this.props) {
      return !noHovering || hoverable;
    }
    return !!hoverable;
  }
  // tabChange事件
  onTabChange = (key: string) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
    }
  };
  // 是否有grid容器
  isContainGrid() {
    let containGrid;
    React.Children.forEach(this.props.children, (element: JSX.Element) => {
      if (element && element.type && element.type === Grid) {
        containGrid = true;
      }
    });
    return containGrid;
  }
```

## Meta

```js
import * as React from "react";
import classNames from "classnames";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";

export interface CardMetaProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

const Meta: React.SFC<CardMetaProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls: customizePrefixCls,
        className,
        avatar,
        title,
        description,
        ...others
      } = props;
      const prefixCls = getPrefixCls("card", customizePrefixCls);
      const classString = classNames(`${prefixCls}-meta`, className);
      // avatarDom ,reactNode节点,直接渲染,一般去调用了Avatar组件渲染
      const avatarDom = avatar ? (
        <div className={`${prefixCls}-meta-avatar`}>{avatar}</div>
      ) : null;
      // 标题
      const titleDom = title ? (
        <div className={`${prefixCls}-meta-title`}>{title}</div>
      ) : null;
      // 详情描述
      const descriptionDom = description ? (
        <div className={`${prefixCls}-meta-description`}>{description}</div>
      ) : null;
      // 必须要有title或者description才显示详情
      const MetaDetail =
        titleDom || descriptionDom ? (
          <div className={`${prefixCls}-meta-detail`}>
            {titleDom}
            {descriptionDom}
          </div>
        ) : null;
      return (
        <div {...others} className={classString}>
          {avatarDom}
          {MetaDetail}
        </div>
      );
    }}
  </ConfigConsumer>
);

export default Meta;
```

## Grid

```js
import * as React from "react";
import classNames from "classnames";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";

export interface CardGridProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
}

const Grid: React.SFC<CardGridProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, className, ...others } = props;
      const prefixCls = getPrefixCls("card", customizePrefixCls);
      const classString = classNames(`${prefixCls}-grid`, className);
      // 直接在props显示子节点,只是调用了类名
      return <div {...others} className={classString} />;
    }}
  </ConfigConsumer>
);

export default Grid;
```
