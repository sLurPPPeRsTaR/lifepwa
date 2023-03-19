import { useRouter } from 'next/router';
import locale from './locale';
import Icon from 'react-icons-kit';
import { FaqBanner } from '@cp-config/Images';
import { useState } from 'react';
import { trans } from '@cp-util/trans';
import { Button, Input, Accordion } from '@cp-component';
import { search, arrowLeft } from 'react-icons-kit/feather';
import { paperPlane } from 'react-icons-kit/fa';
import { pHelpBlack, pCall, pChat, pMail } from '@cp-config/Svgs';
import { useEffect } from 'react';

export default function pPage(props) {
  const { lang, setHospital, setFaqAsk, getFaqContent, getFaqContentResponse, getFaqContentClear, getContact, getContactResponse } = props;
  const router = useRouter();
  const [filterList, setFilterList] = useState([]);
  const [activeArrowBack, setActiveArrowBack] = useState(false);
  const [listFaqV2, setListFaqV2] = useState([]);

  useEffect(() => {
    getFaqContent({
      position: 'lifesaver',
      lang,
    })

    getContact({lang});
  }, [])

  useEffect(() => {
    if(getFaqContentResponse?.length > 0){
      getFaqContentResponse[0].attributes.faq_details.data?.map((item, idx) => {
        const data = {
          question: item?.attributes?.question,
          answer: <div dangerouslySetInnerHTML={{__html: item?.attributes?.answer}} />,
          buttonListRs: lang === 'id' ? idx === 8 ? (() => setHospital(true)) : false : idx === 7 ? (() => setHospital(true)) : false,
        }

        var el = listFaqV2.filter(function(el) {
          return el.question === item?.attributes?.question;
        });
        
        if (el.length === 0) {
          listFaqV2.push(data)
        }
      })
    }
  }, [getFaqContentResponse])

  const listFaq = [
    {
      question: trans(locale, lang, 'question1'),
      answer: trans(locale, lang, 'answer1'),
    },
    {
      question: trans(locale, lang, 'question2'),
      answer: trans(locale, lang, 'answer2'),
    },
    {
      question: trans(locale, lang, 'question3'),
      answer: trans(locale, lang, 'answer3'),
    },
    {
      question: trans(locale, lang, 'question4'),
      answer: trans(locale, lang, 'answer4'),
    },
    {
      question: trans(locale, lang, 'question5'),
      answer: trans(locale, lang, 'answer5'),
    },
    {
      question: trans(locale, lang, 'question6'),
      answer: trans(locale, lang, 'answer6'),
    },
    {
      question: trans(locale, lang, 'question7'),
      answer: trans(locale, lang, 'answer7'),
    },
    {
      buttonListRs: () => setHospital(true),
      question: trans(locale, lang, 'question8'),
      answer: trans(locale, lang, 'answer8'),
    },
    {
      question: trans(locale, lang, 'question9'),
      answer: trans(locale, lang, 'answer9'),
    },
    {
      question: trans(locale, lang, 'question10'),
      answer: trans(locale, lang, 'answer10'),
    },
    {
      question: trans(locale, lang, 'question11'),
      answer: trans(locale, lang, 'answer11'),
    },
    {
      question: trans(locale, lang, 'question12'),
      answer: trans(locale, lang, 'answer12'),
    },
    {
      question: trans(locale, lang, 'question13'),
      answer: trans(locale, lang, 'answer13'),
    },
    {
      question: trans(locale, lang, 'question14'),
      answer: trans(locale, lang, 'answer14'),
    },
    {
      question: trans(locale, lang, 'question15'),
      answer: trans(locale, lang, 'answer15'),
    },
    {
      question: trans(locale, lang, 'question16'),
      answer: trans(locale, lang, 'answer16'),
    },
    {
      question: trans(locale, lang, 'question17'),
      answer: trans(locale, lang, 'answer17'),
    },
  ];

  const setHandleFilterList = (key) => {
    const filtered = listFaqV2.filter((item) => {
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
    if (listFaqV2.length > 0) {
      setFilterList(listFaqV2);
    }
  }, [getFaqContentResponse, getFaqContent]);

  const renderContact = () => {
    return (
      <div>
        <p className='font-bold text-sm pb-8 border-b text-gray-600 md:text-sm'>{trans(locale, lang, 'kamiDisiniUntuk')}</p>
        <div className="mb-20 ">
          {getContactResponse?.data?.length > 0 ?
            (
              getContactResponse?.data?.map((val, idx) => (
                <div key={idx} className="group flex flex-col border-b">
                  <a
                    href={val.attributes?.url}
                    target="_blank"
                    className={`w-full p-4 flex flex-row justify-between my-4 duration-500 text-gray-600 rounded-md`}>
                    <div className="flex">
                      <img src={val.attributes?.icon?.imgUrl} />
                      <text className="font-black md:text-base pl-4 xs:text-sm mr-2">
                        {val.attributes?.title}
                      </text>
                    </div>
                  </a>
                  <div></div>
                </div>
              )).reverse()
            ): null}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="relative w-full bg-white md:rounded-3xl xs:min-h-[50vh] lg:min-h-[80vh] border xs:mb-5 md:mb-0">
        <div className="flex h-20 justify-between border-b-4 w-full text-center items-center">
          <div className="w-5">
            {activeArrowBack && (
              <Icon
                icon={arrowLeft}
                size={24}
                onClick={() => setActiveArrowBack(false)}
                className="ml-5 px-2 cursor-pointer
                 text-gray-600 hover:text-red-dark-red90"
              />
            )}
          </div>
          <text className="text-base md:text-lg font-bold">
            {trans(locale, lang, 'bantuan')}
          </text>
          <div className="mr-4">
            {!activeArrowBack ? (
              <img
                src={pHelpBlack}
                className="w-7 cursor-pointer"
                onClick={() => setActiveArrowBack(true)}
              />
            ) : null}
          </div>
        </div>

        <div className="relative w-full h-full pt-8 pb-10 px-3 md:px-6">
          {activeArrowBack ? (
            renderContact()
          ) : (
            <div className="relative">
              <div className="relative">
                <img src={FaqBanner} className="w-full" />
                <div className="absolute top-1/2 left-[10%] translate-y-[-50%]">
                  <p className="text-white font-bold xs:text-sm md:text-[18px] lg:text-[24px]">
                    {trans(locale, lang, 'cariTahu')}
                  </p>
                  <p className="mt-1 lg:mt-3 text-lg md:text-[24px] lg:text-[36px] font-extrabold text-white">
                    {trans(locale, lang, 'tentang')}
                  </p>
                </div>
              </div>

              <Input
                className="w-full mx-auto my-10 bg-white"
                placeholder={trans(locale, lang, 'pencarian')}
                prefixIcon={
                  <Icon
                    icon={search}
                    size={24}
                    className="mx-1 text-gray-300"
                  />
                }
                handleOnChange={(val) => {
                  setHandleFilterList(val);
                }}
              />

              <Accordion lang={lang} list={filterList} />

              <Button
                type="linear-gradient"
                full
                className="text-sm flex"
                onButtonClick={() => {
                  setFaqAsk(true);
                }}>
                {trans(locale, lang, 'ajukanPertanyaan')}
                <Icon icon={paperPlane} size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
