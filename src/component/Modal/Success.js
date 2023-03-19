import { Modal, Button } from '@cp-component';
import { BadgeTick } from '@cp-config/Svgs';

function Component({ isOpen, setClose, title, subtitle, btnTitle, toggle }) {
  return (
    <Modal size="sm" className="relative" isOpen={isOpen} toggle={toggle && setClose}>
      <div className="absolute -ml-4 -mt-28 w-full flex justify-center mb-6">
        <img src={BadgeTick} width={146} height={146} />
      </div>
      <div className="text-center text-h6 text-neutral-light-neutral90 font-bold mt-16 mb-4">
        {title}
      </div>
      {subtitle && (
        <div className="text-center text-sm mb-4 sm:mb-8">{subtitle}</div>
      )}
      <Button
        className="mb-2 mt-8"
        type="linear-gradient"
        onButtonClick={setClose}
        shadow
        full>
        {btnTitle}
      </Button>
    </Modal>
  );
}

export default Component;
