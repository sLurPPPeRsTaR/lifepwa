import { MenuSosDisabled, SosEnabled, ambulance2 } from '@cp-config/Svgs';
import { Button, Modal } from '@cp-component';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import { API, BASE_URL_CUSTOMER } from '@cp-util/constant';
import { api } from '@cp-bootstrap/bootstrapApi';
import locale from './locale';
import { trans } from '@cp-util/trans';

function Component({ lang, userId,classImg }) {
  const [confirmSos, setConfirmSos] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isEligible, setIsEligible] = useState(false);

  const getSubcriptions = async () => {
    try {
      const response = await api.get(API.SUBS.getSubscriptions);

      if (!response) setIsEligible(false);
      else {
        const subcriptions = response?.data?.data;
        if (
          subcriptions?.length > 0 &&
          subcriptions.find(
            (element) =>
              element.productName === 'LifeSAVER' &&
              element.status === 'ACTIVE',
          )
        ) {
          setIsEligible(true);
        } else setIsEligible(false);
      }
    } catch (error) {
      setIsEligible(false);
    }
  };

  const startCalling = () => {
    api.post(BASE_URL_CUSTOMER + '/v1/product/emergency/addTime');
    window.location.href = 'tel:08001881888';
    setConfirmSos(false);
  };

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getSubcriptions();
    }
    
    // check window size for first time render
    handleResize();
  }, []);

  // create an event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return (
    <div
      key="SOS-button"
      role="button"
      onClick={() => (isEligible ? setConfirmSos(true) : null)}
      className="absolute -top-7 sm:-top-8 left-[calc(50%-29px)] sm:left-[calc(50%-34px)]">
      <Modal isOpen={confirmSos} className="relative" size='sm'>
        <div className="relative p-1 md:p-2">
          <img
            src={ambulance2}
            className="absolute w-32 xm:w-36 md:w-40 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 font-bold text-center my-3 text-sm xm:text-base md:text-lg">
            {trans(locale, lang, 'title1')}
          </p>
          <p className="font-medium text-center text-gray-500 text-sm md:text-base">
            {trans(locale, lang, 'title2')}
          </p>

          <Button
            full
            outline
            bordered
            className="mt-6 text-sm !h-10 xm:!h-11 md:text-base"
            onButtonClick={() => setConfirmSos(false)}>
            {trans(locale, lang, 'kembali')}
          </Button>

          <Button
            full
            type="linear-gradient"
            className="mt-3 text-sm !h-10 xm:!h-11 md:text-base"
            onButtonClick={() => startCalling()}>
            {trans(locale, lang, 'mulai')}
          </Button>
        </div>
      </Modal>
      <img
        src={isEligible ? SosEnabled : MenuSosDisabled}
        width={isMobile ? 58 : 68}
        height={isMobile ? 58 : 68}
        className={classImg}
      />
    </div>
  );
}

export default Component;
