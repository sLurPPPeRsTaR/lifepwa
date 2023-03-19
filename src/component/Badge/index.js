import { Icon } from 'react-icons-kit';
import { x } from 'react-icons-kit/feather';

export default function index({
  title,
  onClick,
  close,
  black,
  className,
  disabled,
}) {
  return (
    <button
      role="button"
      className={`flex py-1 px-3 w-fit leading-3 h-fit items-center border rounded-full text-[10px] duration-300 md:text-[11px] hover:bg-red-50 ${
        black ? 'border-black' : 'border-red-400 text-red-400'
      } ${className}`}
      disabled={disabled}
      onClick={onClick}>
      {title}
      {close && <Icon icon={x} size={12} className="pl-2 " />}
    </button>
  );
}
