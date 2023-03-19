import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Button, HeaderPage, InputPINModal, Modal } from '@cp-component';
import CreatePIN from 'src/component/Modal/VerifyPIN/screen/CreatePIN';
import { trans } from '@cp-util/trans';
import Icon from 'react-icons-kit';
import { formatCapitalizeEachWord } from '@cp-util/format';
import _ from 'lodash';
import { PenEdit } from '@cp-config/Svgs';
import { checkCircle } from 'react-icons-kit/fa';
import {
  GET_UPDATA_LAST_KTP_INFO_SUCCESS,
  GET_UPDATA_LAST_OTHER_INFO_FAILED,
  GET_UPDATA_LAST_OTHER_INFO_SUCCESS,
  SET_UPDATA_ALTER_POLICIES,
  SET_UPDATA_ALTER_POLICIES_FAILED,
  SET_UPDATA_ALTER_POLICIES_SUCCESS,
  SET_UPDATA_VERIFY_PENGKINIAN_FAILED,
  SET_UPDATA_VERIFY_PENGKINIAN_SUCCESS,
} from '@cp-module/updata/updataConstant';

import {
  UpdataInformationAddress,
  UpdataInformationEmail,
  UpdataPhone,
} from '@cp-module/updata/screen';
import locale from './locale';
import { NAVIGATION, RESPONSE_STATE } from '@cp-util/constant';
import { UpdataInformationRek } from '@cp-module/updata/screen';
import UpdataStep from '../UpdataStep';
import { ShieldBig } from '@cp-config/Images';

export default function Page(props) {
  const {
    lang,
    updataAction,
    getUpdataLastOtherInfoFailed,
    isKTPSame,
    isKKSame,
    getUpdataLastOtherInfoResponse,
    setUpdataKTPResponse,
    setUpdataKKResponse,
    getUpdataLastKTPInfoResponse,
    getUpdataLastKKInfoResponse,
    setUpdataCheckKKKTPParam,
    otherInformation,
    deviceId,
    setUpdataAlterPoliciesFailed,
    setUpdataVerifyPengkinianFailed,
    getUpdataLastOtherInfo,
    getUpdataLastOtherInfoClear,
    setLoading,
    setUpdataAlterPolicies,
    setUpdataAlterPoliciesClear,
    setUserData,
    setUpdataVerifyPengkinian,
    setUpdataVerifyPengkinianClear,
    getUpdataLastKTPInfo,
    setOtherInformationClear,
    setUpdataTempStateClear,
    setTemporaryHomeState,
    alreadySetPin,
    kkpmTempState,
    kkpmFlag,
    updataTempState,
    getUpdataValidationCheckResponse,
    token,
    setClearKkpm,
  } = props;
  const router = useRouter();
  const params = router?.query;
  const [onConfirm, setConfirm] = useState(false);

  const [showModalVerifyPIN, setShowModalVerifyPIN] = useState(false);
  const [showModalCreatePIN, setShowModalCreatePIN] = useState(false);
  const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);

  const [currentScreen, setCurrentScreen] = useState('');

  const [valueEdit, setValueEdit] = useState(null);
  const [isValidPin, setIsValidPin] = useState('');

  const lastOtherInfo = useMemo(() => {
    return getUpdataLastOtherInfoResponse?.data;
  }, [getUpdataLastOtherInfoResponse?.data]);

  const updateFlag = useCallback(() => {
    const issuedIndex = kkpmFlag.findIndex(
      (item) => item?.source === params?.source,
    );
    if (issuedIndex >= 0) {
      const tempKkpmFlag = [...kkpmFlag];
      tempKkpmFlag[issuedIndex] = {
        ...kkpmFlag[issuedIndex],
        isIssuedPolicy: false,
      };
      setUserData({
        userData: {
          kkpmFlag: tempKkpmFlag,
        },
      });
    }
    setTemporaryHomeState({
      isUpdataModalAlreadyShowed: true,
    });
  }, [kkpmFlag, params?.source, setTemporaryHomeState, setUserData]);

  useEffect(() => {
    if (!token || !kkpmTempState?.navFrom) {
      router.push(NAVIGATION.HOME.Home);
    }
  }, [kkpmTempState?.navFrom, router, token]);

  useEffect(() => {
    setLoading(true);
    getUpdataLastOtherInfo({
      category: kkpmTempState?.category,
      certificateNo: kkpmTempState?.certificateNo,
      policyNo: kkpmTempState?.policyNo,
      source: kkpmTempState?.source,
    });
  }, [
    getUpdataLastOtherInfo,
    kkpmTempState?.category,
    kkpmTempState?.certificateNo,
    kkpmTempState?.policyNo,
    kkpmTempState?.source,
    setLoading,
  ]);

  useEffect(() => {
    if (!getUpdataLastKTPInfo?.data) {
      setLoading(true);
      getUpdataLastKTPInfo({
        category: kkpmTempState?.category,
        certificateNo: kkpmTempState?.certificateNo,
        policyNo: kkpmTempState?.policyNo,
        source: kkpmTempState?.source,
      });
    }
  }, [
    getUpdataLastKTPInfo,
    kkpmTempState?.category,
    kkpmTempState?.certificateNo,
    kkpmTempState?.policyNo,
    kkpmTempState?.source,
    params,
    router.query,
    setLoading,
  ]);

  const updataResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_LAST_OTHER_INFO_SUCCESS) {
        setLoading(false);
        getUpdataLastOtherInfoClear();
      }
      if (act === GET_UPDATA_LAST_OTHER_INFO_FAILED) {
        setLoading(false);
        getUpdataLastOtherInfoClear();
        if (getUpdataLastOtherInfoFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          toast.error('Error', getUpdataLastOtherInfoFailed?.message);
        }
      }
      if (act === GET_UPDATA_LAST_KTP_INFO_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_UPDATA_LAST_OTHER_INFO_FAILED) {
        setLoading(false);
        const message = getUpdataLastOtherInfoFailed?.message;
        if (message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR) {
          toast.error('Error', message);
        }
      }
      if (act === SET_UPDATA_ALTER_POLICIES_SUCCESS) {
        setLoading(false);
        setUpdataAlterPoliciesClear();
        const validationCheckRes = getUpdataValidationCheckResponse?.data;
        if (validationCheckRes?.isValid === false) {
          setLoading(true);
          setUpdataVerifyPengkinian({
            ...updataTempState?.verifyPengkinianPayload,
            family: {
              ...updataTempState?.verifyPengkinianPayload?.family,
              headOfFamilyName: 'KEPALA KELUARGA',
              address: 'JL. RAYA TAMAN APEL',
              province: 'DKI JAKARTA',
              city: 'JAKARTA BARAT',
              district: 'GROGOL PETAMBURAN',
              neighborhood: '001',
              hamlet: '001',
            },
          });
        }
        if (validationCheckRes?.isValid === true) {
          updateFlag();
          setUpdataTempStateClear();
          setOtherInformationClear();
          setIsShowSuccessModal(true);
        }
      }
      if (act === SET_UPDATA_ALTER_POLICIES_FAILED) {
        setLoading(false);
        setUpdataAlterPoliciesClear();
        if (setUpdataAlterPoliciesFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          toast.error('Error', setUpdataAlterPoliciesFailed?.message);
        }
      }
      if (act === SET_UPDATA_VERIFY_PENGKINIAN_SUCCESS) {
        setLoading(false);
        updateFlag();
        setUpdataTempStateClear();
        setOtherInformationClear();
        setIsShowSuccessModal(true);
      }
      if (act === SET_UPDATA_VERIFY_PENGKINIAN_FAILED) {
        setLoading(false);
        setUpdataVerifyPengkinianClear();
        if (
          setUpdataVerifyPengkinianFailed?.message !== 'INTERNAL_SERVER_ERROR'
        ) {
          toast.error('Error', setUpdataVerifyPengkinianFailed?.message);
        }
      }
    },
    [
      getUpdataLastOtherInfoClear,
      getUpdataLastOtherInfoFailed?.message,
      getUpdataValidationCheckResponse?.data,
      setLoading,
      setOtherInformationClear,
      setUpdataAlterPoliciesClear,
      setUpdataAlterPoliciesFailed?.message,
      setUpdataTempStateClear,
      setUpdataVerifyPengkinian,
      setUpdataVerifyPengkinianClear,
      setUpdataVerifyPengkinianFailed?.message,
      updataTempState?.verifyPengkinianPayload,
      updateFlag,
    ],
  );

  useEffect(() => {
    updataResult(updataAction);
  }, [updataResult, updataAction]);

  const formatRekening = useCallback((bankAccount) => {
    const accountNo = bankAccount?.accountNo || '';
    const accountHolderName = bankAccount?.accountHolderName || '';
    const bankName = `\n${bankAccount?.bankName}` || '';
    return bankAccount !== null
      ? `${accountHolderName}${
          accountHolderName && accountNo ? ' - ' : ''
        }${accountNo}${bankName}`
      : '';
  }, []);

  const formatAddress = useCallback(
    (key) => {
      const lastOtherInfoAddress = lastOtherInfo?.address;
      const otherInfoAddress = otherInformation?.data?.address;
      const itemAddress =
        otherInfoAddress?.[key] || lastOtherInfoAddress?.[key];
      let textAddress;
      if (itemAddress) {
        const namaJalan = itemAddress?.street || '';
        const rt = itemAddress?.neighborhood || '';
        const rw = itemAddress?.hamlet || '';
        const kelurahan = formatCapitalizeEachWord(
          itemAddress?.subDistrict || '',
        );
        const kecamatan = formatCapitalizeEachWord(itemAddress?.district || '');
        const kota = formatCapitalizeEachWord(itemAddress?.city || '');
        const provinsi = formatCapitalizeEachWord(itemAddress?.province || '');
        const kodePos = itemAddress?.postalcode || '';
        textAddress = `${namaJalan}, ${
          rt && rw ? `RT${rt}/RW${rw}` : ''
        }, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
          .replace(/ ,/g, '')
          .trim()
          .replace(/^, /g, '')
          .trim()
          .replace(/,$/g, '');
      } else {
        textAddress = '';
      }
      return textAddress;
    },
    [lastOtherInfo?.address, otherInformation],
  );

  const otherInfoForms = useMemo(() => {
    if (lastOtherInfo) {
      const phoneNumber =
        otherInformation?.data?.phoneNumber || lastOtherInfo?.phoneNumber;
      const email = otherInformation?.data?.email || lastOtherInfo?.email;
      const bankAccount =
        otherInformation?.data?.bankAccount || lastOtherInfo?.bankAccount;
      const otherInfoFlag = lastOtherInfo?.otherInformationFlag;
      const addressFlag = lastOtherInfo?.addressFlag;

      return [
        {
          id: 'M001',
          key: trans(locale, lang, 'nomorHP'),
          value: phoneNumber,
          isShow: otherInfoFlag?.phoneNumber?.isShow,
          isRequired: otherInfoFlag?.phoneNumber?.isRequired,
          isEditable: otherInfoFlag?.phoneNumber?.isEditable,
          icon: PenEdit,
        },
        {
          id: 'M002',
          key: trans(locale, lang, 'email'),
          value: email,
          isShow: otherInfoFlag?.email?.isShow,
          isRequired: otherInfoFlag?.email?.isRequired,
          isEditable: otherInfoFlag?.email?.isEditable,
          icon: PenEdit,
        },
        {
          id: 'M003',
          key: trans(locale, lang, 'rekening'),
          value: formatRekening(bankAccount),
          isShow: otherInfoFlag?.bankAccount?.isShow,
          isRequired: otherInfoFlag?.bankAccount?.isRequired,
          isEditable: otherInfoFlag?.bankAccount?.isEditable,
          icon: PenEdit,
        },
        {
          id: 'M004',
          key: trans(locale, lang, 'alamatTinggal'),
          value: formatAddress('residentAddress'),
          isShow: addressFlag?.residentAddress?.isShow,
          isRequired: addressFlag?.residentAddress?.isRequired,
          isEditable: addressFlag?.residentAddress?.isEditable,
          icon: PenEdit,
        },
        {
          id: 'M005',
          key: trans(locale, lang, 'alamatPenagihan'),
          value: formatAddress('billingAddress'),
          isShow: addressFlag?.billingAddress?.isShow,
          isRequired: addressFlag?.billingAddress?.isRequired,
          isEditable: addressFlag?.billingAddress?.isEditable,
          icon: PenEdit,
        },
        {
          id: 'M006',
          key: trans(locale, lang, 'alamatKantor'),
          value: formatAddress('officeAddress'),
          isShow: addressFlag?.officeAddress?.isShow,
          isRequired: addressFlag?.officeAddress?.isRequired,
          isEditable: addressFlag?.officeAddress?.isEditable,
          icon: PenEdit,
        },
        {
          id: 'M007',
          key: trans(locale, lang, 'alamatKorespondensi'),
          value: formatAddress('correspondAddress'),
          isShow: addressFlag?.correspondAddress?.isShow,
          isRequired: addressFlag?.correspondAddress?.isRequired,
          isEditable: addressFlag?.correspondAddress?.isEditable,
          icon: PenEdit,
        },
      ];
    }
  }, [
    formatAddress,
    formatRekening,
    lang,
    lastOtherInfo,
    otherInformation?.data?.bankAccount,
    otherInformation?.data?.email,
    otherInformation?.data?.phoneNumber,
  ]);

  const invalidForms = useMemo(() => {
    return otherInfoForms?.filter((form) => form.isRequired && !form.value);
  }, [otherInfoForms]);

  const removeColumnFromObject = (obj, columnKey) => {
    const newObj = { ...obj };
    delete newObj[columnKey];
    return newObj;
  };

  const getPayload = useCallback(() => {
    const rawKTP = isKTPSame
      ? getUpdataLastKTPInfoResponse?.data
      : setUpdataKTPResponse?.data?.user;
    const rawKK = isKKSame
      ? getUpdataLastKKInfoResponse?.data
      : setUpdataKKResponse?.data?.family;
    const rawOtherInfo = lastOtherInfo;
    const editKTP = setUpdataCheckKKKTPParam?.KTP;
    const editKK = setUpdataCheckKKKTPParam?.KK;
    const editOtherInfo = otherInformation?.data;
    const familyMembers = rawKK?.familyMembers;
    const rawFamilyCardData = removeColumnFromObject(rawKK, 'familyMembers');
    const tempKTP = isKTPSame
      ? getUpdataLastKTPInfoResponse?.data
      : updataTempState?.verifyPengkinianPayload?.user;

    let residentAddressTemp;
    if (tempKTP) {
      residentAddressTemp = {
        street: tempKTP?.address,
        province: tempKTP?.province,
        city: tempKTP?.city,
        district: tempKTP?.district,
        subDistrict: tempKTP?.subDistrict,
        neighborhood: tempKTP?.neighborhood,
        hamlet: tempKTP?.hamlet,
        postalcode: null,
      };
    } else {
      residentAddressTemp = null;
    }

    const validationCheckRes = getUpdataValidationCheckResponse?.data;

    const payload = {
      raw: {
        KK:
          validationCheckRes?.isValid === true
            ? null
            : {
                familyCardData: {
                  ...rawFamilyCardData,
                },
                familyMembers: [...familyMembers],
              },
        KTP: {
          user: {
            ...rawKTP,
          },
        },
        otherInformation: {
          ...rawOtherInfo,
        },
      },
      edit: {
        KK:
          validationCheckRes?.isValid === true
            ? null
            : {
                ...editKK,
              },
        KTP:
          validationCheckRes?.isValid === true
            ? {
                user: {
                  ...rawKTP,
                },
              }
            : {
                ...editKTP,
              },
        otherInformation: {
          email: editOtherInfo.email || rawOtherInfo.email,
          phoneNumber: editOtherInfo.phoneNumber || rawOtherInfo.phoneNumber,
          bankAccount: editOtherInfo.bankAccount || rawOtherInfo.bankAccount,
          address: {
            billingAddress: rawOtherInfo.address.billingAddress,
            residentAddress:
              residentAddressTemp || rawOtherInfo.address.residentAddress,
            officeAddress:
              editOtherInfo.address.officeAddress ||
              rawOtherInfo.address.officeAddress,
            correspondAddress:
              editOtherInfo.address.correspondAddress ||
              rawOtherInfo.address.correspondAddress,
          },
        },
      },
      deviceId: deviceId,
      isUploadBookAccount: updataTempState?.isUploadBookAccount,
    };
    return payload;
  }, [
    isKTPSame,
    getUpdataLastKTPInfoResponse?.data,
    setUpdataKTPResponse?.data?.user,
    isKKSame,
    getUpdataLastKKInfoResponse?.data,
    setUpdataKKResponse?.data?.family,
    lastOtherInfo,
    setUpdataCheckKKKTPParam?.KTP,
    setUpdataCheckKKKTPParam?.KK,
    otherInformation?.data,
    updataTempState?.verifyPengkinianPayload?.user,
    updataTempState?.isUploadBookAccount,
    getUpdataValidationCheckResponse?.data,
    deviceId,
  ]);

  const setAlterPolicies = useCallback(() => {
    setIsValidPin('');
    setLoading(true);
    const { category, certificateNo, policyNo, source } = kkpmTempState;
    setUpdataAlterPolicies({
      category,
      certificateNo,
      policyNo,
      source,
      language: lang,
      ...getPayload(),
    });
  }, [getPayload, kkpmTempState, lang, setLoading, setUpdataAlterPolicies]);

  // Alter Policies
  useEffect(() => {
    if (isValidPin) {
      setAlterPolicies();
    }
  }, [isValidPin, setAlterPolicies]);

  function renderFooter() {
    return (
      <div className="fixed z-20 w-full bottom-0">
        <div className="max-w-2xl mx-auto bg-white py-2 px-5 w-full border shadow-md rounded-t-2xl">
          <label
            className="flex gap-1items-start cursor-pointer mt-3 pl-1"
            onClick={() => setConfirm(!onConfirm)}>
            <div role="button" className="w-10">
              <Icon
                icon={checkCircle}
                size={22}
                className={`${onConfirm ? 'text-red-500' : 'text-gray-400'}`}
              />
            </div>

            <p className="text-xs pl-2 text-neutral-dark-neutral40 md:pl-4 md:text-sm">
              {trans(locale, lang, 'sayaMenyatakan')}
            </p>
          </label>
          <Button
            onButtonClick={() => {
              if (_.isEmpty(invalidForms)) {
                setShowModalVerifyPIN(true);
              } else {
                const label = _.map(invalidForms, 'key').join(', ');
                toast.error(label + trans(locale, lang, 'isRequired'));
              }
            }}
            type="linear-gradient"
            disabled={!onConfirm}
            className="mb-4 mt-4 text-sm !h-10 md:text-base md:!h-11"
            full>
            {trans(locale, lang, 'submit')}
          </Button>
        </div>
      </div>
    );
  }

  function CardOtherInformation(item) {
    const value = item?.item?.value || '-';
    const newLineText = () => {
      const newText = value?.split('\n').map((str) => <p key={str}>{str}</p>);
      return newText;
    };
    return (
      <div className="border p-3 md:px-5 rounded-xl flex gap-x-4 items-center duration-300 hover:shadow-md">
        <div className="w-full text-xs xm:text-sm md:text-base">
          <p className="font-semibold text-gray-500">
            {trans(locale, lang, item.item.key)}{' '}
            {item.item?.isRequired && (
              <span className="text-primary-dark-primary90">*</span>
            )}
          </p>
          <div className="font-semibold text-neutral-light-neutral60">
            {newLineText()}
          </div>
        </div>
        <div className="flex justify-between">
          {item?.item?.isEditable ? (
            <div className="w-8">
              <img
                alt="image"
                role="button"
                src={item.item.icon}
                width={24}
                height={24}
                className="p-1 w-full rounded-lg duration-300 hover:bg-red-50"
                onClick={() => {
                  setCurrentScreen(item?.item?.id);
                  setValueEdit(item?.item?.value);
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  function renderOtherInformation() {
    return (
      <div className="flex flex-col gap-y-4 py-5">
        {otherInfoForms
          ?.filter((form) => form.isShow)
          ?.map((form, idx) => (
            <CardOtherInformation
              key={idx}
              item={form}
              // isShowRequiredCard={isShowRequiredCard}
            />
          ))}
      </div>
    );
  }

  const handleRenderBody = () => {
    if (currentScreen === 'M001') {
      // edit phone
      return (
        <UpdataPhone
          otherInformationResult={otherInfoForms}
          getUpdataLastOtherInfoResponse={getUpdataLastOtherInfoResponse}
          otherInformation={otherInformation}
          setCurrentScreen={setCurrentScreen}
        />
      );
    } else if (currentScreen === 'M002') {
      // email
      return (
        <UpdataInformationEmail
          otherInformationResult={otherInfoForms}
          getUpdataLastOtherInfoResponse={getUpdataLastOtherInfoResponse}
          otherInformation={otherInformation}
          setCurrentScreen={setCurrentScreen}
        />
      );
    } else if (currentScreen === 'M003') {
      // rekening
      return (
        <UpdataInformationRek
          bank={valueEdit}
          setCurrentScreen={setCurrentScreen}
        />
      );
    } else if (currentScreen === 'M004') {
      // alamat tinggal
      return (
        <UpdataInformationAddress
          selectAddress="residentAddress"
          setCurrentScreen={setCurrentScreen}
        />
      );
    } else if (currentScreen === 'M005') {
      // alamat penagihan
      return (
        <>
          <UpdataInformationAddress
            selectAddress="billingAddress"
            setCurrentScreen={setCurrentScreen}
          />
        </>
      );
    } else if (currentScreen === 'M006') {
      // alamat kantor
      return (
        <>
          <UpdataInformationAddress
            selectAddress="officeAddress"
            setCurrentScreen={setCurrentScreen}
          />
        </>
      );
    } else if (currentScreen === 'M007') {
      // alamat koresponden
      return (
        <>
          <UpdataInformationAddress
            selectAddress="correspondAddress"
            setCurrentScreen={setCurrentScreen}
          />
        </>
      );
    }
  };

  function renderModalSuccess() {
    return (
      <Modal className="relative" isOpen={isShowSuccessModal} size="sm">
        <div className="relative p-3">
          <img
            alt=""
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
            src={ShieldBig}
          />
          <p className="pt-12 px-[5%] md:px-[10%] text-lg font-bold text-center mx-auto my-3 md:text-xl">
            {trans(locale, lang, 'datamuKitaReview')}
          </p>
          <p className="px-[1%] md:px-[5%] text-sm font-normal text-center mx-auto md:text-lg">
            {trans(locale, lang, 'terimaKasihKamu')}
          </p>

          <Button
            className="mt-8"
            full
            onButtonClick={() => {
              setIsShowSuccessModal(false);
              router.replace(NAVIGATION.HOME.Home);
              setTimeout(() => {
                setClearKkpm();
              }, 1500);
            }}
            shadow
            type="linear-gradient">
            {trans(locale, lang, 'lanjut')}
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <HeaderPage
        isHelp
        title={trans(locale, lang, 'pengkinianData')}
        onClickBack={() => {
          router.back();
        }}
      />

      <div
        className={`relative z-10 w-full flex justify-center  -top-10  sm:px-4 sm:p-4 md:-top-16 ${
          currentScreen === '' ? 'mb-28 md:mb-16' : ''
        }`}>
        <div className="z-10 w-full h-full bg-white md:shadow-md sm:rounded-3xl sm:max-w-2xl">
          <div className="py-4 px-4 sm:px-12 ">
            <UpdataStep
              step4
              title={trans(locale, lang, 'informasiTambahan')}
            />
            {currentScreen === '' ? (
              renderOtherInformation()
            ) : (
              <div className="pt-5">{handleRenderBody()}</div>
            )}
          </div>
        </div>
      </div>
      {currentScreen === '' && renderFooter()}

      {renderModalSuccess()}
      {showModalVerifyPIN && (
        <InputPINModal
          isOpen={showModalVerifyPIN}
          callbackAction={SET_UPDATA_ALTER_POLICIES}
          alreadySetPin={alreadySetPin}
          callBack={(res) => {
            const { success, callbackAction } = res;
            if (success && callbackAction === SET_UPDATA_ALTER_POLICIES) {
              setIsValidPin(true);
            }
          }}
          hide={() => setShowModalVerifyPIN(false)}
        />
      )}
    </>
  );
}
