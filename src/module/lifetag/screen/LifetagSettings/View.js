import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useInterval } from '@cp-util/common';
import _, { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { Icon } from 'react-icons-kit';
import { trans } from '@cp-util/trans';
import { arrowLeft } from 'react-icons-kit/feather';
import { closeRound } from 'react-icons-kit/ionicons';
import { NAVIGATION, REQUEST_OTP_SECONDS } from '@cp-util/constant';
import { DefaultBackground, Path, tooMany } from '@cp-config/Images';
import { Close } from '@cp-config/Svgs';
import { Check } from '@cp-config/Images';
import { regexMobile, regexName, regexWord } from '@cp-util/common';
import { toast } from 'react-toastify';
import locale from './locale';
import { Eye1, EyeOff1 } from '@cp-config/Svgs';
import { checkmarkCircled, closeCircled } from 'react-icons-kit/ionicons';
import {
  Badge,
  Button,
  Input,
  Modal,
  Toggle,
  ModalSuccess,
  ModalTooFrequently,
  InputPIN,
  ModalOptionOTP,
  InputOTP,
} from '@cp-component';
import {
  LIFETAG_BLOODTYPE,
  GET_LIFETAG_CURRENT_SETTING_FAILED,
  GET_LIFETAG_CURRENT_SETTING_SUCCESS,
  SET_LIFETAG_UNLINK_FAILED,
  SET_LIFETAG_UNLINK_SUCCESS,
  SET_LIFETAG_UPDATE_FAILED,
  GET_LIFETAG_PROFILE_SUCCESS,
  SET_LIFETAG_UNLINK_REQUEST_OTP_SUCCESS,
  SET_LIFETAG_UNLINK_REQUEST_OTP_FAILED,
  SET_LIFETAG_UNLINK_VERIFY_OTP_SUCCESS,
  SET_LIFETAG_UNLINK_VERIFY_OTP_FAILED,
  GET_LIFETAG_VERIFY_PIN_SUCCESS,
  GET_LIFETAG_VERIFY_PIN_FAILED,
  SET_LIFETAG_CREATE_PIN_FAILED,
  SET_LIFETAG_CREATE_PIN_SUCCESS,
} from '@cp-module/lifetag/lifetagConstant';
import { InputPINModal } from '@cp-component';
import Image from 'next/image';
import { LifeTagDummy } from '@cp-config/Images';

const PARAMETER_CONST = {
  allergic: 'allergic',
  diseaseHistory: 'diseaseHistory',
  bloodType: 'bloodType',
  name: 'name',
  phoneNumber: 'phoneNumber',
  emergencyPhoneNumber: 'emergencyPhoneNumber',
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
    {
      name: { isValid: false, message: null },
      phoneNumber: { isValid: false, message: null },
    },
  ],
};
const REMAINING_SECONDS = REQUEST_OTP_SECONDS;

export default function View(props) {
  const {
    lang,
    lifetagAction,
    setLoading,
    getLifetagProfile,
    getLifetagProfileResponse,
    getLifetagCurrentSettingResponse,
    getLifetagCurrentSettingFailed,
    getLifetagCurrentSetting,
    getLifetagCurrentSettingClear,
    setLifetagSectionSetting,
    setLifetagUpdateFailed,
    setLifetagUpdate,
    setLifetagUpdateClear,
    profileAction,
    setProfileRequestOtpFailed,
    userMobilePhoneNumber,
    setLifetagUnlinkFailed,
    setLifetagUnlink,
    setLifetagUnlinkClear,
    getLifetagVerifyPin,
    getLifetagVerifyPinClear,
    getLifetagVerifyPinFailed,
    setLifetagUnlinkRequestOtp,
    setLifetagUnlinkRequestOtpClear,
    setLifetagUnlinkRequestOtpFailed,
    setLifetagUnlinkVerifyOtp,
    setLifetagUnlinkVerifyOtpClear,
    setLifetagUnlinkVerifyOtpFailed,
    setLifetagCreatePin,
    setLifetagCreatePinClear,
    setLifetagCreatePinFailed,
    userData,
  } = props;
  const router = useRouter();
  const {
    query: { lifetagId },
  } = router;
  const {
    diseaseHistory,
    allergic,
    bloodType,
    name,
    deviceName,
    phoneNumber,
    emergencyPhoneNumber,
  } = PARAMETER_CONST;

  const [contactEnable, setContactEnable] = useState(false);
  const [bloodTypeEnable, setBloodTypeEnable] = useState(false);
  const [allergyEnable, setAllergyEnable] = useState(false);
  const [diseaseEnable, setDiseaseEnable] = useState(false);

  const [otherInfo, setOtherInfo] = useState({});
  const [allergyInput, setAllergyInput] = useState('');
  const [diseaseInput, setDiseaseInput] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(REMAINING_SECONDS);
  const [isSuccess, setSuccess] = useState(false);

  const [validationInputs, setValidationInputs] = useState(
    validationInputsState,
  );
  const [unlinkConfirmationModalState, setUnlinkConfirmationModalState] =
    useState({ isVisible: false, id: '' });
  const [isTooFrequentlyModalVisible, setIsTooFrequentlyModalVisible] =
    useState(false);
  const [isSuccessUnlink, setIsSuccessUnlink] = useState(false);
  const [isShowCreateMPinModal, setIsShowCreateMPinModal] = useState(false);
  const [pin, setPin] = useState(null);
  const [pinConf, setPinConf] = useState(null);
  const [timeoutAllergy, setTimoutAllergy] = useState(null);
  const [timeoutDiseaseHistory, setTimeoutDiseaseHistory] = useState(null);

  const [isShowModalCounter, setIsShowModalCounter] = useState(false);
  const [isShowInputPin, setIsShowInputPin] = useState(false);
  const [isShowInputOtp, setIsShowInputOtp] = useState(false);
  const [lapsedTime, setLapsedTime] = useState(0);
  const [showModalVerifyPin, setShowModalVerifyPin] = useState(false);

  useInterval(() => {
    if (lapsedTime > 0) {
      setLapsedTime(lapsedTime - 1);
    } else {
      setLapsedTime(0);
      setLifetagUnlinkRequestOtpClear();
      setIsShowModalCounter(false);
    }
  }, 1000);

  const translate = (val) => trans(locale, lang, val);

  // const validatePin = useCallback(
  //   (text) => {
  //     const regexNumber = /^[0-9]*$/;
  //     if (text === null) {
  //       return null;
  //     }
  //     if (text.length < 1) {
  //       setPinMessage({ error: trans(locale, lang, 'pinRequired') });
  //       return false;
  //     }
  //     if (!regexNumber.test(text)) {
  //       setPinMessage({ error: trans(locale, lang, 'pinIsNumber') });
  //       return false;
  //     }
  //     if (text.length < 6) {
  //       setPinMessage({ error: trans(locale, lang, 'validationPin') });
  //       return false;
  //     }
  //     if (text === oldPin) {
  //       setPinMessage({ error: trans(locale, lang, 'pinSameWithOld') });
  //       return false;
  //     }
  //     if (text.length > 6) {
  //       setPinMessage({ error: trans(locale, lang, 'pinLength') });
  //       return false;
  //     }
  //     setPinMessage(null);
  //     return true;
  //   },
  //   [lang, oldPin],
  // );

  // const validatePinConf = useCallback(
  //   (text) => {
  //     if (text === null) {
  //       return null;
  //     }
  //     if (text.length < 1) {
  //       setPinConfMessage({ error: trans(locale, lang, 'confirmPinRequired') });
  //       return false;
  //     }
  //     if (text !== pin) {
  //       setPinConfMessage({
  //         error: trans(locale, lang, 'pinNotSame'),
  //       });
  //       return false;
  //     }
  //     setPinConfMessage(null);
  //     return true;
  //   },
  //   [lang, pin],
  // );

  // useLayoutEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }
  //   setValidPin(validatePin(pin));
  //   setValidPinConf(validatePinConf(pinConf));
  // }, [pin, oldPin, pinConf, validatePin, validatePinConf]);

  // Validate Pin & Pin Confirmation
  // const firstUpdate = useRef(true);
  // useLayoutEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }
  //   setValidPin(validatePin(pin));
  //   setValidPinConf(validatePinConf(pinConf));
  // }, [pin, oldPin, pinConf, validatePin, validatePinConf]);

  // get current setting
  useEffect(() => {
    if (lifetagId) {
      setLoading(true);
      getLifetagProfile({ id: lifetagId });
      getLifetagCurrentSetting({ id: lifetagId });
    }
  }, [getLifetagCurrentSetting, getLifetagProfile, lifetagId, setLoading]);

  const saveToDb = useCallback(
    (data) => {
      setLifetagUpdate({ id: lifetagId, data });
    },
    [lifetagId, setLifetagUpdate],
  );

  const debouncedSave = useMemo(() => {
    return debounce((data) => {
      saveToDb(data);
    }, 1000);
  }, [saveToDb]);

  const onOtherInfoChange = (data) => {
    debouncedSave(data);
  };

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
    [
      allergic,
      bloodType,
      deviceName,
      diseaseHistory,
      lang,
      name,
      phoneNumber,
      translate,
    ],
  );

  // result callback
  const lifetagApiResult = useCallback(
    (act) => {
      setPin('');
      setPinConf('');
      if (act === SET_LIFETAG_CREATE_PIN_FAILED) {
        setLoading(false);
        setIsShowCreateMPinModal(false);
        setLifetagCreatePinClear();
        toast.error(setLifetagCreatePinFailed?.message);
      }
      if (act === SET_LIFETAG_CREATE_PIN_SUCCESS) {
        setLoading(false);
        setIsShowCreateMPinModal(false);
        setLifetagCreatePinClear();
        setIsShowInputPin(true);
      }
      if (act === GET_LIFETAG_PROFILE_SUCCESS) {
        setLoading(false);
        const tempData = getLifetagProfileResponse?.data?.otherInfo;
        let data = {
          allergic: tempData.allergic,
          bloodType: tempData.bloodType,
          diseaseHistory: tempData.diseaseHistory,
          emergencyContact: [],
          id: tempData.id,
          name: tempData.name,
        };

        tempData.emergencyContact.forEach((item) => {
          data.emergencyContact.push({
            name: item.name,
            phoneNumber: item.mobilePhoneNumber,
          });
        });
        setOtherInfo(data);
      }
      if (act === GET_LIFETAG_CURRENT_SETTING_SUCCESS) {
        setLoading(false);
        const data = getLifetagCurrentSettingResponse?.data;
        setContactEnable(data?.isShowEmergencyPhoneNumber);
        setBloodTypeEnable(data?.isShowBloodType);
        setAllergyEnable(data?.isShowAllergic);
        setDiseaseEnable(data?.isShowDiseaseHistory);
        getLifetagCurrentSettingClear();
      }
      if (act === GET_LIFETAG_CURRENT_SETTING_FAILED) {
        setLoading(false);
        const message = getLifetagCurrentSettingFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          console.log(message);
        }
      }
      if (act === SET_LIFETAG_UPDATE_FAILED) {
        setLoading(false);
        const message = setLifetagUpdateFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          console.log(message);
        }
      }

      if (act === SET_LIFETAG_UNLINK_SUCCESS) {
        setLoading(false);
        setLifetagUnlinkClear();
        setIsSuccessUnlink(true);
        setTimeout(() => {
          router.push(
            {
              pathname: NAVIGATION.PROFILE.Profile,
              query: {
                activeTabProps: 10,
              },
            },
            NAVIGATION.PROFILE.Profile,
          );
        }, 2000);
      }
      if (act === SET_LIFETAG_UNLINK_FAILED) {
        setLoading(false);
        const message = setLifetagUnlinkFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          console.log(message);
        }
        setLifetagUnlinkClear();
      }

      if (act === GET_LIFETAG_VERIFY_PIN_SUCCESS) {
        setLoading(false);
        setShowModalVerifyPin(true);
      }

      if (act === GET_LIFETAG_VERIFY_PIN_FAILED) {
        setLoading(false);
        if (getLifetagVerifyPinFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (getLifetagVerifyPinFailed?.message) {
            seterrorInputPIN(true);
            seterrorMsgInputPIN(getLifetagVerifyPinFailed?.message);
            setTimeout(function () {
              seterrorMsgInputPIN('');
            }, 2000);
          } else {
            toast.error(getLifetagVerifyPinFailed?.message);
          }
        }
        getLifetagVerifyPinClear();
      }

      // REQUEST OTP
      if (act === SET_LIFETAG_UNLINK_REQUEST_OTP_SUCCESS) {
        setIsShowOptionOtp(false);
        setIsShowInputOtp(true);
      }
      if (act === SET_LIFETAG_UNLINK_REQUEST_OTP_FAILED) {
        setLoading(false);
        setIsShowOptionOtp(false);
        const message = setLifetagUnlinkRequestOtpFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          if (message?.match('TOO_FREQUENTLY_')) {
            setRemainingSeconds(Number(message?.substring(15)));
            setIsTooFrequentlyModalVisible(true);
            return;
          }
        }
      }

      // VERIFY OTP
      if (act === SET_LIFETAG_UNLINK_VERIFY_OTP_SUCCESS) {
        setLoading(false);
        setIsShowInputOtp(false);
        setIsShowCreateMPinModal(true);
      }
      if (act === SET_LIFETAG_UNLINK_VERIFY_OTP_FAILED) {
        setLoading(false);
        toast.error(setLifetagUnlinkVerifyOtpFailed?.message);
      }
    },
    [
      getLifetagCurrentSettingClear,
      getLifetagCurrentSettingFailed?.message,
      getLifetagCurrentSettingResponse?.data,
      getLifetagProfileResponse?.data?.otherInfo,
      getLifetagVerifyPinClear,
      getLifetagVerifyPinFailed?.message,
      router,
      setLifetagCreatePinClear,
      setLifetagCreatePinFailed?.message,
      setLifetagUnlinkClear,
      setLifetagUnlinkFailed?.message,
      setLifetagUnlinkRequestOtpFailed?.message,
      setLifetagUnlinkVerifyOtpFailed?.message,
      setLifetagUpdateFailed?.message,
      setLoading,
    ],
  );

  useEffect(() => {
    lifetagApiResult(lifetagAction);
  }, [lifetagApiResult, lifetagAction]);

  // render
  const renderHeader = () => {
    const resetValidationRedirect = (_, callback) => {
      setValidationInputs(validationInputsState);
      callback();
    };

    const redirectProfile = () => {
      router.push(
        {
          pathname: NAVIGATION.LIFETAG.LifetagMain,
          query: { lifetagId },
        },
        NAVIGATION.LIFETAG.LifetagMain,
      );
    };

    return (
      <div className="relative z-10 w-full flex justify-between items-center shadow-sm bg-white h-16 px-5 lg:h-20 lg:px-[5%]">
        <div className="w-5 xm:w-10 md:w-20" role="button">
          <Icon
            icon={arrowLeft}
            size={20}
            onClick={() => {
              resetValidationRedirect(_, redirectProfile);
            }}
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
      setLifetagSectionSetting({
        id: lifetagId,
        section: emergencyPhoneNumber,
      });
    };

    const onTextInputChange = (text) => {
      const tempEmergencyContact = [...otherInfo?.emergencyContact];
      tempEmergencyContact[index] = {
        ...tempEmergencyContact[index],
        name: text,
      };
      const tempOtherInfo = {
        ...otherInfo,
        emergencyContact: tempEmergencyContact,
      };
      setOtherInfo(tempOtherInfo);
      const { isValid, message } = validateInput(name, text);
      const emergencyContactValidation = [...validationInputs.emergencyContact];
      emergencyContactValidation[index][key] = { isValid, message };
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          emergencyContact: emergencyContactValidation,
        };
      });
      const invalidInputs = validationInputs.emergencyContact
        .slice(0, otherInfo?.emergencyContact.length)
        .filter((el) => !el.name.isValid || !el.phoneNumber.isValid);
      if (invalidInputs.length === 0) {
        onOtherInfoChange(tempOtherInfo);
      }
    };

    const onTextInputChange2 = (text) => {
      const tempEmergencyContact = [...otherInfo?.emergencyContact];
      tempEmergencyContact[index] = {
        ...tempEmergencyContact[index],
        phoneNumber: text,
      };
      const tempOtherInfo = {
        ...otherInfo,
        emergencyContact: tempEmergencyContact,
      };
      setOtherInfo(tempOtherInfo);
      const { isValid, message } = validateInput(phoneNumber, text);
      const emergencyContactValidation = [...validationInputs.emergencyContact];
      emergencyContactValidation[index][key2] = { isValid, message };
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          emergencyContact: emergencyContactValidation,
        };
      });
      const invalidInputs = validationInputs.emergencyContact
        .slice(0, otherInfo?.emergencyContact.length)
        .filter((el) => !el.name.isValid || !el.phoneNumber.isValid);
      if (invalidInputs.length === 0) {
        onOtherInfoChange(tempOtherInfo);
      }
    };

    return (
      <div className="pt-5">
        {index === 0 && (
          <div className="flex pb-3 items-center justify-between">
            <p className="font-bold text-sm">{translate('kontakDarurat')}</p>
            <Toggle onClick={onSwitchChange} active={contactEnable} />
          </div>
        )}
        <div className="">
          <Input
            required={true}
            label={`${translate('namaTelDarurat1')} ${
              index > 0 ? index + 1 : ''
            }`}
            placeholder="John Doe"
            value={item?.name}
            message={nameInputMsg}
            handleOnChange={(val) => onTextInputChange(val)}
          />
          <Input
            required={true}
            type="number"
            inputMode="tel"
            label={`${translate('telDarurat1')} ${index > 0 ? index + 1 : ''}`}
            placeholder="+6282257385903"
            className="pt-4"
            value={item?.phoneNumber?.replace('+62', '0')}
            message={phoneNumberInputMsg}
            handleOnChange={(val) => onTextInputChange2(val)}
          />
        </div>
      </div>
    );
  };

  const renderAddContact = () => {
    const emergencyContact = otherInfo?.emergencyContact;

    const onClickAdd = () => {
      if (emergencyContact?.length < 2) {
        const tempArray = [...emergencyContact];
        tempArray.push({
          name: null,
          phoneNumber: null,
        });
        const tempOtherInfo = {
          ...otherInfo,
          emergencyContact: tempArray,
        };
        setOtherInfo(tempOtherInfo);
      } else {
        const tempArray = [...emergencyContact];
        tempArray.pop();
        const tempOtherInfo = {
          ...otherInfo,
          emergencyContact: tempArray,
        };
        setOtherInfo(tempOtherInfo);
        onOtherInfoChange(tempOtherInfo);
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
      setLifetagSectionSetting({
        id: lifetagId,
        section: bloodType,
      });
    };

    const onTextInputChange = (text) => {
      const tempOtherInfo = { ...otherInfo, [key]: text };
      setOtherInfo(tempOtherInfo);
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });
      if (isValid) {
        onOtherInfoChange({ ...tempOtherInfo, [key]: text.toUpperCase() });
      }
    };

    return (
      <div className="pb-5 border-b">
        <div className="flex pb-3 items-center justify-between">
          <p className="font-bold text-sm">
            {translate('golonganDarah')}{' '}
            <span className="text-xs text-red-500">*</span>
          </p>
          <Toggle onClick={onSwitchToggle} active={bloodTypeEnable} />
        </div>
        <Input
          placeholder="AB"
          message={msg}
          value={otherInfo?.bloodType}
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
      setLifetagSectionSetting({
        id: lifetagId,
        section: allergic,
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
      setAllergyInput(text);

      if (timeoutAllergy) {
        clearTimeout(timeoutAllergy);
        timeoutAllergy = null;
      }

      setTimoutAllergy(
        setTimeout(() => {
          if (validationInputs[key]?.isValid) {
            const tempArr = [...otherInfo?.allergic];
            const formattedText = text.replace(/  +/g, ' ').trim();
            const isSame = tempArr.some(
              (item) => item.toLowerCase() === formattedText.toLowerCase(),
            );
            if (!isSame && formattedText !== '') {
              tempArr.push(formattedText);
              const tempOtherInfo = {
                ...otherInfo,
                allergic: tempArr,
              };
              setOtherInfo(tempOtherInfo);
              onOtherInfoChange(tempOtherInfo);
            }
            setAllergyInput('');
          }
        }, 2000),
      );
    };

    const onClickBadge = (index) => {
      const tempArr = [...otherInfo?.allergic];
      tempArr.splice(index, 1);
      const tempOtherInfo = {
        ...otherInfo,
        allergic: tempArr,
      };
      setOtherInfo(tempOtherInfo);
      onOtherInfoChange(tempOtherInfo);
    };

    return (
      <div className="pt-5">
        <div className="flex pb-3 items-center justify-between">
          <p className="font-bold text-sm">{translate('alergi')}</p>
          <Toggle onClick={onSwitchToggleAllergy} active={allergyEnable} />
        </div>
        <Input
          className="mb-2"
          placeholder="udang"
          message={msg}
          value={allergyInput}
          handleOnChange={(val) => onTextInputChange(val)}
        />

        <div className="flex gap-2 flex-wrap">
          {otherInfo?.allergic?.map((item, idx) => (
            <Badge
              close
              key={idx}
              title={item}
              className="bg-red-50"
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

    const onSwitchToggleDisease = () => {
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

      if (timeoutAllergy) {
        clearTimeout(timeoutAllergy);
        timeoutAllergy = null;
      }

      setTimoutAllergy(
        setTimeout(() => {
          if (validationInputs[key]?.isValid) {
            const tempArr = [...otherInfo?.diseaseHistory];
            const formattedText = text.trim();
            const isSame = tempArr.some(
              (item) => item.toLowerCase() === formattedText.toLowerCase(),
            );
            if (!isSame && formattedText !== '') {
              tempArr.push(formattedText);
              const tempOtherInfo = {
                ...otherInfo,
                diseaseHistory: tempArr,
              };
              setOtherInfo(tempOtherInfo);
              onOtherInfoChange(tempOtherInfo);
            }
            setDiseaseInput('');
          }
        }, 2000),
      );
    };

    const onClickBadge = (index) => {
      const tempArr = [...otherInfo?.diseaseHistory];
      tempArr.splice(index, 1);
      const tempOtherInfo = {
        ...otherInfo,
        diseaseHistory: tempArr,
      };
      setOtherInfo(tempOtherInfo);
      onOtherInfoChange(tempOtherInfo);
    };

    return (
      <div className="pt-5">
        <div className="flex pb-3 items-center justify-between">
          <p className="font-bold text-sm">{translate('riwayatPenyakit')}</p>
          <Toggle onClick={onSwitchToggleDisease} active={diseaseEnable} />
        </div>
        <div className="w-full mb-2">
          <Input
            placeholder={translate('penyakit')}
            message={msg}
            value={diseaseInput}
            handleOnChange={(val) => onTextInputChange(val)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {otherInfo?.diseaseHistory?.map((item, idx) => (
            <Badge
              close
              key={idx}
              title={item}
              className="bg-red-50"
              onClick={() => onClickBadge(idx)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderDeviceName = () => {
    const key = deviceName;
    const msg = validationInputs[key]?.message;

    const onTextInputChange = (text) => {
      const tempOtherInfo = { ...otherInfo, name: text };
      setOtherInfo(tempOtherInfo);
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });
      if (isValid) {
        onOtherInfoChange({ ...tempOtherInfo, name: text });
      }
    };

    return (
      <div className="pb-5 pt-1">
        <p className="font-bold text-sm pt-5 pb-2">
          {translate('namaPerangkat')}{' '}
          <span className="text-xs text-red-500">*</span>
        </p>
        <Input
          className="mb-2"
          placeholder={`LifeTag ${userData.name}`}
          message={msg}
          value={otherInfo?.name}
          handleOnChange={(val) => onTextInputChange(val)}
        />
      </div>
    );
  };

  const renderUnlink = () => {
    const onClickUnlink = () => {
      setUnlinkConfirmationModalState({ isVisible: true, id: lifetagId });
    };

    return (
      <div className="pt-5">
        <p className="font-bold text-sm pb-2">
          {translate('pengaturanLifetag')}
        </p>
        <p className="text-sm pb-5">{translate('pengaturanTitle')}</p>
        <div className="flex h-20 items-center">
          <img src={LifeTagDummy} className="h-full" />
          <div className="text-sm pl-4">
            <p className="font-bold pb-2">
              <span className=" text-green-500">{translate('aktif')}</span> -
              LifeTag {otherInfo?.name}
            </p>
            <div
              role="button"
              onClick={onClickUnlink}
              className="text-red-500 hover:underline">
              {translate('unlinkLifetag')}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInputVerifyPIN = () => {
    return (
      showModalVerifyPin && (
        <InputPINModal
          isOpen={showModalVerifyPin}
          callbackAction={'SET_UNLINK_LIFETAG'}
          alreadySetPin={userData?.alreadySetPin}
          hide={() => setShowModalVerifyPin(false)}
          callBack={(res) => {
            const { success, callbackAction } = res;
            if (success && callbackAction === 'SET_UNLINK_LIFETAG') {
              setShowModalVerifyPin(false);
              setLoading(false);
              setLifetagUnlink({ id: lifetagId });
            }
          }}
        />
      )
    );
  };

  const modalUnlinkConfirm = () => {
    const closeModal = () => {
      setUnlinkConfirmationModalState({ isVisible: false, id: '' });
    };

    const onConfirmPress = () => {
      closeModal();
      // setLifetagCreatePinClear();
      // setPin('');
      // setPinConf('');
      // if (!userData.alreadySetPin || !userData.alreadySetMPin) {
      //   // Kalau user belum set pin
      //   setIsShowCreateMPinModal(true);
      // } else {
      //   setIsShowInputPin(true);
      // }
      setShowModalVerifyPin(true);
    };

    return (
      <Modal isOpen={unlinkConfirmationModalState?.isVisible} size="sm">
        <p className="font-bold text-center py-10 text-sm md:text-base">
          {translate('hapusDariPerangkat')}
        </p>
        <p className="text-center py-10 text-xs md:text-sm">
          {translate('apakahKamuYakin')}
        </p>

        <Button full outline className="mb-4" onButtonClick={closeModal}>
          {translate('kembali')}
        </Button>
        <Button full type="linear-gradient" onButtonClick={onConfirmPress}>
          {translate('hapusPerangkat')}
        </Button>
      </Modal>
    );
  };

  const renderModalCounter = () => {
    return (
      <Modal
        isOpen={isShowModalCounter}
        toggle={() => setIsShowModalCounter(false)}
        className="relative max-w-[375px]"
        mainClassname="z-[60]">
        <div className="relative p-3">
          <Icon
            icon={Close}
            size={24}
            className="opacity-20 z-50  cursor-pointer"
            onClick={() => setIsShowModalCounter(false)}
          />
          <img
            src={tooMany}
            className="absolute w-40 s:w-48 top-5 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center my-3">
            {trans(locale, lang, 'terlaluSeringMeminta')}
          </p>
          <p className="text-base font-medium text-center opacity-50">
            {trans(locale, lang, 'andaTelahMeminta')}
            {lapsedTime}
            {trans(locale, lang, 'detik')}
          </p>

          <Button
            className="mt-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => setIsShowModalCounter(false)}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={DefaultBackground}
        className="absolute z-0 top-0 left-0 w-full hidden md:block"
      />
      {renderHeader()}
      {!isShowInputPin && !isShowInputOtp && (
        <>
          <div className="relative z-10 flex items-center justify-center w-full h-full pt-5 md:py-10">
            <div className="relative w-full max-w-2xl bg-white px-[5%] py-10 rounded-xl md:border md:shadow-sm ">
              <div className="relative z-10 w-full">
                <p className="text-center pb-5 text-xs xm:text-sm lg:text-base">
                  {translate('subTitle')}
                </p>
                {renderDeviceName()}
                {otherInfo?.emergencyContact?.map((item, index) => {
                  return renderEmergencyCall(item, index);
                })}
                {renderAddContact()}
                {renderBloodType()}
                {renderAllergy()}
                {renderDiseaseHistory()}
                {renderInputVerifyPIN()}
                {renderUnlink()}
                {renderModalCounter()}
              </div>
              <img
                src={Path}
                className="absolute bottom-0 h-80 left-0 z-0 w-full object-cover"
              />
            </div>
          </div>
          {modalUnlinkConfirm()}
        </>
      )}

      <ModalSuccess
        isOpen={isSuccess}
        setClose={() => setSuccess(false)}
        title={translate('kamuBerhasilMenghapus')}
        btnTitle={translate('lanjut')}
      />
      <ModalTooFrequently
        isOpen={isTooFrequentlyModalVisible}
        setClose={() => setIsTooFrequentlyModalVisible(false)}
        remainingSeconds={remainingSeconds}
      />
      {isShowInputPin && (
        <div className="relative bg-white shadow-sm rounded-3xl shadow-xl -bottom-5 max-w-2xl w-full mx-auto md:border mb-20">
          <InputPIN
            onHandleSubmitPIN={(payload) => {
              setLoading(true);
              getLifetagVerifyPin(payload);
            }}
            onHandleForgotPIN={() => {
              setIsShowInputPin(false);
              setIsShowOptionOtp(true);
            }}
            onHandleSubmitPINClear={() => {}}
            submitPINFailed={() => {}}
            errorMsg={errorInputPIN}
            setErrorMsg={seterrorInputPIN}
            message={errorMsgInputPIN}
          />
        </div>
      )}
      <Modal
        isOpen={isSuccessUnlink}
        size="sm"
        className="relative flex flex-col justify-center items-center py-20">
        <div
          role="button"
          className="absolute left-2 top-3"
          onClick={() => {
            setIsSuccessUnlink(false);
            router.push(
              {
                pathname: NAVIGATION.PROFILE.Profile,
                query: {
                  activeTabProps: 10,
                },
              },
              NAVIGATION.PROFILE.Profile,
            );
          }}>
          <Image alt="" src={Close} width={32} height={32} />
        </div>
        <img src={Check} className="max-w-[120px] w-full mb-10" />
        <p className="font-bold text-center w-2/3 text-body2 md:text-body1">
          {translate('kamuBerhasilMenghapus')}
        </p>
      </Modal>
    </div>
  );
}
