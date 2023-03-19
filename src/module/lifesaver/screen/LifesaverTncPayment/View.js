import Icon from 'react-icons-kit';
import locale from './locale';
import { trans } from '@cp-util/trans';
import { Container, Modal } from '@cp-component';
import { androidArrowBack } from 'react-icons-kit/ionicons';

export default function Page({ lang, setShowPaymentTnc, showPaymentTnc }) {
  const wordings = [
    {
      no: 1,
      text: 'bertanggungJawabUntuk',
    },
    {
      no: 2,
      text: 'saudaraMenjaminBahwa',
    },
    {
      no: 3,
      text: 'saudaraSetujuDengan',
    },
    {
      no: 4,
      text: 'saudaraMengizinkan',
    },
    {
      no: 5,
      text: 'sesuaiKetentuan',
    },
    {
      no: 6,
      text: 'untukMelindungiInformasi',
    },
    {
      no: 7,
      text: 'pendebitanAkanDilakukan',
    },
    {
      no: 8,
      text: 'ifgTidakMenerbitkan',
    },
    {
      no: 9,
      text: 'ifgLifeBerhak',
    },
    {
      no: 10,
      text: 'saudaraSetujuJikaBatas',
    },
    {
      no: 11,
      text: 'jikaKartu',
    },
    {
      no: 12,
      text: 'jikaTerdapatBiaya',
    },
  ];
  return (
    <Modal isOpen={showPaymentTnc} size="full">
      <Container
        noBackground
        fullScreen
        className="max-h-screen overflow-y-scroll">
        <div className="fixed top-0 left-0 w-full bg-white border-b py-4 font-bold flex justify-center mb-4">
          <div className="flex w-full px-[5%] justify-between items-center">
            <div
              role="button"
              onClick={() => setShowPaymentTnc(false)}
              className="">
              <Icon icon={androidArrowBack} size={24} />
            </div>
            <p className="text-body1 font-bold">
              {trans(locale, lang, 'title')}
            </p>
            <div></div>
          </div>
        </div>
        <div className="w-full max-w-3xl mx-auto py-20 md:py-28 px-4">
          <ul className="list-outside list-decimal text-sm leading-6">
            {wordings.map((val) => (
              <li className='pb-5' key={val.no}>
                {trans(locale, lang, val.text)}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Modal>
  );
}
