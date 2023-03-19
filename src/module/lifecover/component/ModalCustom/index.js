import { Modal } from '@cp-component';
import React from 'react';
import Icon from 'react-icons-kit';
import { x } from 'react-icons-kit/feather';
import clsx from 'classnames';
import Body from './Body';

const ModalCustom = ({
  size = 'sm',
  isOpen,
  toggle,
  title,
  children,
  imageSrc,
  className,
  imageClassName,
  isOverlapImage = false,
  withCloseToggler = false,
}) => {
  const rootClass = clsx(
    'relative flex flex-col items-center text-center py-[50px]',
    className,
  );
  const imageClass = clsx(
    'h-[160px] w-[160px] relative overflow-hidden',
    {
      'mt-[-140px]': isOverlapImage,
    },
    imageClassName,
  );

  const handleToggle = () => {
    if (toggle) {
      toggle();
    }
  };

  return (
    <Modal
      size={size}
      isOpen={isOpen}
      className={rootClass}
      toggle={handleToggle}>
      {withCloseToggler && (
        <button className="absolute top-[20px] left-[20px] text-gray-400">
          <Icon icon={x} size={20} onClick={handleToggle} />
        </button>
      )}

      {title && (
        <div className=" ml-11 xm:ml-7 md:ml-0 lg:ml-0 text-sm md:text-[16px] font-bold border-b text-center py-6">
          {title}
        </div>
      )}

      {imageSrc && (
        <div className={imageClass}>
          <img src={imageSrc} className="object-contain w-full h-full" />
        </div>
      )}

      <div className="w-full px-[5%]">{children}</div>
    </Modal>
  );
};

export default Object.assign(ModalCustom, {
  Body,
});
