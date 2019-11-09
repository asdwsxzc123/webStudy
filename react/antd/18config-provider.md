---
category: Components
subtitle: 全局化配置
cols: 1
type: 其他
title: ConfigProvider
---

为组件提供统一的全局化配置。

## 使用

ConfigProvider 使用 React 的 [context](https://facebook.github.io/react/docs/context.html) 特性，只需在应用外围包裹一次即可全局生效。

```jsx
import { ConfigProvider } from 'antd';

// ...

return (
  <ConfigProvider {...yourConfig}>
    <App />
  </ConfigProvider>
);
```

### Content Security Policy

部分组件为了支持波纹效果，使用了动态样式。如果开启了 Content Security Policy (CSP)，你可以通过 `csp` 属性来进行配置：

```jsx
<ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoInsertSpaceInButton | 设置为 `false` 时，移除按钮中 2 个汉字之间的空格 | boolean | true | 3.13.0 |
| csp | 设置 [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 配置 | { nonce: string } | - | 3.13.1 |
| renderEmpty | 自定义组件空状态。参考 [空状态](/components/empty/) | Function(componentName: string): ReactNode | - | 3.12.2 |
| getPopupContainer | 弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上。 | Function(triggerNode) | () => document.body | 3.11.0 |
| locale | 语言包配置，语言包可到 [antd/es/locale](http://unpkg.com/antd/es/locale/) 目录下寻找 | object | - | 3.21.0 |
| prefixCls | 设置统一样式前缀 | string | ant | 3.12.0 |
| pageHeader | 统一设置 pageHeader 的 ghost，参考 [pageHeader](<(/components/page-header)>) | { ghost: boolean } | 'true' | 3.24.0 |

## 引入
```js
import * as React from 'react';

import { RenderEmptyHandler } from './renderEmpty';
import LocaleProvider, { Locale, ANT_MARK } from '../locale-provider'; // 国际化
import LocaleReceiver from '../locale-provider/LocaleReceiver'; // 国际化
import { ConfigConsumer, ConfigContext, CSPConfig, ConfigConsumerProps } from './context'; // 上下文存储

export { RenderEmptyHandler, ConfigConsumer, CSPConfig, ConfigConsumerProps };

```

## 声明
```js

export const configConsumerProps = [
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
];

export interface ConfigProviderProps {
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  children?: React.ReactNode;
  renderEmpty?: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  locale?: Locale;
  pageHeader?: {
    ghost: boolean;
  };
}

```

## 结构

```js

class ConfigProvider extends React.Component<ConfigProviderProps> {
    // 得到prefix classname,默认是ant
  getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
    const { prefixCls = 'ant' } = this.props;
    // 如果自定义的,返回自定义的
    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
  };
    // 渲染provider,发布者
  renderProvider = (context: ConfigConsumerProps, legacyLocale: Locale) => {
    const {
      children,
      getPopupContainer,
      renderEmpty,
      csp,
      autoInsertSpaceInButton,
      locale,
      pageHeader,
    } = this.props;

    const config: ConfigConsumerProps = {
      ...context,
      getPrefixCls: this.getPrefixCls,
      csp,
      autoInsertSpaceInButton,
    };
    // 容器
    if (getPopupContainer) {
      config.getPopupContainer = getPopupContainer;
    }
    // 渲染空
    if (renderEmpty) {
      config.renderEmpty = renderEmpty;
    }
    // 页头
    if (pageHeader) {
      config.pageHeader = pageHeader;
    }

    return (
      <ConfigContext.Provider value={config}>
        <LocaleProvider locale={locale || legacyLocale} _ANT_MARK__={ANT_MARK}>
          {children}
        </LocaleProvider>
      </ConfigContext.Provider>
    );
  };

  render() {
    return (
      <LocaleReceiver>
        {(_, __, legacyLocale) => (
          <ConfigConsumer>
        //   递归
            {context => this.renderProvider(context, legacyLocale as Locale)}
          </ConfigConsumer>
        )}
      </LocaleReceiver>
    );
  }
}
```

## renderEmpty
```js
import * as React from 'react';
import Empty from '../empty';
// .的用法是引入当前目录的index文件
import { ConfigConsumer, ConfigConsumerProps } from '.';

const renderEmpty = (componentName?: string): React.ReactNode => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const prefix = getPrefixCls('empty');
        // table和list的empty和其他的不一样
      switch (componentName) {
        case 'Table':
        case 'List':
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
        case 'Mentions':
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className={`${prefix}-small`} />;
        default:
          return <Empty />;
      }
    }}
  </ConfigConsumer>
);

export type RenderEmptyHandler = typeof renderEmpty;

export default renderEmpty;

```