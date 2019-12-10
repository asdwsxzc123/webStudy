---
category: Components
subtitle: 布局
type: 布局
cols: 1
title: Layout
---

协助进行页面级整体布局。

## 设计规则

### 尺寸

一级导航项偏左靠近 logo 放置，辅助菜单偏右放置。

- 顶部导航（大部分系统）：一级导航高度 `64px`，二级导航 `48px`。
- 顶部导航（展示类页面）：一级导航高度 `80px`，二级导航 `56px`。
- 顶部导航高度的范围计算公式为：`48+8n`。
- 侧边导航宽度的范围计算公式：`200+8n`。

### 交互

- 一级导航和末级的导航需要在可视化的层面被强调出来；
- 当前项应该在呈现上优先级最高；
- 当导航收起的时候，当前项的样式自动赋予给它的上一个层级；
- 左侧导航栏的收放交互同时支持手风琴和全展开的样式，根据业务的要求进行适当的选择。

### 视觉

导航样式上需要根据信息层级合理的选择样式：

- **大色块强调**

  建议用于底色为深色系时，当前页面父级的导航项。

- **高亮火柴棍**

  当导航栏底色为浅色系时使用，可用于当前页面对应导航项，建议尽量在导航路径的最终项使用。

- **字体高亮变色**

  从可视化层面，字体高亮的视觉强化力度低于大色块，通常在当前项的上一级使用。

- **字体放大**

  `12px`、`14px` 是导航的标准字号，14 号字体用在一、二级导航中。字号可以考虑导航项的等级做相应选择。

## 组件概述

- `Layout`：布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身，可以放在任何父容器中。
- `Header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Footer`：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。

> 注意：采用 flex 布局实现，请注意[浏览器兼容性](http://caniuse.com/#search=flex)问题。

## API

```jsx
<Layout>
  <Header>header</Header>
  <Layout>
    <Sider>left sidebar</Sider>
    <Content>main content</Content>
    <Sider>right sidebar</Sider>
  </Layout>
  <Footer>footer</Footer>
</Layout>
```

### Layout

布局容器。

| 参数      | 说明                                                               | 类型    | 默认值 | 版本  |
| --------- | ------------------------------------------------------------------ | ------- | ------ | ----- |
| className | 容器 className                                                     | string  | -      |       |
| hasSider  | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | boolean | -      | 3.2.0 |
| style     | 指定样式                                                           | object  | -      |       |

> `Layout.Header` `Layout.Footer` `Layout.Content` API 与 `Layout` 相同

### Layout.Sider

侧边栏。

| 参数             | 说明                                                                 | 类型                                         | 默认值 | 版本  |
| ---------------- | -------------------------------------------------------------------- | -------------------------------------------- | ------ | ----- |
| breakpoint       | 触发响应式布局的[断点](/components/grid#api)                         | Enum { 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' } | -      |       |
| className        | 容器 className                                                       | string                                       | -      |       |
| collapsed        | 当前收起状态                                                         | boolean                                      | -      |       |
| collapsedWidth   | 收缩宽度，设置为 0 会出现特殊 trigger                                | number                                       | 80     |       |
| collapsible      | 是否可收起                                                           | boolean                                      | false  |       |
| defaultCollapsed | 是否默认收起                                                         | boolean                                      | false  |       |
| reverseArrow     | 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用                    | boolean                                      | false  |       |
| style            | 指定样式                                                             | object                                       | -      |       |
| theme            | 主题颜色                                                             | string: `light` `dark`                       | `dark` | 3.6.0 |
| trigger          | 自定义 trigger，设置为 null 时隐藏 trigger                           | string\|ReactNode                            | -      |       |
| width            | 宽度                                                                 | number\|string                               | 200    |       |
| onCollapse       | 展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 | (collapsed, type) => {}                      | -      |       |
| onBreakpoint     | 触发响应式布局[断点](/components/grid#api)时的回调                   | (broken) => {}                               | -      | 3.7.0 |

#### breakpoint width

```js
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}
```

## 引入文件

```js
import * as React from 'react';
import classNames from 'classnames';
import createContext from '@ant-design/create-react-context';
import { SiderProps } from './Sider';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface GeneratorProps {
  suffixCls: string;
  tagName: 'header' | 'footer' | 'main' | 'section';
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  hasSider?: boolean;
}

export interface LayoutContextProps {
  siderHook: {
    addSider: (id: string) => void,
    removeSider: (id: string) => void
  };
}
export const LayoutContext =
  createContext <
  LayoutContextProps >
  {
    siderHook: {
      addSider: () => null,
      removeSider: () => null
    }
  };

interface BasicPropsWithTagName extends BasicProps {
  tagName: 'header' | 'footer' | 'main' | 'section';
}
```

## 结构

```js
interface BasicPropsWithTagName extends BasicProps {
  tagName: 'header' | 'footer' | 'main' | 'section';
}

// Hoc
function generator({ suffixCls, tagName }: GeneratorProps) {
  return (BasicComponent: any) => {
    return class Adapter extends React.Component<BasicProps, any> {
      static Header: any;

      static Footer: any;

      static Content: any;

      static Sider: any;

      renderComponent = ({ getPrefixCls }: ConfigConsumerProps) => {
        const { prefixCls: customizePrefixCls } = this.props;
        const prefixCls = getPrefixCls(suffixCls, customizePrefixCls);

        return (
          <BasicComponent
            prefixCls={prefixCls}
            tagName={tagName}
            {...this.props}
          />
        );
      };

      render() {
        return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
      }
    };
  };
}

const Basic = (props: BasicPropsWithTagName) => {
  const { prefixCls, className, children, tagName, ...others } = props;
  const classString = classNames(className, prefixCls);
  return React.createElement(
    tagName,
    { className: classString, ...others },
    children
  );
};

interface BasicLayoutState {
  siders: string[];
}

class BasicLayout extends React.Component<
  BasicPropsWithTagName,
  BasicLayoutState
> {
  state = { siders: [] };

  getSiderHook() {
    return {
      // 添加sider id
      addSider: (id: string) => {
        this.setState(state => ({
          // 直接通过拓展运算符添加,没有使用push
          siders: [...state.siders, id]
        }));
      },
      // 移除sider的id
      removeSider: (id: string) => {
        this.setState(state => ({
          // 直接通过filter来移除,而不是使用slice
          siders: state.siders.filter(currentId => currentId !== id)
        }));
      }
    };
  }

  render() {
    const {
      prefixCls,
      className,
      children,
      hasSider,
      tagName: Tag,
      ...others
    } = this.props;
    const classString = classNames(className, prefixCls, {
      [`${prefixCls}-has-sider`]:
        typeof hasSider === 'boolean' ? hasSider : this.state.siders.length > 0
    });

    return (
      // context,添加属性个子元素
      <LayoutContext.Provider value={{ siderHook: this.getSiderHook() }}>
        <Tag className={classString} {...others}>
          {children}
        </Tag>
      </LayoutContext.Provider>
    );
  }
}

const Layout: React.ComponentClass<BasicProps> & {
  Header: React.ComponentClass<BasicProps>,
  Footer: React.ComponentClass<BasicProps>,
  Content: React.ComponentClass<BasicProps>,
  Sider: React.ComponentClass<SiderProps>
} = generator({
  suffixCls: 'layout',
  tagName: 'section'
})(BasicLayout);

const Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header'
})(Basic);

const Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer'
})(Basic);

const Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main'
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
```

## Sider

```js
import createContext, { Context } from '@ant-design/create-react-context';

import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import omit from 'omit.js';
import { LayoutContext, LayoutContextProps } from './layout';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';
import isNumeric from '../_util/isNumeric';

const isNumeric = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export default isNumeric;

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {}
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

const dimensionMap = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px'
};

export interface SiderContextProps {
  siderCollapsed?: boolean;
  collapsedWidth?: string | number;
}

export const SiderContext: Context<SiderContextProps> = createContext({});

export type CollapseType = 'clickTrigger' | 'responsive';

export type SiderTheme = 'light' | 'dark';

export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  reverseArrow?: boolean;
  onCollapse?: (collapsed: boolean, type: CollapseType) => void;
  trigger?: React.ReactNode;
  width?: number | string;
  collapsedWidth?: number | string;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  theme?: SiderTheme;
  onBreakpoint?: (broken: boolean) => void;
}

type InternalSideProps = SiderProps & LayoutContextProps;

export interface SiderState {
  collapsed?: boolean;
  below: boolean;
  belowShow?: boolean;
}
```

## Sider 结构

```js
// 闭包,自执行函数,保存变量,内存不会被释放
const generateId = (() => {
  let i = 0;
  return (prefix: string = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

class InternalSider extends React.Component<InternalSideProps, SiderState> {
  static defaultProps = {
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 200,
    collapsedWidth: 80,
    style: {},
    theme: 'dark' as SiderTheme,
  };
  // 直接修改state的值,而不是直接通过props来修改visible
  static getDerivedStateFromProps(nextProps: InternalSideProps) {
    // 从外层传入,修改state
    if ('collapsed' in nextProps) {
      return {
        collapsed: nextProps.collapsed,
      };
    }
    return null;
  }

  private mql: MediaQueryList;

  private uniqueId: string;

  constructor(props: InternalSideProps) {
    super(props);
    this.uniqueId = generateId('ant-sider-');
    let matchMedia;
    if (typeof window !== 'undefined') {
      matchMedia = window.matchMedia;
    }
    if (matchMedia && props.breakpoint && props.breakpoint in dimensionMap) {
      // 判断屏幕（screen/viewport）窗口大小：
      this.mql = matchMedia(`(max-width: ${dimensionMap[props.breakpoint]})`);
    }
    let collapsed;
    // 存在props,defaultProps的选择
    if ('collapsed' in props) {
      collapsed = props.collapsed;
    } else {
      collapsed = props.defaultCollapsed;
    }
    this.state = {
      collapsed,
      below: false,
    };
  }

  componentDidMount() {
    if (this.mql) {
      this.mql.addListener(this.responsiveHandler);
      this.responsiveHandler(this.mql);
    }

    if (this.props.siderHook) {
      this.props.siderHook.addSider(this.uniqueId);
    }
  }

  componentWillUnmount() {
    if (this.mql) {
      this.mql.removeListener(this.responsiveHandler as any);
    }

    if (this.props.siderHook) {
      this.props.siderHook.removeSider(this.uniqueId);
    }
  }

  responsiveHandler = (mql: MediaQueryListEvent | MediaQueryList) => {
    this.setState({ below: mql.matches });
    const { onBreakpoint } = this.props;
    if (onBreakpoint) {
      onBreakpoint(mql.matches);
    }
    if (this.state.collapsed !== mql.matches) {
      this.setCollapsed(mql.matches, 'responsive');
    }
  };

  setCollapsed = (collapsed: boolean, type: CollapseType) => {
    // 不存在,直接修改,存在就放入到回调函数中
    if (!('collapsed' in this.props)) {
      this.setState({
        collapsed,
      });
    }
    const { onCollapse } = this.props;
    if (onCollapse) {
      onCollapse(collapsed, type);
    }
  };

  toggle = () => {
    const collapsed = !this.state.collapsed;
    this.setCollapsed(collapsed, 'clickTrigger');
  };

  belowShowChange = () => {
    this.setState(({ belowShow }) => ({ belowShow: !belowShow }));
  };

  renderSider = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      theme,
      collapsible,
      reverseArrow,
      trigger,
      style,
      width,
      collapsedWidth,
      ...others
    } = this.props;
    const prefixCls = getPrefixCls('layout-sider', customizePrefixCls);
    const divProps = omit(others, [
      'collapsed',
      'defaultCollapsed',
      'onCollapse',
      'breakpoint',
      'onBreakpoint',
      'siderHook',
    ]);
    const rawWidth = this.state.collapsed ? collapsedWidth : width;
    // use "px" as fallback unit for width
    const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
    // special trigger when collapsedWidth == 0
    const zeroWidthTrigger =
      parseFloat(String(collapsedWidth || 0)) === 0 ? (
        <span
          onClick={this.toggle}
          className={`${prefixCls}-zero-width-trigger ${prefixCls}-zero-width-trigger-${
            reverseArrow ? 'right' : 'left'
          }`}
        >
          <Icon type="bars" />
        </span>
      ) : null;
    const iconObj = {
      expanded: reverseArrow ? <Icon type="right" /> : <Icon type="left" />,
      collapsed: reverseArrow ? <Icon type="left" /> : <Icon type="right" />,
    };
    const status = this.state.collapsed ? 'collapsed' : 'expanded';
    const defaultTrigger = iconObj[status];
    const triggerDom =
      trigger !== null
        ? zeroWidthTrigger || (
            <div
              className={`${prefixCls}-trigger`}
              onClick={this.toggle}
              style={{ width: siderWidth }}
            >
              {trigger || defaultTrigger}
            </div>
          )
        : null;
    const divStyle = {
      ...style,
      flex: `0 0 ${siderWidth}`,
      maxWidth: siderWidth, // Fix width transition bug in IE11
      minWidth: siderWidth, // https://github.com/ant-design/ant-design/issues/6349
      width: siderWidth,
    };
    const siderCls = classNames(className, prefixCls, `${prefixCls}-${theme}`, {
      [`${prefixCls}-collapsed`]: !!this.state.collapsed,
      [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
      [`${prefixCls}-below`]: !!this.state.below,
      [`${prefixCls}-zero-width`]: parseFloat(siderWidth) === 0,
    });
    return (
      <aside className={siderCls} {...divProps} style={divStyle}>
        <div className={`${prefixCls}-children`}>{this.props.children}</div>
        {collapsible || (this.state.below && zeroWidthTrigger) ? triggerDom : null}
      </aside>
    );
  };

  render() {
    const { collapsed } = this.state;
    const { collapsedWidth } = this.props;
    return (
      <SiderContext.Provider
        value={{
          siderCollapsed: collapsed,
          collapsedWidth,
        }}
      >
        <ConfigConsumer>{this.renderSider}</ConfigConsumer>
      </SiderContext.Provider>
    );
  }
}
```
