import Icon from 'react-icons-kit';
import { connect } from 'react-redux';
import { closeRound } from 'react-icons-kit/ionicons';
import { trans } from '@cp-util/trans';
import { Cone } from '@cp-config/Images';
import { Button, Modal } from '@cp-component';
import { setCustomerCare } from '@cp-bootstrap/bootstrapAction';
import locale from './locale';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setCustomerCare: (payload) => setCustomerCare(payload)
};

function Component({ lang, isOpen, setClose, setCustomerCare }) {
  return (
    <Modal isOpen={isOpen} size="sm">
      <div className="flex flex-col">
        <Icon
          icon={closeRound}
          size={18}
          className="cursor-pointer text-gray-400 hover:text-gray-600"
          onClick={() => setClose(false)}
        />
        <img src={Cone} className="w-80 mx-auto" />
        <p className="px-3 py-3 text-base font-bold text-center xm:text-lg">
          {trans(locale, lang, 'notAvailable1')}
        </p>
        <p className="text-sm text-center text-gray-500">
          {trans(locale, lang, 'notAvailable2')}
        </p>
        <Button
          className="mt-10 text-sm h-11"
          outline
          shadow
          full
          onButtonClick={() => setClose(false)}>
          {trans(locale, lang, 'kembali')}
        </Button>
        <Button
          className="my-5 text-sm h-11"
          type="linear-gradient"
          shadow
          full
          onButtonClick={() => {
            setCustomerCare(true);
            setClose(false);
          }}>
          {trans(locale, lang, 'hubungiCustomer')}
        </Button>
      </div>
    </Modal>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
