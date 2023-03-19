import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';
import locale from './locale';
import { Button, Input } from '@cp-component';
import { trans } from '@cp-util/trans';
import { NAVIGATION } from '@cp-util/constant';
import { NotYetVerification } from '@cp-config/Images';
import { venus, mars } from 'react-icons-kit/fa';

export default function Page(props) {
  const { lang, data, alreadyKYC } = props;
  const router = useRouter();

  return (
    <>
      {alreadyKYC ? (
        <div className="px-[5%] w-full h-auto flex flex-col">
          <div className="flex w-full mb-4 sm:mb-6 justify-between flex-col lg:flex-row">
            <div className="w-full lg:w-[49%]">
              <Input
                className="w-full"
                disabled
                value={data?.name}
                label={trans(locale, lang, 'namaLengkap')}
              />
            </div>
            <div className="w-full mt-4 sm:mt-6 lg:mt-0 lg:w-[49%]">
              <Input
                className="w-full"
                disabled
                value={data?.idCardNo}
                label={trans(locale, lang, 'nomorKtp')}
              />
            </div>
          </div>

          <p className="text-caption1 font-semibold mb-1 text-neutral-light-neutral40">
            {trans(locale, lang, 'jenisKelamin')}
          </p>
          <div className="flex flex-row justify-between mb-4 sm:mb-6 text-xs xm:text-sm md:text-base">
            {data?.gender == 'LAKI-LAKI' ? (
              <div className="w-[48%] lg:w-[49%] h-auto flex border-2 px-2 py-3 xm:p-3 rounded-xl bg-gray-100">
                <p className="basis-5/6 text-neutral-light-neutral40">
                  {trans(locale, lang, 'lakiLaki')}
                </p>
                <Icon
                  className="basis-1/6 text-neutral-light-neutral40"
                  size={16}
                  icon={mars}
                />
              </div>
            ) : (
              <div className="w-[48%] lg:w-[49%] h-auto flex border-2 px-2 py-3 xm:p-3 rounded-xl bg-gray-50 text-gray-300 border-gray-100">
                <p className="basis-5/6">{trans(locale, lang, 'lakiLaki')}</p>
                <Icon className="basis-1/6" size={16} icon={mars} />
              </div>
            )}
            {data?.gender == 'PEREMPUAN' ? (
              <div className="w-[48%] lg:w-[49%] h-auto flex border-2 px-2 py-3 xm:p-3 rounded-xl bg-gray-100 items-center">
                <p className="basis-5/6 text-neutral-light-neutral40">
                  {trans(locale, lang, 'perempuan')}
                </p>
                <Icon
                  className="basis-1/6 text-neutral-light-neutral40"
                  icon={venus}
                  size={16}
                />
              </div>
            ) : (
              <div className="w-[48%] lg:w-[49%] h-auto flex border-2 px-2 py-3 xm:p-3 rounded-xl bg-gray-50 text-gray-300 border-gray-100">
                <p className="basis-5/6">{trans(locale, lang, 'perempuan')}</p>
                <Icon className="basis-1/6" icon={venus} />
              </div>
            )}
          </div>

          <Input
            className="mb-2 sm:mb-3"
            disabled
            value={data?.dob}
            label={trans(locale, lang, 'tanggalLahir')}
          />

          <Input
            className="mb-2 sm:mb-3"
            value={data?.address}
            disabled
            label={trans(locale, lang, 'jalan')}
          />

          <Input
            className="mb-2 sm:mb-3"
            value={data?.province}
            disabled
            label={trans(locale, lang, 'provinsi')}
          />

          <Input
            className="mb-2 sm:mb-3"
            value={data?.city}
            disabled
            label={trans(locale, lang, 'kota')}
          />

          <Input
            className="mb-2 sm:mb-3"
            value={data?.district}
            disabled
            label={trans(locale, lang, 'kecamatan')}
          />

          <Input
            className="mb-2 sm:mb-3"
            value={data?.subDistrict}
            disabled
            label={trans(locale, lang, 'kelurahan')}
          />

          <div className="flex mb-3 justify-between flex-row">
            <div className='w-[48%] md:w-[49%]'>
              <Input
                className="w-full"
                disabled
                value={data?.neighborhood}
                label={trans(locale, lang, 'rt')}
              />
            </div>
            <div className='w-[48%] md:w-[49%]'>
              <Input
                className="w-full"
                disabled
                value={data?.hamlet}
                label={trans(locale, lang, 'rw')}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="px-[5%]">
          <img src={NotYetVerification} className="h-60 mx-auto" />
          <p className="py-3 text-lg md:text-xl font-bold text-center">
            {trans(locale, lang, 'titleNotVerif')}
          </p>
          <p className="text-sm md:text-md text-center">
            {trans(locale, lang, 'subtitleNotVerif')}
          </p>

          <Button
            type="linear-gradient"
            shadow
            full
            className="mt-10"
            onButtonClick={() => {
              router.push(NAVIGATION.KYC.KycMain);
            }}>
            {trans(locale, lang, 'verifikasiSekarang')}
          </Button>
        </div>
      )}
    </>
  );
}
