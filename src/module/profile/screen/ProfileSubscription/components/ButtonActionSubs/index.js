import { Button } from '@cp-component';
import { setFormatDate } from '@cp-util/common';
import { codeLifesaver, POLICY_STATUS } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import moment from 'moment';
import React, { useMemo } from 'react';
import Icon from 'react-icons-kit';
import { infoCircle } from 'react-icons-kit/fa';

function ButtonActionSubs({
  locale,
  lang,
  onRenewalPress,
  onResubsPress,
  onLapsePress,
  onComingSoonPress,
  tab,
  detailRes,
}) {
  const wordingButton = () => {
    if (tab === 'other') {
      return {
        upgrade: 'sudahProteksiMaksimumOther',
        renewal: 'renewalDescOther',
        gracePeriod: 'polisMasaTenggangOther',
      };
    }
    return {
      upgrade: 'sudahProteksiMaksimum',
      renewal: 'renewalDesc',
      gracePeriod: 'polisMasaTenggang',
    };
  };

  const RenderButton = () => {
    if (!detailRes?.isSubscribe) {
      return (
        <>
          <p className="text-sm pb-3 xs:text-xs font-semibold opacity-70 mb-2">
            {trans(locale, lang, 'aktifkan')}
          </p>
          <div className="py-2 px-4 bg-orange-100 flex flex-row text-xs font-medium rounded-xl mb-2">
            <Icon icon={infoCircle} className="text-orange-500 mr-2" />
            <p>
              {trans(locale, lang, 'masihBisa')}
              <span className="font-bold whitespace-nowrap">
                {setFormatDate(
                  moment(detailRes?.policyDueDate).format('YYYY-MM-DD'),
                  lang,
                )}
              </span>
            </p>
          </div>
          <Button
            className="text-sm mb-2"
            type="linear-gradient"
            shadow
            full
            onButtonClick={onResubsPress}>
            {trans(locale, lang, 'aktifkanLagi')}
          </Button>
        </>
      );
    }
    if (detailRes?.isNewInvoice) {
      return (
        <div className="mb-2">
          {/* <p className="text-sm pb-3 xs:text-xs font-semibold opacity-70 mb-2">
            {trans(locale, lang, wordingButton().renewal)}
          </p> */}
          <Button
            className="text-sm my-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={onRenewalPress}>
            {trans(locale, lang, 'bayarSekarang')}
          </Button>
          <p className="text-sm pb-3 xs:text-xs mt-5">
            {trans(locale, lang, 'debitOtomatis')}
          </p>
        </div>
      );
    }
    if (detailRes?.status === POLICY_STATUS.gracePeriod) {
      return (
        <div className="my-3">
          <p className="text-sm pb-3 xs:text-xs font-semibold opacity-70">
            {trans(locale, lang, wordingButton().gracePeriod)}
          </p>
          <div className="py-2 px-4 bg-orange-100 flex flex-row text-xs font-medium rounded-xl mb-5">
            <Icon icon={infoCircle} className="text-orange-500 mr-2" />
            <p>
              {trans(locale, lang, 'agarTetapBisa')}
              <span className="font-bold">
                {setFormatDate(detailRes?.currentGraceDate, lang)}
                {trans(locale, lang, 'pukul')}
              </span>
            </p>
          </div>
          <Button
            className="text-sm mb-2"
            type="linear-gradient"
            shadow
            full
            onButtonClick={onRenewalPress}>
            {trans(locale, lang, 'bayarSekarang')}
          </Button>
          <p className="text-sm pb-3 xs:text-xs mt-5">
            {trans(locale, lang, 'debitOtomatis')}
          </p>
        </div>
      );
    }
    if (detailRes?.status === POLICY_STATUS.lapse) {
      return (
        <>
          <p className="text-sm pb-3 xs:text-xs font-semibold opacity-70">
            {trans(locale, lang, 'proteksiBerakhir')}
            {setFormatDate(detailRes?.policyDueDate, lang, true)}
          </p>
          <Button
            className="text-sm"
            type="linear-gradient"
            shadow
            full
            onButtonClick={onLapsePress}>
            {trans(locale, lang, 'btnLapse')}
          </Button>
        </>
      );
    }
    if (detailRes?.planName === codeLifesaver.lifesaverplus.planName)
      return (
        <div>
          <p className="text-sm xs:text-xs mt-5">
            {trans(locale, lang, wordingButton().upgrade)}
          </p>
          <p className="text-sm pb-3 xs:text-xs">
            {trans(locale, lang, 'debitOtomatis')}
          </p>
        </div>
      );
    return (
      <div>
        <p className="text-sm pb-3 mt-5 xs:text-xs">
          {trans(locale, lang, 'debitOtomatis')}
        </p>
      </div>
    );
  };

  return <RenderButton />;
}

export default ButtonActionSubs;
