import locale from './locale';
import { trans } from '@cp-util/trans';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import {
  Lifetag,
  Deliver,
  LifetagBlacknWhite,
  LifetagAccessFailed,
  LifetagScan,
} from '@cp-config/Images';
import { Button } from '@cp-component';
import { NAVIGATION } from '@cp-util/constant';

export default function Page(props) {
  const {
    lang,
    getCurrentSubsResponse,
    getLifetagFlag,
    getLifetagFlagResponse,
    getLifetagLinkedList,
    getLifetagLinkedListResponse,
    getPoliciesResponse,
    userData,
  } = props;

  const router = useRouter();
  const translate = (val) => trans(locale, lang, val);

  useEffect(() => {
    getLifetagFlag();
    getLifetagLinkedList();
  }, []);

  const lifetagLinkedList = useMemo(() => {
    return getLifetagLinkedListResponse?.data || [];
  }, [getLifetagLinkedListResponse?.data]);

  const isSubscribed = useMemo(() => {
    return getCurrentSubsResponse?.isSubscribe;
  }, [getCurrentSubsResponse?.isSubscribe]);

  const isGracePeriod = useMemo(() => {
    return getCurrentSubsResponse?.status === 'GRACE_PERIOD';
  }, [getCurrentSubsResponse?.status]);

  const lifetagFlag = useMemo(() => {
    return getLifetagFlagResponse?.data;
  }, [getLifetagFlagResponse?.data]);

  const lifesaverPolicies = useMemo(() => {
    return getPoliciesResponse?.data?.filter((item) => item?.source === '001');
  }, [getPoliciesResponse?.data]);

  // Banner Content
  const renderHeader = () => {
    return (
      <div className="flex justify-center border-b-4 py-6 w-full">
        <p className="text-sm md:text-base font-bold">
          {trans(locale, lang, 'mainTitle')}
        </p>
      </div>
    );
  };

  const renderHaveLifetag = ({}) => {
    if (lifetagLinkedList.length !== 0 && isSubscribed && !isGracePeriod) {
      return lifetagLinkedList.map((item, idx) => (
        <div
          idx={idx}
          role="button"
          className="border rounded-2xl shadow-md px-3 py-5 w-full md:p-5"
          onClick={() => {
            router.push(
              {
                pathname: NAVIGATION.LIFETAG.LifetagMain,
                query: { lifetagId: item?.lifeTagCode },
              },
              NAVIGATION.LIFETAG.LifetagMain,
            );
            setIsComingFromScreen({ fromProfileMenuLifetag: true });
          }}>
          <div className="flex items-center border-b pb-2">
            <img
              src={item?.productImage}
              className="h-14 w-14 md:h-20 md:w-20"
            />
            <div className="pl-3 md:pl-4">
              <p className="font-bold text-xs md:text-base">
                {item?.productName}
              </p>
              <p className="text-xs pt-1 md:text-sm capitalize">{item?.name}</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 font-semibold text-xs pt-4 md:text-sm md:gap-y-1">
            {item?.emergencyContact.map((e, i) => (
              <div
                key={i}
                className="flex justify-between items-start gap-y-1 md:items-center flex-col md:flex-row">
                <p className="text-gray-400">
                  {translate('nomorTeleponDarurat')}
                  {i + 1 > 1 ? i + 1 : ''}
                </p>
                <p className="text-gray-800">{e?.mobilePhoneNumber}</p>
              </div>
            ))}
            <div className="flex justify-between items-start gap-y-1 md:items-center flex-col md:flex-row">
              <p className="text-gray-400">{translate('golonganDarah')}</p>
              <p className="text-gray-800">{item?.bloodType}</p>
            </div>
            <div className="flex justify-between items-start gap-y-1 md:items-center flex-col md:flex-row">
              <p className="text-gray-400">{translate('alergi')}</p>
              <p className="text-gray-800">
                {item?.allergic?.join(', ') || '-'}
              </p>
            </div>
            <div className="flex justify-between items-start gap-y-1 md:items-center flex-col md:flex-row">
              <p className="text-gray-400">{translate('riwayatPenyakit')}</p>
              <p className="text-gray-800">
                {item?.diseaseHistory?.join(', ') || '-'}
              </p>
            </div>
          </div>
        </div>
      ));
    }
    return null;
  };

  const renderLifetagEmpty = () => {
    let title = translate('kamuBelumMemilikiLifetag');
    let subtitle = translate('untukMendapatkanLifetag');
    let image = LifetagBlacknWhite;
    let image2 = Lifetag;
    let oops = '';

    if (getCurrentSubsResponse?.status === 'GRACE_PERIOD') {
      oops = 'Opps :(';
      title = translate('tidakBisaAksesLifetag');
      subtitle = translate('contentModalPolisNotActive');
      image = LifetagAccessFailed;
      image2 = null;
    } else if (
      isSubscribed &&
      lifetagLinkedList.length < 1 &&
      !lifetagFlag?.alreadyOrderLifeTag
    ) {
      title = translate('kamuBelumMemilikiLifetag');
      subtitle = translate('keadaanDaruratDapatDitangani');
    } else if (
      isSubscribed &&
      lifetagLinkedList.length < 1 &&
      lifetagFlag?.alreadyOrderLifeTag &&
      !lifetagFlag?.haveTrackingNumber
    ) {
      title = translate('lifeTagSedangDiproses');
      subtitle = translate('saatIniLifeTag');
      image = Deliver;
      image2 = null;
    } else if (
      isSubscribed &&
      lifetagLinkedList.length < 1 &&
      lifetagFlag?.alreadyOrderLifeTag &&
      lifetagFlag?.haveTrackingNumber
    ) {
      title = translate('connectYourLifeTagTitle');
      subtitle = translate('connectYourLifeTagText');
      image = LifetagScan;
      image2 = null;
    } else if (getCurrentSubsResponse?.status !== 'ACTIVE') {
      oops = 'Opps :(';
      title = translate('tidakBisaAksesLifetag');
      subtitle = translate('contentModalPolisNotActive');
      image = LifetagAccessFailed;
      image2 = null;
    } else if (!userData?.alreadyKYC && !userData?.alreadySetPin) {
      title = translate('maafTidakBisaAksesLifetag');
      subtitle = translate('contentModalPolisNotEkyc');
      image = LifetagAccessFailed;
      image2 = null;
    }

    if (lifesaverPolicies.length === 0) {
      oops = 'Opps :(';
      title = translate('polisNol');
      subtitle = translate('contentModalPolisNol');
      image = LifetagAccessFailed;
      image2 = null;
    }

    if (isGracePeriod || lifetagLinkedList.length < 1) {
      return (
        <div className="w-full border shadow-sm rounded-2xl flex flex-col items-center max-w-lg p-5">
          <img src={image} className="w-32 xm:w-40 md:w-48" />
          <img src={image2} className="h-6 mt-2 md:h-8" />
          <div className="text-center text-xs xm:text-sm md:text-base py-5">
            <p className="pb-1 font-bold">{oops}</p>
            <p className="pb-1 font-bold">{title}</p>
            <p>{subtitle}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderButton = () => {
    let title = trans(locale, lang, 'dapatkanLifetag');
    let isDisabled = false;

    let onButtonClick = () => {
      router.push(NAVIGATION.LIFETAG.LifetagDetailProduct);
    };
    if (getCurrentSubsResponse?.status === 'GRACE_PERIOD') {
      title = trans(locale, lang, 'berlanggananKembali');
      isDisabled = false;
      onButtonClick = () => {
        router.push(NAVIGATION.SUBS.SubsDetail, {
          policyNo: getCurrentSubsResponse?.policyNo,
        });
      };
    } else if (
      isSubscribed &&
      lifetagLinkedList.length < 1 &&
      !lifetagFlag?.alreadyOrderLifeTag
    ) {
      title = trans(locale, lang, 'dapatkanLifetag');
      isDisabled = false;
      onButtonClick = () => {
        router.push(NAVIGATION.LIFETAG.LifetagDetailProduct);
      };
    } else if (
      isSubscribed &&
      lifetagLinkedList.length < 1 &&
      lifetagFlag?.alreadyOrderLifeTag
    ) {
      title = trans(locale, lang, 'hubungkanLifetag');
      isDisabled = false;
      onButtonClick = () => {
        router.push(NAVIGATION.LIFETAG.LifetagScanner);
      };
    } else if (isSubscribed && lifetagLinkedList.length > 0) {
      title = trans(locale, lang, 'hubungkanLifetagLainnya');
      isDisabled = false;
      onButtonClick = () => {
        router.push(NAVIGATION.LIFETAG.LifetagScanner);
      };
    } else if (getCurrentSubsResponse?.status !== 'ACTIVE') {
      title = trans(locale, lang, 'berlanggananKembali');
      isDisabled = false;
      onButtonClick = () => {
        router.push(NAVIGATION.LIFESAVER.LifesaverMain);
      };
    } else if (!userData?.alreadyKYC && !userData?.alreadySetPin) {
      title = trans(locale, lang, 'verifikasiData');
      isDisabled = false;
      onButtonClick = () => {
        router.push(NAVIGATION.KYC.KycMain);
      };
    }

    if (lifesaverPolicies?.length === 0) {
      title = trans(locale, lang, 'btnPolisNol');
      isDisabled = false;
      onButtonClick = () => {
        router.push(NAVIGATION.LIFESAVER.LifesaverMain);
      };
    }

    return (
      <Button
        type="linear-gradient"
        className="mx-auto text-sm mt-10 md:text-base"
        disabled={isDisabled}
        onButtonClick={onButtonClick}>
        {title}
      </Button>
    );
  };

  return (
    <div className="relative w-full bg-white md:rounded-3xl  border xs:mb-5 md:mb-0">
      {renderHeader()}
      <div className="xs:min-h-[50vh] flex flex-col items-center justify-between px-[4%] py-8">
        {renderHaveLifetag()}
        {renderLifetagEmpty()}
        {renderButton()}
      </div>
    </div>
  );
}
