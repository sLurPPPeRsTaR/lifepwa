import locale from './locale';
import { trans } from '@cp-util/trans';
import moment from 'moment';
import { SyaratPrivasi } from '@cp-component';

export default function Page(props) {
  const { lang, registerDate } = props;
  moment.locale(lang);

  return (
    <div>
      <div className="relative w-full bg-white md:rounded-3xl xs:min-h-[50vh] lg:min-h-[80vh] border xs:pb-24 lg:mb-0">
        <div className="border-b-4 py-6 w-full text-center">
          <text className="text-lg font-bold xm:text-sm ">
            {trans(locale, lang, 'title')}
          </text>
        </div>
        <div className="flex justify-center items-center md:pt-5 xs:pt-10">
          <div className="w-[90%] flex flex-col">
            <div>
              <p className="font-bold mb-6 xm:text-sm">
                {trans(locale, lang, 'selamatDatang')}
              </p>
              <p className="xm:text-sm">
                {trans(locale, lang, 'terdaftar')}
                <span className="font-bold">
                  {moment(registerDate).format('DD MMMM YYYY, HH.mm')}
                  {trans(locale, lang, 'wib')}
                </span>
              </p>
            </div>
            <div>
              <SyaratPrivasi />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
