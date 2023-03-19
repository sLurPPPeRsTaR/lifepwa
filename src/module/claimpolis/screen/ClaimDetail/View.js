import { Container } from '@cp-component';
import { Dokumen, Folder, PapanKertas } from '@cp-config/Images';
import { Header, ProgressSubmission } from '@cp-module/claimpolis/components';
import Label from '@cp-module/claimpolis/components/Label';
import { trans } from '@cp-util/trans';
import { useRouter } from 'next/router';
import { useState } from 'react';
import clsx from 'classnames';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/feather';
import locale from './locale';

export default function Page(props) {
  const { lang, setLoading } = props;
  const router = useRouter();

  const [state, setState] = useState({
    isChevronActive: false,
  });

  const progressDataMap = [
    {
      type: 'point',
      src: PapanKertas,
      title: 'Pengajuan',
      isActive: true,
    },
    {
      type: 'point',
      src: Dokumen,
      title: 'Diproses',
      isActive: true,
    },
    {
      type: 'point',
      src: Folder,
      title: 'Disetujui',
      isActive: false,
    },
    {
      type: 'point',
      src: Folder,
      title: 'Dibayarkan',
      isActive: false,
    },
  ];

  const sampleParams = {
    idCardNumber: 3173080701880001,
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

  return (
    <div>
      <Header />
      <Container className="relative rounded-2xl shadow-md bg-white">
        <ProgressSubmission endPoints={progressDataMap} />
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
                description={sampleParams?.claimTypeValue}
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
                    description={sampleParams?.idCardNumber}
                  />
                  <Label
                    title={trans(locale, lang, 'namaTertanggung')}
                    description={sampleParams?.insuredName}
                  />
                  <Label
                    title={trans(locale, lang, 'tanggalLahir')}
                    description={sampleParams?.dob}
                  />
                  <Label
                    title={trans(locale, lang, 'nomorPolis')}
                    description={sampleParams?.policyNumber}
                  />
                  <Label
                    title={trans(locale, lang, 'namaProduk')}
                    description={sampleParams?.productName}
                  />
                  <Label
                    title={trans(locale, lang, 'rumahSakit')}
                    description={sampleParams?.hospitalName}
                  />
                  <Label
                    title={trans(locale, lang, 'tanggalPertamaMasuk')}
                    description={sampleParams?.accidentDate}
                  />
                  <Label
                    title={trans(locale, lang, 'tanggalMeninggalDunia')}
                    description={sampleParams?.treatmentDate}
                  />
                </div>

                <p className="border-b" />

                <div className="pt-5">
                  <p className="text-base font-semibold leading-6 tracking-wider pb-5">
                    {trans(locale, lang, 'nomorRekeningPenerima')}
                  </p>
                  <Label
                    title={trans(locale, lang, 'namaBank')}
                    description={sampleParams?.bankName}
                  />
                  <Label
                    title={trans(locale, lang, 'namaPemilikRekening')}
                    description={sampleParams?.bankAccoutName}
                  />
                  <Label
                    title={trans(locale, lang, 'nomorRekening')}
                    description={sampleParams?.bankAccountNumber}
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
      </Container>
    </div>
  );
}
