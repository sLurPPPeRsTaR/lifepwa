import { setToastMsg } from '@cp-bootstrap/bootstrapAction';
import { useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { x } from 'react-icons-kit/feather';
import { warning } from 'react-icons-kit/typicons';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setToastMsg: (payload) => setToastMsg(payload),
};

function index({ warn, error, title, isOpen, setToastMsg }) {
  let color = '';
  let bg = '';

  if (warn) {
    color = 'text-orange-500';
    bg = 'bg-orange-100';
  }
  if (error) {
    color = 'text-red-500';
    bg = 'bg-red-100';
  }
  useEffect(() => {
    setTimeout(() => {
      setToastMsg({ isOpen: false, error: false, isOpen: false });
    }, 5000);
  }, [isOpen]);

  return isOpen ? (
    <div
      className={`fixed z-50 top-[10%] right-4 rounded-md flex items-center p-2 md:right-10 max-w-[250px] xm:max-w-xs md:max-w-sm ${bg}`}>
      <Icon icon={warning} size={30} className={color} />
      <p className={`font-semibold pl-2 pr-5 text-xs md:text-sm ${color}`}>
        {title}
      </p>
      <Icon
        role="button"
        icon={x}
        size={18}
        className={color}
        onClick={() =>
          setToastMsg({ isOpen: false, error: false, isOpen: false })
        }
      />
    </div>
  ) : null;
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
