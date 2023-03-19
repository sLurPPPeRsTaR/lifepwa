import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { formatCurrency } from '@cp-util/numbro';
import Accordion from '@cp-module/polis/components/Accordion';
import Icon from 'react-icons-kit';
import { info } from 'react-icons-kit/feather';
import { Alert, Modal } from '@cp-component';
import { x } from 'react-icons-kit/feather';
import {
  GET_POLICY_FUNDS_FAILED,
  GET_POLICY_FUNDS_SUCCESS,
} from '@cp-module/polis/polisConstant';

export default function View(props) {
  const {
    lang,
    polis,
    polisAction,
    setLoading,
    getPolicyFunds,
    getPolicyFundsResponse,
  } = props;

  const [isOpenJiborModal, setIsOpenJiborModal] = useState(false);

  const fundsData = useMemo(() => {
    return getPolicyFundsResponse;
  }, [getPolicyFundsResponse]);

  const isExecuted = useRef(false);
  useEffect(() => {
    if (
      polis &&
      !isExecuted.current &&
      _.isEmpty(getPolicyFundsResponse?.data)
    ) {
      setLoading(true);
      isExecuted.current = true;
      getPolicyFunds({
        policyNo: polis?.policyNo || polis?.oldPolicyNo,
        productCode: polis?.productCode,
        source: polis?.source,
      });
    }
  }, [getPolicyFunds, getPolicyFundsResponse?.data, polis, setLoading]);

  useEffect(() => {
    getPolicyDetailResult(polisAction);
  }, [getPolicyDetailResult, polisAction]);

  const getPolicyDetailResult = useCallback(
    (act) => {
      if (act === GET_POLICY_FUNDS_SUCCESS || act === GET_POLICY_FUNDS_FAILED) {
        setLoading(false);
      }
    },
    [setLoading],
  );

  function formatValue(key, value) {
    const regexNumber = /^[0-9]*$/;
    // Money
    if (!Number.isNaN(value) && Number.isFinite(value)) {
      if (key?.toLowerCase()?.match('percentage')) {
        return `${value}%`;
      }
      if (key === 'balanceUnit') {
        return `${formatCurrency({ value, mantissa: 4 })}`;
      }
      if (key === 'priceUnit') {
        return `Rp ${formatCurrency({ value, mantissa: 4 })}`;
      }
      return `Rp ${formatCurrency({ value })}`;
    }
    // Date
    if (!regexNumber.test(value) && moment(value, true).isValid()) {
      return moment(value, true).format('DD MMMM YYYY');
    }
    return value;
  }

  function renderListAccordion(key, value) {
    if (key === 'issue') {
      return null;
    }
    if (key === 'funds') {
      return Object.entries(value).map(([k, v]) => (
        <Accordion
          key={k}
          header={
            <p className="text-sm md:text-base">{`${v.allocationFundsPercentage}% - ${v.allocationFundsName}`}</p>
          }>
          {Object.entries(v).map(([x, y]) => (
            <div
              key={x}
              className="w-full flex md:flex-row md:justify-between xs:flex-col my-2 px-3 md:px-4">
              <p className="opacity-90 text-sm">{trans(locale, lang, x)}</p>
              <p className="text-xs md:text-right font-semibold">
                {formatValue(x, y)}
              </p>
            </div>
          ))}
        </Accordion>
      ));
    }
    if (key === 'phasedBenefit') {
      return (
        <Accordion
          key={key}
          header={
            <p className="text-sm md:text-base">{trans(locale, lang, key)}</p>
          }>
          {Object.entries(value).map(([k, v], index) => {
            let statusTextColor;
            statusTextColor = 'text-black';
            if (v.phasedBenefitStatus === 'GAGAL') {
              statusTextColor = 'text-primary-light-primary90';
            }
            if (v.phasedBenefitStatus === 'SELESAI') {
              statusTextColor = 'text-badgeGreen-light-badgeGreen80';
            }
            return (
              <div
                key={index}
                className="w-full flex md:flex-row md:justify-between xs:flex-col my-2 px-3 md:px-4">
                <p
                  className={`text-xs md:text-right font-semibold ${
                    v.phasedBenefitStatus === 'GAGAL'
                      ? 'text-primary-light-primary90'
                      : 'text-mediumGray-light-mediumGray'
                  }`}>
                  {formatValue(k, v.phasedBenefitDate)}
                </p>
                <p
                  className={`text-xs md:text-right font-semibold ${statusTextColor}`}>
                  {formatValue(k, v.phasedBenefitValue)}
                  {v.phasedBenefitFlag === 'JIBOR' && (
                    <Icon
                      role="button"
                      icon={info}
                      size={12}
                      className="text-secondary-light-secondary100 ml-1"
                      onClick={() => setIsOpenJiborModal(true)}
                    />
                  )}
                </p>
              </div>
            );
          })}
        </Accordion>
      );
    }
    if (key === 'benefitAnuitas') {
      return (
        <Accordion
          key={key}
          header={
            <p className="text-sm md:text-base">{trans(locale, lang, key)}</p>
          }>
          {Object.entries(value).map(([k, v], index) => (
            <div key={index} className="w-full flex flex-col my-2 pb-1 px-4">
              <p className="text-sm pb-[1px]">{trans(locale, lang, k)}</p>
              <p className="text-xs font-semibold">{formatValue(k, v)}</p>
            </div>
          ))}
          <div className="w-full mt-2">
            <Alert>
              <p className="pl-2 text-xs font-medium">
                {trans(locale, lang, 'manfaatUntukJanda')}
              </p>
            </Alert>
          </div>
        </Accordion>
      );
    }
    return (
      <Accordion
        key={key}
        header={
          <p className="text-sm md:text-base">{trans(locale, lang, key)}</p>
        }>
        {Object.entries(value).map(([k, v], index) => (
          <div key={index} className="w-full flex flex-col my-2 pb-1 px-4">
            <p className="text-sm pb-[1px]">{trans(locale, lang, k)}</p>
            <p className="text-xs font-semibold">{formatValue(k, v)}</p>
          </div>
        ))}
      </Accordion>
    );
  }

  function renderJiborModal() {
    const closeModal = () => {
      setIsOpenJiborModal(false);
    };

    return (
      <Modal
        size="sm"
        isOpen={isOpenJiborModal}
        toggle={closeModal}
        className="relative">
        <div className="w-full">
          <div className="flex flex-row items-center mb-2">
            <Icon icon={x} size={20} role="button" onClick={closeModal} />
            <p className="text-md font-bold mt-1 ml-2">
              {trans(locale, lang, 'informasiJibor')}
            </p>
          </div>
          <p className="text-sm">
            {trans(locale, lang, 'belumTermasukPengembangan')}
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="w-full min-h-[50vh]">
        <div className="w-full grid place-items-center h-auto border-b-4 border-gray-100 p-5">
          <p className="font-bold">{trans(locale, lang, 'dana')}</p>
        </div>
        <div className="w-full h-auto px-[5%] pt-5 pb-10">
          {!_.isEmpty(fundsData)
            ? Object.entries(fundsData?.data).map(([key, value], index) => {
                return renderListAccordion(key, value, index);
              })
            : null}
        </div>
      </div>
      {renderJiborModal()}
    </>
  );
}
