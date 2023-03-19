import _ from 'lodash';
import clsx from 'classnames';
// import { useRouter } from 'next/router';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { trans } from '@cp-util/trans';
import { Icon } from 'react-icons-kit';
import {
  Alert,
  // AlertSuccess,
  Button,
  Input,
  InputPINModal,
  Modal,
  ModalSuccess,
  ModalTooFrequently,
} from '@cp-component';
import {
  androidRadioButtonOn,
  androidRadioButtonOff,
} from 'react-icons-kit/ionicons';
import {
  GET_UPDATA_LIST_BANK_FAILED,
  GET_UPDATA_LIST_BANK_SUCCESS,
  SET_UPDATA_BANK_UPLOAD,
  SET_UPDATA_BANK_UPLOAD_FAILED,
  SET_UPDATA_BANK_UPLOAD_SUCCESS,
  SET_UPDATA_INQUIRY_BANK_ACCOUNT_FAILED,
  SET_UPDATA_INQUIRY_BANK_ACCOUNT_SUCCESS,
} from '@cp-module/updata/updataConstant';
import { RESPONSE_STATE } from '@cp-util/constant';
import { chevronDown } from 'react-icons-kit/feather';
import { search } from 'react-icons-kit/feather';
import { ic_keyboard_backspace, ic_clear } from 'react-icons-kit/md';
import locale from './locale';
import {
  DocUpload,
  KycChecklistRound,
  PictureUpload,
  SuccessIcon,
  Upload,
} from '@cp-config/Svgs';
import { toast } from 'react-toastify';
import { warning } from 'react-icons-kit/ikons';
import Image from 'next/image';
import CreatePIN from 'src/component/Modal/VerifyPIN/screen/CreatePIN';
import { Notebook } from '@cp-config/Images';
import { REQUEST_OTP_SECONDS } from '@cp-util/constant';

const REMAINING_SECONDS = REQUEST_OTP_SECONDS;

export default function View(props) {
  const {
    lang,
    bank,
    otherInformation,
    getUpdataLastOtherInfoResponse,

    updataAction,
    getUpdataListBankResponse,
    getUpdataListBank,
    getUpdataListBankClear,
    setLoading,
    setOtherInformation,
    setUpdataInquiryBankAccountResponse,
    setUpdataInquiryBankAccountFailed,
    setUpdataInquiryBankAccount,
    setUpdataInquiryBankAccountClear,
    alreadySetPin,
    alreadySetMPin,
    updataTempState,
    isKTPSame,
    setCurrentScreen,
    getUpdataLastKTPInfoResponse,

    setUpdataBankUpload,
    setUpdataBankUploadFailed,
    setUpdataTempState,
    setUpdataBankUploadClear,
  } = props;

  const bankAccount =
    otherInformation?.data?.bankAccount ||
    getUpdataLastOtherInfoResponse?.data?.bankAccount;

  const [showFormEditRek, setShowFormEditRek] = useState(false);
  const [showFormUploadRek, setShowFormUploadRek] = useState(false);
  const [selectedRek, setSelectedRek] = useState();
  // const [showPilihBank, setShowPilihBank] = useState(false);
  const [newBank, setNewBank] = useState(bank);
  const [newNoRek, setNewNoRek] = useState(null);
  const [newAccountHolderName, setNewAccountHolderName] = useState(null);

  const [isListBankModal, setIsListBankModal] = useState(false);
  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);
  const [isFailedApiModal, setIsFailedApiModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  // Validation
  const [newAccountHolderNameMessage, setNewAccountHolderNameMessage] =
    useState(null);
  const [isValidNewAccountHolderName, setIsValidNewAccountHolderName] =
    useState(false);

  const [listBank, setListBank] = useState([]);
  const [filteredListBank, setFilteredListBank] = useState([]);
  const [isFoundAccount, setIsFoundAccount] = useState(null);
  const [foundAccount, setFoundAccount] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFailedApi, setIsFailedApi] = useState(false);

  const [remainingSeconds, setRemainingSeconds] = useState(REMAINING_SECONDS);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  // upload buku tabungan
  const [isValidPin, setIsValidPin] = useState('');
  const [uri, setUri] = useState('');
  const [accountBookFileName, setAccountBookFileName] = useState('');
  const [accountBookFileSize, setAccountBookFileSize] = useState('');
  const [accountBookFileType, setAccountBookFileType] = useState('');
  const [showModalVerifyPIN, setShowModalVerifyPIN] = useState(false);
  const [successUploadAccountBook, setSuccessUploadAccountBook] =
    useState(false);
  const [enableUploadAccountBook, setEnableUploadAccountBook] = useState(false);
  const [showModalCreatePIN, setShowModalCreatePIN] = useState(false);
  const [uploadAccountBookMessage, setUploadAccountBookMessage] = useState('');

  const [bukuRekening, setBukuRekening] = useState(null);

  const translate = (val) => trans(locale, lang, val);

  const showModalPIN = () => {
    if (!alreadySetPin) {
      // router.push({
      //   pathname: NAVIGATION.PROFILE.ProfileCreateNewPin,
      // });
    } else if (!alreadySetMPin) {
      // router.push({
      //   pathname: NAVIGATION.PROFILE.ProfileChangeNewPin,
      // });
    } else {
      setShowModalVerifyPIN(true);
    }
  };

  useEffect(() => {
    if (isValidPin) {
      if (enableUploadAccountBook) {
        setUpdataBankUpload(uri);
        return;
      }
      setIsSuccessModal(true);
    }
  }, [enableUploadAccountBook, isValidPin, setUpdataBankUpload, uri]);

  const updataBookResult = useCallback(
    (act) => {
      if (act === SET_UPDATA_BANK_UPLOAD) {
        setLoading(true);
      }
      if (act === SET_UPDATA_BANK_UPLOAD_SUCCESS) {
        setSuccessUploadAccountBook(true);
        setLoading(false);
        setIsSuccessModal(true);
        setUpdataBankUploadClear();
      }
      if (act === SET_UPDATA_BANK_UPLOAD_FAILED) {
        setLoading(false);
        if (setUpdataBankUploadFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          toast.error(setUpdataBankUploadFailed?.message);
        }
      }
    },
    [setLoading, setUpdataBankUploadClear, setUpdataBankUploadFailed?.message],
  );

  useEffect(() => {
    updataBookResult(updataAction);
  }, [updataAction, updataBookResult]);
  // end upload buku tabungan

  const isAddAccount = () => {
    const tempBankAccount =
      getUpdataLastOtherInfoResponse?.data?.bankAccount ||
      otherInformation?.data?.bankAccount;
    return tempBankAccount === null;
  };

  const isValidAccount = useMemo(() => {
    const regex = /(SDRI|SDR|BPK|IBU|BAPAK| +(?= ))/g;
    const trimmed = foundAccount?.beneficiaryAccountName
      ?.toUpperCase()
      .replace(regex, '')
      .trim();
    const accountHolderName = isKTPSame
      ? getUpdataLastKTPInfoResponse?.data?.name?.toUpperCase()
      : updataTempState?.verifyPengkinianPayload?.user?.name?.toUpperCase();
    return trimmed === accountHolderName;
  }, [
    foundAccount?.beneficiaryAccountName,
    getUpdataLastKTPInfoResponse?.data?.name,
    isKTPSame,
    updataTempState?.verifyPengkinianPayload?.user?.name,
  ]);

  useEffect(() => {
    setLoading(true);
    getUpdataListBank();
  }, [getUpdataListBank, setLoading]);

  const updataResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_LIST_BANK_SUCCESS) {
        setLoading(false);
        getUpdataListBankClear();
        const temp = getUpdataListBankResponse?.data
          ?.filter((item) => item.bankCode !== 'CENAIDJA')
          .sort((a, b) => {
            return a.bankName > b.bankName
              ? 1
              : b.bankName > a.bankName
              ? -1
              : 0;
          });
        setFilteredListBank(temp);
        setListBank(temp);
      }
      if (act === GET_UPDATA_LIST_BANK_FAILED) {
        setLoading(false);
        getUpdataListBankClear();
      }
      if (act === SET_UPDATA_INQUIRY_BANK_ACCOUNT_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setUpdataInquiryBankAccountClear();
        const data = setUpdataInquiryBankAccountResponse?.data;
        setIsFoundAccount(true);
        setFoundAccount({
          beneficiaryBankCode: data?.beneficiaryBankCode,
          beneficiaryAccountName: data?.beneficiaryAccountName
            ?.replace(/\s+/g, ' ')
            .trim(),
          beneficiaryAccountNumber: data?.beneficiaryAccountNumber,
        });
        setNewAccountHolderName(data?.beneficiaryAccountName);
      }
      if (act === SET_UPDATA_INQUIRY_BANK_ACCOUNT_FAILED) {
        setIsSubmit(false);
        setLoading(false);
        setUpdataInquiryBankAccountClear();
        const message = setUpdataInquiryBankAccountFailed?.message;
        if (message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR) {
          if (message === 'NOT_FOUND') {
            setIsFoundAccount(false);
            return;
          }
          if (message?.match(RESPONSE_STATE.TOO_FREQUENTLY_)) {
            setRemainingSeconds(Number(message?.substring(15)));
            setIsTooFrequentlyModal(true);
            return;
          }
          if (message === 'FAILED_API_BCA') {
            setNewBank({ ...newBank, accountHolderName: '' });
            setIsFailedApi(true);
            setIsFailedApiModal(true);
            return;
          }
          toast.error(message);
        }
      }
    },
    [
      setLoading,
      getUpdataListBankClear,
      getUpdataListBankResponse?.data,
      setUpdataInquiryBankAccountClear,
      setUpdataInquiryBankAccountResponse?.data,
      setUpdataInquiryBankAccountFailed?.message,
      newBank,
    ],
  );
  useEffect(() => {
    // if (currentScreen === 'UpdataBankEdit') {
    updataResult(updataAction);
    updataResult;
    // }
  }, [updataAction, updataResult]);

  // Set seconds and minutes
  useEffect(() => {
    const min = Math.floor(remainingSeconds / 60);
    const sec = remainingSeconds - min * 60;
    setMinutes(min);
    setSeconds(sec);
  }, [remainingSeconds]);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // Time String
  // function showRemainingTime() {
  //   let min = minutes;
  //   let sec = seconds;
  //   if (minutes < 10) {
  //     min = `0${minutes}`;
  //   }
  //   if (seconds < 10) {
  //     sec = `0${seconds}`;
  //   }
  //   return `${min}:${sec}`;
  // }

  function searchFilter(arr, inputKeyword) {
    return arr.filter((item) => {
      return (
        item.bankName
          .toString()
          .toLowerCase()
          .indexOf(inputKeyword.toString().toLowerCase()) > -1
      );
    });
  }

  function validateAccountHolderName(text) {
    const regex = /[^A-Za-z .']/g;
    if (text === null) {
      return null;
    }
    if (text?.length < 1) {
      setNewAccountHolderNameMessage({
        error: trans(locale, lang, 'accountHolderNameRequired'),
      });
      return false;
    }
    if (regex.test(text)) {
      setNewAccountHolderNameMessage({
        warning: trans(locale, lang, 'accountHolderNameInvalid'),
      });
      return false;
    }
    if (text?.length > 100) {
      setNewAccountHolderNameMessage({
        error: trans(locale, lang, 'accountHolderNameTooLong'),
      });
      return false;
    }
    setNewAccountHolderNameMessage(null);
    return true;
  }

  // Clear User Block
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setIsTooFrequentlyModal(false);
    }
  }, [minutes, seconds]);

  function renderTooFrequentlyModal() {
    return (
      <ModalTooFrequently
        title={trans(locale, lang, 'andaTerlaluSering')}
        subTitle={trans(locale, lang, 'untukSementaraWaktu')}
        isOpen={isTooFrequentlyModal}
        setClose={() => setIsTooFrequentlyModal(false)}
        remainingSeconds={remainingSeconds}
      />
    );
  }

  function renderFailedApiModal() {
    return (
      <Modal isOpen={isFailedApiModal} size="sm">
        <div className="text-center relative">
          <img
            src={Notebook}
            className="absolute w-2/3 -top-1/2 left-1/2 translate-x-[-50%]"
          />
          <p className="font-bold pb-3 pt-9 text-base xm:pt-16 md:text-lg">
            {trans(locale, lang, 'oopsTerjadiMasalah')}
          </p>
          <p className="text-sm md:text-base">
            {trans(locale, lang, 'harapMenungguBeberapa')}
          </p>
        </div>
        <Button
          full
          type="linear-gradient"
          className="mt-6 mb-2 !h-10 md:!h-11 text-xs md:text-sm"
          onButtonClick={() => {
            setIsFailedApiModal(false);
            // setShowFormEditRek(false);
          }}>
          {trans(locale, lang, 'cobaLagi')}
        </Button>
      </Modal>
    );
  }

  function renderSuccessModal() {
    const closeModal = () => {
      let bankAccount = {
        ...otherInformation.data.bankAccount,
        bankName: newBank?.bankName,
        bankCode: foundAccount?.beneficiaryBankCode,
        accountHolderName: foundAccount?.beneficiaryAccountName,
        accountNo: foundAccount?.beneficiaryAccountNumber,
      };
      let isUploadBookAccount = false;

      if (successUploadAccountBook && isFoundAccount && !isValidAccount) {
        isUploadBookAccount = true;
        bankAccount = {
          ...otherInformation.data.bankAccount,
          bankName: newBank?.bankName,
          bankCode: foundAccount?.beneficiaryBankCode,
          accountHolderName: foundAccount?.beneficiaryAccountName,
          accountNo: foundAccount?.beneficiaryAccountNumber,
        };
      }

      if (successUploadAccountBook && isFailedApi) {
        isUploadBookAccount = true;
        bankAccount = {
          ...bankAccount,
          bankCode: newBank?.bankCode,
          accountHolderName: newAccountHolderName,
          accountNo: newNoRek,
        };
      }

      setUpdataTempState({ ...updataTempState, isUploadBookAccount });
      setOtherInformation({
        ...otherInformation,
        data: {
          ...otherInformation.data,
          bankAccount,
        },
      });
      setIsSuccessModal(false);
      setCurrentScreen('');
    };

    return (
      <ModalSuccess
        btnTitle={translate('lanjut')}
        isOpen={isSuccessModal}
        setClose={() => {
          closeModal();
        }}
        title={translate(
          isAddAccount ? 'andaBerhasilMenambahkan' : 'andaBerhasilMengubah',
        )}
      />
    );
  }

  const uploadFile = useRef(null);

  function renderUploadBank() {
    const onFileChange = (e) => {
      e.preventDefault();

      setAccountBookFileName('');
      setAccountBookFileType('');
      setUri('');

      const files = e?.target?.files;
      if (files?.length > 0 && files[0]?.size > 5000000) {
        // alert size too large
        setUploadAccountBookMessage('sizeToLarge');
        return;
      }

      const allowedFileTypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'application/pdf',
      ];
      const inputFile = files[0];
      if (!allowedFileTypes?.includes(inputFile?.type)) {
        setUploadAccountBookMessage('ukuranFileMax');
        return;
      }

      setUploadAccountBookMessage('');
      setAccountBookFileName(inputFile?.name);
      setAccountBookFileType(inputFile?.type);

      let _fileSize = inputFile?.size;
      let fSExt = ['Bytes', 'KB', 'MB', 'GB'],
        i = 0;
      while (_fileSize > 900) {
        _fileSize /= 1024;
        i++;
      }

      let exactSize = Math.round(_fileSize * 100) / 100 + ' ' + fSExt[i];

      setAccountBookFileSize(exactSize);
      setUri(inputFile);
      setEnableUploadAccountBook(true);
    };

    return (
      <div className="mt-5">
        <div className="relative">
          <input
            className="absolute z-10 opacity-0 w-full h-full"
            type="file"
            accept="image/png, image/jpeg, image/jpg, application/pdf"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                onFileChange(e);
              }
            }}
          />
          {accountBookFileName !== '' && accountBookFileSize !== '' ? (
            <div className="w-full border-2 rounded-3xl px-3 py-2 mb-4">
              <div className="w-full flex">
                <Image
                  alt=""
                  src={
                    accountBookFileType === 'application/pdf'
                      ? DocUpload
                      : PictureUpload
                  }
                  width={30}
                  height={30}
                />
                <div className="flex-grow ml-4 justify-between flex">
                  <div>
                    <p className="xm:text-xs md:text-sm ">
                      {accountBookFileName || '-'}
                    </p>
                    <p className="xm:text-xs md:text-sm ">
                      {accountBookFileSize || '-'}
                    </p>
                  </div>
                  <Image alt="" src={SuccessIcon} width={30} height={30} />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div
                role="button"
                className={`w-full border rounded-xl px-3 py-2 mb-4 ${
                  uploadAccountBookMessage && 'border-red-600'
                }`}>
                <div className="w-full flex justify-between">
                  <span className="text-gray-400 flex text-xs xm:text-sm md:text-base align-items-center">
                    {translate('uploadFileDisini')}
                  </span>
                  <Image alt="" src={Upload} width={30} height={30} />
                </div>
              </div>
            </div>
          )}
        </div>
        {uploadAccountBookMessage && (
          <div
            className={clsx(
              'w-full text-[11px] text-red-600 font-medium xm:text-xs',
            )}>
            {translate(uploadAccountBookMessage)}
          </div>
        )}
        <Alert className="!items-start">{translate('pastikanFileYang')}</Alert>
      </div>
    );
  }

  const renderFormInput = () => {
    const suffixIconNomorRekening = (
      <Button
        // disabled={!newNoRek || isSubmit || !newBank}
        disabled={!newNoRek || isSubmit}
        type="linear-gradient"
        className="w-fit px-3 text-[11px] !h-7 md:px-5 md:!h-8 md:text-xs"
        onButtonClick={() => {
          setIsSubmit(true);
          setLoading(true);

          // Clear state
          setIsFoundAccount(null);
          setFoundAccount('');
          setIsFailedApi(false);
          setNewAccountHolderName('');

          setUpdataInquiryBankAccount({
            beneficiaryBankCode: newBank.bankCode,
            beneficiaryAccountNumber: newNoRek,
          });

          // getInquiryDomesticAccount({
          //   beneficiaryBankCode: newBank.bankCode,
          //   beneficiaryAccountNumber: newNoRek,
          // });
          // dummyInquiry();
        }}>
        {translate('periksa')}
      </Button>
    );

    return (
      <div className="mt-5">
        <div className="mb-2 md:mb-4">
          <Input
            required
            disableBgWhite
            // role="button"
            inputClassName="!text-xs md:!text-sm cursor-pointer"
            value={newBank?.bankName?.toUpperCase()}
            label={translate('namaBank')}
            placeholder={translate('namaBank')}
            onFocus={() => setIsListBankModal(true)}
            suffixIcon={
              <Icon icon={chevronDown} size={18} className="text-gray-400" />
            }
          />
        </div>

        <div className="mb-2 md:mb-4">
          <Input
            required
            value={newNoRek}
            suffixIcon={suffixIconNomorRekening}
            label={trans(locale, lang, 'nomorRekening')}
            placeholder={trans(locale, lang, 'masukkanNomorRekening')}
            handleOnChange={(text) => {
              setNewNoRek(text.replace(/[^0-9]/g, ''));
              setIsFoundAccount(null);
              setFoundAccount('');
            }}
          />
        </div>
        <p className="text-xs text-gray-500">
          {trans(locale, lang, 'untukRekeningBca')}
        </p>

        {isFoundAccount && renderAccountOwnerContainer()}
        {renderAlertContainer()}

        {isFailedApi && (
          <div className="my-4">
            <Input
              required
              value={newAccountHolderName}
              label={trans(locale, lang, 'namaPemilikRekening')}
              placeholder={trans(locale, lang, 'masukkanNamaPemilikRekening')}
              handleOnChange={(text) => {
                const txt = text.replace(/\s{2,}/, ' ');
                setNewAccountHolderName(txt);
                setIsValidNewAccountHolderName(validateAccountHolderName(txt));
              }}
              message={newAccountHolderNameMessage}
            />
          </div>
        )}
      </div>
    );
  };

  function renderAccountOwnerContainer() {
    let bg = '';
    if (isFoundAccount && isValidAccount) {
      bg = 'bg-green-500';
    }
    if (isFoundAccount && !isValidAccount) {
      bg = 'bg-red-500';
    }

    return (
      <div className="py-5">
        <p className="text-xs font-semibold text-gray-600 mb-2">
          {trans(locale, lang, 'namaPemilikRekening')}
        </p>
        <div className="flex gap-3 items-center">
          <div className={`w-8 h-8 rounded-full ${bg} md:w-5 md:h-5`}></div>
          <p className="text-sm">
            {foundAccount?.beneficiaryAccountName || '-'}
          </p>
        </div>
      </div>
    );
  }

  function renderAlertContainer() {
    let bg = '';
    let color = '';
    let title = '';
    let type = 'warning';
    if (isFoundAccount === true && isValidAccount) {
      title = 'rekeningBerhasilDitemukan';
      type = 'success';
      bg = 'bg-green-200';
      color = 'text-green-500';
    } else if (isFoundAccount === true && !isValidAccount) {
      title = 'rekeningHarusAtas';
      type = 'error';
      bg = 'bg-red-100';
      color = 'text-red-500';
    } else if (isFoundAccount === false) {
      title = 'rekeningTidakDitemukan';
      type = 'warning';
      bg = 'bg-orange-100';
      color = 'text-orange-500';
    } else {
      return;
    }

    return (
      <div className="my-5">
        <div
          className={`flex items-center gap-2 rounded-3xl px-4 py-1 xm:py-2 ${bg}`}>
          {type === 'success' ? (
            <img src={KycChecklistRound} className="w-8" />
          ) : (
            <Icon icon={warning} size={22} className={`mb-1 ${color}`} />
          )}

          <p className={`pl-1 text-xs md:text-sm font-semibold ${color}`}>
            {translate(title)}
          </p>
        </div>
      </div>
    );
  }

  const renderModalPilihBank = () => {
    const handleClickBank = (val) => {
      setIsListBankModal(false);
      setListBank(filteredListBank);
      setNewBank(val);
      setIsFoundAccount(null);
      setFoundAccount('');
      setNewNoRek('');
    };
    return (
      <Modal isOpen={isListBankModal} size="md" className="mt-10">
        <div className="flex items-center pb-4 mb-1 border-b font-bold justify-between ">
          <Icon
            icon={ic_clear}
            size={18}
            role="button"
            className="md:pl-3"
            onClick={() => setIsListBankModal(false)}
          />
          <p className="text-xs xm:text-sm md:text-base">
            {translate('pilihNamaBank')}
          </p>
          <div className="w-6"></div>
        </div>

        <div className="my-4 xm:my-6">
          <Input
            prefixIcon={
              <Icon icon={search} size={20} className="text-gray-300" />
            }
            placeholder={trans(locale, lang, 'cariNamaBank')}
            handleOnChange={(text) => {
              if (text) {
                setListBank(searchFilter(filteredListBank, text));
              } else {
                setListBank(filteredListBank);
              }
            }}
          />
        </div>

        <div className="flex flex-col divide-y max-h-[50vh] overflow-y-scroll">
          {listBank.map((item, idx) => (
            <div
              key={`listBank[${idx}]`}
              role="button"
              className="font-semibold px-1 py-3 hover:bg-red-50 duration-300 md:py-4"
              onClick={() => handleClickBank(item)}>
              <p className="text-xs xm:text-sm capitalize  md:text-base">
                {item?.bankName}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    );
  };

  const renderCardBank = () => {
    return (
      <div className="flex flex-col gap-y-5 mt-5">
        <div
          role="button"
          onClick={() => setSelectedRek(bankAccount)}
          className="rounded-2xl border py-2 px-4 duration-500 hover:shadow-md">
          <label className="relative cursor-pointer flex w-full justify-between  items-center">
            <div className="py-2 text-sm capitalize">
              <p className="">{bankAccount?.bankName}</p>
              <p className="font-bold py-1 text-gray-600">
                {bankAccount?.accountNo}
              </p>
              <p className="leading-none">{bankAccount?.accountHolderName}</p>
            </div>

            <input
              type="radio"
              name="invitation"
              className="opacity-0"
              readOnly
              checked={selectedRek}
            />
            <div className="absolute top-4 right-0 transform -translate-y-1/2">
              <Icon
                icon={
                  selectedRek ? androidRadioButtonOn : androidRadioButtonOff
                }
                size={24}
                className={selectedRek ? 'text-red-500' : 'text-gray-300'}
              />
            </div>
          </label>
          {selectedRek && (
            <div onClick={() => setShowFormEditRek(true)} className="border-t">
              <p className="text-red-500 text-center pb-2 pt-3 text-sm font-bold hover:underline">
                {trans(locale, lang, 'ubahRekening')}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderListCardBank = () => {
    return (
      <>
        {_.isEmpty(bankAccount) ? (
          // !showFormUploadRek ? (
          //   renderUploadBank()
          // ) : (
          <Button
            full
            outline
            bordered
            className="mt-10 mb-5"
            onButtonClick={() => setShowFormEditRek(true)}>
            + {translate('tambahRekening')}
          </Button>
        ) : (
          // )
          renderCardBank()
        )}
      </>
    );
  };

  const renderHeaderBody = () => {
    return (
      <div className="flex pb-2 justify-between items-center border-b">
        <div role="button">
          <Icon
            icon={ic_keyboard_backspace}
            size={18}
            onClick={() => setCurrentScreen('')}
            className="cursor-pointer px-1 ml-1 rounded-sm duration-300 hover:bg-red-50"
          />
        </div>
        <p className="text-xs font-bold text-gray-600 xm:text-sm">
          {translate(isAddAccount() ? 'tambahRekening' : 'ubahRekening')}
        </p>
        <div className="w-6"></div>
      </div>
    );
  };

  const renderFooter = () => {
    let isDisabled = true;
    let label = translate('simpan');
    let onClickSave = () => {};

    // Nama rekening === Nama KTP
    if (isFoundAccount && isValidAccount) {
      // setType('success');
      isDisabled = false;
      label = translate('simpan');
      onClickSave = () => {
        setShowModalVerifyPIN(true);
      };
    }

    // Nama rekening !== Nama KTP
    if (isFoundAccount == true && !isValidAccount && !showFormUploadRek) {
      isDisabled = false;
      label = translate('uploadBukuRekening');
      onClickSave = () => {
        if (!enableUploadAccountBook) {
          setShowFormEditRek(true);
          setShowFormUploadRek(true);
          return;
        }
        setShowModalVerifyPIN(true);
      };
    }

    // Inquiry Failed
    if (isFailedApi && !showFormUploadRek) {
      // setType('failed');
      isDisabled = !isValidNewAccountHolderName;
      label = translate('uploadBukuRekening');
      onClickSave = () => {
        if (!enableUploadAccountBook) {
          setShowFormEditRek(true);
          setShowFormUploadRek(true);
          return;
        }
        setShowModalVerifyPIN(true);
      };
    }

    if (isFoundAccount == true && !isValidAccount && showFormUploadRek) {
      isDisabled = !enableUploadAccountBook;
      label = translate('simpan');
      onClickSave = () => {
        if (!enableUploadAccountBook) {
          setShowFormEditRek(true);
          setShowFormUploadRek(true);
          return;
        }
        setShowModalVerifyPIN(true);
      };
    }

    // Inquiry Failed
    if (isFailedApi && showFormUploadRek) {
      // setType('failed');
      isDisabled = !enableUploadAccountBook;
      label = translate('simpan');
      onClickSave = () => {
        if (!enableUploadAccountBook) {
          setShowFormEditRek(true);
          setShowFormUploadRek(true);
          return;
        }
        setShowModalVerifyPIN(true);
      };
    }

    return (
      <div className="mb-2 mt-5">
        <Button
          full
          type="linear-gradient"
          disabled={isDisabled}
          onButtonClick={onClickSave}>
          {label}
        </Button>
      </div>
    );
  };

  return (
    <div className="">
      <div className="flex flex-col h-full min-h-[50vh] justify-between">
        <div>
          {renderHeaderBody()}
          {showFormEditRek ? (
            <>{showFormUploadRek ? renderUploadBank() : renderFormInput()}</>
          ) : (
            renderListCardBank()
          )}
        </div>
        {renderFooter()}
      </div>
      {renderTooFrequentlyModal()}
      {renderFailedApiModal()}
      {renderSuccessModal()}
      {renderModalPilihBank()}
      {showModalVerifyPIN && (
        <InputPINModal
          isOpen={showModalVerifyPIN}
          callbackAction="UPDATA_INFORMATION_REK"
          alreadySetPin={alreadySetPin}
          callBack={(res) => {
            if (
              res?.success === true &&
              res.callbackAction === 'UPDATA_INFORMATION_REK'
            ) {
              setIsValidPin(true);
            }
          }}
          hide={() => setShowModalVerifyPIN(false)}
        />
      )}
    </div>
  );
}
