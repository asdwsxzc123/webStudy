---
category: Components
type: 数据展示
title: Carousel
subtitle: 走马灯
---

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## API

| 参数         | 说明                                               | 类型               | 默认值  | 版本   |
| ------------ | -------------------------------------------------- | ------------------ | ------- | ------ |
| afterChange  | 切换面板的回调                                     | function(current)  | 无      |        |  |
| autoplay     | 是否自动切换                                       | boolean            | false   |        |  |
| beforeChange | 切换面板的回调                                     | function(from, to) | 无      |        |  |
| dotPosition  | 面板指示点位置，可选 `top` `bottom` `left` `right` | string             | bottom  | 3.17.0 | 3.17.0 |
| dots         | 是否显示面板指示点                                 | boolean            | true    |        |  |
| easing       | 动画效果                                           | string             | linear  |        |  |
| effect       | 动画效果函数，可取 scrollx, fade                   | string             | scrollx |        |  |

## 方法

| 名称                           | 描述                                              |
| ------------------------------ | ------------------------------------------------- |
| goTo(slideNumber, dontAnimate) | 切换到指定面板, dontAnimate = true 时，不使用动画 | 3.9.3 |
| next()                         | 切换到下一面板                                    |  |
| prev()                         | 切换到上一面板                                    |  |

更多参数可参考：<https://github.com/akiran/react-slick>

## 引入文件

```js
import * as React from "react";
import debounce from "lodash/debounce"; // 防抖
import { Settings } from "react-slick"; // 一些基本设置的接口
import { ConfigConsumer, ConfigConsumerProps } from "../config-provider";
import warning from "../_util/warning";
```

## 接口

```js
// scrollx 或者fade,特效
export type CarouselEffect = "scrollx" | "fade";
export type DotPosition = "top" | "bottom" | "left" | "right";

// Carousel
export interface CarouselProps extends Settings {
  effect?: CarouselEffect;
  style?: React.CSSProperties;
  prefixCls?: string;
  slickGoTo?: number;
  dotPosition?: DotPosition;
  children?: React.ReactNode;
}
```

## 结构

```js

export default class Carousel extends React.Component<CarouselProps, {}> {
  static defaultProps = {
    dots: true,
    arrows: false,
    draggable: false,
  };

  innerSlider: any;

  private slick: any;

  constructor(props: CarouselProps) {
    super(props);
    // 500毫秒的防抖处理
    this.onWindowResized = debounce(this.onWindowResized, 500, {
      leading: false,
    });

    if ('vertical' in this.props) {
      warning(
        !this.props.vertical,
        'Carousel',
        '`vertical` is deprecated, please use `dotPosition` instead.',
      );
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps: CarouselProps) {
  }

  componentWillUnmount() {
  }
  // 获取点的位置
  getDotPosition(): DotPosition {
  }
  // 保存slick节点信息
  saveSlick = (node: any) => {
  };
  // 监听窗口变化的回调
  onWindowResized = () => {
  };
  // 下一个
  next() {
  }
  // 上一个
  prev() {
  }
  // 切换的位置
  goTo(slide: number, dontAnimate = false) {
  }
  // 渲染
  renderCarousel = ({ getPrefixCls }: ConfigConsumerProps) => {
  };

  render() {
    return <ConfigConsumer>{this.renderCarousel}</ConfigConsumer>;
  }
}
```

## 生命周期

```js

  componentDidMount() {
    // 是否自动切换
    const { autoplay } = this.props;
    // 如果自定切换,监听resize
    if (autoplay) {
      window.addEventListener('resize', this.onWindowResized);
    }
    // 解决了issues this.slider.slickNext is not a function的问题
    // https://github.com/ant-design/ant-design/issues/7191
    this.innerSlider = this.slick && this.slick.innerSlider;
  }

  componentDidUpdate(prevProps: CarouselProps) {
    // reactChild的数量和下一个的数量不相等
    if (React.Children.count(this.props.children) !== React.Children.count(prevProps.children)) {
      // 跳转到初始页面,或者第0
      this.goTo(this.props.initialSlide || 0, false);
    }
  }

  componentWillUnmount() {
    const { autoplay } = this.props;
    if (autoplay) {
      // 解除事件监听
      window.removeEventListener('resize', this.onWindowResized);
      (this.onWindowResized as any).cancel();
    }
  }
  renderCarousel = ({ getPrefixCls }: ConfigConsumerProps) => {
    const props = {
      ...this.props,
    };

    if (props.effect === 'fade') {
      props.fade = true;
    }

    let className = getPrefixCls('carousel', props.prefixCls);
    const dotsClass = 'slick-dots';
    const dotPosition = this.getDotPosition();
    // 垂直方向,需要left/right
    props.vertical = dotPosition === 'left' || dotPosition === 'right';
    props.dotsClass = `${dotsClass} ${dotsClass}-${dotPosition || 'bottom'}`;
    if (props.vertical) {
      className = `${className} ${className}-vertical`;
    }

    return (
      <div className={className}>
      // slickCarousel来源react-slick组件,没有自己重复造轮子
      // https://github.com/akiran/react-slick
        <SlickCarousel ref={this.saveSlick} {...props} />
      </div>
    );
  };

  goTo(slide: number, dontAnimate = false) {
    this.slick.slickGoTo(slide, dontAnimate);
  }
  // 面板指示点位置，可选 top bottom left right
  getDotPosition(): DotPosition {
    if (this.props.dotPosition) {
      return this.props.dotPosition;
    }
    if ('vertical' in this.props) {
      return this.props.vertical ? 'right' : 'bottom';
    }
    return 'bottom';
  }

  saveSlick = (node: any) => {
    this.slick = node;
  };
```
