import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Account.css';
const Account = memo(function Account(props) {
  const { price = 0, length } = props;
  console.log(price, length);
  const [expended, setExpended] = useState(false);
  return (
    <div className="account">
      <div
        className={classnames('price', { expended })}
        onClick={() => setExpended(!expended)}
      >
        <div className="money">{length * price}</div>
        <div className="amount">支付金额</div>
      </div>
      <div className="button">提交按钮</div>
      <div
        className={classnames('layer', {
          hidden: !expended
        })}
        onclick={() => setExpended(false)}
      ></div>
      <div
        className={classnames('detail', {
          hidden: !expended
        })}
        onclick={() => setExpended(false)}
      >
        <div className="title">金额详情</div>
        <ul>
          <li>
            <span>火车票</span>
            <span>¥{price}</span>
            <span>&#xD7; {length}</span>
          </li>
        </ul>
      </div>
    </div>
  );
});
Account.propTypes = {
  price: PropTypes.number,
  length: PropTypes.number.isRequired
};
export default Account;
