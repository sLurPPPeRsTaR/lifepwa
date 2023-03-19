import Icon from 'react-icons-kit';
import clsx from 'classnames';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Headset, BgHeaderPage, Bell } from '@cp-config/Images';
import { ic_keyboard_backspace } from 'react-icons-kit/md';
import { setCustomerCare } from '@cp-bootstrap/bootstrapAction';
import { NAVIGATION } from '@cp-util/constant';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setCustomerCare: (payload) => setCustomerCare(payload),
};

function Component({
  center,
  title,
  isHelp,
  isNotification,
  setCustomerCare,
  onClickBack,
  height = 'h-44 md:h-56',
  btnBack = true,
}) {
  const router = useRouter();
  return (
    <div className={clsx('relative w-full', height)}>
      <img
        src={BgHeaderPage}
        className="absolute h-full w-full top-0 left-0 z-0"
      />
      <div
        className={`relative flex h-full justify-between items-center ${
          center ? '' : 'pb-8 md:pb-12'
        }`}>
        <div className="w-14 md:w-20">
          {btnBack && (
            <Icon
              icon={ic_keyboard_backspace}
              size={'80%'}
              onClick={onClickBack}
              className="cursor-pointer ml-2 xm:ml-4 md:ml-8 text-white"
            />
          )}
        </div>
        <p className="w-full px-5 text-center text-white font-bold text-sm xm:text-lg md:text-2xl">
          {title}
        </p>
        <div className="w-14 flex items-center gap-2 md:w-20 lg:mr-6 md:mr-8 mr-3">
          {isHelp && (
            <div
              role="button"
              className="rounded-md w-8 p-1  duration-300 hover:bg-red-400"
              onClick={() => setCustomerCare(true)}>
              <img src={Headset} className="w-full" />
            </div>
          )}
          {isNotification && (
            <div
              role="button"
              onClick={() => {
                router.push(NAVIGATION.NOTIFICATION.NotificationMain);
              }}>
              <img src={Bell} className="relative w-5" />
              {/* isNotification?.data?.count di bawah ini nanti di ubah */}
              {isNotification && isNotification?.data?.count > 0 && (
                <div className="h-4 absolute bg-yellow-500 ml-3 -top-2 rounded-full px-1">
                  <span className="text-white h-full w-full text-[10px] grid place-content-center">
                    {isNotification.data.count > 99
                      ? '99+'
                      : isNotification.data.count}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
