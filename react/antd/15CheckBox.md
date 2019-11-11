---
category: Components
subtitle: 多选框
type: 数据录入
title: Checkbox
---

多选框。

## 何时使用

- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## API

### 属性

#### Checkbox

| 参数           | 说明                                    | 类型              | 默认值 | 版本  |
| -------------- | --------------------------------------- | ----------------- | ------ | ----- |
| autoFocus      | 自动获取焦点                            | boolean           | false  | 3.6.2 |
| checked        | 指定当前是否选中                        | boolean           | false  | 3.6.2 |
| defaultChecked | 初始是否选中                            | boolean           | false  | 3.6.2 |
| disabled       | 失效状态                                | boolean           | false  | 3.6.2 |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制 | boolean           | false  | 3.6.2 |
| onChange       | 变化时回调函数                          | Function(e:Event) | -      | 3.6.2 |

#### Checkbox Group

| 参数         | 说明                                                         | 类型                   | 默认值 | 版本   |
| ------------ | ------------------------------------------------------------ | ---------------------- | ------ | ------ |
| defaultValue | 默认选中的选项                                               | string\[]              | \[]    | 3.6.2  |
| disabled     | 整组失效                                                     | boolean                | false  | 3.6.2  |
| name         | CheckboxGroup 下所有 `input[type="checkbox"]` 的 `name` 属性 | string                 | -      | 3.16.0 |
| options      | 指定可选项                                                   | string\[]              | \[]    | 3.6.2  |
| value        | 指定选中的选项                                               | string\[]              | \[]    | 3.6.2  |
| onChange     | 变化时回调函数                                               | Function(checkedValue) | -      | 3.6.2  |

### 方法

#### Checkbox

react-component
| 名称 | 描述 | 版本 |
| ------- | -------- | ----- |
| blur() | 移除焦点 | 3.6.2 |
| focus() | 获取焦点 | 3.6.2 |

## CheckBox 引入文件

```ts
import * as React from "react";
import * as PropTypes from "prop-types";
import { polyfill } from "react-lifecycles-compat";
import classNames from "classnames";
import RcCheckbox from "rc-checkbox"; //基于react-component/rc-checkbox
import shallowEqual from "shallowequal";
import CheckboxGroup, { CheckboxGroupContext } from "./Group"; // 将checkbox集合到一个分组中
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
```

### [shallowEqual](https://github.com/dashed/shallowequal#readme) 判断 2 个对象是否相等

```js
const shallowequal = require("shallowequal");
const object = { user: "fred" };
const other = { user: "fred" };

object == other;
// → false

shallowequal(object, other);
// → true
```

## 定义接口

```js
export interface AbstractCheckboxProps<T> {
  prefixCls?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: T) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  value?: any;
  tabIndex?: number;
  name?: string;
  children?: React.ReactNode;
  id?: string;
  autoFocus?: boolean;
}

export interface CheckboxProps
  extends AbstractCheckboxProps<CheckboxChangeEvent> {
  indeterminate?: boolean;
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}
// 选择事件接口
export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}
```

## 结构

```js

class Checkbox extends React.Component<CheckboxProps, {}> {
  // 引入checkBoxGroup组件,注入到静态属性Group下
  static Group: typeof CheckboxGroup;
  // 静态方法
  static __ANT_CHECKBOX = true;

  static defaultProps = {
    indeterminate: false,
  };
  // contextTypes reactContext类型校验
  static contextTypes = {
    checkboxGroup: PropTypes.any,
  };

  context: any;

  private rcCheckbox: any;

  componentDidMount() {
    const { value } = this.props;
    // context里面checkboxGroup
    const { checkboxGroup = {} } = this.context || {};
    // 注册值,注册到value中
    if (checkboxGroup.registerValue) {
      checkboxGroup.registerValue(value);
    }
  }

  // 是否更新组件,判断props,state,context是否相等,不相等更新组件,性能优化
  shouldComponentUpdate(
    nextProps: CheckboxProps,
    nextState: {},
    nextContext: CheckboxGroupContext,
  ) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup)
    );
  }
  // 更新时的操作
  componentDidUpdate({ value: prevValue }: CheckboxProps) {
    const { value } = this.props;
    const { checkboxGroup = {} } = this.context || {};
    // 修改值,通过context做父子组件之间值的传递


    if (value !== prevValue && checkboxGroup.registerValue && checkboxGroup.cancelValue) {
      checkboxGroup.cancelValue(prevValue);
      checkboxGroup.registerValue(value);
    }
  }
  // 组件卸载时,清空context的checkBoxGroup的值
  componentWillUnmount() {
    const { value } = this.props;
    const { checkboxGroup = {} } = this.context || {};
    if (checkboxGroup.cancelValue) {
      checkboxGroup.cancelValue(value);
    }
  }

  saveCheckbox = (node: any) => {
    this.rcCheckbox = node;
  };

  focus() {
    this.rcCheckbox.focus();
  }

  blur() {
    this.rcCheckbox.blur();
  }

  renderCheckbox = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { props, context } = this;
    const {
      prefixCls: customizePrefixCls,
      className,
      children,
      indeterminate,
      style,
      onMouseEnter,
      onMouseLeave,
      ...restProps
    } = props;
    // 拿到group的数据
    const { checkboxGroup } = context;
    const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
    const checkboxProps: CheckboxProps = { ...restProps };
    // checkboxGroup逻辑
    if (checkboxGroup) {
      checkboxProps.onChange = (...args) => {
        if (restProps.onChange) {
          restProps.onChange(...args);
        }
        checkboxGroup.toggleOption({ label: children, value: props.value });
      };
      checkboxProps.name = checkboxGroup.name;
      checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
      checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
    }
    const classString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
      [`${prefixCls}-wrapper-disabled`]: checkboxProps.disabled,
    });
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate,
    });
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RcCheckbox
          {...checkboxProps}
          prefixCls={prefixCls}
          className={checkboxClass}
          ref={this.saveCheckbox}
        />
        {children !== undefined && <span>{children}</span>}
      </label>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCheckbox}</ConfigConsumer>;
  }
}
```

## checkboxGroup

```js
import * as React from "react";
import * as PropTypes from "prop-types";
import { polyfill } from "react-lifecycles-compat";
import classNames from "classnames";
import shallowEqual from "shallowequal";
import omit from "omit.js";
import Checkbox, { CheckboxChangeEvent } from "./Checkbox";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";

export type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType {
  label: React.ReactNode;
  value: CheckboxValueType;
  disabled?: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
}

export interface AbstractCheckboxGroupProps {
  prefixCls?: string;
  className?: string;
  options?: Array<CheckboxOptionType | string>;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
  name?: string;
  defaultValue?: Array<CheckboxValueType>;
  value?: Array<CheckboxValueType>;
  onChange?: (checkedValue: Array<CheckboxValueType>) => void;
}

export interface CheckboxGroupState {
  value: CheckboxValueType[];
  registeredValues: CheckboxValueType[];
}

export interface CheckboxGroupContext {
  checkboxGroup: {
    toggleOption: (option: CheckboxOptionType) => void;
    value: any;
    disabled: boolean;
  };
}

class CheckboxGroup extends React.Component<CheckboxGroupProps, CheckboxGroupState> {
  static defaultProps = {
    options: [],
  };

  static propTypes = {
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
  };

  static childContextTypes = {
    checkboxGroup: PropTypes.any,
  };

  static getDerivedStateFromProps(nextProps: CheckboxGroupProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value || [],
      };
    }
    return null;
  }

  constructor(props: CheckboxGroupProps) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || [],
      registeredValues: [],
    };
  }

// 父元素,获取子元素的context
  getChildContext() {
    return {
      checkboxGroup: {
        toggleOption: this.toggleOption,
        value: this.state.value,
        disabled: this.props.disabled,
        name: this.props.name,

        // https://github.com/ant-design/ant-design/issues/16376
        registerValue: this.registerValue,
        cancelValue: this.cancelValue,
      },
    };
  }
  // 只有不相等才更新
  shouldComponentUpdate(nextProps: CheckboxGroupProps, nextState: CheckboxGroupState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  getOptions() {
    const { options } = this.props;
    // https://github.com/Microsoft/TypeScript/issues/7960
    return (options as Array<CheckboxOptionType>).map(option => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        } as CheckboxOptionType;
      }
      return option;
    });
  }

  cancelValue = (value: string) => {
    this.setState(({ registeredValues }) => ({
      registeredValues: registeredValues.filter(val => val !== value),
    }));
  };

  registerValue = (value: string) => {
    this.setState(({ registeredValues }) => ({
      registeredValues: [...registeredValues, value],
    }));
  };

  toggleOption = (option: CheckboxOptionType) => {
    // 修改value的值
    const { registeredValues } = this.state;
    const optionIndex = this.state.value.indexOf(option.value);
    const value = [...this.state.value];
    if (optionIndex === -1) {
      value.push(option.value);
    } else {
      value.splice(optionIndex, 1);
    }
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const { onChange } = this.props;
    if (onChange) {
      const options = this.getOptions();
      onChange(
        value
        // 过滤
          .filter(val => registeredValues.indexOf(val) !== -1)
          // 排序
          .sort((a, b) => {
            const indexA = options.findIndex(opt => opt.value === a);
            const indexB = options.findIndex(opt => opt.value === b);
            return indexA - indexB;
          }),
      );
    }
  };

  renderGroup = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { props, state } = this;
    const { prefixCls: customizePrefixCls, className, style, options, ...restProps } = props;
    const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
    const groupPrefixCls = `${prefixCls}-group`;

    const domProps = omit(restProps, ['children', 'defaultValue', 'value', 'onChange', 'disabled']);

    let { children } = props;
    if (options && options.length > 0) {
      children = this.getOptions().map(option => (
        <Checkbox
          prefixCls={prefixCls}
          key={option.value.toString()}
          disabled={'disabled' in option ? option.disabled : props.disabled}
          value={option.value}
          checked={state.value.indexOf(option.value) !== -1}
          onChange={option.onChange}
          className={`${groupPrefixCls}-item`}
        >
          {option.label}
        </Checkbox>
      ));
    }

    const classString = classNames(groupPrefixCls, className);
    return (
      <div className={classString} style={style} {...domProps}>
        {children}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderGroup}</ConfigConsumer>;
  }
}
```
