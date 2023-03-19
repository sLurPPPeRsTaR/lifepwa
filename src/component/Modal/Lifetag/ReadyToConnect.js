import React from 'react';
import { trans } from '@cp-util/trans';
import { Modal, Button } from '@cp-component';
import { LifetagReadyToConnect } from '@cp-config/Images';
import locale from './locale';

export default function component({ lang, isOpen, setClose }) {
  return (
    <Modal isOpen={isOpen} size="sm">
      <div className="xm:p-2 md:px-5">
        <img src={LifetagReadyToConnect} className="w-3/5 mx-auto" />
        <p className="text-center font-bold pt-2 text-sm xm:text-lg">
          {trans(locale, lang, 'titleReadyToConnect')}
        </p>
        {/* <p className="text-center pt-2 text-xs xm:text-sm">
          {trans(locale, lang, 'subtitleReadyToConnect')}
        </p> */}
        <Button
          type="linear-gradient"
          className="mt-6 text-sm !h-10 md:!h-11 md:text-base"
          onButtonClick={() => setClose(false)}>
          {trans(locale, lang, 'kembali')}
        </Button>
      </div>
    </Modal>
  );
}
