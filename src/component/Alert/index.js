import clsx from 'classnames';
import Icon from 'react-icons-kit';
import { androidAlert } from 'react-icons-kit/ionicons';

export default function Component({ onClick, children, className, classTitle, iconColor }) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-2 mt-4 items-center bg-secondary-light-secondary20/[.26] p-3 rounded-2xl ${className}`}>
      <div className="w-6 h-6">
        <Icon
          icon={androidAlert}
          size={22}
          className={clsx(iconColor ? iconColor : 'text-yellow-500')}
        />
      </div>
      <div className={clsx('w-full text-[11px] font-medium xm:text-xs md:text-sm', className, classTitle)}>
        {children}
      </div>
    </div>
  );
}
