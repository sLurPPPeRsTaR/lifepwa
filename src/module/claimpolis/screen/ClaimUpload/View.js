import { Button, Container, Modal } from '@cp-component';
import {
  Dokumen,
  Folder,
  GreenCircleTick,
  PapanKertas,
} from '@cp-config/Images';
import {
  GET_DOCUMENT_MANDATORY_FAILED,
  GET_DOCUMENT_MANDATORY_SUCCESS,
  SET_SUBMIT_DOCUMENT_FAILED,
  SET_SUBMIT_DOCUMENT_SUCCESS,
  SET_UPLOAD_DOCUMENT_FAILED,
  SET_UPLOAD_DOCUMENT_SUCCESS,
} from '@cp-module/claimpolis/claimpolisConstant';
import { Header, ProgressSubmission } from '@cp-module/claimpolis/components';
import clsx from 'classnames';
import Label from '@cp-module/claimpolis/components/Label';
import ModalUploadDoc from '@cp-module/claimpolis/components/ModalUploadDoc';
import UploadList from '@cp-module/claimpolis/components/UploadList';
import { convertToBase64 } from '@cp-util/common';
import { RESPONSE_STATE } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from 'react-icons-kit';
import { checkCircle } from 'react-icons-kit/fa';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { chevronDown } from 'react-icons-kit/feather';
import locale from './locale';
import { GreenTick } from '@cp-config/Svgs';

export default function Page(props) {
  const {
    lang,
    setLoading,
    claimAction,
    documentUpload,
    setUploadDoc,
    setUploadDocument,
    setUploadDocumentFailed,
    setSubmitDocument,
    userData,
    setSubmitDocumentFailed,
    setUploadDocumentClear,
    setUploadDocClear,
    setSubmitDocumentClear,
    payloadClaimPolis,
    getDocumentMandatory,
    getDocumentMandatoryClear,
    getDocumentMandatoryResponse,
    getDocumentMandatoryFailed,
    isComingFromScreen,
    setIsComingFromScreen,
  } = props;
  const [tempObj, setTempObj] = useState({});
  const [isModal, setModal] = useState({
    isModalCameraActive: false,
    isModalUploadActive: false,
    isSuccess: false,
  });
  const [state, setState] = useState({
    imageFile: null,
    isShowPreview: false,
    isAgree: false,
    isChevronActive: false,
    fileType: null,
  });
  const router = useRouter();

  const sampleParams = {
    benefitValue: 'Kecelakaan Cedera',
    claimTypeValue: 'Cacat Tetap Akibat Kecelakaan',
    insuredIdCard: '321609098027',
    insuredName: 'John Doe',
    dob: '01/01/1990',
    policyNumber: '800123000004054',
    productName: 'LifeSAVER',
    hospitalName: 'Siloam Hospital, Kota Tangerang, Indonesia',
    accidentDate: '2023-03-07 09:00:00',
    treatmentDate: '2023-03-08 10:00:00',
    bankName: 'BCA',
    bankAccoutName: 'Hylie Philips',
    bankAccountNumber: '2881743889',
    benefitTypeValue: 'DEATH',
    providerId: '60',
    cardNumber: '3173080701880001',
    productCode: '001',
    planCode: '02',
    benefitType: 'DE',
    causeCode: 'DA02',
  };

  useEffect(() => {
    if (isComingFromScreen?.isFromDocument) {
      setLoading(true);
      getDocumentMandatory({
        benefitType: payloadClaimPolis?.benefitType,
        productCode: payloadClaimPolis?.productCode,
      });
    }
  }, [
    getDocumentMandatory,
    isComingFromScreen?.isFromDocument,
    payloadClaimPolis?.benefitType,
    payloadClaimPolis?.productCode,
    setLoading,
  ]);

  const progressDataMap = [
    {
      type: 'point',
      src: PapanKertas,
      title: 'Pilih Polis',
      isActive: true,
    },
    {
      type: 'point',
      src: Dokumen,
      title: 'Data Klaim',
      isActive: true,
    },
    {
      type: 'point',
      src: Folder,
      title: 'Upload Dokumen',
      isActive: true,
    },
  ];

  let newResult = [];
  const bulkDocumentUpload = useMemo(() => {
    documentUpload?.forEach((item) => {
      return item?.data?.forEach((data) => {
        newResult.push({
          documentCode: data?.documentCode,
          documentKey: data?.documentKey,
        });
      });
    });
    return newResult;
  }, [documentUpload, newResult]);

  let newResult2 = [];
  const isDocValid = useMemo(() => {
    documentUpload?.forEach((item) => {
      return item?.data?.forEach((data) => {
        newResult2.push(data?.documentKey);
      });
    });
    return newResult2.includes(null);
  }, [documentUpload, newResult2]);

  const claimActionResult = useCallback(
    async (act) => {
      if (act === SET_UPLOAD_DOCUMENT_SUCCESS) {
        setLoading(false);
      }
      if (act === SET_UPLOAD_DOCUMENT_FAILED) {
        setLoading(false);
        if (
          setUploadDocumentFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          setUploadDocumentClear();
          console.log(setUploadDocumentFailed?.message);
        }
      }
      if (act === SET_SUBMIT_DOCUMENT_SUCCESS) {
        setLoading(false);
        setModal((prevState) => {
          return { ...prevState, isSuccess: true };
        });
        setTimeout(() => {
          setModal((prevState) => {
            return { ...prevState, isSuccess: false };
          });
          setUploadDocClear();
          setUploadDocumentClear();
          window.history.go('-' + window.history.state.idx);
        }, 3000);
      }
      if (act === SET_SUBMIT_DOCUMENT_FAILED) {
        setLoading(false);
        if (
          setSubmitDocumentFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          setSubmitDocumentClear();
          console.log(setSubmitDocumentFailed?.message);
        }
      }
      if (act === GET_DOCUMENT_MANDATORY_SUCCESS) {
        setLoading(false);
        if (_.isEmpty(documentUpload)) {
          const newgetDocumentMandatoryResponse =
            getDocumentMandatoryResponse?.data?.reduce((a, b) => {
              a[b.documentCategory] = a[b.documentCategory] || [];
              a[b.documentCategory].push({
                ...b,
                fileType: null,
                photoBase64: null,
                photo: null,
                documentKey: null,
                size: 0,
              });
              return a;
            }, Object.create(null));

          const result = Object?.entries(newgetDocumentMandatoryResponse)?.map(
            (item) => {
              return { title: item[0], data: item[1], chevronFlag: true };
            },
          );

          setUploadDoc(result);
        }
        getDocumentMandatoryClear();
        setIsComingFromScreen({});
      }
      if (act === GET_DOCUMENT_MANDATORY_FAILED) {
        if (
          getDocumentMandatoryFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          console.log(getDocumentMandatoryFailed?.message);
        }
      }
    },
    [
      documentUpload,
      getDocumentMandatoryClear,
      getDocumentMandatoryFailed?.message,
      getDocumentMandatoryResponse?.data,
      setIsComingFromScreen,
      setLoading,
      setSubmitDocumentClear,
      setSubmitDocumentFailed?.message,
      setUploadDoc,
      setUploadDocClear,
      setUploadDocumentClear,
      setUploadDocumentFailed?.message,
    ],
  );

  useEffect(() => {
    claimActionResult(claimAction);
  }, [claimAction, claimActionResult]);

  function renderHeader() {
    return (
      <div className="my-3 px-[5%]">
        <ProgressSubmission endPoints={progressDataMap} />
      </div>
    );
  }

  function renderClaimReq() {
    return (
      <div className="pb-8 px-[5%]">
        <p className="text-base font-semibold leading-5 tracking-wider mb-5 ">
          {trans(locale, lang, 'ringkasanPengajuanKlaim')}
        </p>
        <div className="border rounded-lg bg-white px-4 py-6">
          <div className="pb-5">
            <p className="text-base font-semibold leading-6 tracking-wider pb-5">
              {trans(locale, lang, 'jenisKlaim')}
            </p>
            <Label
              title={trans(locale, lang, 'benefit')}
              description={'Meninggal Dunia'}
            />
            <Label
              title={trans(locale, lang, 'tipeKlaim')}
              description={payloadClaimPolis?.typeClaim?.label}
            />
          </div>
          {state?.isChevronActive && (
            <>
              <p className="border-b" />

              <div className="py-5">
                <p className="text-base font-semibold leading-6 tracking-wider pb-5">
                  {trans(locale, lang, 'detail')}
                </p>
                <Label
                  title={trans(locale, lang, 'nikTertanggung')}
                  description={payloadClaimPolis?.nik}
                />
                <Label
                  title={trans(locale, lang, 'namaTertanggung')}
                  description={payloadClaimPolis?.insuredName}
                />
                <Label
                  title={trans(locale, lang, 'tanggalLahir')}
                  description={payloadClaimPolis?.dob}
                />
                <Label
                  title={trans(locale, lang, 'nomorPolis')}
                  description={payloadClaimPolis?.policyNumber}
                />
                <Label
                  title={trans(locale, lang, 'namaProduk')}
                  description={payloadClaimPolis?.productName}
                />
                <Label
                  title={trans(locale, lang, 'rumahSakit')}
                  description={payloadClaimPolis?.hospital?.label}
                />
                <Label
                  title={trans(locale, lang, 'tanggalPertamaMasuk')}
                  description={payloadClaimPolis?.dateOfHospitalized}
                />
                <Label
                  title={trans(locale, lang, 'tanggalMeninggalDunia')}
                  description={payloadClaimPolis?.dateAccident}
                />
              </div>

              <p className="border-b" />

              <div className="pt-5">
                <p className="text-base font-semibold leading-6 tracking-wider pb-5">
                  {trans(locale, lang, 'nomorRekeningPenerima')}
                </p>
                <Label
                  title={trans(locale, lang, 'namaBank')}
                  description={payloadClaimPolis?.bank?.label}
                />
                <Label
                  title={trans(locale, lang, 'namaPemilikRekening')}
                  description={payloadClaimPolis?.nameOfOwnerAcount}
                />
                <Label
                  title={trans(locale, lang, 'nomorRekening')}
                  description={payloadClaimPolis?.rekNumber}
                />
              </div>
            </>
          )}
          <div
            role="button"
            onClick={() => {
              setState((prevState) => {
                return {
                  ...prevState,
                  isChevronActive: !state?.isChevronActive,
                };
              });
            }}
            className="flex justify-center items-center">
            <p className="font-semibold text-[14px] leading-6 tracking-wider text-[#ED1C24]">
              {trans(locale, lang, 'lihatSelengkapnya')}
            </p>
            <Icon
              icon={chevronDown}
              size={24}
              className={clsx(
                'text-[#ED1C24] transition',
                state?.isChevronActive ? 'rotate-180' : 'rotate-120',
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  function renderUploadDoc() {
    return (
      <div className="pt-8 pb-3 px-[5%]">
        <div className="mb-2">
          <p className="text-base font-semibold leading-5 tracking-wider mb-5 ">
            {trans(locale, lang, 'dokumen')}
          </p>
          <p className="font-medium text-xs leading-5 text-gray-400">
            {trans(locale, lang, 'unggahDokumenYang')}{' '}
            <span
              onClick={() => {}}
              className="font-normal text-xs leading-5 text-primary-dark-primary90">
              {trans(locale, lang, 'klikDisini')}
            </span>{' '}
            {trans(locale, lang, 'untukContohDokumen')}
          </p>
          <div className="bg-[#F1FBF8] p-4 gap-2 flex flex-col rounded-2xl mt-3">
            <div className="flex flex-row items-center">
              <Image src={GreenTick} width={12} height={12} alt="" />
              <p className="font-medium text-xs leading-4 tracking-wider ml-4">
                {trans(locale, lang, 'ukuranFileYang')}
              </p>
            </div>
            <div className="flex flex-row items-center">
              <Image src={GreenTick} width={12} height={12} alt="" />
              <p className="font-medium text-xs leading-4 tracking-wider ml-4">
                {trans(locale, lang, 'pastikanCahayaCukup')}
              </p>
            </div>
            <div className="flex flex-row items-center">
              <Image src={GreenTick} width={12} height={12} alt="" />
              <p className="font-medium text-xs leading-4 tracking-wider ml-4">
                {trans(locale, lang, 'posisikanDokumenPada')}
              </p>
            </div>
          </div>
        </div>
        {documentUpload?.map((docCategory, indexDocCategory) => (
          <div key={indexDocCategory}>
            <div
              role="button"
              onClick={() => {
                const findChevronIndex = documentUpload.findIndex(
                  (doc) => doc === docCategory,
                );
                const tempDocumentUpload = [...documentUpload];
                tempDocumentUpload[findChevronIndex].chevronFlag =
                  !docCategory.chevronFlag;
                setUploadDoc(tempDocumentUpload);
              }}
              className="flex flex-1 justify-between items-center">
              <p className="font-semibold text-base leading-6 tracking-wider py-4">
                {docCategory?.title}
              </p>
              <Icon
                icon={chevronDown}
                size={24}
                className={clsx(
                  docCategory?.chevronFlag ? 'rotate-180' : 'rotate-120',
                )}
              />
            </div>
            {docCategory?.chevronFlag && (
              <>
                {docCategory.data.map((data, indexList) => {
                  const onUpload = () => {
                    setTempObj({
                      indexList,
                      dataList: data,
                      indexDocCategory,
                    });
                    setModal((prevState) => ({
                      ...prevState,
                      isModalUploadActive: true,
                    }));
                  };
                  const onReupload = onUpload;
                  const onDelete = () => {
                    const tempDocumentUpload = [...documentUpload];
                    const indexListFilterResult = tempDocumentUpload[
                      indexDocCategory
                    ]?.data?.findIndex((_, i) => i === indexList);
                    tempDocumentUpload[indexDocCategory].data[
                      indexListFilterResult
                    ] = {
                      ...tempDocumentUpload[indexDocCategory].data[
                        indexListFilterResult
                      ],
                      photoBase64: null,
                      fileType: null,
                      photo: null,
                      size: 0,
                      isMandatory: false,
                      documentKey: null,
                    };
                    setUploadDoc(tempDocumentUpload);
                  };
                  const onPreview = ({ uri, fileType }) => {
                    setState((prevState) => ({
                      ...prevState,
                      imageFile: uri,
                      fileType,
                      isShowPreview: true,
                    }));
                  };
                  return (
                    <UploadList
                      key={data?.key}
                      lang={lang}
                      data={data}
                      indexList={indexList}
                      indexDocCategory={indexDocCategory}
                      onReupload={onReupload}
                      onUpload={onUpload}
                      onDelete={onDelete}
                      onPreview={onPreview}
                    />
                  );
                })}
              </>
            )}
          </div>
        ))}
      </div>
    );
  }

  function renderFooter() {
    const renderUserConsent = () => {
      if (isDocValid) {
        if (state?.isAgree) {
          setState((prevState) => {
            return { ...prevState, isAgree: false };
          });
        }
        return null;
      }
      return (
        <>
          <p className="basis-11/12 text-xs md:text-sm ml-2 s:ml-0">
            <span>{trans(locale, lang, 'denganIniSaya')}</span>
          </p>
          <div className="basis-1/12">
            {state?.isAgree ? (
              <Icon icon={checkCircle} size={24} className="text-red-500" />
            ) : (
              <Icon icon={checkCircle} size={24} className="text-gray-500" />
            )}
          </div>
        </>
      );
    };

    return (
      <div className="border-t-2">
        <div className="px-9">
          <div
            role="button"
            className="flex items-center flex-row-reverse pb-4 mt-6 mb-2"
            onClick={() => {
              setState((prevState) => {
                return { ...prevState, isAgree: !state?.isAgree };
              });
            }}>
            {renderUserConsent()}
          </div>
          <div className="flex justify-center pb-14">
            <Button
              disabled={!state?.isAgree}
              type="linear-gradient"
              full
              onButtonClick={() => {
                // setLoading(true);
                // setSubmitDocument({
                //   admissionClaimData: {
                //     policyNumber: payloadClaimPolis?.policyNumber,
                //     productCode: payloadClaimPolis?.productCode,
                //     ekycId: userData?.ekycId,
                //     userId: userData?.userId,
                //     planCode: payloadClaimPolis?.planCode,
                //     benefitType: payloadClaimPolis?.benefitType,
                //     causeCode: payloadClaimPolis?.causeCode,
                //     hospitalityType: payloadClaimPolis?.hospital?.type,
                //     insuredName: payloadClaimPolis?.insuredName,
                //     providerId: payloadClaimPolis?.hospital?.value,
                //     accidentDate: payloadClaimPolis?.dateAccident,
                //     treatmentDate: payloadClaimPolis?.dateOfHospitalized,
                //     bankName: payloadClaimPolis?.bank?.label,
                //     bankAccountName: payloadClaimPolis?.nameOfOwnerAcount,
                //     bankAccountNumber: payloadClaimPolis?.rekNumber,
                //     sourceType: 'LIFEID',
                //   },
                //   documents: bulkDocumentUpload,
                // });
                console.log({
                  admissionClaimData: {
                    policyNumber: payloadClaimPolis?.policyNumber,
                    productCode: payloadClaimPolis?.productCode,
                    ekycId: userData?.ekycId,
                    userId: userData?.userId,
                    planCode: payloadClaimPolis?.planCode,
                    benefitType: payloadClaimPolis?.benefitType,
                    causeCode: payloadClaimPolis?.causeCode,
                    hospitalityType: payloadClaimPolis?.hospital?.type,
                    insuredName: payloadClaimPolis?.insuredName,
                    providerId: payloadClaimPolis?.hospital?.value,
                    accidentDate: payloadClaimPolis?.dateAccident,
                    treatmentDate: payloadClaimPolis?.dateOfHospitalized,
                    bankName: payloadClaimPolis?.bank?.label,
                    bankAccountName: payloadClaimPolis?.nameOfOwnerAcount,
                    bankAccountNumber: payloadClaimPolis?.rekNumber,
                    sourceType: 'LIFEID',
                  },
                  documents: bulkDocumentUpload,
                });
              }}>
              <p className="font-semibold text-sm leading-5 tracking-wider">
                {trans(locale, lang, 'lanjutkan')}
              </p>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function renderModalUploadDoc() {
    const setClose = () => {
      setModal((prevState) => {
        return { ...prevState, isModalUploadActive: false };
      });
    };
    const setCamera = () => {
      setModal((prevState) => {
        return {
          ...prevState,
          isModalCameraActive: !isModal?.isModalCameraActive,
        };
      });
    };
    const onTakePhoto = async ({ getScreenshot }) => {
      const imageSrc = getScreenshot();

      const blob = await fetch(imageSrc).then((res) => res.blob());
      let tempDocumentUpload = [...documentUpload];

      const indexListFilterResult = tempDocumentUpload[
        tempObj?.indexDocCategory
      ]?.data?.findIndex((val, i) => {
        return i === tempObj?.indexList;
      });

      tempDocumentUpload[tempObj?.indexDocCategory].data[
        indexListFilterResult
      ] = {
        ...tempDocumentUpload[tempObj?.indexDocCategory].data[
          indexListFilterResult
        ],
        documentKey: null,
        photoBase64: await convertToBase64(blob, null, blob.type),
        fileType: URL.createObjectURL(blob, null, blob.type) + '.jpg',
        photo: URL.createObjectURL(blob, null, blob.type),
        size: Number((blob.size / 1000000).toFixed(2)),
        isMandatory: false,
      };

      setUploadDoc(tempDocumentUpload);

      setLoading(true);

      setUploadDocument({
        params: {
          indexDocCategory: tempObj?.indexDocCategory,
          indexListFilterResult,
        },
        data: {
          policyNumber: sampleParams?.policyNumber,
          data: {
            documentType:
              sampleParams?.productName.toUpperCase() +
              '_' +
              sampleParams?.benefitTypeValue,
            documentCode:
              tempDocumentUpload[tempObj?.indexDocCategory]?.data[
                indexListFilterResult
              ]?.documentCode,
            fileType:
              tempDocumentUpload[tempObj?.indexDocCategory]?.data[
                indexListFilterResult
              ]?.fileType,
            bytes: tempDocumentUpload[tempObj?.indexDocCategory]?.data[
              indexListFilterResult
            ]?.photoBase64.replace(/^data:image\/[a-z]+;base64,/, ''),
          },
        },
      });

      setModal((prevState) => {
        return {
          ...prevState,
          isModalUploadActive: false,
          isModalCameraActive: false,
        };
      });
    };

    const onFileChange = async (e) => {
      e.preventDefault();
      const tempDocumentUpload = [...documentUpload];

      const indexListFilterResult = tempDocumentUpload[
        tempObj?.indexDocCategory
      ]?.data?.findIndex((val, i) => {
        return i === tempObj?.indexList;
      });

      tempDocumentUpload[tempObj?.indexDocCategory].data[
        indexListFilterResult
      ] = {
        ...tempDocumentUpload[tempObj?.indexDocCategory].data[
          indexListFilterResult
        ],
        documentKey: null,
        photoBase64: await convertToBase64(e.target.files[0]),
        fileType: e.target.files[0]?.name,
        photo: URL.createObjectURL(e.target.files[0]),
        size: Number((e.target.files[0]?.size / 1000000).toFixed(2)),
        isMandatory: false,
      };

      setUploadDoc(tempDocumentUpload);

      setLoading(true);

      setUploadDocument({
        params: {
          indexDocCategory: tempObj?.indexDocCategory,
          indexListFilterResult,
        },
        data: {
          policyNumber: sampleParams?.policyNumber,
          data: {
            documentType:
              sampleParams?.productName.toUpperCase() +
              '_' +
              sampleParams?.benefitTypeValue,
            documentCode:
              tempDocumentUpload[tempObj?.indexDocCategory]?.data[
                indexListFilterResult
              ]?.documentCode,
            fileType:
              tempDocumentUpload[tempObj?.indexDocCategory]?.data[
                indexListFilterResult
              ]?.fileType,
            bytes:
              tempDocumentUpload[tempObj?.indexDocCategory]?.data[
                indexListFilterResult
              ]?.fileType
                .split('.')
                .pop() === 'pdf'
                ? tempDocumentUpload[tempObj?.indexDocCategory]?.data[
                    indexListFilterResult
                  ]?.photoBase64.replace(
                    /^data:application\/[a-z]+;base64,/,
                    '',
                  )
                : tempDocumentUpload[tempObj?.indexDocCategory]?.data[
                    indexListFilterResult
                  ]?.photoBase64.replace(/^data:image\/[a-z]+;base64,/, ''),
          },
        },
      });

      setModal((prevState) => {
        return { ...prevState, isModalUploadActive: false };
      });
    };
    return (
      <ModalUploadDoc
        lang={lang}
        isOpen={isModal?.isModalUploadActive}
        setClose={setClose}
        isCameraOpen={isModal?.isModalCameraActive}
        setCamera={setCamera}
        onTakePhoto={onTakePhoto}
        onFileChange={onFileChange}
      />
    );
  }

  function renderPreviewDoc() {
    return (
      <Modal
        size={state?.fileType?.split('.').pop() === 'pdf' ? 'md' : 'sm'}
        isOpen={state?.isShowPreview}
        toggle={() => {
          setState((prevState) => {
            return { ...prevState, isShowPreview: false };
          });
        }}
        className="">
        {state?.fileType?.split('.').pop() === 'pdf' ? (
          <embed
            type="application/pdf"
            src={state?.imageFile}
            width="600"
            height="720"></embed>
        ) : state?.imageFile ? (
          <Image
            src={URL.createObjectURL(state?.imageFile)}
            width={600}
            height={720}
            alt=""
            objectFit="fill"
          />
        ) : null}
      </Modal>
    );
  }

  function renderSuccessModal() {
    return (
      <Modal className="relative max-w-[375px]" isOpen={isModal?.isSuccess}>
        <div className="flex flex-1 flex-col justify-center items-center py-10">
          <Image
            src={GreenCircleTick}
            width={146}
            height={145}
            alt=""
            objectFit="fill"
          />
          <p className="pt-4 font-bold text-lg leading-7 tracking-wider text-center">
            {trans(locale, lang, 'pengajuanKlaimSedang')}
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <div>
      <Header />
      <Container className="bg-white shadow-sm rounded-2xl" noBackground>
        {renderHeader()}
        {renderClaimReq()}
        <div className="bg-[#F5F5F5] h-1.5 w-full" />
        {renderUploadDoc()}
        {renderFooter()}
        {renderModalUploadDoc()}
        {renderPreviewDoc()}
        {renderSuccessModal()}
      </Container>
    </div>
  );
}
