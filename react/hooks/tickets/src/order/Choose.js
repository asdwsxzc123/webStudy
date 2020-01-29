import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Choose.css';
const Choose = memo(function Choose(props) {
  const { passengers, updatePassenger } = props;
  function createSeat(seatType, idx) {
    return (
      <div key={idx}>
        {passengers.map(passenger => {
          return (
            <p
              onClick={() =>
                updatePassenger(passenger.id, { seat: seatType })
              }
              key={passenger.id}
              className={classnames('seat', {
                active: passenger.seat === seatType
              })}
              data-text={seatType}
            >
              &#xe02d;
            </p>
          );
        })}
      </div>
    );
  }
  const seatLeftTypes = ['A', 'B', 'C', 'D'];
  const seatRightTypes = ['E', 'F'];
  return (
    <div className="choose">
      <p className="tip">在线选择</p>
      <div className="container">
        <div className="seats">
          <div>窗</div>
          {seatLeftTypes.map((seatType, idx) =>
            createSeat(seatType, idx)
          )}
          <div>过道</div>
          {seatRightTypes.map((seatType, idx) =>
            createSeat(seatType, idx)
          )}
          <div>窗</div>
        </div>
      </div>
    </div>
  );
});
Choose.propTypes = {
  passengers: PropTypes.array.isRequired,
  updatePassenger: PropTypes.func.isRequired
};
export default Choose;
