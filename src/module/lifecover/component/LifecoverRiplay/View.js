import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';
import { Container, Modal } from '@cp-component';
import { androidArrowBack } from 'react-icons-kit/ionicons';
import { cloud_download } from 'react-icons-kit/ikons';
import {
  LcRiplay1,
  LcRiplay2,
  LcRiplay3,
  LcRiplay4,
  LcRiplay5,
  LcRiplay6,
  LcRiplay7,
  LcRiplay8,
} from '@cp-config/Images';

export default function Page(props) {
  const { showModalLcRiplay, setShowModalLcRiplay } = props;

  const router = useRouter();

  return (
    <Modal isOpen={showModalLcRiplay} size="full">
      <Container
        noBackground
        fullScreen
        className="max-h-screen overflow-y-scroll">
        <div className="fixed top-0 left-0 w-full bg-white border-b py-4 font-bold flex justify-center mb-4">
          <div className="flex w-full px-[5%] justify-between items-center">
            <div
              role="button"
              onClick={() => setShowModalLcRiplay(false)}
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
          <img src={LcRiplay1} className="w-full mb-20 mt-10" />
          <img src={LcRiplay2} className="w-full mb-20" />
          <img src={LcRiplay3} className="w-full mb-20" />
          <img src={LcRiplay4} className="w-full mb-20" />
          <img src={LcRiplay5} className="w-full mb-20" />
          <img src={LcRiplay6} className="w-full mb-20" />
          <img src={LcRiplay7} className="w-full mb-20" />
          <img src={LcRiplay8} className="w-full mb-20" />
        </div>
      </Container>
    </Modal>
  );
}
