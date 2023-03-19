import Icon from 'react-icons-kit';
import { Container, Modal } from '@cp-component';
import { androidArrowBack } from 'react-icons-kit/ionicons';
import { cloud_download } from 'react-icons-kit/ikons';
import {
  LsRiplay1,
  LsRiplay2,
  LsRiplay3,
  LsRiplay4,
  LsRiplay5,
  LsRiplay6,
  LsRiplay7,
  LsRiplay8,
  LsRiplay9,
  LsRiplay10,
  LsRiplay11,
  LsRiplay12,
  LsRiplay13,
} from '@cp-config/Images';

export default function Component({ isOpen, setClose }) {
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
            <p className="text-body1 font-bold">RIPLAY</p>
            <a
              href="https://www.life.id/api/v1/public/assets/e2d2c3b9-e8b4-4003-b903-43bcafd72b7a.pdf"
              target="_blank">
              <Icon icon={cloud_download} size={24} />
            </a>
          </div>
        </div>
        <div className="w-full max-w-[960px] mx-auto pt-10 px-4">
          <img src={LsRiplay1} className="w-full mb-20 mt-10" />
          <img src={LsRiplay2} className="w-full mb-20" />
          <img src={LsRiplay3} className="w-full mb-20" />
          <img src={LsRiplay4} className="w-full mb-20" />
          <img src={LsRiplay5} className="w-full mb-20" />
          <img src={LsRiplay6} className="w-full mb-20" />
          <img src={LsRiplay7} className="w-full mb-20" />
          <img src={LsRiplay8} className="w-full mb-20" />
          <img src={LsRiplay9} className="w-full mb-20" />
          <img src={LsRiplay10} className="w-full mb-20" />
          <img src={LsRiplay11} className="w-full mb-20" />
          <img src={LsRiplay12} className="w-full mb-20" />
          <img src={LsRiplay13} className="w-full mb-20" />
        </div>
      </Container>
    </Modal>
  );
}
