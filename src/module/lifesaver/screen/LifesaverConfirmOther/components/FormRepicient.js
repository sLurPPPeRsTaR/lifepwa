import _ from 'lodash';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Input, InputSelect, Modal } from '@cp-component';
import { codeLifesaver } from '@cp-util/constant';
import {
  regexNameBachelorDegree,
  regexNumeric,
  regexMobile,
  age,
} from '@cp-util/common';
import { IconCamera } from '@cp-config/Images';
import { Close, LifesaverInfo } from '@cp-config/Svgs';
import { checkEkycApi } from '@cp-module/payments/paymentsApi';
import ModalUploadDoc from '@cp-module/claimpolis/components/ModalUploadDoc';
import { getIDCardDataOCRApi } from '@cp-module/lifesaver/lifesaverApi';
import { setBuyForOthersState } from '@cp-module/persist/persistAction';
export default function FormRecipient({
  relationList,
  value,
  index,
  onDelete,
  onSave,
  trans,
  locale,
  lang,
  buyForOthersFormState,
  product,
}) {
  const [tooltipsNIK, setTooltipsNIK] = useState(false);
  const [tooltipsRelation, setTooltipsRelation] = useState(false);
  const [formData, setFormData] = useState({ ...value });

  useEffect(() => {
    setFormData(value);
  }, [value]);

  // handle nik validation
  const [isValidNik, setIsValidNik] = useState(true);
  const [nikMessage, setNikMessage] = useState(null);

  const validateNik = useCallback((txt) => {
    if (txt?.length === 0) {
      setNikMessage({ error: ' ' });
      return false;
    }
    if (txt?.length !== 16 || regexNumeric.test(txt)) {
      setNikMessage({
        error: trans(locale, lang, 'nikTidakSesuai'),
      });
      return false;
    }

    setNikMessage(null);
    return true;
  });

  // handle name validation
  const [isValidName, setValidName] = useState(true);
  const [nameMessage, setNameMessage] = useState(null);
  const validateName = useCallback((txt) => {
    if (!regexNameBachelorDegree.test(txt) && txt?.length !== 0) {
      setNameMessage({ warning: trans(locale, lang, 'nameCheck'), });
      return false;
    }
    if (txt?.length > 100) {
      setNameMessage({
        error: trans(locale, lang, 'nameCheck'),
      });
      return false;
    }
    setNameMessage(null);
    return true;
  }, []);

  // handle dob validation
  const [dobMessage, setDobMessage] = useState(null);

  // handle phone number validation
  const [phoneMessage, setPhoneMessage] = useState(null);
  const validatePhone = useCallback((txt) => {
    if (!regexMobile.test(txt) && txt?.length !== 0) {
      setPhoneMessage({
        error: trans(locale, lang, 'numberInvalid'),
      });
      return false;
    }
    if (txt?.length > 13) {
      setPhoneMessage({
        error: trans(locale, lang, 'numberInvalid'),
      });
      return false;
    }
    setPhoneMessage(null);
    return true;
  });

  function cardForm() {
    return (
      <div className="text-slate-500 flex flex-col gap-2 text-[15px]">
        <div className="flex justify-between">
          <span className="w-[60%]">{trans(locale, lang, 'nik')}</span>
          <span className="w-[50%]">{formData?.nik || value?.nik}</span>
        </div>
        <div className="flex justify-between">
          <span className="w-[60%]">{trans(locale, lang, 'fullNameText')}</span>
          <span className="w-[50%]">{formData?.name || value?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="w-[60%]">{trans(locale, lang, 'relationText')}</span>
          <span className="w-[50%]">
            {formData?.relation || value?.relation}
          </span>
        </div>
        <div className="flex justify-end">
          <button
            className="flex gap-2"
            onClick={() => {
              setFormData({
                ...formData,
                isEdit: true,
              });
            }}>
            <div className="text-body2 text-primary-light-primary90 font-semibold">
              {trans(locale, lang, 'ubah')}
            </div>
          </button>
        </div>
      </div>
    );
  }

  const [showModalOCR, setShowModalOCR] = useState(false);
  const uploadFile = useRef();

  const [showModalTakePhoto, setShowModalTakePhoto] = useState(false);
  function renderModalTakePhoto() {
    if (!showModalTakePhoto) return null;

    const videoConstraints = {
      facingMode: 'environment',
    };

    return (
      <Modal
        isOpen={true}
        toggle={() => {
          setShowModalTakePhoto(false);
          setShowModalOCR(false);
        }}>
        <div className="mb-2">
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}>
            {({ getScreenshot }) => (
              <Button
                type="linear-gradient"
                className="mt-6"
                onButtonClick={async () => {
                  const imageSrc = getScreenshot();
                  const blob = await fetch(imageSrc).then((res) => res.blob());
                  setLoading(true);
                  getIDCardDataOCR(blob, null, blob.type);
                }}
                full>
                Capture
              </Button>
            )}
          </Webcam>
        </div>
      </Modal>
    );
  }
  const [errorMessage, setErrorMessage] = useState(value.errorMessage);
  const validate = (value) => {
    let error = '';
    let uniqueNik = buyForOthersFormState.find(
      (data, idx) =>
        data?.planCode === product && data.nik === value.nik && index !== idx,
    );
    if (uniqueNik) {
      setErrorMessage('Nik sudah terdaftar');
      error = 'Nik sudah terdaftar';
    }
    return error;
  };

  const formEdit = () => (
    <div className="flex flex-col">
      <button
        className="self-end"
        onClick={() => {
          setFormData({
            ...formData,
            isEdit: false,
          });
        }}>
        <Image src={Close} width={24} height={24} alt="" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0">
        <div>
          <Input
            suffixIcon={
              <button onClick={setClose}>
                <Image src={IconCamera} alt="" width={20} height={20} />
              </button>
            }
            className="mb-5"
            value={formData?.nik}
            placeholder={`${trans(locale, lang, 'contoh')}: 1234567890123456`}
            message={nikMessage}
            label="NIK"
            required
            additionalLabel={
              <div
                role="button"
                onClick={() => {
                  setTooltipsNIK(!tooltipsNIK);
                }}
                className="relative w-3 md:w-4 aspect-square -mt-1">
                <Image layout="fill" src={LifesaverInfo} alt="" />
                {tooltipsNIK && (
                  <div className="block z-50 absolute bg-white left-2 top-2 w-[375px] h-auto border shadow-lg rounded-3xl rounded-tl-none">
                    <div
                      role="button"
                      onClick={() => {
                        setTooltipsNIK(false);
                      }}
                      className="absolute top-1 left-1">
                      <Image src={Close} alt="" width={24} height={24} />
                    </div>
                    <div className="text-center text-body1 font-semibold py-3 border-b">
                      {trans(locale, lang, 'infoDataNikText')}
                    </div>
                    <div className="text-center text-body2 px-4 py-3">
                      {trans(locale, lang, 'infoDataText')}
                    </div>
                  </div>
                )}
              </div>
            }
            handleOnChange={(val) => {
              setIsValidNik(validateNik(val));
              setFormData({
                ...formData,
                nik: val,
              });
            }}
          />
        </div>
        <div>
          <Input
            className="mb-5"
            value={formData?.name}
            placeholder={`${trans(locale, lang, 'contoh')}: John Doe`}
            message={nameMessage}
            label={trans(locale, lang, 'fullNameText')}
            required
            handleOnChange={(val) => {
              setValidName(validateName(val));
              setFormData({
                ...formData,
                name: val,
              });
            }}
          />
        </div>
        <div>
          <Input
            className="mb-5"
            value={formData?.birthPlace}
            placeholder={`${trans(locale, lang, 'contoh')}: Jakarta`}
            label={trans(locale, lang, 'birthPlaceText')}
            required
            handleOnChange={(val) => {
              setFormData({
                ...formData,
                birthPlace: val,
              });
            }}
          />
        </div>
        <div>
          <Input
            className="mb-5"
            type="date"
            valueDate={formData?.birthDate}
            maxDate={new Date().fp_incr(-6205)}
            placeholder="DD - MM - YYYY"
            label={trans(locale, lang, 'birthDateText')}
            message={dobMessage}
            required
            handleOnChange={(val) => {
              setFormData({
                ...formData,
                birthDate: val,
              });
            }}
          />
        </div>
        <div>
          <Input
            className="mb-5"
            value={formData?.address}
            placeholder={`${trans(
              locale,
              lang,
              'contoh',
            )}: jl. Jalan Ke Desa Penari`}
            label={trans(locale, lang, 'addressKTP')}
            required
            handleOnChange={(val) => {
              setFormData({
                ...formData,
                address: val,
              });
            }}
          />
        </div>
        <div>
          <Input
            className="mb-5"
            value={formData?.phoneNo}
            message={phoneMessage}
            placeholder={`${trans(locale, lang, 'contoh')}: 08112467391`}
            label={trans(locale, lang, 'phoneText')}
            handleOnChange={(val) => {
              validatePhone(val);
              setFormData({
                ...formData,
                phoneNo: val,
              });
            }}
          />
        </div>
        <div>
          <InputSelect
            className="mb-5"
            selectedOption={formData?.relation}
            placeholder={trans(locale, lang, 'selectRelation')}
            label={trans(locale, lang, 'relationText')}
            required
            additionalLabel={
              <div
                role="button"
                onClick={() => {
                  setTooltipsRelation(!tooltipsRelation);
                }}
                className="relative w-3 md:w-4 aspect-square -mt-1">
                <Image layout="fill" src={LifesaverInfo} alt="" />
                {tooltipsRelation && (
                  <div className="block z-50 z-50 absolute bg-white left-2 top-2 w-[375px] h-auto border shadow-lg rounded-3xl rounded-tl-none">
                    <div
                      role="button"
                      onClick={() => {
                        setTooltipsRelation(false);
                      }}
                      className="absolute top-1 left-1">
                      <Image src={Close} alt="" width={24} height={24} />
                    </div>
                    <div className="text-center text-body1 font-semibold py-3 border-b">
                      {trans(locale, lang, 'infoStatusRelasi')}
                    </div>
                    <div className="text-center text-body2 px-4 py-3">
                      {trans(locale, lang, 'infoStatusRelasiDialog')}
                    </div>
                  </div>
                )}
              </div>
            }
            options={relationList?.map((data) => ({
              label: data.label,
              value: data.code,
            }))}
            handleOnChange={(val) => {
              setFormData({
                ...formData,
                relation: val?.value,
              });
            }}
          />
        </div>
      </div>
      <div className="flex justify-end gap-x-6 md:justify-start">
        <Button
          outline
          className="text-sm border-red-300 w-max px-6"
          onButtonClick={() => {
            onDelete(index);
          }}>
          {trans(locale, lang, 'deleteText')}
        </Button>
        <Button
          disabled={
            !formData?.nik ||
            !formData?.name ||
            !formData?.birthDate ||
            !formData?.birthPlace ||
            !formData?.address ||
            !formData?.relation ||
            !isValidName ||
            !isValidNik
          }
          onButtonClick={() => {
            setFormData({ ...formData, isEdit: false });

            const payload = {
              idCardNumber: formData?.nik,
              name: formData?.name,
              dob: formData?.birthDate,
              pob: formData?.birthPlace,
              address: formData?.address,
            };
            setErrorMessage('');
            checkEkycApi(payload)
              .then((response) => {
                onSave(
                  {
                    ...formData,
                    isEdit: false,
                    errorMessage: validate(formData) || '',
                  },
                  index,
                );
              })
              .catch((error) => {
                console.log(error.response.data);
                setErrorMessage('invalidNik');
                onSave(
                  {
                    ...formData,
                    isEdit: false,
                    errorMessage: 'invalidNik',
                  },
                  index,
                );
              });
          }}
          className="w-max px-6"
          type="linear-gradient">
          {trans(locale, lang, 'saveText')}
        </Button>
      </div>
    </div>
  );
  const [isModal, setModal] = useState({
    isModalCameraActive: false,
    isModalUploadActive: false,
    isSuccess: false,
  });
  const setCamera = () => {
    setModal((prevState) => {
      return {
        ...prevState,
        isModalCameraActive: !isModal?.isModalCameraActive,
      };
    });
  };
  const setClose = () => {
    setModal((prevState) => {
      return {
        ...prevState,
        isModalUploadActive: !prevState.isModalUploadActive,
      };
    });
  };

  return (
    <div>
      <ModalUploadDoc
        isOpen={isModal?.isModalUploadActive}
        isCameraOpen={isModal?.isModalCameraActive}
        setClose={setClose}
        setCamera={setCamera}
        onTakePhoto={(event) => {
          getIDCardDataOCRApi({ file: event.getScreenshot() })
            .then((response) => {
              const { idCardNumber, pob, dob } = response.data.data.user;
              setFormData({
                nik: idCardNumber,
                birthDate: dob,
                birthPlace: pob,
                ...response.data.data.user,
                errorMessage: '',
                isEdit: true,
              });
              setClose();
            })
            .catch((error) => {
              //close 
              setClose();
            });
        }}
        accept="image/jpeg, image/jpg"
        onFileChange={(event) => {
          const file = event.target.files[0];
          getIDCardDataOCRApi({ file: file })
            .then((response) => {
              const { idCardNumber, pob, dob } = response.data.data.user;
              setFormData({
                nik: idCardNumber,
                birthDate: dob,
                birthPlace: pob,
                ...response.data.data.user,
                errorMessage: '',
                isEdit: true,
              });
              setClose();
            })
            .catch((error) => {
              //close
              setClose();
            });
        }}
      />
      <div className="mb-6">
        <div className="text-body2 text-[#232425]  font-semibold mb-4">
          {trans(locale, lang, 'dataPenerima')}
        </div>
        <div
          className={`bg-white rounded-2xl ${errorMessage ? 'border border-2 border-red-600' : ''
            }  p-3 md:p-4 border shadow-lg`}>
          {formData?.isEdit ? formEdit() : cardForm()}
        </div>
        {errorMessage && (
          <div className="text-red-600 p-2 ">
            <span>
              {locale[lang]?.[errorMessage]
                ? trans(locale, lang, errorMessage)
                : trans(locale, lang, 'ERROR_DEFAULT')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
