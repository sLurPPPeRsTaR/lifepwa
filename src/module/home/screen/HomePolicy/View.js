/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { trans } from '@cp-util/trans';
import { ProfileAddress } from '@cp-config/Images';
import { Refresh } from '@cp-config/Svgs';
import { NAVIGATION } from '@cp-util/constant';

import { CardPolis } from '@cp-component';
import locale from './locale';

export default function Page(props) {
  const { lang, userData, token, getPoliciesResponse, getPoliciesError } =
    props;
  moment.locale(lang);
  const router = useRouter();
  const [polisActive, setPolisActive] = useState([]);
  const [polisNonActive, setPolisNonActive] = useState([]);

  useEffect(() => {
    const listActive = getPoliciesResponse?.data
      .filter((i) => i.statusCode === 'active' || i.statusName == 'PASIF')
      .sort((a, b) => (a?.insuranceStartDate < b?.insuranceStartDate ? 1 : -1));
    const listNonActive = getPoliciesResponse?.data.filter(
      (i) => i.statusCode === 'non-active' && i.statusName !== 'PASIF',
    );
    setPolisActive(listActive?.slice(0, 4));
    if (listActive?.length < 4) {
      setTimeout(() => {
        setPolisNonActive(listNonActive?.slice(0, 4 - listActive.length));
      }, 1000);
    }
  }, [getPoliciesResponse]);

  function renderEmptyPolicy() {
    const isGetPoliciesError = getPoliciesError?.message;

    return (
      <div className="grid place-items-center">
        {isGetPoliciesError ? (
          <img className="max-w-[180px] mx-auto mb-5" src={Refresh} />
        ) : (
          <img className="max-w-[180px] mx-auto" src={ProfileAddress} />
        )}
        {!token ? (
          <>
            <p className="text-center font-bold mt-2 text-xs xm:text-sm md:text-base mb-2">
              {isGetPoliciesError
                ? trans(locale, lang, 'kontentGagal')
                : trans(locale, lang, 'belumAdaData')}
            </p>
            <p className="font-bold opacity-80 text-center text-xs xm:text-sm">
              {trans(locale, lang, 'silahkan')}{' '}
              <span
                role="button"
                className="text-red-500 hover:underline"
                onClick={() => router.push(NAVIGATION.LOGIN.Login)}>
                {trans(locale, lang, 'login')}
              </span>
              <span className="text-red-500 hover:underline">
                {trans(locale, lang, 'atau')}
              </span>
              <span
                role="button"
                className="text-red-500 hover:underline"
                onClick={() => router.push(NAVIGATION.REGISTER.Register)}>
                {trans(locale, lang, 'register')}
              </span>
              {trans(locale, lang, 'dahulu')}
            </p>
          </>
        ) : token && !userData.alreadyKYC && !isGetPoliciesError ? (
          <>
            <p className="text-center font-bold text-xs xm:text-sm md:text-base mb-2">
              {trans(locale, lang, 'belumAdaData')}
            </p>
            <p className="font-bold opacity-80 text-center text-xs xm:text-sm">
              {trans(locale, lang, 'silahkanVerifikasi')}{' '}
              <span
                role="button"
                className="text-red-500 hover:underline"
                onClick={() => router.push(NAVIGATION.KYC.KycMain)}>
                {trans(locale, lang, 'disini')}
              </span>
            </p>
          </>
        ) : token && userData.alreadyKYC ? (
          <>
            <p className="text-center font-bold text-xs xm:text-sm md:text-base mb-2">
              {trans(locale, lang, 'belumAdaData')}
            </p>
            <p className="font-bold opacity-80 text-center text-xs xm:text-sm max-w-sm">
              {trans(locale, lang, 'kamuBelumMemiliki')}{' '}
              <span
                role="button"
                className="text-red-500 hover:underline"
                onClick={() => router.push(NAVIGATION.LIFESAVER.LifesaverMain)}>
                {trans(locale, lang, 'cariProteksi')}
              </span>{' '}
              {trans(locale, lang, 'yangCocok')}
            </p>
          </>
        ) : isGetPoliciesError ? (
          <>
            <text className="text-center font-bold text-lg mb-2">
              {trans(locale, lang, 'kontentGagal')}
            </text>
            <text className=" font-bold opacity-70 text-center text-xs md:text-md lg:text-lg">
              <span
                role="button"
                className="text-[#ED1C24]"
                onClick={() => router.push(NAVIGATION.HOME.Home)}>
                {trans(locale, lang, 'muatUlang')}
              </span>{' '}
            </text>
          </>
        ) : null}
      </div>
    );
  }

  const renderPolicy = () => {
    if (!token || getPoliciesResponse?.data?.length < 1) {
      return renderEmptyPolicy();
    }

    return (
      <div className="grid gap-2 xs:grid-cols-1 md:gap-4 md:grid-cols-2">
        {polisActive.map((item, idx) => (
          <CardPolis
            key={idx}
            idx={idx}
            item={item}
            navFrom={NAVIGATION.HOME.Home}
          />
        ))}
        {polisNonActive.map((item, idx) => (
          <CardPolis
            key={idx}
            idx={idx}
            item={item}
            navFrom={NAVIGATION.HOME.Home}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-center pt-5 pb-10">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xs xm:text-sm md:text-body1">
              {trans(locale, lang, 'polisKamu')}
            </div>
            {token && getPoliciesResponse?.data?.length > 0 && (
              <div
                role="button"
                className="flex items-center font-bold text-[11px] xm:text-xs text-red-500 hover:underline"
                onClick={() => router.push(NAVIGATION.POLICY.Polis)}>
                {trans(locale, lang, 'lihatSemua')}
              </div>
            )}
          </div>
          {renderPolicy()}
        </div>
      </div>
    </>
  );
}
