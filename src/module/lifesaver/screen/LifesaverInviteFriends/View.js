import { useState, useEffect } from 'react';
import Icon from 'react-icons-kit';
import locale from './locale';
import { trans } from '@cp-util/trans';
import { useRouter } from 'next/router';
import { Button, Modal, ModalAvailableOnMobile } from '@cp-component';
import { LifesaverBack1 } from '@cp-config/Svgs';
import { close, chevronDown, chevronUp } from 'react-icons-kit/fa';
import {
  AddFriend,
  BgInviteFriend,
  Megaphone,
  UserShield,
  googlePlay,
  appStore,
  UserLeft,
  InvitationStatus1,
  InvitationStatus2,
  InvitationStatus3,
  InvitationStatus4,
  LifeSaverPlus,
  LiveSaverLogo,
  PathInvitation,
  Send,
  SendWhite,
  LifesaverPOS,
} from '@cp-config/Images';
import clsx from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import { arrowRight2 } from 'react-icons-kit/icomoon';
import { API, BASE_URL } from '@cp-util/constant';
import { informationCircled } from 'react-icons-kit/ionicons';
import { send } from 'react-icons-kit/fa';
import axios from 'axios';
import { api } from '@cp-bootstrap/bootstrapApi';
import { setFormatDate } from '@cp-util/common';

export default function Page(props) {
  const router = useRouter();
  const {
    getInvitationListFriend,
    getInvitationListFriendResponse,
    lang,
    appConfig: { features },
    token,
    userData,
    getCheckMaxInviteResponse,
    getCheckMaxInvite,
    setAvailableOnMobile,
  } = props;
  const [width, setWidth] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const [registeredData, setRegisteredData] = useState([]);
  const [showRegisteredData, setShowRegisteredData] = useState(false);
  const [invitedData, setInvitedData] = useState([]);
  const [showInvitedData, setShowInvitedData] = useState(false);
  const [limitedUser, setLimitedUser] = useState(false);
  const [invitationLimit, setInvitationLimit] = useState(
    features?.invitationLimit || 10,
  );
  const [listPhoto, setListPhoto] = useState([]);

  const listInvitationData = [
    {
      key: 1,
      title: trans(locale, lang, 'terundang'),
      icon: InvitationStatus1,
      data: getInvitationListFriendResponse?.data?.totalShare,
    },
    {
      key: 2,
      title: trans(locale, lang, 'terdaftar'),
      icon: InvitationStatus4,
      data: getInvitationListFriendResponse?.data?.totalRegister,
    },
    {
      key: 3,
      title: trans(locale, lang, 'berlangganan'),
      subtitle: `(${trans(locale, lang, 'referensiKamu')})`,
      icon: InvitationStatus3,
      data: getInvitationListFriendResponse?.data?.totalSubByYou,
    },
    {
      key: 4,
      title: trans(locale, lang, 'berlangganan'),
      subtitle: `(${trans(locale, lang, 'referensiOrang')})`,
      icon: InvitationStatus2,
      data: getInvitationListFriendResponse?.data?.totalSubByOther,
    },
  ];

  useEffect(() => {
    getInvitationListFriend();
    getCheckMaxInvite();
  }, [getInvitationListFriend, getCheckMaxInvite]);

  useEffect(() => {
    if (userData?.userParty || getCheckMaxInviteResponse?.role) {
      setLimitedUser(false);
    } else {
      setLimitedUser(true);
    }
  }, [userData, getCheckMaxInviteResponse]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
    }
  }, [typeof window !== 'undefined']);

  useEffect(() => {
    getInvitationListFriendResponse?.data?.listFriends.map((val) => {
      getPhoto(val)
    })

    setRegisteredData(
      getInvitationListFriendResponse?.data?.listFriends.filter(
        (data) => !data.productName,
      ),
    );
    setInvitedData(
      getInvitationListFriendResponse?.data?.listFriends.filter(
        (data) => data.productName,
      ),
    );

  }, [getInvitationListFriendResponse]);

  useEffect(() => {
    if (
      getInvitationListFriendResponse?.data?.totalShare === 0 &&
      getInvitationListFriendResponse?.data?.totalRegister === 0 &&
      getInvitationListFriendResponse?.data?.totalSubByYou === 0 &&
      getInvitationListFriendResponse?.data?.totalSubByOther === 0
    ) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [getInvitationListFriendResponse]);



  function getPhoto(value) {
    if (value.thumbnailPhotoKey) {
      api
          .get(
            `${BASE_URL}${API.USER.photoThumbnail}/${value.thumbnailPhotoKey}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              responseType: 'blob',
            },
          )
          .then((res) => {
            const img = new File([res.data], 'photoProfile');
            const data = {
              phone: value.phoneNo,
              data: URL.createObjectURL(img)
            }

            if (listPhoto.filter((val) => val.phone === value.phoneNo).length === 0) {
              setListPhoto((list) => [...list, data]
              )
            }
          })
          .catch((error) => {
            throw error;
          });
    }
  }

  const renderHeader = () => {
    return (
      <div className="relative">
        <img src={PathInvitation} className="w-full object-cover h-[300px] lg:h-auto" />
        <div className="absolute w-full top-[45%] left-1/2 text-white text-center -translate-x-1/2 -translate-y-1/2 ">
          <img
            src={LifesaverBack1}
            className="absolute left-4 cursor-pointer md:left-20"
            onClick={() => router.back()}
          />
          <div className="max-w-sm w-full mx-auto">
            <p className="text-xl md:text-3xl pb-5 font-bold">
              {trans(locale, lang, 'ajakTeman')}
            </p>
            <p className="text-base md:text-xl pb-1 font-bold">
              {trans(locale, lang, 'ayoSalingMelindungi')}
            </p>
            <div className='w-full flex items-center justify-center'>
              <p className="text-sm w-[75%]">{trans(locale, lang, 'berbagiProteksi')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCounterFLoating = () => {
    return (
      <div className="flex gap-5 w-full mx-auto bg-white p-4 shadow-md rounded-2xl md:w-3/5">
        <div
          role="button"
          className={clsx(
            'w-1/2 h-auto py-3 rounded-xl font-semibold text-red-400 text-center hover:bg-red-200/50 grid place-items-center',
            activeTab == 1 ? 'bg-red-50' : null,
          )}
          onClick={() => {
            setActiveTab(1);
            setShowInvitedData(false);
            setShowRegisteredData(false);
          }}>
          <p className='md:text-sm xs:text-xs'>{trans(locale, lang, 'ringkasan')}</p>
        </div>
        <div
          role="button"
          className={clsx(
            'w-1/2 h-auto py-3 rounded-xl font-semibold text-red-400 text-center hover:bg-red-200/50 grid place-items-center',
            activeTab == 2 ? 'bg-red-50' : null,
          )}
          onClick={() => setActiveTab(2)}>
          <p className='md:text-sm xs:text-xs whitespace-nowrap'>{trans(locale, lang, 'daftarUndangan')}</p>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="w-full md:mt-20 xs:mt-4 flex md:flex-row-reverse xs:flex-col">
        {width > 600
          ? renderCaraAjakTeman()
          : activeTab === 1
          ? renderCaraAjakTeman()
          : null}
        <div className="md:w-[50%] xs:w-full h-full flex flex-col">
          {activeTab === 1 ? (
            <div>
              <div className="w-auto h-auto py-2 flex justify-between mx-10 font-bold">
                <text>{trans(locale, lang, 'informasiStatus')}</text>
              </div>
              <div className="w-auto h-auto bg-white rounded-[24px] shadow-xl mb-10 xm:mx-5 grid place-items-center py-5 px-2">
                {renderInvitationData()}
              </div>
              <div className="flex flex-row justify-between mx-5" role="button">
                <text className="mr-2">
                  {trans(locale, lang, 'sisaUndangan')}
                </text>
                <text className="mr-2 font-semibold text-[#ED1C24]">
                  {limitedUser
                    ? `${
                        invitationLimit -
                        getInvitationListFriendResponse?.data?.weeklyInvite
                      }/${invitationLimit}`
                    : 'Unlimited'}
                </text>
              </div>
              {limitedUser ? (
                <div className="flex flex-row mx-5 bg-orange-100 p-4 rounded-[24px] mt-2 mb-10">
                  <Icon
                    className="text-orange-300"
                    icon={informationCircled}
                    size={20}
                  />
                  <text className="ml-2 text-sm">
                    {trans(locale, lang, 'kuotaAjakTeman')}
                  </text>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              {!_.isEmpty(registeredData) && (
                <div>
                  <div className="w-auto h-auto flex justify-between mx-5 font-bold whitespace-nowrap">
                    <text>
                      {trans(locale, lang, 'terundangDanTerdaftar')}
                    </text>
                    {/* <text>{invited}/10</text> */}
                  </div>
                  <div className="w-auto h-auto grid place-items-center py-2 px-2">
                    {showRegisteredData
                      ? registeredData.map((val, index) => (
                          <div className="w-full">
                            {renderRegisteredData(val, index)}
                          </div>
                        ))
                      : registeredData
                          .filter((val, idx) => idx < 2)
                          .map((val, index) => (
                            <div className="w-full">
                              {renderRegisteredData(val, index)}
                            </div>
                          ))}
                  </div>
                  {registeredData.length > 3 ? (
                    <div className="w-full flex items-end justify-end font-semibold text-[#ED1C24]">
                      {!showRegisteredData ? (
                        <div
                          className="flex flex-row"
                          role="button"
                          onClick={() =>
                            setShowRegisteredData(!showRegisteredData)
                          }>
                          <text className="mr-3">
                            {trans(locale, lang, 'lihatSemua')}
                          </text>
                        </div>
                      ) : (
                        <text
                          role="button"
                          className="mr-3"
                          onClick={() =>
                            setShowRegisteredData(!showRegisteredData)
                          }>
                          {trans(locale, lang, 'lihatSedikit')}
                        </text>
                      )}
                    </div>
                  ) : null}
                </div>
              )}
              {!_.isEmpty(invitedData) && (
                <div>
                  <div className="w-auto h-auto flex justify-between mx-5 font-bold whitespace-nowrap">
                    <text>{trans(locale, lang, 'terproteksi')}</text>
                    {/* <text>{invited}/10</text> */}
                  </div>
                  <div className="w-auto h-auto grid place-items-center py-2 px-2">
                    {showInvitedData
                      ? invitedData.map((val, index) => (
                          <div className="w-full">
                            {renderInvitedData(val, index)}
                          </div>
                        ))
                      : invitedData
                          .filter((val, idx) => idx < 2)
                          .map((val, index) => (
                            <div className="w-full">
                              {renderInvitedData(val, index)}
                            </div>
                          ))}
                  </div>
                  {invitedData.length > 3 ? (
                    <div className="w-full flex items-end justify-end mb-10 font-semibold text-[#ED1C24]">
                      {!showInvitedData ? (
                        <div
                          className="flex flex-row"
                          role="button"
                          onClick={() => setShowInvitedData(!showInvitedData)}>
                          <text className="mr-3">
                            {trans(locale, lang, 'lihatSemua')}
                          </text>
                        </div>
                      ) : (
                        <text
                          role="button"
                          className="mr-3"
                          onClick={() => setShowInvitedData(!showInvitedData)}>
                          {trans(locale, lang, 'lihatSedikit')}
                        </text>
                      )}
                    </div>
                  ) : null}
                </div>
              )}
              {_.isEmpty(registeredData) && _.isEmpty(invitedData)
                ? renderEmpty()
                : null}
            </div>
          )}
          <div className="xs:block md:hidden fixed p-5 border-t-2 bottom-0 w-full left-0 bg-white">
            <Button
              full
              type="linear-gradient"
              onButtonClick={() => setAvailableOnMobile(true)}>
              {trans(locale, lang, 'ajakTeman')}
              <img src={SendWhite} className="w-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderEmpty = () => {
    return (
      <div className="w-full md:h-[70%] xs:h-full grid place-items-center">
        <img src={AddFriend} />
        <text className="md:text-xl xs:text-md text-center font-bold">
          {trans(locale, lang, 'kamuBelumMengundang')}
        </text>
        <text className="md:text-lg xs:text-sm text-center mb-5">
          {trans(locale, lang, 'ayoUndangTemanmu')}
        </text>
      </div>
    );
  };

  const renderRegisteredData = (val, index) => {
    return (
      <div className="w-full bg-white rounded-[24px] shadow-xl border px-2 py-4 h-auto md:p-2 flex flex-col justify-between mb-5">
        <div
          key={index}
          className="w-auto h-auto md:p-2 flex flex-row justify-between">
          <div className="flex flex-row">
            <div className="md:w-10 md:h-10 xs:w-8 xs:h-8 bg-red-100 rounded-full flex items-center justify-center">
              {val.thumbnailPhotoKey && listPhoto.length > 0 ? (
                <img src={listPhoto?.filter(data => data.phone === val.phoneNo)[0].data} className='w-32 rounded-full' />
              ) : (
                <img src={UserLeft} className='w-4' />
              )}
            </div>
            <div className="flex flex-col">
              <text
                className={clsx(
                  'ml-2 font-semibold xs:text-[10px] md:text-sm',
                  val.nama === null ? 'mt-2' : 'mt-0',
                )}>
                {val.nama || val.phoneNo}
              </text>
              {val.nama !== null ? (
                <text className="ml-2 font-semibold xs:text-[10px] md:text-sm opacity-50">
                  {val.phoneNo}
                </text>
              ) : null}
            </div>
          </div>
          <div className="flex flex-row justify-between">
              {val.statusRegister && !val.productName ? (
                <div className="p-2 h-7 bg-orange-100 flex justify-center items-center rounded-xl">
                  <text className="text-[#EEAC5C] xs:text-[10px] md:text-sm font-semibold">
                    {trans(locale, lang, 'terdaftar')}
                  </text>
                </div>
              ) : (
                <div className="p-2 h-7 bg-gray-100 flex justify-center items-center rounded-xl">
                  <text className="text-black xs:text-[10px] md:text-sm font-semibold opacity-80">
                    {trans(locale, lang, 'terundang')}
                  </text>
                </div>
              )}
            <div className="p-2 h-7 flex justify-center items-center text-[#ED1C24] ml-2 border-l-2">
              <img 
                src={Send} 
                className='w-5 md:w-6'
                role="button"
                onClick={() => setAvailableOnMobile(true)} />
            </div>
          </div>
        </div>
        <div className='w-full h-auto flex flex-row justify-between my-3 ml-2'>
          <text className='xs:text-[10px] md:text-sm'>
            {trans(locale, lang, 'diundangPada')}{' '}
            {setFormatDate(
              moment(val.createdAt).format(
                'YY-MM-DD',
              ),
              lang,
              true,
            )}
          </text>
        </div>
      </div>
    );
  };

  const renderInvitedData = (val, index) => {
    return (
      <div className="w-full p-2 bg-white rounded-xl rounded-[24px] border shadow-xl md:w-full h-auto md:p-2 flex flex-col justify-between mb-5">
        <div
          key={index}
          className="w-auto md:p-2 items-center h-auto flex flex-row justify-between">
          <div className="flex flex-row justify-between my-2">
            <div className="md:w-10 md:h-10 xs:w-8 xs:h-8 bg-red-100 rounded-full flex items-center justify-center">
              {val.thumbnailPhotoKey && listPhoto.length > 0 ? (
                <img src={listPhoto?.filter(data => data.phone === val.phoneNo)[0].data} className='w-32 rounded-full' />
              ) : (
                <img src={UserLeft} className='w-4' />
              )}
            </div>
            <div className="flex flex-col mr-3">
              <text
                className={clsx(
                  'ml-2 font-semibold xs:text-[10px] md:text-sm',
                  val.nama === null ? 'mt-2' : 'mt-0',
                )}>
                {val.nama || val.phoneNo}
              </text>
              {val.nama !== null ? (
                <text className="ml-2 font-semibold xs:text-[10px] md:text-sm opacity-50">
                  {val.phoneNo}
                </text>
              ) : null}
            </div>
          </div>
          <div className="flex flex-row justify-between mr-2">
            {val.statusPolicy && val.statusPolicy !== 'ACTIVE' && val.statusPolicy !== 'GRACE_PERIOD' ? (
              <div className="p-2 h-7 bg-gray-100 flex justify-center items-center rounded-xl mr-1">
                <text className="text-black xs:text-[10px] md:text-sm font-semibold opacity-80">
                  {trans(locale, lang, 'terproteksi')}
                </text>
              </div>
            ) : (
              <div className="p-2 h-7 bg-green-100 flex justify-center items-center rounded-xl">
                <text className="text-[#00B76A] xs:text-[10px] md:text-sm">
                  {trans(locale, lang, 'terproteksi')}
                </text>
              </div>
            )}
            {val.statusPolicy && val.statusPolicy !== 'ACTIVE' && val.statusPolicy !== 'GRACE_PERIOD' ? (
              <div className="p-1 h-7 flex justify-center items-center text-[#ED1C24] border-l-2">
                <img 
                  src={Send} 
                  className='w-5 md:w-6'
                  role="button"
                  onClick={() => setAvailableOnMobile(true)} />
              </div>
            ) : null}
          </div>
        </div>
        <div className='w-full flex flex-col mb-5'>
          <div className="w-full h-auto flex flex-row justify-between mt-3">
            {val.statusRegister && val.productName ? (
              <div className='flex flex-col ml-2'>
                <text className="font-semibold flex opacity-60 xs:text-[10px] md:text-sm">
                  {trans(locale, lang, 'nomorRef')}
                </text>
                <text className="font-semibold flex opacity-70 xs:text-[10px] md:text-sm mb-2">
                  {val.policyNumber}
                </text>
              </div>
            ) : null}
            {val.isInvitedByYou !== null ? (
              val.productName === 'LifeSAVER' ? (
                <img src={LiveSaverLogo} />
              ) : val.productName === 'LifeSAVER+' ? (
                <img src={LifeSaverPlus} className='w-[100px] h-[18px]' />
              ) : val.productName === 'LifeSAVER POS' ? (
                <img src={LifesaverPOS} className='w-[100px] h-[18px]' />
              ) : null
            ): null}
          </div>
          <hr />
          <div className="basis-1/2 h-auto flex flex-row justify-between mt-2 ml-2">
            {val.statusPolicy === 'ACTIVE' ? (
              <text className="font-semibold flex xs:text-[10px] md:text-sm text-[#ED1C24]">
                {trans(locale, lang, val.statusPolicy)}
              </text>
            ) : val.statusPolicy === 'GRACE_PERIOD' ? (
              <text className="font-semibold flex xs:text-[10px] md:text-sm text-orange-500">
                {trans(locale, lang, val.statusPolicy)}
              </text>
            ) : (
              <text className="font-semibold flex xs:text-[10px] md:text-sm text-gray-500">
                {trans(locale, lang, val.statusPolicy)}
              </text>
            )}
            <text className="font-semibold opacity-70 xs:text-[10px] md:text-sm">
              {val.productName !== null
                ? val.isInvitedByYou === null
                  ? trans(locale, lang, 'referensiOrang')
                  : trans(locale, lang, 'referensiKamu')
                : trans(locale, lang, 'diundangPada') +
                  ' ' +
                  moment(val.createdAt).format('DD MMM YYYY')}
            </text>
          </div>
        </div>
      </div>
    );
  };

  const renderInviteFriends = () => {
    return (
      <div
        className="w-auto h-full bg-cover rounded-[24px] shadow-xl mb-10 xm:mx-5 flex items-center justify-center flex-col p-2 md:text-md xs:text-sm"
        style={{ backgroundImage: `url(${BgInviteFriend})` }}>
        <div className="w-[80%] flex flex-row mt-10 justify-center items-center">
          <div className="w-1/3 grid place-items-center">
            <img src={Megaphone} />
          </div>
          <text className="w-2/3">{trans(locale, lang, 'ajakTemanKamu')}</text>
        </div>
        <div className="w-[80%] mt-4 flex flex-row justify-center items-center">
          <div className="w-1/3 grid place-items-center">
            <img src={UserShield} />
          </div>
          <text className="w-2/3">
            {trans(locale, lang, 'pastikanTemanmu')}
          </text>
        </div>
        <div className="w-[80%] flex mb-10 mt-4">
          <text className="text-center">
            {trans(locale, lang, 'terimakasih')}
          </text>
        </div>
      </div>
    );
  };

  const renderInvitationData = () => {
    return (
      <div className="w-[95%] md:h-auto xs:h-full flex flex-col">
        <div className="flex flex-col p-1">
          {listInvitationData.map((val) => (
            <div>
              <div key={val.key} className="flex flex-row p-2">
                <div className="xs:w-[25%] md:w-[20%] lg:w-[15%] p-1 flex justify-center items-center">
                  <img src={val.icon} width={24} />
                </div>
                <div className="flex flex-row w-full justify-between py-2 font-semibold md:text-sm xs:text-xs">
                  <div className="flex flex-col">
                    <text>{val.title}</text>
                    {val.subtitle && <text>{val.subtitle}</text>}
                  </div>
                  <text className="text-[#ED1C24]">{val.data}</text>
                </div>
              </div>
              {val.key !== listInvitationData.length ? <hr /> : null}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCaraAjakTeman = () => {
    return (
      <>
        <div className="md:w-[50%] mb-10 xs:w-full h-full flex flex-col xs:border-b-2 md:border-b-0">
          <div
            className="w-auto flex justify-between h-auto py-2 font-bold mx-5 "
            onClick={() => setShowContent(!showContent)}
            role="button">
            <text>{trans(locale, lang, 'caraAjakTeman')}</text>
            {width < 600 ? (
              <Icon icon={showContent ? chevronUp : chevronDown} />
            ) : null}
          </div>
          {width > 600
            ? renderInviteFriends()
            : width < 600 && showContent
            ? renderInviteFriends()
            : null}
          <div
            role="button"
            className="w-auto flex flex-row justify-center bg-gradient-to-r xs:hidden md:block text-center from-[#F25D63] to-[#ED1C24] items-center h-auto rounded-[16px] shadow-xl mx-5 py-3 md:text-md xs:text-sm font-bold text-white mb-10"
            onClick={() => setAvailableOnMobile(true)}>
              <div className='flex items-center justify-center'>
                <text>
                  {trans(locale, lang, 'ajakTeman')}
                </text>
                <img src={SendWhite} className='w-5 ml-2' />
              </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="relative bg-white w-full h-auto overflow-auto">
      {renderHeader()}   

      <div className="relative w-full mb-10 md:mb-0 -top-10 flex flex-col items-center xm:px-[5%] xm:-top-16">
        <div className="w-full max-w-4xl mx-auto">
          {renderCounterFLoating()}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
