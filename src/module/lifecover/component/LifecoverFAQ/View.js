import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Input, Accordion } from '@cp-component';
import { search } from 'react-icons-kit/feather';
import { trans } from '@cp-util/trans';
import { LifecoverBannerFAQ, LifecoverLogoDarkLg } from '@cp-config/Images';
import { LifecoverIconFAQ } from '@cp-config/Svgs';
import { paperPlane } from 'react-icons-kit/fa';
import locale from './locale';
import BaseLayout from '../BaseLayout';

export default function Page(props) {
  const { lang, setFaqAsk } = props;
  const router = useRouter();
  const [filterList, setFilterList] = useState([]);

  const translate = (e) => trans(locale, lang, e);

  const listFaq = [
    { question: translate('question1'), answer: translate('answer1') },
    { question: translate('question2'), answer: translate('answer2') },
    { question: translate('question3'), answer: translate('answer3') },
    { question: translate('question4'), answer: translate('answer4') },
    {
      question: translate('question5'),
      answer: translate('answer5'),
      buttonLandingLC: () => router.back(),
    },
    { question: translate('question6'), answer: translate('answer6') },
    { question: translate('question7'), answer: translate('answer7') },
    {
      question: translate('question8'),
      answer: translate('answer8'),
    },
  ];

  const setHandleFilterList = (key) => {
    const filtered = listFaq?.filter((item) => {
      return Object.keys(item).some((prop) => {
        return (
          item[prop]
            .toString()
            .toLowerCase()
            .indexOf(key.toString().toLowerCase()) > -1
        );
      });
    });

    setFilterList(filtered);
  };

  useEffect(() => {
    setFilterList(listFaq);
  }, []);

  return (
    <BaseLayout title={translate('FAQ')}>
      <div className="relative    xs:min-h-[50vh] lg:min-h-screen w-full mb-28">
        <div className="w-full max-w-4xl mx-auto px-3 xs:px-0 md:px-5">
          <div className="relative  h-full  py-7 px-3  bg-white rounded-3xl shadow-xl md:px-6">
            <div className="relative">
              <img src={LifecoverBannerFAQ} className="w-full" />
              <div className="absolute w-full  items-center gap-10 xs:gap-2 flex justify-between top-1/2 left-[10%] translate-y-[-50%]">
                <div className=" w-full">
                  <p className="text-white font-bold  xs:text-[10px] xm:text-sm md:text-lg ld:text-2xl lg:text-2xl">
                    {trans(locale, lang, 'title')}
                  </p>
                  <img
                    src={LifecoverLogoDarkLg}
                    alt="Lifecover"
                    className="w-60 xs:w-20 xm:w-28 md:w-52 lg:mt-3 md:mt-2 xm:mt-2 xs:mt-0 "
                  />
                </div>
                <div className="w-full">
                  <img
                    src={LifecoverIconFAQ}
                    alt="IconLifeCOVER"
                    className="w-56 xs:w-14 xm:w-20 md:w-48  xs:ml-6"
                  />
                </div>
              </div>
            </div>

            <Input
              className="w-full mx-auto my-10 xs:my-4 xm:my-6 md:my-8 bg-white"
              placeholder={trans(locale, lang, 'pencarian')}
              prefixIcon={
                <Icon icon={search} size={24} className="mx-1 text-gray-300" />
              }
              handleOnChange={(val) => {
                setHandleFilterList(val);
              }}
            />

            <Accordion lang={lang} list={filterList} />

            {filterList?.length == 0 && (
              <p className="pt-32 pb-20 text-center text-base md:text-lg">
                {trans(locale, lang, 'pencarianNull')}
              </p>
            )}

            <div className="fixed bottom-5 left-1/2  max-w-4xl w-full  flex -translate-x-1/2 px-3 md:px-5">
              <Button
                type="linear-gradient"
                full
                className="text-sm"
                onButtonClick={() => {
                  setFaqAsk(true);
                }}>
                {trans(locale, lang, 'btnTanya')}
                <Icon icon={paperPlane} size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
