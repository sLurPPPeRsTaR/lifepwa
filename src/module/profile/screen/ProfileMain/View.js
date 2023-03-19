import { useRouter } from 'next/router';
import { trans } from '@cp-util/trans';
import { useEffect, useMemo, useState } from 'react';
import { NAVIGATION } from '@cp-util/constant';
import {
  Button,
  DrawerProfile,
  HeaderPage,
  MenuBar,
  Modal,
} from '@cp-component';

import locale from './locale';
import ProfileFaq from '../ProfileFaq';
import ProfilePayment from '../ProfilePayment';
import ProfileAddress from '../ProfileAddress';
import ProfileSecurity from '../ProfileSecurity';
import ProfileLanguage from '../ProfileLanguage';
import ProfileSubscription from '../ProfileSubscription';
import ProfileVerification from '../ProfileVerification';
import ProfilePersonalData from '../ProfilePersonalData';
import ProfileSecurityMPin from '../ProfileSecurityMPin';
import ProfileLifetag from '../ProfileLifetag';
import ProfileTermAndConditions from '../ProfileTermAndConditions';
import Icon from 'react-icons-kit';
import { closeRound } from 'react-icons-kit/ionicons';
import { Cone } from '@cp-config/Images';
import { androidArrowBack } from 'react-icons-kit/ionicons';
import { pCall, pChat, pMail } from '@cp-config/Svgs';

export default function Page(props) {
  const router = useRouter();
  const {
    query: { activeTabProps, activeArrowBack, policyNo, lifetagId, other },
  } = router;
  const { lang, token, userData, getProfileUserParty } = props;
  const [width, setWidth] = useState('');
  const [isMobilePhone, setMobilePhone] = useState(false);
  const [activeTab, setActiveTab] = useState(width < 640 ? '' : 0);
  const [featureNotAvailable, setFeatureNotAvailable] = useState(false);
  const [customerCare, setCustomerCare] = useState(false);

  const [fromTabProps, setFromTabProps] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/');
      return null;
    }
  }, [token]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      if (width < 640) {
        setMobilePhone(true);
      }
    }
  });

  useEffect(() => {
    getProfileUserParty();
  }, []);

  useEffect(() => {
    if (activeTabProps) {
      setActiveTab(+activeTabProps);
    }
  }, [activeTabProps]);

  const name = useMemo(() => {
    return userData?.name;
  }, [userData?.name]);
  const phone = useMemo(() => {
    return userData?.mobilePhoneNumber;
  }, [userData?.mobilePhoneNumber]);
  const email = useMemo(() => {
    return userData?.email;
  }, [userData?.email]);
  const alreadyKyc = useMemo(() => {
    return userData?.alreadyKYC;
  }, [userData?.alreadyKYC]);
  const userParty = useMemo(() => {
    return userData?.userParty;
  }, [userData?.userParty]);
  const alreadySetPin = useMemo(() => {
    return userData?.alreadySetPin;
  }, [userData?.alreadySetPin]);
  const alreadySetMPin = useMemo(() => {
    return userData?.alreadySetMPin;
  }, [userData?.alreadySetMPin]);

  const handleActiveSide = (key) => {
    if (key !== 1) {
      router.replace({ query: {} });
      setActiveTab(key);
    } else {
      setActiveTab(key);
    }
  };

  const renderPage = () => {
    if (activeTab == 0) {
      return (
        <ProfilePersonalData
          email={email}
          phone={phone}
          fullName={name}
          alreadyKyc={alreadyKyc}
        />
      );
    } else if (activeTab == 1) {
      return (
        <ProfileSubscription
          setFeatureNotAvailable={setFeatureNotAvailable}
          policyNumber={policyNo}
          activeArrowBack={activeArrowBack}
          other={other}
        />
      );
    } else if (activeTab == 9) {
      return <ProfilePayment />;
    } else if (activeTab == 3) {
      return <ProfileAddress />;
    } else if (activeTab == 4) {
      return <ProfileVerification />;
    } else if (activeTab == 5) {
      return (
        <ProfileSecurity
          setActiveTab={setActiveTab}
          setFromTabProps={setFromTabProps}
        />
      );
    } else if (activeTab == 6) {
      return <ProfileLanguage />;
    } else if (activeTab == 7) {
      return <ProfileFaq />;
    } else if (activeTab == 8) {
      return (
        <ProfileSecurityMPin
          setActiveTab={setActiveTab}
          fromTabProps={fromTabProps}
          lifetagId={lifetagId}
        />
      );
    } else if (activeTab == 10) {
      return <ProfileLifetag />;
    } else if (activeTab == 11) {
      return <ProfileTermAndConditions />;
    } else {
      return null;
    }
  };

  //
  const modalFeatureNotAvailable = () => {
    return (
      <Modal isOpen={featureNotAvailable} className="max-w-[400px]">
        <div className="flex flex-col">
          <Icon
            icon={closeRound}
            size={24}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={() => setFeatureNotAvailable(false)}
          />
          <img src={Cone} className="w-80 mx-auto" />
          <p className="px-3 py-3 text-lg font-bold text-center">
            {trans(locale, lang, 'maafUntukSekarang')}
          </p>
          <p className="text-sm text-center text-gray-500">
            {trans(locale, lang, 'melakukanPerubahan')}
          </p>
          <Button
            className="mt-10"
            outline
            shadow
            full
            onButtonClick={() => setFeatureNotAvailable(false)}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button
            className="my-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setFeatureNotAvailable(false);
              setCustomerCare(true);
            }}>
            {trans(locale, lang, 'hubungiCustomer')}
          </Button>
        </div>
      </Modal>
    );
  };

  const modalCustomerCare = () => {
    return (
      <Modal isOpen={customerCare} size="md">
        <div className="flex justify-between pb-5 pt-2 p-2 md:px-5">
          <Icon
            icon={androidArrowBack}
            size={24}
            className="cursor-pointer"
            onClick={() => setCustomerCare(false)}
          />
          <text className="text-base md:text-lg font-bold">
            {trans(locale, lang, 'bantuanCustomer')}
          </text>
          <div></div>
        </div>

        <p className="text-center px-2 md:px-[15%] text-sm pb-2 pt-5">
          {trans(locale, lang, 'apabilaAndaMemerlukan')}
        </p>

        <div className="w-[90%] mx-auto pb-10 py-5 divide-y">
          <div className="flex items-center">
            <img src={pMail} className="text-orange-300" />
            <p className="text-sm pl-4 py-5">Callcenter@Ifg-life.com</p>
          </div>
          <div className="flex items-center">
            <img src={pCall} className="text-orange-300" />
            <p className="text-sm pl-4 py-5">(+62) 21 2505080</p>
          </div>
          <div className="flex items-center">
            <img src={pChat} className="text-orange-300" />
            <p className="text-sm pl-4 py-5">(+62) 21 2505080</p>
          </div>
        </div>
      </Modal>
    );
  };
  //

  if (!token) return null;

  return (
    <>
      <div className="w-full h-full bg-white mb-10 sm:mb-20 lg:mb-10">
        <HeaderPage title={trans(locale, lang, 'profile')} btnBack={false} />

        <div className="relative px-[6%] flex md:space-x-[3%] flex-col md:flex-row pb-10 -top-14 md:-top-16 ">
          <div className="w-full md:w-[32%]">
            <DrawerProfile
              active={handleActiveSide}
              lang={lang}
              fullName={name}
              email={email}
              phone={phone}
              activeTabProp={activeTab}
              alreadyKYC={alreadyKyc}
              userParty={userParty}
              alreadySetPin={alreadySetPin}
              alreadySetMPin={alreadySetMPin}
              lifetagId={lifetagId}
            />
          </div>

          <div className="w-full md:w-[65%] mt-5 ">{renderPage()}</div>
        </div>
        <MenuBar />
      </div>
      {modalFeatureNotAvailable()}
      {modalCustomerCare()}
    </>
  );
}
