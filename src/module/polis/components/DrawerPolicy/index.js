import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather';

function DrawerPolicy(props) {
  const { id, activePage, onClick, title } = props;
  return (
    <div
      className={`cursor-pointer w-full ml-0 flex flex-row justify-between h-auto p-3 md:p-5
            ${activePage == id ? ' bg-red-100' : ''}`}
      onClick={onClick}>
      <p
        className={
          activePage == id ? 'font-semibold text-red-400' : 'font-semibold'
        }>
        {title}
      </p>
      <div className="xs:hidden md:block">
        <Icon
          className={
            activePage == id ? 'font-semibold text-red-400' : 'font-semibold'
          }
          icon={chevronRight}
        />
      </div>
    </div>
  );
}

export default DrawerPolicy;

DrawerPolicy.propTypes = {
  activePage: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
