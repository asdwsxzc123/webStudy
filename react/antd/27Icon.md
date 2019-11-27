---
category: Components
subtitle: 图标
type: 通用
title: Icon
toc: false
---

语义化的矢量图形。

## 设计师专属

安装 [Kitchen Sketch 插件 💎](https://kitchen.alipay.com)，就可以一键拖拽使用 Ant Design 和 Iconfont 的海量图标，还可以关联自有项目。

## 图标列表

```__react
import IconDisplay from 'site/theme/template/IconDisplay';
ReactDOM.render(<IconDisplay />, mountNode);
```

## API

| 参数         | 说明                                                                                       | 类型                                     | 默认值     | 版本   |
| ------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------- | ---------- | ------ |
| type         | 图标类型。遵循图标的命名规范                                                               | string                                   | -          |        |
| style        | 设置图标的样式，例如 `fontSize` 和 `color`                                                 | CSSProperties                            | -          |        |
| theme        | 图标主题风格。可选实心、描线、双色等主题风格，适用于官方图标                               | 'filled' \| 'outlined' \| 'twoTone'      | 'outlined' | 3.9.0  |
| spin         | 是否有旋转动画                                                                             | boolean                                  | false      |        |
| rotate       | 图标旋转角度（3.13.0 后新增，IE9 无效）                                                    | number                                   | -          | 3.13.0 |
| component    | 控制如何渲染图标，通常是一个渲染根标签为 `<svg>` 的 `React` 组件，**会使 `type` 属性失效** | ComponentType<CustomIconComponentProps\> | -          | 3.9.0  |
| twoToneColor | 仅适用双色图标。设置双色图标的主要颜色                                                     | string (十六进制颜色)                    | -          | 3.9.0  |

### SVG 图标

在 `3.9.0` 之后，我们使用了 SVG 图标替换了原先的 font 图标，从而带来了以下优势：

- 完全离线化使用，不需要从 CDN 下载字体文件，图标不会因为网络问题呈现方块，也无需字体文件本地部署。
- 在低端设备上 SVG 有更好的清晰度。
- 支持多色图标。
- 对于内建图标的更换可以提供更多 API，而不需要进行样式覆盖。

更多讨论可参考：[#10353](https://github.com/ant-design/ant-design/issues/10353)。

> ⚠️ 3.9.0 之后我们全量引入了所有图标，导致 antd 默认的包体积有一定增加，我们会在不远的未来增加新的 API 来实现图标的按需使用，更多相关讨论可关注：[#12011](https://github.com/ant-design/ant-design/issues/12011)。
>
> 在此之前，你可以通过来自社区同学的 [webpack 插件](https://github.com/Beven91/webpack-ant-icon-loader)将图标文件拆分。

其中 `theme`, `component`, `twoToneColor` 是 `3.9.x` 版本新增加的属性。最佳实践是给使用的 `<Icon />` 组件传入属性 `theme` 以明确图标的主题风格。例如：

```jsx
<Icon type="star" theme="filled" />
```

所有的图标都会以 `<svg>` 标签渲染，可以使用 `style` 和 `className` 设置图标的大小和单色图标的颜色。例如：

```jsx
<Icon type="message" style={{ fontSize: '16px', color: '#08c' }} />
```

### 双色图标主色

对于双色图标，可以通过使用 `Icon.getTwoToneColor()` 和 `Icon.setTwoToneColor(colorString)` 来全局设置图标主色。

```jsx
Icon.setTwoToneColor('#eb2f96');
Icon.getTwoToneColor(); // #eb2f96
```

### 自定义 font 图标

在 `3.9.0` 之后，我们提供了一个 `createFromIconfontCN` 方法，方便开发者调用在 [iconfont.cn](http://iconfont.cn/) 上自行管理的图标。

```js
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js' // 在 iconfont.cn 上生成
});

ReactDOM.render(<MyIcon type="icon-example" />, mountedNode);
```

其本质上是创建了一个使用 `<use>` 标签来渲染图标的组件。

`options` 的配置项如下：

| 参数             | 说明                                                        | 类型                     | 默认值 | 版本  |
| ---------------- | ----------------------------------------------------------- | ------------------------ | ------ | ----- |
| scriptUrl        | [iconfont.cn](http://iconfont.cn/) 项目在线生成的 `js` 地址 | string                   | -      | 3.9.3 |
| extraCommonProps | 给所有的 `svg` 图标 `<Icon />` 组件设置额外的属性           | `{ [key: string]: any }` | {}     | 3.9.3 |

在 `scriptUrl` 都设置有效的情况下，组件在渲染前会自动引入 [iconfont.cn](http://iconfont.cn/) 项目中的图标符号集，无需手动引入。

见 [iconfont.cn 使用帮助](http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.15&helptype=code) 查看如何生成 `js` 地址。

### 自定义 SVG 图标

如果使用 `webpack`，可以通过配置 [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack) 来将 `svg` 图标作为 `React` 组件导入。`@svgr/webpack` 的 `options` 选项请参阅 [svgr 文档](https://github.com/smooth-code/svgr#options)。

```js
// webpack.config.js
{
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'babel-loader',
    },
    {
      loader: '@svgr/webpack',
      options: {
        babel: false,
        icon: true,
      },
    },
  ],
}
```

```jsx
import { Icon } from 'antd';
import MessageSvg from 'path/to/message.svg'; // path to your '*.svg' file.

ReactDOM.render(<Icon component={MessageSvg} />, mountNode);
```

`Icon` 中的 `component` 组件的接受的属性如下：

| 字段      | 说明                    | 类型             | 只读值         | 版本   |
| --------- | ----------------------- | ---------------- | -------------- | ------ |
| width     | `svg` 元素宽度          | string \| number | '1em'          | 3.10.0 |
| height    | `svg` 元素高度          | string \| number | '1em'          | 3.10.0 |
| fill      | `svg` 元素填充的颜色    | string           | 'currentColor' | 3.10.0 |
| className | 计算后的 `svg` 类名     | string           | -              | 3.10.0 |
| style     | 计算后的 `svg` 元素样式 | CSSProperties    | -              | 3.10.0 |

## IconFont

```js
import * as React from 'react';
import Icon, { IconProps } from './index';

const customCache = new Set<string>();

export interface CustomIconOptions {
  scriptUrl?: string;
  extraCommonProps?: { [key: string]: any };
}

export default function create(options: CustomIconOptions = {}): React.SFC<IconProps> {
  const { scriptUrl, extraCommonProps = {} } = options;
  // 获取远端的库
  /**
   * DOM API required.
   * Make sure in browser environment.
   * The Custom Icon will create a <script/>
   * that loads SVG symbols and insert the SVG Element into the document body.
   */
  if (
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function' &&
    typeof scriptUrl === 'string' &&
    scriptUrl.length &&
    !customCache.has(scriptUrl)
  ) {
    const script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    customCache.add(scriptUrl);
    document.body.appendChild(script);
  }
  //  SVG
  const Iconfont: React.SFC<IconProps> = props => {
    const { type, children, ...restProps } = props;

    // component > children > type
    let content = null;
    if (props.type) {
      content = <use xlinkHref={`#${type}`} />;
    }
    if (children) {
      content = children;
    }
    return (
      <Icon {...restProps} {...extraCommonProps}>
        {content}
      </Icon>
    );
  };

  Iconfont.displayName = 'Iconfont';

  return Iconfont;
}

```

## 引入文件

```js
import * as React from 'react';
import classNames from 'classnames';
import * as allIcons from '@ant-design/icons/lib/dist'; // 内置icon库
import ReactIcon from '@ant-design/icons-react'; // icon组件
import createFromIconfontCN from './IconFont';
import {
  svgBaseProps,
  withThemeSuffix,
  removeTypeTheme,
  getThemeFromTypeName,
  alias
} from './utils';
import warning from '../_util/warning';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';

/* utils */
// svg基础参数
// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
export const svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: 'false'
};

const fillTester = /-fill$/;
const outlineTester = /-o$/;
const twoToneTester = /-twotone$/;
// 获取类型
export function getThemeFromTypeName(type: string): ThemeType | null {
  let result: ThemeType | null = null;
  if (fillTester.test(type)) {
    result = 'filled';
  } else if (outlineTester.test(type)) {
    result = 'outlined';
  } else if (twoToneTester.test(type)) {
    result = 'twoTone';
  }
  return result;
}
// 删除
export function removeTypeTheme(type: string) {
  return type
    .replace(fillTester, '')
    .replace(outlineTester, '')
    .replace(twoToneTester, '');
}
// 添加
export function withThemeSuffix(type: string, theme: ThemeType) {
  let result = type;
  if (theme === 'filled') {
    result += '-fill';
  } else if (theme === 'outlined') {
    result += '-o';
  } else if (theme === 'twoTone') {
    result += '-twotone';
  } else {
    warning(false, 'Icon', `This icon '${type}' has unknown theme '${theme}'`);
  }
  return result;
}

// For alias or compatibility
export function alias(type: string) {
  let newType = type;
  switch (type) {
    case 'cross':
      newType = 'close';
      break;
    // https://github.com/ant-design/ant-design/issues/13007
    case 'interation':
      newType = 'interaction';
      break;
    // https://github.com/ant-design/ant-design/issues/16810
    case 'canlendar':
      newType = 'calendar';
      break;
    // https://github.com/ant-design/ant-design/issues/17448
    case 'colum-height':
      newType = 'column-height';
      break;
    default:
  }
  warning(
    newType === type,
    'Icon',
    `Icon '${type}' was a typo and is now deprecated, please use '${newType}' instead.`
  );
  return newType;
}

import ReactIcon from '@ant-design/icons-react';
// 设置双色
export function setTwoToneColor(primaryColor: string): void {
  return ReactIcon.setTwoToneColors({
    primaryColor
  });
}
// 获取双色
export function getTwoToneColor(): string {
  const colors = ReactIcon.getTwoToneColors();
  return colors.primaryColor;
}
```

## 接口

```js

// Initial setting
ReactIcon.add(...Object.keys(allIcons).map(key => (allIcons as any)[key]));
setTwoToneColor('#1890ff');
let defaultTheme: ThemeType = 'outlined';
let dangerousTheme: ThemeType | undefined;

function unstable_ChangeThemeOfIconsDangerously(theme?: ThemeType) {
  warning(
    false,
    'Icon',
    `You are using the unstable method 'Icon.unstable_ChangeThemeOfAllIconsDangerously', ` +
      `make sure that all the icons with theme '${theme}' display correctly.`,
  );
  dangerousTheme = theme;
}

function unstable_ChangeDefaultThemeOfIcons(theme: ThemeType) {
  warning(
    false,
    'Icon',
    `You are using the unstable method 'Icon.unstable_ChangeDefaultThemeOfIcons', ` +
      `make sure that all the icons with theme '${theme}' display correctly.`,
  );
  defaultTheme = theme;
}

export interface TransferLocale {
  icon: string;
}

export interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  ['aria-hidden']?: React.AriaAttributes['aria-hidden'];
}

export type ThemeType = 'filled' | 'outlined' | 'twoTone';

export interface IconProps {
  tabIndex?: number;
  type?: string;
  className?: string;
  theme?: ThemeType;
  title?: string;
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  component?: React.ComponentType<CustomIconComponentProps>;
  twoToneColor?: string;
  viewBox?: string;
  spin?: boolean;
  rotate?: number;
  style?: React.CSSProperties;
  prefixCls?: string;
  role?: string;
}

export interface IconComponent<P> extends React.SFC<P> {
  createFromIconfontCN: typeof createFromIconfontCN;
  getTwoToneColor: typeof getTwoToneColor;
  setTwoToneColor: typeof setTwoToneColor;
  unstable_ChangeThemeOfIconsDangerously?: typeof unstable_ChangeThemeOfIconsDangerously;
  unstable_ChangeDefaultThemeOfIcons?: typeof unstable_ChangeDefaultThemeOfIcons;
}

```

## 结构

```js
const Icon: IconComponent<IconProps> = props => {
  const {
    // affect outter <i>...</i>
    className,

    // affect inner <svg>...</svg>
    type,
    component: Component,
    viewBox,
    spin,
    rotate,

    tabIndex,
    onClick,

    // children
    children,

    // other
    theme, // default to outlined
    twoToneColor,

    ...restProps
  } = props;

  warning(
    Boolean(type || Component || children),
    'Icon',
    'Should have `type` prop or `component` prop or `children`.'
  );

  const classString = classNames(
    {
      [`anticon`]: true,
      [`anticon-${type}`]: Boolean(type)
    },
    className
  );

  const svgClassString = classNames({
    [`anticon-spin`]: !!spin || type === 'loading'
  });

  let innerNode: React.ReactNode;

  const svgStyle = rotate
    ? {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`
      }
    : undefined;

  const innerSvgProps: CustomIconComponentProps = {
    ...svgBaseProps,
    className: svgClassString,
    style: svgStyle,
    viewBox
  };

  if (!viewBox) {
    delete innerSvgProps.viewBox;
  }

  // component > children > type
  if (Component) {
    innerNode = <Component {...innerSvgProps}>{children}</Component>;
  }

  if (children) {
    warning(
      Boolean(viewBox) ||
        (React.Children.count(children) === 1 &&
          React.isValidElement(children) &&
          React.Children.only(children).type === 'use'),
      'Icon',
      'Make sure that you provide correct `viewBox`' +
        ' prop (default `0 0 1024 1024`) to the icon.'
    );
    innerNode = (
      <svg {...innerSvgProps} viewBox={viewBox}>
        {children}
      </svg>
    );
  }

  if (typeof type === 'string') {
    let computedType = type;
    if (theme) {
      const themeInName = getThemeFromTypeName(type);
      warning(
        !themeInName || theme === themeInName,
        'Icon',
        `The icon name '${type}' already specify a theme '${themeInName}',` +
          ` the 'theme' prop '${theme}' will be ignored.`
      );
    }
    computedType = withThemeSuffix(
      removeTypeTheme(alias(computedType)),
      dangerousTheme || theme || defaultTheme
    );
    innerNode = (
      <ReactIcon
        className={svgClassString}
        type={computedType}
        primaryColor={twoToneColor}
        style={svgStyle}
      />
    );
  }

  let iconTabIndex = tabIndex;
  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }

  return (
    <LocaleReceiver componentName="Icon">
      {(locale: TransferLocale) => (
        <i
          aria-label={type && `${locale.icon}: ${type}`}
          {...restProps}
          tabIndex={iconTabIndex}
          onClick={onClick}
          className={classString}
        >
          {innerNode}
        </i>
      )}
    </LocaleReceiver>
  );
};

Icon.createFromIconfontCN = createFromIconfontCN;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
```
