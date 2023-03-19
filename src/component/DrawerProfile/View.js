import clsx from 'classnames';
import { Icon } from 'react-icons-kit';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { trans } from '@cp-util/trans';
import { api } from '@cp-bootstrap/bootstrapApi';
import { Button, Input, Modal } from '@cp-component';
import { API, BASE_URL, NAVIGATION } from '@cp-util/constant';
import { Badge, UserLeft } from '@cp-config/Images';
import {
  Logout,
  LogoutConfirm,
  PinSet,
  LifetagAccessFailed,
  NotifPaper,
} from '@cp-config/Images';
import { chevronDown, chevronRight } from 'react-icons-kit/feather';
import locale from './locale';

import {
  pHelp,
  pHelpActive,
  pLanguage,
  pLanguageActive,
  pLocation,
  pLocationActive,
  pProfile,
  pProfileActive,
  pShield,
  pShieldActive,
  pTicket,
  pTicketActive,
  pTicketStar,
  pTicketStarActive,
  pWallet,
  pWalletActive,
  pStar,
  CopyClipboard,
} from '@cp-config/Svgs';
import { share } from 'react-icons-kit/fa';
import { shareAlt } from 'react-icons-kit/fa';
import { store } from '@cp-config/Store';

function Component({
  active,
  lang,
  fullName,
  email,
  phone,
  getBajoRunStep,
  setClearAuth,
  setLoginClear,
  token,
  getPoliciesClear,
  getCurrentSubsClear,
  activeTabProp,
  userParty,
  alreadyKYC,
  userData,
  alreadySetPin,
  alreadySetMPin,
  getCurrentSubs,
  getCurrentSubsResponse,
  getProfileReferral,
  getProfileReferralResponse,
  setWidgetHome,
  getFaqContentClear,
  setBuyForOthersState,
  setReferral,
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [isLogout, setLogout] = useState(false);
  const [width, setWidth] = useState('');
  const [isHidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isShowMenuMobile, setIsShowMenuMobile] = useState(false);
  const [photoProfile, setPhotoProfile] = useState('');
  const [showWidgetMpin, setShowWidgetMpin] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isShowUnableAccessLifeTagModal, setIsShowUnableAccessLifeTagModal] =
    useState(false);

  const isHaveLifesaver = useMemo(() => {
    if (getCurrentSubsResponse?.status == 'ACTIVE') {
      return true;
    }
    return false;
  }, [getCurrentSubsResponse?.status]);

  useEffect(() => {
    if (userData.thumbnailPhotoKey) {
      api
        .get(
          `${BASE_URL}${API.USER.photoThumbnail}/${userData?.thumbnailPhotoKey}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
          },
        )
        .then((res) => {
          const img = new File([res.data], 'photoProfile');

          setPhotoProfile(URL.createObjectURL(img));
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [userData.thumbnailPhotoKey]);

  // get referral
  useEffect(() => {
    getProfileReferral();
  }, [getProfileReferral]);

  // get lifesaver
  useEffect(() => {
    getCurrentSubs();
  }, [getCurrentSubs]);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // check window size for first time render
  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    if (activeTabProp) {
      setActiveTab(activeTabProp);
    }
  }, [activeTabProp]);

  // create an event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  useEffect(() => {
    active(activeTab);

    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
    }
  }, [activeTab]);

  const setActive = (key) => {
    setActiveTab(key);
    setHidden(true);
  };

  const listSideMenu = [
    {
      key: 0,
      title: trans(locale, lang, 'title1'),
      subtitle: trans(locale, lang, 'subTitle1'),
      icon: pProfile,
      iconActive: pProfileActive,
    },
    {
      key: 9,
      title: trans(locale, lang, 'title3'),
      subtitle: trans(locale, lang, 'subTitle3'),
      icon: pWallet,
      iconActive: pWalletActive,
    },
    // {
    //   key: 10,
    //   tab: 'lifetag',
    //   title: trans(locale, lang, 'title10'),
    //   subtitle: trans(locale, lang, 'subTitle10'),
    //   icon: pStar,
    //   iconActive: pStar,
    // },
    {
      key: 1,
      title: trans(locale, lang, 'title2'),
      subtitle: trans(locale, lang, 'subTitle2'),
      icon: pTicket,
      iconActive: pTicketActive,
    },
    {
      key: 3,
      title: trans(locale, lang, 'title4'),
      subtitle: trans(locale, lang, 'subTitle4'),
      icon: pLocation,
      iconActive: pLocationActive,
    },
    {
      key: 4,
      title: trans(locale, lang, 'title5'),
      subtitle: trans(locale, lang, 'subTitle5'),
      icon: pTicketStar,
      iconActive: pTicketStarActive,
    },
    {
      key: 5,
      title: trans(locale, lang, 'title6'),
      subtitle: trans(locale, lang, 'subTitle6'),
      icon: pShield,
      iconActive: pShieldActive,
    },
    {
      key: 6,
      title: trans(locale, lang, 'title7'),
      subtitle: trans(locale, lang, 'subTitle7'),
      icon: pLanguage,
      iconActive: pLanguageActive,
    },
    // {
    //   key: 11,
    //   title: trans(locale, lang, 'title11'),
    //   subtitle: trans(locale, lang, 'subTitle11'),
    //   icon: NotifPaper,
    //   iconActive: NotifPaper,
    // },
    {
      key: 7,
      title: trans(locale, lang, 'title8'),
      subtitle: trans(locale, lang, 'subTitle8'),
      icon: pHelp,
      iconActive: pHelpActive,
    },
    // key: 8 --> m-pin
  ];

  const renderUnableAccessLifetagModal = () => {
    const closeModal = () => {
      setIsShowUnableAccessLifeTagModal(false);
    };

    return (
      <Modal isOpen={isShowUnableAccessLifeTagModal} size="md">
        <img
          src={LifetagAccessFailed}
          className="w-40 s:w-48 top-5 left-1/2 z-10 m-auto"
        />
        <p className="text-center mt-5 text-md font-bold">
          {alreadyKYC && !isHaveLifesaver && (
            <>
              <p className="font-bold">Opps :(</p>
              {trans(locale, lang, 'modalUnableAccessLifeTagResubscribeTitle')}
            </>
          )}
          {!alreadyKYC && (
            <p>
              {trans(locale, lang, 'modalUnableAccessLifeTagVerifyDataTitle')}
            </p>
          )}
        </p>
        <p className="text-center mt-5 text-sm md:text-sm">
          {alreadyKYC && !isHaveLifesaver && (
            <div
              dangerouslySetInnerHTML={{
                __html: trans(
                  locale,
                  lang,
                  'modalUnableAccessLifeTagResubscribeText',
                ),
              }}></div>
          )}
          {!alreadyKYC && (
            <div
              dangerouslySetInnerHTML={{
                __html: trans(
                  locale,
                  lang,
                  'modalUnableAccessLifeTagVerifyDataText',
                ),
              }}></div>
          )}
        </p>

        {/*  */}
        <Button
          className="mt-3 text-sm xm:text-base !h-10 xs:!h-11"
          type="linear-gradient"
          full
          onButtonClick={() => {
            if (!alreadyKYC) {
              router.push(NAVIGATION.KYC.KycMain);
            } else if (alreadyKYC && !isHaveLifesaver) {
              router.push(NAVIGATION.LIFESAVER.LifesaverMain);
            }
          }}>
          {alreadyKYC &&
            !isHaveLifesaver &&
            trans(locale, lang, 'modalUnableAccessLifeTagResubscribeBtnLabel')}
          {!alreadyKYC &&
            trans(locale, lang, 'modalUnableAccessLifeTagVerifyDataBtnLabel')}
        </Button>
        <Button
          className="mt-3 text-sm xm:text-base !h-10 xs:!h-11"
          outline
          full
          bordered
          onButtonClick={() => setIsShowUnableAccessLifeTagModal(false)}>
          {trans(locale, lang, 'modalUnableAccessLifeTagBackBtnLabel')}
        </Button>
        {/*  */}
      </Modal>
    );
  };

  const renderReferral = () => {
    if (getProfileReferralResponse?.data?.referralCode) {
      return (
        <div className="relative mb-4">
          {copied && (
            <span className="absolute text-white rounded-lg p-1  right-[-14px] top-[-24px] bg-slate-300">
              {trans(locale, lang, 'copied')}
            </span>
          )}
          <span className="text-[12px] font-Monstserrat text-gray-500">
            {trans(locale, lang, 'myCodeReferalText')}
          </span>
          <Input
            value={getProfileReferralResponse?.data?.referralCode}
            className={
              'border-1 font-Monstserrat rounded-lg border-dashed hover:border-rose-500 !border-rose-500 mb-2'
            }
            disabled={true}
            suffixIcon={
              <>
                <button
                  className="px-1"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      getProfileReferralResponse?.data?.referralCode,
                    );
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}>
                  <img loading="lazy" src={CopyClipboard} className="w-4" />
                </button>
                <Icon loading="lazy" icon={shareAlt} className="w-4 text-[#ED1C24]" onClick={() => {
                  // router.push(
                  //   {
                  //     pathname: NAVIGATION.REFERRAL.ReferralMain,
                  //     query: {
                  //       referralCode: getProfileReferralResponse?.data?.referralCode,
                  //     },
                  //   },
                  //   NAVIGATION.REFERRAL.ReferralMain,
                  // );
                  setReferral(true);
                }} />
              </>
            }
          />
        </div>
      );
    }

    return null;
  };

  const renderListDrawer = () => {
    return (
      <div>
        {/* <div
          role="button"
          onClick={() => setIsShowMenuMobile(!isShowMenuMobile)}
          className="md:hidden h-14 px-4 border-b text-center flex justify-between items-center text-sm font-semibold">
          <div className="font-semibold">Menu</div>
          <Icon
            icon={chevronDown}
            size={24}
            className={`${
              isShowMenuMobile ? 'text-red-dark-red90 -rotate-180' : ''
            } duration-300 text-mediumGray-light-mediumGray group-hover:text-red-dark-red90`}
          />
        </div>

        <div
          className={`overflow-hidden duration-500
          ${
            isShowMenuMobile
              ? 'h-[50vh] overflow-y-scroll md:h-full md:overflow-auto'
              : 'h-0 '
          }
        `}> */}
        {listSideMenu.map((val) => {
          return (
            <div
              key={val.key}
              className={`cursor-pointer group grid place-items-center overflow-auto h-22 lg:h-24 hover:opacity-90 
                  ${val.key === 4 && alreadyKYC ? 'hidden' : 'block'}
                `}>
              <div
                key={val.key}
                onClick={() => {
                  if (
                    val.key === 10 &&
                    (!alreadyKYC || (alreadyKYC && !isHaveLifesaver))
                  ) {
                    setIsShowUnableAccessLifeTagModal(true);
                  } else {
                    if (val.key !== 7) {
                      getFaqContentClear();
                    }
                    setActive(val.key);
                    setIsShowMenuMobile(false);
                  }
                }}
                className={`w-full py-3 sm:py-2 items-center flex-row flex
                    duration-500 hover:bg-red-50
                    ${val.key == activeTab ? 'bg-red-100' : ''}`}>
                <div className="basis-2/12 w-full h-full grid place-items-center">
                  <img
                    src={val.key == activeTab ? val.iconActive : val.icon}
                    className="pl-2 h-6 sm:h-5 lg:h-7"
                  />
                </div>
                <div className="basis-8/12 w-full h-full flex-col flex justify-center ml-2 text-gray-700">
                  <p className="font-bold text-xs lg:text-base">{val.title}</p>
                  <p className="font-medium text-xs xs:leading-4 lg:text-sm">
                    {val.subtitle}
                  </p>
                </div>

                <div className="basis-2/12 w-full h-full grid place-items-center">
                  <Icon
                    icon={chevronRight}
                    size={22}
                    className={`${
                      val.key == activeTab && 'text-red-dark-red90'
                    } text-mediumGray-light-mediumGray group-hover:text-red-dark-red90`}
                  />
                </div>
              </div>
              <span className="border-b w-[90%]"></span>
            </div>
          );
        })}

        <div className="bg-white mt-1">{renderLogoutButton()}</div>
        <div className="bg-white mt-1">{renderUnableAccessLifetagModal()}</div>
      </div>
      // </div>
    );
  };

  const renderLogoutButton = () => {
    return (
      <div
        className="cursor-pointer group grid place-items-center w-full"
        onClick={() => setLogout(true)}>
        <div className="w-full h-[100px] rounded self-center flex-row flex duration-300">
          <div className="basis-2/12 pl-2 w-full h-full grid place-items-center">
            <img src={Logout} />
          </div>
          <div className="basis-8/12 w-full h-full flex-col flex justify-center ml-2">
            <p className="font-bold text-xs lg:text-base">
              {trans(locale, lang, 'logout')}
            </p>
            <p className="font-medium text-xs xs:leading-4 lg:text-sm">
              {trans(locale, lang, 'logoutCaption')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const modalLogout = () => {
    return (
      <Modal isOpen={isLogout} size="sm">
        <div className="relative p-1 md:p-2">
          <img
            src={LogoutConfirm}
            className="absolute h-40 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[60%] md:h-48"
          />
          <p className="pt-12 text-base font-bold text-center mx-auto my-3 md:pt-16 md:text-lg">
            {trans(locale, lang, 'logoutTitle')}
          </p>
          <p className="text-sm text-center pt-1">
            {trans(locale, lang, 'logoutSubtitle')}
          </p>

          <div className="flex flex-col">
            <Button
              className="mt-8 text-sm xm:text-base !h-10 xs:!h-11"
              outline
              full
              bordered
              onButtonClick={() => setLogout(false)}>
              {trans(locale, lang, 'no')}
            </Button>
            <Button
              className="mt-3 text-sm xm:text-base !h-10 xs:!h-11"
              type="linear-gradient"
              full
              onButtonClick={() => {
                getBajoRunStep({ isBajoRunProgress: false });
                setLogout(true);
                setClearAuth();
                setLoginClear();
                getPoliciesClear();
                getCurrentSubsClear();
                setWidgetHome({
                  renderWidgetSubmissionPayment: true,
                  renderWidgetRenewalPayment: true,
                  renderWidgetGracePeriodPayment: true,
                  renderWidgetInvitation: true,
                  renderWidgetLifeTag: true,
                  renderWidgetInvited: true,
                  renderWidgetKYC: true,
                  renderWidgetBajoRun: true,
                  renderWidgetActivatedLifeSAVER: true,
                  renderWidgetReEkyc: true,
                  renderWidgetLiveness: true,
                  renderWidgetBulkInsurred: true,
                });
                setBuyForOthersState([]);

                setTimeout(() => {
                  router.push('/home');
                  router.reload();
                }, 150);
              }}>
              {trans(locale, lang, 'logout')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

  const renderMenuMobile = () => {
    return (
      <div className="group flex flex-col p-2">
        <div
          className="cursor-pointer py-2 px-1 w-full flex justify-between items-center duration-500"
          onClick={() => setIsShowMenuMobile(!isShowMenuMobile)}>
          <div className="font-semibold">Menu</div>
          <Icon
            icon={chevronDown}
            size={24}
            className={`${
              isShowMenuMobile ? 'text-red-dark-red90 -rotate-180' : ''
            } duration-300 text-mediumGray-light-mediumGray group-hover:text-red-dark-red90`}
          />
        </div>
        <div
          className={`${
            isShowMenuMobile ? 'h-[55vh] mt-1 pt-2 border-t' : 'h-0'
          } transition-all delay-150 duration-300 overflow-y-scroll w-full`}>
          {renderListDrawer()}
        </div>
      </div>
    );
  };

  const renderWidgetMPin = () => {
    if (alreadyKYC) {
      if (!alreadySetPin || !alreadySetMPin) {
        return (
          <div className="border rounded-2xl mb-4 shadow-md p-3 lg:p-4 lg:pb-3">
            <div className="flex">
              <img src={PinSet} alt="" className="w-10 lg:w-12" />
              <p className="text-xs font-semibold pl-3 lg:pl-4 lg:text-sm ">
                {trans(locale, lang, 'titleMpin')}
              </p>
            </div>
            <div
              role="button"
              onClick={() => {
                setActive(8);
                setIsShowMenuMobile(false);
              }}
              className="w-fit mt-1 font-bold ml-auto text-white rounded-lg bg-red-500 p-1 px-3 text-[10px] lg:text-xs ">
              {trans(locale, lang, 'btnMpin')}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="flex w-full h-full flex-col rounded-3xl">
      <div className="flex items-center w-full mb-4 bg-gray-50 border shadow-sm xs:mt-5 rounded-xl md:rounded-2xl py-3 sm:p-3">
        <div className=" h-full flex justify-center items-center w-24 xm:w-28">
          <div
            className={clsx(
              'w-12 xm:w-14 h-12 xm:h-14 rounded-full overflow-hidden border-white border-4 grid place-items-center',
              userData?.thumbnailPhotoKey ? '' : 'bg-red-100',
            )}>
            <img
              src={userData?.thumbnailPhotoKey ? photoProfile : UserLeft}
              className={
                userData?.thumbnailPhotoKey
                  ? 'w-full h-full object-cover'
                  : 'w-1/2'
              }
            />
          </div>
        </div>
        <div className="w-full pt-1 md:pl-2 flex flex-col justify-center">
          <div className="flex items-center">
            <p className="font-semibold lg:text-base xs:text-sm truncate">
              {fullName}
            </p>
            {userData.alreadyKYC && <img src={Badge} className="h-4 ml-2" />}
          </div>
          <div className="flex flex-col">
            <p className="font-medium text-xs lg:text-sm  text-mediumGray-light-mediumGray truncate">
              {phone}
            </p>
            <p className="font-medium text-xs lg:text-sm  text-mediumGray-light-mediumGray truncate">
              {email}
            </p>
            {userParty?.map((party) => (
              <div
                key={party.type}
                className="flex font-semibold text-[11px] md:text-xs mt-2">
                <span className="text-green-600">
                  {party.type.charAt(0).toUpperCase() +
                    party.type.slice(1).toLowerCase()}
                </span>
                <span className="px-2 bg-red-100 rounded-3xl text-red-700 ml-2 truncate">
                  {party.code}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {renderWidgetMPin()}
      {renderReferral()}

      <div className="border md:h-full lg:h-full rounded-xl md:rounded-2xl shadow-sm md:overflow-hidden md:pt-2">
        {isMobile ? renderMenuMobile() : renderListDrawer()}
        {/* {renderListDrawer()} */}
      </div>
      {modalLogout()}
    </div>
  );
}

export default Component;
