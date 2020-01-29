import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Menu.css';

const MenuItem = memo(function MenuItem(props) {
  const { title, value, onPress, active } = props;
  return (
    <li
      className={classnames({ active })}
      onClick={() => onPress(value)}
    >
      {title}
    </li>
  );
});
MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};

const Menu = memo(function Menu(props) {
  const { show, onPress, options, hideMenu } = props;
  return (
    <div>
      {show && (
        <div
          className="menu-mask"
          onClick={() => hideMenu()}
        ></div>
      )}
      <div
        className={classnames('menu', {
          show
        })}
      >
        <div className="menu-title"></div>
        <ul>
          {options &&
            options.map(option => {
              return (
                <MenuItem
                  key={option.value}
                  {...option}
                  onPress={onPress}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
});
Menu.propTypes = {
  show: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  options: PropTypes.array,
  hideMenu: PropTypes.func.isRequired
};
export default Menu;
