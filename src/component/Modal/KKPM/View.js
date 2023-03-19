import _ from 'lodash';
import moment from 'moment';
import locale from './locale';
import { trans } from '@cp-util/trans';
import { Modal, Button } from '@cp-component';
import { KkpmReminder } from '@cp-config/Images';
import { setFormatDate } from '@cp-util/common';
import 'moment/locale/id';

export default function Component(props) {
  const {
    lang,
    token,
    isOpen,
    setClose,
    _state,
    anuitasPrimaFlag,
    anuitasRetailFlag,
    onClickAnuitasPrima,
    onClickAnuitasRetail,
    isUpdataModalAlreadyShowed,
  } = props;

  moment.locale(lang);
  const translate = (el) => trans(locale, lang, el);

  function HandleBodyText(props) {
    const { lang, flag, flag2, policyName, policyName2 } = props;

    if (!flag2 && flag?.isIssuedPolicy && flag?.issuedPolicyLastDate === null) {
      return (
        <p className="text-xs md:text-sm lg:text-base">
          {trans(locale, lang, 'kamuBelumPernahMelakukan')}{' '}
          <span className="font-bold">{policyName}</span>
          {trans(locale, lang, 'agarManfaatKamuTetap')}
        </p>
      );
    }

    if (!flag2 && flag?.isIssuedPolicy && flag?.issuedPolicyLastDate !== null) {
      return (
        <p className="text-xs md:text-sm lg:text-base">
          {trans(locale, lang, 'kamuTerakhirMelakukan')}
          <span className="font-bold">{policyName}</span>
          {trans(locale, lang, 'tanggal')}
          <span className="font-bold">
            {moment(flag?.issuedPolicyLastDate).format('DD MMMM YYYY')}.
          </span>{' '}
          {trans(locale, lang, 'agarManfaatKamu')}
        </p>
      );
    }

    if (
      flag2 &&
      flag?.issuedPolicyLastDate !== null &&
      flag2?.issuedPolicyLastDate !== null
    ) {
      const tanggal = trans(locale, lang, 'tanggal');
      const list1 = (
        <>
          {' - '}
          <span className="font-bold">{policyName}</span>
          {tanggal}
          <span className="font-bold">
            {moment(flag?.issuedPolicyLastDate).format('DD MMMM YYYY')}.
          </span>
        </>
      );

      const list2 = (
        <>
          {' - '}
          <span className="font-bold">{policyName2}</span>
          {tanggal}
          <span className="font-bold">
            {moment(flag?.issuedPolicyLastDate).format('DD MMMM YYYY')}.
          </span>
        </>
      );
      return (
        <div className="text-xs md:text-sm lg:text-base">
          <p>{trans(locale, lang, 'kamuTerakhirMelakukanKonfirmasi')}</p>
          <p className="py-1">
            {list1} <br />
            {list2}
          </p>
          <p>{trans(locale, lang, 'agarManfaatKamu')}</p>
        </div>
      );
    }

    if (
      flag2 &&
      flag?.issuedPolicyLastDate === null &&
      flag2.issuedPolicyLastDate === null
    ) {
      return (
        <div className="text-xs md:text-sm lg:text-base">
          <p>
            {trans(locale, lang, 'kamuBelumPernahMelakukan')} {':'}
          </p>
          <p className="py-1">
            <span className="font-semibold">- {policyName}</span>
            <br />
            <span className="font-semibold">- {policyName2}</span>
            <br />
          </p>
          <p>{trans(locale, lang, 'agarManfaatKamu')}</p>
        </div>
      );
    }

    if (flag2) {
      const tanggal =
        flag.issuedPolicyLastDate !== null ? (
          <>
            {trans(locale, lang, 'tanggal')}
            {moment(flag?.issuedPolicyLastDate).format('DD MMMM YYYY')}.
          </>
        ) : (
          ''
        );
      const tanggal2 =
        flag2.issuedPolicyLastDate !== null ? (
          <>
            {trans(locale, lang, 'tanggal')}
            <span className="font-bold">
              {moment(flag2?.issuedPolicyLastDate).format('DD MMMM YYYY')}.
            </span>
          </>
        ) : (
          ''
        );
      const title =
        flag?.issuedPolicyLastDate !== null
          ? trans(locale, lang, 'kamuTerakhirMelakukanKonfirmasi')
          : `${trans(locale, lang, 'kamuBelumPernahMelakukan')}:`;
      const title2 =
        flag2?.issuedPolicyLastDate !== null
          ? trans(locale, lang, 'kamuTerakhirMelakukanKonfirmasi')
          : `${trans(locale, lang, 'kamuBelumPernahMelakukan')}:`;
      const list = (
        <>
          <span className="font-bold">- {policyName}</span> {tanggal}
        </>
      );
      const list2 = (
        <>
          <span className="font-bold">- {policyName2}</span> {tanggal2}
        </>
      );

      return (
        <div className="text-xs md:text-sm lg:text-base">
          <p>{title}</p>
          <p>{list}</p>
          <p>{title2}</p>
          <p>{list2}</p>
          <p className="pt-1">{trans(locale, lang, 'agarManfaatKamu')}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <Modal
      size="md"
      className="relative mt-14"
      isOpen={isOpen && !isUpdataModalAlreadyShowed && token}>
      <div className="absolute -top-24 w-full flex justify-center mb-6 md:-top-40">
        <img
          src={KkpmReminder}
          className="relative mx-auto -left-4 w-3/5 md:w-2/5"
        />
      </div>

      <div className="lg:px-5">
        <div className="pt-4 text-center text-base text-neutral-light-neutral90 font-bold mt-16 mb-4 xm:pt-14 lg:text-lg">
          {translate('konfirmasiKeabsahanPenerimaManfaat')}
        </div>
        {anuitasPrimaFlag?.isIssuedPolicy &&
          !anuitasRetailFlag?.isIssuedPolicy && (
            <HandleBodyText
              lang={lang}
              flag={anuitasPrimaFlag}
              policyName={_state[anuitasPrimaFlag?.policyType].policyName}
            />
          )}
        {!anuitasPrimaFlag?.isIssuedPolicy &&
          anuitasRetailFlag?.isIssuedPolicy && (
            <HandleBodyText
              lang={lang}
              flag={anuitasRetailFlag}
              policyName={_state[anuitasRetailFlag?.policyType].policyName}
            />
          )}
        {anuitasPrimaFlag?.isIssuedPolicy &&
          anuitasRetailFlag?.isIssuedPolicy && (
            <HandleBodyText
              lang={lang}
              flag={anuitasPrimaFlag}
              flag2={anuitasRetailFlag}
              policyName={_state[anuitasPrimaFlag?.policyType].policyName}
              policyName2={_state[anuitasRetailFlag?.policyType].policyName}
            />
          )}

        <Button
          className="mb-2 mt-3 text-xs !h-10 xm:mb-3 md:mb-4 xm:mt-6 md:text-base lg:!h-11"
          outline
          onButtonClick={setClose}
          full>
          {translate('lewatiPengkinian')}
        </Button>

        {anuitasPrimaFlag?.isIssuedPolicy && (
          <Button
            className="px-2 mb-2 text-xs text-center !h-10 xm:px-0 xm:mb-3 md:mb-4 md:text-base lg:!h-11"
            type="linear-gradient"
            onButtonClick={onClickAnuitasPrima}
            shadow
            full>
            {translate('mulaiKonfirmasiKeabsahan')}{' '}
            {_state[anuitasPrimaFlag?.policyType].policyName}
          </Button>
        )}
        {anuitasRetailFlag?.isIssuedPolicy && (
          <Button
            className="px-2 text-center text-xs !h-10 xm:px-0 xm:mb-3 md:mb-4 md:text-base lg:!h-11"
            type="linear-gradient"
            onButtonClick={onClickAnuitasRetail}
            shadow
            full>
            {translate('mulaiKonfirmasiKeabsahan')}{' '}
            {_state[anuitasRetailFlag?.policyType].policyName}
          </Button>
        )}
      </div>
    </Modal>
  );
}
