import { Container } from '@cp-component';
import { BtnBack } from '@cp-config/Svgs';
import { NAVIGATION } from '@cp-util/constant';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import locale from './locale';
import { trans } from '@cp-util/trans';

export default function Page({ lang }) {
  const router = useRouter();
  const iframeRef = useRef(null);

  const {
    query: { url, paymentId },
  } = router;

  return (
    <Container noBackground fullScreen className="overflow-hidden">
      <div className="relative border-b py-4 font-bold flex justify-center">
        <div
          role="button"
          onClick={() => {
            router.back();
          }}
          className="absolute flex items-center left-4 md:left-6 z-10">
          <Image src={BtnBack} width={24} height={24} />
        </div>
        <div>{trans(locale, lang, 'title')}</div>
      </div>
      <div>
        <iframe
          className="w-full min-h-[800px]"
          ref={iframeRef}
          // sandbox="allow-forms"
          src={url}
        />
      </div>
    </Container>
  );
}
