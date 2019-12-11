## antd 版本

当前的源码是 3.22.1 版本的 antd,采用 typescript

## 目录结构

- component
  - affix
    - index.ts
  - alert
  - index.ts

## antd 基础组件

antd 基于 react-rc 基础组件做的二次封装,主要是 ui 层的封装,底层代码基于 rc 系列.
https://github.com/react-component

## antd 的入口文件 index.ts

```js
export { default as Affix } from './affix';

export { default as Anchor } from './anchor';

export { default as AutoComplete } from './auto-complete';

export { default as Alert } from './alert';

export { default as Avatar } from './avatar';

export { default as BackTop } from './back-top';

export { default as Badge } from './badge';

export { default as Breadcrumb } from './breadcrumb';

export { default as Button } from './button';

export { default as Calendar } from './calendar';

export { default as Card } from './card';

export { default as Collapse } from './collapse';

export { default as Carousel } from './carousel';

export { default as Cascader } from './cascader';

export { default as Checkbox } from './checkbox';

export { default as Col } from './col';

export { default as Comment } from './comment';

export { default as ConfigProvider } from './config-provider';

export { default as DatePicker } from './date-picker';

export { default as Descriptions } from './descriptions';

export { default as Divider } from './divider';

export { default as Dropdown } from './dropdown';

export { default as Drawer } from './drawer';

export { default as Empty } from './empty';

export { default as Form } from './form';

export { default as Icon } from './icon';

export { default as Input } from './input';

export { default as InputNumber } from './input-number';

export { default as Layout } from './layout';

export { default as List } from './list';

export { default as LocaleProvider } from './locale-provider';

export { default as message } from './message';

export { default as Menu } from './menu';

export { default as Mentions } from './mentions';

export { default as Modal } from './modal';

export { default as Statistic } from './statistic';

export { default as notification } from './notification';

export { default as PageHeader } from './page-header';

export { default as Pagination } from './pagination';

export { default as Popconfirm } from './popconfirm';

export { default as Popover } from './popover';

export { default as Progress } from './progress';

export { default as Radio } from './radio';

export { default as Rate } from './rate';

export { default as Result } from './result';

export { default as Row } from './row';

export { default as Select } from './select';

export { default as Skeleton } from './skeleton';

export { default as Slider } from './slider';

export { default as Spin } from './spin';

export { default as Steps } from './steps';

export { default as Switch } from './switch';

export { default as Table } from './table';

export { default as Transfer } from './transfer';

export { default as Tree } from './tree';

export { default as TreeSelect } from './tree-select';

export { default as Tabs } from './tabs';

export { default as Tag } from './tag';

export { default as TimePicker } from './time-picker';

export { default as Timeline } from './timeline';

export { default as Tooltip } from './tooltip';

export { default as Typography } from './typography';

export { default as Mention } from './mention';

export { default as Upload } from './upload';

export { default as version } from './version';
```

采用了 es6 模块化的复合写法.

常规写法:

```js
import default as version from './version';
export {version}
```

复合写法:

```js
export { default as version } from './version';
```
