import { DefaultBackground } from '@cp-config/Images';
import clsx from 'classnames';

export default function Component({
  children,
  className,
  fullScreen,
  noBackground,
  background,
}) {
  return (
    <div className={clsx('w-full flex justify-center', background)}>
      {!noBackground ? (
        <img
          src={DefaultBackground}
          className="absolute inset-0 w-screen h-screen"
        />
      ) : null}
      <div className="z-10 w-full xs:min-h-[95vh] md:h-auto lg:h-auto  from-[#FC3F55] via-[#FF5367] to-[#EC001C]">
        <div
          className={clsx(
            'w-full h-full flex justify-center',
            !fullScreen && 'sm:py-4 sm:px-4',
          )}>
          <div
            className={clsx(
              'w-screen from-[#FDFDFD] to-[#F1F1F1]',
              !noBackground && 'bg-white',
              fullScreen ? 'max-w-[1440px]' : 'sm:max-w-[560px] sm:rounded-2xl',
              className,
            )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
