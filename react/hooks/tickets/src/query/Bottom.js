import React, {
  memo,
  useState,
  useMemo,
  useReducer
} from 'react';
import PropTypes from 'prop-types';
import './Bottom.css';
import classnames from 'classnames';
import Slider from './Slider';
import { ORDER_DEPART } from './constant';

function checkedReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'toggle':
      const newState = { ...state };
      if (payload in newState) {
        delete newState[payload];
      } else {
        newState[payload] = true;
      }
      return newState;
    case 'reset':
      return {};
    default:
      break;
  }
  return state;
}

const Filter = memo(function Filter(props) {
  const { name, checked, dispatch, value } = props;
  return (
    <li
      className={classnames({ checked })}
      onClick={() =>
        dispatch({
          payload: value,
          type: 'toggle'
        })
      }
    >
      {name}
    </li>
  );
});
Filter.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

const Option = memo(function Option(props) {
  const { title, options, checkedMap, dispatch } = props;
  // update被删除,直接使用了dispatch
  // const toggle = useCallback(
  //   value => {
  //     const newCheckedMap = { ...checkedMap };
  //     if (value in newCheckedMap) {
  //       delete newCheckedMap[value];
  //     } else {
  //       newCheckedMap[value] = true;
  //     }
  //     dispatch(newCheckedMap);
  //   },
  //   [checkedMap, dispatch]
  // );
  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {options.map(option => {
          return (
            <Filter
              {...option}
              key={option.value}
              checked={option.value in checkedMap}
              dispatch={dispatch}
            />
          );
        })}
      </ul>
    </div>
  );
});
Option.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const BottomModal = memo(function BottomModal(props) {
  const {
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    toggleIsFiltersVisible
  } = props;

  // 将useState优化成useReducer,方便统一管理,Option里面toggle修改成了dispatch
  const [
    localCheckedTicketTypes,
    localCheckedTicketTypesDispatch
  ] = useReducer(
    checkedReducer,
    checkedTicketTypes,
    checkedTicketTypes => {
      return { ...checkedTicketTypes };
    }
  );
  const [
    localCheckedTrainTypes,
    localCheckedTrainTypesDispatch
  ] = useReducer(
    checkedReducer,
    checkedTrainTypes,
    checkedTrainTypes => {
      return { ...checkedTrainTypes };
    }
  );
  const [
    localCheckedDepartStations,
    localCheckedDepartStationsDispatch
  ] = useReducer(
    checkedReducer,
    checkedDepartStations,
    checkedDepartStations => {
      return { ...checkedDepartStations };
    }
  );
  const [
    localCheckedArriveStations,
    localCheckedArriveStationsDispatch
  ] = useReducer(
    checkedReducer,
    checkedArriveStations,
    checkedArriveStations => {
      return { ...checkedArriveStations };
    }
  );
  const [
    localDepartTimeStart,
    setLocalDepartTimeStart
  ] = useState(() => {
    return departTimeStart;
  });
  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(
    () => {
      return departTimeEnd;
    }
  );
  const [
    localArriveTimeStart,
    setLocalArriveTimeStart
  ] = useState(() => {
    return arriveTimeStart;
  });
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(
    () => {
      return arriveTimeEnd;
    }
  );

  const optionGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      dispatch: localCheckedTicketTypesDispatch
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      dispatch: localCheckedTrainTypesDispatch
    },
    {
      title: '出发车站',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      dispatch: localCheckedDepartStationsDispatch
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      dispatch: localCheckedArriveStationsDispatch
    }
  ];

  function sure() {
    setCheckedTicketTypes(localCheckedTicketTypes);
    setCheckedTrainTypes(localCheckedTrainTypes);
    setCheckedDepartStations(localCheckedDepartStations);
    setCheckedArriveStations(localCheckedArriveStations);

    setDepartTimeStart(localDepartTimeStart);
    setDepartTimeEnd(localDepartTimeEnd);
    setArriveTimeStart(localArriveTimeStart);
    setArriveTimeEnd(localArriveTimeEnd);

    toggleIsFiltersVisible();
  }
  const isResetDisabled = useMemo(() => {
    return (
      !Object.keys(localCheckedTicketTypes).length &&
      !Object.keys(localCheckedTrainTypes).length &&
      !Object.keys(localCheckedDepartStations).length &&
      !Object.keys(localCheckedArriveStations).length &&
      localDepartTimeStart === 0 &&
      localDepartTimeEnd === 24 &&
      localArriveTimeStart === 0 &&
      localArriveTimeEnd === 24
    );
  }, [
    localCheckedTicketTypes,
    localCheckedTrainTypes,
    localCheckedDepartStations,
    localCheckedArriveStations,
    localDepartTimeStart,
    localDepartTimeEnd,
    localArriveTimeStart,
    localArriveTimeEnd
  ]);

  function reset() {
    if (isResetDisabled) return;
    localCheckedTicketTypesDispatch({ type: 'reset' });
    localCheckedTrainTypesDispatch({ type: 'reset' });
    localCheckedDepartStationsDispatch({ type: 'reset' });
    localCheckedArriveStationsDispatch({ type: 'reset' });

    setLocalDepartTimeStart(0);
    setLocalDepartTimeEnd(24);
    setLocalArriveTimeStart(0);
    setLocalArriveTimeEnd(24);
  }
  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span
              className={classnames('reset', {
                disabled: isResetDisabled
              })}
              onClick={reset}
            >
              重置
            </span>
            <span className="ok" onClick={sure}>
              确定
            </span>
          </div>
          <div className="options">
            {optionGroup.map(group => (
              <Option {...group} key={group.title} />
            ))}
            <Slider
              title="出发时间"
              currentStartHours={localDepartTimeStart}
              currentEndHours={localDepartTimeEnd}
              onStartChanged={setLocalDepartTimeStart}
              onEndChanged={setLocalDepartTimeEnd}
            />
            <Slider
              title="到达时间"
              currentStartHours={localArriveTimeStart}
              currentEndHours={localArriveTimeEnd}
              onStartChanged={setLocalArriveTimeStart}
              onEndChanged={setLocalArriveTimeEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
BottomModal.propTypes = {
  toggleIsFiltersVisible: PropTypes.func.isRequired,
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired
};
const Bottom = function Bottom(props) {
  const {
    highSpeed,
    orderType,
    onlyTickets,
    isFiltersVisible,
    toggleHighSpeed,
    toggleOrderType,
    toggleIsFiltersVisible,
    toggleOnlyTickets,

    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd
  } = props;
  const noChecked = useMemo(() => {
    return (
      !Object.keys(checkedTicketTypes).length &&
      !Object.keys(checkedTrainTypes).length &&
      !Object.keys(checkedDepartStations).length &&
      !Object.keys(checkedArriveStations).length &&
      departTimeStart === 0 &&
      departTimeEnd === 24 &&
      arriveTimeStart === 0 &&
      arriveTimeEnd === 24
    );
  }, [
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  ]);
  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className="item" onClick={toggleOrderType}>
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART
            ? '出发 早-晚'
            : '耗时 短-长'}
        </span>
        <span
          className={classnames('item', {
            'item-on': highSpeed
          })}
          onClick={toggleHighSpeed}
        >
          <i className="icon">
            {highSpeed ? '\uf43f' : '\uf43e'}
          </i>
          只看高铁/动车
        </span>
        <span
          className={classnames('item', {
            'item-on': onlyTickets
          })}
          onClick={toggleOnlyTickets}
        >
          <i className="icon">
            {onlyTickets ? '\uf43d' : '\uf43c'}
          </i>
          只看有票
        </span>
        <span
          className={classnames('item', {
            'item-on': isFiltersVisible || !noChecked
          })}
          onClick={toggleIsFiltersVisible}
        >
          <i className="icon">
            {noChecked ? '\uf0f7' : '\uf446'}
          </i>
          综合筛选
        </span>
      </div>
      {isFiltersVisible && (
        <BottomModal
          ticketTypes={ticketTypes}
          trainTypes={trainTypes}
          departStations={departStations}
          arriveStations={arriveStations}
          checkedTicketTypes={checkedTicketTypes}
          checkedTrainTypes={checkedTrainTypes}
          checkedDepartStations={checkedDepartStations}
          checkedArriveStations={checkedArriveStations}
          departTimeStart={departTimeStart}
          departTimeEnd={departTimeEnd}
          arriveTimeStart={arriveTimeStart}
          arriveTimeEnd={arriveTimeEnd}
          setCheckedTicketTypes={setCheckedTicketTypes}
          setCheckedTrainTypes={setCheckedTrainTypes}
          setCheckedDepartStations={setCheckedDepartStations}
          setCheckedArriveStations={setCheckedArriveStations}
          setDepartTimeStart={setDepartTimeStart}
          setDepartTimeEnd={setDepartTimeEnd}
          setArriveTimeStart={setArriveTimeStart}
          setArriveTimeEnd={setArriveTimeEnd}
          toggleIsFiltersVisible={toggleIsFiltersVisible}
        />
      )}
    </div>
  );
};
Bottom.propTypes = {
  highSpeed: PropTypes.bool.isRequired,
  orderType: PropTypes.number.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  isFiltersVisible: PropTypes.bool.isRequired,

  toggleHighSpeed: PropTypes.func.isRequired,
  toggleOrderType: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,

  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired
};
export default Bottom;
