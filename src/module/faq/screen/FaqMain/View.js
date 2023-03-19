import { useRouter } from 'next/router';
import locale from './locale';
import Icon from 'react-icons-kit';
import { useEffect, useState } from 'react';
import { trans } from '@cp-util/trans';
import { FaqBanner } from '@cp-config/Images';
import { search } from 'react-icons-kit/feather';
import { paperPlane } from 'react-icons-kit/fa';
import { Button, Accordion, Input, HeaderPage } from '@cp-component';

export default function Page(props) {
  const router = useRouter();
  const { lang, setHospital, setFaqAsk, getFaqContent, getFaqContentResponse, getFaqContentClear } = props;
  const [filterList, setFilterList] = useState([]);
  const [listFaqV2, setListFaqV2] = useState([]);

  const translate = (e) => trans(locale, lang, e);

  useEffect(() => {
    getFaqContent({
      position: 'lifesaver',
      lang,
    })
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
      question: translate('question1'),
      answer: translate('answer1'),
    },
    {
      question: translate('question2'),
      answer: translate('answer2'),
    },
    {
      question: translate('question3'),
      answer: translate('answer3'),
    },
    {
      question: translate('question4'),
      answer: translate('answer4'),
    },
    {
      question: translate('question5'),
      answer: translate('answer5'),
    },
    {
      question: translate('question6'),
      answer: translate('answer6'),
    },
    {
      question: translate('question7'),
      answer: translate('answer7'),
    },
    {
      buttonListRs: () => setHospital(true),
      question: translate('question8'),
      answer: translate('answer8'),
    },
    {
      question: translate('question9'),
      answer: translate('answer9'),
    },
    {
      question: translate('question10'),
      answer: translate('answer10'),
    },
    {
      question: translate('question11'),
      answer: translate('answer11'),
    },
    {
      question: translate('question12'),
      answer: translate('answer12'),
    },
    {
      question: translate('question13'),
      answer: translate('answer13'),
    },
    {
      question: translate('question14'),
      answer: translate('answer14'),
    },
    {
      question: translate('question15'),
      answer: translate('answer15'),
    },
    {
      question: translate('question16'),
      answer: translate('answer16'),
    },
    {
      question: translate('question17'),
      answer: translate('answer17'),
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
  }, [getFaqContentResponse]);

  return (
    <>
      <HeaderPage
        title={trans(locale, lang, 'bantuan')}
        isHelp={true}
        onClickBack={() => {
          getFaqContentClear();
          router.back();
        }}
      />
      <div className="relative w-full bg-white md:rounded-3xl xs:min-h-[50vh] lg:min-h-[80vh] border mb-12">
        <div className="w-full max-w-4xl mx-auto px-3 md:px-5">
          <div className="relative -top-16 h-full py-7 px-3  bg-white rounded-3xl shadow-xl md:px-6">
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

            <div className="fixed bottom-5 left-1/2 max-w-4xl w-full flex -translate-x-1/2 px-3 md:px-5">
              <Button
                type="linear-gradient"
                full
                className="text-sm"
                onButtonClick={() => {
                  setFaqAsk(true);
                }}>
                {trans(locale, lang, 'ajukanPertanyaan')}
                <Icon icon={paperPlane} size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
