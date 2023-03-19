import { Alert, Button, Container, Input } from '@cp-component';
import Image from 'next/image';
import { BtnBack } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import { useRouter } from 'next/router';
import locale from './locale';
import { PolisCek } from '@cp-config/Images';
import { useCallback, useEffect, useState } from 'react';
import {
  GET_CHECK_LINK_POLICY_NO_FAILED,
  GET_CHECK_LINK_POLICY_NO_SUCCESS,
  GET_INQUIRY_POLICY_NO_FAILED,
  GET_INQUIRY_POLICY_NO_SUCCESS,
} from '@cp-module/register/registerConstant';
import { toast } from 'react-toastify';

export default function Page({
  alreadyKYC,
  getCheckLinkPolicyNoFailed,
  getCheckLinkPolicyNo,
  getInquiryPolicyNoFailed,
  getInquiryPolicyNoParam,
  getInquiryPolicyNoResponse,
  lang,
  registerAction,
  setLoading,
  userId,
}) {
  const router = useRouter();

  const [idInput, setIdInput] = useState('');
  const [sertifikatInput, setSertifikatInput] = useState('');
  const [isSubmitCheck, setIsSubmitCheck] = useState(false);
  const [isShowSertifikatField, setIsShowSertifikatField] = useState(false);
  const [isPolicyFoundModal, setIsPolicyFoundModal] = useState(false);

  const checkIdFoundResult = useCallback(
    (res) => {
      // ID === Nomor Polis
      if (res?.isPolicyNo) {
        if (res?.exists) {
          if (res?.type === 'R') {
            if (userId !== '' && alreadyKYC) {
              setLoading(true);
              getCheckLinkPolicyNo({
                id: getInquiryPolicyNoParam?.id,
                certificateNo: '',
              });
            } else {
              setIsPolicyFoundModal(true);
            }
          }
          if (res?.type === 'C') {
            if (getInquiryPolicyNoParam?.certificateNo !== '') {
              if (userId !== '' && alreadyKYC) {
                setLoading(true);
                getCheckLinkPolicyNo({
                  id: getInquiryPolicyNoParam?.id,
                  certificateNo: getInquiryPolicyNoParam?.certificateNo,
                });
              } else {
                setIsPolicyFoundModal(true);
              }
            } else {
              setIsShowSertifikatField(true);
            }
          }
        } else {
          setIsPolicyNotFoundModal(true);
        }
      }
      // ID === KTP
      if (!res?.isPolicyNo) {
        if (res?.exists) {
          if (userId !== '' && alreadyKYC) {
            setLoading(true);
            getCheckLinkPolicyNo({
              id: getInquiryPolicyNoParam?.id,
              certificateNo: '',
            });
          } else {
            setIsPolicyFoundModal(true);
          }
        } else {
          setIsPolicyNotFoundModal(true);
        }
      }
    },
    [
      alreadyKYC,
      getCheckLinkPolicyNo,
      getInquiryPolicyNoParam?.certificateNo,
      getInquiryPolicyNoParam?.id,
      setLoading,
      userId,
    ],
  );

  const getBothResult = useCallback(
    (act) => {
      if (act === GET_INQUIRY_POLICY_NO_SUCCESS) {
        setLoading(false);
        setIsSubmitCheck(false);
        const res = getInquiryPolicyNoResponse?.data;
        checkIdFoundResult(res);
      }
      if (act === GET_INQUIRY_POLICY_NO_FAILED) {
        setLoading(false);
        setIsSubmitCheck(false);
        if (getInquiryPolicyNoFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          toast.error('Error ' + getInquiryPolicyNoFailed?.message);
        }
      }
      if (act === GET_CHECK_LINK_POLICY_NO_SUCCESS) {
        setLoading(false);
        setIsSubmitCheck(false);
        setIsPolicyFoundModal(true);
      }
      if (act === GET_CHECK_LINK_POLICY_NO_FAILED) {
        setLoading(false);
        setIsSubmitCheck(false);
        if (getCheckLinkPolicyNoFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          toast.error('Error ' + getCheckLinkPolicyNoFailed?.message);
        }
      }
    },
    [
      checkIdFoundResult,
      getCheckLinkPolicyNoFailed?.message,
      getInquiryPolicyNoFailed?.message,
      getInquiryPolicyNoResponse?.data,
      setLoading,
    ],
  );

  useEffect(() => {
    getBothResult(registerAction);
  }, [getBothResult, registerAction]);

  // Banner Content
  function renderHeader() {
    return (
      <div className="relative h-14 flex items-center border-b">
        <div
          role="button"
          onClick={() => router.back()}
          className="absolute z-10 w-10 h-10 flex justify-center items-center">
          <Image src={BtnBack} width={24} height={24} />
        </div>
        <div className="absolute w-full text-center text-body1 font-bold">
          {trans(locale, lang, 'cekPolisAnda')}
        </div>
      </div>
    );
  }

  function renderImageContainer() {
    return (
      <div className="flex justify-center items-center mb-2">
        <img src={PolisCek} width={190} height={190} />
      </div>
    );
  }

  function renderInputCard() {
    return (
      <div className="mb-2">
        <div>
          <Input
            value={idInput}
            disabled={isShowSertifikatField}
            label={trans(locale, lang, 'nomorPolisKTP')}
            placeholder={trans(locale, lang, 'masukkanNomorPolis')}
            onChangeText={(text) => {
              setIdInput(text);
            }}
            // height={56}
          />
        </div>
        {/* {isShowSertifikatField ? (
          <View style={Style.mt16}>
            <Input
              value={sertifikatInput}
              label={trans(locale, lang, 'nomorSertifikat')}
              placeholder={trans(locale, lang, 'masukkanNomorSertifikat')}
              onChangeText={(text) => {
                setSertifikatInput(text);
              }}
              height={56}
            />
          </View>
        ) : null} */}
      </div>
    );
  }

  function renderAlertContainer() {
    return <Alert>{trans(locale, lang, 'pastikanPolisSudah')}</Alert>;
  }

  function renderFooterContainer() {
    return (
      <>
        <div className="mt-12 text-body2 font-semibold text-neutral-light-neutral10 text-center">
          {trans(locale, lang, 'butuhBantuanHubungi')}{' '}
          <span role="button" className="text-primary-dark-primary90 underline">
            {trans(locale, lang, 'customerCare')}
          </span>{' '}
          {trans(locale, lang, 'kami')}
        </div>
        <div className="flex justify-center mt-6 mb-4">
          <Button
            type="linear-gradient"
            onButtonClick={() => {
              setIsSubmitCheck(true);
              setLoading(true);
              getInquiryPolicyNo({
                id: idInput,
                certificateNo: sertifikatInput,
              });
            }}
            shadow>
            {trans(locale, lang, 'cekNomorPolis')}
          </Button>
        </div>
      </>
    );
  }

  return (
    <Container fullScreen>
      {renderHeader()}
      <div className="px-6 md:px-24">
        <div className="mt-6 flex flex-col lg:flex-row justify-center items-center gap-4 md:gap-16">
          {renderImageContainer()}
          <div>
            {renderInputCard()}
            {renderAlertContainer()}
          </div>
        </div>
        {renderFooterContainer()}
      </div>
    </Container>
  );
}
