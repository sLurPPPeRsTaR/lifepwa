// import { extrakDateEvent } from '@cp-util/func'
import propTypes from 'prop-types';
import clsx from 'classnames';
import { BgRedYellow } from '@cp-config/Images';
import { setFormatDate, setRupiah } from '@cp-util/common';
import { trans } from '@cp-util/trans';
import locale from './locale';

export default function Component(props) {
  const {
    lang,
    payload,
    onDetail,
    getPolicyWidgetHomeResponse,
    getPolicyWidgetHomePublicResponse,
  } = props;

  const banner = payload?.banner?.filter((item) => item.position === 0);
  const closed = payload.closed || payload.isClosedRegister;

  return (
    <button
      className="relative w-full mb-3 flex overflow-hidden justify-center items-center rounded-xl md:rounded-2xl shadow"
      onClick={onDetail}>
      <img src={BgRedYellow} className="relative z-0" />
      <img
        src={banner[0]?.url}
        className={clsx('absolute z-10 top-0 left-0 w-full h-full', {
          ['disable-img']: closed,
        })}
      />
      {payload?.type === 'CLAIM_BANNER' && (
        <div className="absolute z-20 top-1/2 left-1/2 translate-x-[-50%]">
          <p className="pb-1 text-sm md:text-base">
            {trans(locale, lang, 'periode')}
            {setFormatDate(
              getPolicyWidgetHomePublicResponse?.data?.totalClaim?.oldestDate,
            )}
            {' - '}
            {setFormatDate(
              getPolicyWidgetHomePublicResponse?.data?.totalClaim?.latestDate,
            )}
          </p>
          <p className="font-bold text-sm md:text-base">
            {setRupiah(
              getPolicyWidgetHomePublicResponse?.data?.totalClaim?.totalClaim,
              lang,
            )}
          </p>
        </div>
      )}
    </button>
  );
}

const types = {
  payload: propTypes.shape({
    banner: propTypes.array,
    name: propTypes.string,
    startDateTime: propTypes.string,
    endDateTime: propTypes.string,
    city: propTypes.string,
  }),
  onDetail: propTypes.func,
  lang: propTypes.oneOf(['id', 'en']),
};

const defaultProps = {
  payload: {
    banner: [],
    name: 'name',
    startDateTime: new Date(),
    endDateTime: new Date(),
    city: 'city',
  },
  onDetail: () => {},
  lang: 'id',
};

Component.defaultProps = defaultProps;
Component.propTypes = types;
