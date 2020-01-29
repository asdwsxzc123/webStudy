import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { h0 } from '../common/fp';
import './DepartDate.css';
// departDate的数据不纯,h0()不依赖外部变量,而是使用了系统时间,所有不能使用memo优化
function DepartDate(props) {
  const { time, onClick } = props;
  const h0OfDepart = h0(time);
  const departDate = new Date(h0OfDepart);
  const departDateString = useMemo(() => {
    return dayjs(h0OfDepart).format('YYYY-MM-DD');
  }, [h0OfDepart]);

  const isToday = h0OfDepart === h0();

  const weekString =
    '周' +
    ['日', '一', '二', '三', '四', '五', '六'][
      departDate.getDay()
    ] +
    (isToday ? '(今天)' : '');

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={h0OfDepart} />
      {departDateString}
      <span className="depart-week">{weekString}</span>
    </div>
  );
}
DepartDate.propTypes = {
  time: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
export default DepartDate;
