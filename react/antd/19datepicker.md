---
category: Components
type: 数据录入
title: DatePicker
subtitle: 日期选择框
---

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## API

日期类组件包括以下四种形式。

- DatePicker
- MonthPicker
- RangePicker
- WeekPicker

### 国际化配置

默认配置为 en-US，如果你需要设置其他语言，推荐在入口处使用我们提供的国际化组件，详见：[ConfigProvider 国际化](http://ant.design/components/config-provider-cn/)。

如有特殊需求（仅修改单一组件的语言），请使用 locale 参数，参考：[默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)。

```jsx
import locale from 'antd/es/date-picker/locale/zh_CN';

<DatePicker locale={locale} />;
```

**注意：**DatePicker、MonthPicker、RangePicker、WeekPicker 部分 locale 是从 value 中读取，所以请先正确设置 moment 的 locale。

```jsx
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

<DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />;
```

### 共同的 API

以下 API 为 DatePicker、MonthPicker、RangePicker, WeekPicker 共享的 API。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 是否显示清除按钮 | boolean | true |  |
| autoFocus | 自动获取焦点 | boolean | false |  |
| className | 选择器 className | string | '' |  |
| dateRender | 自定义日期单元格的内容 | function(currentDate: moment, today: moment) => React.ReactNode | - |  |
| disabled | 禁用 | boolean | false |  |
| disabledDate | 不可选择的日期 | (currentDate: moment) => boolean | 无 |  |
| dropdownClassName | 额外的弹出日历 className | string | - | 3.3.0 |
| getCalendarContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | 无 |  |
| locale | 国际化配置 | object | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| mode | 日期面板的状态（[设置后无法选择年份/月份？](/docs/react/faq#当我指定了-DatePicker/RangePicker-的-mode-属性后，点击后无法选择年份/月份？)） | `time|date|month|year|decade` | 'date' |  |
| open | 控制弹层是否展开 | boolean | - |  |
| placeholder | 输入框提示文字 | string\|RangePicker\[] | - |  |
| popupStyle | 额外的弹出日历样式 | object | {} |  |
| size | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | string | 无 |  |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - | 3.10.0 |
| style | 自定义输入框样式 | object | {} |  |
| onOpenChange | 弹出日历和关闭日历的回调 | function(status) | 无 |  |
| onPanelChange | 日历面板切换的回调 | function(value, mode) | - | 3.12.0 |

### 共同的方法

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

### DatePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期，如果开始时间或结束时间为 `null` 或者 `undefined`，日期范围将是一个开区间 | [moment](http://momentjs.com/) | 无 |  |
| defaultPickerValue | 默认面板日期 | [moment](http://momentjs.com/) | 无 | 3.10.8 |
| disabledTime | 不可选择的时间 | function(date) | 无 |  |
| format | 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 [moment.js](http://momentjs.com/) | string \| string[] | "YYYY-MM-DD" |  |
| renderExtraFooter | 在面板中添加额外的页脚 | (mode) => React.ReactNode | - |  |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](/components/time-picker/#API) |  |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/) | moment() |  |
| showToday | 是否展示“今天”按钮 | boolean | true |  |
| value | 日期 | [moment](http://momentjs.com/) | 无 |  |
| onChange | 时间发生变化的回调 | function(date: moment, dateString: string) | 无 |  |
| onOk | 点击确定按钮的回调 | function() | - |  |
| onPanelChange | 日期面板变化时的回调 | function(value, mode) | - | 3.5.0 |

### MonthPicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | 无 |  |
| defaultPickerValue | 默认面板日期 | [moment](http://momentjs.com/) | 无 | 3.10.8 |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-MM" |  |
| monthCellContentRender | 自定义的月份内容渲染方法 | function(date, locale): ReactNode | - |  |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |  |
| value | 日期 | [moment](http://momentjs.com/) | 无 |  |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment, dateString: string) | - |  |

### WeekPicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | - |  |
| defaultPickerValue | 默认面板日期 | [moment](http://momentjs.com/) | 无 | 3.10.8 |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-wo" |  |
| value | 日期 | [moment](http://momentjs.com/) | - |  |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment, dateString: string) | - |  |
| renderExtraFooter | 在面板中添加额外的页脚 | (mode) => React.ReactNode | - | 3.12.0 |

### RangePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/)\[] | 无 |  |
| defaultPickerValue | 默认面板日期 | [moment](http://momentjs.com/)\[] | 无 | 3.10.8 |
| disabledTime | 不可选择的时间 | function(dates: \[moment, moment\], partial: `'start'|'end'`) | 无 |  |
| format | 展示的日期格式 | string | "YYYY-MM-DD HH:mm:ss" |  |
| ranges | 预设时间范围快捷选择 | { \[range: string]: [moment](http://momentjs.com/)\[] } \| { \[range: string]: () => [moment](http://momentjs.com/)\[] } | 无 |  |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |  |
| separator | 设置分隔符 | string | '~' | 3.14.0 |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](/components/time-picker/#API) |  |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/)\[] | \[moment(), moment()] |  |
| value | 日期 | [moment](http://momentjs.com/)\[] | 无 |  |
| onCalendarChange | 待选日期发生变化的回调 | function(dates: \[moment, moment\], dateStrings: \[string, string\]) | 无 |  |
| onChange | 日期范围发生变化的回调 | function(dates: \[moment, moment\], dateStrings: \[string, string\]) | 无 |  |
| onOk | 点击确定按钮的回调 | function(dates: [moment](http://momentjs.com/)\[]) | - |  |

<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>

## FAQ

- [当我指定了 DatePicker/RangePicker 的 mode 属性后，点击后无法选择年份/月份？](/docs/react/faq#当我指定了-DatePicker/RangePicker-的-mode-属性后，点击后无法选择年份/月份？)


## index
```js
import * as React from 'react';
import RcCalendar from 'rc-calendar'; // 基础组件
import MonthCalendar from 'rc-calendar/lib/MonthCalendar'; // monthcalendar
import createPicker from './createPicker'; // 创建picker
import wrapPicker from './wrapPicker'; // wrappicker
import RangePicker from './RangePicker'; 
import WeekPicker from './WeekPicker'; 
import { DatePickerProps, DatePickerDecorator } from './interface'; // ts接口单独写抽离,多个地方引用
// 组件单一职责,使用多层HOC
const DatePicker = wrapPicker(createPicker(RcCalendar), 'date') as React.ClassicComponentClass<
  DatePickerProps
>;

const MonthPicker = wrapPicker(createPicker(MonthCalendar), 'month');

// 给DatePicker添加RangePicker,WeekPicker的静态属性
Object.assign(DatePicker, {
  RangePicker: wrapPicker(RangePicker, 'date'),
  MonthPicker,
  WeekPicker: wrapPicker(WeekPicker, 'week'),
});

export default DatePicker as DatePickerDecorator;

```

## createPicker
```js
import * as React from 'react';
import * as moment from 'moment';
import { polyfill } from 'react-lifecycles-compat';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar'; // 月
import RcDatePicker from 'rc-calendar/lib/Picker'; // 日期
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../icon';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning'; // error报错
import interopDefault from '../_util/interopDefault'; 
import getDataOrAriaProps from '../_util/getDataOrAriaProps';
import { formatDate } from './utils';

export interface PickerProps {
  value?: moment.Moment;
  open?: boolean;
  prefixCls: string;
}

export interface PickerState {
  open: boolean;
  value: moment.Moment | null;
  showDate: moment.Moment | null;
}

// 如果props.default存在使用default,否则直接props
export default function interopDefault(m: any) {
  return m.default || m;
}

export default function getDataOrAriaProps(props: any) {
    // 获取props所有的key,取出所有带data_/-的key值,有点像omit,使用一类数据
  return Object.keys(props).reduce((prev: any, key: string) => {
    if (
      (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') &&
      key.substr(0, 7) !== 'data-__'
    ) {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}

```

## 结构
```js
export default function createPicker(TheCalendar: React.ComponentClass): any {
  class CalenderWrapper extends React.Component<any, PickerState> {
    static defaultProps = {
      allowClear: true,
      showToday: true,
    };
    // state from props
    static getDerivedStateFromProps(nextProps: PickerProps, prevState: PickerState) {
      const state: Partial<PickerState> = {};
      let { open } = prevState;

      if ('open' in nextProps) {
        state.open = nextProps.open;
        open = nextProps.open || false;
      }
      if ('value' in nextProps) {
        state.value = nextProps.value;
        if (
          nextProps.value !== prevState.value ||
          (!open && nextProps.value !== prevState.showDate)
        ) {
          state.showDate = nextProps.value;
        }
      }
    //  判断state是否有key,来更新state
      return Object.keys(state).length > 0 ? state : null;
    }

    private input: any;

    private prefixCls?: string;

    constructor(props: any) {
      super(props);
      const value = props.value || props.defaultValue;
    //   判断value是否为moment对象
      if (value && !interopDefault(moment).isMoment(value)) {
        throw new Error(
          'The value/defaultValue of DatePicker or MonthPicker must be ' +
            'a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value',
        );
      }
      this.state = {
        value,
        showDate: value,
        open: false,
      };
    }
    // 更新
    componentDidUpdate(_: PickerProps, prevState: PickerState) {
      if (!('open' in this.props) && prevState.open && !this.state.open) {
        this.focus();
      }
    }

    saveInput = (node: any) => {
      this.input = node;
    };

    clearSelection = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      this.handleChange(null);
    };

    handleChange = (value: moment.Moment | null) => {
      const { props } = this;
    //   props没有value,直接修改
      if (!('value' in props)) {
        this.setState({
          value,
          showDate: value,
        });
      }
    //   显示的格式
      props.onChange(value, formatDate(value, props.format));
    };

    handleCalendarChange = (value: moment.Moment) => {
      this.setState({ showDate: value });
    };

    handleOpenChange = (open: boolean) => {
      const { onOpenChange } = this.props;
      if (!('open' in this.props)) {
        this.setState({ open });
      }

      if (onOpenChange) {
        onOpenChange(open);
      }
    };

    focus() {
      this.input.focus();
    }

    blur() {
      this.input.blur();
    }

    renderFooter = (...args: any[]) => {
      const { renderExtraFooter } = this.props;
      const { prefixCls } = this;
      return renderExtraFooter ? (
        <div className={`${prefixCls}-footer-extra`}>{renderExtraFooter(...args)}</div>
      ) : null;
    };

    renderPicker = ({ getPrefixCls }: ConfigConsumerProps) => {
      const { value, showDate, open } = this.state;
      const props = omit(this.props, ['onChange']);
      const { prefixCls: customizePrefixCls, locale, localeCode, suffixIcon } = props;

      const prefixCls = getPrefixCls('calendar', customizePrefixCls);
      // To support old version react.
      // Have to add prefixCls on the instance.
      // https://github.com/facebook/react/issues/12397
      this.prefixCls = prefixCls;

      const placeholder = 'placeholder' in props ? props.placeholder : locale.lang.placeholder;

      const disabledTime = props.showTime ? props.disabledTime : null;

      const calendarClassName = classNames({
        [`${prefixCls}-time`]: props.showTime,
        [`${prefixCls}-month`]: MonthCalendar === TheCalendar,
      });

      if (value && localeCode) {
        value.locale(localeCode);
      }

      let pickerProps: Object = {};
      let calendarProps: any = {};
      const pickerStyle: { minWidth?: number } = {};
      if (props.showTime) {
        calendarProps = {
          // fix https://github.com/ant-design/ant-design/issues/1902
          onSelect: this.handleChange,
        };
        pickerStyle.minWidth = 195;
      } else {
        pickerProps = {
          onChange: this.handleChange,
        };
      }
      if ('mode' in props) {
        calendarProps.mode = props.mode;
      }

      warning(
        !('onOK' in props),
        'DatePicker',
        'It should be `DatePicker[onOk]` or `MonthPicker[onOk]`, instead of `onOK`!',
      );
      const calendar = (
        <TheCalendar
          {...calendarProps}
          disabledDate={props.disabledDate}
          disabledTime={disabledTime}
          locale={locale.lang}
          timePicker={props.timePicker}
          defaultValue={props.defaultPickerValue || interopDefault(moment)()}
          dateInputPlaceholder={placeholder}
          prefixCls={prefixCls}
          className={calendarClassName}
          onOk={props.onOk}
          dateRender={props.dateRender}
          format={props.format}
          showToday={props.showToday}
          monthCellContentRender={props.monthCellContentRender}
          renderFooter={this.renderFooter}
          onPanelChange={props.onPanelChange}
          onChange={this.handleCalendarChange}
          value={showDate}
        />
      );

      const clearIcon =
        !props.disabled && props.allowClear && value ? (
          <Icon
            type="close-circle"
            className={`${prefixCls}-picker-clear`}
            onClick={this.clearSelection}
            theme="filled"
          />
        ) : null;

      const inputIcon = (suffixIcon &&
        (React.isValidElement<{ className?: string }>(suffixIcon) ? (
          React.cloneElement(suffixIcon, {
            className: classNames({
              [suffixIcon.props.className!]: suffixIcon.props.className,
              [`${prefixCls}-picker-icon`]: true,
            }),
          })
        ) : (
          <span className={`${prefixCls}-picker-icon`}>{suffixIcon}</span>
        ))) || <Icon type="calendar" className={`${prefixCls}-picker-icon`} />;

      const dataOrAriaProps = getDataOrAriaProps(props);
      const input = ({ value: inputValue }: { value: moment.Moment | null }) => (
        <div>
          <input
            ref={this.saveInput}
            disabled={props.disabled}
            readOnly
            value={formatDate(inputValue, props.format)}
            placeholder={placeholder}
            className={props.pickerInputClass}
            tabIndex={props.tabIndex}
            name={props.name}
            {...dataOrAriaProps}
          />
          {clearIcon}
          {inputIcon}
        </div>
      );

      return (
        <span
          id={props.id}
          className={classNames(props.className, props.pickerClass)}
          style={{ ...pickerStyle, ...props.style }}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          <RcDatePicker
            {...props}
            {...pickerProps}
            calendar={calendar}
            value={value}
            prefixCls={`${prefixCls}-picker-container`}
            style={props.popupStyle}
            open={open}
            onOpenChange={this.handleOpenChange}
          >
            {input}
          </RcDatePicker>
        </span>
      );
    };

    render() {
      return <ConfigConsumer>{this.renderPicker}</ConfigConsumer>;
    }
  }
  polyfill(CalenderWrapper);

  return CalenderWrapper;
}
```

## wrapPicker
```js
import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import classNames from 'classnames';
import * as moment from 'moment';
import enUS from './locale/en_US';
import interopDefault from '../_util/interopDefault';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { generateShowHourMinuteSecond } from '../time-picker';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';

type PickerType = 'date' | 'week' | 'month';

interface PickerMap {
  [name: string]: string;
}

const DEFAULT_FORMAT: PickerMap = {
  date: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  week: 'gggg-wo',
  month: 'YYYY-MM',
};

const LOCALE_FORMAT_MAPPING: PickerMap = {
  date: 'dateFormat',
  dateTime: 'dateTimeFormat',
  week: 'weekFormat',
  month: 'monthFormat',
};

```

### 结构
```js

export default function wrapPicker(Picker: React.ComponentClass<any>, pickerType: PickerType): any {
  class PickerWrapper extends React.Component<any, any> {
    static defaultProps = {
      transitionName: 'slide-up',
      popupStyle: {},
      onChange() {},
      onOk() {},
      onOpenChange() {},
      locale: {},
    };

    static getDerivedStateFromProps({ value, defaultValue }: any) {
    // 传值只做校验,不修改内部state
      checkValidate(defaultValue, 'defaultValue');
      checkValidate(value, 'value');
      return {};
    }

    // Since we need call `getDerivedStateFromProps` for check. Need leave an empty `state` here.
    state = {};

    private picker: any;

    componentDidMount() {
      const { autoFocus, disabled } = this.props;
      if (autoFocus && !disabled) {
        this.focus();
      }
    }
    // 拿到ref,方便做dom操作,focus,blur
    savePicker = (node: any) => {
        // picker对于当前节点
      this.picker = node;
    };
// 国际化
    getDefaultLocale = () => {
      const result = {
        ...enUS,
        ...this.props.locale,
      };
      result.lang = {
        ...result.lang,
        ...(this.props.locale || {}).lang,
      };
      return result;
    };

    handleOpenChange = (open: boolean) => {
      const { onOpenChange } = this.props;
      onOpenChange(open);
    };

    handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
      const { onFocus } = this.props;
      if (onFocus) {
        onFocus(e);
      }
    };

    handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
      const { onBlur } = this.props;
      if (onBlur) {
        onBlur(e);
      }
    };

    handleMouseEnter: React.MouseEventHandler<HTMLInputElement> = e => {
      const { onMouseEnter } = this.props;
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };

    handleMouseLeave: React.MouseEventHandler<HTMLInputElement> = e => {
      const { onMouseLeave } = this.props;
      if (onMouseLeave) {
        onMouseLeave(e);
      }
    };

    focus() {
      this.picker.focus();
    }

    blur() {
      this.picker.blur();
    }

    renderPicker = (locale: any, localeCode: string) => {
      const { format, showTime } = this.props;
      const mergedPickerType = showTime ? `${pickerType}Time` : pickerType;
      const mergedFormat =
        format ||
        locale[LOCALE_FORMAT_MAPPING[mergedPickerType]] ||
        DEFAULT_FORMAT[mergedPickerType];

      return (
        <ConfigConsumer>
          {({ getPrefixCls, getPopupContainer: getContextPopupContainer }: ConfigConsumerProps) => {
            const {
              prefixCls: customizePrefixCls,
              inputPrefixCls: customizeInputPrefixCls,
              getCalendarContainer,
              size,
              disabled,
            } = this.props;
            const getPopupContainer = getCalendarContainer || getContextPopupContainer;
            const prefixCls = getPrefixCls('calendar', customizePrefixCls);
            const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
            const pickerClass = classNames(`${prefixCls}-picker`, {
              [`${prefixCls}-picker-${size}`]: !!size,
            });
            const pickerInputClass = classNames(`${prefixCls}-picker-input`, inputPrefixCls, {
              [`${inputPrefixCls}-lg`]: size === 'large',
              [`${inputPrefixCls}-sm`]: size === 'small',
              [`${inputPrefixCls}-disabled`]: disabled,
            });

            const timeFormat = (showTime && showTime.format) || 'HH:mm:ss';
            const rcTimePickerProps = {
                // 需要显示的时间
              ...generateShowHourMinuteSecond(timeFormat),
              format: timeFormat,
              use12Hours: showTime && showTime.use12Hours,
            };
            const columns = getColumns(rcTimePickerProps);
            const timePickerCls = `${prefixCls}-time-picker-column-${columns}`;
            const timePicker = showTime ? (
              <TimePickerPanel
                {...rcTimePickerProps}
                {...showTime}
                prefixCls={`${prefixCls}-time-picker`}
                className={timePickerCls}
                placeholder={locale.timePickerLocale.placeholder}
                transitionName="slide-up"
                onEsc={() => {}}
              />
            ) : null;

            return (
              <Picker
                {...this.props}
                getCalendarContainer={getPopupContainer}
                format={mergedFormat}
                ref={this.savePicker}
                pickerClass={pickerClass}
                pickerInputClass={pickerInputClass}
                locale={locale}
                localeCode={localeCode}
                timePicker={timePicker}
                onOpenChange={this.handleOpenChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              />
            );
          }}
        </ConfigConsumer>
      );
    };

    render() {
      return (
        <LocaleReceiver componentName="DatePicker" defaultLocale={this.getDefaultLocale}>
          {this.renderPicker}
        </LocaleReceiver>
      );
    }
  }

  polyfill(PickerWrapper);
  return PickerWrapper;
}

function getColumns({ showHour, showMinute, showSecond, use12Hours }: any) {
  let column = 0;
  if (showHour) {
    column += 1;
  }
  if (showMinute) {
    column += 1;
  }
  if (showSecond) {
    column += 1;
  }
  if (use12Hours) {
    column += 1;
  }
  return column;
}

function checkValidate(value: any, propName: string) {
    // 全部转化成数组
  const values: any[] = Array.isArray(value) ? value : [value];
  values.forEach(val => {
    if (!val) return;

    warning(
      !interopDefault(moment).isMoment(val) || val.isValid(),
      'DatePicker',
      `\`${propName}\` provides invalidate moment time. If you want to set empty value, use \`null\` instead.`,
    );
  });
}

```


## weekpicker
```js
import * as React from 'react';
import * as moment from 'moment';
import { polyfill } from 'react-lifecycles-compat';
import Calendar from 'rc-calendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import classNames from 'classnames';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import interopDefault from '../_util/interopDefault';
import InputIcon from './InputIcon';

function formatValue(value: moment.Moment | null, format: string): string {
  return (value && value.format(format)) || '';
}

interface WeekPickerState {
  open: boolean;
  value: moment.Moment | null;
}

class WeekPicker extends React.Component<any, WeekPickerState> {
  static defaultProps = {
    format: 'gggg-wo',
    allowClear: true,
  };

  static getDerivedStateFromProps(nextProps: any) {
    if ('value' in nextProps || 'open' in nextProps) {
      const state = {} as WeekPickerState;
      if ('value' in nextProps) {
        state.value = nextProps.value;
      }
      if ('open' in nextProps) {
        state.open = nextProps.open;
      }
      return state;
    }
    return null;
  }

  private input: any;

  private prefixCls?: string;

  constructor(props: any) {
    super(props);
    const value = props.value || props.defaultValue;
    if (value && !interopDefault(moment).isMoment(value)) {
      throw new Error(
        'The value/defaultValue of WeekPicker must be ' +
          'a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value',
      );
    }
    this.state = {
      value,
      open: props.open,
    };
  }

  componentDidUpdate(_: any, prevState: WeekPickerState) {
    if (!('open' in this.props) && prevState.open && !this.state.open) {
      this.focus();
    }
  }

  saveInput = (node: any) => {
    this.input = node;
  };

  weekDateRender = (current: any) => {
    const selectedValue = this.state.value;
    const { prefixCls } = this;
    // 组件外层定义的dateRender 自定义日期格式
    const { dateRender } = this.props;
    const dateNode = dateRender ? dateRender(current) : current.date();
    if (
      selectedValue &&
      current.year() === selectedValue.year() &&
      current.week() === selectedValue.week()
    ) {
      return (
        <div className={`${prefixCls}-selected-day`}>
          <div className={`${prefixCls}-date`}>{dateNode}</div>
        </div>
      );
    }
    return <div className={`${prefixCls}-date`}>{dateNode}</div>;
  };

  handleChange = (value: moment.Moment | null) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.props.onChange(value, formatValue(value, this.props.format));
  };

  handleOpenChange = (open: boolean) => {
    const { onOpenChange } = this.props;
    if (!('open' in this.props)) {
      this.setState({ open });
    }

    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  clearSelection = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.handleChange(null);
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  renderFooter = (...args: any[]) => {
    const { prefixCls, renderExtraFooter } = this.props;
    return renderExtraFooter ? (
      <div className={`${prefixCls}-footer-extra`}>{renderExtraFooter(...args)}</div>
    ) : null;
  };

  renderWeekPicker = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      disabled,
      pickerClass,
      popupStyle,
      pickerInputClass,
      format,
      allowClear,
      locale,
      localeCode,
      disabledDate,
      style,
      onFocus,
      onBlur,
      id,
      suffixIcon,
      defaultPickerValue,
    } = this.props;

    const prefixCls = getPrefixCls('calendar', customizePrefixCls);
    // To support old version react.
    // Have to add prefixCls on the instance.
    // https://github.com/facebook/react/issues/12397
    this.prefixCls = prefixCls;

    const { open, value: pickerValue } = this.state;
    if (pickerValue && localeCode) {
      pickerValue.locale(localeCode);
    }

    const placeholder =
      'placeholder' in this.props ? this.props.placeholder : locale.lang.placeholder;

    const calendar = (
      <Calendar
        showWeekNumber
        dateRender={this.weekDateRender}
        prefixCls={prefixCls}
        format={format}
        locale={locale.lang}
        showDateInput={false}
        showToday={false}
        disabledDate={disabledDate}
        renderFooter={this.renderFooter}
        defaultValue={defaultPickerValue}
      />
    );
    const clearIcon =
      !disabled && allowClear && this.state.value ? (
        <Icon
          type="close-circle"
          className={`${prefixCls}-picker-clear`}
          onClick={this.clearSelection}
          theme="filled"
        />
      ) : null;

    const inputIcon = <InputIcon suffixIcon={suffixIcon} prefixCls={prefixCls} />;

    const input = ({ value }: { value: moment.Moment | undefined }) => (
      <span style={{ display: 'inline-block', width: '100%' }}>
        <input
          ref={this.saveInput}
          disabled={disabled}
          readOnly
          value={(value && value.format(format)) || ''}
          placeholder={placeholder}
          className={pickerInputClass}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {clearIcon}
        {inputIcon}
      </span>
    );
    return (
      <span className={classNames(className, pickerClass)} style={style} id={id}>
        <RcDatePicker
          {...this.props}
          calendar={calendar}
          prefixCls={`${prefixCls}-picker-container`}
          value={pickerValue}
          onChange={this.handleChange}
          open={open}
          onOpenChange={this.handleOpenChange}
          style={popupStyle}
        >
          {input}
        </RcDatePicker>
      </span>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderWeekPicker}</ConfigConsumer>;
  }
}

polyfill(WeekPicker);

export default WeekPicker;

```

## rangePicker
```js
/* tslint:disable jsx-no-multiline-js */
import * as React from 'react';
import * as moment from 'moment';
import { polyfill } from 'react-lifecycles-compat';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import Icon from '../icon';
import Tag from '../tag';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';
import interopDefault from '../_util/interopDefault';
import { RangePickerValue, RangePickerPresetRange, RangePickerProps } from './interface';
import { formatDate } from './utils';
import InputIcon from './InputIcon';

export interface RangePickerState {
  value?: RangePickerValue;
  showDate?: RangePickerValue;
  open?: boolean;
  hoverValue?: RangePickerValue;
}

function getShowDateFromValue(value: RangePickerValue, mode?: string | string[]) {
  const [start, end] = value;
  // value could be an empty array, then we should not reset showDate
  if (!start && !end) {
    return;
  }
  if (mode && mode[0] === 'month') {
    return [start, end] as RangePickerValue;
  }
  const newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
  return [start, newEnd] as RangePickerValue;
}

function pickerValueAdapter(
  value?: moment.Moment | RangePickerValue,
): RangePickerValue | undefined {
  if (!value) {
    return;
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value, value.clone().add(1, 'month')];
}

function isEmptyArray(arr: any) {
  if (Array.isArray(arr)) {
    return arr.length === 0 || arr.every(i => !i);
  }
  return false;
}

function fixLocale(value: RangePickerValue | undefined, localeCode: string | undefined) {
  if (!localeCode) {
    return;
  }
  if (!value || value.length === 0) {
    return;
  }
  const [start, end] = value;
  if (start) {
    start!.locale(localeCode);
  }
  if (end) {
    end!.locale(localeCode);
  }
}

class RangePicker extends React.Component<RangePickerProps, RangePickerState> {
  static defaultProps = {
    allowClear: true,
    showToday: false,
    separator: '~',
  };

  static getDerivedStateFromProps(nextProps: RangePickerProps, prevState: RangePickerState) {
    let state = null;
    if ('value' in nextProps) {
      const value = nextProps.value || [];
      state = {
        value,
      };
      if (!shallowequal(nextProps.value, prevState.value)) {
        state = {
          ...state,
          showDate: getShowDateFromValue(value, nextProps.mode) || prevState.showDate,
        };
      }
    }
    if ('open' in nextProps && prevState.open !== nextProps.open) {
      state = {
        ...state,
        open: nextProps.open,
      };
    }
    return state;
  }

  private picker: HTMLSpanElement;

  private prefixCls?: string;

  private tagPrefixCls?: string;

  constructor(props: any) {
    super(props);
    const value = props.value || props.defaultValue || [];
    const [start, end] = value;
    if (
      (start && !interopDefault(moment).isMoment(start)) ||
      (end && !interopDefault(moment).isMoment(end))
    ) {
      throw new Error(
        'The value/defaultValue of RangePicker must be a moment object array after `antd@2.0`, ' +
          'see: https://u.ant.design/date-picker-value',
      );
    }
    const pickerValue = !value || isEmptyArray(value) ? props.defaultPickerValue : value;
    this.state = {
      value,
      showDate: pickerValueAdapter(pickerValue || interopDefault(moment)()),
      open: props.open,
      hoverValue: [],
    };
  }

  componentDidUpdate(_: any, prevState: RangePickerState) {
    if (!('open' in this.props) && prevState.open && !this.state.open) {
      this.focus();
    }
  }

  setValue(value: RangePickerValue, hidePanel?: boolean) {
    this.handleChange(value);
    if ((hidePanel || !this.props.showTime) && !('open' in this.props)) {
      this.setState({ open: false });
    }
  }

  savePicker = (node: HTMLSpanElement) => {
    this.picker = node;
  };

  clearSelection = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ value: [] });
    this.handleChange([]);
  };

  clearHoverValue = () => this.setState({ hoverValue: [] });

  handleChange = (value: RangePickerValue) => {
    const { props } = this;
    if (!('value' in props)) {
      this.setState(({ showDate }) => ({
        value,
        showDate: getShowDateFromValue(value) || showDate,
      }));
    }
    if (value[0] && value[0].diff(value[1]) > 0) {
      value[1] = undefined;
    }
    const [start, end] = value;
    if (typeof props.onChange === 'function') {
      props.onChange(value, [formatDate(start, props.format), formatDate(end, props.format)]);
    }
  };

  handleOpenChange = (open: boolean) => {
    if (!('open' in this.props)) {
      this.setState({ open });
    }

    if (open === false) {
      this.clearHoverValue();
    }

    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  handleShowDateChange = (showDate: RangePickerValue) => this.setState({ showDate });

  handleHoverChange = (hoverValue: any) => this.setState({ hoverValue });

  handleRangeMouseLeave = () => {
    if (this.state.open) {
      this.clearHoverValue();
    }
  };

  handleCalendarInputSelect = (value: RangePickerValue) => {
    const [start] = value;
    if (!start) {
      return;
    }
    this.setState(({ showDate }) => ({
      value,
      showDate: getShowDateFromValue(value) || showDate,
    }));
  };

  handleRangeClick = (value: RangePickerPresetRange) => {
    if (typeof value === 'function') {
      value = value();
    }

    this.setValue(value, true);

    const { onOk, onOpenChange } = this.props;
    if (onOk) {
      onOk(value);
    }

    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  focus() {
    this.picker.focus();
  }

  blur() {
    this.picker.blur();
  }

  renderFooter = () => {
    const { ranges, renderExtraFooter } = this.props;
    const { prefixCls, tagPrefixCls } = this;
    if (!ranges && !renderExtraFooter) {
      return null;
    }
    const customFooter = renderExtraFooter ? (
      <div className={`${prefixCls}-footer-extra`} key="extra">
        {renderExtraFooter()}
      </div>
    ) : null;
    const operations =
      ranges &&
      Object.keys(ranges).map(range => {
        const value = ranges[range];
        const hoverValue = typeof value === 'function' ? value.call(this) : value;
        return (
          <Tag
            key={range}
            prefixCls={tagPrefixCls}
            color="blue"
            onClick={() => this.handleRangeClick(value)}
            onMouseEnter={() => this.setState({ hoverValue })}
            onMouseLeave={this.handleRangeMouseLeave}
          >
            {range}
          </Tag>
        );
      });
    const rangeNode =
      operations && operations.length > 0 ? (
        <div className={`${prefixCls}-footer-extra ${prefixCls}-range-quick-selector`} key="range">
          {operations}
        </div>
      ) : null;
    return [rangeNode, customFooter];
  };

  renderRangePicker = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { state, props } = this;
    const { value, showDate, hoverValue, open } = state;
    const {
      prefixCls: customizePrefixCls,
      tagPrefixCls: customizeTagPrefixCls,
      popupStyle,
      style,
      disabledDate,
      disabledTime,
      showTime,
      showToday,
      ranges,
      onOk,
      locale,
      // @ts-ignore
      localeCode,
      format,
      dateRender,
      onCalendarChange,
      suffixIcon,
      separator,
    } = props;

    const prefixCls = getPrefixCls('calendar', customizePrefixCls);
    const tagPrefixCls = getPrefixCls('tag', customizeTagPrefixCls);
    // To support old version react.
    // Have to add prefixCls on the instance.
    // https://github.com/facebook/react/issues/12397
    this.prefixCls = prefixCls;
    this.tagPrefixCls = tagPrefixCls;

    fixLocale(value, localeCode);
    fixLocale(showDate, localeCode);

    warning(
      !('onOK' in props),
      'RangePicker',
      'It should be `RangePicker[onOk]`, instead of `onOK`!',
    );

    const calendarClassName = classNames({
      [`${prefixCls}-time`]: showTime,
      [`${prefixCls}-range-with-ranges`]: ranges,
    });

    // 需要选择时间时，点击 ok 时才触发 onChange
    const pickerChangeHandler = {
      onChange: this.handleChange,
    };
    let calendarProps: any = {
      onOk: this.handleChange,
    };
    if (props.timePicker) {
      pickerChangeHandler.onChange = changedValue => this.handleChange(changedValue);
    } else {
      calendarProps = {};
    }
    if ('mode' in props) {
      calendarProps.mode = props.mode;
    }

    const startPlaceholder = Array.isArray(props.placeholder)
      ? props.placeholder[0]
      : locale.lang.rangePlaceholder[0];
    const endPlaceholder = Array.isArray(props.placeholder)
      ? props.placeholder[1]
      : locale.lang.rangePlaceholder[1];

    const calendar = (
      <RangeCalendar
        {...calendarProps}
        seperator={separator}
        onChange={onCalendarChange}
        format={format}
        prefixCls={prefixCls}
        className={calendarClassName}
        renderFooter={this.renderFooter}
        timePicker={props.timePicker}
        disabledDate={disabledDate}
        disabledTime={disabledTime}
        dateInputPlaceholder={[startPlaceholder, endPlaceholder]}
        locale={locale.lang}
        onOk={onOk}
        dateRender={dateRender}
        value={showDate}
        onValueChange={this.handleShowDateChange}
        hoverValue={hoverValue}
        onHoverChange={this.handleHoverChange}
        onPanelChange={props.onPanelChange}
        showToday={showToday}
        onInputSelect={this.handleCalendarInputSelect}
      />
    );

    // default width for showTime
    const pickerStyle = {} as any;
    if (props.showTime) {
      pickerStyle.width = (style && style.width) || 350;
    }
    const [startValue, endValue] = value as RangePickerValue;
    const clearIcon =
      !props.disabled && props.allowClear && value && (startValue || endValue) ? (
        <Icon
          type="close-circle"
          className={`${prefixCls}-picker-clear`}
          onClick={this.clearSelection}
          theme="filled"
        />
      ) : null;

    const inputIcon = <InputIcon suffixIcon={suffixIcon} prefixCls={prefixCls} />;

    const input = ({ value: inputValue }: { value: any }) => {
      const [start, end] = inputValue;
      return (
        <span className={props.pickerInputClass}>
          <input
            disabled={props.disabled}
            readOnly
            value={formatDate(start, props.format)}
            placeholder={startPlaceholder}
            className={`${prefixCls}-range-picker-input`}
            tabIndex={-1}
          />
          <span className={`${prefixCls}-range-picker-separator`}> {separator} </span>
          <input
            disabled={props.disabled}
            readOnly
            value={formatDate(end, props.format)}
            placeholder={endPlaceholder}
            className={`${prefixCls}-range-picker-input`}
            tabIndex={-1}
          />
          {clearIcon}
          {inputIcon}
        </span>
      );
    };

    return (
      <span
        ref={this.savePicker}
        id={typeof props.id === 'number' ? props.id.toString() : props.id}
        className={classNames(props.className, props.pickerClass)}
        style={{ ...style, ...pickerStyle }}
        tabIndex={props.disabled ? -1 : 0}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <RcDatePicker
          {...props}
          {...pickerChangeHandler}
          calendar={calendar}
          value={value}
          open={open}
          onOpenChange={this.handleOpenChange}
          prefixCls={`${prefixCls}-picker-container`}
          style={popupStyle}
        >
          {input}
        </RcDatePicker>
      </span>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderRangePicker}</ConfigConsumer>;
  }
}

polyfill(RangePicker);

export default RangePicker;

```