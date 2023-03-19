import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { trans } from '@cp-util/trans';
import locale from './locale';
import 'moment/locale/id';
import { formatCurrency } from '@cp-util/numbro';
import Accordion from '@cp-module/polis/components/Accordion';
import { Chart, ProfileAddress } from '@cp-config/Images';
import Icon from 'react-icons-kit';
import { arrowLeft } from 'react-icons-kit/feather';
import {
  GET_POLICY_CLAIM_FAILED,
  GET_POLICY_CLAIM_SUCCESS,
} from '@cp-module/polis/polisConstant';

export default function View(props) {
  const {
    lang,
    polis,
    polisAction,
    setLoading,
    getPolicyClaim,
    getPolicyClaimResponse,
    setAvailableOnMobile,
  } = props;
  moment.locale(lang);

  const progressList = [
    {
      key: 0,
      date: '16 Apr 22',
      time: '12.00 WIB',
      progress: 'Pengajuan Klaim diproses',
    },
    {
      key: 1,
      date: '17 Apr 22',
      time: '9.00 WIB',
      progress: 'Pengecekan kelengkapan dokumen',
    },
    {
      key: 2,
      date: '17 Apr 22',
      time: '11.00 WIB',
      progress: 'Permintaan dokumen tambahan',
    },
    {
      key: 3,
      date: '17 Apr 22',
      time: '13.00 WIB',
      progress: 'Dokumen tambahan diunggah',
    },
    {
      key: 4,
      date: '17 Apr 22',
      time: '16.00 WIB',
      progress: 'Dana klaim dikirimkan ke nomor rekening',
    },
  ];

  const [showProgressKlaim, setShowProgressKlaim] = useState(false);

  const claimData = useMemo(() => {
    return getPolicyClaimResponse?.data;
  }, [getPolicyClaimResponse?.data]);

  const isDigitalPolicy = useMemo(() => {
    return polis?.source === '001' || polis?.source === '002';
  }, [polis?.source]);

  const isExecuted = useRef(false);
  useEffect(() => {
    if (
      polis &&
      !isExecuted.current &&
      _.isEmpty(getPolicyClaimResponse?.data)
    ) {
      setLoading(true);
      isExecuted.current = true;
      getPolicyClaim({
        limit: 20,
        page: 1,
        policyNo: polis?.policyNo || polis?.oldPolicyNo,
        productCode: polis?.productCode,
        source: polis?.source,
      });
    }
  }, [getPolicyClaim, getPolicyClaimResponse?.data, polis, setLoading]);

  useEffect(() => {
    getPolicyDetailResult(polisAction);
  }, [getPolicyDetailResult, polisAction]);

  const getPolicyDetailResult = useCallback(
    (act) => {
      if (act === GET_POLICY_CLAIM_SUCCESS || act === GET_POLICY_CLAIM_FAILED) {
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

  const renderProgressKlaim = () => {
    return (
      <div className="w-full grid h-auto absolute inset-0 bg-white z-50 rounded-3xl shadow-xl bg-black/60">
        <div className="w-full h-full bg-white place-self-center rounded-3xl overflow-auto">
          <div className="w-full grid place-items-center h-auto border-b-4 border-gray-100 p-5">
            <Icon
              icon={arrowLeft}
              className="absolute left-5"
              onClick={() => setShowProgressKlaim(false)}
            />
            <p className="font-bold text-xl">
              {trans(locale, lang, 'progressKlaim')}
            </p>
          </div>
          <div className="w-[90%] h-auto rounded-3xl grid place-items-center bg-white shadow-lg m-auto mt-5">
            <div className="w-[90%] grid h-auto border-b-2 border-dashed p-5 mb-5">
              <p className="font-bold text-sm mt-2 opacity-50">
                {trans(locale, lang, 'noKlaim')}
              </p>
              <p className="font-bold text-base mt-2">12345678901234567</p>
            </div>
            <div className="w-[90%] flex flex-col h-auto mb-5">
              {progressList.map((val) => (
                <div key={val.key} className="w-full h-auto flex flex-row my-3">
                  <div className="basis-1/6 flex flex-col">
                    <p className="font-bold text-sm mt-2 opacity-50">
                      {val.date}
                    </p>
                    <p className="font-bold text-sm opacity-50">{val.time}</p>
                  </div>
                  <div className="basis-1/6"></div>
                  <div className="basis-3/6 flex">
                    <p className="font-bold text-base my-3">{val.progress}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDetailKlaim = (val, index) => {
    const renderData = (key, value) => {
      return (
        <div className="flex flex-col">
          <p className="opacity-90 text-sm">{key}</p>
          <p className="text-xs font-semibold">{value}</p>
        </div>
      );
    };

    return (
      <div key={index} className="w-full mx-auto md:w-[90%] mt-2 mb-5">
        <div className="w-full flex flex-row justify-between mb-2">
          {renderData(
            trans(locale, lang, 'tglPengajuan'),
            formatValue(val?.processDate),
          )}
          <div className="px-3 bg-gray-200 grid place-items-center rounded-xl h-fit py-1">
            <p className="text-[11px] md:text-xs text-gray-400">
              {formatValue(val?.claimStatus)}
            </p>
          </div>
        </div>
        <div className="mt-2 mb-2.5">
          {renderData(
            trans(locale, lang, 'namaKlaim'),
            formatValue(val?.claimName),
          )}
        </div>
        <div className="mt-2.5 mb-2">
          {renderData(
            trans(locale, lang, 'klaimDibayarkan'),
            formatValue(val?.claimTotal),
          )}
        </div>
        <div className="w-full flex flex-row justify-between mt-2">
          {renderData(
            trans(locale, lang, 'tipeKlaim'),
            formatValue(val?.claimType),
          )}
          {isDigitalPolicy ? (
            <div className="flex items-end">
              <div
                className="flex flex-row justify-center items-center h-5 group p-1 hover:bg-red-50"
                onClick={() => {
                  setAvailableOnMobile(true);
                }}>
                <img src={Chart} className="w-4 md:w-5" />
                <div
                  role="button"
                  className="font-medium text-xs ml-2 text-red-500 md:text-xs group-hover:underline">
                  {trans(locale, lang, 'lihatProgress')}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-fit">
      {showProgressKlaim ? renderProgressKlaim() : null}
      <div className="w-full grid place-items-center h-auto border-b-4 border-gray-100 p-5">
        <p className="font-bold">{trans(locale, lang, 'klaim')}</p>
      </div>
      {!_.isEmpty(claimData) && claimData?.data?.length > 0 ? (
        <div className="w-full h-auto px-[5%] pt-5 pb-10">
          {claimData?.data?.map((val, index) => (
            <Accordion
              key={index}
              header={
                <p className="text-sm md:text-base">
                  {trans(locale, lang, 'noKlaim')}
                  {val.claimNo}
                </p>
              }>
              {renderDetailKlaim(val, index)}
            </Accordion>
          ))}
        </div>
      ) : (
        <div className="md:w-full xs:w-full h-auto py-10 mb-10 flex flex-col items-center">
          <img src={ProfileAddress} width={'30%'} />
          <p className="my-5 font-semibold text-center">
            {trans(locale, lang, 'belumAdaKlaim')}
          </p>
        </div>
      )}
    </div>
  );
}
