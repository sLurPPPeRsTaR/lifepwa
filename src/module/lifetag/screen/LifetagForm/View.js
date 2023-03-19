import { useState, useEffect, useCallback, useMemo } from 'react';
import _, { debounce, forEach } from 'lodash';
import { useRouter } from 'next/router';
import { Icon } from 'react-icons-kit';
import { trans } from '@cp-util/trans';
import { checkSquare } from 'react-icons-kit/fa';
import { arrowLeft, x } from 'react-icons-kit/feather';
import { NAVIGATION, REQUEST_OTP_SECONDS } from '@cp-util/constant';
import { regexMobile, regexName, regexWord } from '@cp-util/common';
import locale from './locale';
import {
  Check,
  Path,
  DefaultBackground,
  LifeTagIllustration,
  LifeTagGray,
} from '@cp-config/Images';
import {
  Badge,
  Button,
  Input,
  Modal,
  Toggle,
  ModalTooFrequently,
} from '@cp-component';
import {
  LIFETAG_BLOODTYPE,
  SET_LINK_LIFETAG_SUCCESS,
  SET_LINK_LIFETAG_FAILED,
  GET_LIFETAG_LIST_OTHER_INFO_SUCCESS,
} from '@cp-module/lifetag/lifetagConstant';
const REMAINING_SECONDS = REQUEST_OTP_SECONDS;

const initialState = {
  name: '',
  bloodType: '',
  allergic: [],
  diseaseHistory: [],
  emergencyContact: [{ name: '', phoneNumber: '' }],
};

const PARAMETER_CONST = {
  allergic: 'allergic',
  diseaseHistory: 'diseaseHistory',
  bloodType: 'bloodType',
  name: 'name',
  phoneNumber: 'phoneNumber',
  emergencyPhoneNumber: 'emergencyPhoneNumber',
  deviceName: 'deviceName',
};

const validationInputsState = {
  bloodType: { isValid: false, message: null },
  allergy: { isValid: false, message: null },
  diseaseHistory: { isValid: false, message: null },
  emergencyContact: [
    {
      name: { isValid: false, message: null },
      phoneNumber: { isValid: false, message: null },
    },
  ],
};

export default function View(props) {
  const {
    lang,
    lifetagAction,
    setLoading,
    userData,
    setLifetagSectionSetting,
    setLinkLifetag,
    setLinkLifetagClear,
    setLinkLifetagFailed,
    lifetagOtherInfoState,
    setLifetagOtherInfo,
  } = props;
  const router = useRouter();

  const { diseaseHistory, allergic, bloodType, name, deviceName, phoneNumber } =
    PARAMETER_CONST;

  const lifetagId = lifetagOtherInfoState?.lifetagId;
  const lifetagOtherInfo = lifetagOtherInfoState?.lifetagOtherInfo;

  const [contactEnable, setContactEnable] = useState(true);
  const [bloodTypeEnable, setBloodTypeEnable] = useState(true);
  const [allergyEnable, setAllergyEnable] = useState(true);
  const [diseaseEnable, setDiseaseEnable] = useState(true);

  const [isSubmit, setIsSubmit] = useState(false);
  const [allergyInput, setAllergyInput] = useState('');
  const [diseaseInput, setDiseaseInput] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(REMAINING_SECONDS);
  const [isSuccess, setSuccess] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const [inputForm, setInputForm] = useState(initialState);
  const [validationInputs, setValidationInputs] = useState(
    validationInputsState,
  );

  const [isPairingFail, setIsPairingFail] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(false);
  const [isTooFrequentlyModalVisible, setIsTooFrequentlyModalVisible] =
    useState(false);

  const translate = (val) => trans(locale, lang, val);

  useEffect(() => {
    if (lifetagOtherInfo) {
      const emergencyContactLength = lifetagOtherInfo?.emergencyContact?.length;

      const tempEmergencyContactValidation = [];
      for (let i = 0; i < emergencyContactLength; i += 1) {
        tempEmergencyContactValidation.push({
          name: { isValid: true, message: null },
          phoneNumber: { isValid: true, message: null },
        });
      }

      setValidationInputs((prevState) => {
        return {
          ...prevState,
          bloodType: { isValid: true, message: null },
          allergic: { isValid: true, message: null },
          diseaseHistory: { isValid: true, message: null },
          emergencyContact: tempEmergencyContactValidation,
        };
      });

      setInputForm((prevState) => {
        return {
          ...prevState,
          ...lifetagOtherInfo,
        };
      });
    }
  }, [lifetagOtherInfo]);

  const validateInput = useCallback(
    (key, text) => {
      if (key === name) {
        if (!text) {
          return {
            isValid: false,
            message: { warning: translate(`${key}IsRequired`) },
          };
        }
        const isValid = regexName.test(text) && !regexMobile.test(text);
        return {
          isValid,
          message: isValid ? null : { warning: translate(`${key}IsInvalid`) },
        };
      }
      if (key === phoneNumber) {
        if (!text) {
          return {
            isValid: false,
            message: { warning: translate(`${key}IsRequired`) },
          };
        }
        const isValid = regexMobile.test(text);
        return {
          isValid,
          message: isValid ? null : { warning: translate(`${key}IsInvalid`) },
        };
      }
      if (key === bloodType) {
        if (!text) {
          return {
            isValid: false,
            message: { warning: translate(`${key}IsRequired`) },
          };
        }
        const isValid = LIFETAG_BLOODTYPE.some(
          (item) => item === text.toUpperCase(),
        );
        return {
          isValid,
          message: isValid ? null : { warning: translate(`${key}IsInvalid`) },
        };
      }
      if (key === allergic) {
        if (!text) {
          return {
            isValid: false,
            message: null,
          };
        }
        const isValid = regexWord.test(text);
        if (!isValid) {
          return {
            isValid: false,
            message: { warning: translate(`${key}IsInvalid`) },
          };
        }
        if (text.length > 30) {
          return {
            isValid: false,
            message: { warning: translate(`${key}MaxLength`) },
          };
        }
      }
      if (key === diseaseHistory) {
        if (!text) {
          return {
            isValid: false,
            message: null,
          };
        }
        const isValid = regexWord.test(text);
        if (!isValid) {
          return {
            isValid: false,
            message: { warning: translate(`${key}IsInvalid`) },
          };
        }
        if (text.length > 30) {
          return {
            isValid: false,
            message: { warning: translate(`${key}MaxLength`) },
          };
        }
      }
      if (key === deviceName) {
        if (!text) {
          return {
            isValid: false,
            message: { warning: trans(locale, lang, `${key}IsRequired`) },
          };
        }
        const isValid = regexName.test(text);
        if (!isValid) {
          return {
            isValid,
            message: isValid
              ? null
              : { warning: trans(locale, lang, `${key}IsInvalid`) },
          };
        }
        if (text.length > 30) {
          return {
            isValid: false,
            message: { warning: trans(locale, lang, `${key}MaxLength`) },
          };
        }
      }
      return {
        isValid: true,
        message: null,
      };
    },
    [allergic, diseaseHistory, bloodType, lang, name, phoneNumber, deviceName],
  );

  const setLinkLifetagResult = useCallback(
    (act) => {
      if (act === SET_LINK_LIFETAG_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        setIsSplashVisible(true);
        setLifetagOtherInfo({});
        setTimeout(() => {
          router.push(
            {
              pathname: NAVIGATION.LIFETAG.LifetagMain,
              query: { lifetagId },
            },
            NAVIGATION.LIFETAG.LifetagMain,
          );
        }, 3000);
        setLinkLifetagClear();
      }
      if (act === SET_LINK_LIFETAG_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        setIsPairingFail(true);
        const message = setLinkLifetagFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          setLinkLifetagClear();
          console.log(message);
        }
      }
      if (act === GET_LIFETAG_LIST_OTHER_INFO_SUCCESS) {
        setLoading(false);
        setIsPairingFail(true);
      }
    },
    [lifetagId, setLinkLifetagClear, setLinkLifetagFailed?.message, setLoading],
  );

  useEffect(() => {
    setLinkLifetagResult(lifetagAction);
  }, [lifetagAction, setLinkLifetagResult]);

  // render
  const renderModalSuccess = () => {
    return (
      <Modal
        isOpen={isSplashVisible}
        size="sm"
        toggle={() => setIsSplashVisible(false)}>
        <Icon
          role="button"
          icon={x}
          size={16}
          onClick={() => setIsSplashVisible(false)}
        />
        <img src={Check} className="mx-auto w-1/2 mt-5 md:mt-10" />
        <p className="font-bold text-center pt-10 pb-5 text-sm md:pb-10 xm:text-base">
          {translate('lifetagBerhasilDibuat')}
        </p>
      </Modal>
    );
  };

  const renderModalPairing = () => {
    return (
      <Modal
        isOpen={!isPairingFail}
        size="sm"
        toggle={() => {
          setIsPairingFail(false);
          router.push({ pathname: NAVIGATION.HOME.Home }, NAVIGATION.HOME.Home);
        }}>
        <Icon
          role="button"
          icon={x}
          size={16}
          onClick={() => {
            setIsPairingFail(false);
            router.push(
              { pathname: NAVIGATION.HOME.Home },
              NAVIGATION.HOME.Home,
            );
          }}
        />
        <img src={LifeTagGray} className="mx-auto w-1/2 mt-5 md:mt-5" />
        <p className="font-bold text-center text-sm pb-2 xm:text-base">
          {translate('gagalPairTitle')}
        </p>
        <p className="text-center pb-10 text-xs xm:text-sm">
          {translate('gagalPairSubitle')}
        </p>
      </Modal>
    );
  };

  const renderHeader = () => {
    return (
      <div className="relative z-10 w-full flex justify-between items-center shadow-sm bg-white h-16 px-5 lg:h-20 lg:px-[5%]">
        <div className="w-5 xm:w-10 md:w-20" role="button">
          <Icon
            icon={arrowLeft}
            size={20}
            onClick={() =>
              router.push(
                { pathname: NAVIGATION.HOME.Home },
                NAVIGATION.HOME.Home,
              )
            }
            className="cursor-pointer"
          />
        </div>
        <p className="font-bold text-sm md:text-base lg:text-lg">
          {translate('mainTitle')}
        </p>
        <div className="w-0 xm:w-10 md:w-20"></div>
      </div>
    );
  };

  const renderEmergencyCall = (item, index) => {
    const key = name;
    const key2 = phoneNumber;

    const nameInputMsg =
      validationInputs.emergencyContact[index]?.name?.message;
    const phoneNumberInputMsg =
      validationInputs.emergencyContact[index]?.phoneNumber?.message;

    const onSwitchChange = () => {
      setContactEnable(!contactEnable);
    };

    const onTextInputChange = (text) => {
      const tempEmergencyContact = [...inputForm?.emergencyContact];
      tempEmergencyContact[index] = {
        ...tempEmergencyContact[index],
        name: text,
      };
      const tempOtherInfo = {
        ...inputForm,
        emergencyContact: tempEmergencyContact,
      };

      const emergencyContactValidation = [...validationInputs.emergencyContact];
      emergencyContactValidation[index][key] = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          emergencyContact: emergencyContactValidation,
        };
      });
      setInputForm(tempOtherInfo);
    };

    const onTextInputChange2 = (text) => {
      const tempEmergencyContact = [...inputForm?.emergencyContact];
      tempEmergencyContact[index] = {
        ...tempEmergencyContact[index],
        phoneNumber: text,
      };
      const tempOtherInfo = {
        ...inputForm,
        emergencyContact: tempEmergencyContact,
      };

      const emergencyContactValidation = [...validationInputs.emergencyContact];
      emergencyContactValidation[index][key2] = validateInput(key2, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          emergencyContact: emergencyContactValidation,
        };
      });
      setInputForm(tempOtherInfo);
    };

    return (
      <div className="pt-5" key={index}>
        {index === 0 && (
          <div className="flex pb-3 items-center justify-between">
            <p className="font-bold text-sm">
              {translate('kontakDarurat')}{' '}
              <span className="text-red-500">*</span>
            </p>
            <Toggle onClick={onSwitchChange} active={contactEnable} />
          </div>
        )}
        <div className="">
          <Input
            label={translate(`namaTelDarurat${index + 1}`)}
            placeholder={
              translate('masukkanNamaKontakDarurat') +
              (index + 1 === 1 ? '' : ` ${index + 1}`)
            }
            required
            value={item?.name}
            message={nameInputMsg}
            disabled={!!lifetagOtherInfo}
            handleOnChange={(val) => onTextInputChange(val)}
          />
          <Input
            required
            type="number"
            inputMode="tel"
            label={translate(`telDarurat${index + 1}`)}
            placeholder={
              translate('masukkanNomorTeleponDarurat') +
              (index + 1 === 1 ? '' : ` ${index + 1}`)
            }
            className="pt-4"
            value={item?.mobilePhoneNumber}
            message={phoneNumberInputMsg}
            disabled={!!lifetagOtherInfo}
            handleOnChange={(val) => onTextInputChange2(val)}
          />
        </div>
      </div>
    );
  };

  const renderAddContact = () => {
    if (lifetagOtherInfo) {
      return null;
    }
    const emergencyContact = inputForm?.emergencyContact;

    const onClickAdd = () => {
      if (emergencyContact?.length < 2) {
        const tempArray = emergencyContact;
        tempArray.push({});
        setInputForm((prevState) => {
          return {
            ...prevState,
            emergencyContact: tempArray,
          };
        });

        const tempEmergencyContactValidation = [
          ...validationInputs.emergencyContact,
        ];
        tempEmergencyContactValidation.push({
          name: { isValid: false, message: null },
          phoneNumber: { isValid: false, message: null },
        });
        setValidationInputs((prevState) => {
          return {
            ...prevState,
            emergencyContact: tempEmergencyContactValidation,
          };
        });
      } else {
        const tempArray = emergencyContact;
        tempArray?.pop();
        setInputForm((prevState) => {
          return {
            ...prevState,
            emergencyContact: tempArray,
          };
        });

        const tempEmergencyContactValidation = [
          ...validationInputs.emergencyContact,
        ];
        tempEmergencyContactValidation.pop();
        setValidationInputs((prevState) => {
          return {
            ...prevState,
            emergencyContact: tempEmergencyContactValidation,
          };
        });
      }
    };

    return (
      <div
        role="button"
        onClick={onClickAdd}
        className="text-center font-bold text-sm text-red-500 py-3 mt-5 mb-8 border-t border-b hover:underline">
        {emergencyContact?.length < 2
          ? translate('tambahKontak')
          : translate('hapusKontak')}{' '}
      </div>
    );
  };

  const renderBloodType = () => {
    const key = bloodType;
    const msg = validationInputs[key].message;

    const onSwitchToggle = () => {
      setBloodTypeEnable(!bloodTypeEnable);
    };

    const onTextInputChange = (text) => {
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });

      setInputForm((prevState) => {
        return {
          ...prevState,
          [key]: text,
        };
      });
    };

    return (
      <div className="pb-5 border-b">
        <div className="flex pb-3 items-center justify-between">
          <p className="font-bold text-xs md:text-sm">
            {translate('golonganDarah')} <span className="text-red-500">*</span>
          </p>
          <Toggle onClick={onSwitchToggle} active={bloodTypeEnable} />
        </div>
        <Input
          placeholder="AB"
          message={msg}
          value={inputForm?.bloodType}
          disabled={!!lifetagOtherInfo}
          handleOnChange={(val) => onTextInputChange(val)}
        />
      </div>
    );
  };

  const renderAllergy = () => {
    const key = allergic;
    const msg = validationInputs[key]?.message;

    const onSwitchToggleAllergy = () => {
      setAllergyEnable(!allergyEnable);
    };

    const onTextInputChange = (text) => {
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });
      setAllergyInput(text);

      setTimeout(() => {
        if (validationInputs[key]?.isValid) {
          const tempArr = [...inputForm?.allergic];
          const formattedText = text.replace(/  +/g, ' ').trim();
          const isSame = tempArr.some(
            (item) => item.toLowerCase() === formattedText.toLowerCase(),
          );
          if (!isSame && formattedText !== '') {
            tempArr.push(formattedText);
            const tempInputForm = {
              ...inputForm,
              allergic: tempArr,
            };
            setInputForm(tempInputForm);
          }
          setAllergyInput('');
        }
      }, 1000);
    };

    const onClickBadge = (index) => {
      const tempArr = [...inputForm?.allergic];
      tempArr.splice(index, 1);
      const tempOtherInfo = {
        ...inputForm,
        allergic: tempArr,
      };
      setInputForm(tempOtherInfo);
    };

    return (
      <div className="pt-5">
        <div className="flex pb-3 items-center justify-between">
          <p className="font-bold text-xs md:text-sm">{translate('alergi')}</p>
          <Toggle onClick={onSwitchToggleAllergy} active={allergyEnable} />
        </div>
        <Input
          className="mb-2"
          placeholder="udang"
          message={msg}
          value={allergyInput}
          disabled={!!lifetagOtherInfo}
          handleOnChange={(val) => onTextInputChange(val)}
        />

        <div className="flex gap-2 flex-wrap">
          {inputForm?.allergic?.map((item, idx) => (
            <Badge
              close
              key={idx}
              title={item}
              className="bg-red-50"
              disabled={!!lifetagOtherInfo}
              onClick={() => onClickBadge(idx)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderDiseaseHistory = () => {
    const key = diseaseHistory;
    const msg = validationInputs[key]?.message;

    const onSwitchToggleAllergy = () => {
      setDiseaseEnable(!diseaseEnable);
      setLifetagSectionSetting({
        id: lifetagId,
        section: diseaseHistory,
      });
    };

    const onTextInputChange = (text) => {
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });
      setDiseaseInput(text);

      setTimeout(() => {
        if (validationInputs[key]?.isValid) {
          const tempArr = [...inputForm?.diseaseHistory];
          const formattedText = text.replace(/  +/g, ' ').trim();
          const isSame = tempArr.some(
            (item) => item.toLowerCase() === formattedText.toLowerCase(),
          );
          if (!isSame && formattedText !== '') {
            tempArr.push(formattedText);
            const tempOtherInfo = {
              ...inputForm,
              diseaseHistory: tempArr,
            };
            setInputForm(tempOtherInfo);
          }
          setDiseaseInput('');
        }
      }, 1000);
    };

    const onClickBadge = (index) => {
      const tempArr = [...inputForm?.diseaseHistory];
      tempArr.splice(index, 1);
      const tempOtherInfo = {
        ...inputForm,
        diseaseHistory: tempArr,
      };
      setInputForm(tempOtherInfo);
    };

    return (
      <div className="pt-5">
        <div className="flex pb-3 items-center justify-between">
          <p className="font-bold text-xs md:text-sm">
            {translate('riwayatPenyakit')}
          </p>
          <Toggle onClick={onSwitchToggleAllergy} active={diseaseEnable} />
        </div>
        <Input
          className="mb-2"
          placeholder={translate('penyakit')}
          message={msg}
          value={diseaseInput}
          disabled={!!lifetagOtherInfo}
          handleOnChange={(val) => onTextInputChange(val)}
        />

        <div className="flex gap-2 flex-wrap">
          {inputForm?.diseaseHistory?.map((item, idx) => (
            <Badge
              close
              key={idx}
              title={item}
              className="bg-red-50"
              disabled={!!lifetagOtherInfo}
              onClick={() => onClickBadge(idx)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderDeviceName = () => {
    let profileName = '';
    if (userData?.name !== undefined) {
      profileName = userData?.name;
    }
    const key = deviceName;
    const msg = validationInputs[key]?.message;

    const onTextInputChange = (text) => {
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });

      setInputForm((prevState) => {
        return {
          ...prevState,
          name: text,
        };
      });
    };

    return (
      <div className="pb-5 pt-1">
        <p className="font-bold text-xs pt-5 pb-2 md:text-sm">
          {translate('namaPerangkat')} <span className="text-red-500">*</span>
        </p>
        <Input
          className="mb-2"
          placeholder={`LifeTag ${userData.name ?? '-'}`}
          message={msg}
          value={inputForm?.name}
          handleOnChange={(val) => onTextInputChange(val)}
        />
      </div>
    );
  };

  const renderSummaryInfo = () => {
    return (
      <div className="text-xs border rounded-2xl p-4 md:text-sm md:p-5">
        <p className="font-bold">{translate('kontakDarurat')}</p>
        {inputForm.emergencyContact.map((item, index) => (
          <div className="border-b py-3" key={index}>
            <div className="flex justify-between items-center pb-2">
              <p>
                {translate('namaTelDarurat1')} {index > 0 && index + 1}
              </p>
              <p>{item?.name || '-'}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>
                {translate('telDarurat1')} {index > 0 && index + 1}
              </p>
              <p>{item?.phoneNumber || '-'}</p>
            </div>
          </div>
        ))}

        <p className="font-bold py-3">{translate('informasiKesehatan')}</p>
        <div>
          <div className="flex justify-between items-center pb-1">
            <p>{translate('golonganDarah')}</p>
            <p>{inputForm?.bloodType || '-'}</p>
          </div>
          <div className="flex justify-between items-center pb-1">
            <p>{translate('alergi')}</p>
            <p>{inputForm?.allergic?.join(', ') || '-'}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>{translate('riwayatPenyakit')}</p>
            <p>{inputForm?.diseaseHistory?.join(', ') || '-'}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderButton = () => {
    const onClickLanjut = () => {
      setIsSubmit(true);
      setLoading(true);

      setLinkLifetag({
        id: lifetagId,
        ...inputForm,
        bloodType: inputForm?.bloodType?.toUpperCase(),
        isShowBloodType: bloodTypeEnable,
        isShowAllergic: allergyEnable,
        isShowDiseaseHistory: diseaseEnable,
        isShowEmergencyPhoneNumber: contactEnable,
      });
    };

    const isEmergencyContactValid = validationInputs?.emergencyContact.every(
      (item) => {
        return (
          item?.name?.isValid === true && item?.phoneNumber?.isValid === true
        );
      },
    );

    const isInvalidForm =
      isSubmit ||
      !isAgree ||
      !validationInputs?.bloodType?.isValid ||
      !validationInputs?.deviceName?.isValid ||
      !isEmergencyContactValid ||
      inputForm?.emergencyContact?.length < 1;

    return (
      <div>
        <div
          role="button"
          className="flex pt-8"
          onClick={() => setIsAgree(!isAgree)}>
          <Icon
            icon={checkSquare}
            size={20}
            className={` pr-4 ${isAgree ? 'text-red-500' : 'text-gray-400'}`}
          />
          <p className="text-xs md:text-sm">
            {translate('sayaMenyatakanBahwa')}
          </p>
        </div>
        <Button
          full
          disabled={isSubmit || isInvalidForm}
          type="linear-gradient"
          onButtonClick={onClickLanjut}
          className="mt-8 !h-10 md:!h-11 text-sm">
          {translate('lanjutkan')}
        </Button>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={DefaultBackground}
        className="absolute z-0 top-0 left-0 w-full hidden md:block"
      />
      {renderHeader()}

      <div className="relative z-10 flex items-center justify-center w-full h-full pt-5 md:py-10">
        <div className="relative w-full max-w-2xl bg-white px-[5%] py-10 rounded-xl md:border md:shadow-sm ">
          <img src={LifeTagIllustration} className="w-2/3 mx-auto" />
          <div className="relative z-10 w-full">
            <p className="text-center pb-5 font-bold text-xs xm:text-sm lg:text-lg">
              {translate('subTitle')}
            </p>
            <p className="text-center pb-5 text-xs xm:text-sm lg:text-base">
              {translate('tagline')}
            </p>
            {renderDeviceName()}
            {lifetagOtherInfo ? (
              renderSummaryInfo()
            ) : (
              <>
                {inputForm?.emergencyContact?.map((item, index) => {
                  return renderEmergencyCall(item, index);
                })}
                {renderAddContact()}
                {renderBloodType()}
                {renderAllergy()}
                {renderDiseaseHistory()}
              </>
            )}

            {renderButton()}
          </div>
          <img
            src={Path}
            className="absolute bottom-0 h-80 left-0 z-0 w-full object-cover"
          />
        </div>
      </div>
      {renderModalSuccess()}
      {renderModalPairing()}
      {/* <ModalSuccess
        isOpen={isSuccess}
        setClose={() => setSuccess(false)}
        title={translate('kamuBerhasilMenghapus')}
        btnTitle={translate('lanjut')}
      /> */}
      <ModalTooFrequently
        isOpen={isTooFrequentlyModalVisible}
        setClose={() => setIsTooFrequentlyModalVisible(false)}
        remainingSeconds={remainingSeconds}
      />
    </div>
  );
}
