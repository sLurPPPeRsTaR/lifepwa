import { trans } from '@cp-util/trans'
import locale from './locale'
import { Close } from '@cp-config/Svgs'
import { Button, Modal } from '@cp-component'
import Image from 'next/image'
export default function Component({ 
    isOpen, 
    lang,
    setModalLsTnc,
    setModalShowRiplay,
    onAgree,
    onClose
}){
    const translate = (field) => {
        return trans(locale, lang, field)
    }

    return (
      <Modal isOpen={isOpen}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-4">
          <div
            role="button"
            className="absolute flex items-center left-0 z-50"
            onClick={onClose}>
            <Image src={Close} width={32} height={32} />
          </div>
          <div className="relative w-full">
            <p className="text-center font-bold">{translate('tnc')}</p>
          </div>
        </div>
         <p className="text-body2 leading-6 font-medium text-neutral-light-neutral80 mt-6 mb-8">
            {translate('loginEligible1')}
            <span
              onClick={() => setModalLsTnc(true)}
              className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
              {translate('loginEligible3')}
            </span>
            {translate('loginEligible4')}
            <span
              onClick={() => {
                setModalShowRiplay(true)
              }}
              className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
              {translate('loginEligible5')}
            </span>
            {translate('loginEligibleKyc1')}
          </p>

        <div>
          <Button
            type="linear-gradient"
            full
            className="text-sm"
            onButtonClick={onAgree}>
            {translate('sayaSetuju')}
          </Button>
        </div>
      </Modal>
    );
  };