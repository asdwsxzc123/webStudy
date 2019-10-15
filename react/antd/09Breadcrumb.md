---
category: Components
subtitle: 面包屑
type: 导航
title: Breadcrumb
---

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## API

### Breadcrumb

| 参数       | 说明                                     | 类型                                        | 默认值 | 版本   |
| ---------- | ---------------------------------------- | ------------------------------------------- | ------ | ------ |
| itemRender | 自定义链接函数，和 react-router 配置使用 | (route, params, routes, paths) => ReactNode | -      | 3.17.0 |
| params     | 路由的参数                               | object                                      | -      | 3.17.0 |
| routes     | router 的路由栈信息                      | [routes\[\]](#routes)                       | -      | 3.17.0 |
| separator  | 分隔符自定义                             | string\|ReactNode                           | '/'    | 3.17.0 |

### Breadcrumb.Item

| 参数    | 参数           | 类型                                   | 默认值 | 版本   |
| ------- | -------------- | -------------------------------------- | ------ | ------ |
| href    | 链接的目的地   | string                                 | -      | 3.17.0 |
| overlay | 下拉菜单的内容 | [Menu](/components/menu) \| () => Menu | -      | 3.17.0 |
| onClick | 单击事件       | (e:MouseEvent)=>void                   | -      | 3.17.0 |

### Breadcrumb.Separator `3.21.0`

| 参数     | 参数           | 类型              | 默认值 | 版本   |
| -------- | -------------- | ----------------- | ------ | ------ |
| children | 要显示的分隔符 | string\|ReactNode | '/'    | 3.21.0 |

> 注意：在使用 `Breadcrumb.Separator` 时，其父组件的分隔符必须设置为 `separator=""`，否则会出现父组件默认的分隔符。

### routes

```ts
interface Route {
  path: string;
  breadcrumbName: string;
  children: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}
```

### 和 browserHistory 配合

和 react-router 一起使用时，默认生成的 url 路径是带有 `#` 的，如果和 browserHistory 一起使用的话，你可以使用 `itemRender` 属性定义面包屑链接。

```jsx
import { Link } from "react-router";

const routes = [
  {
    path: "index",
    breadcrumbName: "home"
  },
  {
    path: "first",
    breadcrumbName: "first",
    children: [
      {
        path: "/general",
        breadcrumbName: "General"
      },
      {
        path: "/layout",
        breadcrumbName: "Layout"
      },
      {
        path: "/navigation",
        breadcrumbName: "Navigation"
      }
    ]
  },
  {
    path: "second",
    breadcrumbName: "second"
  }
];

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
  );
}

return <Breadcrumb itemRender={itemRender} routes={routes} />;
```

## 引入的文件

```js
import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import BreadcrumbItem from "./BreadcrumbItem"; // item组件
import BreadcrumbSeparator from "./BreadcrumbSeparator"; // 分隔符组件
import Menu from "../menu"; // menu组件
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
import warning from "../_util/warning"; // rc-util的告警组件
import { Omit } from "../_util/type";
```

### 相关函数

```js
// warning
export default (valid: boolean, component: string, message: string): void => {
  warning(valid, `[antd: ${component}] ${message}`);
};
// Omit typescript3.5新增辅助类型,用来对object内的key,value做类型判断
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

## 接口定义

```js
// 路由
export interface Route {
  path: string;
  breadcrumbName: string;
  children?: Omit<Route, "children">[];
}

// 组件Props
export interface BreadcrumbProps {
  prefixCls?: string;
  routes?: Route[];
  params?: any;
  separator?: React.ReactNode;
  itemRender?: (
    route: Route,
    params: any,
    routes: Array<Route>,
    paths: Array<string>
  ) => React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}
```

## 结构

```js

export default class Breadcrumb extends React.Component<BreadcrumbProps, any> {
  static Item: typeof BreadcrumbItem;

  static Separator: typeof BreadcrumbSeparator;

  static defaultProps = {
    separator: '/', // 默认分隔符
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.node,
    routes: PropTypes.array,
  };

  componentDidMount() {
  }
  // 获取path
  getPath = (path: string, params: any) => {
  };
  // 添加子path
  addChildPath = (paths: string[], childPath: string = '', params: any) => {
  };

  genForRoutes = ({
    routes = [],
    params = {},
    separator,
    itemRender = defaultItemRender,
  }: BreadcrumbProps) => {
  };
  // 渲染breadcrumb
  renderBreadcrumb = ({ getPrefixCls }: ConfigConsumerProps) => {
    }
    return (
      <div className={classNames(className, prefixCls)} style={style}>
        {crumbs}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderBreadcrumb}</ConfigConsumer>;
  }
}
```

## 生命周期

```js
 componentDidMount() {
    const { props } = this;
    warning(
      // 如果linkRender或者nameRender不存在props,提示错误
      !('linkRender' in props || 'nameRender' in props),
      'Breadcrumb',
      '`linkRender` and `nameRender` are removed, please use `itemRender` instead, ' +
        'see: https://u.ant.design/item-render.',
    );
  }
renderBreadcrumb = ({ getPrefixCls }: ConfigConsumerProps) => {
    let crumbs;
    const {
      prefixCls: customizePrefixCls,
      separator,
      style,
      className,
      routes,
      children,
    } = this.props;
    const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
    // routes存在并且长度大于0
    if (routes && routes.length > 0) {
      // generated by route
      crumbs = this.genForRoutes(this.props);
    } else if (children) {
      crumbs = React.Children.map(children, (element: any, index) => {
        if (!element) {
          return element;
        }
        // 只支持Breadcrumb.Item and Breadcrumb.Separator作为children
        warning(
          element.type &&
            (element.type.__ANT_BREADCRUMB_ITEM || element.type.__ANT_BREADCRUMB_SEPARATOR),
          'Breadcrumb',
          "Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children",
        );

        return React.cloneElement(element, {
          separator,
          key: index, // eslint-disable-line react/no-array-index-key
        });
      });
    }
    return (
      <div className={classNames(className, prefixCls)} style={style}>
        {crumbs}
      </div>
    );
  };

  // generator by route
  genForRoutes = ({
    routes = [],
    params = {},
    separator,
    itemRender = defaultItemRender,
  }: BreadcrumbProps) => {
    const paths: string[] = [];
    return routes.map(route => {
      const path = this.getPath(route.path, params);

      if (path) {
        paths.push(path);
      }
      // generated overlay by route.children
      let overlay = null;
      if (route.children && route.children.length) {
        // 自动设置menu和menu.Item
        overlay = (
          <Menu>
            {route.children.map(child => (
              <Menu.Item key={child.breadcrumbName || child.path}>
              // itemrender回调,addChildPath添加子path
                {itemRender(child, params, routes, this.addChildPath(paths, child.path, params))}
              </Menu.Item>
            ))}
          </Menu>
        );
      }

      return (
        <BreadcrumbItem overlay={overlay} separator={separator} key={route.breadcrumbName || path}>
          {itemRender(route, params, routes, paths)}
        </BreadcrumbItem>
      );
    });
  };

  addChildPath = (paths: string[], childPath: string = '', params: any) => {
    // clone paths
    const originalPaths = [...paths];
    // 获取path
    const path = this.getPath(childPath, params);
    // 如果存在,添加path
    if (path) {
      originalPaths.push(path);
    }
    return originalPaths;
  };


  getPath = (path: string, params: any) => {
    // 将path里面的以/开头的替换成空
    path = (path || '').replace(/^\//, '');
    // 将值为key的替换成值vavlue
    Object.keys(params).forEach(key => {
      path = path.replace(`:${key}`, params[key]);
    });
    return path;
  };
```

## 其他函数

```js
// 获取breadcrumbName
function getBreadcrumbName(route: Route, params: any) {
  if (!route.breadcrumbName) {
    return null;
  }
  // 获取所有的keys以|作为分割,作为正则的或运算
  const paramsKeys = Object.keys(params).join("|");
  const name = route.breadcrumbName.replace(
    new RegExp(`:(${paramsKeys})`, "g"),
    (replacement, key) => params[key] || replacement
  );
  return name;
}

// 设置默认的itemRender
function defaultItemRender(
  route: Route,
  params: any,
  routes: Route[],
  paths: string[]
) {
  // 获取最后的route
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  // 获取名称
  const name = getBreadcrumbName(route, params);
  return isLastItem ? (
    <span>{name}</span>
  ) : (
    <a href={`#/${paths.join("/")}`}>{name}</a>
  );
}
```

## breadcrumbseparator

```js
import * as React from "react";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";

export default class BreadcrumbSeparator extends React.Component<any> {
  static __ANT_BREADCRUMB_SEPARATOR = true;

  renderSeparator = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { children } = this.props;
    const prefixCls = getPrefixCls("breadcrumb");
    // 默认是/,如果有其他的children,使用默认的,可以是reactNode类型
    return <span className={`${prefixCls}-separator`}>{children || "/"}</span>;
  };

  render() {
    return <ConfigConsumer>{this.renderSeparator}</ConfigConsumer>;
  }
}
```

## breadcrumbitem

```js
import * as React from "react";
import * as PropTypes from "prop-types";
import omit from "omit.js";
// dropDown组件
import DropDown, { DropDownProps } from "../dropdown/dropdown";
// icon组件
import Icon from "../icon";
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
```

## 接口

```js

export interface BreadcrumbItemProps {
  prefixCls?: string;
  separator?: React.ReactNode;
  href?: string;
  overlay?: DropDownProps['overlay']; // 下拉
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
}

```

## 结构

```js
export default class BreadcrumbItem extends React.Component<
  BreadcrumbItemProps,
  any
> {
  static __ANT_BREADCRUMB_ITEM = true;

  static defaultProps = {
    separator: "/"
  };
  // propTypes设置类型,除了用ts定义props类型,还使用了propType来检查类型?ts是直接在编译前做校验,propTypes是运行校验
  static propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    href: PropTypes.string
  };

  renderBreadcrumbItem = ({ getPrefixCls }: ConfigConsumerProps) => {};

  /**
   * if overlay is have
   * Wrap a DropDown
   */
  renderBreadcrumbNode = (
    breadcrumbItem: React.ReactNode,
    prefixCls: string
  ) => {};

  render() {
    return <ConfigConsumer>{this.renderBreadcrumbItem}</ConfigConsumer>;
  }
}
```

## 声明周期

```js
renderBreadcrumbItem = ({ getPrefixCls }: ConfigConsumerProps) => {
  const {
    prefixCls: customizePrefixCls,
    separator,
    children,
    ...restProps
  } = this.props;
  const prefixCls = getPrefixCls("breadcrumb", customizePrefixCls);
  let link;
  // 有href,使用a标签,没有使用span标签
  if ("href" in this.props) {
    link = (
      <a className={`${prefixCls}-link`} {...omit(restProps, ["overlay"])}>
        {children}
      </a>
    );
  } else {
    link = (
      <span className={`${prefixCls}-link`} {...omit(restProps, ["overlay"])}>
        {children}
      </span>
    );
  }

  // wrap to dropDown
  link = this.renderBreadcrumbNode(link, prefixCls);
  if (children) {
    return (
      <span>
        {link}
        {separator && separator !== "" && (
          <span className={`${prefixCls}-separator`}>{separator}</span>
        )}
      </span>
    );
  }
  return null;
};

/**
 * if overlay is have
 * Wrap a DropDown
 */
renderBreadcrumbNode = (breadcrumbItem: React.ReactNode, prefixCls: string) => {
  // 如果有overlay使用下拉,没有直接返回
  const { overlay } = this.props;
  if (overlay) {
    return (
      <DropDown overlay={overlay} placement="bottomCenter">
        <span className={`${prefixCls}-overlay-link`}>
          {breadcrumbItem}
          <Icon type="down" />
        </span>
      </DropDown>
    );
  }
  return breadcrumbItem;
};
```
