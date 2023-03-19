import React, { memo } from 'react';

function Label(props) {
  const { title, description } = props;
  return (
    <div className="pb-2">
      <p className="text-xs text-gray-400 font-semibold leading-4 tracking-wider">
        {title}
      </p>
      <p className="text-sm font-medium leading-6 tracking-wider">
        {description}
      </p>
    </div>
  );
}

export default memo(Label);
