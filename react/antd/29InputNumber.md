---
category: Components
subtitle: 数字输入框
type: 数据录入
title: InputNumber
---

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。

## API

属性如下

| 成员             | 说明                                                       | 类型                                      | 默认值    | 版本   |
| ---------------- | ---------------------------------------------------------- | ----------------------------------------- | --------- | ------ |
| autoFocus        | 自动获取焦点                                               | boolean                                   | false     |        |
| defaultValue     | 初始值                                                     | number                                    |           |        |
| disabled         | 禁用                                                       | boolean                                   | false     |        |
| formatter        | 指定输入框展示值的格式                                     | function(value: number \| string): string | -         |        |
| max              | 最大值                                                     | number                                    | Infinity  |        |
| min              | 最小值                                                     | number                                    | -Infinity |        |
| parser           | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | function( string): number                 | -         |        |
| precision        | 数值精度                                                   | number                                    | -         |        |
| decimalSeparator | 小数点                                                     | string                                    | -         | 3.10.0 |
| size             | 输入框大小                                                 | string                                    | 无        |        |
| step             | 每次改变步数，可以为小数                                   | number\|string                            | 1         |        |
| value            | 当前值                                                     | number                                    |           |        |
| onChange         | 变化回调                                                   | Function(value: number \| string)         |           |        |

## 方法

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

## 结构

```js
import * as React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { Omit } from '../_util/type';

// omitting this attrs because they conflicts with the ones defined in InputNumberProps
export type OmitAttrs = 'defaultValue' | 'onChange' | 'size';

export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, OmitAttrs> {
  prefixCls?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number | string;
  defaultValue?: number;
  tabIndex?: number;
  onChange?: (value: number | undefined) => void;
  disabled?: boolean;
  size?: 'large' | 'small' | 'default';
  formatter?: (value: number | string | undefined) => string;
  parser?: (displayValue: string | undefined) => number | string;
  decimalSeparator?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  id?: string;
  precision?: number;
}

export default class InputNumber extends React.Component<InputNumberProps, any> {
  static defaultProps = {
    step: 1,
  };

  private inputNumberRef: any;

  saveInputNumber = (inputNumberRef: any) => {
    this.inputNumberRef = inputNumberRef;
  };

  focus() {
    this.inputNumberRef.focus();
  }

  blur() {
    this.inputNumberRef.blur();
  }

  renderInputNumber = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { className, size, prefixCls: customizePrefixCls, ...others } = this.props;
    const prefixCls = getPrefixCls('input-number', customizePrefixCls);
    const inputNumberClass = classNames(
      {
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
      },
      className,
    );
    const upIcon = <Icon type="up" className={`${prefixCls}-handler-up-inner`} />;
    const downIcon = <Icon type="down" className={`${prefixCls}-handler-down-inner`} />;

    return (
      <RcInputNumber
        ref={this.saveInputNumber}
        className={inputNumberClass}
        upHandler={upIcon}
        downHandler={downIcon}
        prefixCls={prefixCls}
        {...others}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderInputNumber}</ConfigConsumer>;
  }
}

```
