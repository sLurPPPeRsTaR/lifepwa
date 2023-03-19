import { Container, Button, Input, InputAutoComplete } from '@cp-component';
import {
  ProgressSubmission,
  Header,
  Select,
  InputDate,
} from '@cp-module/claimpolis/components';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { PapanKertas, Dokumen, Folder } from '@cp-config/Images';
import { useRouter } from 'next/router';
import { NAVIGATION } from '@cp-util/constant';
import { useEffect, useState } from 'react';
import {
  GET_UPDATA_LIST_BANK_SUCCESS,
  SET_UPDATA_INQUIRY_BANK_ACCOUNT_SUCCESS,
} from '@cp-module/updata/updataConstant';
// import {
//     GET_RS_SUCCESS,
// } from '@cp-module/claimpolis/claimpolisConstant';
import { checkCircle } from 'react-icons-kit/fa/checkCircle';
import Icon from 'react-icons-kit';
import classNames from 'classnames';
// import moment from 'moment';

export default function Page({
  lang,
  getUpdataListBankResponse,
  getUpdataListBank,
  // getUpdataListBankFetch,
  // setLoading,
  updataAction,
  getRs,
  getRsResponse,
  getListTypeBenefitResponse,
  getListBenefitType,
  selectedPolicyNumber,
  // claimpolisAction,
  setUpdataInquiryBankAccountResponse,
  // setUpdataInquiryBankAccount,
  setDataClaim,
  claimpolisPayload,
  setIsComingFromScreen,
}) {
  const router = useRouter();
  const [isValidRekNumber, setIsValidRekNumber] = useState(false);
  const [banks, setBanks] = useState([]);
  // form state
  const [typeClaim, setTypeClaim] = useState(claimpolisPayload?.typeClaim);
  const [deathPlace, setDeathPlace] = useState('HOSPITAL');
  const [selectedRs, setSelectedRs] = useState(claimpolisPayload?.hospital);
  const [fullName, setFullName] = useState(claimpolisPayload?.fullName);
  const [relation, setRelation] = useState(claimpolisPayload?.relation);
  const [selectedBank, setSelectedBank] = useState(claimpolisPayload?.bank);
  const [ownerName, setOwnerName] = useState(
    claimpolisPayload?.nameOfOwnerAcount,
  );
  const [rekNumber, setRekNumber] = useState(claimpolisPayload?.rekNumber);
  const [enterHospitalDate, setEnterHospitalDate] = useState(
    claimpolisPayload?.dateOfHospitalized,
  );
  const [dateOfDeath, setDateOfDeath] = useState(
    claimpolisPayload?.dateAccident,
  );
  // const [deathPlaceDetail, setDeathPlaceDetail] = useState('')
  // ---------
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
      isActive: false,
    },
  ];

  useEffect(() => {
    getUpdataListBank();
    getListBenefitType({
      policyNumber: selectedPolicyNumber?.policyNo,
    });
    getRs({
      params: {
        page: 0,
        limit: 3,
      },
    });
  }, []);

  useEffect(() => {
    if (updataAction) {
      if (updataAction === GET_UPDATA_LIST_BANK_SUCCESS) {
        const listBank = getUpdataListBankResponse?.data?.map((item) => {
          return {
            label: item?.bankName,
            value: item?.bankCode,
          };
        });

        setBanks(listBank);
      }

      if (updataAction === SET_UPDATA_INQUIRY_BANK_ACCOUNT_SUCCESS) {
        if (
          setUpdataInquiryBankAccountResponse?.data?.beneficiaryAccountName ===
          ownerName.toUpperCase()
        ) {
          setIsValidRekNumber(true);
        } else {
          setIsValidRekNumber(false);
        }
      }
    }
  }, [updataAction]);

  return (
    <div>
      <Header />
      <Container
        className="relative rounded-2xl shadow-md bg-white"
        noBackground>
        <div className="px-[5%]">
          <div className="my-3">
            <ProgressSubmission endPoints={progressDataMap} />
          </div>
          <div className="mb-4 mt-8">
            <h1 className="font-bold">
              {trans(locale, lang, 'dataTertanggung')}
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4 my-3">
            <Input
              required
              disabled
              placeholder="Pilih Tipe Klaim"
              className="w-full"
              label={trans(locale, lang, 'benefit')}
              value={'Meninggal Dunia'}
            />
            <Select
              defaultValue={typeClaim}
              placeholder={trans(locale, lang, 'phTipeKlaim')}
              required
              className="w-full"
              type="select"
              label={trans(locale, lang, 'tipeKlaim')}
              options={getListTypeBenefitResponse}
              handleOnChange={(val) => setTypeClaim(val)}
            />
          </div>
          {['Natural', 'Kecelakaan'].includes(typeClaim?.label) ? (
            <div>
              <div className="mb-4 mt-8">
                <h1 className="font-bold">{trans(locale, lang, 'detail')}</h1>
              </div>
              {/* <div className='mb-3'>
                                    <h1 className='font-semibold mb-1 text-neutral-light-neutral40 text-[11px] lg:text-xs'>{trans(locale, lang, 'tempatMeninggal')}</h1>
                                    <div className='my-3 flex font-semibold mb-1 text-neutral-light-neutral40 text-[11px] lg:text-xs'>
                                        <div className='flex mr-3'>
                                            <input type='radio' className="mr-2" checked={deathPlace === "HOSPITAL"} value="HOSPITAL" onChange={(e) => {
                                                setDeathPlace(e.target.value)
                                                setSelectedRs(null)
                                            }} />
                                            <label htmlFor="html-rumah">{trans(locale, lang, 'rumahOrRs')}</label>
                                        </div>
                                        <div className='flex'>
                                            <input type='radio' className="mr-2" checked={deathPlace === "OTHER"} value="OTHER" onChange={(e) => setDeathPlace(e.target.value)} />
                                            <label htmlFor="html-rumah">{trans(locale, lang, 'lainnya')}</label>
                                        </div>
                                    </div>
                                </div> */}
              <div className="grid grid-cols-2 gap-4 my-3">
                <Input
                  required
                  className="w-full"
                  disabled
                  placeholder={trans(locale, lang, 'namaTertanggung')}
                  label={trans(locale, lang, 'namaTertanggung')}
                  value={selectedPolicyNumber?.participantName || ''}
                />
                {deathPlace === 'HOSPITAL' ? (
                  <InputAutoComplete
                    placeholder={trans(locale, lang, 'phRs')}
                    label={trans(locale, lang, 'rs')}
                    items={getRsResponse}
                    value={selectedRs}
                    getItemSelected={(item) => {
                      setSelectedRs(item);
                    }}
                    handleOnChange={(value) => {
                      setSelectedRs(null);
                      getRs({
                        params: {
                          page: 0,
                          limit: 3,
                          search: value.toUpperCase(),
                        },
                      });
                    }}
                    suffixIcon={
                      selectedRs ? (
                        <Icon icon={checkCircle} size={20}></Icon>
                      ) : null
                    }
                    className="text-green-600"
                  />
                ) : // <Input required className="w-full" label={trans(locale, lang, "lokasiMeninggal")} placeholder={trans(locale, lang, "lokasiMeninggalPh")} handleOnChange={(val) => setDeathPlaceDetail(val)} />
                null}
                <InputDate
                  required
                  className="w-full"
                  type="date"
                  dateOptions={{
                    maxDate: 'today',
                    defaultDate: claimpolisPayload?.dateOfHospitalized,
                  }}
                  label={trans(locale, lang, 'tanggalMasukRs')}
                  placeholder={'YYYY-MM-DD'}
                  handleOnChange={(val) => setEnterHospitalDate(val)}
                />
                <InputDate
                  required
                  className="w-full"
                  dateOptions={{
                    enable: [
                      {
                        from: selectedPolicyNumber?.insuranceStartDate?.split(
                          ' ',
                        )[0],
                        to: selectedPolicyNumber?.insuranceEndDate?.split(
                          ' ',
                        )[0],
                      },
                    ],
                    defaultDate: claimpolisPayload?.dateAccident,
                  }}
                  label={trans(locale, lang, 'tanggalMeninggal')}
                  placeholder={'YYYY-MM-DD'}
                  handleOnChange={(val) => {
                    setDateOfDeath(val);
                  }}
                />
              </div>
              <div className="mb-4 mt-8">
                <h1 className="font-bold">
                  {trans(locale, lang, 'detailPembayar')}
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-4 my-3">
                <Input
                  required
                  className="w-full"
                  label={trans(locale, lang, 'namaLengkap')}
                  placeholder={trans(locale, lang, 'phNamaLengkap')}
                  handleOnChange={(val) => setFullName(val)}
                  value={fullName}
                />
                {/* <Input required className="w-full" label={trans(locale, lang, "pilihStatusRelasi")} placeholder={trans(locale, lang, "phPilihStatusRelasi")} handleOnChange={(val) => setRelation(val)} value={relation} /> */}
                <Select
                  defaultValue={selectedBank}
                  required
                  placeholder={trans(locale, lang, 'phBank')}
                  options={banks}
                  label={trans(locale, lang, 'bank')}
                  handleOnChange={(val) => setSelectedBank(val)}
                />
                <Input
                  required
                  className="w-full"
                  label={trans(locale, lang, 'namaPemilikRekening')}
                  placeholder={trans(locale, lang, 'phNamaPemilikRekening')}
                  handleOnChange={(val) => setOwnerName(val)}
                  value={ownerName}
                />
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-end">
                      <div className=" font-semibold mb-1 text-neutral-light-neutral40 text-[11px] lg:text-xs">
                        {trans(locale, lang, 'nomorRekening')}
                      </div>
                      <sup className="text-primary-light-primary90">*</sup>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      'flex hover:border-gray-500 items-center rounded-xl border shadow-sm text-xs px-3 lg:text-sm border-neutral-light-neutral20 h-11 lg:h-12',
                    )}>
                    <input
                      type="number"
                      className="outline-none w-3/5 mr-3"
                      onChange={(e) => setRekNumber(e.target.value)}
                      value={rekNumber}
                    />
                    {/* <div className='w-2/5 flex justify-between'>
                                                <div className='my-auto'>
                                                    {
                                                        isValidRekNumber ? <Icon className='text-green-600' icon={checkCircle} size={20} /> : <div></div>
                                                    }
                                                </div>
                                                <button
                                                    className='bg-gradient-to-r from-[#F25D63] to-[#ED1C24] text-white px-3 py-1 rounded-xl hover:pointer'
                                                    type="linear-gradient"
                                                    onClick={() => {
                                                        setUpdataInquiryBankAccount({
                                                            beneficiaryBankCode: selectedBank?.value,
                                                            beneficiaryAccountNumber: rekNumber,
                                                        })
                                                    }}
                                                >
                                                    {trans(locale, lang, 'btnBankCheckText')}
                                                </button>
                                            </div> */}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="px-[5%] my-10">
          {/* <Button outline bordered full border className="mb-3">{trans(locale, lang, "simpan")}</Button> */}
          <Button
            type="linear-gradient"
            full
            onButtonClick={() => {
              const payload = {
                benefitValue: 'Meninggal',
                typeClaim: typeClaim,
                name: selectedPolicyNumber?.participantName,
                hospital: selectedRs,
                dateOfHospitalized: enterHospitalDate,
                dateAccident: dateOfDeath,
                fullName: fullName,
                relation: relation,
                bank: selectedBank,
                nameOfOwnerAcount: ownerName,
                rekNumber: rekNumber,
                nik: selectedPolicyNumber?.idCard,
                insuredName: selectedPolicyNumber?.participantName,
                dob: selectedPolicyNumber?.dob,
                policyNumber: selectedPolicyNumber?.policyNo,
                productName: selectedPolicyNumber?.productName,
                productCode: selectedPolicyNumber?.source,
                planCode: selectedPolicyNumber?.productCode,
                benefitType: 'DE',
                causeCode: 'DA02',
              };

              setDataClaim(payload);
              router.push(NAVIGATION.CLAIMPOLIS.claimUpload);
              setIsComingFromScreen({
                isFromDocument: true,
              });
            }}
            disabled={
              !typeClaim ||
              // || (deathPlace === 'HOSPITAL') && !selectedRs
              !selectedRs ||
              !enterHospitalDate ||
              !dateOfDeath ||
              !fullName ||
              // || !relation
              !selectedBank ||
              !ownerName
              // || !isValidRekNumber
            }>
            {trans(locale, lang, 'lanjutkan')}
          </Button>
        </div>
      </Container>
    </div>
  );
}
