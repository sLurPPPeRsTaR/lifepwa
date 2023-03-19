import { useEffect, useCallback, useMemo, useRef } from 'react';
import { trans } from '@cp-util/trans';
import { Alert, Button } from '@cp-component';
import locale from './locale';

import {
  GET_POLICY_DOWNLOAD_FAILED,
  GET_POLICY_DOWNLOAD_SUCCESS,
} from '@cp-module/polis/polisConstant';
import { api } from '@cp-bootstrap/bootstrapApi';
import _ from 'lodash';

export default function View(props) {
  const {
    lang,
    polis,
    setLoading,
    polisAction,
    getPolicyDownload,
    getPolicyDownloadResponse,
    setToastMsg,
  } = props;

  const endosemenFile = useMemo(() => {
    return getPolicyDownloadResponse?.data?.documentLinks?.find(
      (item) => item?.code?.toUpperCase() === 'RENEWAL',
    );
  }, [getPolicyDownloadResponse?.data?.documentLinks]);

  const policyBookFile = useMemo(() => {
    return getPolicyDownloadResponse?.data?.documentLinks?.find(
      (item) => item?.code?.toUpperCase() === 'POLICY-BOOK',
    );
  }, [getPolicyDownloadResponse?.data?.documentLinks]);

  const isExecuted = useRef(false);
  useEffect(() => {
    if (
      polis &&
      !isExecuted.current &&
      _.isEmpty(getPolicyDownloadResponse?.data)
    ) {
      setLoading(true);
      isExecuted.current = true;
      getPolicyDownload({
        policyNo: polis?.policyNo || polis?.oldPolicyNo,
        productCode: polis?.productCode,
        source: polis?.source,
      });
    }
  }, [getPolicyDownload, getPolicyDownloadResponse?.data, polis, setLoading]);

  useEffect(() => {
    getPolicyDetailResult(polisAction);
  }, [polisAction, getPolicyDetailResult]);

  const getPolicyDetailResult = useCallback(
    (act) => {
      if (
        act === GET_POLICY_DOWNLOAD_SUCCESS ||
        act === GET_POLICY_DOWNLOAD_FAILED
      ) {
        setLoading(false);
      }
    },
    [setLoading],
  );

  const translate = (val) => trans(locale, lang, val);

  const getDocument = (file) => {
    const { url, fileName } = file;

    setLoading(true);
    // test
    api
      .get(url, { responseType: 'blob', timeout: 60000 })
      .then((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(res?.data);
        reader.onloadend = (res) => {
          const base64data = res.target.result;
          downloadPdf({ base64data, fileName });
          setLoading(false);
        };
        reader.onerror = (err) => {
          setLoading(false);
          setToastMsg({
            isOpen: true,
            warn: true,
            title: `reader ${err}`,
          });
        };
      })
      .catch((err) => {
        console.log(err);
        setToastMsg({
          isOpen: true,
          warn: true,
          title: `api ${err}`,
        });
        setLoading(false);
      });
  };

  const downloadPdf = ({ base64data, fileName }) => {
    try {
      const downloadLink = document.createElement('a');
      downloadLink.target = '_blank';
      downloadLink.rel = 'noreferrer';
      downloadLink.href = base64data;
      downloadLink.download = fileName;
      setTimeout(() => {
        downloadLink.click();
      }, 1000);
    } catch (e) {
      setToastMsg({
        isOpen: true,
        warn: true,
        title: `download pdf ${e}`,
      });
    }
  };

  const renderPolicyBook = () => {
    if (!policyBookFile) {
      return null;
    }
    return (
      <div className="border rounded-xl mx-auto shadow-sm mt-5 p-3 w-full md:p-4 md:mt-10 ">
        <p className="text-sm font-bold pb-6 md:text-base">
          {translate('bukuPolis')}
        </p>
        <div className="flex flex-col">
          <p className="text-xs md:text-sm">{translate('noPolis')}</p>
          <p className="text-sm font-bold pt-1">
            {getPolicyDownloadResponse?.data?.policyNo}
          </p>
        </div>
        <div className="pt-4">
          <p className="text-xs md:text-sm">{translate('paket')}</p>
          <p className="font-bold text-base pt-1">
            {getPolicyDownloadResponse?.data?.package}
          </p>
        </div>
        <Button
          full
          type="linear-gradient"
          className="mt-5 !h-10 text-sm"
          disabled={!policyBookFile}
          onButtonClick={() => getDocument(policyBookFile)}>
          {translate('download')}
        </Button>
      </div>
    );
  };

  const renderEndosemen = () => {
    if (!endosemenFile) {
      return null;
    }
    return (
      <div className="border-t-2 border-dashed mt-5">
        <div className="border rounded-xl mx-auto shadow-sm mt-5 p-3 w-full md:p-4">
          <p className="text-sm font-bold pb-4 md:text-base">
            {translate('endosemen')}
          </p>
          <p className="text-sm md:text-sm">
            {translate('informasiSyaratDanKetentuan')}
          </p>
          <Button
            full
            type="linear-gradient"
            className="mt-5 !h-10 text-sm"
            disabled={!endosemenFile}
            onButtonClick={() => getDocument(endosemenFile)}>
            {translate('download')}
          </Button>
        </div>
      </div>
    );
  };

  const renderAlert = () => {
    if (!getPolicyDownloadResponse?.data) {
      return null;
    }
    return (
      <div className="pt-4 md:pt-5">
        <Alert className="!items-start mx-auto">
          <div className="text-xs mt-[5px]">
            <p className="pb-1">{translate('untukMembukaFile')}</p>
            <ul className="list-outside list-disc pl-4">
              <li>{translate('poin1')}</li>
              <li>{translate('poin2')}</li>
              <li>{translate('poin3')}</li>
              <li>{translate('poin4')}</li>
            </ul>
            <p className="pt-1">{translate('rincianDigitMenjadi')}</p>
          </div>
        </Alert>
      </div>
    );
  };

  return (
    <div className="w-full h-auto">
      <div className="w-full grid place-items-center h-auto border-b-4 border-gray-100 p-5">
        <p className="font-bold">{translate('download')}</p>
      </div>
      <div className="pb-10 px-3 md:px-[10%]">
        {renderPolicyBook()}
        {renderEndosemen()}
        {renderAlert()}
      </div>
    </div>
  );
}
