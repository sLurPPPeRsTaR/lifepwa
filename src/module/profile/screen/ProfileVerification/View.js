import { useRouter } from 'next/router';

import locale from './locale';
import Icon from 'react-icons-kit';
import { trans } from '@cp-util/trans';
import { useEffect } from 'react';
import { arrowLeft } from 'react-icons-kit/feather';
import { NAVIGATION } from '@cp-util/constant';

// const lang = 'id';

export default function Page(props) {
  const router = useRouter();
  const { lang, alreadyLivenessTest } = props;

  useEffect(() => {
    router.push(NAVIGATION.KYC.KycMain);
  }, [router]);

  return;

  return (
    <div>
      <div className="relative w-full bg-white md:rounded-3xl xs:min-h-[40vh] lg:min-h-[80vh] border xs:mb-5 md:mb-0">
        <div className="border-b-4 py-6 w-full text-center">
          <text className="text-lg font-bold">
            {trans(locale, lang, 'verifikasiDataDiri')}
          </text>
        </div>
        {/* <div className='xs:w-full md:w-[50%] mt-[75px] xs:h-full md:h-auto md:py-10 grid place-items-center md:border xs:relative md:absolute md:top-32 lg:top-16 md:right-10 md:bg-white md:rounded-3xl md:shadow-xl'>
        <div className='md:w-[50%] lg:w-[50%] xs:w-[80%] h-[90%] flex flex-col'>
        </div> */}
      </div>
    </div>
  );
}
