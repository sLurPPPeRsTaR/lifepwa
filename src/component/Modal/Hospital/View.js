import _ from 'lodash';
import clsx from 'classnames';
import locale from './locale';
import { Icon } from 'react-icons-kit';
import { trans } from '@cp-util/trans';
import { useState, useEffect, useMemo } from 'react';
import { Modal, Input } from '@cp-component';
import { Close } from '@cp-config/Svgs';
import { ModalRS, ModalRSDisabled } from '@cp-config/Images';
import { arrowDown } from 'react-icons-kit/feather';

export default function Component(props) {
  const {
    lang,
    className,
    getListRs,
    getListRsClear,
    getListRsResponse,
    setClose,
    isOpen,
  } = props;

  const translate = (val) => trans(locale, lang, val);

  const dataType = [
    { lebel: translate('ALL'), key: 'ALL' },
    { lebel: translate('HOSPITAL'), key: 'HOSPITAL' },
    { lebel: translate('CLINIC'), key: 'CLINIC' },
    { lebel: translate('PHARMACY'), key: 'PHARMACHY' },
    { lebel: translate('LAB'), key: 'LAB' },
    { lebel: translate('OPTIC'), key: 'OPTIC' },
    { lebel: translate('DENTAL'), key: 'DENTAL' },
  ];

  const [filter, setFilter] = useState({
    search: '',
    page: 1,
    limit: 100,
    focus: false,
    type: '',
  });

  useEffect(() => {
    if (isOpen) {
      getListRs(filter);
    } else {
      getListRsClear();
      setFilter({
        search: '',
        page: 1,
        limit: 100,
        focus: false,
        type: 'ALL',
      });
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => setClose(false)}
      className={clsx('z-50 bg-[#FCFDFF]', className)}
      size="md"
      noPadding>
      <div className="text-sm px-2 xm:px-4 pb-2 w-full flex gap-2 items-center text-start xm:text-body1 font-bold border-b">
        <div
          className="flex items-center"
          role="button"
          onClick={() => setClose(false)}>
          <img src={Close} className="w-10" />
        </div>
        {translate('daftarRsdanKlinik')}
      </div>
      <div className="px-3 xm:px-4 md:px-8 mt-4">
        <div className="pb-4 border-b">
          <div className="mb-2">
            <Input
              value={filter.search}
              handleOnChange={(val) => {
                setFilter((prev) => ({ ...prev, search: val }));
                getListRs({ ...filter, search: val });
              }}
              placeholder={translate('search')}
              inputClassName="text-xs xm:text-sm"
            />
          </div>
          <div className="w-full flex gap-2 xm:gap-4 bg-white px-2 xm:px-4 py-1 xm:py-2 rounded-2xl overflow-auto">
            {dataType?.map((type) => (
              <div
                key={type?.key}
                role="button"
                onClick={() => {
                  getListRs({ ...filter, type: type?.key });
                  setFilter((prev) => ({ ...prev, type: type?.key }));
                }}
                className={clsx(
                  'text-xs xm:text-sm flex-none px-3 xm:px-4 py-2 rounded-2xl text-[#FB909C] mb-2',
                  type?.key === filter.type && ' bg-[#FA364D]/[0.08]',
                )}>
                {type.lebel}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 px-4 md:px-8 py-4">
        <div className="!w-full !max-w-[60px]">
          <img src={ModalRS} className="w-full h-auto" />
        </div>
        <div className="text-[#666B6F] font-medium text-xs xm:text-body2">
          {translate('subTitle1')}Life<span className="italic">SAVER</span>{lang === 'id' ? ',' : null}{' '}
          {translate('subTitle2')}
        </div>
      </div>
      <div className="px-3 xm:px-4 md:px-8">
        <text className='font-bold text-xs xm:text-body2'>{translate('lebihDari')}</text>
      </div>
      
      <div className="px-3 xm:px-4 md:px-8">
        {getListRsResponse?.providerList?.length > 0 ? (
          <div className="my-4 overflow-y-auto max-h-[35vh]">
            {getListRsResponse?.providerList?.map((e) => (
              <div
                key={e?.providerId}
                className="bg-white rounded-2xl px-4 py-2 mb-2 border shadow">
                <p className="text-[#171717] text-sm font-semibold border-b pb-1">
                  {_.startCase(
                    _.toLower(`${e?.providerType} ${e?.providerName}`),
                  )}
                </p>
                <div className="text-xs font-medium text-neutral-light-neutral10 py-1">
                  <p>{_.startCase(_.toLower(e?.address))}</p>
                  <p>
                    {_.startCase(
                      _.toLower(
                        `${e?.city ? `${e?.city}, ` : ''}${e?.province}`,
                      ),
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12">
            <div className="text-black font-semibold text-center">
              {translate('Not_Found')}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
