/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-icons-kit';
import locale from './locale';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { trans } from '@cp-util/trans';
import { x } from 'react-icons-kit/feather';
import { filter } from 'react-icons-kit/fa';
import { NAVIGATION } from '@cp-util/constant';
import { Button, CardPolis, HeaderPage, MenuBar, Modal } from '@cp-component';
import {
  GET_POLICIES_FAILED,
  GET_POLICIES_SUCCESS,
} from '@cp-module/polis/polisConstant';
import { EmptyPolis, Loading, ProfileAddress } from '@cp-config/Images';
import { Refresh } from '@cp-config/Svgs';

export default function Page(props) {
  const router = useRouter();
  const {
    lang,
    getPolicies,
    getPoliciesResponse,
    token,
    polisAction,
    userData,
    setClearKkpm,
    getPoliciesError,
  } = props;
  const [listStatusFilter, setListStatusFilter] = useState([]);
  const [listNameFilter, setListNameFilter] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState([]);
  const [selectedNameFilter, setSelectedNameFilter] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isValueOpen, setIsValueOpen] = useState(false);

  const listPolicies = useMemo(() => {
    return getPoliciesResponse?.data || [];
  }, [getPoliciesResponse?.data]);

  useEffect(() => {
    if (token == null || token == '') {
      router.push(NAVIGATION.LOGIN.Login);
    }
  }, []);

  useEffect(() => {
    if (selectedStatusFilter.length == 0 && selectedNameFilter.length == 0) {
      setIsFilter(false);
    }
  }, [selectedNameFilter.length, selectedStatusFilter.length]);

  const isExecuted = useRef(false);
  useEffect(() => {
    if (!isExecuted.current) {
      setIsLoading(true);
      getPolicies();
      setClearKkpm();
      isExecuted.current = true;
    }
  }, [getPolicies, setClearKkpm]);

  useEffect(() => {
    if (polisAction == GET_POLICIES_FAILED) {
      setIsLoading(false);
      setError(true);
    }
    if (polisAction == GET_POLICIES_SUCCESS) {
      setIsLoading(false);
    }
  }, [polisAction]);

  useEffect(() => {
    if (listPolicies) {
      let tempListName = [];
      let tempListStatus = [];
      listPolicies?.forEach((item) => {
        tempListName = _.union(tempListName, [item?.productName]);
        tempListStatus = _.union(tempListStatus, [item?.statusName]);
      });
      setListNameFilter(tempListName);
      setListStatusFilter(tempListStatus);
    }
  }, [listPolicies]);

  useEffect(() => {
    moment.locale(lang);
  }, [lang]);

  const renderModalError = () => {
    return (
      <Modal isOpen={isError}>
        <div className="flex flex-col justify-center">
          <Icon
            icon={x}
            size={24}
            className="cursor-pointer opacity-20 z-50"
            onClick={() => setError(false)}
          />
          <div className="w-full h-auto grid place-items-center">
            <img
              src={EmptyPolis}
              width="50%"
              className="absolute md:w-[20%] lg:w-[10%] mb-20 h-auto"
            />
          </div>
          <p className="text-lg font-bold text-center mx-10 mt-16">
            {trans(locale, lang, 'errorText')}
          </p>
        </div>
      </Modal>
    );
  };

  const renderEmptyPolis = () => {
    const isGetPoliciesError = getPoliciesError?.message;
    return (
      <div className="w-full flex justify-center mt-20">
        <div className="w-full mx-auto h-max flex flex-col justify-start md:w-1/2">
          {isGetPoliciesError ? (
            <img className="max-w-[180px] mx-auto mb-5" src={Refresh} />
          ) : (
            <img className="max-w-[180px] mx-auto" src={ProfileAddress} />
          )}

          <text className="text-center font-bold text-lg mb-2">
            {!token
              ? trans(locale, lang, 'lihatDetailPolis')
              : isGetPoliciesError
              ? trans(locale, lang, 'kontentGagal')
              : trans(locale, lang, 'belumAdaData')}
          </text>
          {!token ? (
            <p className="font-bold opacity-70 text-center text-sm md:text-md lg:text-lg">
              {trans(locale, lang, 'silahkan')}{' '}
              <span
                role="button"
                className="text-[#ED1C24]"
                onClick={() => router.push(NAVIGATION.LOGIN.Login)}>
                {trans(locale, lang, 'login')}
              </span>
              <span className="text-[#ED1C24]">
                {trans(locale, lang, 'atau')}
              </span>
              <span
                role="button"
                className="text-[#ED1C24]"
                onClick={() => router.push(NAVIGATION.REGISTER.Register)}>
                {trans(locale, lang, 'register')}
              </span>
              {trans(locale, lang, 'dahulu')}
            </p>
          ) : token && !userData.alreadyKYC && !isGetPoliciesError ? (
            <text className="font-bold opacity-70 text-center text-xs md:text-md lg:text-lg">
              {trans(locale, lang, 'silahkanVerifikasi')}{' '}
              <span
                role="button"
                className="text-[#ED1C24]"
                onClick={() => router.push(NAVIGATION.KYC.KycMain)}>
                {trans(locale, lang, 'disini')}
              </span>
            </text>
          ) : token && userData.alreadyKYC ? (
            <p className="font-bold opacity-70 text-center text-xs md:text-md lg:text-lg">
              {trans(locale, lang, 'kamuBelumMemiliki')}{' '}
              <span
                role="button"
                className="text-[#ED1C24]"
                onClick={() => router.push(NAVIGATION.LIFESAVER.LifesaverMain)}>
                {trans(locale, lang, 'cariProteksi')}
              </span>{' '}
              {trans(locale, lang, 'yangCocok')}
            </p>
          ) : null}

          {isGetPoliciesError ? (
            <text className="font-bold opacity-70 text-center text-xs md:text-md lg:text-lg">
              <span
                role="button"
                className="text-[#ED1C24]"
                onClick={() => router.push(NAVIGATION.POLICY.Polis)}>
                {trans(locale, lang, 'muatUlang')}
              </span>{' '}
            </text>
          ) : null}
        </div>
      </div>
    );
  };

  const RenderBadge = ({ title, onClick, close, black, className }) => {
    return (
      <div
        role="button"
        className={`flex py-1 px-3 h-fit items-center border rounded-full text-[10px] duration-300 md:text-[11px]  ${
          black
            ? 'border-black hover:bg-red-50'
            : 'border-red-400 text-red-400 bg-red-50 hover:bg-red-100'
        } ${className}`}
        onClick={onClick}>
        {title}
        {close && <Icon icon={x} size={14} className="pl-2 pb-[2px]" />}
      </div>
    );
  };

  const renderListPolis = () => {
    let activePolicies = listPolicies?.filter((policy) => {
      return (
        (policy !== null && policy.statusCode.toLowerCase() === 'active') ||
        policy.statusName === 'PASIF'
      );
    });

    let inactivePolicies = listPolicies?.filter((policy) => {
      return (
        policy !== null &&
        policy.statusCode.toLowerCase() === 'non-active' &&
        policy.statusName !== 'PASIF'
      );
    });

    if (selectedNameFilter?.length > 0) {
      activePolicies = activePolicies.filter((policy) => {
        return selectedNameFilter.includes(policy.productName);
      });
      inactivePolicies = inactivePolicies.filter((policy) => {
        return selectedNameFilter.includes(policy.productName);
      });
    }
    if (selectedStatusFilter.length > 0) {
      activePolicies = activePolicies.filter((policy) => {
        return selectedStatusFilter.includes(policy.statusName);
      });
      inactivePolicies = inactivePolicies.filter((policy) => {
        return selectedStatusFilter.includes(policy.statusName);
      });
    }

    activePolicies = activePolicies.sort((a, b) => {
      return moment(b.insuranceStartDate).diff(moment(a.insuranceStartDate));
    });
    inactivePolicies = inactivePolicies.sort((a, b) => {
      return moment(b.insuranceStartDate).diff(moment(a.insuranceStartDate));
    });

    const FilterButton = () => {
      return (
        <div
          role="button"
          className="p-2 rounded-lg border shadow-sm leading-none text-red-500 hover:bg-red-200"
          onClick={() => setShowFilter(true)}>
          <Icon icon={filter} />
        </div>
      );
    };

    return (
      <div className="w-full mt-5">
        {isFilter && (
          <div className="w-full pt-2 flex gap-3 justify-between items-start">
            <div className="w-4/5 pb-5 flex gap-1 overflow-auto md:gap-2">
              {selectedStatusFilter.sort().map((val, idx) => (
                <RenderBadge
                  close
                  key={idx}
                  title={val}
                  className="!flex-none"
                  onClick={() => {
                    setListStatusFilter((listStatusFilter) => [
                      ...listStatusFilter,
                      val,
                    ]);
                    setSelectedStatusFilter((prev) =>
                      prev.filter((i) => i !== val),
                    );
                  }}
                />
              ))}
              {selectedNameFilter.sort().map((val, idx) => (
                <RenderBadge
                  close
                  key={idx}
                  title={val}
                  className="!flex-none"
                  onClick={() => {
                    setListNameFilter((listNameFilter) => [
                      ...listNameFilter,
                      val,
                    ]);
                    setSelectedNameFilter(
                      selectedNameFilter.filter((i) => i !== val),
                    );
                  }}
                />
              ))}
            </div>

            <RenderBadge
              black
              className="w-32 justify-center"
              title={trans(locale, lang, 'reset')}
              onClick={() => {
                setIsFilter(false);
                let tempListName = [];
                let tempListStatus = [];
                listPolicies?.forEach((item) => {
                  tempListName = _.union(tempListName, [item?.productName]);
                  tempListStatus = _.union(tempListStatus, [item?.statusName]);
                });
                setListNameFilter(tempListName);
                setListStatusFilter(tempListStatus);
                setSelectedStatusFilter([]);
                setSelectedNameFilter([]);
              }}
            />
          </div>
        )}

        {!_.isEmpty(activePolicies) && (
          <>
            <div className="w-full py-3 flex flex-row justify-between items-center">
              <p className="text-lg font-bold">
                {trans(locale, lang, 'polisAktif')}
              </p>
              <FilterButton />
            </div>
            <div className="flex flex-col gap-5 pb-5">
              {activePolicies?.map((val, idx) => (
                <CardPolis
                  key={idx}
                  idx={idx}
                  item={val}
                  navFrom={NAVIGATION.POLICY.Polis}
                  isValueOpen={isValueOpen}
                  onValueClick={() => {
                    setIsValueOpen((old) => !old);
                  }}
                />
              ))}
            </div>
          </>
        )}
        {!_.isEmpty(inactivePolicies) && (
          <>
            <div className="w-full py-3 flex flex-row justify-between items-center">
              <p className="text-lg font-bold">
                {trans(locale, lang, 'polisNonAktif')}
              </p>
              {_.isEmpty(activePolicies) && <FilterButton />}
            </div>
            <div className="flex flex-col gap-5">
              {inactivePolicies.map((val, idx) => (
                <CardPolis
                  key={idx}
                  idx={idx}
                  item={val}
                  navFrom={NAVIGATION.POLICY.Polis}
                  isValueOpen={isValueOpen}
                  onValueClick={() => {
                    setIsValueOpen((old) => !old);
                  }}
                />
              ))}
            </div>
          </>
        )}
        {_.isEmpty(activePolicies) && _.isEmpty(inactivePolicies) && (
          <div className="w-full flex justify-center mt-20 ">
            <div className="w-full mx-auto h-max flex flex-col justify-start md:w-1/2">
              <img className="max-w-[180px] mx-auto" src={ProfileAddress} />
              <p className="text-center font-bold text-lg mb-2">
                {trans(locale, lang, 'oopsPolisTidakDitemukan')}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderModalFilter = () => {
    return (
      <Modal
        isOpen={showFilter}
        size="md"
        className="mb-[9vh] s:mb-[12vh] overflow-hidden md:mb-[8vh] !py-2 !px-3 !md:p-4">
        <div className="md:px-4 pb-2">
          <div className="w-full h-auto flex justify-between mb-3 md:mb-5">
            <div className="flex gap-5 items-center">
              <Icon
                className="cursor-pointer opacity-50"
                icon={x}
                size={20}
                onClick={() => {
                  setShowFilter(false);
                  if (!isFilter) {
                    let tempListName = [];
                    let tempListStatus = [];
                    listPolicies?.forEach((item) => {
                      tempListName = _.union(tempListName, [item?.productName]);
                      tempListStatus = _.union(tempListStatus, [
                        item?.statusName,
                      ]);
                    });
                    setListNameFilter(tempListName);
                    setListStatusFilter(tempListStatus);
                    setSelectedStatusFilter([]);
                    setSelectedNameFilter([]);
                  }
                }}
              />
              <p className="font-black text-sm md:text-base">
                {trans(locale, lang, 'filter')}
              </p>
            </div>

            <div className="text-center px-2 py-1 cursor-pointer rounded-md text-xs md:text-sm lg:hover:bg-red-light-red20">
              {listStatusFilter.length === 0 || listNameFilter.length === 0 ? (
                <div
                  className="font-black"
                  onClick={() => {
                    setIsFilter(false);
                    let tempListName = [];
                    let tempListStatus = [];
                    listPolicies?.forEach((item) => {
                      tempListName = _.union(tempListName, [item?.productName]);
                      tempListStatus = _.union(tempListStatus, [
                        item?.statusName,
                      ]);
                    });
                    setListNameFilter(tempListName);
                    setListStatusFilter(tempListStatus);
                    setSelectedStatusFilter([]);
                    setSelectedNameFilter([]);
                  }}>
                  {trans(locale, lang, 'reset')}
                </div>
              ) : (
                <div
                  className="font-black"
                  onClick={() => {
                    if (listStatusFilter.length > 0) {
                      selectedStatusFilter.length > 0
                        ? setSelectedStatusFilter((prev) =>
                            prev.concat(listStatusFilter),
                          )
                        : setSelectedStatusFilter(listStatusFilter);
                    }
                    if (listNameFilter.length > 0) {
                      selectedNameFilter.length > 0
                        ? setSelectedNameFilter(
                            selectedNameFilter.concat(listNameFilter),
                          )
                        : setSelectedNameFilter(listNameFilter);
                    }

                    setListStatusFilter([]);
                    setListNameFilter([]);
                  }}>
                  {trans(locale, lang, 'pilihSemua')}
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-auto grid place-items-center ">
            <div className="w-full border-b mb-1">
              <p className="text-xs md:text-sm">
                {trans(locale, lang, 'statusTerpilih')}
              </p>
            </div>
            <div className="w-full h-auto my-1 py-2 flex flex-wrap overflow-y-auto max-h-[15vh] s:max-h-[20vh] md:max-h-[30vh] gap-1 xm:gap-2">
              {selectedStatusFilter.sort().map((val, index) => (
                <div
                  role="button"
                  className="py-[2px] md:py-1 px-3 border rounded-xl border-red-400  bg-red-100 text-red-400 text-[10px] md:text-[11px]"
                  key={index}
                  onClick={() => {
                    setListStatusFilter((listStatusFilter) => [
                      ...listStatusFilter,
                      val,
                    ]);
                    setSelectedStatusFilter((prev) =>
                      prev?.filter((i) => i !== val),
                    );
                  }}>
                  {val}
                </div>
              ))}
              {selectedNameFilter?.sort().map((val, index) => (
                <div
                  role="button"
                  className="py-[2px] md:py-1 px-3 border rounded-xl border-red-400 bg-red-100 text-red-400 text-[10px] md:text-[11px]"
                  key={index}
                  onClick={() => {
                    setListNameFilter((listNameFilter) => [
                      ...listNameFilter,
                      val,
                    ]);
                    setSelectedNameFilter(
                      selectedNameFilter.filter((i) => i !== val),
                    );
                  }}>
                  {val}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-auto grid place-items-center pt-2">
            <div className="w-full border-b mb-1">
              <p className="text-xs md:text-sm">
                {trans(locale, lang, 'pilihNama')}
              </p>
            </div>
            <div className="w-full h-auto my-2 flex flex-wrap overflow-y-auto max-h-[15vh] s:max-h-[20vh] md:max-h-[30vh] gap-1 xm:gap-2">
              {listNameFilter.sort().map((val, index) => (
                <div
                  role="button"
                  className="py-[2px] md:py-1 px-3 border rounded-xl border-red-400 text-[10px] md:text-[11px] text-red-400 lg:hover:bg-red-50"
                  key={index}
                  onClick={() => {
                    setSelectedNameFilter((selectedStatusFilter) => [
                      ...selectedStatusFilter,
                      val,
                    ]);
                    setListNameFilter(listNameFilter.filter((i) => i !== val));
                  }}>
                  {val}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-auto grid place-items-center py-2 md:py-3">
            <div className="w-full border-b mb-1">
              <p className="text-xs md:text-sm">
                {trans(locale, lang, 'pilihStatus')}
              </p>
            </div>
            <div className="w-full h-auto my-2 flex flex-wrap gap-1 xm:gap-2 overflow-y-auto max-h-[8vh] xm:max-h-[12vh]">
              {listStatusFilter.sort().map((val, index) => (
                <div
                  role="button"
                  className="md:py-1 px-3 border rounded-xl border-red-400 text-red-400 text-[10px] md:text-[11px] lg:hover:bg-red-50"
                  key={index}
                  onClick={() => {
                    setSelectedStatusFilter((prev) => [...prev, val]);
                    setListStatusFilter((prev) =>
                      prev.filter((i) => i !== val),
                    );
                  }}>
                  {val}
                </div>
              ))}
            </div>
          </div>

          <Button
            full
            type="linear-gradient"
            className="mt-1 text-sm !h-10 md:mt-4"
            onButtonClick={() => {
              setShowFilter(false);
              if (
                _.isEmpty(selectedNameFilter) &&
                _.isEmpty(selectedStatusFilter)
              ) {
                return;
              }
              setIsFilter(true);
            }}>
            {trans(locale, lang, 'filter')}
          </Button>
        </div>
      </Modal>
    );
  };

  const renderPage = () => {
    if (!_.isEmpty(listPolicies)) {
      return renderListPolis();
    } else {
      return renderEmptyPolis();
    }
  };

  return (
    <>
      {renderModalError()}
      <HeaderPage
        center
        title={trans(locale, lang, 'polis')}
        onClickBack={() => router.push(NAVIGATION.HOME.Home)}
        className="w-full"
      />
      <div className="max-w-xl mx-auto pb-40 px-5">
        {isLoading && _.isEmpty(listPolicies) ? (
          <img src={Loading} alt="" />
        ) : (
          renderPage()
        )}
      </div>
      {renderModalFilter()}
      <MenuBar />
    </>
  );
}
