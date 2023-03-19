import { useRouter } from 'next/router';

import { Modal } from '@cp-component';

import 'swiper/css';
import 'swiper/css/pagination';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Icon from 'react-icons-kit';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { lifeIdRed } from '@cp-config/Images';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { facebook } from 'react-icons-kit/fa';
import { instagram } from 'react-icons-kit/fa';
import { twitter } from 'react-icons-kit/fa';
import { whatsapp } from 'react-icons-kit/fa';
import { useEffect, useState } from 'react';
import clsx from 'classnames';
import { close } from 'react-icons-kit/fa';


export default function Component({ lang, getListReferral, getListReferralResponse, isOpen, setClose, className, setReferral, getProfileReferral, getProfileReferralResponse }) {
  const router = useRouter();
  const [referralContent, setReferralContent] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getListReferral();
      getProfileReferral();
    }
  }, [isOpen]);

  useEffect(() => {
    if (getListReferralResponse?.data?.length > 0) {
      let content = getListReferralResponse?.data?.filter((val) => val.id === 3 || val.id === 2)
      setReferralContent(content)
    }
  }, [getListReferralResponse])

  const swiperOption=  {
    slidesPerView: 1.5,
    spaceBetween: 2,
};

  const renderReferralCard = (item) => {
    return (
      <div className='flex p-4 bg-white md:w-[95%] xs:w-36 xm:w-[90%] h-auto pb-5 mb-16 mt-20 border shadow-xl rounded-3xl'>
        <div className='flex w-full flex-col items-center'>
          <div className='w-full border-b-2 flex justify-center items-center'>
            <img src={lifeIdRed} width={74} />
          </div>
          <div className='w-full rounded-3xl bg-red-200 xm:h-64 xs:h-48 mt-4'>
            <img src={item.attributes.Image.data.attributes.url} className='h-full w-full' />
          </div>
          <text className='mt-2 text-sm xs:text-xs font-medium text-start w-full'>
            {trans(locale, lang, 'daftarDengan')}
          </text>
          <span className='text-sm xs:text-xs font-bold text-start w-full'>{getProfileReferralResponse?.data?.referralCode}</span>
        </div>
      </div>
    )
  }

  const renderHeader = () => {
    return(
      <div className='flex flex-row justify-between items-center p-4 bg-white shadow-md'>
        <div className=''>
          <Icon
            icon={close}
            size={24}
            onClick={() => setReferral(false)}
          />
        </div>
        <div className='font-semibold'>
          {trans(locale, lang, 'kodeSaya')}
        </div>
        <div>
        </div>
      </div>
    )
  }

  const renderMain = () => {
    return(
      <div className='w-full flex items-center'>
        <Swiper
          {...swiperOption}
          pagination={{
            clickable: true,
            bulletActiveClass: 'swiper-sorotan-pagination-bullet-active',
            type: 'bullets',
            modifierClass: 'swiper-article-pagination-position-',
            bulletClass: 'swiper-sorotan-pagination-bullets',
        }}
          className='w-[90%] h-auto'
          modules={[Pagination]}>
          {referralContent.length > 0 ? (
            referralContent.map((val, idx) => {
              return (
                <SwiperSlide key={idx}>
                  {renderReferralCard(val)}
                </SwiperSlide>
              )
            })
          ) : null}
        </Swiper>
      </div>
    )
  }

  const shareList = [
    {
      id: 1,
      icon: facebook,
    },
    {
      id: 2,
      icon: instagram,
    },
    {
      id: 3,
      icon: twitter,
    },
    {
      id: 4,
      icon: whatsapp,
    }
  ]

  const renderFooter = () => {
    return(
      <div className='flex flex-col justify-center items-center p-4'>
        <text className='font-semibold'>{trans(locale, lang, 'bagikan')}</text>
        <div className='grid grid-cols-4 gap-10 my-4'>
          {shareList.map((val,idx) => (
            <div key={idx} className='xs:p-1 xm:p-2 bg-red-500 rounded-full flex items-center justify-center'>
              <Icon icon={val.icon} className='text-white' size={24} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => setClose(false)}
      className={clsx('z-50 bg-[#FCFDFF]', className)}
      size="md"
      noPadding>
        {renderHeader()}
        {renderMain()}
        {renderFooter()}
    </Modal>
  );
}
