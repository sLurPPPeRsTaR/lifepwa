import Modal from './index';
import { Loading } from '@cp-config/Images';

function Component({ isOpen }) {
  return (
    <Modal isOpen={isOpen} noBackground>
      <img src={Loading} />
    </Modal>
  );
}

export default Component;