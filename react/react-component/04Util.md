## contains

```js
// 判断节点是不是当前容器中的节点
export default function contains(root, n) {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}
```

## switchScrollingEffect

```js
import getScrollBarSize from './getScrollBarSize';
import setStyle from './setStyle';

function isBodyOverflowing() {
  return (
    document.body.scrollHeight >
      (window.innerHeight || document.documentElement.clientHeight) &&
    window.innerWidth > document.body.offsetWidth
  );
}

let cacheStyle = {};

export default close => {
  if (!isBodyOverflowing() && !close) {
    return;
  }

  // https://github.com/ant-design/ant-design/issues/19729
  const scrollingEffectClassName = 'switch-scrolling-effect';
  const scrollingEffectClassNameReg = new RegExp(
    `${scrollingEffectClassName}`,
    'g'
  );
  const bodyClassName = document.body.className;

  if (close) {
    if (!scrollingEffectClassNameReg.test(bodyClassName)) return;
    setStyle(cacheStyle);
    cacheStyle = {};
    document.body.className = bodyClassName
      .replace(scrollingEffectClassNameReg, '')
      .trim();
    return;
  }
  // 获取滚动条的宽度
  const scrollBarSize = getScrollBarSize();
  if (scrollBarSize) {
    cacheStyle = setStyle({
      position: 'relative',
      width: `calc(100% - ${scrollBarSize}px)`
    });
    if (!scrollingEffectClassNameReg.test(bodyClassName)) {
      document.body.className = `${bodyClassName} ${scrollingEffectClassName}`;
    }
  }
};
```

## setStyle

该函数应该是后期加的,采用 ts 写的,用来设置样式

```ts
export interface SetStyleOptions {
  element?: HTMLElement;
}

/**
 * Easy to set element style, return previou style
 * IE browser compatible(IE browser doesn't merge overflow style, need to set it separately)
 * https://github.com/ant-design/ant-design/issues/19393
 *
 */
function setStyle(
  style: React.CSSProperties,
  options: SetStyleOptions = {}
): React.CSSProperties {
  const { element = document.body } = options;
  const oldStyle: React.CSSProperties = {};
  // 获取所有style key
  const styleKeys = Object.keys(style);
  // 赋值操作,为了兼容ie浏览器,没有采用合并操作,而是直接赋值
  // IE browser compatible
  styleKeys.forEach(key => {
    oldStyle[key] = element.style[key];
  });

  styleKeys.forEach(key => {
    element.style[key] = style[key];
  });
  // 返回旧的style
  return oldStyle;
}
```

## getScrollBarSize

```js
let cached;

export default function getScrollBarSize(fresh) {
  if (typeof document === 'undefined') {
    return 0;
  }

  if (fresh || cached === undefined) {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    const outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = 0;
    outerStyle.left = 0;
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }
  return cached;
}
```
