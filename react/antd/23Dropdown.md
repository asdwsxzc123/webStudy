---
category: Components
subtitle: 下拉菜单
type: 导航
title: Dropdown
---

向下弹出的列表。

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

## API

属性如下

| 参数              | 说明                                                                                                                                                          | 类型                                      | 默认值                | 版本   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | --------------------- | ------ |
| disabled          | 菜单是否禁用                                                                                                                                                  | boolean                                   | -                     |        |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | Function(triggerNode)                     | `() => document.body` |        |
| overlay           | 菜单                                                                                                                                                          | [Menu](/components/menu) \| () => Menu    | -                     |        |
| overlayClassName  | 下拉根元素的类名称                                                                                                                                            | string                                    | -                     | 3.11.0 |
| overlayStyle      | 下拉根元素的样式                                                                                                                                              | object                                    | -                     | 3.11.0 |
| placement         | 菜单弹出位置：`bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight`                                                                      | String                                    | `bottomLeft`          |        |
| trigger           | 触发下拉的行为, 移动端不支持 hover                                                                                                                            | Array&lt;`click`\|`hover`\|`contextMenu`> | `['hover']`           |        |
| visible           | 菜单是否显示                                                                                                                                                  | boolean                                   | -                     |        |
| onVisibleChange   | 菜单显示状态改变时调用，参数为 visible                                                                                                                        | Function(visible)                         | -                     |        |

`overlay` 菜单使用 [Menu](/components/menu/)，还包括菜单项 `Menu.Item`，分割线 `Menu.Divider`。

> 注意： Menu.Item 必须设置唯一的 key 属性。
>
> Dropdown 下的 Menu 默认不可选中。如果需要菜单可选中，可以指定 `<Menu selectable>`.

### Dropdown.Button

| 参数            | 说明                                                                                     | 类型                                      | 默认值       | 版本   |
| --------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------- | ------------ | ------ |
| disabled        | 菜单是否禁用                                                                             | boolean                                   | -            |        |
| icon            | 右侧的 icon                                                                              | ReactNode                                 | -            | 3.17.0 |
| overlay         | 菜单                                                                                     | [Menu](/components/menu/)                 | -            |        |
| placement       | 菜单弹出位置：`bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight` | String                                    | `bottomLeft` |        |
| size            | 按钮大小，和 [Button](/components/button/) 一致                                          | string                                    | 'default'    |        |
| trigger         | 触发下拉的行为                                                                           | Array&lt;`click`\|`hover`\|`contextMenu`> | `['hover']`  |        |
| type            | 按钮类型，和 [Button](/components/button/) 一致                                          | string                                    | 'default'    |        |
| visible         | 菜单是否显示                                                                             | boolean                                   | -            |        |
| onClick         | 点击左侧按钮的回调，和 [Button](/components/button/) 一致                                | Function                                  | -            |        |
| onVisibleChange | 菜单显示状态改变时调用，参数为 visible                                                   | Function                                  | -            |        |

## 引入文件

```js
import * as React from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import DropdownButton from './dropdown-button';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';
import Icon from '../icon';
import { tuple } from '../_util/type';

const Placements = tuple(
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
);
type Placement = (typeof Placements)[number];

type OverlayFunc = () => React.ReactNode;

type Align = {
  points?: [string, string];
  offset?: [number, number];
  targetOffset?: [number, number];
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
};

export interface DropDownProps {
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlay: React.ReactNode | OverlayFunc;
  onVisibleChange?: (visible: boolean) => void;
  visible?: boolean;
  disabled?: boolean;
  align?: Align;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  className?: string;
  transitionName?: string;
  placement?: Placement;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  forceRender?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  openClassName?: string;
}
```

## 结构

```js
export default class Dropdown extends React.Component<DropDownProps, any> {
  static Button: typeof DropdownButton;

  static defaultProps = {
    mouseEnterDelay: 0.15, // 移入和移出延时操作
    mouseLeaveDelay: 0.1, // 移入和移出延时操作
    placement: 'bottomLeft' as Placement,
  };

  getTransitionName() {
    const { placement = '', transitionName } = this.props;
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.indexOf('top') >= 0) {
      return 'slide-down';
    }
    return 'slide-up';
  }

  renderOverlay = (prefixCls: string) => {
    // rc-dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to rc-dropdown.
    const { overlay } = this.props;

    let overlayNode;
    if (typeof overlay === 'function') {
      overlayNode = (overlay as OverlayFunc)();
    } else {
      overlayNode = overlay;
    }
    // 返回 children 中 仅有的子级。否则抛出异常。这里仅有的子级，only方法接受的参数只能是一个对象，不能是多个对象（数组）。
    overlayNode = React.Children.only(overlayNode) as React.ReactElement<any>;

    const overlayProps = overlayNode.props;

    // Warning if use other mode
    warning(
      !overlayProps.mode || overlayProps.mode === 'vertical',
      'Dropdown',
      `mode="${overlayProps.mode}" is not supported for Dropdown's Menu.`,
    );

    // menu cannot be selectable in dropdown defaultly
    // menu should be focusable in dropdown defaultly
    const { selectable = false, focusable = true } = overlayProps;

    const expandIcon = (
      <span className={`${prefixCls}-menu-submenu-arrow`}>
        <Icon type="right" className={`${prefixCls}-menu-submenu-arrow-icon`} />
      </span>
    );

    const fixedModeOverlay =
      typeof overlayNode.type === 'string'
        ? overlay
        // 克隆react节点
        : React.cloneElement(overlayNode, {
            mode: 'vertical',
            selectable,
            focusable,
            expandIcon,
          });

    return fixedModeOverlay;
  };

  renderDropDown = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      children,
      trigger,
      disabled,
      getPopupContainer,
    } = this.props;

    const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
    const child = React.Children.only(children) as React.ReactElement<any>;

    const dropdownTrigger = React.cloneElement(child, {
      className: classNames(child.props.className, `${prefixCls}-trigger`),
      disabled,
    });

    const triggerActions = disabled ? [] : trigger;
    let alignPoint;
    if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
      alignPoint = true;
    }

    return (
      <RcDropdown
        alignPoint={alignPoint}
        {...this.props}
        prefixCls={prefixCls}
        getPopupContainer={getPopupContainer || getContextPopupContainer}
        transitionName={this.getTransitionName()}
        trigger={triggerActions}
        overlay={() => this.renderOverlay(prefixCls)}
      >
        {dropdownTrigger}
      </RcDropdown>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderDropDown}</ConfigConsumer>;
  }
}
```

## dropdown-button

```js
import * as React from 'react';
import classNames from 'classnames';
import Button from '../button'; // Button组件
import { ButtonHTMLType } from '../button/button'; // ts Button
import { ButtonGroupProps } from '../button/button-group'; // ts
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Dropdown, { DropDownProps } from './dropdown';
import Icon from '../icon';

const ButtonGroup = Button.Group;

type DropdownButtonType = 'primary' | 'ghost' | 'dashed';

export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
  type?: DropdownButtonType;
  htmlType?: ButtonHTMLType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * @since 3.17.0
   */
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  title?: string;
}

export default class DropdownButton extends React.Component<DropdownButtonProps, any> {
  static defaultProps = {
    placement: 'bottomRight' as DropDownProps['placement'],
    type: 'default' as DropdownButtonType,
  };

  renderButton = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      type,
      disabled,
      onClick,
      htmlType,
      children,
      className,
      overlay,
      trigger,
      align,
      visible,
      onVisibleChange,
      placement,
      getPopupContainer,
      href,
      icon = <Icon type="ellipsis" />,
      title,
      ...restProps
    } = this.props;

    const prefixCls = getPrefixCls('dropdown-button', customizePrefixCls);
    const dropdownProps = {
      align,
      overlay,
      disabled,
      trigger: disabled ? [] : trigger,
      onVisibleChange,
      placement,
      getPopupContainer: getPopupContainer || getContextPopupContainer,
    } as DropDownProps;
    // visible,来自哪里,如果没有传入visible,为什么可以显示隐藏,应该是rc-dropdown内部实现了点击实现,通过state
    if ('visible' in this.props) {
      dropdownProps.visible = visible;
    }

    return (
      <ButtonGroup {...restProps} className={classNames(prefixCls, className)}>
        <Button
          type={type}
          disabled={disabled}
          onClick={onClick}
          htmlType={htmlType}
          href={href}
          title={title}
        >
          {children}
        </Button>
        <Dropdown {...dropdownProps}>
          <Button type={type}>{icon}</Button>
        </Dropdown>
      </ButtonGroup>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderButton}</ConfigConsumer>;
  }
}

```
