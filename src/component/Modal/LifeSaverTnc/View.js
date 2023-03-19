import Icon from 'react-icons-kit';
import locale from './locale';
import { trans } from '@cp-util/trans';
import { LsTnc1, LsTnc2 } from '@cp-config/Images';
import { Container, Modal } from '@cp-component';
import { cloud_download } from 'react-icons-kit/ikons';
import { androidArrowBack } from 'react-icons-kit/ionicons';

export default function Component({ lang, isOpen, setClose }) {
  return (
    <Modal isOpen={isOpen} size="full">
      <Container
        noBackground
        fullScreen
        className="max-h-screen overflow-y-scroll">
        <div className="fixed top-0 left-0 w-full bg-white border-b py-4 font-bold flex justify-center mb-4">
          <div className="flex w-full px-[5%] justify-between items-center">
            <div
              role="button"
              onClick={() => setClose(false)}
              className="">
              <Icon icon={androidArrowBack} size={24} />
            </div>
            <p className="text-body1 font-bold">{trans(locale, lang, 'tnc')}</p>
            <a
              href="https://www.life.id/api/v1/public/assets/f5ea1b03-beb5-4e62-b70e-94e63cbaa7e6.pdf"
              target="_blank">
              <Icon icon={cloud_download} size={24} />
            </a>
          </div>
        </div>
        <div className="w-full max-w-[960px] mx-auto pt-20 px-4">
          <img src={LsTnc1} className="w-full mb-20" />
          <img src={LsTnc2} className="w-full mb-20" />
        </div>
      </Container>
    </Modal>
  );
}
