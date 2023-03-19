import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';

import { Button, Container, Modal } from '@cp-component';
import {
  IlustrationLanding1,
  IlustrationLanding2,
  IlustrationLanding3,
} from '@cp-config/Images';
import {
  ChevronDown,
  ChevronUp,
  Close,
  Frame449,
  Frame450,
  Frame577,
} from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import locale from './locale';
import { NAVIGATION } from '@cp-util/constant';

export default function Page({ lang, setLang, setFirstLoad }) {
  const router = useRouter();

  // Constant
  const languageList = [
    {
      key: 'id',
      text: 'INDONESIA',
      icon: <Image src={Frame449} width={24} height={24} />,
    },
    {
      key: 'en',
      text: 'ENGLISH',
      icon: <Image src={Frame450} width={24} height={24} />,
    },
  ];

  const [isLangButtonActive, setLangButtonActive] = useState(false);
  const [isModalLangActive, setModalLangActive] = useState(false);
  const [currentLang, setCurrentLang] = useState(lang);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  // Banner Content
  function renderHeader() {
    return (
      <div
        role="button"
        className="absolute top-4 md:top-10 right-4 md:right-10 shadow w-max px-2 py-1 rounded-lg">
        <div
          role="button"
          onClick={() => {
            setLangButtonActive(true);
            setModalLangActive(true);
          }}
          className="flex items-center gap-2">
          <Image
            src={lang === 'id' ? Frame449 : Frame450}
            width={24}
            height={24}
          />
          <div className="text-body2 font-semibold">
            {lang === 'id' ? 'IND' : 'ENG'}
          </div>
          <Image
            src={!isLangButtonActive ? ChevronDown : ChevronUp}
            width={24}
            height={24}
          />
        </div>
      </div>
    );
  }

  function renderSlider() {
    const data = [
      {
        image: IlustrationLanding1,
        title: trans(locale, lang, 'selamatDatangSahabat'),
        description: trans(locale, lang, 'melindungiDenganEasy'),
      },
      {
        image: IlustrationLanding2,
        title: trans(locale, lang, 'maauCekApapun'),
        description: trans(locale, lang, 'gampangBangetCek'),
      },
      {
        image: IlustrationLanding3,
        title: trans(locale, lang, 'byeByeHal'),
        description: trans(locale, lang, 'pengkinianDataTinggal'),
      },
    ];

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      nextArrow: <></>,
      prevArrow: <></>,
    };

    return (
      <div className="mt-16 md:mt-24 mb-10 md:mb-14">
        <Slider {...settings}>
          {data?.map((slide, index) => {
            return (
              <div key={index}>
                <div className="flex justify-center">
                  <img
                    src={slide?.image}
                    alt="WHY NOT RUNNNING"
                    width={340}
                    height={314}
                  />
                </div>
                <div className="text-center">
                  <div className="text-h5 font-bold mt-6 mb-1 text-neutral-light-neutral60">
                    {slide?.title}
                  </div>
                  <div className="text-body2 font-medium text-mediumGray-light-mediumGray">
                    {slide?.description}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }

  function renderButton() {
    return (
      <div className="flex justify-around gap-4 md:gap-8 items-center py-4 mt-4">
        <Button
          onButtonClick={() => router.push({ pathname: '/' })}
          outline
          shadow>
          {trans(locale, lang, 'lewati')}
        </Button>
        <Button
          onButtonClick={() => {
            router.push({
              pathname: NAVIGATION.REGISTER.Register,
            });
          }}
          type="linear-gradient"
          shadow>
          {trans(locale, lang, 'daftar')}
        </Button>
      </div>
    );
  }

  function renderFooterContainer() {
    return (
      <div className="flex justify-center items-center mt-6 mb-12">
        <div className="flex gap-2 text-body2 text-mediumGray-light-mediumGray font-semibold">
          {trans(locale, lang, 'sudahPunyaAkun')}{' '}
          <div
            role="button"
            onClick={() =>
              router.push({
                pathname: NAVIGATION.LOGIN.Login,
              })
            }
            className="text-body-2 text-primary-dark-primary90 font-semibold underline">
            {trans(locale, lang, 'masuk')}
          </div>
        </div>
      </div>
    );
  }

  function renderModalLang() {
    return (
      <Modal
        isOpen={isModalLangActive}
        toggle={() => setModalLangActive(false)}>
        <div className="w-full flex gap-2 items-center text-start text-body1 font-bold mb-4">
          <div role="button" onClick={() => setModalLangActive(false)}>
            <Image src={Close} width={32} height={32} />
          </div>
          {trans(locale, lang, 'pilihBahasa')}
        </div>
        <div className="flex flex-col gap-4 mb-6">
          {languageList.map((e) => {
            return (
              <div
                key={e?.key}
                role="button"
                onClick={() => setCurrentLang(e?.key)}
                className="flex justify-between items-center px-2 py-2 rounded-lg border">
                <div className="flex gap-2 ">
                  {e?.icon}
                  {e?.text}
                </div>
                {currentLang === e?.key ? (
                  <Image src={Frame577} width={24} height={24} />
                ) : (
                  <div className="rounded-full w-6 h-6 border" />
                )}
              </div>
            );
          })}
        </div>
        <Button
          type="linear-gradient"
          onButtonClick={() => {
            setLang(currentLang);
            setLangButtonActive(false);
            setModalLangActive(false);
          }}
          shadow
          full>
          {trans(locale, lang, 'pilihBahasa')}
        </Button>
      </Modal>
    );
  }

  return (
    <>
      <Container className="relative px-4 md:px-8">
        {renderHeader()}
        {renderSlider()}
        {renderButton()}
        {renderFooterContainer()}
      </Container>
      {renderModalLang()}
    </>
  );
}
