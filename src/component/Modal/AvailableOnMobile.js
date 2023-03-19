import Image from 'next/image';
import { AppStore, GPlay, NotAvailable } from '@cp-config/Images';
import { Close } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import Modal from './index';
import locale from './locale';

export default function Component({ lang, isOpen, setClose }) {
  return (
    <Modal isOpen={isOpen}>
      <div className="relative w-full flex items-center justify-center mb-6 pt-12">
        <img src={NotAvailable} className="absolute max-w-[180px] -top-32" />
        <div
          role="button"
          className="absolute flex items-center left-0 top-0"
          onClick={() => setClose(false)}>
          <Image src={Close} width={32} height={32} />
        </div>
        <p className="text-black/80 font-semibold mt-2 text-center xm:px-5">
          {trans(locale, lang, 'notAvailable_Title')}
        </p>
      </div>
      <p className="text-body2 leading-6 text-center font-medium text-neutral-light-neutral80 mb-6 xm:px-5">
        {trans(locale, lang, 'notAvailable_Subtitle')}
      </p>
      <div className="flex">
        <div className="w-full">
          <a
            href="https://apps.apple.com/id/app/life-by-ifg/id1627986095?l=id"
            target="_blank">
            <img src={AppStore} />
          </a>
        </div>
        <div className="w-full">
          <a
            href="https://play.google.com/store/apps/details?id=id.lifecustomer"
            target="_blank">
            <img src={GPlay} />
          </a>
        </div>
      </div>
    </Modal>
  );
}
