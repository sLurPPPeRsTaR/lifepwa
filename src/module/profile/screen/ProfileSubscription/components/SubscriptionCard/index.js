import { LifeSaver, LifeSaverPlus, LifesaverPOS } from '@cp-config/Images';
import { trans } from '@cp-util/trans';
import clsx from 'classnames';
import moment from 'moment';
import Icon from 'react-icons-kit';
import { formatCurrency } from '@cp-util/numbro';
import { chevronDown } from 'react-icons-kit/ionicons';
import locale from '../../locale';
import { useState, memo } from 'react';

function SubscriptionCard(props) {
  const { lang, data, onDetail } = props;
  const [isExpand, setExpand] = useState(false);

  const renderImage = () => {
    if (data?.planName === 'LifeSAVER+') {
      return LifeSaverPlus;
    }
    if (data?.planName === 'LifeSAVER') {
      return LifeSaver;
    }
    return LifesaverPOS;
  };

  return (
    <div
      className={clsx(
        'my-6 px-3 py-4 shadow-md border rounded-3xl md:p-5',
        data?.status === 'ACTIVE' ? 'bg-white' : 'bg-[#EBEEF0]',
      )}>
      <div className="flex flex-row justify-between items-center">
        <p className="font-bold text-sm leading-5 tracking-wider mr-2 xs:w-7/12 sm:w-fit">
          {data?.receiverName}
        </p>
        <div className="flex-1">
          <img src={renderImage()} style={{aspectRatio: 52/9}} width={52} />
        </div>
        <p
          className={clsx(
            'font-semibold text-xs leading-4 tracking-wider',
            data?.status === 'ACTIVE' ? 'text-[#00B76A]' : 'text-[#C33025]',
          )}>
          {data?.status}
        </p>
      </div>
      <div className="flex flex-row justify-between items-center py-2">
        <p className="font-medium text-xs leading-4 tracking-wider text-[#666B6F]">
          {trans(locale, lang, 'jatuhTempo')}
        </p>
        <p className="font-semibold text-xs leading-4 tracking-wider">
          {moment(data?.policyDueDate).format('DD MMMM YYYY')}
        </p>
      </div>
      {isExpand && (
        <>
          <div className="flex flex-row justify-between items-center py-2">
            <p className="font-medium text-xs leading-4 tracking-wider text-[#666B6F]">
              {trans(locale, lang, 'harga')}
            </p>
            <p className="font-semibold text-xs leading-4 tracking-wider">
              Rp {formatCurrency({ value: data?.subscriptionFee, mantissa: 0 })}
              ,-/{trans(locale, lang, 'bulan')}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center py-2">
            <p className="font-medium text-xs leading-4 tracking-wider text-[#666B6F]">
              {trans(locale, lang, 'durasiProteksi')}
            </p>
            <p className="font-semibold text-xs leading-4 tracking-wider">
              {data?.protectionCycleInMonth} {trans(locale, lang, 'bulan')}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center py-2">
            <p className="font-medium text-xs leading-4 tracking-wider text-[#666B6F]">
              {trans(locale, lang, 'nomorHp')}
            </p>
            <p className="font-semibold text-xs leading-4 tracking-wider">
              {data?.phoneNumber}
            </p>
          </div>
          <div
            role="button"
            onClick={() => {
              onDetail(data?.policyNo, data?.receiverName, data?.relationType, data?.phoneNumber);
            }}
            className="flex flex-row-reverse py-2">
            <p className="font-semibold text-sm leading-6 tracking-wider text-[#ED1C24]">
              {trans(locale, lang, 'lihatDetail')}
            </p>
          </div>
        </>
      )}
      <div
        role="button"
        onClick={() => {
          setExpand(!isExpand);
        }}
        className="flex justify-center py-2">
        <Icon
          icon={chevronDown}
          size={18}
          className={clsx(
            'transform -scale-100 text-primary-dark-primary90',
            isExpand ? 'rotate-120' : 'rotate-180',
            'delay-75',
            'duration-75',
            'transition',
            'ease-linear',
          )}
        />
      </div>
    </div>
  );
}
export default memo(SubscriptionCard);
