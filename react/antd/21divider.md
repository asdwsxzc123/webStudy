---
category: Components
type: 其他
title: Divider
subtitle: 分割线
---

区隔内容的分割线。

## 何时使用

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## API

| 参数        | 说明             | 类型                          | 默认值       | 版本  |
| ----------- | ---------------- | ----------------------------- | ------------ | ----- |
| className   | 分割线样式类     | string                        | -            | 3.5.4 |
| dashed      | 是否虚线         | boolean                       | false        |       |
| orientation | 分割线标题的位置 | enum: `left` `right`          | `center`     | 3.4.1 |
| style       | 分割线样式对象   | object                        | -            | 3.5.4 |
| type        | 水平还是垂直类型 | enum: `horizontal` `vertical` | `horizontal` |       |

## 结构

```js
import * as React from "react";
import classNames from "classnames";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";

export interface DividerProps {
  prefixCls?: string;
  type?: "horizontal" | "vertical";
  orientation?: "left" | "right" | "center";
  className?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  style?: React.CSSProperties;
}

const Divider: React.SFC<DividerProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls: customizePrefixCls,
        type = "horizontal",
        orientation = "center",
        className,
        children,
        dashed,
        ...restProps
      } = props;
      const prefixCls = getPrefixCls("divider", customizePrefixCls);
      const orientationPrefix =
        orientation.length > 0 ? `-${orientation}` : orientation;
      const classString = classNames(
        className,
        prefixCls,
        `${prefixCls}-${type}`,
        {
          [`${prefixCls}-with-text${orientationPrefix}`]: children,
          [`${prefixCls}-dashed`]: !!dashed
        }
      );
      return (
        <div className={classString} {...restProps} role="separator">
          {children && (
            <span className={`${prefixCls}-inner-text`}>{children}</span>
          )}
        </div>
      );
    }}
  </ConfigConsumer>
);

export default Divider;
```
