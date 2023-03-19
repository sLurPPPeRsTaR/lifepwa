import Icon from 'react-icons-kit';
import { useCallback, useEffect, useState } from 'react';
import { arrowLeft } from 'react-icons-kit/feather';
import { closeRound, androidArrowBack } from 'react-icons-kit/ionicons';
import { useRouter } from 'next/router';
import { Alert, Button, Input, Modal } from '@cp-component';
import {
  ShieldBig,
  Cone,
  ProfileAddress,
  TempatSampah2,
} from '@cp-config/Images';
import { pCall, pMail, pChat, DeleteIcon, BadgeTick } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import locale from './locale';
import {
  GET_ADDRESS_LIST_FAILED,
  GET_ADDRESS_LIST_SUCCESS,
  SET_DELETE_ADDRESS_FAILED,
  SET_DELETE_ADDRESS_SUCCESS,
} from '@cp-module/profile/profileConstant';
import _, { isEmpty } from 'lodash';
import { formatCapitalizeEachWord } from '@cp-util/format';
import { toast } from 'react-toastify';
import ProfileAddressEdit from '../ProfileAddressEdit';
import { NAVIGATION } from '@cp-util/constant';
import { informationCircled } from 'react-icons-kit/ionicons';
import { regexGlobalPhoneNumber, regexName } from '@cp-util/common';

export default function Page(props) {
  const {
    lang,
    setAvailableOnMobile,
    profileAction,
    getAddressListResponse,
    getAddressListFailed,
    getAddressList,
    getAddressListClear,
    setLoading,
    setDeleteAddressFailed,
    setDeleteAddress,
    setDeleteAddressClear,
    alreadyKYC,
    setIsComingFromScreen,
    isComingFromScreen,
  } = props;

  const router = useRouter();
  const { addAddress } = router?.query;
  const [activeTitle, setActiveTitle] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [activeArrowBack, setActiveArrowBack] = useState(false);

  const [action, setAction] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDeleteConfirmationModal, setIsDeleteConfirmationModal] =
    useState(false);
  const [isDeleteSuccessModal, setIsDeleteSuccessModal] = useState(false);

  const [selectedDeleteAddress, setSelectedDeleteAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedLifeTagAddress, setSelectedLifeTagAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [name, setName] = useState('');
  const [fullNameMessage, setFullNameMessage] = useState(null);
  const [isValidFullName, setValidFullName] = useState(true);
  const [phoneNo, setPhoneNo] = useState('');
  const [phoneNumberMessage, setPhoneNumberMessage] = useState(null);
  const [isValidPhoneNumber, setValidPhoneNumber] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedId, setSelectedId] = useState('');

  // from lifetag confirm
  useEffect(() => {
    if (addAddress) {
      setAction('add');
      setActiveArrowBack(true);
    }
  }, [addAddress]);

  // ADDRESS
  useEffect(() => {
    getAddressList();
  }, [getAddressList]);

  useEffect(() => {
    if(!isEmpty(isComingFromScreen)){
      setName(isComingFromScreen?.params?.name);
      setPhoneNo(isComingFromScreen?.params?.phoneNo);
    }
  }, [isComingFromScreen])

  useEffect(() => {
    profileResult(profileAction);
  }, [profileAction, profileResult]);

  useEffect(() => {
    validatePhoneNumber(phoneNo);
    validateFullName(name);
  }, [name, phoneNo, validateFullName, validatePhoneNumber]);

  const validateFullName = useCallback(
    (text) => {
      if (text.length < 1) {
        setFullNameMessage({ error: trans(locale, lang, 'nameRequired') });
        return false;
      }
      if (!regexName.test(text)) {
        setFullNameMessage({ warning: trans(locale, lang, 'nameInvalid') });
        return false;
      }
      if (text.length > 100) {
        setFullNameMessage({
          error: trans(locale, lang, 'nameLengthTooLong'),
        });
        return false;
      }
      setFullNameMessage(null);
      return true;
    },
    [lang]
  );

  const validatePhoneNumber = useCallback(
    (text) => {
      if (text.length < 1 || text.length < 10) {
        setPhoneNumberMessage({
          error: trans(locale, lang, 'phoneNumberRequired'),
        });
        return false;
      }
      if (text.length > 15) {
        setPhoneNumberMessage({
          error: trans(locale, lang, 'phoneNumberInvalid'),
        });
        return false;
      }
      if (!regexGlobalPhoneNumber.test(text)) {
        setPhoneNumberMessage({
          warning: trans(locale, lang, 'phoneNumberInvalid'),
        });
        return false;
      }
      setPhoneNumberMessage(null);
      return true;
    },
    [lang]
  );

  const profileResult = useCallback(
    (act) => {
      if (act === GET_ADDRESS_LIST_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_ADDRESS_LIST_FAILED) {
        setLoading(false);
        const error = getAddressListFailed?.message;
        if (error !== 'INTERNAL_SERVER_ERROR') {
          Alert('warning', error);
        }
      }
      if (act === SET_DELETE_ADDRESS_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        setIsDeleteSuccessModal(true);
        setDeleteAddressClear();
        getAddressList();
      }
      if (act === SET_DELETE_ADDRESS_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        if (setDeleteAddressFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          toast.alert('Warning', setDeleteAddressFailed?.message);
        }
        setDeleteAddressClear();
      }
    },
    [
      getAddressList,
      getAddressListFailed?.message,
      setDeleteAddressClear,
      setDeleteAddressFailed?.message,
      setLoading,
    ],
  );

  function selectAddress(address, postCode, title, id) {
    setSelectedLifeTagAddress(address);
    setSelectedTitle(title);
    setSelectedId(id);
    setPostCode(postCode);
  }

  function renderEKYCAddressContainer() {
    if (!_.isEmpty(getAddressListResponse?.data?.eKYCAddress) && alreadyKYC) {
      const item = getAddressListResponse?.data?.eKYCAddress;

      // Format Address
      const namaJalan = item.street || '';
      const rt = item.rt || '';
      const rw = item.rw || '';
      const kelurahan = formatCapitalizeEachWord(item.subDistrict || '');
      const kecamatan = formatCapitalizeEachWord(item.district || '');
      const kota = formatCapitalizeEachWord(item.city || '');
      const provinsi = formatCapitalizeEachWord(item.province || '');
      const kodePos = item.postcode || '';

      const textAddress = `${namaJalan}, ${
        rt && rw ? `RT${rt}/RW${rw}` : ''
      }, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
        .replace(/ ,/g, '')
        .trim()
        .replace(/^, /g, '')
        .trim()
        .replace(/,$/g, '');

      return (
        <div className="flex flex-col space-y-4">
          <div className="border p-4 rounded-2xl">
            {!isEmpty(isComingFromScreen) ? (
              <div className='w-5 h-5 border rounded-full absolute right-3 grid place-items-center' role='button' onClick={() => selectAddress(textAddress, kodePos, '', '')}>
                {selectedLifeTagAddress === textAddress ? (
                  <div className='w-4 h-4 border bg-red-500 rounded-full'>
                  </div>
                ) : null}
              </div>
            ) : null}
            <p className="text-sm font-black">
              {trans(locale, lang, 'rumahTinggalSesuai')}
            </p>
            <p className="pt-3 text-sm">{textAddress}</p>
          </div>
        </div>
      );
    }
    return null;
  }

  function renderAddressListContainer() {
    const userAddressList =
      getAddressListResponse?.data?.userAddressList?.filter((i) => i.title);
    if (!_.isEmpty(userAddressList)) {
      return userAddressList.map((item) => {
        // Format Address
        const namaJalan = item.street || '';
        const rt = item.rt || '';
        const rw = item.rw || '';
        const kelurahan = formatCapitalizeEachWord(
          item.subDistrict.value || '',
        );
        const kecamatan = formatCapitalizeEachWord(item.district.value || '');
        const kota = formatCapitalizeEachWord(item.city.value || '');
        const provinsi = formatCapitalizeEachWord(item.province.value || '');
        const kodePos = item.postcode || '';

        const textAddress = `${namaJalan}, ${
          rt && rw ? `RT${rt}/RW${rw}` : ''
        }, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
          .replace(/ ,/g, '')
          .trim()
          .replace(/^, /g, '')
          .trim()
          .replace(/,$/g, '');

        return (
          <div key={item.id} className="flex flex-col space-y-4 mt-3">
            <div className="border p-4 rounded-2xl relative">
              {isEmpty(isComingFromScreen) ? (
                <img
                  src={DeleteIcon}
                  className="cursor-pointer opacity-80 duration-300 hover:opacity-100 w-5 absolute right-3"
                  onClick={() => {
                    setIsDeleteConfirmationModal(true);
                    setSelectedDeleteAddress(item.id);
                  }}
                />
              ) : (
                <div className='w-5 h-5 border rounded-full absolute right-3 grid place-items-center' role='button' onClick={() => selectAddress(textAddress, kodePos, item.title, item.id)}>
                  {selectedLifeTagAddress === textAddress ? (
                    <div className='w-4 h-4 border bg-red-500 rounded-full'>
                    </div>
                  ) : null}
                </div>
              )}
              <p className="text-sm font-black">{item.title}</p>
              <p className="pt-3 text-sm">{textAddress}</p>
              {isEmpty(isComingFromScreen) && (
                <div className="w-2/3 mx-auto">
                  <Button
                    className="mt-6 text-sm !h-10"
                    outline
                    shadow
                    full
                    bordered
                    onButtonClick={() => {
                      setAction('edit');
                      setSelectedAddress(item);
                      setActiveArrowBack(true);
                      setActiveTitle(trans(locale, lang, 'ubahAlamat'));
                    }}>
                    {trans(locale, lang, 'ubahAlamat')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      });
    }
    return null;
  }

  function renderAddressNullContainer() {
    const userAddressList =
      getAddressListResponse?.data?.userAddressList.filter((i) => i.title);
    if (
      _.isEmpty(getAddressListResponse?.data?.eKYCAddress) &&
      _.isEmpty(userAddressList) &&
      !alreadyKYC
    ) {
      return (
        <div className="w-[60%] mx-auto text-center">
          <img src={ProfileAddress} className="my-10 w-[80%] mx-auto" />
          <text className="text-base">
            {trans(locale, lang, 'alamatKosong')}
          </text>
        </div>
      );
    }
    return null;
  }

  const renderAddressList = () => {
    return (
      <div className="relative flex flex-col min-h-[60vh] h-full justify-between">
        <div className="flex flex-col h-full justify-between">
          {!isEmpty(isComingFromScreen) ? renderChangeAddressForm() : null}
          {renderEKYCAddressContainer()}
          {renderAddressListContainer()}
          {renderAddressNullContainer()}
        </div>
        <div className="md:px-[10%]">
          <Button
            className="mt-10"
            type={!isEmpty(isComingFromScreen) ? '' : 'linear-gradient'}
            outline={!isEmpty(isComingFromScreen)}
            bordered={!isEmpty(isComingFromScreen)}
            shadow
            full
            onButtonClick={() => {
              setAction('add');
              setActiveArrowBack(true);
              setActiveTitle(trans(locale, lang, 'tambahAlamat'));
            }}>
            {trans(locale, lang, 'tambahAlamat')}
          </Button>
          {!isEmpty(isComingFromScreen) && (
            <Button
              className="mt-4"
              type='linear-gradient'
              disabled={selectedLifeTagAddress == '' || !isValidFullName || !isValidPhoneNumber}
              shadow
              full
              onButtonClick={() => {
                setIsComingFromScreen({
                  screen: isComingFromScreen?.screen,
                  params: {
                    selectedLifeTagAddress,
                    postCode,
                    name,
                    phoneNo,
                    selectedTitle,
                    selectedId,
                  },
                });
                router.push({
                  pathname: NAVIGATION.LIFESAVER.LifesaverConfirm,
                  query: {
                    from: 'start',
                  },
                },
                NAVIGATION.LIFESAVER.LifesaverConfirm,)
              }}>
              {trans(locale, lang, 'pilihAlamat')}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderChangeAddressForm = () => {
    return(
      <div className="flex flex-col space-y-4 mt-3 mb-10">
        <Input
          required
          value={name}
          handleOnChange={(text) => {
            setName(text);
            setValidFullName(validateFullName(text));
          }}
          message={fullNameMessage}
          className="text-sm w-full"
          label={trans(locale, lang, 'namaPenerima')}
        />
        <Input
          required
          value={phoneNo}
          handleOnChange={(text) => {
            setPhoneNo(text);
            setValidPhoneNumber(validatePhoneNumber(text));
          }}
          message={phoneNumberMessage}
          className=" text-sm w-full"
          label={trans(locale, lang, 'noHP')}
        />
        <div className="flex flex-row bg-orange-100 p-4 rounded-xl mt-2 mb-10">
          <Icon
            className="text-orange-300"
            icon={informationCircled}
            size={20}
          />
          <text className="ml-2 text-sm">
            {trans(locale, lang, 'pilihAlamatUntuk')}
          </text>
        </div>
      </div>
    )
  }

  const renderModalSuccess = () => {
    return (
      <Modal isOpen={modalSuccess} className="relative max-w-[600px]">
        <div className="relative p-3">
          <img
            src={ShieldBig}
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center mx-auto my-3 max-w-[240px]">
            {trans(locale, lang, 'suksesTambahAlamat')}
          </p>
          <Button
            className="mt-8"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setModalSuccess(false);
            }}>
            OK!
          </Button>
        </div>
      </Modal>
    );
  };

  const setHandleArrowBack = (key) => {
    setActiveArrowBack(false);
    setActiveTitle(trans(locale, lang, 'alamat'));
    setSelectedAddress({});
    setAction('');
  };

  useEffect(() => {
    setActiveTitle(trans(locale, lang, 'alamat'));
  }, []);

  const renderDeleteConfirmationModal = () => {
    return (
      <Modal isOpen={isDeleteConfirmationModal} className="max-w-[400px]">
        <div className="flex flex-col">
          <Icon
            icon={closeRound}
            size={24}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={() => {
              setIsDeleteConfirmationModal(false);
              setSelectedDeleteAddress(null);
            }}
          />
          <img src={TempatSampah2} className="w-40 mx-auto" />
          <text className="px-3 py-3 text-lg font-bold text-center">
            {trans(locale, lang, 'apakahKamuIngin')}
          </text>
          <Button
            className="mt-10"
            outline
            shadow
            full
            onButtonClick={() => {
              setIsDeleteConfirmationModal(false);
              setSelectedDeleteAddress(null);
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button
            className="my-5"
            type="linear-gradient"
            shadow
            full
            disabled={isSubmit}
            onButtonClick={() => {
              if (!isSubmit) {
                setIsDeleteConfirmationModal(false);
                setIsSubmit(true);
                setLoading(true);
                setDeleteAddress({ id: selectedDeleteAddress });
                setSelectedDeleteAddress(null);
              }
            }}>
            {trans(locale, lang, 'hapus')}
          </Button>
        </div>
      </Modal>
    );
  };

  const renderDeleteSuccessModal = () => {
    return (
      <Modal isOpen={isDeleteSuccessModal} className="max-w-[400px]">
        <div className="flex flex-col">
          <Icon
            icon={closeRound}
            size={24}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={() => {
              setIsDeleteSuccessModal(false);
            }}
          />
          <img src={BadgeTick} className="w-40 mx-auto" />
          <text className="px-3 py-3 text-lg font-bold text-center">
            {trans(locale, lang, 'berhasilMenghapusAlamat')}
          </text>
          <Button
            className="my-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setIsDeleteSuccessModal(false);
            }}>
            {trans(locale, lang, 'ok')}
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      {renderModalSuccess()}
      {renderDeleteConfirmationModal()}
      {renderDeleteSuccessModal()}

      <div className="relative w-full bg-white md:rounded-3xl xs:min-h-[60vh] lg:min-h-[70vh] border md:mb-24 lg:mb-0">
        <div className="flex justify-between items-center border-b-4 py-6 w-full text-center">
          <div>
            {activeArrowBack && (
              <Icon
                icon={arrowLeft}
                size={20}
                onClick={setHandleArrowBack}
                className="ml-4 px-2 cursor-pointer
                  text-gray-600 hover:text-red-dark-red90"
              />
            )}
          </div>
          <p className="text-sm lg:text-lg font-bold">{activeTitle}</p>
          <div className="w-10"></div>
        </div>

        <div className="p-3 h-full md:p-5">
          {activeArrowBack ? (
            <ProfileAddressEdit
              addAddress={addAddress}
              currentAction={action}
              address={selectedAddress}
              handleSuccess={setHandleArrowBack}
            />
          ) : (
            renderAddressList()
          )}
        </div>
      </div>
    </div>
  );
}
