---
category: Components
subtitle: 描述列表
type: 数据展示
title: Descriptions
cols: 1
---

成组展示多个只读字段。

## 何时使用

常见于详情页的信息展示。

## API

### Descriptions

| 参数     | 说明                                                                                            | 类型                       | 默认值       | 版本   |
| -------- | ----------------------------------------------------------------------------------------------- | -------------------------- | ------------ | ------ |
| title    | 描述列表的标题，显示在最顶部                                                                    | ReactNode                  | -            | 3.19.0 |
| bordered | 是否展示边框                                                                                    | boolean                    | false        | 3.19.0 |
| column   | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number                     | 3            | 3.19.0 |
| size     | 设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效）        | `default | middle | small` | false        | 3.19.0 |
| layout   | 描述布局                                                                                        | `horizontal | vertical`    | `horizontal` | 3.19.8 |
| colon    | 配置 `Descriptions.Item` 的 `colon` 的默认值                                                    | boolean                    | true         | 3.21.0 |

### DescriptionItem

| 参数  | 说明         | 类型      | 默认值 | 版本   |
| ----- | ------------ | --------- | ------ | ------ |
| label | 内容的描述   | ReactNode | -      | 3.19.0 |
| span  | 包含列的数量 | number    | 1      | 3.19.0 |

> span Description.Item 的数量。 span={2} 会占用两个 DescriptionItem 的宽度。

## 结构

```js
import * as React from 'react';
import classNames from 'classnames';
import warning from '../_util/warning';
import ResponsiveObserve, {
  Breakpoint,
  BreakpointMap,
  responsiveArray,
} from '../_util/responsiveObserve'; // 响应式布局
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Col from './Col';

export interface DescriptionsItemProps {
  prefixCls?: string;
  className?: string;
  label?: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}

const DescriptionsItem: React.SFC<DescriptionsItemProps> = ({ children }) =>
  children as JSX.Element;

export interface DescriptionsProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  bordered?: boolean;
  size?: 'middle' | 'small' | 'default';
  children?: React.ReactNode;
  title?: React.ReactNode;
  column?: number | Partial<Record<Breakpoint, number>>;
  layout?: 'horizontal' | 'vertical';
  colon?: boolean;
}

/**
 * Convert children into `column` groups.
 * @param cloneChildren: DescriptionsItem
 * @param column: number
 */
const generateChildrenRows = (
  cloneChildren: React.ReactNode,
  column: number,
): React.ReactElement<DescriptionsItemProps>[][] => {
  const childrenArray: React.ReactElement<DescriptionsItemProps>[][] = [];
  let columnArray: React.ReactElement<DescriptionsItemProps>[] = [];
  let totalRowSpan = 0;
  React.Children.forEach(cloneChildren, (node: React.ReactElement<DescriptionsItemProps>) => {
    columnArray.push(node);
    if (node.props.span) {
      totalRowSpan += node.props.span;
    } else {
      totalRowSpan += 1;
    }
    if (totalRowSpan >= column) {
      warning(
        totalRowSpan <= column,
        'Descriptions',
        'Sum of column `span` in a line exceeds `column` of Descriptions.',
      );

      childrenArray.push(columnArray);
      columnArray = [];
      totalRowSpan = 0;
    }
  });
  if (columnArray.length > 0) {
    childrenArray.push(columnArray);
    columnArray = [];
  }
  return childrenArray;
};

const renderRow = (
  children: React.ReactElement<DescriptionsItemProps>[],
  index: number,
  { prefixCls, column, isLast }: { prefixCls: string; column: number; isLast: boolean },
  bordered: boolean,
  layout: 'horizontal' | 'vertical',
  colon: boolean,
) => {
  // copy children,prevent changes to incoming parameters
  const childrenArray = [...children];
  let lastChildren = childrenArray.pop() as React.ReactElement<DescriptionsItemProps>;
  const span = column - childrenArray.length;
  if (isLast) {
    lastChildren = React.cloneElement(lastChildren as React.ReactElement<DescriptionsItemProps>, {
      span,
    });
  }
  childrenArray.push(lastChildren);

  const renderCol = (
    childrenItem: React.ReactElement<DescriptionsItemProps>,
    type: 'label' | 'content',
    idx: number,
  ) => (
    <Col
      child={childrenItem}
      bordered={bordered}
      colon={colon}
      type={type}
      key={`${type}-${idx}`}
      layout={layout}
    />
  );

  const cloneChildren: JSX.Element[] = [];
  const cloneContentChildren: JSX.Element[] = [];
  React.Children.forEach(
    childrenArray,
    (childrenItem: React.ReactElement<DescriptionsItemProps>, idx: number) => {
      cloneChildren.push(renderCol(childrenItem, 'label', idx));
      if (layout === 'vertical') {
        cloneContentChildren.push(renderCol(childrenItem, 'content', idx));
      } else if (bordered) {
        cloneChildren.push(renderCol(childrenItem, 'content', idx));
      }
    },
  );

  if (layout === 'vertical') {
    return [
      <tr className={`${prefixCls}-row`} key={`label-${index}`}>
        {cloneChildren}
      </tr>,
      <tr className={`${prefixCls}-row`} key={`content-${index}`}>
        {cloneContentChildren}
      </tr>,
    ];
  }

  return (
    <tr className={`${prefixCls}-row`} key={index}>
      {cloneChildren}
    </tr>
  );
};

const defaultColumnMap = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1,
};

class Descriptions extends React.Component<
  DescriptionsProps,
  {
    screens: BreakpointMap;
  }
> {
  static defaultProps: DescriptionsProps = {
    size: 'default',
    column: defaultColumnMap,
  };

  static Item: typeof DescriptionsItem = DescriptionsItem;

  state: {
    screens: BreakpointMap;
  } = {
    screens: {},
  };

  token: string;

  componentDidMount() {
    const { column } = this.props;
    // 发布一个token,并注册回调
    this.token = ResponsiveObserve.subscribe(screens => {
      if (typeof column !== 'object') {
        return;
      }
      this.setState({
        screens,
      });
    });
  }
  // 注销
  componentWillUnmount() {
    ResponsiveObserve.unsubscribe(this.token);
  }

  getColumn(): number {
    const { column } = this.props;
    if (typeof column === 'object') {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        if (this.state.screens[breakpoint] && column[breakpoint] !== undefined) {
          return column[breakpoint] || defaultColumnMap[breakpoint];
        }
      }
    }
    // If the configuration is not an object, it is a number, return number
    if (typeof column === 'number') {
      return column as number;
    }
    // If it is an object, but no response is found, this happens only in the test.
    // Maybe there are some strange environments
    return 3;
  }

  render() {
    return (
      <ConfigConsumer>
        {({ getPrefixCls }: ConfigConsumerProps) => {
          const {
            className,
            prefixCls: customizePrefixCls,
            title,
            size,
            children,
            bordered = false,
            layout = 'horizontal',
            colon = true,
            style,
          } = this.props;
          const prefixCls = getPrefixCls('descriptions', customizePrefixCls);

          const column = this.getColumn();
          const cloneChildren = React.Children.map(
            children,
            (child: React.ReactElement<DescriptionsItemProps>) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  prefixCls,
                });
              }
              return child;
            },
          );

          const childrenArray: Array<
            React.ReactElement<DescriptionsItemProps>[]
          > = generateChildrenRows(cloneChildren, column);
          return (
            <div
              className={classNames(prefixCls, className, {
                [`${prefixCls}-${size}`]: size !== 'default',
                [`${prefixCls}-bordered`]: !!bordered,
              })}
              style={style}
            >
              {title && <div className={`${prefixCls}-title`}>{title}</div>}
              <div className={`${prefixCls}-view`}>
                <table>
                  <tbody>
                    {childrenArray.map((child, index) =>
                      renderRow(
                        child,
                        index,
                        {
                          prefixCls,
                          column,
                          isLast: index + 1 === childrenArray.length,
                        },
                        bordered,
                        layout,
                        colon,
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}

export default Descriptions;

```

### responsiveObserve

```js
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
let enquire: any;

if (typeof window !== "undefined") {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {}
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  // eslint-disable-next-line global-require
  enquire = require("enquire.js");
}

export type Breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
export type BreakpointMap = Partial<Record<Breakpoint, string>>;

export const responsiveArray: Breakpoint[] = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
];

export const responsiveMap: BreakpointMap = {
  xs: "(max-width: 575px)",
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1600px)"
};

type SubscribeFunc = (screens: BreakpointMap) => void;

let subscribers: Array<{
  token: string,
  func: SubscribeFunc
}> = [];
let subUid = -1;
let screens = {};

const responsiveObserve = {
  dispatch(pointMap: BreakpointMap) {
    screens = pointMap;
    if (subscribers.length < 1) {
      return false;
    }

    subscribers.forEach(item => {
      item.func(screens);
    });

    return true;
  },
  subscribe(func: SubscribeFunc) {
    if (subscribers.length === 0) {
      this.register();
    }
    const token = (++subUid).toString();
    subscribers.push({
      token,
      func
    });
    func(screens);
    return token;
  },
  unsubscribe(token: string) {
    subscribers = subscribers.filter(item => item.token !== token);
    if (subscribers.length === 0) {
      this.unregister();
    }
  },
  unregister() {
    Object.keys(responsiveMap).map((screen: Breakpoint) =>
      enquire.unregister(responsiveMap[screen])
    );
  },
  register() {
    Object.keys(responsiveMap).map((screen: Breakpoint) =>
      enquire.register(responsiveMap[screen], {
        match: () => {
          const pointMap = {
            ...screens,
            [screen]: true
          };
          this.dispatch(pointMap);
        },
        unmatch: () => {
          const pointMap = {
            ...screens,
            [screen]: false
          };
          this.dispatch(pointMap);
        },
        // Keep a empty destory to avoid triggering unmatch when unregister
        destroy() {}
      })
    );
  }
};

export default responsiveObserve;
```
