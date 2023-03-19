import { useRouter } from 'next/router';
import { Button, Input } from '@cp-component';
import { PolisCek } from '@cp-config/Images';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { useState } from 'react';
import Icon from 'react-icons-kit';
import { exclamationCircle } from 'react-icons-kit/fa';
import { checkCircle } from 'react-icons-kit/fa';
import { NAVIGATION } from '@cp-util/constant';
import { useEffect } from 'react';
import { arrowLeft } from 'react-icons-kit/fa';

export default function Page(props) {
  const router = useRouter();
  const {
    lang,
    getCheckLinkPolicyNo,
    getCheckLinkPolicyNoResponse,
    getCheckLinkPolicyNoClear,
  } = props;
  const [polis, setPolis] = useState('');
  const [checked, setChecked] = useState(false);
  const [isNotFound, setNotFound] = useState(false);

  useEffect(() => {
    if (getCheckLinkPolicyNoResponse?.data.exists == false) {
      setNotFound(true);
    }else if(getCheckLinkPolicyNoResponse?.data.exists == true){
      setChecked(true);
    }
    return () => {
      getCheckLinkPolicyNoClear();
    };
  });

  const renderPolisNotFound = () => {
    return (
      <div className="w-full grid h-screen fixed inset-0 bg-white z-10 bg-black/60">
        <div className="w-full h-auto py-10 bg-white grid place-items-center fixed bottom-0 rounded-t-3xl overflow-auto">
          <img
            src={PolisCek}
            className="md:w-[30%] lg:w-[10%]"
            style={{ height: 'auto' }}
          />
          <text className="font-bold text-xl">
            {trans(locale, lang, 'polisTidakDitemukan')}
          </text>
          <text className="w-[50%] text-center">
            {trans(locale, lang, 'noPolis')}
            <span className="font-bold"> {polis} </span>
            {trans(locale, lang, 'tidakDitemukan')}
          </text>
          <Button
            outline
            className="mt-5"
            onButtonClick={() => setNotFound(false)}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button type="linear-gradient" className="my-2">
            {trans(locale, lang, 'customerCare')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-white grid place-items-center">
      {isNotFound ? renderPolisNotFound() : null}
      <div className="w-full h-[20vh] grid bg-gradient-to-r from-[#FE684D] to-[#ED1C24] rounded-b-[100px]">
        <text className="ml-[48%] mt-20 absolute justify-center text-2xl font-bold text-white">
          {trans(locale, lang, 'polis')}
        </text>
      </div>
      <div className="md:w-[50%] lg:w-[40%] h-auto py-5 absolute md:top-40 lg:top-32 bg-white border rounded-2xl flex justify-center flex-col shadow-xl">
        <Icon icon={arrowLeft} className='ml-4 opacity-70' size={18} onClick={() => router.back()} />
        <div className="w-full h-auto grid place-items-center">
          <img
            src={PolisCek}
            className="md:w-[50%] lg:w-[30%]"
            style={{ height: 'auto' }}
          />
          <text className="text-center my-10 mx-5">
            {trans(locale, lang, 'masukanNomorPolis')}
          </text>
        </div>
      </div>
      <div className="md:w-[50%] lg:w-[40%]  h-auto grid place-items-center md:mt-[28vh] lg:mt-[40vh]">
        <div className="w-full h-auto flex flex-row">
          <Input
            className="my-4 basis-2/3 border-0"
            value={polis}
            placeholder={trans(locale, lang, 'placeholderPolis')}
            handleOnChange={(val) => {
              setPolis(val);
            }}
          />
          <Button
            type="linear-gradient"
            disabled={polis == ''}
            className="basis-1/3 my-4 ml-2"
            onButtonClick={() =>
              getCheckLinkPolicyNo({
                id: polis,
                certificateNo: '',
              })
            }>
            {trans(locale, lang, 'cek')}
          </Button>
        </div>
        {!checked ? (
          <div className="w-full h-auto flex flex-row bg-[#FFBA5E]/25 border my-4 p-2 rounded-3xl">
            <Icon
              className="basis-1/12 self-center mr-2 text-[#FBB559]"
              icon={exclamationCircle}
              size={24}
            />
            <text className="basis-11/12 font-medium">
              {trans(locale, lang, 'pastikanPolisKamu')}
            </text>
          </div>
        ) : (
          <div className="w-full h-auto flex flex-row bg-[#00D891]/25 border my-4 p-2 rounded-3xl">
            <Icon
              className="basis-1/12 self-center mr-2 text-[#009262]"
              icon={checkCircle}
              size={24}
            />
            <text className="basis-11/12 font-medium">
              {trans(locale, lang, 'polisDitemukan')}
            </text>
          </div>
        )}
        <text className="my-4">
          {trans(locale, lang, 'bilaKesulitan')}
          <span className="text-red-500">
            {trans(locale, lang, 'customerCare')}
          </span>
          {trans(locale, lang, 'kami')}
        </text>
        {checked ? (
          <Button
            type="linear-gradient"
            full
            disabled={polis == ''}
            className="basis-1/3 my-4 ml-2"
            handleOnClick={() =>
              router.push(NAVIGATION.POLICY.PolisPengkinianOtp)
            }>
            {trans(locale, lang, 'lanjut')}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
