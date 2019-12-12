## 引入文件

```js
import React from 'react';
import { OptionsType as SelectOptionsType } from './interface';
import SelectOptionList from './OptionList';
import Option from './Option';
import OptGroup from './OptGroup';
import { convertChildrenToData as convertSelectChildrenToData } from './utils/legacyUtil';
import {
  getLabeledValue as getSelectLabeledValue,
  filterOptions as selectDefaultFilterOptions,
  isValueDisabled as isSelectValueDisabled,
  findValueOption as findSelectValueOption,
  flattenOptions,
  fillOptionsWithMissingValue
} from './utils/valueUtil';
import generateSelector, { SelectProps, RefSelectProps } from './generate';
import { DefaultValueType } from './interface/generator';
import warningProps from './utils/warningPropsUtil';
```

## utils

### legacyUtil

```js
import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';  // 将reactnode子节点放入到数组中
import { OptionData, OptionGroupData, OptionsType } from '../interface'; // 接口定义

function convertNodeToOption(node: React.ReactElement): OptionData {
  const {
    key,
    props: { children, value, ...restProps },
  } = node as React.ReactElement;

  return { key, value: value !== undefined ? value : key, children, ...restProps };
}

export function convertChildrenToData(
  nodes: React.ReactNode,
  optionOnly: boolean = false,
): OptionsType {
  return toArray(nodes)
    .map((node: React.ReactElement): OptionData | OptionGroupData | null => {
      if (!React.isValidElement(node) || !node.type) {
        return null;
      }

      const {
        type: { isSelectOptGroup },
        key,
        props: { children, ...restProps },
      } = node as React.ReactElement & {
        type: { isSelectOptGroup?: boolean };
      };

      if (optionOnly || !isSelectOptGroup) {
        return convertNodeToOption(node);
      }

      return {
        key,
        ...restProps,
        options: convertChildrenToData(children),
      };
    })
    // filter返回值不为空的.map可能返回空的
    .filter(data => data);
}


import * as React from 'react';
export type Key = string | number;
export type RenderDOMFunc = (props: any) => HTMLElement;

export type RenderNode = React.ReactNode | ((props: any) => React.ReactNode);

export type Mode = 'multiple' | 'tags' | 'combobox';

// ======================== Option ========================
export interface OptionCoreData {
  key?: Key;
  disabled?: boolean;
  value: Key;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  /** @deprecated Only works when use `children` as option data */
  children?: React.ReactNode;
}

export interface OptionData extends OptionCoreData {
  /** Save for customize data */
  [prop: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface OptionGroupData {
  key?: Key;
  label?: React.ReactNode;
  options: OptionData[];
  className?: string;
  style?: React.CSSProperties;

  /** Save for customize data */
  [prop: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type OptionsType = (OptionData | OptionGroupData)[];

export interface FlattenOptionData {
  group?: boolean;
  groupOption?: boolean;
  key: string | number;
  data: OptionData | OptionGroupData;
}


```

### toArray

```js
import React from 'react';
// 将reactNode的子元素放入到数组中,可以做数组的操作
export default function toArray(
  children: React.ReactNode
): React.ReactElement[] {
  const ret = [];
  React.Children.forEach(children, c => {
    ret.push(c);
  });
  return ret;
}
```
