import React from 'react';
import { useRouter } from 'next/router';
import { trans } from '@cp-util/trans';
import { Modal, Button } from '@cp-component';
import { LifetagNotActive } from '@cp-config/Images';
import { NAVIGATION } from '@cp-util/constant';
import locale from './locale';

export default function component({ lang, isOpen, setClose }) {
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} size="sm">
      <div className="xm:p-2 md:px-5">
        <img src={LifetagNotActive} className="w-3/5 mx-auto" />
        <p className="text-center font-bold pt-2 text-sm xm:text-lg">
          {trans(locale, lang, 'titleNotActive')}
        </p>
        <p className="text-center pt-2 text-xs xm:text-sm">
          {trans(locale, lang, 'subtitleNotActive')}
        </p>
        <Button
          type="linear-gradient"
          className="mt-6 text-sm !h-10 md:!h-11 md:text-base"
          onButtonClick={() => {
            setClose(false);
            router.push({ pathname: NAVIGATION.HOME.Home });
          }}>
          {trans(locale, lang, 'kembali')}
        </Button>
      </div>
    </Modal>
  );
}
