import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import './Detail.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
function format(d) {
  const date = dayjs(d);
  return (
    date.format('MM-DD') +
    '-' +
    date.locale('zh-cn').format('ddd')
  );
}

const Detail = memo(function Detail(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    trainNumber,
    departStation,
    arriveStation,
    durationStr,
    toggleIsScheduleVisible
  } = props;

  const departDateStr = useMemo(() => {
    return format(departDate);
  }, [departDate]);

  const arriveDateStr = useMemo(() => {
    return format(arriveDate);
  }, [arriveDate]);

  return (
    <div className="detail">
      <div className="content">
        <div className="left">
          <p className="city">{departStation}</p>
          <p className="time">{departTimeStr}</p>
          <p className="date">{departDateStr}</p>
        </div>
        <div className="middle">
          <p className="train-name">{trainNumber}</p>
          <p className="train-mid">
            <span className="left"></span>
            <span
              className="schedule"
              onClick={() => toggleIsScheduleVisible()}
            >
              时刻表
            </span>
            <span className="right"></span>
          </p>
          <p className="train-time">耗时{durationStr}</p>
        </div>
        <div className="right">
          <p className="city">{arriveStation}</p>
          <p className="time">{arriveTimeStr}</p>
          <p className="date">{arriveDateStr}</p>
        </div>
      </div>
    </div>
  );
});
Detail.propTypes = {
  departDate: PropTypes.number.isRequired,
  arriveDate: PropTypes.number.isRequired,
  departTimeStr: PropTypes.string,
  arriveTimeStr: PropTypes.string,
  trainNumber: PropTypes.string.isRequired,
  departStation: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired,
  durationStr: PropTypes.string,
  toggleIsScheduleVisible: PropTypes.func.isRequired
};
export default Detail;
