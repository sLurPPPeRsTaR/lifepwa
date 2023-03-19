import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Container, Button, Modal, Input, Accordion } from '@cp-component';
import { androidArrowBack } from 'react-icons-kit/ionicons';
import { cloud_download } from 'react-icons-kit/ikons';
import { search } from 'react-icons-kit/feather';
import { trans } from '@cp-util/trans';
import { FaqBannerLifesaver, LifeSaver } from '@cp-config/Images';
import locale from './locale';

export default function Page(props) {
  const { lang, setFaqAsk, setHospital, showModalLsFaq, setShowModalLsFaq } =
    props;
  const router = useRouter();
  const [filterList, setFilterList] = useState();

  const translate = (val) => trans(locale, lang, val);

  const listFaq = [
    { question: translate('quest1'), answer: translate('answer1') },
    { question: translate('quest2'), answer: translate('answer2') },
    { question: translate('quest3'), answer: translate('answer3') },
    { question: translate('quest4'), answer: translate('answer4') },
    { question: translate('quest5'), answer: translate('answer5') },
    { question: translate('quest6'), answer: translate('answer6') },
    { question: translate('quest7'), answer: translate('answer7') },
    {
      question: translate('quest8'),
      answer: translate('answer8'),
      buttonListRs: () => setHospital(true),
    },
    { question: translate('quest9'), answer: translate('answer9') },
    { question: translate('quest10'), answer: translate('answer10') },
    { question: translate('quest11'), answer: translate('answer11') },
    { question: translate('quest12'), answer: translate('answer12') },
    { question: translate('quest13'), answer: translate('answer13') },
    { question: translate('quest14'), answer: translate('answer14') },
    { question: translate('quest15'), answer: translate('answer15') },
    { question: translate('quest16'), answer: translate('answer16') },
    { question: translate('quest17'), answer: translate('answer17') },
  ];

  const setHandleFilterList = (key) => {
    const filtered = listFaq.filter((item) => {
      return item.question.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });

    setFilterList(filtered);
  };

  useEffect(() => {
    setFilterList(listFaq);
  }, []);

  const renderList = () => {
    return (
      <div className="pb-28 divide-y ">
        <Accordion lang={lang} list={filterList} />

        {filterList?.length == 0 && (
          <p className="pt-32 pb-20 text-center text-base md:text-lg">
            {trans(locale, lang, 'pencarianNull')}
          </p>
        )}
      </div>
    );
  };

  const renderBanner = () => {
    return (
      <div className="relative mt-8">
        <img src={FaqBannerLifesaver} className="w-full" />
        <div className="absolute top-1/2 left-[10%] translate-y-[-50%]">
          <p className="text-white font-bold text-xs xm:text-sm md:text-3xl">
            {trans(locale, lang, 'title')}
          </p>
          <img src={LifeSaver} className="mt-2 h-3 xm:h-5 md:mt-4 md:h-10" />
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={showModalLsFaq} size="full">
      <Container
        noBackground
        fullScreen
        className="max-h-screen overflow-y-scroll">
        <div className="fixed top-0 z-20 left-0 w-full bg-white border-b py-4 font-bold flex justify-center mb-4">
          <div className="flex w-full px-[5%] justify-between items-center">
            <div
              role="button"
              onClick={() => setShowModalLsFaq(false)}
              className="">
              <Icon icon={androidArrowBack} size={24} />
            </div>
            <p className="text-xs xm:text-body1 font-bold">
              {trans(locale, lang, 'FAQ')}
            </p>
            <a
              href="https://www.life.id/api/v1/public/assets/cfc6e784-0b82-4565-9d8f-d8f61883abe3.pdf"
              target="_blank">
              <Icon icon={cloud_download} size={24} />
            </a>
          </div>
        </div>

        <div className="relative w-full z-10 max-w-[960px] mx-auto pt-10 px-2 bg-white xm:px-4">
          {renderBanner()}
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

          {renderList()}

          <div className="fixed bottom-5 left-0 px-[5%] w-full">
            <Button
              type="linear-gradient"
              full
              className="w-full max-w-md mx-auto text-sm"
              onButtonClick={() => {
                setFaqAsk(true);
                // setShowModalLsFaq(false);
              }}>
              {trans(locale, lang, 'btnTanya')}
            </Button>
          </div>
        </div>
      </Container>
    </Modal>
  );
}
