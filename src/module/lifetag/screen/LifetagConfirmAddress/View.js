import _ from 'lodash';
import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { trans } from '@cp-util/trans';
import { ic_west } from 'react-icons-kit/md';
import { Input, Button, Alert, ModalSuccess } from '@cp-component';
import { generateAddress, regexMobile, regexName } from '@cp-util/common';
import { ProfileAddressForm } from '@cp-module/profile/screen';
import { NAVIGATION } from '@cp-util/constant';
import { androidArrowBack } from 'react-icons-kit/ionicons';
import locale from './locale';
import {
  GET_ADDRESS_LIST_SUCCESS,
  GET_ADDRESS_LIST_FAILED,
  SET_UPDATE_ADDRESS_FAILED,
  SET_UPDATE_ADDRESS_SUCCESS,
} from '@cp-module/profile/profileConstant';
import {
  androidRadioButtonOn,
  androidRadioButtonOff,
} from 'react-icons-kit/ionicons';
import {
  SET_KYC_POSTALCODE_IDCARD_FAILED,
  SET_KYC_POSTALCODE_IDCARD_SUCCESS,
} from '@cp-module/kyc/kycConstant';

export default function View(props) {
  const {
    lang,
    userData,
    setLoading,
    profileAction,
    getAddressList,
    getAddressListClear,
    getAddressListFailed,
    getAddressListResponse,
    // contact,
    // setContact,
    // addressSelected,
    // setAddressSelected,
    // setShowAddAddress,
    setUpdateAddress,
    setUpdateAddressClear,
    setUpdateAddressFailed,
    setShowListAddress,
    kycAction,
    isComingFromScreen,
    setIsComingFromScreen,
    setAddPostalCodeKycIdCard,
  } = props;
  const router = useRouter();

  const [username, setUsername] = useState(userData?.name);
  const [usernameValid, setUsernameValid] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(userData?.mobilePhoneNumber);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [phoneNumberMessage, setPhoneNumberMessage] = useState('');

  const [selected, setSelected] = useState(false);
  const [listAddress, setListAddress] = useState({});
  const [isDisablePilihAlamat, setIsDisablePilihAlamat] = useState(true);

  const [inputKodePos, setInputKodePos] = useState(null);
  const [showInputKodePos, setShowInputKodePos] = useState(false);
  const [isKodePosValid, setIsKodePosValid] = useState(false);
  const [kodePosMessage, setKodePosMessage] = useState('');

  const [showAddAddress, setShowAddAddress] = useState(false);

  const [contact, setContact] = useState(null);
  const [addressSelected, setAddressSelected] = useState(null);

  const translate = (val) => trans(locale, lang, val);

  useEffect(() => {
    setLoading(true);
    getAddressList();
  }, [lang, setLoading, getAddressList]);

  useEffect(() => {
    setListAddress(getAddressListResponse?.data);
  }, [getAddressListResponse, getAddressList]);

  useEffect(() => {
    if (!_.isEmpty(isComingFromScreen?.addressSelected)) {
      setAddressSelected(isComingFromScreen?.addressSelected);

      if (!isComingFromScreen?.addressSelected?.postcode) {
        setShowInputKodePos(true);
      }
    }
  }, [isComingFromScreen]);

  // kode pos
  const kycResult = useCallback(
    (act) => {
      if (act === SET_KYC_POSTALCODE_IDCARD_SUCCESS) {
        getAddressList();
        setShowInputKodePos(false);
      }
      if (act === SET_KYC_POSTALCODE_IDCARD_FAILED) {
        setKodePosMessage({
          error: trans(locale, lang, 'gagalMenambahkanPostalCode'),
        });
      }
      return null;
    },
    [getAddressList, lang],
  );
  useEffect(() => {
    kycResult(kycAction);
  }, [kycAction, kycResult]);

  const validateKodePos = useCallback(
    (text) => {
      if (text.length !== 0 && text.length !== 5) {
        setKodePosMessage({
          error: trans(locale, lang, 'kodePosInvalid'),
        });
        return false;
      }
      setKodePosMessage(null);
      return true;
    },
    [lang],
  );

  // get profile
  const profileResult = useCallback(
    (act) => {
      if (act === GET_ADDRESS_LIST_SUCCESS) {
        setLoading(false);
        getAddressListClear();
      }
      if (act === GET_ADDRESS_LIST_FAILED) {
        setLoading(false);
        if (getAddressListFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          toast.alert(getAddressListFailed?.message);
        }
        getAddressListClear();
      }
      if (act === SET_UPDATE_ADDRESS_SUCCESS) {
        setLoading(false);
        setShowInputKodePos(false);
        setUpdateAddressClear();
      }
      if (act === SET_UPDATE_ADDRESS_FAILED) {
        setLoading(false);
        setKodePosMessage({
          error: trans(locale, lang, 'gagalMenambahkanPostalCode'),
        });
        if (setUpdateAddressFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          toast.alert(setUpdateAddressFailed?.message);
        }
        setUpdateAddressClear();
      }
      setLoading(false);
    },
    [
      setUpdateAddressClear,
      setUpdateAddressFailed,
      getAddressListClear,
      getAddressListResponse,
      getAddressListFailed?.message,
      setLoading,
    ],
  );

  useEffect(() => {
    profileResult(profileAction);
  }, [profileAction, profileResult]);

  // username & phone number
  const validateUsername = (text) => {
    if (text.length < 1) {
      setUsernameMessage({ error: trans(locale, lang, 'nameRequired') });
      return false;
    }
    if (text.length > 100) {
      setUsernameMessage({
        error: trans(locale, lang, 'nameLengthTooLong'),
      });
      return false;
    }
    setUsernameMessage(null);
    return true;
  };

  const validatePhoneNumber = (text) => {
    if (text.length < 1) {
      setPhoneNumberMessage({ error: trans(locale, lang, 'numberRequired') });
      return false;
    }
    if (!regexMobile.test(text)) {
      setPhoneNumberMessage({ warning: trans(locale, lang, 'numberInvalid') });
      return false;
    }
    setPhoneNumberMessage(null);
    return true;
  };

  useEffect(() => {
    setUsernameValid(validateUsername(username));
    setPhoneNumberValid(validatePhoneNumber(phoneNumber));
  }, [userData]);

  useEffect(() => {
    if (addressSelected) {
      setSelected(addressSelected);
    }
  }, [addressSelected]);

  // handle button disable - pilih alamat
  useEffect(() => {
    if (addressSelected?.postcode) {
      if (!_.isEmpty(addressSelected) && phoneNumberValid && usernameValid) {
        setIsDisablePilihAlamat(false);
      }
    }
    if (!addressSelected?.postcode) {
      if (!_.isEmpty(addressSelected) && phoneNumberValid && usernameValid) {
        setIsDisablePilihAlamat(true);
      }
    }
  }, [addressSelected, phoneNumberValid, usernameValid]);

  // render
  const renderHeader = () => (
    <div className="flex w-full py-6 px-[5%] justify-between items-center border">
      <div
        role="button"
        onClick={
          () => router.back()
          //   {
          //   setContact(contact);
          //   setShowListAddress(false);
          //   setAddressSelected(selected);

          // }
        }
        className="">
        <Icon icon={ic_west} size={22} />
      </div>
      <p className="text-body1 font-bold">{translate('pilihAlamat')}</p>
      <div className="w-10"></div>
    </div>
  );

  const renderContact = () => (
    <div className="px-5 py-3">
      <Input
        required
        label={translate('namaPenerima')}
        value={username}
        message={usernameMessage}
        handleOnChange={(val) => {
          setUsername(val);
          setContact({ ...contact, username: val });
          setUsernameValid(validateUsername(val));
        }}
      />
      <Input
        required
        label={translate('noHp')}
        value={phoneNumber}
        className="mt-4"
        inputMode="tel"
        message={phoneNumberMessage}
        handleOnChange={(val) => {
          setPhoneNumber(val);
          setContact({ ...contact, phoneNumber: val });
          setPhoneNumberValid(validatePhoneNumber(val));
        }}
      />
    </div>
  );

  const renderAddAddress = () => {
    return (
      <div className="relative">
        <div className="flex w-full py-6 px-[5%] justify-between items-center border">
          <div
            role="button"
            onClick={() => setShowAddAddress(false)}
            className="">
            <Icon icon={androidArrowBack} size={24} />
          </div>
          <p className="text-body1 font-bold">{translate('tambahAlamat')}</p>
          <div className="w-10"></div>
        </div>
        <div className="max-w-3xl bg-white px-5 shadow-md border rounded-3xl my-6 pt-6 mx-auto">
          <ProfileAddressForm
            currentAction="add"
            handleSuccess={() => setShowAddAddress(false)}
          />
        </div>
      </div>
    );
  };

  const InputRadio = ({ item, title, className }) => {
    const jalan = item?.street || '',
      rt = item?.rt || '',
      rw = item?.rw || '',
      desa = item?.subDistrict?.value
        ? item?.subDistrict?.value
        : item?.subDistrict || '',
      kecamatan = item?.district?.value
        ? item?.district?.value
        : item?.district || '',
      kota = item?.city?.value ? item?.city?.value : item?.city || '',
      provinsi = item?.province?.value
        ? item?.province?.value
        : item?.province || '',
      kodePos = item?.postcode?.value
        ? item?.postcode?.value
        : item?.postcode || '';

    const stringAddress = `${jalan}, ${
      rt && rw ? `RT${rt}/RW${rw}` : ''
    }, ${desa}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
      .replace(/ ,/g, '')
      .trim()
      .replace(/^, /g, '')
      .trim()
      .replace(/,$/g, '');

    const onClickSelect = () => {
      if (!item?.postcode) {
        setShowInputKodePos(true);
        setAddressSelected(item);
      } else {
        setAddressSelected(item);
        setContact({ stringAddress: generateAddress(item), title });
        setShowInputKodePos(false);
      }
    };

    return (
      <div
        role="button"
        onClick={onClickSelect}
        className={`rounded-xl border py-2 px-4
        ${_.isEqual(item, addressSelected) ? 'border-red-500' : ''}
        ${className}`}>
        <label className="relative cursor-pointer flex w-full justify-between  items-center">
          <div className="py-2 text-sm capitalize">
            <p className="font-bold">{title ? title : ''}</p>
            <p className="pt-3">{stringAddress}</p>
          </div>

          <input
            type="radio"
            name="invitation"
            className="opacity-0"
            readOnly
            checked={_.isEqual(item, addressSelected)}
          />
          <div className="absolute top-4 right-0 transform -translate-y-1/2">
            <Icon
              icon={
                _.isEqual(item, addressSelected)
                  ? androidRadioButtonOn
                  : androidRadioButtonOff
              }
              size={24}
              className={
                _.isEqual(item, addressSelected)
                  ? 'text-red-500'
                  : 'text-gray-300'
              }
            />
          </div>
        </label>

        {showInputKodePos && !item?.postcode && (
          <div className="flex pb-3 items-center">
            <Input
              autoFocus="autoFocus"
              required
              value={inputKodePos}
              inputMode="numeric"
              maxLength={5}
              handleOnChange={(text) => {
                setInputKodePos(text.replace(/[^0-9]/g, ''));
                setIsKodePosValid(validateKodePos(text));
              }}
              message={kodePosMessage}
              className="text-sm w-full md:w-[49%]"
              placeholder={trans(locale, lang, 'masukkanKodePos')}
            />
            <Button
              type="linear-gradient"
              className="w-32 ml-5  !h-11 text-sm"
              disabled={!isKodePosValid}
              onButtonClick={() => {
                if (item?.id) {
                  setUpdateAddress({
                    id: item?.id,
                    postcode: inputKodePos,
                  });
                } else {
                  setAddPostalCodeKycIdCard({ postcode: inputKodePos });
                }
              }}>
              Submit
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderListAddress = () => (
    <div className="flex flex-col gap-y-4 mt-5 py-8 px-5 border-gray-100">
      <InputRadio
        item={listAddress?.eKYCAddress}
        title={translate('alamatSesuaiKtp')}
      />
      {listAddress?.userAddressList?.map((item, idx) => (
        <InputRadio key={idx} item={item} title={item?.title} />
      ))}
    </div>
  );

  const renderButton = () => {
    return (
      <div className="px-5 pt-6">
        <Button
          full
          outline
          className="text-sm md:!h-11"
          onButtonClick={
            () => setShowAddAddress(true)
            // router.push(
            //   {
            //     pathname: NAVIGATION.PROFILE.Profile,
            //     query: { activeTabProps: 3, addAddress: true },
            //   },
            //   NAVIGATION.PROFILE.Profile,
            // )
          }>
          {translate('tambahAlamat')}
        </Button>

        <Button
          full
          type="linear-gradient"
          disabled={isDisablePilihAlamat}
          className="my-5 text-sm md:!h-11"
          onButtonClick={() => {
            // setShowListAddress(false);
            // setContact({
            //   ...contact,
            //   username: username,
            //   phoneNumber: phoneNumber,
            // });
            setIsComingFromScreen({
              addressSelected,
              addressContact: contact,
            });
            router.push(
              {
                pathname: NAVIGATION.LIFETAG.LifetagConfirm,
                query: { from: 'select-address' },
              },
              NAVIGATION.LIFETAG.LifetagConfirm,
            );
          }}>
          {translate('pilihAlamat')}
        </Button>
      </div>
    );
  };

  return (
    <div className="relative">
      {showAddAddress ? (
        renderAddAddress()
      ) : (
        <>
          {renderHeader()}
          <div className="max-w-2xl bg-white shadow-md border rounded-3xl my-5 py-5 mx-auto">
            {renderContact()}
            <div className="px-5">
              <Alert className="!text-xs">{translate('alertMessage')}</Alert>
            </div>
            {renderListAddress()}
            {renderButton()}
          </div>
        </>
      )}
    </div>
  );
}
