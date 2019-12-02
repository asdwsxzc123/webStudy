---
category: Components
subtitle: 输入框
type: 数据录入
title: Input
---

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## API

### Input

| 参数         | 说明                                                                                                                                                                                  | 类型              | 默认值    | 版本   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | --------- | ------ |
| addonAfter   | 带标签的 input，设置后置标签                                                                                                                                                          | string\|ReactNode |           |        |
| addonBefore  | 带标签的 input，设置前置标签                                                                                                                                                          | string\|ReactNode |           |        |
| defaultValue | 输入框默认内容                                                                                                                                                                        | string            |           |        |
| disabled     | 是否禁用状态，默认为 false                                                                                                                                                            | boolean           | false     |        |
| id           | 输入框的 id                                                                                                                                                                           | string            |           |        |
| prefix       | 带有前缀图标的 input                                                                                                                                                                  | string\|ReactNode |           |        |
| size         | 控件大小。注：标准表单内的输入框大小限制为 `large`。可选 `large` `default` `small`                                                                                                    | string            | `default` |        |
| suffix       | 带有后缀图标的 input                                                                                                                                                                  | string\|ReactNode |           |        |
| type         | 声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)(请直接使用 `Input.TextArea` 代替 `type="textarea"`)。 | string            | `text`    |        |
| value        | 输入框内容                                                                                                                                                                            | string            |           |        |
| onChange     | 输入框内容变化时的回调                                                                                                                                                                | function(e)       |           | 3.9.3  |
| onPressEnter | 按下回车的回调                                                                                                                                                                        | function(e)       |           |        |
| allowClear   | 可以点击清除图标删除内容                                                                                                                                                              | boolean           |           | 3.12.0 |

> 如果 `Input` 在 `Form.Item` 内，并且 `Form.Item` 设置了 `id` 和 `options` 属性，则 `value` `defaultValue` 和 `id` 属性会被自动设置。

Input 的其他属性和 React 自带的 [input](https://facebook.github.io/react/docs/events.html#supported-events) 一致。

### Input.TextArea

> `2.12` 后新增的组件，旧版请使用 `Input[type=textarea]`。

| 参数         | 说明                                                                       | 类型            | 默认值 | 版本 |
| ------------ | -------------------------------------------------------------------------- | --------------- | ------ | ---- |
| autosize     | 自适应内容高度，可设置为 `true|false` 或对象：`{ minRows: 2, maxRows: 6 }` | boolean\|object | false  |      |
| defaultValue | 输入框默认内容                                                             | string          |        |      |
| value        | 输入框内容                                                                 | string          |        |      |
| onPressEnter | 按下回车的回调                                                             | function(e)     |        |      |

`Input.TextArea` 的其他属性和浏览器自带的 [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 一致。

#### Input.Search

| 参数        | 说明                                                    | 类型                   | 默认值 | 版本 |
| ----------- | ------------------------------------------------------- | ---------------------- | ------ | ---- |
| enterButton | 是否有确认按钮，可设为按钮文字。该属性会与 addon 冲突。 | boolean\|ReactNode     | false  |      |
| onSearch    | 点击搜索或按下回车键时的回调                            | function(value, event) |        |      |

其余属性和 Input 一致。

#### Input.Group

| 参数    | 说明                                                                  | 类型    | 默认值    | 版本 |
| ------- | --------------------------------------------------------------------- | ------- | --------- | ---- |
| compact | 是否用紧凑模式                                                        | boolean | false     |      |
| size    | `Input.Group` 中所有的 `Input` 的大小，可选 `large` `default` `small` | string  | `default` |      |

```html
<Input.Group>
  <input />
  <input />
</Input.Group>
```

#### Input.Password (3.12.0 中新增)

| 参数             | 说明             | 类型    | 默认值 | 版本   |
| ---------------- | ---------------- | ------- | ------ | ------ |
| visibilityToggle | 是否显示切换按钮 | boolean | true   | 3.12.2 |

## FAQ

### 为什么我动态改变 `prefix/suffix` 时，Input 会失去焦点？

当 Input 动态添加或者删除 `prefix/suffix` 时，React 会重新创建 DOM 结构而新的 input 是没有焦点的。你可以预设一个空的 `<span />` 来保持 DOM 结构不变：

```jsx
const suffix = condition ? <Icon type="smile" /> : <span />;

<Input suffix={suffix} />;
```

## Input 引入文件

```js
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
import Group from './Group'; // group组件
import Search from './Search'; //search组件
import TextArea from './TextArea'; // 文本域
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Password from './Password'; // 密码组件
import Icon from '../icon'; // icon组件
import { Omit, tuple } from '../_util/type';
import warning from '../_util/warning';

const InputSizes = tuple('small', 'default', 'large');

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  prefixCls?: string;
  size?: (typeof InputSizes)[number];
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
}

```

## Input 结构

```jsx

function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

function hasPrefixSuffix(props: InputProps) {
  return !!('prefix' in props || props.suffix || props.allowClear);
}

class Input extends React.Component<InputProps, any> {
   // 挂载组件
  static Group: typeof Group;

  static Search: typeof Search;

  static TextArea: typeof TextArea;

  static Password: typeof Password;
  // 默认值
  static defaultProps = {
    type: 'text',
  };

  static propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    size: PropTypes.oneOf(InputSizes),
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefixCls: PropTypes.string,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    allowClear: PropTypes.bool,
  };

// 根据props设置state
  static getDerivedStateFromProps(nextProps: InputProps) {
    // 存在就修改
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  input: HTMLInputElement;

  constructor(props: InputProps) {
    super(props);
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    this.state = {
      value,
    };
  }

  // Since polyfill `getSnapshotBeforeUpdate` need work with `componentDidUpdate`.
  // We keep an empty function here.
  // 使用getSnapshotBeforeUpdate代替didUpdate
  componentDidUpdate() {}

  getSnapshotBeforeUpdate(prevProps: InputProps) {
    // 有带图标和没有带图标,返回告警
    if (hasPrefixSuffix(prevProps) !== hasPrefixSuffix(this.props)) {
      warning(
        this.input !== document.activeElement,
        'Input',
        `When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ`,
      );
    }
    return null;
  }

  getInputClassName(prefixCls: string) {
    const { size, disabled } = this.props;
    return classNames(prefixCls, {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-disabled`]: disabled,
    });
  }
  // 设置input的值,通过this.input拿到dom,然后.value= 赋值,没有使用state
  setValue(
    value: string,
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent>,
    callback?: () => void,
  ) {
    // 如果不存在props.value,直接设置value,执行callback
    if (!('value' in this.props)) {
      this.setState({ value }, callback);
    }
    const { onChange } = this.props;
    if (onChange) {
      let event = e;
      if (e.type === 'click') {
        // click clear icon
        event = Object.create(e);
        event.target = this.input;
        event.currentTarget = this.input;
        const originalInputValue = this.input.value;
        // change input value cause e.target.value should be '' when clear input
        this.input.value = '';
        onChange(event as React.ChangeEvent<HTMLInputElement>);
        // reset input value
        this.input.value = originalInputValue;
        return;
      }
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  }

  saveInput = (node: HTMLInputElement) => {
    this.input = node;
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setValue('', e, () => {
      this.focus();
    });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setValue(e.target.value, e);
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }
  // 渲染清除标签
  renderClearIcon(prefixCls: string) {
    const { allowClear, disabled } = this.props;
    const { value } = this.state;
    if (!allowClear || disabled || value === undefined || value === null || value === '') {
      return null;
    }
    return (
      <Icon
        type="close-circle"
        theme="filled"
        onClick={this.handleReset}
        className={`${prefixCls}-clear-icon`}
        role="button"
      />
    );
  }
  // 渲染单位和清除标签
  renderSuffix(prefixCls: string) {
    const { suffix, allowClear } = this.props;
    if (suffix || allowClear) {
      return (
        <span className={`${prefixCls}-suffix`}>
          {this.renderClearIcon(prefixCls)}
          {suffix}
        </span>
      );
    }
    return null;
  }
  // 渲染自定义标签
  renderLabeledInput(prefixCls: string, children: React.ReactElement<any>) {
    const { addonBefore, addonAfter, style, size, className } = this.props;
    // Not wrap when there is not addons
    if (!addonBefore && !addonAfter) {
      return children;
    }

    const wrapperClassName = `${prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBeforeNode = addonBefore ? (
      <span className={addonClassName}>{addonBefore}</span>
    ) : null;
    const addonAfterNode = addonAfter ? <span className={addonClassName}>{addonAfter}</span> : null;

    const mergedWrapperClassName = classNames(`${prefixCls}-wrapper`, {
      [wrapperClassName]: addonBefore || addonAfter,
    });

    const mergedGroupClassName = classNames(className, `${prefixCls}-group-wrapper`, {
      [`${prefixCls}-group-wrapper-sm`]: size === 'small',
      [`${prefixCls}-group-wrapper-lg`]: size === 'large',
    });

    // Need another wrapper for changing display:table to display:inline-block
    // and put style prop in wrapper
    return (
      <span className={mergedGroupClassName} style={style}>
        <span className={mergedWrapperClassName}>
          {addonBeforeNode}
          {React.cloneElement(children, { style: null })}
          {addonAfterNode}
        </span>
      </span>
    );
  }
  // 渲染icon
  renderLabeledIcon(prefixCls: string, children: React.ReactElement<any>) {
    const { props } = this;
    const suffix = this.renderSuffix(prefixCls);

    if (!hasPrefixSuffix(props)) {
      return children;
    }

    const prefix = props.prefix ? (
      <span className={`${prefixCls}-prefix`}>{props.prefix}</span>
    ) : null;

    const affixWrapperCls = classNames(props.className, `${prefixCls}-affix-wrapper`, {
      [`${prefixCls}-affix-wrapper-sm`]: props.size === 'small',
      [`${prefixCls}-affix-wrapper-lg`]: props.size === 'large',
      [`${prefixCls}-affix-wrapper-with-clear-btn`]:
        props.suffix && props.allowClear && this.state.value,
    });
    return (
      <span className={affixWrapperCls} style={props.style}>
        {prefix}
        {React.cloneElement(children, {
          style: null,
          className: this.getInputClassName(prefixCls),
        })}
        {suffix}
      </span>
    );
  }
  // 渲染input
  renderInput(prefixCls: string) {
    const { className, addonBefore, addonAfter } = this.props;
    const { value } = this.state;
    // Fix https://fb.me/react-unknown-prop
    const otherProps = omit(this.props, [
      'prefixCls',
      'onPressEnter',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
      'allowClear',
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      'defaultValue',
    ]);

    return this.renderLabeledIcon(
      prefixCls,
      <input
        {...otherProps}
        // 设置值,如果为空设置''
        value={fixControlledValue(value)}
        onChange={this.handleChange}
        className={classNames(this.getInputClassName(prefixCls), {
          [className!]: className && !addonBefore && !addonAfter,
        })}
        onKeyDown={this.handleKeyDown}
        ref={this.saveInput}
      />,
    );
  }

  renderComponent = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls } = this.props;
    const prefixCls = getPrefixCls('input', customizePrefixCls);
    return this.renderLabeledInput(prefixCls, this.renderInput(prefixCls));
  };

  render() {
    return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
  }
}
```

## Group

```js
import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface GroupProps {
  className?: string;
  size?: 'large' | 'small' | 'default';
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>;
  onFocus?: React.FocusEventHandler<HTMLSpanElement>;
  onBlur?: React.FocusEventHandler<HTMLSpanElement>;
  prefixCls?: string;
  compact?: boolean;
}

const Group: React.StatelessComponent<GroupProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, className = '' } = props;
      const prefixCls = getPrefixCls('input-group', customizePrefixCls);
      const cls = classNames(
        prefixCls,
        {
          [`${prefixCls}-lg`]: props.size === 'large',
          [`${prefixCls}-sm`]: props.size === 'small',
          [`${prefixCls}-compact`]: props.compact
        },
        className
      );
      // 样式渲染,添加类名,绑定鼠标事件
      return (
        <span
          className={cls}
          style={props.style}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        >
          {props.children}
        </span>
      );
    }}
  </ConfigConsumer>
);

export default Group;
```

## PassWord

基于 Input 组件

```js
import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import Input, { InputProps } from './Input';
import Icon from '../icon';

export interface PasswordProps extends InputProps {
  readonly inputPrefixCls?: string;
  readonly action?: string;
  visibilityToggle?: boolean;
}

export interface PasswordState {
  visible: boolean;
}

const ActionMap: Record<string, string> = {
  click: 'onClick',
  hover: 'onMouseOver',
};

export default class Password extends React.Component<PasswordProps, PasswordState> {
  input: HTMLInputElement;

  static defaultProps = {
    inputPrefixCls: 'ant-input',
    prefixCls: 'ant-input-password',
    action: 'click',
    visibilityToggle: true,
  };

  state: PasswordState = {
    visible: false,
  };

  onChange = () => {
    this.setState(({ visible }) => ({ visible: !visible }));
  };
  // 获取icon
  getIcon() {
    const { prefixCls, action } = this.props;
    const iconTrigger = ActionMap[action!] || '';
    const iconProps = {
      [iconTrigger]: this.onChange,
      className: `${prefixCls}-icon`,
      type: this.state.visible ? 'eye' : 'eye-invisible',
      key: 'passwordIcon',
      onMouseDown: (e: MouseEvent) => {
        // Prevent focused state lost
        // https://github.com/ant-design/ant-design/issues/15173
        e.preventDefault();
      },
    };
    return <Icon {...iconProps} />;
  }

  saveInput = (instance: Input) => {
    if (instance && instance.input) {
      this.input = instance.input;
    }
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }

  render() {
    const {
      className,
      prefixCls,
      inputPrefixCls,
      size,
      visibilityToggle,
      ...restProps
    } = this.props;
    const suffixIcon = visibilityToggle && this.getIcon();
    const inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-${size}`]: !!size,
    });
    return (
      <Input
        {...omit(restProps, ['suffix'])}
        type={this.state.visible ? 'text' : 'password'}
        size={size}
        className={inputClassName}
        prefixCls={inputPrefixCls}
        suffix={suffixIcon}
        ref={this.saveInput}
      />
    );
  }
}

```

## Search

```js
import * as React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';
import Icon from '../icon';
import Button from '../button';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface SearchProps extends InputProps {
  inputPrefixCls?: string;
  onSearch?: (
    value: string,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  enterButton?: boolean | React.ReactNode;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    enterButton: false,
  };

  private input: Input;

  saveInput = (node: Input) => {
    this.input = node;
  };

  onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(this.input.input.value, e);
    }
    this.input.focus();
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }
  // 带有后缀图标的 input
  renderSuffix = (prefixCls: string) => {
    const { suffix, enterButton } = this.props;
    if (enterButton) return suffix;

    const node = (
      <Icon
        className={`${prefixCls}-icon`}
        type="search"
        key="searchIcon"
        onClick={this.onSearch}
      />
    );

    if (suffix) {
      let cloneSuffix = suffix;
      if (React.isValidElement(cloneSuffix) && !cloneSuffix.key) {
        cloneSuffix = React.cloneElement(cloneSuffix, {
          key: 'originSuffix',
        });
      }
      return [cloneSuffix, node];
    }

    return node;
  };
  // 	带标签的 input，设置后置标签
  renderAddonAfter = (prefixCls: string) => {
    const { enterButton, size, disabled, addonAfter } = this.props;
    if (!enterButton) return addonAfter;
    const btnClassName = `${prefixCls}-button`;

    let button: React.ReactNode;
    const enterButtonAsElement = enterButton as React.ReactElement<any>;
    if (enterButtonAsElement.type === Button || enterButtonAsElement.type === 'button') {
      button = React.cloneElement(enterButtonAsElement, {
        onClick: this.onSearch,
        key: 'enterButton',
        ...(enterButtonAsElement.type === Button
          ? {
              className: btnClassName,
              size,
            }
          : {}),
      });
    } else {
      button = (
        <Button
          className={btnClassName}
          type="primary"
          size={size}
          disabled={disabled}
          key="enterButton"
          onClick={this.onSearch}
        >
          {enterButton === true ? <Icon type="search" /> : enterButton}
        </Button>
      );
    }

    if (addonAfter) {
      return [button, addonAfter];
    }

    return button;
  };

  renderSearch = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      size,
      enterButton,
      className,
      ...restProps
    } = this.props;

    delete (restProps as any).onSearch;

    const prefixCls = getPrefixCls('input-search', customizePrefixCls);
    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);

    let inputClassName;

    if (enterButton) {
      inputClassName = classNames(prefixCls, className, {
        [`${prefixCls}-enter-button`]: !!enterButton,
        [`${prefixCls}-${size}`]: !!size,
      });
    } else {
      inputClassName = classNames(prefixCls, className);
    }

    return (
      <Input
        onPressEnter={this.onSearch}
        {...restProps}
        size={size}
        prefixCls={inputPrefixCls}
        addonAfter={this.renderAddonAfter(prefixCls)}
        suffix={this.renderSuffix(prefixCls)}
        ref={this.saveInput}
        className={inputClassName}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSearch}</ConfigConsumer>;
  }
}

```

## TextArea

```js
import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import calculateNodeHeight from './calculateNodeHeight'; // 计算节点高度
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import ResizeObserver from '../_util/resizeObserver';
// Support call raf with delay specified frame
import raf from '../_util/raf';

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

export type HTMLTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaProps extends HTMLTextareaProps {
  prefixCls?: string;
  autosize?: boolean | AutoSizeType;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

export interface TextAreaState {
  textareaStyles?: React.CSSProperties;
  /** We need add process style to disable scroll first and then add back to avoid unexpected scrollbar  */
  resizing?: boolean;
}

class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  nextFrameActionId: number;

  resizeFrameId: number;

  state = {
    textareaStyles: {},
    resizing: false,
  };

  private textAreaRef: HTMLTextAreaElement;

  componentDidMount() {
    this.resizeTextarea();
  }

  componentDidUpdate(prevProps: TextAreaProps) {
    // Re-render with the new content then recalculate the height as required.
    if (prevProps.value !== this.props.value) {
      this.resizeTextarea();
    }
  }

  componentWillUnmount() {
    raf.cancel(this.nextFrameActionId);
    raf.cancel(this.resizeFrameId);
  }

  saveTextAreaRef = (textArea: HTMLTextAreaElement) => {
    this.textAreaRef = textArea;
  };

  handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!('value' in this.props)) {
      this.resizeTextarea();
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  resizeOnNextFrame = () => {
    raf.cancel(this.nextFrameActionId);
    this.nextFrameActionId = raf(this.resizeTextarea);
  };

  resizeTextarea = () => {
    const { autosize } = this.props;
    if (!autosize || !this.textAreaRef) {
      return;
    }
    const { minRows, maxRows } = autosize as AutoSizeType;
    const textareaStyles = calculateNodeHeight(this.textAreaRef, false, minRows, maxRows);
    this.setState({ textareaStyles, resizing: true }, () => {
      raf.cancel(this.resizeFrameId);
      this.resizeFrameId = raf(() => {
        this.setState({ resizing: false });
      });
    });
  };

  focus() {
    this.textAreaRef.focus();
  }

  blur() {
    this.textAreaRef.blur();
  }

  renderTextArea = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { textareaStyles, resizing } = this.state;
    const { prefixCls: customizePrefixCls, className, disabled, autosize } = this.props;
    const { ...props } = this.props;
    const otherProps = omit(props, ['prefixCls', 'onPressEnter', 'autosize']);
    const prefixCls = getPrefixCls('input', customizePrefixCls);
    const cls = classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled,
    });

    const style = {
      ...props.style,
      ...textareaStyles,
      ...(resizing ? { overflow: 'hidden' } : null),
    };
    // Fix https://github.com/ant-design/ant-design/issues/6776
    // Make sure it could be reset when using form.getFieldDecorator
    if ('value' in otherProps) {
      otherProps.value = otherProps.value || '';
    }
    return (
      <ResizeObserver onResize={this.resizeOnNextFrame} disabled={!autosize}>
        <textarea
          {...otherProps}
          className={cls}
          style={style}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleTextareaChange}
          ref={this.saveTextAreaRef}
        />
      </ResizeObserver>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTextArea}</ConfigConsumer>;
  }
}

polyfill(TextArea);

export default TextArea;
// Thanks to https://github.com/andreypopp/react-textarea-autosize/

/**
 * calculateNodeHeight(uiTextNode, useCache = false)
 */

const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
];

export interface NodeType {
  sizingStyle: string;
  paddingSize: number;
  borderSize: number;
  boxSizing: string;
}

const computedStyleCache: { [key: string]: NodeType } = {};
let hiddenTextarea: HTMLTextAreaElement;

export function calculateNodeStyling(node: HTMLElement, useCache = false) {
  const nodeRef = (node.getAttribute('id') ||
    node.getAttribute('data-reactid') ||
    node.getAttribute('name')) as string;

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }

  const style = window.getComputedStyle(node);

  const boxSizing =
    style.getPropertyValue('box-sizing') ||
    style.getPropertyValue('-moz-box-sizing') ||
    style.getPropertyValue('-webkit-box-sizing');

  const paddingSize =
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'));

  const borderSize =
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'));

  const sizingStyle = SIZING_STYLE.map(name => `${name}:${style.getPropertyValue(name)}`).join(';');

  const nodeInfo: NodeType = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing,
  };

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }

  return nodeInfo;
}

export default function calculateNodeHeight(
  uiTextNode: HTMLTextAreaElement,
  useCache = false,
  minRows: number | null = null,
  maxRows: number | null = null,
) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  // Fix wrap="off" issue
  // https://github.com/ant-design/ant-design/issues/6577
  if (uiTextNode.getAttribute('wrap')) {
    hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap') as string);
  } else {
    hiddenTextarea.removeAttribute('wrap');
  }

  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox
  const { paddingSize, borderSize, boxSizing, sizingStyle } = calculateNodeStyling(
    uiTextNode,
    useCache,
  );

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content
  hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';

  let minHeight = Number.MIN_SAFE_INTEGER;
  let maxHeight = Number.MAX_SAFE_INTEGER;
  let height = hiddenTextarea.scrollHeight;
  let overflowY: any;

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    height += borderSize;
  } else if (boxSizing === 'content-box') {
    // remove padding, since height = content
    height -= paddingSize;
  }

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = ' ';
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      overflowY = height > maxHeight ? '' : 'hidden';
      height = Math.min(maxHeight, height);
    }
  }
  return { height, minHeight, maxHeight, overflowY };
}
import raf from 'raf';

interface RafMap {
  [id: number]: number;
}

let id: number = 0;
const ids: RafMap = {};

// Support call raf with delay specified frame
export default function wrapperRaf(callback: () => void, delayFrames: number = 1): number {
  const myId: number = id++;
  let restFrames: number = delayFrames;

  function internalCallback() {
    restFrames -= 1;

    if (restFrames <= 0) {
      callback();
      delete ids[myId];
    } else {
      ids[myId] = raf(internalCallback);
    }
  }

  ids[myId] = raf(internalCallback);

  return myId;
}

wrapperRaf.cancel = function cancel(pid?: number) {
  if (pid === undefined) return;

  raf.cancel(ids[pid]);
  delete ids[pid];
};

wrapperRaf.ids = ids; // export this for test usage

```
