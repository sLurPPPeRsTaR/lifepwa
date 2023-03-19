import clsx from 'classnames';
import { VectorBackground } from '@cp-config/Images';

export default function Component({
  children,
  className,
  isOpen,
  noBackground,
  noPadding,
  size = 'sm',
  toggle,
  mainClassname,
}) {
  if (isOpen) {
    return (
      <div
        onClick={toggle}
        className={clsx(
          'fixed inset-0 w-screen min-h-screen z-50 bg-black/60 px-3 xm:px-6 py-4 overflow-auto',
          {
            '!p-0': size === 'full',
          },
          mainClassname,
        )}>
        <div className="min-h-full flex items-center z-20">
          <div
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              'w-full rounded-2xl mx-auto py-4',
              !noBackground && 'bg-white',
              !noPadding ? 'px-4' : 'px-0',
              {
                'max-w-[375px]': size === 'sm',
                'max-w-[640px]': size === 'md',
                'max-screen min-h-screen !rounded-none': size === 'full',
              },
              className,
            )}>
            {children}
          </div>
        </div>

        {size === 'full' && (
          <img
            src={VectorBackground}
            className="absolute bottom-0 left-0 w-full h-2/3 z-0"
          />
        )}
      </div>
    );
  }

  return null;
}
