---
category: Components
type: 数据录入
title: Cascader
subtitle: 级联选择
---

级联选择框。

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## API

```jsx
<Cascader options={options} onChange={onChange} />
```

| 参数                 | 说明                                                                                                                                                          | 类型                                    | 默认值                                                     | 版本   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------- | ------ |
| allowClear           | 是否支持清除                                                                                                                                                  | boolean                                 | true                                                       |        |
| autoFocus            | 自动获取焦点                                                                                                                                                  | boolean                                 | false                                                      |        |
| changeOnSelect       | 当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示                                                                                            | boolean                                 | false                                                      |        |
| className            | 自定义类名                                                                                                                                                    | string                                  | -                                                          |        |
| defaultValue         | 默认的选中项                                                                                                                                                  | string\[]                               | \[]                                                        |        |
| disabled             | 禁用                                                                                                                                                          | boolean                                 | false                                                      |        |
| displayRender        | 选择后展示的渲染函数                                                                                                                                          | `(label, selectedOptions) => ReactNode` | `label => label.join(' / ')`                               |        |
| expandTrigger        | 次级菜单的展开方式，可选 'click' 和 'hover'                                                                                                                   | string                                  | 'click'                                                    |        |
| fieldNames           | 自定义 options 中 label name children 的字段（注意，3.7.0 之前的版本为 `filedNames`）                                                                         | object                                  | `{ label: 'label', value: 'value', children: 'children' }` | 3.7.0  |
| getPopupContainer    | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | Function(triggerNode)                   | () => document.body                                        |        |
| loadData             | 用于动态加载选项，无法与 `showSearch` 一起使用                                                                                                                | `(selectedOptions) => void`             | -                                                          |        |
| notFoundContent      | 当下拉列表为空时显示的内容                                                                                                                                    | string                                  | 'Not Found'                                                |        |
| options              | 可选项数据源                                                                                                                                                  | [Option](#Option)[]                     | -                                                          |        |
| placeholder          | 输入框占位文本                                                                                                                                                | string                                  | '请选择'                                                   |        |
| popupClassName       | 自定义浮层类名                                                                                                                                                | string                                  | -                                                          |        |
| popupPlacement       | 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight`                                                                                                 | Enum                                    | `bottomLeft`                                               |        |
| popupVisible         | 控制浮层显隐                                                                                                                                                  | boolean                                 | -                                                          |        |
| showSearch           | 在选择框中显示搜索框                                                                                                                                          | boolean                                 | false                                                      |        |
| size                 | 输入框大小，可选 `large` `default` `small`                                                                                                                    | string                                  | `default`                                                  |        |
| style                | 自定义样式                                                                                                                                                    | string                                  | -                                                          |        |
| suffixIcon           | 自定义的选择框后缀图标                                                                                                                                        | ReactNode                               | -                                                          | 3.10.0 |
| value                | 指定选中项                                                                                                                                                    | string\[]                               | -                                                          |        |
| onChange             | 选择完成后的回调                                                                                                                                              | `(value, selectedOptions) => void`      | -                                                          |        |
| onPopupVisibleChange | 显示/隐藏浮层的回调                                                                                                                                           | `(value) => void`                       | -                                                          |        |

`showSearch` 为对象时，其中的字段：

| 参数            | 说明                                                                                         | 类型                                    | 默认值 | 版本   |
| --------------- | -------------------------------------------------------------------------------------------- | --------------------------------------- | ------ | ------ |
| filter          | 接收 `inputValue` `path` 两个参数，当 `path` 符合筛选条件时，应返回 true，反之则返回 false。 | `function(inputValue, path): boolean`   |        |        |
| limit           | 搜索结果展示数量                                                                             | number \| false                         | 50     | 3.11.0 |
| matchInputWidth | 搜索结果列表是否与输入框同宽                                                                 | boolean                                 |        |        |
| render          | 用于渲染 filter 后的选项                                                                     | `function(inputValue, path): ReactNode` |        |        |
| sort            | 用于排序 filter 后的选项                                                                     | `function(a, b, inputValue)`            |        |        |

### Option

```typescript
interface Option {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}
```

## 方法

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

<style>
.ant-cascader-picker {
  width: 300px;
}
</style>

> 注意，如果需要获得中国省市区数据，可以参考 [china-division](https://gist.github.com/afc163/7582f35654fd03d5be7009444345ea17)。

## 引入文件

```js
import * as React from "react";
import RcCascader from "rc-cascader"; // rc-cascader基础组件
import arrayTreeFilter from "array-tree-filter";
import classNames from "classnames";
import omit from "omit.js";
import KeyCode from "rc-util/lib/KeyCode"; // 将keyCode做了封装
import { polyfill } from "react-lifecycles-compat";
import Input from "../input";
import Icon from "../icon";
import {
  ConfigConsumer,
  ConfigConsumerProps,
  RenderEmptyHandler
} from "../config-provider";
import LocaleReceiver from "../locale-provider/LocaleReceiver"; // 国际化
import warning from "../_util/warning";
```

### arrayTreeFilter,将树状图扁平化

```js
const data = [
  {
    value: "a",
    children: [
      {
        value: "b",
        children: [
          {
            value: "c"
          },
          {
            value: "d"
          }
        ]
      }
    ]
  }
];
const values = ["a", "b", "c"];
const result = arrayTreeFilter(
  data,
  (item, level) => item.value === values[level]
);

console.log(result);
// [
//   { value: 'a', children: [...] },
//   { value: 'b', children: [...] },
//   { value: 'c', children: [...] }
// ]
```

## 接口

```js
export interface CascaderOptionType {
  value?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  isLeaf?: boolean;
  loading?: boolean;
  children?: Array<CascaderOptionType>;
  [key: string]: any;
}

export interface FieldNamesType {
  value?: string;
  label?: string;
  children?: string;
}

export interface FilledFieldNamesType {
  value: string;
  label: string;
  children: string;
}

export type CascaderExpandTrigger = "click" | "hover"; // 操作的类型

export interface ShowSearchType {
  filter?: (
    inputValue: string,
    path: CascaderOptionType[],
    names: FilledFieldNamesType
  ) => boolean;
  render?: (
    inputValue: string,
    path: CascaderOptionType[],
    prefixCls: string | undefined,
    names: FilledFieldNamesType
  ) => React.ReactNode;
  sort?: (
    a: CascaderOptionType[],
    b: CascaderOptionType[],
    inputValue: string,
    names: FilledFieldNamesType
  ) => number;
  matchInputWidth?: boolean;
  limit?: number | false;
}

export interface CascaderProps {
  /** 可选项数据源 */
  options: CascaderOptionType[];
  /** 默认的选中项 */
  defaultValue?: string[];
  /** 指定选中项 */
  value?: string[];
  /** 选择完成后的回调 */
  onChange?: (value: string[], selectedOptions?: CascaderOptionType[]) => void;
  /** 选择后展示的渲染函数 */
  displayRender?: (
    label: string[],
    selectedOptions?: CascaderOptionType[]
  ) => React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 自定义浮层类名 */
  popupClassName?: string;
  /** 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` */
  popupPlacement?: string;
  /** 输入框占位文本 */
  placeholder?: string;
  /** 输入框大小，可选 `large` `default` `small` */
  size?: string;
  /** 禁用 */
  disabled?: boolean;
  /** 是否支持清除 */
  allowClear?: boolean;
  showSearch?: boolean | ShowSearchType;
  notFoundContent?: React.ReactNode;
  loadData?: (selectedOptions?: CascaderOptionType[]) => void;
  /** 次级菜单的展开方式，可选 'click' 和 'hover' */
  expandTrigger?: CascaderExpandTrigger;
  /** 当此项为 true 时，点选每级菜单选项值都会发生变化 */
  changeOnSelect?: boolean;
  /** 浮层可见变化时回调 */
  onPopupVisibleChange?: (popupVisible: boolean) => void;
  prefixCls?: string;
  inputPrefixCls?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  popupVisible?: boolean;
  /** use this after antd@3.7.0 */
  fieldNames?: FieldNamesType;
  /** typo props name before antd@3.7.0 */
  filedNames?: FieldNamesType;
  suffixIcon?: React.ReactNode;
}

export interface CascaderState {
  inputFocused: boolean;
  inputValue: string;
  value: string[];
  popupVisible: boolean | undefined;
  flattenOptions: CascaderOptionType[][] | undefined;
  prevProps: CascaderProps;
}

interface CascaderLocale {
  placeholder?: string;
}
```

## 结构

```js
class Cascader extends React.Component<CascaderProps, CascaderState> {
  static defaultProps = {
    placeholder: 'Please select',
    transitionName: 'slide-up',
    popupPlacement: 'bottomLeft',
    options: [],
    disabled: false,
    allowClear: true,
  };

  static getDerivedStateFromProps(nextProps: CascaderProps, { prevProps }: CascaderState) {
  }
  // 缓存设置
  cachedOptions: CascaderOptionType[] = [];

  private input: Input;

  constructor(props: CascaderProps) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || [],
      inputValue: '',
      inputFocused: false,
      popupVisible: props.popupVisible,
      flattenOptions: props.showSearch ? flattenTree(props.options, props) : undefined,
      prevProps: props,
    };
  }
  // 设置值
  setValue = (value: string[], selectedOptions: CascaderOptionType[] = []) => {
  };
  // 设置label
  getLabel() {
  }
  // 保存input
  saveInput = (node: Input) => {
  };
  // change事件
  handleChange = (value: any, selectedOptions: CascaderOptionType[]) => {
  };
  // popupvisiblechange
  handlePopupVisibleChange = (popupVisible: boolean) => {
  };
  // inputblur
  handleInputBlur = () => {
  };

  handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  };
  // 清除选项
  clearSelection = (e: React.MouseEvent<HTMLElement>) => {
  };

  generateFilteredOptions(prefixCls: string | undefined, renderEmpty: RenderEmptyHandler) {
  }

  focus() {
  }

  blur() {
  }

  renderCascader = (
    { getPopupContainer: getContextPopupContainer, getPrefixCls, renderEmpty }: ConfigConsumerProps,
    locale: CascaderLocale,
  ) => {
  };

  render() {
    return (
      <ConfigConsumer>
        {(configArgument: ConfigConsumerProps) => (
          <LocaleReceiver>{locale => this.renderCascader(configArgument, locale)}</LocaleReceiver>
        )}
      </ConfigConsumer>
    );
  }
}
```

## 生命周期

```js
  // 从props设置state
  static getDerivedStateFromProps(nextProps: CascaderProps, { prevProps }: CascaderState) {
    const newState: Partial<CascaderState> = {
      prevProps: nextProps,
    };
    // 如果有value,state设置value
    if ('value' in nextProps) {
      newState.value = nextProps.value || [];
    }
    // 设置值,从外层props传入
    if ('popupVisible' in nextProps) {
      newState.popupVisible = nextProps.popupVisible;
    }
    if (nextProps.showSearch && prevProps.options !== nextProps.options) {
      // 扁平化tree,获取每一级,所有的item
      newState.flattenOptions = flattenTree(nextProps.options, nextProps);
    }
    // 开发环境下,值不存在提示告警
    if (process.env.NODE_ENV !== 'production' && nextProps.options) {
      warningValueNotExist(nextProps.options, getFieldNames(nextProps));
    }

    return newState;
  }
   renderCascader = (
    { getPopupContainer: getContextPopupContainer, getPrefixCls, renderEmpty }: ConfigConsumerProps,
    locale: CascaderLocale,
  ) => {
    const { props, state } = this;
    const {
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      children,
      placeholder = locale.placeholder,
      size,
      disabled,
      className,
      style,
      allowClear,
      showSearch = false,
      suffixIcon,
      notFoundContent,
      ...otherProps
    } = props;

    const { value, inputFocused } = state;

    const prefixCls = getPrefixCls('cascader', customizePrefixCls);
    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);

    const sizeCls = classNames({
      [`${inputPrefixCls}-lg`]: size === 'large',
      [`${inputPrefixCls}-sm`]: size === 'small',
    });
    // 清空图标
    const clearIcon =
      (allowClear && !disabled && value.length > 0) || state.inputValue ? (
        <Icon
          type="close-circle"
          theme="filled"
          className={`${prefixCls}-picker-clear`}
          onClick={this.clearSelection}
        />
      ) : null;
      // 下拉cls
    const arrowCls = classNames({
      [`${prefixCls}-picker-arrow`]: true,
      [`${prefixCls}-picker-arrow-expand`]: state.popupVisible,
    });
    // pickerCLs,查询按钮
    const pickerCls = classNames(className, `${prefixCls}-picker`, {
      [`${prefixCls}-picker-with-value`]: state.inputValue,
      [`${prefixCls}-picker-disabled`]: disabled,
      [`${prefixCls}-picker-${size}`]: !!size,
      [`${prefixCls}-picker-show-search`]: !!showSearch,
      [`${prefixCls}-picker-focused`]: inputFocused,
    });
    // 这样使用会有问题,如果有新增加的配置,需要每次在这里添加一次
    // Fix bug of https://github.com/facebook/react/pull/5004
    // and https://fb.me/react-unknown-prop
    const inputProps = omit(otherProps, [
      'onChange',
      'options',
      'popupPlacement',
      'transitionName',
      'displayRender',
      'onPopupVisibleChange',
      'changeOnSelect',
      'expandTrigger',
      'popupVisible',
      'getPopupContainer',
      'loadData',
      'popupClassName',
      'filterOption',
      'renderFilteredOption',
      'sortFilteredOption',
      'notFoundContent',
      'fieldNames',
      'filedNames', // For old compatibility
    ]);

    let { options } = props;
    const names: FilledFieldNamesType = getFilledFieldNames(this.props);
    if (options && options.length > 0) {
      if (state.inputValue) {
        // 生成filterdOptions
        options = this.generateFilteredOptions(prefixCls, renderEmpty);
      }
    } else {
      options = [
        {
          [names.label]: notFoundContent || renderEmpty('Cascader'),
          [names.value]: 'ANT_CASCADER_NOT_FOUND',
          disabled: true,
        },
      ];
    }
    // Dropdown menu should keep previous status until it is fully closed.
    if (!state.popupVisible) {
      options = this.cachedOptions;
    } else {
      this.cachedOptions = options;
    }

    const dropdownMenuColumnStyle: { width?: number; height?: string } = {};
    const isNotFound =
      (options || []).length === 1 && options[0][names.value] === 'ANT_CASCADER_NOT_FOUND';
    if (isNotFound) {
      dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
    }
    // The default value of `matchInputWidth` is `true`
    const resultListMatchInputWidth = (showSearch as ShowSearchType).matchInputWidth !== false;
    if (resultListMatchInputWidth && (state.inputValue || isNotFound) && this.input) {
      dropdownMenuColumnStyle.width = this.input.input.offsetWidth;
    }

    const inputIcon = (suffixIcon &&
      (React.isValidElement<{ className?: string }>(suffixIcon) ? (
        React.cloneElement(suffixIcon, {
          className: classNames({
            [suffixIcon.props.className!]: suffixIcon.props.className,
            [`${prefixCls}-picker-arrow`]: true,
          }),
        })
      ) : (
        <span className={`${prefixCls}-picker-arrow`}>{suffixIcon}</span>
      ))) || <Icon type="down" className={arrowCls} />;

    const input = children || (
      <span style={style} className={pickerCls}>
        <span className={`${prefixCls}-picker-label`}>{this.getLabel()}</span>
        <Input
          {...inputProps}
          tabIndex="-1"
          ref={this.saveInput}
          prefixCls={inputPrefixCls}
          placeholder={value && value.length > 0 ? undefined : placeholder}
          className={`${prefixCls}-input ${sizeCls}`}
          value={state.inputValue}
          disabled={disabled}
          readOnly={!showSearch}
          autoComplete={inputProps.autoComplete || 'off'}
          onClick={showSearch ? this.handleInputClick : undefined}
          onBlur={showSearch ? this.handleInputBlur : undefined}
          onKeyDown={this.handleKeyDown}
          onChange={showSearch ? this.handleInputChange : undefined}
        />
        {clearIcon}
        {inputIcon}
      </span>
    );

    const expandIcon = <Icon type="right" />;

    const loadingIcon = (
      <span className={`${prefixCls}-menu-item-loading-icon`}>
        <Icon type="redo" spin />
      </span>
    );

    const getPopupContainer = props.getPopupContainer || getContextPopupContainer;
    const rest = omit(props, ['inputIcon', 'expandIcon', 'loadingIcon']);

    return (
      <RcCascader
        {...rest}
        prefixCls={prefixCls}
        getPopupContainer={getPopupContainer}
        options={options}
        value={value}
        popupVisible={state.popupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        onChange={this.handleChange}
        dropdownMenuColumnStyle={dropdownMenuColumnStyle}
        expandIcon={expandIcon}
        loadingIcon={loadingIcon}
      >
        {input}
      </RcCascader>
    );
  };
// tree扁平化
function flattenTree(
  options: CascaderOptionType[],
  props: CascaderProps,
  ancestor: CascaderOptionType[] = [], // 根
) {
  const names: FilledFieldNamesType = getFilledFieldNames(props);
  // 获取节点每一级
  let flattenOptions: CascaderOptionType[][] = [];
  const childrenName = names.children;
  options.forEach(option => {
    const path = ancestor.concat(option); // 数组合并
    // 	changeOnSelect当此项为 true 时，点选每级菜单选项值都会发生变化,没有子节点,子节点的长度为0,
    if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
      flattenOptions.push(path);
    }
    if (option[childrenName]) {
      flattenOptions = flattenOptions.concat(flattenTree(option[childrenName], props, path));
    }
  });
  return flattenOptions;
}
// 获取fieldname
function getFilledFieldNames(props: CascaderProps) {
  const fieldNames = getFieldNames(props) || {};
  const names: FilledFieldNamesType = {
    children: fieldNames.children || 'children',
    label: fieldNames.label || 'label',
    value: fieldNames.value || 'value',
  };
  return names;
}
// 做兼容性处理
function getFieldNames(props: CascaderProps) {
  const { fieldNames, filedNames } = props;
  // 兼容老版本
  if ('filedNames' in props) {
    return filedNames; // For old compatibility
  }
  return fieldNames;
}

function warningValueNotExist(list: CascaderOptionType[], fieldNames: FieldNamesType = {}) {
  (list || []).forEach(item => {
    const valueFieldName = fieldNames.value || 'value';
    warning(valueFieldName in item, 'Cascader', 'Not found `value` in `options`.');
    warningValueNotExist(item[fieldNames.children || 'children'], fieldNames);
  });
}
 generateFilteredOptions(prefixCls: string | undefined, renderEmpty: RenderEmptyHandler) {
    const { showSearch, notFoundContent } = this.props;
    const names: FilledFieldNamesType = getFilledFieldNames(this.props);
    const {
      filter = defaultFilterOption,
      render = defaultRenderFilteredOption,
      sort = defaultSortFilteredOption,
      limit = defaultLimit,
    } = showSearch as ShowSearchType;
    const { flattenOptions = [], inputValue } = this.state;

    // Limit the filter if needed
    let filtered: Array<CascaderOptionType[]>;
    if (limit > 0) {
      filtered = [];
      let matchCount = 0;

      // Perf optimization to filter items only below the limit
      flattenOptions.some(path => {
        const match = filter(this.state.inputValue, path, names);
        if (match) {
          filtered.push(path);
          matchCount += 1;
        }
        return matchCount >= limit;
      });
    } else {
      warning(
        typeof limit !== 'number',
        'Cascader',
        "'limit' of showSearch should be positive number or false.",
      );
      filtered = flattenOptions.filter(path => filter(this.state.inputValue, path, names));
    }

    filtered.sort((a, b) => sort(a, b, inputValue, names));

    if (filtered.length > 0) {
      return filtered.map((path: CascaderOptionType[]) => {
        return {
          __IS_FILTERED_OPTION: true,
          path,
          [names.label]: render(inputValue, path, prefixCls, names),
          [names.value]: path.map((o: CascaderOptionType) => o[names.value]),
          disabled: path.some((o: CascaderOptionType) => !!o.disabled),
        } as CascaderOptionType;
      });
    }
    return [
      {
        [names.label]: notFoundContent || renderEmpty('Cascader'),
        [names.value]: 'ANT_CASCADER_NOT_FOUND',
        disabled: true,
      },
    ];
  }
  // 默认
  function defaultFilterOption(
    inputValue: string,
    path: CascaderOptionType[],
    names: FilledFieldNamesType,
  ) {
    return path.some(option => (option[names.label] as string).indexOf(inputValue) > -1);
  }

  function defaultRenderFilteredOption(
    inputValue: string,
    path: CascaderOptionType[],
    prefixCls: string | undefined,
    names: FilledFieldNamesType,
  ) {
    return path.map((option, index) => {
      const label = option[names.label];
      const node =
        (label as string).indexOf(inputValue) > -1
          ? highlightKeyword(label as string, inputValue, prefixCls)
          : label;
      return index === 0 ? node : [' / ', node];
    });
  }
  // 默认排序
  function defaultSortFilteredOption(
    a: CascaderOptionType[],
    b: CascaderOptionType[],
    inputValue: string,
    names: FilledFieldNamesType,
  ) {
    function callback(elem: CascaderOptionType) {
      return (elem[names.label] as string).indexOf(inputValue) > -1;
    }
    // 找到在索引的位置,然后升序
    return a.findIndex(callback) - b.findIndex(callback);
  }

```

### some

```
some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。

some() 方法会依次执行数组的每个元素：

如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
如果没有满足条件的元素，则返回false。
注意： some() 不会对空数组进行检测。

注意： some() 不会改变原始数组。
```
