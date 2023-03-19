import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UnsubsBg, lifeIdRed } from '@cp-config/Images';
import { trans } from '@cp-util/trans';
import Icon from 'react-icons-kit';
import { Button, Input } from '@cp-component';
import {
  SET_UNSUBSCRIBE_NEWS_LETTER,
  SET_UNSUBSCRIBE_NEWS_LETTER_SUCCESS,
  SET_UNSUBSCRIBE_NEWS_LETTER_FAILED,
} from '@cp-module/unsubscribe/unsubscribeConstant';

import {
  androidRadioButtonOn,
  androidRadioButtonOff,
} from 'react-icons-kit/ionicons';
import locale from './locale';
import { NAVIGATION } from '@cp-util/constant';

export default function Page({
  lang,
  setUnsubscribeNewsletter,
  unsubscribeAction,
  unsubscribeResponse,
  unsubscribeFailed,
  setInternalServerError,
}) {
  const router = useRouter();
  const [reason, setReason] = useState([
    {
      id: 1,
      reason: trans(locale, lang, 'tidakMenerimaEmail'),
      status: false,
    },
    {
      id: 2,
      reason: trans(locale, lang, 'tidakPernahDaftar'),
      checked: false,
    },
    {
      id: 3,
      reason: trans(locale, lang, 'emailTidakPantas'),
      checked: false,
    },
    {
      id: 4,
      reason: trans(locale, lang, 'tidakMenerimaEmail'),
      checked: false,
    },
    {
      id: 5,
      reason: trans(locale, lang, 'lainnya'),
      checked: false,
    },
  ]);

  const [reasonPayload, setReasonPayload] = useState('');
  const [isTextarea, setIsTextarea] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validReason, setValidReason] = useState(null);
  const [isModalFailed, setIsModalFailed] = useState(false);

  function validateReason(text) {
    if (text.length < 1) {
      setValidReason({ error: trans(locale, lang, 'alasanRequired') });
      return false;
    }
    setValidReason(null);
    return true;
  }

  const setUnsubscribeNewsletterResult = useCallback(
    (act) => {
      if (act === SET_UNSUBSCRIBE_NEWS_LETTER_SUCCESS) {
        setIsSuccess(true);
      }
      if (act === SET_UNSUBSCRIBE_NEWS_LETTER_FAILED) {
        setInternalServerError({ isOpen: isModalFailed, lang: lang });
      }
    },
    [setIsSuccess],
  );

  useEffect(() => {
    setUnsubscribeNewsletterResult(unsubscribeAction);
  }, [unsubscribeAction, setUnsubscribeNewsletterResult]);

  function renderHeaderReason() {
    return (
      <div className="mx-auto w-[75%] mb-6 xs:w-full">
        <div className="text-xs text-black font-medium xm:text-sm text-center">
          {isSuccess
            ? trans(locale, lang, 'berhasilUnsub')
            : trans(locale, lang, 'sebelumBerhenti')}
        </div>
      </div>
    );
  }

  function renderCardReason() {
    const handleClickRadio = (id, reasonText) => {
      let update = reason?.map((item) => {
        if (item?.id === id) {
          return { ...item, checked: true };
        }
        return { ...item, checked: false };
      });
      if (reason.length === id) {
        setIsTextarea(true);
        setReasonPayload('');
      } else {
        setIsTextarea(false);
        setReasonPayload(reasonText);
      }
      setReason(update);
    };
    return (
      <div className="mx-auto w-[70%] xs:w-full">
        <div className="bg-white rounded-2xl p-4 md:p-5 md:border md:shadow-md ">
          {reason?.map((item, i) => (
            <div
              className="flex py-2 justify-between"
              style={{
                borderBottom:
                  reason.length - 1 === i ? null : '1px solid #DCDBDD',
                lineHeight: '2px',
                margin: '8px 0 20px',
              }}
              onClick={() => {
                handleClickRadio(item.id, item.reason);
              }}>
              <div className="text-xs text-black font-medium xm:text-sm">
                {item.reason}
              </div>
              <input
                type="radio"
                name="invitation"
                className="opacity-0"
                readOnly
                checked={item?.checked}
              />
              <div>
                <Icon
                  icon={
                    item?.checked ? androidRadioButtonOn : androidRadioButtonOff
                  }
                  size={24}
                  className={item?.checked ? 'text-red-500' : 'text-gray-300'}
                />
              </div>
            </div>
          ))}
          {isTextarea && (
            <div className="mt-8 mb-6">
              <Input
                className="mb-5"
                placeholder={trans(locale, lang, 'tulisAlasan')}
                message={validReason}
                required
                handleOnChange={(val) => {
                  setReasonPayload(val);
                  setValidReason(validateReason(val));
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderUnsubscribeSuccess() {
    return (
      <div className="mx-auto w-[70%] xs:w-full">
        <div className="bg-white rounded-2xl p-4 md:p-5 md:border md:shadow-md ">
          <div className="text-xs text-black font-medium xm:text-sm text-center">
            {trans(locale, lang, 'inginBerlanggananKembali')}
            <Button
              type="linear-gradient"
              className="text-sm mx-auto mt-7"
              onButtonClick={() =>
                router.push({ pathname: NAVIGATION.LIFESAVER.LifesaverMain })
              }>
              {trans(locale, lang, 'langgananKembali')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function renderBottom() {
    const payload = {
      idCustomer: router.query.id,
      emailCustomer: router.query.email,
      alasan: reasonPayload,
    };

    const handleSubmit = () => setUnsubscribeNewsletter(payload);
    return (
      <div className="my-5">
        <div className="mx-auto">
          <Button
            disabled={!reasonPayload}
            type="linear-gradient"
            className="text-sm mx-auto"
            onButtonClick={handleSubmit}>
            {trans(locale, lang, 'unsubscribe')}
          </Button>
          <div
            onClick={() => router.push({ pathname: NAVIGATION.HOME.Home })}
            className="text-xs text-black font-medium xm:text-sm text-center underline mt-2 text-[#84818A]">
            {trans(locale, lang, 'menujuIfg')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-screen py-7 bg-gray-50 bg-cover justify-center flex mb-10 xs:mb-10"
      style={{ backgroundImage: `url(${UnsubsBg})` }}>
      <div className="md:w-[60%] xs:w-[90%] p-2 flex flex-col">
        <div className="mx-auto">
          <img src={lifeIdRed} />
        </div>
        {renderHeaderReason()}
        {isSuccess ? (
          renderUnsubscribeSuccess()
        ) : (
          <div>
            {renderCardReason()}
            {renderBottom()}
          </div>
        )}
      </div>
    </div>
  );
}
