import moment from 'moment';
import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import { trans } from '@cp-util/trans';
import { HeaderPage, MenuBar } from '@cp-component';
import { NAVIGATION } from '@cp-util/constant';
import PolisDetailSummary from '../PolisDetailSummary';
import PolisDetailPersonalData from '../PolisDetailPersonalData';
import PolisDetailBenefit from '../PolisDetailBenefit';
import PolisDetailFunds from '../PolisDetailFunds';
import PolisDetailClaim from '../PolisDetailClaim';
import PolisDetailDownload from '../PolisDetailDownload';
import locale from './locale';
import 'moment/locale/id';
import 'moment/locale/en-gb';
import { chevronDown } from 'react-icons-kit/feather';
import { DrawerPolicy } from '@cp-module/polis/components';

export default function Page(props) {
  const {
    lang,
    selectedPolicy,
    getPolicySummaryClear,
    getPolicySelfDataClear,
    getPolicyBenefitClear,
    getPolicyFundsClear,
    getPolicyClaimClear,
    getPolicyDownloadClear,
    getPolicyClaimDetailClear,
  } = props;

  const router = useRouter();
  const {
    query: { prev },
  } = router;

  moment.locale(lang);

  const [activePage, setActivePage] = useState();
  const [isShowMenuMobile, setIsShowMenuMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isDigitalPolicy = useMemo(() => {
    const source = selectedPolicy?.source;
    return source === '001' || source === '002';
  }, [selectedPolicy?.source]);

  useEffect(() => {
    setActivePage(isDigitalPolicy ? 0 : 1);
  }, [isDigitalPolicy]);

  useEffect(() => {
    return () => {
      getPolicySummaryClear();
      getPolicySelfDataClear();
      getPolicyBenefitClear();
      getPolicyFundsClear();
      getPolicyClaimClear();
      getPolicyDownloadClear();
      getPolicyClaimDetailClear();
    };
  }, [
    getPolicyBenefitClear,
    getPolicyClaimClear,
    getPolicyClaimDetailClear,
    getPolicyDownloadClear,
    getPolicyFundsClear,
    getPolicySelfDataClear,
    getPolicySummaryClear,
  ]);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // check window size for first time render
  useEffect(() => {
    handleResize();
  }, []);

  // create an event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  const renderMenuMobile = () => {
    return (
      <div className="group w-full h-fit mb-5 bg-white p-4 rounded-2xl shadow-sm border md:w-1/3">
        <div
          className="cursor-pointer w-full flex justify-between items-center duration-300"
          onClick={() => setIsShowMenuMobile(!isShowMenuMobile)}>
          <div className="font-semibold text-sm">Menu</div>
          <Icon
            icon={chevronDown}
            size={24}
            className={`${
              isShowMenuMobile && 'text-red-dark-red90 -rotate-180'
            } duration-500 text-gray-400 group-hover:text-red-dark-red90`}
          />
        </div>
        <div
          className={`duration-500 overflow-y-scroll w-full ${
            isShowMenuMobile ? 'h-auto' : 'h-0'
          }`}>
          {renderListDrawer()}
        </div>
      </div>
    );
  };

  const renderListDrawer = () => {
    const listDrawer = [
      {
        key: 0,
        title: trans(locale, lang, 'summary'),
        isShow: isDigitalPolicy,
      },
      {
        key: 1,
        title: trans(locale, lang, 'dataDiri'),
        isShow: true,
      },
      {
        key: 2,
        title: trans(locale, lang, 'manfaat'),
        isShow: true,
      },
      {
        key: 3,
        title: trans(locale, lang, 'dana'),
        isShow: selectedPolicy?.fundsSection === true,
      },
      {
        key: 4,
        title: trans(locale, lang, 'klaim'),
        isShow: true,
      },
      {
        key: 5,
        title: trans(locale, lang, 'download'),
        isShow: selectedPolicy?.isDownloadSection === true,
      },
    ];
    return (
      <div className="mt-4 text-sm divide-y md:mt-0 md:text-base">
        {listDrawer
          .filter((item) => item?.isShow)
          .map((item) => {
            return (
              <DrawerPolicy
                key={item?.key}
                id={item?.key}
                activePage={activePage}
                onClick={() => {
                  setActivePage(item?.key);
                  setIsShowMenuMobile(false);
                }}
                title={item?.title}
              />
            );
          })}
      </div>
    );
  };

  const renderPage = () => {
    if (activePage == 0) {
      return <PolisDetailSummary polis={selectedPolicy} />;
    } else if (activePage == 1) {
      return <PolisDetailPersonalData polis={selectedPolicy} />;
    } else if (activePage == 2) {
      return <PolisDetailBenefit polis={selectedPolicy} />;
    } else if (activePage == 3) {
      return <PolisDetailFunds polis={selectedPolicy} />;
    } else if (activePage == 4) {
      return <PolisDetailClaim polis={selectedPolicy} />;
    } else if (activePage == 5) {
      return <PolisDetailDownload polis={selectedPolicy} />;
    }
    return null;
  };

  return (
    <div className="pb-10">
      <HeaderPage
        title={trans(locale, lang, 'polis')}
        onClickBack={() => {
          if (prev && prev === 'subs') {
            router.push(
              {
                pathname: NAVIGATION.PROFILE.Profile,
                query: {
                  activeTabProps: 1,
                  policyNo: selectedPolicy?.policyNo,
                },
              },
              NAVIGATION.PROFILE.Profile,
            );
          } else if (prev && prev === 'home') {
            router.push('/');
          } else {
            router.back();
          }
        }}
      />
      <div className="relative w-full flex flex-col max-w-6xl px-[5%] mx-auto -top-6 gap-0 sm:gap-6 lg:gap-10 md:-top-14 md:flex-row">
        {isMobile ? (
          renderMenuMobile()
        ) : (
          <div className="w-full h-fit mb-10 bg-white p-4 rounded-3xl shadow-lg md:w-1/3">
            {renderListDrawer()}
          </div>
        )}
        <div className="w-full border h-fit bg-white rounded-2xl shadow-lg overflow-hidden md:w-2/3 mb-20 md:rounded-3xl ">
          {renderPage()}
        </div>
        <MenuBar />
      </div>
    </div>
  );
}
