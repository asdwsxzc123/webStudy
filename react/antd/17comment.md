---
category: Components
type: 数据展示
title: Comment
subtitle: 评论
cols: 1
---

对网站内容的反馈、评价和讨论。

## 何时使用

评论组件可用于对事物的讨论，例如页面、博客文章、问题等等。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actions | 在评论内容下面呈现的操作项列表 | Array<ReactNode> | - | 3.11.0 |
| author | 要显示为注释作者的元素 | string\|ReactNode | - | 3.11.0 |
| avatar | 要显示为评论头像的元素 - 通常是 antd `Avatar` 或者 src | string\|ReactNode | - | 3.11.0 |
| children | 嵌套注释应作为注释的子项提供 | ReactNode | - | 3.11.0 |
| content | 评论的主要内容 | string\|ReactNode | - | 3.11.0 |
| datetime | 展示时间描述 | string\|ReactNode | - | 3.11.0 |

## 结构

<!-- 没什么好分析的，没东西，就是普通的react渲染.. -->

```js
import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
// 获取action list
function getAction(actions: React.ReactNode[]) {
  if (!actions || !actions.length) {
    return null;
  }
  // eslint-disable-next-line react/no-array-index-key
  const actionList = actions.map((action, index) => <li key={`action-${index}`}>{action}</li>);
  return actionList;
}

export interface CommentProps {
  /** List of action items rendered below the comment content */
  actions?: Array<React.ReactNode>; // action动作
  /** The element to display as the comment author. */
  author?: React.ReactNode; 
  /** The element to display as the comment avatar - generally an antd Avatar */
  avatar?: React.ReactNode;
  /** className of comment */
  className?: string;
  /** The main content of the comment */
  content: React.ReactNode;
  /** Nested comments should be provided as children of the Comment */
  children?: React.ReactNode;
  /** Comment prefix defaults to '.ant-comment' */
  prefixCls?: string;
  /** Additional style for the comment */
  style?: React.CSSProperties;
  /** A datetime element containing the time to be displayed */
  datetime?: React.ReactNode;
}

export default class Comment extends React.Component<CommentProps, {}> {
  renderNested = (prefixCls: string, children: any) => {
    return <div className={classNames(`${prefixCls}-nested`)}>{children}</div>;
  };

  renderComment = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      actions,
      author,
      avatar,
      children,
      className,
      content,
      prefixCls: customizePrefixCls,
      style,
      datetime,
      ...otherProps
    } = this.props;

    const prefixCls = getPrefixCls('comment', customizePrefixCls);

    const avatarDom = (
      <div className={`${prefixCls}-avatar`}>
        {typeof avatar === 'string' ? <img src={avatar} alt="comment-avatar" /> : avatar}
      </div>
    );

    const actionDom =
      actions && actions.length ? (
        <ul className={`${prefixCls}-actions`}>{getAction(actions)}</ul>
      ) : null;

    const authorContent = (
      <div className={`${prefixCls}-content-author`}>
        {author && <span className={`${prefixCls}-content-author-name`}>{author}</span>}
        {datetime && <span className={`${prefixCls}-content-author-time`}>{datetime}</span>}
      </div>
    );

    const contentDom = (
      <div className={`${prefixCls}-content`}>
        {authorContent}
        <div className={`${prefixCls}-content-detail`}>{content}</div>
        {actionDom}
      </div>
    );

    const comment = (
      <div className={`${prefixCls}-inner`}>
        {avatarDom}
        {contentDom}
      </div>
    );

    return (
      <div {...otherProps} className={classNames(prefixCls, className)} style={style}>
        {comment}
        {children ? this.renderNested(prefixCls, children) : null}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderComment}</ConfigConsumer>;
  }
}

```