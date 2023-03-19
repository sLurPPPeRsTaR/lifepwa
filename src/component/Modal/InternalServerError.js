import clsx from 'classnames';
import locale from './locale';
import { trans } from '@cp-util/trans';
import { Modal, Button } from '@cp-component';
import { ErrorInternal } from '@cp-config/Images';
import { useRouter } from 'next/router';
import { NAVIGATION } from '@cp-util/constant';

export default function InternalServerError({
  lang,
  isOpen,
  setClose,
}) {
  const router = useRouter();

  return (
    <Modal isOpen={isOpen}>
      <div className="relative w-full pt-10 flex gap-2 items-center justify-center mb-5">
        <img
          src={ErrorInternal}
          className={clsx(
            'absolute -bottom-4  left-1/2 transform -translate-x-1/2 max-w-none w-3/5 pb-4',
          )}
        />
      </div>
      <div className="font-bold text-h6 text-center mb-3">
        {trans(locale, lang, 'errorInternalTitle')}
      </div>
      <div className="text-center text-sm">
        {trans(locale, lang, 'errorInternalSubtitle')}
      </div>
      <Button
        type="linear-gradient"
        full
        className="text-sm mt-8"
        onButtonClick={() => {
          if(NAVIGATION.EVENT.EventConfirmPayment.includes(router.pathname)){
            router.reload();
            setClose(false);
            return;
          }
          setClose(false);
        }}>
        {trans(locale, lang, 'errorInternalBtn')}
      </Button>
    </Modal>
  );
}
