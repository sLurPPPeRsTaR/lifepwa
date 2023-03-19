import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { trans } from '@cp-util/trans';
import { formatCapitalizeEachWord, formatOrdinal } from '@cp-util/format';
import locale from './locale';
import 'moment/locale/id';
import { formatCurrency } from '@cp-util/numbro';
import Accordion from '@cp-module/polis/components/Accordion';
import {
  GET_POLICY_SELF_DATA_FAILED,
  GET_POLICY_SELF_DATA_SUCCESS,
} from '@cp-module/polis/polisConstant';

export default function View(props) {
  const {
    lang,
    polis,
    polisAction,
    setLoading,
    getPolicySelfData,
    getPolicySelfDataResponse,
  } = props;

  const selfData = useMemo(() => {
    return getPolicySelfDataResponse?.data;
  }, [getPolicySelfDataResponse]);

  const isExecuted = useRef(false);
  useEffect(() => {
    if (
      polis &&
      !isExecuted.current &&
      _.isEmpty(getPolicySelfDataResponse?.data)
    ) {
      setLoading(true);
      isExecuted.current = true;
      getPolicySelfData({
        policyNo: polis?.policyNo || polis?.oldPolicyNo,
        productCode: polis?.productCode,
        source: polis?.source,
      });
    }
  }, [getPolicySelfData, getPolicySelfDataResponse?.data, polis, setLoading]);

  useEffect(() => {
    getPolicyDetailResult(polisAction);
  }, [getPolicyDetailResult, polisAction]);

  const getPolicyDetailResult = useCallback(
    (act) => {
      if (
        act === GET_POLICY_SELF_DATA_SUCCESS ||
        act === GET_POLICY_SELF_DATA_FAILED
      ) {
        setLoading(false);
      }
    },
    [setLoading],
  );

  function formatValue(value, key) {
    if (!value && value !== false) {
      return '-';
    }
    const regexNumber = /^[0-9]*$/;
    // Money
    if (!Number.isNaN(value) && Number.isFinite(value)) {
      if (key && key?.toLowerCase()?.match('percentage')) {
        return `${value}%`;
      }
      return `Rp ${formatCurrency({ value })}`;
    }
    // Date
    if (!regexNumber.test(value) && moment(value, true).isValid()) {
      return moment(value, true).format('DD MMMM YYYY');
    }
    return value;
  }

  function renderBeneficiary(key, value, index) {
    return Object.entries(value).map(([k, v]) => (
      <Accordion
        key={`${key}${index}`}
        header={
          <p className="text-sm md:text-base">{`${trans(
            locale,
            lang,
            'ahliWaris',
          )} - ${formatCapitalizeEachWord(
            formatOrdinal(Number(k) + 1, lang),
          )}`}</p>
        }>
        {Object.entries(v).map(([x, y], z) => (
          <div key={z} className="w-full flex flex-col my-2 pb-1 px-4">
            <text className="opacity-90 text-sm">{trans(locale, lang, x)}</text>
            <text className="text-xs font-semibold">{formatValue(y)}</text>
          </div>
        ))}
      </Accordion>
    ));
  }

  function renderBeneficiariesInformation(key, value, index) {
    return (
      <div className="w-full" key={key}>
        <Accordion
          key={index}
          header={
            <p className="text-sm md:text-base">{trans(locale, lang, key)}</p>
          }>
          {Object.entries(value).map(([k, v], i) => (
            <Accordion
              key={i}
              header={
                <p className="text-sm md:text-base">{`${trans(
                  locale,
                  lang,
                  'dataPenerimaManfaat',
                )} ${Number(k) + 1}`}</p>
              }>
              {Object.entries(v).map(([x, y], z) => {
                let title = trans(locale, lang, x);
                let content = formatValue(y);

                if (x === 'beneficiariesPercentage') {
                  title = trans(locale, lang, 'menerimaUpSebesar');
                  content = `${formatValue(
                    v.beneficiariesPercentage,
                    x,
                  )} - ${formatValue(v.beneficiariesAmount)}`;
                }
                if (x === 'beneficiariesAmount') {
                  return null;
                }
                return (
                  <div key={z} className="w-full flex flex-col my-2 pb-1 px-4">
                    <text className="opacity-90 text-sm">{title}</text>
                    <text className="text-xs font-semibold">{content}</text>
                  </div>
                );
              })}
            </Accordion>
          ))}
        </Accordion>
      </div>
    );
  }

  function renderListAccordion(key, value, index) {
    if (key === 'beneficiary' && polis?.source !== '001') {
      return renderBeneficiary(key, value, index);
    }
    if (key === 'beneficiariesInformation' && polis?.source === '002') {
      return renderBeneficiariesInformation(key, value, index);
    }
    return (
      <Accordion
        key={key}
        header={
          <p className="text-sm md:text-base">{trans(locale, lang, key)}</p>
        }>
        {Object.entries(value).map(([k, v], index) => {
          let title = trans(locale, lang, k);
          let content = formatValue(v);

          if (k === 'insuranceStartDate') {
            title = trans(locale, lang, 'masaBerlakuAsuransi');
            content = `${formatValue(value.insuranceStartDate)} - ${formatValue(
              value.insuranceEndDate,
            )}`;
          }
          if (k === 'insuranceEndDate') {
            return null;
          }
          return (
            <div key={index} className="w-full flex flex-col my-2 pb-1 px-4">
              <p className="text-sm pb-[1px]">{title}</p>
              <p className="text-xs font-semibold">{content}</p>
            </div>
          );
        })}
      </Accordion>
    );
  }

  return (
    <div className="w-full min-h-[50vh]">
      <div className="w-full grid place-items-center h-auto border-b-4 border-gray-100 p-5">
        <text className="font-bold">{trans(locale, lang, 'informasi')}</text>
      </div>
      <div className="w-full h-auto px-[5%] pt-5 pb-10">
        {!_.isEmpty(selfData) ? (
          <div className="w-full">
            {Object.entries(selfData).map(([key, value], index) => {
              return renderListAccordion(key, value, index);
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
