import moment from 'moment';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { CheckShield, LooperGroupGreen } from '@cp-config/Images';
import Accordion from '@cp-module/polis/components/Accordion';
import _ from 'lodash';
import { formatCurrency } from '@cp-util/numbro';
import {
  GET_POLICY_BENEFIT_FAILED,
  GET_POLICY_BENEFIT_SUCCESS,
} from '@cp-module/polis/polisConstant';

export default function View(props) {
  const {
    lang,
    polis,
    polisAction,
    setLoading,
    getPolicyBenefit,
    getPolicyBenefitResponse,
  } = props;

  const benefitData = useMemo(() => {
    return getPolicyBenefitResponse;
  }, [getPolicyBenefitResponse]);

  const isExecuted = useRef(false);
  useEffect(() => {
    if (
      polis &&
      !isExecuted.current &&
      _.isEmpty(getPolicyBenefitResponse?.data)
    ) {
      setLoading(true);
      isExecuted.current = true;
      getPolicyBenefit({
        policyNo: polis.policyNo || polis.oldPolicyNo,
        productCode: polis.productCode,
        source: polis.source,
      });
    }
  }, [getPolicyBenefit, getPolicyBenefitResponse?.data, polis, setLoading]);

  useEffect(() => {
    getPolicyDetailResult(polisAction);
  }, [getPolicyDetailResult, polisAction]);

  const getPolicyDetailResult = useCallback(
    (act) => {
      if (
        act === GET_POLICY_BENEFIT_SUCCESS ||
        act === GET_POLICY_BENEFIT_FAILED
      ) {
        setLoading(false);
      }
    },
    [setLoading],
  );

  function formatValue(value) {
    const regexNumber = /^[0-9]*$/;
    if (value === null) {
      return '-';
    }
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

  function renderCardBenefit(value, title) {
    return (
      <div className="mb-4">
        <text className="font-bold text-[#4F4F4F]">
          {trans(locale, lang, title)}
        </text>

        <div className="w-full overflow-hidden p-3 bg-white md:shadow-md mt-2 sm:rounded-2xl sm:max-w-2xl xm:rounded-2xl shadow-md flex relative justify-center items-center">
          <p className="font-bold text-2xl text-[#00B76A]">
            {formatValue(value.value)}
          </p>
          <img
            src={LooperGroupGreen}
            className="absolute -bottom-80 -left-60"
          />
        </div>
      </div>
    );
  }

  function renderMedicalLimitAccordion(value) {
    return (
      <Accordion
        header={
          <p className="text-gray-600 text-sm md:text-base">
            {trans(locale, lang, 'manfaatProteksi')}
          </p>
        }>
        {Object.entries(value).map(([k, v], index) => {
          if (k === 'totalMedicalLimitReimburse') {
            return (
              <div className="flex xs:flex-col md:flex-row justify-between py-2">
                <div className="flex flex-row">
                  <img src={CheckShield} className="mt-[2px] w-[15px]" />
                  <p className="opacity-90 ml-2">{trans(locale, lang, k)}</p>
                </div>
                <p className="text-red-500 font-semibold pl-6 md:pl-0">
                  {formatValue(v)}
                  <span className="text-gray-400 font-normal">
                    {trans(locale, lang, 'perKejadian')}
                  </span>
                </p>
              </div>
            );
          }
          if (k === 'totalMedicalLimitReimburseArray') {
            return (
              <div className="w-full pt-2 pb-4">
                <Accordion
                  key={k}
                  bordered={false}
                  header={
                    <p className="">
                      {trans(locale, lang, 'dengan')}
                      <span className="text-red-500 italic">
                        {trans(locale, lang, 'innerLimit')}
                      </span>
                      {trans(locale, lang, 'sebagaiBerikut')}
                    </p>
                  }
                  headerClassName="font-semibold cursor-pointer pl-6 flex justify-between hover:bg-red-100"
                  contentClassName="h-auto pt-2">
                  {Object.entries(value.totalMedicalLimitReimburseArray).map(
                    ([arrK, arrV]) => (
                      <div
                        key={arrK}
                        className="w-full flex xs:flex-col md:flex-row">
                        <div className="w-6 md:w-8"></div>
                        <div className="flex w-full xs:flex-col md:flex-row justify-between py-2 pl-6 md:pl-0">
                          <div className="opacity-90">
                            {arrV?.reimburseName == 'RAWAT INAP' ? (
                              <div className="flex flex-col">
                                {trans(locale, lang, arrV?.reimburseName)}
                                <p className="text-red-500 italic text-[13px] font-semibold">
                                  {trans(locale, lang, 'maksKamarTermurah')}
                                </p>
                              </div>
                            ) : (
                              trans(locale, lang, arrV?.reimburseName)
                            )}
                          </div>
                          <p className="text-medium text-red-500 font-semibold">
                            {formatValue(arrV?.reimburseValue)}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </Accordion>
              </div>
            );
          }
          if (k === 'promo') {
            if (_.isEmpty(v)) {
              return null;
            }
            return (
              <div className="w-full mt-5">
                <p className="font-bold">
                  {trans(locale, lang, 'manfaatTambahanSelama')}
                </p>
                {Object.entries(v).map(([x, y]) => (
                  <div key={x} className="w-full flex flex-row">
                    <div className="w-full flex md:flex-row xs:flex-col justify-between mt-4 gap-y-1">
                      <div className="flex flex-row items-start">
                        <img src={CheckShield} className="mt-[2px] w-[15px]" />
                        <p className="pl-2">
                          {trans(locale, lang, y.promoName)}
                          <span className="text-white leading-3 bg-red-500 rounded-xl ml-3 py-[2px] px-2 text-[8px] md:text-[10px]">
                            {trans(locale, lang, 'promo')}
                          </span>
                        </p>
                      </div>
                      <p className="text-medium text-red-500 font-semibold pl-6 md:pl-0">
                        {formatValue(y.promoValue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          }
          return (
            <div
              key={index}
              className="flex xs:flex-col md:flex-row justify-between py-2">
              <div className="flex flex-row">
                <img src={CheckShield} className="mt-[2px] w-[15px]" />
                <p className="opacity-90 ml-2">{trans(locale, lang, k)}</p>
              </div>
              <p className="text-red-500 font-semibold pl-6 md:pl-0">
                {formatValue(v)}
                {k == 'totalMedicalLimitCashless' ? (
                  <span className="text-gray-400 font-normal">
                    {trans(locale, lang, 'perKejadian')}
                  </span>
                ) : null}
              </p>
            </div>
          );
        })}
      </Accordion>
    );
  }

  function renderLifeCoverBenefit() {
    if (polis?.source !== '002') {
      return null;
    }
    if (_.isEmpty(getPolicyBenefitResponse?.data)) {
      return null;
    }

    const header = (index) => (
      <div className="w-full flex flex-row justify-between">
        <img src={CheckShield} className="mt-[2px] w-[15px]" />
        <div className="font-semibold text-sm ml-2 flex items-center text-[#666B6F] grow">
          {index === 0
            ? trans(locale, lang, 'manfaatMeninggalDunia')
            : trans(locale, lang, 'manfaatMeninggalDuniaKarena')}
        </div>
      </div>
    );

    const content = (index) => (
      <div className="w-full mt-2 overflow-hidden">
        <div className="text-justify">
          <text>
            {index === 0
              ? `${trans(locale, lang, 'apabilaTertanggungMeninggal')} ${trans(
                  locale,
                  lang,
                  'penanggungAkanMembayarkan',
                )}`
              : trans(locale, lang, 'apabilaTertanggungMeninggalDunia')}
          </text>
        </div>
        {index === 0 ? (
          <div className="mt-2">
            <div className="flex flex-row">
              <text className="text-lg font-medium">{'\u2022'}</text>
              <text className="ml-2 mt-1">
                {trans(locale, lang, 'lifecoverBenefitPoin1')}
              </text>
            </div>
            <div className="flex flex-row">
              <text className="text-lg font-medium">{'\u2022'}</text>
              <text className="ml-2 mt-1">
                {trans(locale, lang, 'lifecoverBenefitPoin2')}
              </text>
            </div>
          </div>
        ) : null}
      </div>
    );

    return (
      <>
        <Accordion header={header(0)}>{content(0)}</Accordion>
        <Accordion header={header(1)}>{content(1)}</Accordion>
      </>
    );
  }

  function renderAdditionAssuranceAccordion(value) {
    return Object.entries(value).map(([k, v], i) => (
      <Accordion
        key={i}
        header={
          <p className="text-gray-600 text-sm md:text-base">{`${trans(
            locale,
            lang,
            'additionAssurance',
          )} - ${Number(k) + 1}`}</p>
        }>
        {Object.entries(v).map(([x, y]) => (
          <div key={x} className="w-full flex flex-col my-2 px-4 pb-1">
            <p className="text-gray-600 text-sm">{trans(locale, lang, x)}</p>
            <p className="text-xs font-semibold">{formatValue(y)}</p>
          </div>
        ))}
      </Accordion>
    ));
  }

  function renderListAccordion(key, value) {
    if (String(key).match('additionAssurance')) {
      return renderAdditionAssuranceAccordion(value);
    }
    if (String(key).match('medicalLimit')) {
      return renderMedicalLimitAccordion(value);
    }
    if (String(key).match('sumAssuredSection')) {
      return renderCardBenefit(value, 'totalUangPerlindungan');
    }
    if (String(key).match('premiSection')) {
      return renderCardBenefit(value, 'premiPerbulan');
    }
    return (
      <Accordion
        key={key}
        header={
          <p className="text-gray-600 text-sm md:text-base">
            {trans(locale, lang, key)}
          </p>
        }>
        {Object.entries(value).map(([k, v]) => (
          <div key={k} className="w-full flex flex-col my-2 pb-1 px-4">
            <p className="text-sm text-gray-600 pb-[1px]">
              {trans(locale, lang, k)}
            </p>
            <p className="text-xs font-semibold">{formatValue(v)}</p>
          </div>
        ))}
      </Accordion>
    );
  }

  return (
    <div className="w-full min-h-[50vh]">
      <div className="w-full grid place-items-center h-auto border-b-4 border-gray-100 p-5">
        <text className="font-bold">{trans(locale, lang, 'manfaat')}</text>
      </div>
      <div className="w-full pb-10 h-[70%] overflow-y-auto overflow-x-hidden bg-white rounded-b-3xl">
        {!_.isEmpty(benefitData?.data) ? (
          <div className="w-full h-auto my-5 px-[5%] text-xs xm:text-sm">
            {Object.entries(benefitData?.data).map(([key, value], index) => {
              return renderListAccordion(key, value, index);
            })}
            {renderLifeCoverBenefit()}
          </div>
        ) : null}
      </div>
    </div>
  );
}
