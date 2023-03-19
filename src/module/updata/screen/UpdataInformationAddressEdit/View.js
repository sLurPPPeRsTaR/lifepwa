import _ from 'lodash';
import { useState, useCallback, useEffect } from 'react';
import { Input, Modal, Button } from '@cp-component';
import { trans } from '@cp-util/trans';
import { formatCapitalizeEachWord } from '@cp-util/format';
import { BadgeTick, Close, Location, Search2 } from '@cp-config/Svgs';
import clsx from 'classnames';
import Image from 'next/image';
import { closeRound, iosArrowDown } from 'react-icons-kit/ionicons';
import Icon from 'react-icons-kit';

import locale from './locale';

export default function Page({
  lang,
  getPersonalDataProvinceResponse,
  getPersonalDataCityResponse,
  getPersonalDataDistrictResponse,
  getPersonalDataSubDistrictResponse,
  setLoading,
  getPersonalDataProvince,
  getPersonalDataCity,
  getPersonalDataDistrict,
  getPersonalDataSubDistrict,
  address,
  setOtherInformation,
  otherInformation,
  addressType,
  setCurrentScreen,
}) {
  const [dataRegion, setDataRegion] = useState([]);
  const [dataRegionSorted, setDataRegionSorted] = useState([]);
  const [activeModalRegion, setActiveModalRegion] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [isModalRegionActive, setIsModalRegionActive] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  //   Modal
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  // Input
  const [namaJalan, setNamaJalan] = useState(address?.street || null);
  const [provinsi, setProvinsi] = useState(address?.province || null);
  const [kota, setKota] = useState(address?.city || null);
  const [kecamatan, setKecamatan] = useState(address?.district || null);
  const [kelurahan, setKelurahan] = useState(address?.subDistrict || null);
  const [rt, setRT] = useState(address?.rt || null);
  const [rw, setRW] = useState(address?.rw || null);
  const [kodePos, setKodePos] = useState(address?.postcode || null);

  // Message
  const [namaJalanMessage, setNamaJalanMessage] = useState(null);
  const [provinsiMessage, setProvinsiMessage] = useState(null);
  const [kotaMessage, setKotaMessage] = useState(null);
  const [kecamatanMessage, setKecamatanMessage] = useState(null);
  const [kelurahanMessage, setKelurahanMessage] = useState(null);
  const [rtMessage, setRTMessage] = useState(null);
  const [rwMessage, setRWMessage] = useState(null);
  const [kodePosMessage, setKodePosMessage] = useState(null);

  // Validation Flag
  // const [isAddressTitleValid, setIsAddressTitleValid] = useState(!addressTitle);
  const [isNamaJalanValid, setIsNamaJalanValid] = useState(!!namaJalan);
  const [isProvinsiValid, setIsProvinsiValid] = useState(!!provinsi);
  const [isKotaValid, setIsKotaValid] = useState(!!kota);
  const [isKecamatanValid, setIsKecamatanValid] = useState(!!kecamatan);
  const [isKelurahanValid, setIsKelurahanValid] = useState(!!kelurahan);
  const [isRTValid, setIsRTValid] = useState(true);
  const [isRWValid, setIsRWValid] = useState(true);
  const [isKodePosValid, setIsKodePosValid] = useState(true);

  function renderModalRegion() {
    return (
      <Modal
        isOpen={isModalRegionActive}
        toggle={() => setIsModalRegionActive(false)}
        size="md"
        className="mb-10 sm:mb-16"
        noPadding>
        <div className="relative w-full flex items-center text-start text-body1 font-bold mb-4">
          <div className="w-full flex justify-center items-center border-b-2 pb-4">
            <div
              role="button"
              className="absolute inset-0 px-2 sm:px-4"
              onClick={() => setIsModalRegionActive(false)}>
              <img src={Close} className="w-6 sm:w-8" />
            </div>
            <p className="mt-1 capitalize text-sm xm:text-base">
              {trans(locale, lang, `${activeModalRegion}`)}
            </p>
          </div>
        </div>
        <div className="px-4 my-4 xm:my-5 md:my-6">
          <Input
            className="w-full !h-10 md:!h-11"
            value={searchKey}
            placeholder={
              trans(locale, lang, `cari`) +
              ' ' +
              trans(locale, lang, `${activeModalRegion}`)
            }
            prefixIcon={<Image src={Search2} width={24} height={24} />}
            handleOnChange={setSearchKey}
          />
        </div>
        <div className="px-4 max-h-[40vh] overflow-y-scroll xm:max-h-[50vh] sm:mb-4">
          {dataRegionSorted?.map((menu, index) => (
            <div
              key={index}
              role="button"
              onClick={() => {
                if (activeModalRegion === 'provinsi') {
                  setProvinsi(menu);
                  setIsProvinsiValid(validateProvinsi(menu));
                  setKota('');
                  setIsKotaValid(validateKota(''));
                  setKecamatan('');
                  setIsKecamatanValid(validateKecamatan(''));
                  setKelurahan('');
                  setIsKelurahanValid(validateKelurahan(''));

                  getPersonalDataCity({
                    lang,
                    provinceCode: menu?.code,
                  });
                }

                if (activeModalRegion === 'kota') {
                  setKota(menu);
                  setIsKotaValid(validateKota(menu));
                  setKecamatan('');
                  setIsKecamatanValid(validateKecamatan(''));
                  setKelurahan('');
                  setIsKelurahanValid(validateKelurahan(''));

                  getPersonalDataDistrict({
                    lang,
                    cityCode: menu?.code,
                  });
                }

                if (activeModalRegion === 'kecamatan') {
                  setKecamatan(menu);
                  setIsKecamatanValid(validateKecamatan(menu));
                  setKelurahan('');
                  setIsKelurahanValid(validateKelurahan(''));

                  getPersonalDataSubDistrict({
                    lang,
                    districtCode: menu?.code,
                  });
                }

                if (activeModalRegion === 'kelurahan') {
                  setKelurahan(menu);
                  setIsKelurahanValid(validateKelurahan(menu));

                  setIsModalRegionActive(false);
                }

                setSearchKey('');
                setDataRegion([]);
              }}
              className={clsx(
                'flex items-center gap-2 py-2',
                index ? 'border-b' : 'border-y',
              )}>
              <div className="w-6 xm:w-8 h-full">
                <img src={Location} className="w-3/5 mx-auto" />
              </div>
              <div className="text-xs xm:text-body2 text-[#202021] font-medium">
                {_.startCase(_.toLower(menu?.value))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    );
  }

  // REGION
  useEffect(() => {
    if (getPersonalDataProvinceResponse?.data) {
      setDataRegion(getPersonalDataProvinceResponse?.data);
      setActiveModalRegion('provinsi');
    }
  }, [getPersonalDataProvinceResponse]);

  useEffect(() => {
    if (getPersonalDataCityResponse?.data) {
      setDataRegion(getPersonalDataCityResponse?.data);
      setActiveModalRegion('kota');
    }
  }, [getPersonalDataCityResponse]);

  useEffect(() => {
    if (getPersonalDataDistrictResponse?.data) {
      setDataRegion(getPersonalDataDistrictResponse?.data);
      setActiveModalRegion('kecamatan');
    }
  }, [getPersonalDataDistrictResponse]);

  useEffect(() => {
    if (getPersonalDataSubDistrictResponse?.data) {
      setDataRegion(getPersonalDataSubDistrictResponse?.data);
      setActiveModalRegion('kelurahan');
    }
  }, [getPersonalDataSubDistrictResponse]);

  useEffect(() => {
    setDataRegionSorted(dataRegion);
  }, [dataRegion]);

  useEffect(() => {
    setDataRegionSorted(
      dataRegion?.filter((e) =>
        e?.value?.toLowerCase()?.includes(searchKey?.toLowerCase()),
      ),
    );
  }, [dataRegion, searchKey]);

  const validateNamaJalan = useCallback(
    (text) => {
      const regexNamaJalan = /^[a-zA-Z0-9 '.]*$/;
      if (text.length < 1) {
        setNamaJalanMessage({
          error: trans(locale, lang, 'namaJalanRequired'),
        });
        return false;
      }
      if (!regexNamaJalan.test(text)) {
        setNamaJalanMessage({
          error: trans(locale, lang, 'namaJalanInvalid'),
        });
        return false;
      }
      if (text.length > 500) {
        setNamaJalanMessage({
          error: trans(locale, lang, 'namaJalanMaxLength'),
        });
        return false;
      }
      setNamaJalanMessage(null);
      return true;
    },
    [lang],
  );

  const validateProvinsi = useCallback(
    (data) => {
      if (!data) {
        setProvinsiMessage({
          error: trans(locale, lang, 'provinsiRequired'),
        });
        return false;
      }
      setProvinsiMessage(null);
      return true;
    },
    [lang],
  );

  const validateKota = useCallback(
    (data) => {
      if (!data) {
        setKotaMessage({
          error: trans(locale, lang, 'kotaRequired'),
        });
        return false;
      }
      setKotaMessage(null);
      return true;
    },
    [lang],
  );
  const validateKecamatan = useCallback(
    (data) => {
      if (!data) {
        setKecamatanMessage({
          error: trans(locale, lang, 'kecamatanRequired'),
        });
        return false;
      }
      setKecamatanMessage(null);
      return true;
    },
    [lang],
  );
  const validateKelurahan = useCallback(
    (data) => {
      if (!data) {
        setKelurahanMessage({
          error: trans(locale, lang, 'kelurahanRequired'),
        });
        return false;
      }
      setKelurahanMessage(null);
      return true;
    },
    [lang],
  );

  const validateRT = useCallback(
    (text) => {
      if (text.length !== 0 && text.length > 3) {
        setRTMessage({
          error: trans(locale, lang, 'rtMaxLength'),
        });
        return false;
      }
      setRTMessage(null);
      return true;
    },
    [lang],
  );
  const validateRW = useCallback(
    (text) => {
      if (text.length !== 0 && text.length > 3) {
        setRWMessage({
          error: trans(locale, lang, 'rwMaxLength'),
        });
        return false;
      }
      setRWMessage(null);
      return true;
    },
    [lang],
  );
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

  function renderFormEdit() {
    const isFormValid = () => {
      return (
        isNamaJalanValid &&
        isProvinsiValid &&
        isKotaValid &&
        isKecamatanValid &&
        isKelurahanValid &&
        isRTValid &&
        isRWValid &&
        isKodePosValid
      );
    };

    return (
      <div className="pt-5">
        <div className="w-full md:mb-4 lg:mb-6 flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-[49%] mb-4 md:mb-0">
            <Input
              required
              value={namaJalan}
              handleOnChange={(text) => {
                const txt = text.replace(/\s{2,}/, ' ');
                setNamaJalan(txt);
                setIsNamaJalanValid(validateNamaJalan(txt));
              }}
              message={namaJalanMessage}
              className="w-full"
              label={trans(locale, lang, 'namaJalan')}
              placeholder={trans(locale, lang, 'masukkanNamaJalan')}
            />
          </div>
          <div className="w-full md:w-[49%] mb-4 md:mb-0">
            <Input
              required
              inputClassName="cursor-pointer"
              value={formatCapitalizeEachWord(provinsi?.value || '')}
              onFocus={() => {
                getPersonalDataProvince({ lang });
                setIsModalRegionActive(true);
              }}
              className="w-full"
              suffixIcon={
                <Icon icon={iosArrowDown} size={20} className="text-gray-400" />
              }
              label={trans(locale, lang, 'provinsi')}
              placeholder={trans(locale, lang, 'pilihProvinsi')}
              message={provinsiMessage}
            />
          </div>
        </div>

        <div className="w-full md:mb-4 lg:mb-6 flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-[49%] mb-4 md:mb-0">
            <Input
              required
              value={formatCapitalizeEachWord(kota?.value || '')}
              inputClassName="cursor-pointer"
              onFocus={() => {
                getPersonalDataCity({
                  lang,
                  provinceCode: provinsi?.code,
                });
                setIsModalRegionActive(true);
              }}
              className="w-full"
              suffixIcon={
                <Icon icon={iosArrowDown} size={20} className="text-gray-400" />
              }
              label={trans(locale, lang, 'kota')}
              placeholder={trans(locale, lang, 'pilihKota')}
              disabled={!provinsi?.code}
              message={kotaMessage}
            />
          </div>
          <div className="w-full md:w-[49%] mb-4 md:mb-0">
            <Input
              required
              value={formatCapitalizeEachWord(kecamatan?.value || '')}
              inputClassName="cursor-pointer"
              onFocus={() => {
                getPersonalDataDistrict({
                  lang,
                  cityCode: kota?.code,
                });
                setIsModalRegionActive(true);
              }}
              className="w-full"
              suffixIcon={
                <Icon icon={iosArrowDown} size={20} className="text-gray-400" />
              }
              label={trans(locale, lang, 'kecamatan')}
              placeholder={trans(locale, lang, 'pilihKecamatan')}
              disabled={!kota?.code}
              message={kecamatanMessage}
            />
          </div>
        </div>

        <div className="w-full md:mb-4 lg:mb-6 flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-[49%] mb-4 md:mb-0">
            <Input
              required
              value={formatCapitalizeEachWord(kelurahan?.value || '')}
              inputClassName="cursor-pointer"
              onFocus={() => {
                getPersonalDataSubDistrict({
                  lang,
                  districtCode: kecamatan?.code,
                });
                setIsModalRegionActive(true);
              }}
              className="w-full"
              suffixIcon={
                <Icon icon={iosArrowDown} size={20} className="text-gray-400" />
              }
              label={trans(locale, lang, 'kelurahan')}
              placeholder={trans(locale, lang, 'pilihKelurahan')}
              disabled={!kecamatan?.code}
              message={kelurahanMessage}
            />
          </div>
          <div className="w-full md:w-[49%] mb-4 md:mb-0">
            <Input
              // required
              value={kodePos}
              inputMode="date"
              maxLength={5}
              handleOnChange={(text) => {
                setKodePos(text.replace(/[^0-9]/g, ''));
                setIsKodePosValid(validateKodePos(text));
              }}
              message={kodePosMessage}
              className="w-full"
              label={trans(locale, lang, 'kodePos')}
              placeholder={trans(locale, lang, 'masukkanKodePos')}
            />
          </div>
        </div>

        <div className="w-full md:mb-4 lg:mb-6 flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-[49%] mb-4 md:mb-0">
            <Input
              value={rt}
              inputMode="numeric"
              handleOnChange={(text) => {
                setRT(text.replace(/[^0-9]/g, ''));
                setIsRTValid(validateRT(text));
              }}
              maxLength={3}
              className="w-full"
              label={
                trans(locale, lang, 'rt') +
                ' ' +
                trans(locale, lang, 'opsional')
              }
              placeholder="RT"
              message={rtMessage}
            />
          </div>
          <div className="w-full md:w-[49%] mb-4 md:mb-0">
            <Input
              value={rw}
              inputMode="numeric"
              handleOnChange={(text) => {
                setRW(text.replace(/[^0-9]/g, ''));
                setIsRWValid(validateRW(text));
              }}
              maxLength={3}
              className="w-full"
              label={
                trans(locale, lang, 'rw') +
                ' ' +
                trans(locale, lang, 'opsional')
              }
              placeholder="RW"
              message={rwMessage}
            />
          </div>
        </div>

        <Button
          className="mb-5 mt-16 text-sm lg:text-base"
          type="linear-gradient"
          shadow
          full
          disabled={!isFormValid()}
          onButtonClick={() => {
            setOtherInformation({
              ...otherInformation,
              data: {
                ...otherInformation.data,
                address: {
                  ...otherInformation.data.address,
                  [addressType]: {
                    street: namaJalan,
                    province: provinsi?.value,
                    city: kota?.value,
                    district: kecamatan?.value,
                    subDistrict: kelurahan?.value,
                    neighborhood: rt,
                    hamlet: rw,
                    postalcode: kodePos,
                  },
                },
              },
            });
            setTimeout(() => {
              setIsSuccessModal(true);
            }, 200);
          }}>
          {trans(locale, lang, 'simpanAlamat')}
        </Button>
      </div>
    );
  }

  const renderSuccessModal = () => {
    return (
      <Modal isOpen={isSuccessModal} className="max-w-[400px]">
        <div className="flex flex-col">
          <Icon
            icon={closeRound}
            size={24}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={() => {
              setIsSuccessModal(false);
            }}
          />
          <img src={BadgeTick} className="w-40 mx-auto" />
          <text className="px-3 py-3 text-lg font-bold text-center">
            {trans(locale, lang, 'berhasilDiubah')}
          </text>
          <Button
            className="my-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setIsSuccessModal(false);
              setCurrentScreen('');
            }}>
            {trans(locale, lang, 'ok')}
          </Button>
        </div>
      </Modal>
    );
  };
  return (
    <>
      {renderFormEdit()}
      {renderModalRegion()}
      {renderSuccessModal()}
    </>
  );
}
