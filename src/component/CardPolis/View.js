import moment from 'moment';
import clsx from 'classnames';
import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { eye, eyeBlocked, arrowRight2 } from 'react-icons-kit/icomoon';
import { NAVIGATION } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import locale from './locale';
import {
  PolicyCardBackground,
  PolisActive,
  PolisPassive,
} from '@cp-config/Images';
import { formatCurrency } from '@cp-util/numbro';
import _ from 'lodash';

export default function Component({
  lang,
  item,
  token,
  navFrom,
  userData,
  setSelectedPolicy,
  setKkpmTemp,
  isValueOpen,
  onValueClick,
}) {
  const router = useRouter();

  const handleClickAnuitas = (e) => {
    e.stopPropagation();
    if (!userData?.alreadyKYC && !token) {
      router.push(NAVIGATION.KYC.KycMain);
    } else {
      setKkpmTemp({
        category: 'manual',
        certificateNo: item?.certificateNo,
        policyNo: item?.policyNo || item?.oldPolicyNo,
        source: item?.source,
        navFrom: navFrom,
      });
      setTimeout(() => {
        router.push(NAVIGATION.UPDATA.Updata);
      }, 500);
    }
  };

  useEffect(() => {
    moment.locale(lang);
  }, [lang]);

  return (
    <div
      role="button"
      className="
          relative bg-white border rounded-2xl md:rounded-2xl overflow-hidden shadow-sm duration-500 shadow-gray-100 hover:shadow-lg"
      onClick={() => {
        setSelectedPolicy(item);
        router.push(NAVIGATION.POLICY.PolisDetail);
      }}>
      <div className="relative px-2 py-3 pt-1 pb-2 md:pb-4">
        <img
          src={PolicyCardBackground}
          className="absolute top-0 left-0 z-0 h-full"
        />
        <div className="relative z-10 flex flex-row justify-between px-[5%] items-center">
          <div className="w-full self-center">
            <div className="w-full h-auto flex flex-row">
              <img
                src={
                  item.statusCode !== 'active' && item.statusName !== 'PASIF'
                    ? PolisPassive
                    : PolisActive
                }
                className="w-8 mr-1 xm:w-9 md:w-12 md:mr-2"
              />

              <div className="p-2 xm:p-3 text-sm xs:text-xs">
                <p className="text-sm xm:text-base md:text-lg xm:pb-1 font-bold">
                  {item.productName}
                </p>
                <p className="text-xs md:text-sm">
                  {item.policyNo || item.oldPolicyNo}
                  {/* {item.participantName} */}
                </p>

                {_.isNumber(item?.value) && Number(item?.value) != 0 && (
                  <div className="flex flex-row items-center">
                    <p
                      className="text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onValueClick();
                      }}>
                      Rp{' '}
                      {isValueOpen
                        ? formatCurrency({ value: item?.value })
                        : '**************'}
                    </p>
                    <Icon
                      role="button"
                      icon={isValueOpen ? eye : eyeBlocked}
                      className="p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        onValueClick();
                      }}
                    />
                  </div>
                )}
                <p className="text-xs md:text-sm text-gray-400">
                  {moment(item.insuranceStartDate).format('DD MMM YY')} -{' '}
                  {moment(item.insuranceEndDate).format('DD MMM YY')}
                </p>
              </div>
            </div>

            <div className="w-full h-auto flex flex-row border-t border-dashed border-gray-400 justify-between items-center pt-2 md:pt-3 ">
              <p
                className={clsx(
                  'text-[11px] md:text-sm font-semibold ',
                  item.statusCode !== 'active' && item.statusName !== 'PASIF'
                    ? 'text-gray-400'
                    : 'text-[#ED1C24]',
                )}>
                {item.statusName == 'LAPSE' ? 'LAPSED' : item.statusName}
              </p>
              {item?.clientCode && (
                <p className="text-[10px] py-0.5 bg-red-100 text-red-500 font-bold rounded-md px-3 md:text-xs">
                  {trans(locale, lang, item?.clientCode)}
                </p>
              )}
            </div>

            {item?.isAlter === 'true' && (
              <div
                role="button"
                className="w-full mx-auto mt-4 text-[11px] rounded-lg px-4 py-[6px] font-bold text-center border border-red-500 text-red-500 md:w-2/3 md:text-xs"
                onClick={handleClickAnuitas}>
                {trans(locale, lang, 'pengkinian')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
