/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { trans } from '@cp-util/trans';
import { clock2 } from 'react-icons-kit/icomoon';
import { getTimeLeft } from '@cp-util/common';
import { Button, Alert } from '@cp-component';
import { chevronRight } from 'react-icons-kit/feather';
import { NAVIGATION } from '@cp-util/constant';
import { paperPlane } from 'react-icons-kit/fa';
import locale from './locale';
import 'moment/locale/id';
import 'moment/locale/en-gb';
import {
  IfgLifeRed,
  LifeSaver,
  LifeSaverPlus,
  PolisActive,
  ArrowRightSquare,
  LifesaverPOS,
  LogoLifeCoverPlus,
  LogoLifeCover,
  LogoMyLifeCover,
} from '@cp-config/Images';
import {
  GET_POLICY_SUMMARY_FAILED,
  GET_POLICY_SUMMARY_SUCCESS,
} from '@cp-module/polis/polisConstant';
import { formatCurrency } from '@cp-util/numbro';

export default function Page(props) {
  const {
    lang,
    setLoading,
    polisAction,
    polis,
    getPolicySummary,
    getPolicySummaryResponse,
    setNotAvailable,
    getPolicyWidgetHome,
    getPolicyWidgetHomeResponse,
  } = props;

  const router = useRouter();

  //time state
  const [remainingSecSport, setRemainingSecSport] = useState(null);
  const [timeLeftSport, setTimeLeftSport] = useState(null);
  const [remainingSecMedical, setRemainingSecMedical] = useState(null);
  const [timeLeftMedical, setTimeLeftMedical] = useState(null);
  const [remainingGracePeriod, setRemainingGracePeriod] = useState(null);
  const [timeLeftGracePeriod, setTimeLeftGracePeriod] = useState(null);

  const translate = (val) => trans(locale, lang, val);

  const isDigitalPolicy = useMemo(() => {
    return polis?.source === '001' || polis?.source === '002';
  }, [polis?.source]);

  moment.locale(lang);

  const summaryData = useMemo(() => {
    return getPolicySummaryResponse?.data?.summary;
  }, [getPolicySummaryResponse?.data?.summary]);

  const isExecuted = useRef(false);
  useEffect(() => {
    if (
      polis &&
      !isExecuted.current &&
      _.isEmpty(getPolicySummaryResponse?.data)
    ) {
      var params = {
        policyNo: polis?.policyNo || polis?.oldPolicyNo,
        productCode: polis?.productCode,
        source: polis?.source,
      };
      setLoading(true);
      getPolicySummary(params);
      getPolicyWidgetHome();
      isExecuted.current = true;
    }
  }, [
    getPolicySummary,
    getPolicySummaryResponse?.data,
    getPolicyWidgetHome,
    polis,
    setLoading,
  ]);

  useEffect(() => {
    if (getPolicySummaryResponse?.data) {
      if (
        getPolicySummaryResponse?.data.progressTab != null &&
        getPolicySummaryResponse?.data.progressTab
      ) {
        setRemainingSecSport(
          getPolicySummaryResponse?.data.progressTab.sportInjuries,
        );
      } else {
        setRemainingSecSport(0);
      }

      if (getPolicySummaryResponse?.data?.progressTab?.medicalExpenses) {
        setRemainingSecMedical(
          getPolicySummaryResponse?.data.progressTab.medicalExpenses,
        );
      } else {
        setRemainingSecMedical(0);
      }
    }
  }, [getPolicySummaryResponse]);

  const getPolicySummaryResult = useCallback(
    (act) => {
      if (act === GET_POLICY_SUMMARY_SUCCESS) {
        setLoading(false);
        const data = getPolicySummaryResponse?.data;
        //  setRemainingSecMedical(data?.progressTab?.medicalExpenses);
        //  setRemainingSecSport(data?.progressTab?.sportInjuries);
        setRemainingGracePeriod(data?.secToGracePeriod);
      }
      if (act === GET_POLICY_SUMMARY_FAILED) {
        setLoading(false);
      }
    },
    [getPolicySummaryResponse?.data, setLoading],
  );

  useEffect(() => {
    getPolicySummaryResult(polisAction);
  }, [polisAction, getPolicySummaryResult]);

  // interval
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (remainingSecSport > 0) {
        setRemainingSecSport(remainingSecSport - 1);
        const tlB = getTimeLeft(remainingSecSport - 1);
        setTimeLeftSport(tlB);
      }
      if (remainingSecSport === 0) {
        const tlB = getTimeLeft(0);
        setTimeLeftSport(tlB);
      }
    }, 1000);

    const mySecondInterval = setInterval(() => {
      if (remainingSecMedical > 0) {
        setRemainingSecMedical(remainingSecMedical - 1);
        const tlB = getTimeLeft(remainingSecMedical - 1);
        setTimeLeftMedical(tlB);
      }
      if (remainingSecMedical === 0) {
        const tlB = getTimeLeft(0);
        setTimeLeftMedical(tlB);
      }
    }, 1000);

    const gracePeriod = setInterval(() => {
      if (remainingGracePeriod > 0) {
        setRemainingGracePeriod(remainingGracePeriod - 1);
        const tempTimeLeft = getTimeLeft(remainingGracePeriod - 1);
        setTimeLeftGracePeriod(tempTimeLeft);
        // setRemainingGracePeriod((prevState) => prevState);
      }
      if (remainingGracePeriod === 0) {
        const tempTimeLeft = getTimeLeft(0);
        setTimeLeftGracePeriod(tempTimeLeft);
      }
    }, 1000);

    if (remainingGracePeriod === 0) {
      clearInterval(gracePeriod);
    }
    if (remainingSecSport === 0) {
      clearInterval(myInterval);
    }
    if (remainingSecMedical === 0) {
      clearInterval(mySecondInterval);
    }

    return () => {
      clearInterval(myInterval);
      clearInterval(mySecondInterval);
      clearInterval(gracePeriod);
    };
  });

  function formatValue(value) {
    if (!value && value !== false) {
      return '-';
    }
    const regexNumber = /^[0-9]*$/;
    // Money
    if (!Number.isNaN(value) && Number.isFinite(value)) {
      return `Rp ${formatCurrency({ value })}`;
    }
    // Date
    if (!regexNumber.test(value) && moment(value, true).isValid()) {
      return moment(value, true).format('DD MMMM YYYY');
    }
    return value;
  }

  const dateFormat = useCallback(
    (date, add) => {
      const newDate = moment(date);

      newDate.format();
      const gracePeriodDate = moment(newDate)
        .add(add, 'seconds')
        .format('DD MMM YYYY');
      const gracePeriodTime = moment(newDate)
        .add(add, 'seconds')
        .format('HH:MM');

      return `${gracePeriodDate} ${trans(
        locale,
        lang,
        'pukul',
      )} ${gracePeriodTime}`;
    },
    [lang],
  );

  const renderHeader = () => {
    return (
      <div className="border-b-4 border-gray-100">
        <div className="w-full grid place-items-center h-auto p-5">
          <p className="font-bold">{trans(locale, lang, 'summary')}</p>
        </div>
      </div>
    );
  };

  function renderLifeCardWidget() {
    const summary = getPolicySummaryResponse?.data?.summary;
    const eCardLifesaver = getPolicySummaryResponse?.data?.eCardLifesaver;

    if (
      polis?.statusCode === 'active' &&
      polis?.source === '001' &&
      summary &&
      eCardLifesaver
    ) {
      return (
        <div className="border shadow-sm rounded-lg w-[90%] mx-auto mt-5">
          <div
            role="button"
            className="flex py-7 justify-between items-center px-[5%] group hover:bg-red-50/40"
            onClick={() => router.push(NAVIGATION.POLICY.PolisLifeCard)}>
            <div className="flex items-center">
              <img
                src={getPolicyWidgetHomeResponse?.data?.eCardLifesaver?.link}
                className="h-12 "
              />

              <div className="pl-2 xm:pl-4">
                <p className="font-bold text-sm">LifeCARD</p>
                <p className="text-xs">{translate('cashless')}</p>
              </div>
            </div>

            <img
              role="button"
              src={ArrowRightSquare}
              className="opacity-60 w-6 group-hover:opacity-100"
            />
          </div>
        </div>
      );
    }
    return null;
  }

  function renderWaitingPeriodWidget() {
    const resProgress = getPolicySummaryResponse?.data?.progressTab;
    const resSummary = getPolicySummaryResponse?.data?.summary;

    if (
      polis?.statusCode === 'active' &&
      polis?.source === '001' &&
      resProgress &&
      resSummary?.statusName !== 'GRACE PERIOD' &&
      timeLeftMedical !== null &&
      timeLeftSport !== null
    ) {
      const activeBadge = (
        <p
          className={`p-1 md:py-1 md:px-4 rounded-full font-bold whitespace-nowrap text-[9px] xm:text-[11px] md:text-xs text-green-500 bg-green-100`}>
          {trans(locale, lang, 'ACTIVE')}
        </p>
      );

      if (remainingSecMedical > 0 || remainingSecSport > 0) {
        return (
          <div className="border shadow-sm rounded-lg w-[90%] mx-auto mt-5 p-2 mb-2">
            <p className="text-sm pb-2 text-orange-300 md:text-base">
              <Icon className="mr-1" icon={clock2} />
              {trans(locale, lang, 'masaTunggu')}
            </p>
            <div className="text-sm w-full mb-1 flex justify-between">
              <p>{trans(locale, lang, 'biayaPengobatan')}</p>
              {remainingSecMedical > 0 ? (
                <p className="font-semibold mr-2">
                  {formatTime(timeLeftMedical)}
                </p>
              ) : (
                activeBadge
              )}
            </div>
            <div className="text-sm w-full mb-1 flex justify-between">
              <p>{trans(locale, lang, 'cederaOlahraga')}</p>
              {remainingSecSport > 0 ? (
                <p className="font-semibold mr-2">
                  {formatTime(timeLeftSport)}
                </p>
              ) : (
                activeBadge
              )}
            </div>
          </div>
        );
      }
    }
    return null;
  }

  function renderGracePeriodWidget() {
    const resSummary = getPolicySummaryResponse?.data?.summary;
    if (polis?.source !== '001' || resSummary?.statusName !== 'GRACE PERIOD') {
      return null;
    }
    return (
      <>
        <div className="px-[3%] mb-5">
          <Alert className="!items-start">
            {trans(locale, lang, 'notifMessage')}{' '}
            <span className="font-bold">
              {dateFormat(
                moment(),
                getPolicySummaryResponse?.data?.secToGracePeriod,
              )}
            </span>
          </Alert>
        </div>
      </>
    );
  }

  const renderSummaryPage = () => {
    if (!summaryData) {
      return null;
    }

    let colorStatus = '';
    if (summaryData.statusName === 'GRACE PERIOD') {
      colorStatus = 'text-yellow-500 bg-secondary-light-secondary20/[.26]';
    } else if (summaryData.statusName === 'ACTIVE') {
      colorStatus = 'text-green-500 bg-green-100';
    } else {
      colorStatus = 'text-gray-400 bg-gray-200';
    }

    const handleStatus = (status) => {
      if (status == 'LAPSE') {
        return <>LAPSED</>;
      } else if (status == 'GRACE PERIOD') {
        return trans(locale, lang, 'gracePeriod');
      } else if (status == 'ACTIVE') {
        return trans(locale, lang, 'ACTIVE');
      } else {
        return status;
      }
    };

    return (
      <div>
        <div className="w-full h-full grid place-items-center">
          <div className="w-[90%] h-auto border-b-2 border-dashed py-3 md:pt-6 md:pb-4">
            <div className="relative w-full h-auto flex">
              <div className="basis-1/6  grid place-items-center ">
                <img src={PolisActive} />
              </div>
              <div className="basis-5/6 ">
                <div className="flex justify-between items-start pl-2">
                  <div className="w-full">
                    {!_.isEmpty(summaryData) ? (
                      <p>
                        <>
                          {summaryData.planName === 'LifeSAVER' && (
                            <img src={LifeSaver} className="w-14 xm:w-20" />
                          )}
                          {summaryData.planName === 'LifeSAVER+' && (
                            <img src={LifeSaverPlus} className="w-14 xm:w-20" />
                          )}
                          {summaryData.planName === 'LifeSAVER POS' && (
                            <img src={LifesaverPOS} className="w-14 xm:w-20" />
                          )}
                          {summaryData.planName === 'LifeCOVER' && (
                            <img src={LogoLifeCover} className="w-18 xm:w-24" />
                          )}
                          {summaryData.planName === 'LifeCOVER+' && (
                            <img
                              src={LogoLifeCoverPlus}
                              className="w-18 xm:w-24"
                            />
                          )}
                          {summaryData.planName === 'MyLifeCOVER' && (
                            <img
                              src={LogoMyLifeCover}
                              className="w-18 xm:w-24"
                            />
                          )}
                        </>
                      </p>
                    ) : null}
                    <p className="pt-2 pb-1 text-[11px] xm:text-sm font-semibold">
                      {summaryData != [] && summaryData != null
                        ? summaryData.policyNo
                        : '-'}
                    </p>
                  </div>
                  {remainingSecMedical === 0 || remainingSecSport === 0 ? (
                    <p
                      className={`py-1 px-2 md:py-1 md:px-4 rounded-full font-bold whitespace-nowrap text-[9px] xm:text-[11px] md:text-xs ${colorStatus}`}>
                      {handleStatus(summaryData?.statusName)}
                    </p>
                  ) : null}
                </div>

                {isDigitalPolicy && polis?.statusCode === 'active' ? (
                  <div
                    role="button"
                    className="flex justify-between items-center pl-2 rounded-lg duration-300 hover:bg-red-50"
                    onClick={() =>
                      router.push(
                        {
                          pathname: NAVIGATION.PROFILE.Profile,
                          query: {
                            activeTabProps: 1,
                            policyNo: summaryData?.policyNo,
                          },
                        },
                        NAVIGATION.PROFILE.Profile,
                      )
                    }>
                    <p className="text-[10px] xm:text-sm text-red-500">
                      {trans(locale, lang, 'detailBerlangganan')}
                    </p>
                    <Icon
                      size={16}
                      className="cursor-pointer justify-self-end leading-none px-1 rounded-md text-red-500 hover:bg-red-50"
                      icon={chevronRight}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full grid place-items-start">
          <div className="w-full h-auto py-6 px-[5%] flex flex-col">
            <div className="w-full flex lg:flex-row flex-col">
              <div className="lg:w-1/2 flex flex-col mb-4">
                <p className="text-sm opacity-50">
                  {trans(locale, lang, 'masaBerlaku')}
                </p>
                <p className="text-sm">
                  {`${formatValue(
                    summaryData?.insuranceStartDate,
                  )} - ${formatValue(summaryData?.insuranceEndDate)}`}
                </p>
              </div>
              <div className="lg:w-1/2 flex flex-col">
                <p className="text-sm opacity-50">
                  {trans(locale, lang, 'tglJatuhTempo')}
                </p>
                <p className="text-sm">
                  {formatValue(summaryData?.premiDueDate)}
                </p>
              </div>
            </div>
            <div className="mt-4 w-full flex flex-col gap-y-4 md:flex-row">
              <div className="w-1/2 flex flex-col">
                <p className="text-sm opacity-50">
                  {trans(locale, lang, 'hargaPremi')}
                </p>
                <p className="text-sm">{formatValue(summaryData?.premi)}</p>
              </div>
              <div className="w-1/2 flex flex-col">
                <p className="text-sm opacity-50">
                  {trans(locale, lang, 'paket')}
                </p>
                <p className="text-sm">{formatValue(summaryData?.planName)}</p>
              </div>
            </div>
            {!_.isEmpty(summaryData?.beneficiaryCount) ? (
              <div className="mt-4 w-full flex flex-col gap-y-4 md:flex-row">
                <div className="w-1/2 flex flex-col">
                  <p className="text-sm opacity-50">
                    {trans(locale, lang, 'jumlahPenerimaManfaat')}
                  </p>
                  <p className="text-sm">
                    {summaryData?.beneficiaryCount
                      ? `${formatValue(summaryData?.beneficiaryCount)} 
                    ${trans(
                      locale,
                      lang,
                      Number(summaryData?.beneficiaryCount) > 1
                        ? 'penerimaManfaats'
                        : 'penerimaManfaat',
                    )}`
                      : '-'}
                  </p>
                </div>
              </div>
            ) : null}

            {polis?.source === '001' && !summaryData?.isUpgrade && (
              <Button
                type="linear-gradient"
                className="!h-8 w-fit px-5 text-xs my-5 xm:!h-10 xm:text-sm"
                onButtonClick={() => setNotAvailable(true)}>
                {trans(locale, lang, 'upgradePaket')}
              </Button>
            )}

            <div className="w-full flex sm:flex-row sm:justify-between xs:flex-col mt-12">
              <div>
                <p className="opacity-50">{trans(locale, lang, 'insuredBy')}</p>
                <img src={IfgLifeRed} width={80} className="my-4" />
              </div>
              <div className="sm:flex sm:flex-1 sm:items-center sm:justify-center">
                {renderAjakTeman()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  function renderAjakTeman() {
    const data = getPolicySummaryResponse?.data;
    if (!isDigitalPolicy || polis?.statusCode !== 'active' || !data) {
      return null;
    }

    const onClick = () => {
      if (polis?.source === '001') {
        router.push(NAVIGATION.LIFESAVER.LifesaverInviteFriends);
        return;
      }
      if (polis?.source === '002') {
        setNotAvailable(true);
      }
    };
    return (
      <div
        onClick={onClick}
        role="button"
        className="sm:w-[80%] xs:w-full bg-gradient-to-r from-[#FF344C] via-[#E51931] to-[#CA0A21] h-auto p-4 rounded-2xl grid place-items-center">
        <div className="flex flex-row text-white">
          <p className="font-bold mr-2">{trans(locale, lang, 'ajakTeman')}</p>
          <Icon icon={paperPlane} />
        </div>
      </div>
    );
  }

  function formatTime(timeLeft) {
    if (timeLeft === null) {
      return '-';
    }
    const day =
      timeLeft.days < 10
        ? `0${timeLeft.days} ${trans(locale, lang, 'dayUnit')}, `
        : `${timeLeft.days}d `;
    const hour = timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours;
    const minute =
      timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes;
    const second =
      timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds;
    return `${day}${hour}:${minute}:${second}`;
  }

  return (
    <div className="w-full h-fit">
      {renderHeader()}
      {renderLifeCardWidget()}
      {renderWaitingPeriodWidget()}
      {renderGracePeriodWidget()}
      {renderSummaryPage()}
    </div>
  );
}
