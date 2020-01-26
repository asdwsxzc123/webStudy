import React from "react";
import switchImg from "./imgs/switch.svg";
import "./Journey.css";
export default function Journey(props) {
  const {
    from,
    to,
    exchangeFromTo,
    // 显示左侧true/右侧false
    showCitySelector
  } = props;
  return (
    <div className="journey">
      <div className="journey-station" onClick={() => showCitySelector(true)}>
        <input
          type="text"
          readOnly
          name="from"
          value={from}
          className="journey-input journey-from"
        />
      </div>
      <div className="journey-switch" onClick={exchangeFromTo}>
        {/* img引入svg文件 */}
        <img src={switchImg} alt="switch" width="70" height="40" />
      </div>
      <div className="journey-station" onClick={() => showCitySelector(false)}>
        <input
          type="text"
          readOnly
          name="to"
          value={to}
          className="journey-input journey-to"
        />
      </div>
    </div>
  );
}
