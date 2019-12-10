---
category: Components
type: 数据展示
title: List
subtitle: 列表
cols: 1
---

通用列表。

## 何时使用

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## API

### List

| 参数       | 说明                                                              | 类型                                                                                                                         | 默认值                | 版本   |
| ---------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------ |
| bordered   | 是否展示边框                                                      | boolean                                                                                                                      | false                 |        |
| footer     | 列表底部                                                          | string\|ReactNode                                                                                                            | -                     |        |
| grid       | 列表栅格配置                                                      | object                                                                                                                       | -                     |        |
| header     | 列表头部                                                          | string\|ReactNode                                                                                                            | -                     |        |
| itemLayout | 设置 `List.Item` 布局, 设置成 `vertical` 则竖直样式显示, 默认横排 | string                                                                                                                       | -                     |        |
| loading    | 当卡片内容还在加载中时，可以用 `loading` 展示一个占位             | boolean\|[object](https://ant.design/components/spin-cn/#API) ([更多](https://github.com/ant-design/ant-design/issues/8659)) | false                 |        |
| loadMore   | 加载更多                                                          | string\|ReactNode                                                                                                            | -                     |        |
| locale     | 默认文案设置，目前包括空数据文案                                  | object                                                                                                                       | emptyText: '暂无数据' | 3.4.2  |
| pagination | 对应的 `pagination` 配置, 设置 `false` 不显示                     | boolean\|object                                                                                                              | false                 |        |
| size       | list 的尺寸                                                       | `default` \| `middle` \| `small`                                                                                             | `default`             |        |
| split      | 是否展示分割线                                                    | boolean                                                                                                                      | true                  |        |
| dataSource | 列表数据源                                                        | any[]                                                                                                                        | -                     | 3.20.1 |
| renderItem | 当使用 dataSource 时，可以用 `renderItem` 自定义渲染列表项        | `item => ReactNode`                                                                                                          | -                     | 3.20.1 |

### pagination

分页的配置项。

| 参数     | 说明               | 类型                        | 默认值   |
| -------- | ------------------ | --------------------------- | -------- |
| position | 指定分页显示的位置 | 'top' \| 'bottom' \| 'both' | 'bottom' | 3.6.0 |

更多配置项，请查看 [`Pagination`](/components/pagination/)。

### List grid props

| 参数   | 说明                                                                                                                                 | 类型   | 默认值 | 版本 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------ | ---- |
| column | 列数，[可选值](https://github.com/ant-design/ant-design/blob/a7f17b4cdebbca07b3b9ce5698de61e772d46237/components/list/index.tsx#L16) | number | -      |      |
| gutter | 栅格间隔                                                                                                                             | number | 0      |      |
| xs     | `<576px` 展示的列数                                                                                                                  | number | -      |      |
| sm     | `≥576px` 展示的列数                                                                                                                  | number | -      |      |
| md     | `≥768px` 展示的列数                                                                                                                  | number | -      |      |
| lg     | `≥992px` 展示的列数                                                                                                                  | number | -      |      |
| xl     | `≥1200px` 展示的列数                                                                                                                 | number | -      |      |
| xxl    | `≥1600px` 展示的列数                                                                                                                 | number | -      |      |

### List.Item

| 参数    | 说明                                                                                                    | 类型                | 默认值 | 版本 |
| ------- | ------------------------------------------------------------------------------------------------------- | ------------------- | ------ | ---- |
| actions | 列表操作组，根据 `itemLayout` 的不同, 位置在卡片底部或者最右侧                                          | Array&lt;ReactNode> | -      |      |
| extra   | 额外内容, 通常用在 `itemLayout` 为 `vertical` 的情况下, 展示右侧内容; `horizontal` 展示在列表元素最右侧 | string\|ReactNode   | -      |      |

### List.Item.Meta

| 参数        | 说明               | 类型              | 默认值 | 版本 |
| ----------- | ------------------ | ----------------- | ------ | ---- |
| avatar      | 列表元素的图标     | ReactNode         | -      |      |
| description | 列表元素的描述内容 | string\|ReactNode | -      |      |
| title       | 列表元素的标题     | string\|ReactNode | -      |      |

## List

```js
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import Spin, { SpinProps } from '../spin'; // spin加载状态优化
import {
  ConfigConsumer,
  ConfigConsumerProps,
  RenderEmptyHandler
} from '../config-provider';

import Pagination, { PaginationConfig } from '../pagination';
import { Row } from '../grid';

import Item from './Item';

export { ListItemProps, ListItemMetaProps } from './Item';

export type ColumnCount = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;

export type ColumnType =
  | 'gutter'
  | 'column'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl';

export interface ListGridType {
  gutter?: number;
  column?: ColumnCount;
  xs?: ColumnCount;
  sm?: ColumnCount;
  md?: ColumnCount;
  lg?: ColumnCount;
  xl?: ColumnCount;
  xxl?: ColumnCount;
}

export type ListSize = 'small' | 'default' | 'large';

export type ListItemLayout = 'horizontal' | 'vertical';

export interface ListProps<T> {
  bordered?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  dataSource?: T[];
  extra?: React.ReactNode;
  grid?: ListGridType;
  id?: string;
  itemLayout?: ListItemLayout;
  loading?: boolean | SpinProps;
  loadMore?: React.ReactNode;
  pagination?: PaginationConfig | false;
  prefixCls?: string;
  rowKey?: ((item: T) => string) | string;
  renderItem?: (item: T, index: number) => React.ReactNode;
  size?: ListSize;
  split?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  locale?: ListLocale;
}

export interface ListLocale {
  emptyText: React.ReactNode | (() => React.ReactNode);
}

interface ListState {
  paginationCurrent: number;
  paginationSize: number;
}
```
