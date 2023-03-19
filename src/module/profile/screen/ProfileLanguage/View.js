import { useRouter } from 'next/router';
import locale from './locale';
import Icon from 'react-icons-kit';
import { EngFlag, IndoFlag } from '@cp-config/Images';
import { Button, Modal } from '@cp-component';
import { trans } from '@cp-util/trans';
import { useState } from 'react';
import { arrowLeft } from 'react-icons-kit/feather';
import { checkmarkCircled, iosCircleOutline } from 'react-icons-kit/ionicons';

// const lang = 'id';

export default function Page(props) {
  const router = useRouter();
  const { lang, setLang } = props;
  const [showModal, setShowModal] = useState(false);
  const [activeLang, setActiveLang] = useState(lang);
  const [currentLang, setCurrentLang] = useState(lang);

  const languageList = [
    {
      key: 0,
      label: trans(locale, lang, 'indonesia'),
      flag: IndoFlag,
      value: 'id',
    },
    {
      key: 1,
      label: trans(locale, lang, 'english'),
      flag: EngFlag,
      value: 'en',
    },
  ];

  const renderList = () => {
    return (
      <div className="w-full">
        {languageList.map((val, idx) => (
          <div key={idx}>
            <div
              key={val.key}
              onClick={() => {
                if (lang !== val.value) {
                  setCurrentLang(val.value);
                  setShowModal(true);
                }
              }}
              className="cursor-pointer p-4 w-full bg-white my-4 flex items-center justify-between rounded-md hover:bg-red-light-red20">
              <div className="flex items-center">
                <img src={val.flag} />
                <text className="font-medium xs:text-base md:text-lg my-auto ml-4">
                  {val.label}
                </text>
              </div>
              <Icon
                icon={
                  activeLang == val.value ? checkmarkCircled : iosCircleOutline
                }
                size={30}
                className={
                  activeLang == val.value ? 'text-green-500' : ' text-gray-700'
                }
              />
            </div>
            <span className="w-full block border-b"></span>
          </div>
        ))}
      </div>
    );
  };

  const setLanguage = (lang) => {
    setLang(lang);
  };

  const confirmModal = () => {
    return (
      <Modal isOpen={showModal} className="relative">
        <div className="flex flex-col p-3">
          <p className="mt-10 font-bold text-lg text-center">
            {trans(locale, lang, 'confirmMsg')}
          </p>

          <p className="mb-10 opacity-70 text-center">
            {trans(locale, lang, 'confirmMsg2')}
          </p>

          <Button
            type="outline"
            bordered
            outline
            shadow
            full
            onButtonClick={() => setShowModal(false)}>
            {trans(locale, lang, 'cancelBtn')}
          </Button>

          <div className="mt-4">
            <Button
              type="linear-gradient"
              shadow
              full
              onButtonClick={() => {
                setActiveLang(currentLang);
                setLanguage(currentLang);
                setShowModal(false);
              }}>
              {trans(locale, lang, 'confirmBtn')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <div className="relative w-full bg-white md:rounded-3xl xs:h-[50vh] lg:min-h-[80vh] border xs:pb-24 lg:mb-0">
        <div className="border-b-4 py-6 w-full text-center">
          <text className="text-lg font-bold">
            {trans(locale, lang, 'bahasa')}
          </text>
        </div>
        <div className="flex justify-center items-center md:pt-20 xs:pt-10">
          <div className="w-[90%] flex flex-col pb-64">
            {renderList()}
            {/* <Button className='mt-64 p-4' type="linear-gradient" shadow full onButtonClick={() => setLanguage(currentLang)}>{trans(locale, lang, 'pilihBahasa')}</Button> */}
          </div>
        </div>
        {confirmModal()}
      </div>
    </div>
  );
}
