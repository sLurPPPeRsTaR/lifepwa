import axios from 'axios';
import PropTypes from 'prop-types';
import locale from './locale';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { trans } from '@cp-util/trans';
import { toast } from 'react-toastify';
import { Button, Modal } from '@cp-component';
import { IconIfgWhite, IconIfgRed } from '@cp-config/Images';
import { GoogleLogin } from 'react-google-login';
import { Google1 } from '@cp-config/Svgs';
import {
  NAVIGATION,
  DEVICE_PLATFORM,
  RESPONSE_STATUS,
  GOOGLE_PEOPLE_API,
} from '@cp-util/constant';
import { setCheckEmail } from '@cp-module/profile/profileApi';

export default function ModalRegisterOrLogin({
  lang,
  isOpen,
  toggle,
  header,
  body,
  callbackUrl,
  onClickLogin: onClickLoginProps,
  onClickRegister: onClickRegisterProps,
  setLoading,
  setLoginSocial,
  setRequestOtpClear,
}) {
  const translate = (val) => trans(locale, lang, val);
  const router = useRouter();
  const responseGoogle = async (response) => {
    const {
      data: { names, emailAddresses },
    } = await axios.get(GOOGLE_PEOPLE_API + response?.accessToken);

    try {
      setCheckEmail({
        token: response?.accessToken,
        channelType: 'GOOGLE',
        email: emailAddresses[0].value,
      })
        .then(() => {
          setLoginSocial({
            name: names?.length ? names[0].displayName : '',
            dob: null,
            email: emailAddresses[0].value,
            channelUid: emailAddresses[0].metadata.source.id,
            token: response?.accessToken,
            channelType: 'GOOGLE',
            deviceId,
            deviceType: getBrowser(),
            deviceLocation: null,
            devicePlatform: DEVICE_PLATFORM,
          });
        })
        .catch((error) => {
          setLoading(false);
          if (error.response?.status === RESPONSE_STATUS.BAD_REQUEST) {
            router.push(
              {
                pathname: NAVIGATION.REGISTER.RegisterNextStep,
                query: {
                  name: names?.length ? names[0].displayName : '',
                  dob: null,
                  email: emailAddresses[0].value,
                  channelUid: emailAddresses[0].metadata.source.id,
                  token: response?.accessToken,
                  channelType: 'GOOGLE',
                  callbackUrl,
                },
              },
              NAVIGATION.REGISTER.RegisterNextStep,
            );
          } else {
            toast.error('Check Email INTERNAL_SERVER_ERROR');
          }
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const onClickLogin =
    onClickLoginProps ||
    (() => {
      const pathname = NAVIGATION.LOGIN.Login;
      router.push({ pathname, query: { callbackUrl } }, pathname);
    });

  const onClickRegister =
    onClickRegisterProps ||
    (() => {
      const pathname = NAVIGATION.REGISTER.RegisterInput;
      router.push({ pathname, query: { callbackUrl } }, pathname);
    });

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      {header || (
        <div className="text-center">
          <p className="text-body1 font-bold leading-6 py-2">
            {translate('modal_title_not_login')}
          </p>
        </div>
      )}
      {body || (
        <div className="text-left">
          <p className="text-body2 pb-5">{translate('notLogin')}</p>
        </div>
      )}
      <div>
        <Button
          full
          onButtonClick={onClickRegister}
          className="mb-3 md:mb-4 shadow-md text-black text-sm hover:border">
          <img src={IconIfgRed} className="w-6 mr-1" />
          <span className="text-black text-sm">{translate('daftarIfgId')}</span>
        </Button>
        <GoogleLogin
          clientId={process.env.GOOGLE_DEVICE_ID}
          render={(renderProps) => (
            <Button
              className="text-darkGray-light-darkGray shadow-md mb-3 md:mb-4 text-sm hover:border"
              onButtonClick={() => {
                setRequestOtpClear();
                renderProps.onClick();
              }}
              disabled={renderProps.disabled}
              prefixIcon={<Image src={Google1} width={24} height={24} />}
              shadow
              full>
              {translate('daftarLewatGoogle')}
            </Button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <Button
          type="linear-gradient"
          full
          className="text-sm"
          onButtonClick={onClickLogin}>
          <img src={IconIfgWhite} className="w-6" />
          {translate('loginIfgId')}
        </Button>
      </div>
    </Modal>
  );
}

ModalRegisterOrLogin.defaultProps = {
  lang: 'id',
  isOpen: false,
  callbackUrl: NAVIGATION.HOME.Home,
};

ModalRegisterOrLogin.propTypes = {
  lang: PropTypes.oneOf(['id', 'en']),
  isOpen: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  header: PropTypes.element,
  body: PropTypes.element,
  callbackUrl: PropTypes.string,
  onClickRegister: PropTypes.func,
  onClickLogin: PropTypes.func,
};
