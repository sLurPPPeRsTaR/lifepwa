import { Button, HeaderPage, Input, Modal } from '@cp-component';
import clsx from 'classnames';
import {
  BtnBack,
  Close,
  Female,
  Male,
  Search2,
  Location,
  MaleActive,
  FemaleActive,
  pChat,
  pCall,
  pMail,
  Calendar,
  Calender,
} from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import Image from 'next/image';
import { useState, useCallback, useEffect, useRef } from 'react';
import locale from './locale';
import _ from 'lodash';
import moment from 'moment';
import {
  SET_KYC_VERIFYDUKCAPIL_FAILED,
  SET_KYC_VERIFYDUKCAPIL_SUCCESS,
  SET_KYC_VERIFYIDCARD_FAILED,
  SET_KYC_VERIFYIDCARD_SUCCESS,
} from '@cp-module/kyc/kycConstant';
import { toast } from 'react-toastify';
import { NAVIGATION } from '@cp-util/constant';
import { useRouter } from 'next/router';
import { biodata_failed_head, ktp_failed_head } from '@cp-config/Images';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa';
import { checkCircle } from 'react-icons-kit/fa';

// Flatpickr date picker

export default function Page({
  kycAction,
  lang,
  setKycIdCardResponse,
  setKycVerifyDukcapilResponse,
  setKycVerifyDukcapilClear,
  getPersonalDataProvinceResponse,
  getPersonalDataCity,
  getPersonalDataCityResponse,
  getPersonalDataDistrict,
  getPersonalDataDistrictResponse,
  setLoading,
  setKycVerifyDukcapil,
  setKycVerifyIdCard,
  setKycVerifyIdCardClear,
  setKycVerifyDukcapilFailed,
  setKycVerifyIdCardFailed,
  setUserData,
}) {
  const router = useRouter();

  const [dataKtp, setDataKtp] = useState({
    address: setKycIdCardResponse?.data?.user?.address,
    city: setKycIdCardResponse?.data?.user?.city,
    district: setKycIdCardResponse?.data?.user?.district,
    dob: setKycIdCardResponse?.data?.user?.dob,
    gender: setKycIdCardResponse?.data?.user?.gender,
    hamlet: setKycIdCardResponse?.data?.user?.hamlet,
    idCardNumber: setKycIdCardResponse?.data?.user?.idCardNumber,
    maritalStatus: setKycIdCardResponse?.data?.user?.maritalStatus,
    name: setKycIdCardResponse?.data?.user?.name,
    neighborhood: setKycIdCardResponse?.data?.user?.neighborhood,
    occupation: setKycIdCardResponse?.data?.user?.occupation,
    pob: setKycIdCardResponse?.data?.user?.pob,
    province: setKycIdCardResponse?.data?.user?.province,
    subDistrict: setKycIdCardResponse?.data?.user?.subDistrict,
  });

  const [dataRegion, setDataRegion] = useState([]);
  const [dataRegionSorted, setDataRegionSorted] = useState([]);
  const [activeModalRegion, setActiveModalRegion] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isModalRegionActive, setIsModalRegionActive] = useState(false);
  const [isModalMaritalActive, setIsModalMaritalActive] = useState(false);
  const [activeModalError, setActiveModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeModalCallCenter, setActiveModalCallCenter] = useState(false);
  const [onConfirm, setConfirm] = useState(false);

  const todayDate = new Date();
  const yesterdayDate = todayDate.setDate(todayDate.getDate() - 1);

  const {
    query: { product, prev, callbackUrl },
  } = router;

  const setKycResult = useCallback(
    (act) => {
      if (act === SET_KYC_VERIFYIDCARD_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        setUserData({
          userData: {
            alreadyKYC: true,
          },
        });
        setKycVerifyDukcapilClear();
        setKycVerifyIdCardClear();
        router.push(
          {
            pathname: NAVIGATION.KYC.KycCreatePin,
            query: { product, prev, callbackUrl },
          },
          NAVIGATION.KYC.KycCreatePin,
        );
      }
      if (act === SET_KYC_VERIFYIDCARD_FAILED) {
        setLoading(false);
        setIsSubmit(false);
      }
      if (act === SET_KYC_VERIFYDUKCAPIL_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
      }
      if (act === SET_KYC_VERIFYDUKCAPIL_FAILED) {
        setLoading(false);
        setIsSubmit(false);
      }
    },
    [
      callbackUrl,
      prev,
      product,
      router,
      setKycVerifyDukcapilClear,
      setKycVerifyIdCardClear,
      setLoading,
      setUserData,
    ],
  );

  useEffect(() => {
    setKycResult(kycAction);
  }, [kycAction, setKycResult]);

  useEffect(() => {
    if (setKycVerifyDukcapilResponse?.data?.isVerified) {
      setLoading(true);
      setKycVerifyIdCard({
        user: {
          idCardNumber: dataKtp?.idCardNumber,
          name: dataKtp?.name.replace(/,([^,]*)$/, '').trim(),
          gender: dataKtp?.gender,
          pob: dataKtp?.pob,
          dob: dataKtp?.dob,
          address: dataKtp?.address,
          province: dataKtp?.province?.toUpperCase(),
          city: dataKtp?.city?.toUpperCase(),
          district: dataKtp?.district?.toUpperCase(),
          subDistrict: dataKtp?.subDistrict?.toUpperCase(),
          neighborhood: dataKtp?.neighborhood,
          hamlet: dataKtp?.hamlet,
          maritalStatus: dataKtp?.maritalStatus,
          occupation: setKycIdCardResponse?.data?.user?.occupation,
        },
      });
    }
  }, [
    dataKtp?.address,
    dataKtp?.city,
    dataKtp?.district,
    dataKtp?.dob,
    dataKtp?.gender,
    dataKtp?.hamlet,
    dataKtp?.idCardNumber,
    dataKtp?.maritalStatus,
    dataKtp?.name,
    dataKtp?.neighborhood,
    dataKtp?.pob,
    dataKtp?.province,
    dataKtp?.subDistrict,
    setKycIdCardResponse?.data?.user?.occupation,
    setKycVerifyDukcapilResponse?.data?.isVerified,
    setKycVerifyIdCard,
    setLoading,
  ]);

  useEffect(() => {
    if (setKycVerifyDukcapilFailed?.message) {
      if (setKycVerifyDukcapilFailed?.message === 'BAD_REQUEST') {
        setActiveModalError(true);
        setErrorMessage('BAD_REQUEST');
      } else if (
        setKycVerifyDukcapilFailed?.message === 'ID_CARD_ALREADY_REGISTERED'
      ) {
        setActiveModalError(true);
        setErrorMessage('ID_CARD_ALREADY_REGISTERED');
      } else {
        setActiveModalError(true);
        setErrorMessage('DATA_INVALID');
      }
    }
  }, [setKycVerifyDukcapilFailed]);

  useEffect(() => {
    if (setKycVerifyIdCardFailed?.message) {
      // error data invalid need to check
      toast.error(setKycVerifyIdCardFailed?.message);
    }
  }, [setKycVerifyIdCardFailed]);

  useEffect(() => {
    if (getPersonalDataProvinceResponse?.data) {
      setDataRegion(getPersonalDataProvinceResponse?.data);
      setActiveModalRegion('province');
    }
  }, [getPersonalDataProvinceResponse]);

  useEffect(() => {
    if (getPersonalDataCityResponse?.data) {
      setDataRegion(getPersonalDataCityResponse?.data);
      setActiveModalRegion('city');
    }
  }, [getPersonalDataCityResponse]);

  useEffect(() => {
    if (getPersonalDataDistrictResponse?.data) {
      setDataRegion(getPersonalDataDistrictResponse?.data);
      setActiveModalRegion('district');
    }
  }, [getPersonalDataDistrictResponse]);

  useEffect(() => {
    setDataRegionSorted(dataRegion);
  }, [dataRegion]);

  useEffect(() => {
    setDataRegionSorted(
      dataRegion?.filter((e) => e?.value.includes(searchKey?.toLowerCase())),
    );
  }, [dataRegion, searchKey]);

  // Banner Content
  function renderHeader() {
    return (
      <div className="relative mb-3 h-14 flex items-center px-4 ">
        <div
          role="button"
          onClick={() => router.back()}
          className="absolute z-10 w-10 h-10 flex justify-center items-center">
          <Image src={BtnBack} width={22} height={22} alt="" />
        </div>
        {/* <div className="absolute w-full text-center text-body1 font-bold">
          {trans(locale, lang, 'verifikasiDataDiri')}
        </div> */}
      </div>
    );
  }

  function renderForm() {
    return (
      <div>
        <Input
          type="number"
          inputMode="numeric"
          className={`w-full mb-4 ${
            dataKtp?.idCardNumber === null ? '!border-red-500' : ''
          }`}
          value={dataKtp?.idCardNumber}
          label={trans(locale, lang, 'nomorIndukKependudukan')}
          placeholder={trans(locale, lang, 'nomorIndukKependudukan')}
          handleOnChange={(val) => {
            setDataKtp({
              ...dataKtp,
              idCardNumber: val.replace(/[^0-9]/g, ''),
            });
          }}
          required
        />
        <Input
          className={`w-full mb-4 ${
            dataKtp?.name === null ? '!border-red-500' : ''
          }`}
          value={dataKtp?.name}
          label={trans(locale, lang, 'namaLengkapSesuai')}
          placeholder={trans(locale, lang, 'namaLengkapSesuai')}
          handleOnChange={(val) => {
            setDataKtp({
              ...dataKtp,
              name: val.replace(/[^a-zA-Z 0-9\w,.]/g, ''),
            });
          }}
          required
        />
        <div className="flex flex-col items-end xm:flex-row gap-2 sm:gap-6 mb-4">
          <Input
            required
            role="button"
            className={`w-full hover:border-gray-500 mb-1 xm:mb-0 ${
              dataKtp?.gender === null ? '!border-red-500' : ''
            }`}
            inputClassName={`!text-xs ${
              dataKtp?.gender === 'LAKI-LAKI' ? '' : '!text-gray-400'
            }`}
            value="LAKI-LAKI"
            label={trans(locale, lang, 'jenisKelamin')}
            suffixIcon={
              <Image
                src={dataKtp?.gender === 'LAKI-LAKI' ? MaleActive : Male}
                width={24}
                height={24}
                alt=""
              />
            }
            handleOnChange={() => {
              setDataKtp({
                ...dataKtp,
                gender: 'LAKI-LAKI',
              });
            }}
            active={dataKtp?.gender === 'LAKI-LAKI'}
          />
          <Input
            required
            role="button"
            className={`w-full hover:border-gray-500 ${
              dataKtp?.gender === null ? '!border-red-500' : ''
            }`}
            inputClassName={`!text-xs ${
              dataKtp?.gender === 'PEREMPUAN' ? '' : '!text-gray-300'
            }`}
            value="PEREMPUAN"
            suffixIcon={
              <Image
                src={dataKtp?.gender === 'PEREMPUAN' ? FemaleActive : Female}
                width={24}
                height={24}
                alt=""
              />
            }
            handleOnChange={() => {
              setDataKtp({
                ...dataKtp,
                gender: 'PEREMPUAN',
              });
            }}
            active={dataKtp?.gender === 'PEREMPUAN'}
          />
        </div>
        <Input
          className={`w-full mb-4 ${
            dataKtp?.address === null ? '!border-red-500' : ''
          }`}
          value={dataKtp?.address}
          label={trans(locale, lang, 'alamatSesuaiKTP')}
          placeholder={trans(locale, lang, 'alamatSesuaiKTP')}
          handleOnChange={(val) => {
            setDataKtp({
              ...dataKtp,
              address: val.replace(/[^a-zA-Z 0-9\w.'/,-]/g, ''),
            });
          }}
          required
        />
        <Input
          className={`w-full mb-4 ${
            dataKtp?.pob === null ? '!border-red-500' : ''
          }`}
          value={dataKtp?.pob}
          label={trans(locale, lang, 'tempatLahir')}
          placeholder={trans(locale, lang, 'tempatLahir')}
          handleOnChange={(val) => {
            setDataKtp({
              ...dataKtp,
              pob: val.replace(/[^a-zA-Z 0-9\w.'/,-]/g, ''),
            });
          }}
          required
        />

        <Input
          className={`w-full mb-4 ${
            dataKtp?.maritalStatus === null ? '!border-red-500' : ''
          }`}
          required
          type="date"
          label={trans(locale, lang, 'tanggalLahir')}
          placeholder={trans(locale, lang, 'tanggalLahir')}
          valueDate={dataKtp?.dob}
          lang={lang}
          suffixIcon={<Image src={Calendar} width={32} height={32} alt="" />}
          formatDateOutput="DD MMMM YYYY"
          maxDate={yesterdayDate}
          handleOnChange={(val) => {
            setDataKtp({
              ...dataKtp,
              dob: val,
            });
          }}
        />

        <Input
          className={`w-full mb-4 ${
            dataKtp?.maritalStatus === null ? '!border-red-500' : ''
          }`}
          inputClassName="cursor-pointer"
          value={dataKtp?.maritalStatus}
          label={trans(locale, lang, 'statusPernikahan')}
          placeholder={trans(locale, lang, 'statusPernikahan')}
          onFocus={() => {
            setIsModalMaritalActive(true);
          }}
          required
        />
        <Input
          className={`w-full mb-4 ${
            dataKtp?.province === null ? '!border-red-500' : ''
          }`}
          value={dataKtp?.province}
          label={trans(locale, lang, 'provinsi')}
          placeholder={trans(locale, lang, 'provinsi')}
          handleOnChange={(val) => {
            setDataKtp({
              ...dataKtp,
              province: val.replace(/[^a-zA-Z 0-9\w.'/,-]/g, ''),
            });
          }}
          required
        />
        <Input
          className={`w-full mb-4 ${
            dataKtp?.city === null ? '!border-red-500' : ''
          }`}
          value={dataKtp?.city}
          label={trans(locale, lang, 'KotaKabupaten')}
          placeholder={trans(locale, lang, 'KotaKabupaten')}
          handleOnChange={(val) => {
            setDataKtp({
              ...dataKtp,
              city: val.replace(/[^a-zA-Z 0-9\w.'/,-]/g, ''),
            });
          }}
          required
        />
        <Input
          className={`w-full mb-4 ${
            dataKtp?.district === null ? '!border-red-500' : ''
          }`}
          value={dataKtp?.district}
          label={trans(locale, lang, 'kecamatan')}
          placeholder={trans(locale, lang, 'kecamatan')}
          handleOnChange={(val) => {
            setDataKtp({
              ...dataKtp,
              district: val.replace(/[^a-zA-Z 0-9\w.'/,-]/g, ''),
            });
          }}
          required
        />
        <Input
          className={`w-full mb-4 ${
            dataKtp?.subDistrict === null ? '!border-red-500' : ''
          }`}
          value={dataKtp?.subDistrict}
          label={trans(locale, lang, 'kelurahanDesa')}
          placeholder={trans(locale, lang, 'kelurahanDesa')}
          handleOnChange={(val) => {
            setDataKtp({
              ...dataKtp,
              subDistrict: val.replace(/[^a-zA-Z 0-9\w,.]/g, ''),
            });
          }}
          required
        />
        {/* not used */}
        {/* <Input
          className="w-full mb-4"
          inputClassName="cursor-pointer"
          onFocus={() => {
            getPersonalDataProvince({ lang });
            setIsModalRegionActive(true);
          }}
          value={_.startCase(_.toLower(dataKtp?.province?.value))}
          label={trans(locale, lang, 'provinsi')}
          placeholder={trans(locale, lang, 'provinsi')}
          required
        />
        <Input
          className="w-full mb-4"
          inputClassName="cursor-pointer"
          onFocus={() => {
            getPersonalDataCity({
              lang,
              provinceCode: dataKtp?.province?.code,
            });
            setIsModalRegionActive(true);
          }}
          value={_.startCase(_.toLower(dataKtp?.city?.value))}
          label={trans(locale, lang, 'KotaKabupaten')}
          placeholder={trans(locale, lang, 'KotaKabupaten')}
          disabled={!dataKtp?.province?.code}
          required
        />
        <Input
          className="w-full mb-4"
          inputClassName="cursor-pointer"
          onFocus={() => {
            getPersonalDataDistrict({
              lang,
              districtCode: dataKtp?.city?.code,
            });
            setIsModalRegionActive(true);
          }}
          value={_.startCase(_.toLower(dataKtp?.district?.value))}
          label={trans(locale, lang, 'kecamatan')}
          placeholder={trans(locale, lang, 'kecamatan')}
          disabled={!dataKtp?.city?.code}
          required
        /> */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-2 sm:mb-0">
          <Input
            inputMode="numeric"
            className="w-full mb-1"
            value={dataKtp?.neighborhood}
            label={`${trans(locale, lang, 'rt')} (${trans(
              locale,
              lang,
              'opsional',
            )})`}
            placeholder={trans(locale, lang, 'rt')}
            handleOnChange={(val) => {
              setDataKtp({
                ...dataKtp,
                neighborhood: val.replace(/[^0-9]/g, ''),
              });
            }}
          />
          <Input
            inputMode="numeric"
            className="w-full mb-2"
            value={dataKtp?.hamlet}
            label={`${trans(locale, lang, 'rw')} (${trans(
              locale,
              lang,
              'opsional',
            )})`}
            placeholder={trans(locale, lang, 'rw')}
            handleOnChange={(val) => {
              setDataKtp({
                ...dataKtp,
                hamlet: val.replace(/[^0-9]/g, ''),
              });
            }}
          />
        </div>
      </div>
    );
  }

  function renderButton() {
    return (
      <Button
        type="linear-gradient"
        className="mt-2"
        disabled={
          !dataKtp?.address ||
          !dataKtp?.name ||
          !dataKtp?.idCardNumber ||
          !dataKtp?.gender ||
          !dataKtp?.dob ||
          !dataKtp?.pob ||
          !dataKtp?.province ||
          !dataKtp?.city ||
          !dataKtp?.district ||
          !dataKtp?.subDistrict ||
          !dataKtp?.maritalStatus ||
          !onConfirm ||
          isSubmit
        }
        onButtonClick={() => {
          setLoading(true);
          setIsSubmit(true);
          setKycVerifyDukcapil({
            idCardNumber: dataKtp?.idCardNumber,
            name: dataKtp?.name,
            dob: dataKtp?.dob ? dataKtp?.dob : null,
          });
        }}
        full>
        {trans(locale, lang, 'lanjut')}
      </Button>
    );
  }

  function renderModalRegion() {
    return (
      <Modal
        isOpen={isModalRegionActive}
        toggle={() => setIsModalRegionActive(false)}
        size="md"
        noPadding>
        <div className="relative w-full flex items-center text-start text-body1 font-bold mb-4">
          <div className="w-full flex justify-center items-center border-b-2 pb-4">
            <div
              role="button"
              className="absolute inset-0 px-2 sm:px-4"
              onClick={() => setIsModalRegionActive(false)}>
              <Image src={Close} width={32} height={32} alt="" />
            </div>
            <div className="mt-1">
              {_.capitalize(trans(locale, lang, `${activeModalRegion}`))}
            </div>
          </div>
        </div>
        <div className="px-4 mt-8 mb-8">
          <Input
            className="w-full mb-4"
            value={searchKey}
            placeholder={
              trans(locale, lang, `tulis`) +
              ' ' +
              trans(locale, lang, `${activeModalRegion}`)
            }
            prefixIcon={<Image src={Search2} width={24} height={24} alt="" />}
            handleOnChange={(val) => {
              setSearchKey(val);
            }}
          />
        </div>
        <div className="px-4">
          {dataRegionSorted?.map((menu, index) => (
            <div
              key={index}
              role="button"
              onClick={() => {
                if (activeModalRegion === 'province') {
                  setDataKtp({
                    ...dataKtp,
                    province: menu,
                    city: null,
                    district: null,
                  });
                  getPersonalDataCity({
                    lang,
                    provinceCode: menu?.code,
                  });
                }

                if (activeModalRegion === 'city') {
                  setDataKtp({
                    ...dataKtp,
                    city: menu,
                    district: null,
                  });
                  getPersonalDataDistrict({
                    lang,
                    districtCode: menu?.code,
                  });
                }

                if (activeModalRegion === 'district') {
                  setDataKtp({
                    ...dataKtp,
                    district: menu,
                  });

                  setIsModalRegionActive(false);
                }

                setSearchKey('');
                setDataRegion([]);
              }}
              className={clsx(
                'flex items-center gap-4 py-2',
                index ? 'border-b' : 'border-y',
              )}>
              <div>
                <Image src={Location} width={24} height={24} alt="" />
              </div>
              <div className="text-body2 text-[#202021] font-medium">
                {_.startCase(_.toLower(menu?.value))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    );
  }

  function renderModalMaritalStatus() {
    const maritalOpt = [
      { opt: trans(locale, lang, 'belumKawin') },
      { opt: trans(locale, lang, 'kawin') },
      { opt: trans(locale, lang, 'ceraiHidup') },
      { opt: trans(locale, lang, 'ceraiMati') },
    ];

    return (
      <Modal
        isOpen={isModalMaritalActive}
        toggle={() => {
          setIsModalMaritalActive(false);
        }}
        size="md"
        noPadding>
        <div className="relative w-full flex items-center text-start text-body1 font-bold mb-4">
          <div className="w-full flex justify-center items-center border-b-2 pb-4">
            <div
              role="button"
              className="absolute inset-0 px-2 sm:px-4"
              onClick={() => setIsModalMaritalActive(false)}>
              <Image src={Close} width={32} height={32} alt="" />
            </div>
            <div className="mt-1">
              {trans(locale, lang, 'statusPernikahanOptModal')}
            </div>
          </div>
        </div>
        <div className="px-4">
          {maritalOpt?.map((menu, index) => (
            <div
              key={index}
              role="button"
              onClick={() => {
                setDataKtp({
                  ...dataKtp,
                  maritalStatus: menu?.opt,
                });
                setIsModalMaritalActive(false);
              }}
              className={clsx(
                'flex items-center gap-4 py-2',
                index ? 'border-b' : 'border-y',
              )}>
              <div className="text-body2 text-[#202021] font-medium">
                {_.startCase(_.toLower(menu?.opt))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    );
  }

  const renderModalError = () => {
    return (
      <Modal isOpen={activeModalError} className="relative max-w-[375px]">
        {errorMessage === 'ID_CARD_ALREADY_REGISTERED' ? (
          <div className="relative p-3">
            <img
              alt=""
              src={ktp_failed_head}
              className="absolute w-48 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
            />
            <p className="pt-12 text-xl font-bold text-center my-3">
              {trans(locale, lang, 'modalTitle1')}
            </p>
            <p className="text-base font-medium text-center opacity-60">
              {trans(locale, lang, 'modalSubtitle1')}
            </p>

            <Button
              className="mt-5"
              bordered
              outline
              onButtonClick={() => setActiveModalError(false)}>
              {trans(locale, lang, 'kembali')}
            </Button>

            <Button
              className="mt-5"
              type="linear-gradient"
              shadow
              full
              onButtonClick={() => setActiveModalCallCenter(true)}>
              {trans(locale, lang, 'hubungiCustomerCare')}
            </Button>
          </div>
        ) : (
          <div className="relative p-3">
            <img
              src={biodata_failed_head}
              className="absolute w-48 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
            />
            <p className="pt-12 text-xl font-bold text-center my-3">
              {trans(locale, lang, 'modalTitle2')}
            </p>
            <p className="text-base font-medium text-center opacity-60">
              {trans(locale, lang, 'modalSubtitle2')}
            </p>

            <Button
              className="mt-5"
              type="linear-gradient"
              shadow
              full
              onButtonClick={() => setActiveModalError(false)}>
              {trans(locale, lang, 'cobaLagiKtpNotValid')}
            </Button>
          </div>
        )}
      </Modal>
    );
  };

  const renderContact = () => {
    const listContact = [
      {
        title: 'WhatsApp Lifia',
        icon: pChat,
        link: 'https://wa.me/628111372848?text=Hi Lifia, saya perlu bantuan',
      },
      { title: 'Call Center 1500176', icon: pCall, link: 'tel:1500176' },
      {
        title: 'customer_care@ifg-life.id',
        icon: pMail,
        link: 'mailto:customer_care@ifg-life.id?Subject=',
      },
    ];

    return (
      <div className="divide-y">
        {listContact.map((val, idx) => (
          <div key={idx} className="group flex flex-col">
            <a
              href={val.link}
              target="_blank"
              className={`w-full p-4 flex flex-row justify-between my-4 duration-500 text-gray-600 rounded-md`}>
              <div className="flex">
                <img src={val.icon} />
                <span className="font-black md:text-base pl-4 xs:text-sm mr-2">
                  {val.title}
                </span>
              </div>
            </a>
            <div></div>
          </div>
        ))}
      </div>
    );
  };

  const renderModalContact = () => {
    return (
      <Modal
        className="relative"
        isOpen={activeModalCallCenter}
        toggle={() => setActiveModalCallCenter(false)}>
        <div className="w-full h-full">
          <div className="relative pb-2">
            <Icon
              icon={close}
              size={20}
              onClick={() => setActiveModalCallCenter(false)}
              className="absolute top-0 cursor-pointer"
            />
            <p className="font-bold text-xl ml-2 text-center">
              {trans(locale, lang, 'pusatBantuan')}
            </p>
          </div>
          {renderContact()}
        </div>
      </Modal>
    );
  };

  const renderCheckAccurateData = () => {
    return (
      <div
        role="button"
        className="flex items-center flex-row-reverse pb-4 mt-6 mb-2"
        onClick={() => setConfirm(!onConfirm)}>
        <p className="basis-11/12 text-xs md:text-sm ml-2 s:ml-0">
          <span>{trans(locale, lang, 'sayaMenyatakanBahwa')}</span>
        </p>
        <div className="basis-1/12">
          {onConfirm ? (
            <Icon icon={checkCircle} size={24} className="text-red-500" />
          ) : (
            <Icon icon={checkCircle} size={24} className="text-gray-500" />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <HeaderPage
        title={trans(locale, lang, 'verifikasiDataDiri')}
        btnBack={false}
      />
      {/* <Container className="relative" fullScreen noBackground> */}
      {/* <div className="hidden sm:block absolute w-full h-40 border bg-gradient-to-r from-[#FE684D] to-[#ED1C24] rounded-b-[100px]" /> */}
      <div className="relative w-full flex justify-center -top-10 sm:px-4 sm:p-4 md:-top-16">
        <div className="z-10 w-full pb-5  bg-white md:shadow-md sm:rounded-3xl sm:max-w-2xl">
          {renderHeader()}
          <div className="py-4 px-4 sm:px-12">
            {renderForm()}
            {renderCheckAccurateData()}
            {renderButton()}
          </div>
        </div>
      </div>
      {/* </Container> */}
      {renderModalRegion()}
      {renderModalMaritalStatus()}
      {renderModalError()}
      {renderModalContact()}
    </>
  );
}
