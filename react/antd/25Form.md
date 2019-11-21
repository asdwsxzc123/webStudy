---
category: Components
subtitle: 表单
type: 数据录入
cols: 1
title: Form
---

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## 表单

我们为 `form` 提供了以下三种排列方式：

- 水平排列：标签和表单控件水平排列；（默认）
- 垂直排列：标签和表单控件上下垂直排列；
- 行内排列：表单项水平行内排列。

## 表单域

表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

这里我们封装了表单域 `<Form.Item />` 。

```jsx
<Form.Item {...props}>{children}</Form.Item>
```

## API

### Form

**更多示例参考 [rc-form](http://react-component.github.io/form/)**。

| 参数             | 说明                                                                                                                                                                   | 类型                                                 | 默认值       | 版本   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------ | ------ |
| form             | 经 `Form.create()` 包装过的组件会自带 `this.props.form` 属性                                                                                                           | object                                               | -            |        |
| hideRequiredMark | 隐藏所有表单项的必选标记                                                                                                                                               | Boolean                                              | false        |        |
| labelAlign       | label 标签的文本对齐方式                                                                                                                                               | 'left' \| 'right'                                    | 'right'      | 3.15.0 |
| labelCol         | （3.14.0 新增，之前的版本只能设置到 FormItem 上。）label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](https://ant.design/components/grid/#Col)    |              | 3.14.0 |
| layout           | 表单布局                                                                                                                                                               | 'horizontal'\|'vertical'\|'inline'                   | 'horizontal' |        |
| onSubmit         | 数据验证成功后回调事件                                                                                                                                                 | Function(e:Event)                                    |              |        |
| wrapperCol       | （3.14.0 新增，之前的版本只能设置到 FormItem 上。）需要为输入控件设置布局样式时，使用该属性，用法同 labelCol                                                           | [object](https://ant.design/components/grid-cn/#Col) |              | 3.14.0 |
| colon            | 配置 Form.Item 的 colon 的默认值                                                                                                                                       | boolean                                              | true         | 3.15.0 |

### Form.create(options)

使用方式如下：

```jsx
class CustomizedForm extends React.Component {}

CustomizedForm = Form.create({})(CustomizedForm);
```

`options` 的配置项如下。

| 参数             | 说明                                                                                                                                                                                                   | 类型                                                | 版本   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- | ------ |
| mapPropsToFields | 把父组件的属性映射到表单项上（如：把 Redux store 中的值读出），需要对返回值中的表单域数据用 [`Form.createFormField`](#Form.createFormField) 标记，注意表单项将变成受控组件, error 等也需要一并手动传入 | (props) => ({ \[fieldName\]: FormField { value } }) |        |
| name             | 设置表单域内字段 id 的前缀                                                                                                                                                                             | -                                                   | 3.12.0 |
| validateMessages | 默认校验信息，可用于把默认错误信息改为中文等，格式与 [newMessages](https://github.com/yiminghe/async-validator/blob/master/src/messages.js) 返回值一致                                                 | Object { \[nested.path]: String }                   |        |
| onFieldsChange   | 当 `Form.Item` 子节点的值（包括 error）发生改变时触发，可以把对应的值转存到 Redux store                                                                                                                | Function(props, changedFields, allFields)           |        |
| onValuesChange   | 任一表单域的值发生改变时的回调                                                                                                                                                                         | (props, changedValues, allValues) => void           |        |

经过 `Form.create` 之后如果要拿到 `ref`，可以使用 `rc-form` 提供的 `wrappedComponentRef`，[详细内容可以查看这里](https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140)。

```jsx
class CustomizedForm extends React.Component { ... }

// use wrappedComponentRef
const EnhancedForm =  Form.create()(CustomizedForm);
<EnhancedForm wrappedComponentRef={(form) => this.form = form} />
this.form // => The instance of CustomizedForm
```

经过 `Form.create` 包装的组件将会自带 `this.props.form` 属性，`this.props.form` 提供的 API 如下：

> 注意：使用 `getFieldsValue` `getFieldValue` `setFieldsValue` 等时，应确保对应的 field 已经用 `getFieldDecorator` 注册过了。

| 方法                    | 说明                                                                                                                                                              | 类型                                                                                                                                        | 版本 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| getFieldDecorator       | 用于和表单进行双向绑定，详见下方描述                                                                                                                              |                                                                                                                                             |      |
| getFieldError           | 获取某个输入控件的 Error                                                                                                                                          | Function(name)                                                                                                                              |      |
| getFieldsError          | 获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error                                                                                                   | Function(\[names: string\[]])                                                                                                               |      |
| getFieldsValue          | 获取一组输入控件的值，如不传入参数，则获取全部组件的值                                                                                                            | Function(\[fieldNames: string\[]])                                                                                                          |      |
| getFieldValue           | 获取一个输入控件的值                                                                                                                                              | Function(fieldName: string)                                                                                                                 |      |
| isFieldsTouched         | 判断是否任一输入控件经历过 `getFieldDecorator` 的值收集时机 `options.trigger`                                                                                     | (names?: string\[]) => boolean                                                                                                              |      |
| isFieldTouched          | 判断一个输入控件是否经历过 `getFieldDecorator` 的值收集时机 `options.trigger`                                                                                     | (name: string) => boolean                                                                                                                   |      |
| isFieldValidating       | 判断一个输入控件是否在校验状态                                                                                                                                    | Function(name)                                                                                                                              |      |
| resetFields             | 重置一组输入控件的值（为 `initialValue`）与状态，如不传入参数，则重置所有组件                                                                                     | Function(\[names: string\[]])                                                                                                               |      |
| setFields               | 设置一组输入控件的值与错误状态：[代码](https://github.com/react-component/form/blob/3b9959b57ab30b41d8890ff30c79a7e7c383cad3/examples/server-validate.js#L74-L79) | ({<br />&nbsp;&nbsp;\[fieldName\]: {value: any, errors: \[Error\] }<br />}) => void                                                         |      |
| setFieldsValue          | 设置一组输入控件的值（注意：不要在 `componentWillReceiveProps` 内使用，否则会导致死循环，[原因](https://github.com/ant-design/ant-design/issues/2985)）           | (<br />&nbsp;&nbsp;{ \[fieldName\]&#x3A; value },<br />&nbsp;&nbsp;callback: Function<br />) => void                                        |      |
| validateFields          | 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件                                                                                          | (<br />&nbsp;&nbsp;\[fieldNames: string\[]],<br />&nbsp;&nbsp;\[options: object\],<br />&nbsp;&nbsp;callback(errors, values)<br />) => void |      |
| validateFieldsAndScroll | 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围                                                                  | 参考 `validateFields`                                                                                                                       |      |

### validateFields/validateFieldsAndScroll

```jsx
const {
  form: { validateFields }
} = this.props;
validateFields((errors, values) => {
  // ...
});
validateFields(['field1', 'field2'], (errors, values) => {
  // ...
});
validateFields(['field1', 'field2'], options, (errors, values) => {
  // ...
});
```

| 参数                | 说明                                                                                                                                                   | 类型      | 默认值 | 版本  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------ | ----- |
| options.first       | 若为 true，则每一表单域的都会在碰到第一个失败了的校验规则后停止校验                                                                                    | boolean   | false  | 3.9.3 |
| options.firstFields | 指定表单域会在碰到第一个失败了的校验规则后停止校验                                                                                                     | String\[] | \[]    | 3.9.3 |
| options.force       | 对已经校验过的表单域，在 validateTrigger 再次被触发时是否再次校验                                                                                      | boolean   | false  | 3.9.3 |
| options.scroll      | 定义 validateFieldsAndScroll 的滚动行为，详细配置见 [dom-scroll-into-view config](https://github.com/yiminghe/dom-scroll-into-view#function-parameter) | Object    | {}     | 3.9.3 |

#### validateFields 的 callback 参数示例

- `errors`:

  ```js
  {
    "username": {
      "errors": [
        {
          "message": "Please input your username!",
          "field": "username"
        }
      ]
    },
    "password": {
      "errors": [
        {
          "message": "Please input your Password!",
          "field": "password"
        }
      ]
    }
  }
  ```

- `values`:

  ```js
  {
    "username": "username",
    "password": "password",
  }
  ```

### Form.createFormField

用于标记 `mapPropsToFields` 返回的表单域数据，[例子](#components-form-demo-global-state)。

### this.props.form.getFieldDecorator(id, options)

经过 `getFieldDecorator` 包装的控件，表单控件会自动添加 `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

1. 你**不再需要也不应该**用 `onChange` 来做同步，但还是可以继续监听 `onChange` 等事件。
2. 你不能用控件的 `value` `defaultValue` 等属性来设置表单域的值，默认值可以用 `getFieldDecorator` 里的 `initialValue`。
3. 你不应该用 `setState`，可以使用 `this.props.form.setFieldsValue` 来动态改变表单值。

#### 特别注意

如果使用的是 `react@<15.3.0`，则 `getFieldDecorator` 调用不能位于纯函数组件中: <https://github.com/facebook/react/pull/6534>

#### getFieldDecorator(id, options) 参数

| 参数                      | 说明                                                                                                                                     | 类型                                       | 默认值                                                             | 版本   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------ | ------ |
| id                        | 必填输入控件唯一标志。支持嵌套式的[写法](https://github.com/react-component/form/pull/48)。                                              | string                                     |                                                                    |        |
| options.getValueFromEvent | 可以把 onChange 的参数（如 event）转化为控件的值                                                                                         | function(..args)                           | [reference](https://github.com/react-component/form#option-object) |        |
| options.initialValue      | 子节点的初始值，类型、可选值均由子节点决定(注意：由于内部校验时使用 `===` 判断是否变化，建议使用变量缓存所需设置的值而非直接使用字面量)) |                                            |                                                                    |        |
| options.normalize         | 转换默认的 value 给控件，[一个选择全部的例子](https://codepen.io/afc163/pen/JJVXzG?editors=001)                                          | function(value, prevValue, allValues): any | -                                                                  |        |
| options.preserve          | 即便字段不再使用，也保留该字段的值                                                                                                       | boolean                                    | -                                                                  | 3.12.0 |
| options.rules             | 校验规则，参考下方文档                                                                                                                   | object\[]                                  |                                                                    |        |
| options.trigger           | 收集子节点的值的时机                                                                                                                     | string                                     | 'onChange'                                                         |        |
| options.validateFirst     | 当某一规则校验不通过时，是否停止剩下的规则的校验                                                                                         | boolean                                    | false                                                              |        |
| options.validateTrigger   | 校验子节点值的时机                                                                                                                       | string\|string\[]                          | 'onChange'                                                         |        |
| options.valuePropName     | 子节点的值的属性，如 Switch 的是 'checked'                                                                                               | string                                     | 'value'                                                            |        |

更多参数请查看 [rc-form option](https://github.com/react-component/form#option-object)。

### Form.Item

注意：一个 Form.Item 建议只放一个被 getFieldDecorator 装饰过的 child，当有多个被装饰过的 child 时，`help` `required` `validateStatus` 无法自动生成。

| 参数           | 说明                                                                                                                                                                                                                    | 类型                                              | 默认值 | 版本   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------ | ------ |
| colon          | 配合 label 属性使用，表示是否显示 label 后面的冒号                                                                                                                                                                      | boolean                                           | true   |        |
| extra          | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。                                                                                                                                        | string\|ReactNode                                 |        |        |
| hasFeedback    | 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用                                                                                                                                               | boolean                                           | false  |        |
| help           | 提示信息，如不设置，则会根据校验规则自动生成                                                                                                                                                                            | string\|ReactNode                                 |        |        |
| htmlFor        | 设置子元素 label `htmlFor` 属性                                                                                                                                                                                         | string                                            |        | 3.17.0 |
| label          | label 标签的文本                                                                                                                                                                                                        | string\|ReactNode                                 |        |        |
| labelCol       | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}`。在 3.14.0 之后，你可以通过 Form 的 labelCol 进行统一设置。当和 Form 同时设置时，以 FormItem 为准。 | [object](https://ant.design/components/grid/#Col) |        |        |
| required       | 是否必填，如不设置，则会根据校验规则自动生成                                                                                                                                                                            | boolean                                           | false  |        |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'                                                                                                                            | string                                            |        |        |
| wrapperCol     | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol。在 3.14.0 之后，你可以通过 Form 的 wrapperCol 进行统一设置。当和 Form 同时设置时，以 FormItem 为准。                                                         | [object](https://ant.design/components/grid/#Col) |        |        |

### 校验规则

| 参数       | 说明                                                                                            | 类型                                    | 默认值   | 版本 |
| ---------- | ----------------------------------------------------------------------------------------------- | --------------------------------------- | -------- | ---- |
| enum       | 枚举类型                                                                                        | string                                  | -        |      |
| len        | 字段长度                                                                                        | number                                  | -        |      |
| max        | 最大长度                                                                                        | number                                  | -        |      |
| message    | 校验文案                                                                                        | string\|ReactNode                       | -        |      |
| min        | 最小长度                                                                                        | number                                  | -        |      |
| pattern    | 正则表达式校验                                                                                  | RegExp                                  | -        |      |
| required   | 是否必选                                                                                        | boolean                                 | `false`  |      |
| transform  | 校验前转换字段值                                                                                | function(value) => transformedValue:any | -        |      |
| type       | 内建校验类型，[可选项](https://github.com/yiminghe/async-validator#type)                        | string                                  | 'string' |      |
| validator  | 自定义校验（注意，[callback 必须被调用](https://github.com/ant-design/ant-design/issues/5155)） | function(rule, value, callback)         | -        |      |
| whitespace | 必选时，空格是否会被视为错误                                                                    | boolean                                 | `false`  |      |

更多高级用法可研究 [async-validator](https://github.com/yiminghe/async-validator)。

## 在 TypeScript 中使用

```tsx
import { Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface UserFormProps extends FormComponentProps {
  age: number;
  name: string;
}

class UserForm extends React.Component<UserFormProps, any> {
  // ...
}

const App = Form.create<UserFormProps>({
  // ...
})(UserForm);
```

<style>
.code-box-demo .ant-form:not(.ant-form-inline):not(.ant-form-vertical) {
  max-width: 600px;
}
.markdown.api-container table td:last-child {
  white-space: nowrap;
  word-wrap: break-word;
}
</style>

## FAQ

### 自定义 validator 没有效果

这是由于你的 `validator` 有错误导致 `callback` 没有执行到。你可以选择通过 `async` 返回一个 promise 或者使用 `try...catch` 进行错误捕获：

```jsx
validator: async (rule, value) => {
  throw new Error('Something wrong!');
}

// or

validator(rule, value, callback) => {
  try {
    throw new Error('Something wrong!');
  } catch (err) {
    callback(err);
  }
}
```

## 引入文件

```js
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import createDOMForm from 'rc-form/lib/createDOMForm'; // 创建form
import createFormField from 'rc-form/lib/createFormField'; // 创建formfield
import omit from 'omit.js';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { ColProps } from '../grid/col'; // colProps
import { tuple } from '../_util/type';
import warning from '../_util/warning';
import FormItem, { FormLabelAlign } from './FormItem'; // formItem
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';
import FormContext from './context'; // context
import { FormWrappedProps } from './interface';
```

## 接口

```js

type FormCreateOptionMessagesCallback = (...args: any[]) => string;

interface FormCreateOptionMessages {
  [messageId: string]: string | FormCreateOptionMessagesCallback | FormCreateOptionMessages;
}

export interface FormCreateOption<T> {
  onFieldsChange?: (props: T, fields: any, allFields: any) => void;
  onValuesChange?: (props: T, changedValues: any, allValues: any) => void;
  mapPropsToFields?: (props: T) => void;
  validateMessages?: FormCreateOptionMessages;
  withRef?: boolean;
  name?: string;
}

const FormLayouts = tuple('horizontal', 'inline', 'vertical');
export type FormLayout = (typeof FormLayouts)[number];

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  layout?: FormLayout;
  form?: WrappedFormUtils;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
  hideRequiredMark?: boolean;
  /**
   * @since 3.14.0
   */
  wrapperCol?: ColProps;
  labelCol?: ColProps;
  /**
   * @since 3.15.0
   */
  colon?: boolean;
  labelAlign?: FormLabelAlign;
}

export type ValidationRule = {
  /** validation error message */
  message?: React.ReactNode;
  /** built-in validation type, available options: https://github.com/yiminghe/async-validator#type */
  type?: string;
  /** indicates whether field is required */
  required?: boolean;
  /** treat required fields that only contain whitespace as errors */
  whitespace?: boolean;
  /** validate the exact length of a field */
  len?: number;
  /** validate the min length of a field */
  min?: number;
  /** validate the max length of a field */
  max?: number;
  /** validate the value from a list of possible values */
  enum?: string | string[];
  /** validate from a regular expression */
  pattern?: RegExp;
  /** transform a value before validation */
  transform?: (value: any) => any;
  /** custom validate function (Note: callback must be called) */
  validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any;
};

export type ValidateCallback<V> = (errors: any, values: V) => void;

export type GetFieldDecoratorOptions = {
  /** 子节点的值的属性，如 Checkbox 的是 'checked' */
  valuePropName?: string;
  /** 子节点的初始值，类型、可选值均由子节点决定 */
  initialValue?: any;
  /** 收集子节点的值的时机 */
  trigger?: string;
  /** 可以把 onChange 的参数转化为控件的值，例如 DatePicker 可设为：(date, dateString) => dateString */
  getValueFromEvent?: (...args: any[]) => any;
  /** Get the component props according to field value. */
  getValueProps?: (value: any) => any;
  /** 校验子节点值的时机 */
  validateTrigger?: string | string[];
  /** 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator) */
  rules?: ValidationRule[];
  /** 是否和其他控件互斥，特别用于 Radio 单选控件 */
  exclusive?: boolean;
  /** Normalize value to form component */
  normalize?: (value: any, prevValue: any, allValues: any) => any;
  /** Whether stop validate on first rule of error for this field.  */
  validateFirst?: boolean;
  /** 是否一直保留子节点的信息 */
  preserve?: boolean;
};

/** dom-scroll-into-view 组件配置参数 */
export type DomScrollIntoViewConfig = {
  /** 是否和左边界对齐 */
  alignWithLeft?: boolean;
  /** 是否和上边界对齐  */
  alignWithTop?: boolean;
  /** 顶部偏移量 */
  offsetTop?: number;
  /** 左侧偏移量 */
  offsetLeft?: number;
  /** 底部偏移量 */
  offsetBottom?: number;
  /** 右侧偏移量 */
  offsetRight?: number;
  /** 是否允许容器水平滚动 */
  allowHorizontalScroll?: boolean;
  /** 当内容可见时是否允许滚动容器 */
  onlyScrollIfNeeded?: boolean;
};

export type ValidateFieldsOptions = {
  /** 所有表单域是否在第一个校验规则失败后停止继续校验 */
  first?: boolean;
  /** 指定哪些表单域在第一个校验规则失败后停止继续校验 */
  firstFields?: string[];
  /** 已经校验过的表单域，在 validateTrigger 再次被触发时是否再次校验 */
  force?: boolean;
  /** 定义 validateFieldsAndScroll 的滚动行为 */
  scroll?: DomScrollIntoViewConfig;
};

// function create
export type WrappedFormUtils<V = any> = {
  /** 获取一组输入控件的值，如不传入参数，则获取全部组件的值 */
  getFieldsValue(fieldNames?: Array<string>): { [field: string]: any };
  /** 获取一个输入控件的值 */
  getFieldValue(fieldName: string): any;
  /** 设置一组输入控件的值 */
  setFieldsValue(obj: Object, callback?: Function): void;
  /** 设置一组输入控件的值 */
  setFields(obj: Object): void;
  /** 校验并获取一组输入域的值与 Error */
  validateFields(
    fieldNames: Array<string>,
    options: ValidateFieldsOptions,
    callback: ValidateCallback<V>,
  ): void;
  validateFields(options: ValidateFieldsOptions, callback: ValidateCallback<V>): void;
  validateFields(fieldNames: Array<string>, callback: ValidateCallback<V>): void;
  validateFields(fieldNames: Array<string>, options: ValidateFieldsOptions): void;
  validateFields(fieldNames: Array<string>): void;
  validateFields(callback: ValidateCallback<V>): void;
  validateFields(options: ValidateFieldsOptions): void;
  validateFields(): void;
  /** 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围 */
  validateFieldsAndScroll(
    fieldNames: Array<string>,
    options: ValidateFieldsOptions,
    callback: ValidateCallback<V>,
  ): void;
  validateFieldsAndScroll(options: ValidateFieldsOptions, callback: ValidateCallback<V>): void;
  validateFieldsAndScroll(fieldNames: Array<string>, callback: ValidateCallback<V>): void;
  validateFieldsAndScroll(fieldNames: Array<string>, options: ValidateFieldsOptions): void;
  validateFieldsAndScroll(fieldNames: Array<string>): void;
  validateFieldsAndScroll(callback: ValidateCallback<V>): void;
  validateFieldsAndScroll(options: ValidateFieldsOptions): void;
  validateFieldsAndScroll(): void;
  /** 获取某个输入控件的 Error */
  getFieldError(name: string): string[] | undefined;
  getFieldsError(names?: Array<string>): Record<string, string[] | undefined>;
  /** 判断一个输入控件是否在校验状态 */
  isFieldValidating(name: string): boolean;
  isFieldTouched(name: string): boolean;
  isFieldsTouched(names?: Array<string>): boolean;
  /** 重置一组输入控件的值与状态，如不传入参数，则重置所有组件 */
  resetFields(names?: Array<string>): void;
  // tslint:disable-next-line:max-line-length
  getFieldDecorator<T extends Object = {}>(
    id: keyof T,
    options?: GetFieldDecoratorOptions,
  ): (node: React.ReactNode) => React.ReactNode;
};

export interface WrappedFormInternalProps<V = any> {
  form: WrappedFormUtils<V>;
}

export interface RcBaseFormProps {
  wrappedComponentRef?: any;
}

export interface FormComponentProps<V = any> extends WrappedFormInternalProps<V>, RcBaseFormProps {
  form: WrappedFormUtils<V>;
}
```

## 结构

```js

export default class Form extends React.Component<FormProps, any> {
  static defaultProps = {
    colon: true, //
    layout: 'horizontal' as FormLayout,
    hideRequiredMark: false,
    onSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
    },
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    layout: PropTypes.oneOf(FormLayouts),
    children: PropTypes.any,
    onSubmit: PropTypes.func,
    hideRequiredMark: PropTypes.bool,
    colon: PropTypes.bool,
  };

  static Item = FormItem;

  static createFormField = createFormField;

  static create = function create<TOwnProps extends FormComponentProps>(
    options: FormCreateOption<TOwnProps> = {},
  ): FormWrappedProps<TOwnProps> {
    return createDOMForm({
      fieldNameProp: 'id',
      ...options,
      fieldMetaProp: FIELD_META_PROP,
      fieldDataProp: FIELD_DATA_PROP,
    });
  };

  constructor(props: FormProps) {
    super(props);

    warning(!props.form, 'Form', 'It is unnecessary to pass `form` to `Form` after antd@1.7.0.');
  }

  renderForm = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, hideRequiredMark, className = '', layout } = this.props;
    const prefixCls = getPrefixCls('form', customizePrefixCls);
    const formClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-horizontal`]: layout === 'horizontal',
        [`${prefixCls}-vertical`]: layout === 'vertical',
        [`${prefixCls}-inline`]: layout === 'inline',
        [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
      },
      className,
    );

    const formProps = omit(this.props, [
      'prefixCls',
      'className',
      'layout',
      'form',
      'hideRequiredMark',
      'wrapperCol',
      'labelAlign',
      'labelCol',
      'colon',
    ]);
    // props里面有children
    return <form {...formProps} className={formClassName} />;
  };

  render() {
    const { wrapperCol, labelAlign, labelCol, layout, colon } = this.props;
    return (
      <FormContext.Provider
        value={{ wrapperCol, labelAlign, labelCol, vertical: layout === 'vertical', colon }}
      >
        <ConfigConsumer>{this.renderForm}</ConfigConsumer>
      </FormContext.Provider>
    );
  }
}

export const FIELD_META_PROP = 'data-__meta';
export const FIELD_DATA_PROP = 'data-__field';

```

## context

```js
import createReactContext from '@ant-design/create-react-context';
import { ColProps } from '../grid/col';
import { FormLabelAlign } from './FormItem';

export interface FormContextProps {
  vertical: boolean;
  colon?: boolean;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

const FormContext =
  createReactContext <
  FormContextProps >
  {
    labelAlign: 'right',
    vertical: false
  };

export default FormContext;

import * as React from 'react';

export default function createReactContext<T>(
  defaultValue: T,
  calculateChangedBits?: (prev: T, next: T) => number
): Context<T>;

type RenderFn<T> = (value: T) => React.ReactNode;

export type Context<T> = {
  Provider: React.ComponentClass<ProviderProps<T>>;
  Consumer: React.ComponentClass<ConsumerProps<T>>;
};

export type ProviderProps<T> = {
  value: T;
  children: React.ReactNode;
};

export type ConsumerProps<T> = {
  children: RenderFn<T> | [RenderFn<T>];
  observedBits?: number;
};

```

## formItem

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import Row from '../grid/row';
import Col, { ColProps } from '../grid/col';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';
import { tuple } from '../_util/type';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';
import FormContext, { FormContextProps } from './context';


const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');

export type FormLabelAlign = 'left' | 'right';

export interface FormItemProps {
  prefixCls?: string;
  className?: string;
  id?: string;
  htmlFor?: string;
  label?: React.ReactNode;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  help?: React.ReactNode;
  extra?: React.ReactNode;
  validateStatus?: (typeof ValidateStatuses)[number];
  hasFeedback?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  colon?: boolean;
}
```

## item 结构

```js
// 插入空格
function intersperseSpace<T>(list: Array<T>): Array<T | string> {
  return list.reduce((current, item) => [...current, ' ', item], []).slice(1);
}

export default class FormItem extends React.Component<FormItemProps, any> {
  static defaultProps = {
    hasFeedback: false,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelAlign: PropTypes.string,
    labelCol: PropTypes.object,
    help: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    validateStatus: PropTypes.oneOf(ValidateStatuses),
    hasFeedback: PropTypes.bool,
    wrapperCol: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.node,
    colon: PropTypes.bool,
  };

  helpShow = false;

  componentDidMount() {
    const { children, help, validateStatus, id } = this.props;
    warning(
      this.getControls(children, true).length <= 1 ||
        (help !== undefined || validateStatus !== undefined),
      'Form.Item',
      'Cannot generate `validateStatus` and `help` automatically, ' +
        'while there are more than one `getFieldDecorator` in it.',
    );

    warning(
      !id,
      'Form.Item',
      '`id` is deprecated for its label `htmlFor`. Please use `htmlFor` directly.',
    );
  }

  getHelpMessage() {
    const { help } = this.props;
    if (help === undefined && this.getOnlyControl()) {
      const { errors } = this.getField();
      if (errors) {
        return intersperseSpace(
          errors.map((e: any, index: number) => {
            let node: React.ReactElement<any> | null = null;

            if (React.isValidElement(e)) {
              node = e;
            } else if (React.isValidElement(e.message)) {
              node = e.message;
            }
            // eslint-disable-next-line react/no-array-index-key
            return node ? React.cloneElement(node, { key: index }) : e.message;
          }),
        );
      }
      return '';
    }
    return help;
  }

  getControls(children: React.ReactNode, recursively: boolean) {
    let controls: React.ReactElement<any>[] = [];
    const childrenArray = React.Children.toArray(children);
    for (let i = 0; i < childrenArray.length; i++) {
      if (!recursively && controls.length > 0) {
        break;
      }

      const child = childrenArray[i] as React.ReactElement<any>;
      if (
        child.type &&
        ((child.type as any) === FormItem || (child.type as any).displayName === 'FormItem')
      ) {
        continue;
      }
      if (!child.props) {
        continue;
      }
      if (FIELD_META_PROP in child.props) {
        // And means FIELD_DATA_PROP in child.props, too.
        controls.push(child);
      } else if (child.props.children) {
        controls = controls.concat(this.getControls(child.props.children, recursively));
      }
    }
    return controls;
  }

  getOnlyControl() {
    const child = this.getControls(this.props.children, false)[0];
    return child !== undefined ? child : null;
  }

  getChildProp(prop: string) {
    const child = this.getOnlyControl() as React.ReactElement<any>;
    return child && child.props && child.props[prop];
  }

  getId() {
    return this.getChildProp('id');
  }

  getMeta() {
    return this.getChildProp(FIELD_META_PROP);
  }

  getField() {
    return this.getChildProp(FIELD_DATA_PROP);
  }

  getValidateStatus() {
    const onlyControl = this.getOnlyControl();
    if (!onlyControl) {
      return '';
    }
    const field = this.getField();
    if (field.validating) {
      return 'validating';
    }
    if (field.errors) {
      return 'error';
    }
    const fieldValue = 'value' in field ? field.value : this.getMeta().initialValue;
    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
      return 'success';
    }
    return '';
  }

  // Resolve duplicated ids bug between different forms
  // https://github.com/ant-design/ant-design/issues/7351
  onLabelClick = () => {
    const id = this.props.id || this.getId();
    if (!id) {
      return;
    }
  // 获取dom节点的方式,不需要使用ref
    const formItemNode = ReactDOM.findDOMNode(this) as Element;
    const control = formItemNode.querySelector(`[id="${id}"]`) as HTMLElement;
    // focus
    if (control && control.focus) {
      // 可以通过focus打开
      control.focus();
    }
  };

  onHelpAnimEnd = (_key: string, helpShow: boolean) => {
    this.helpShow = helpShow;
    if (!helpShow) {
      this.setState({});
    }
  };
  // 是否为必填项
  isRequired() {
    const { required } = this.props;
    // 只要存在,就返回
    if (required !== undefined) {
      return required;
    }
    // 获取控制器
    if (this.getOnlyControl()) {
      const meta = this.getMeta() || {};
      const validate = meta.validate || [];

      return validate
        .filter((item: any) => !!item.rules)
        .some((item: any) => {
          return item.rules.some((rule: any) => rule.required);
        });
    }
    return false;
  }

  renderHelp(prefixCls: string) {
    const help = this.getHelpMessage();
    const children = help ? (
      <div className={`${prefixCls}-explain`} key="help">
        {help}
      </div>
    ) : null;
    if (children) {
      this.helpShow = !!children;
    }
    return (
      <Animate
        transitionName="show-help"
        component=""
        transitionAppear
        key="help"
        onEnd={this.onHelpAnimEnd}
      >
        {children}
      </Animate>
    );
  }

  renderExtra(prefixCls: string) {
    const { extra } = this.props;
    return extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null;
  }

  renderValidateWrapper(
    prefixCls: string,
    c1: React.ReactNode,
    c2: React.ReactNode,
    c3: React.ReactNode,
  ) {
    const { props } = this;
    const onlyControl = this.getOnlyControl;
    const validateStatus =
      props.validateStatus === undefined && onlyControl
        ? this.getValidateStatus()
        : props.validateStatus;

    let classes = `${prefixCls}-item-control`;
    if (validateStatus) {
      classes = classNames(`${prefixCls}-item-control`, {
        'has-feedback': props.hasFeedback || validateStatus === 'validating',
        'has-success': validateStatus === 'success',
        'has-warning': validateStatus === 'warning',
        'has-error': validateStatus === 'error',
        'is-validating': validateStatus === 'validating',
      });
    }

    let iconType = '';
    switch (validateStatus) {
      case 'success':
        iconType = 'check-circle';
        break;
      case 'warning':
        iconType = 'exclamation-circle';
        break;
      case 'error':
        iconType = 'close-circle';
        break;
      case 'validating':
        iconType = 'loading';
        break;
      default:
        iconType = '';
        break;
    }

    const icon =
      props.hasFeedback && iconType ? (
        <span className={`${prefixCls}-item-children-icon`}>
          <Icon type={iconType} theme={iconType === 'loading' ? 'outlined' : 'filled'} />
        </span>
      ) : null;

    return (
      <div className={classes}>
        <span className={`${prefixCls}-item-children`}>
          {c1}
          {icon}
        </span>
        {c2}
        {c3}
      </div>
    );
  }

  renderWrapper(prefixCls: string, children: React.ReactNode) {
    return (
      <FormContext.Consumer key="wrapper">
        {({ wrapperCol: contextWrapperCol, vertical }: FormContextProps) => {
          const { wrapperCol } = this.props;
          const mergedWrapperCol: ColProps =
            ('wrapperCol' in this.props ? wrapperCol : contextWrapperCol) || {};

          const className = classNames(
            `${prefixCls}-item-control-wrapper`,
            mergedWrapperCol.className,
          );

          // No pass FormContext since it's useless
          return (
            <FormContext.Provider value={{ vertical }}>
              <Col {...mergedWrapperCol} className={className}>
                {children}
              </Col>
            </FormContext.Provider>
          );
        }}
      </FormContext.Consumer>
    );
  }
  // 渲染label
  renderLabel(prefixCls: string) {
    return (
      <FormContext.Consumer key="label">
        {({
          vertical,
          labelAlign: contextLabelAlign,
          labelCol: contextLabelCol,
          colon: contextColon,
        }: FormContextProps) => {
          // 标题名,占用的长度,对齐方式,是否有冒号,id,设置子元素 label htmlFor 属性
          const { label, labelCol, labelAlign, colon, id, htmlFor } = this.props;
          const required = this.isRequired();

          const mergedLabelCol: ColProps =
            ('labelCol' in this.props ? labelCol : contextLabelCol) || {};

          const mergedLabelAlign: FormLabelAlign | undefined =
            'labelAlign' in this.props ? labelAlign : contextLabelAlign;

          const labelClsBasic = `${prefixCls}-item-label`;
          const labelColClassName = classNames(
            labelClsBasic,
            mergedLabelAlign === 'left' && `${labelClsBasic}-left`,
            mergedLabelCol.className,
          );

          let labelChildren = label;
          // Keep label is original where there should have no colon
          const computedColon = colon === true || (contextColon !== false && colon !== false);
          const haveColon = computedColon && !vertical;
          // Remove duplicated user input colon
          if (haveColon && typeof label === 'string' && (label as string).trim() !== '') {
            labelChildren = (label as string).replace(/[：:]\s*$/, '');
          }

          const labelClassName = classNames({
            [`${prefixCls}-item-required`]: required,
            [`${prefixCls}-item-no-colon`]: !computedColon,
          });

          return label ? (
            <Col {...mergedLabelCol} className={labelColClassName}>
              <label
                htmlFor={htmlFor || id || this.getId()}
                className={labelClassName}
                title={typeof label === 'string' ? label : ''}
                onClick={this.onLabelClick}
              >
                {labelChildren}
              </label>
            </Col>
          ) : null;
        }}
      </FormContext.Consumer>
    );
  }

  renderChildren(prefixCls: string) {
    const { children } = this.props;
    // 两个组件以数组形式展示,不需要加Fragment
    return [
      this.renderLabel(prefixCls),
      this.renderWrapper(
        prefixCls,
        this.renderValidateWrapper(
          prefixCls,
          children,
          this.renderHelp(prefixCls),
          this.renderExtra(prefixCls),
        ),
      ),
    ];
  }
  // 一级一级往上找
  renderFormItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, style, className } = this.props;
    const prefixCls = getPrefixCls('form', customizePrefixCls);
    const children = this.renderChildren(prefixCls);
    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-with-help`]: this.helpShow,
      [`${className}`]: !!className,
    };

    return (
      <Row className={classNames(itemClassName)} style={style} key="row">
        {children}
      </Row>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderFormItem}</ConfigConsumer>;
  }
}
```
