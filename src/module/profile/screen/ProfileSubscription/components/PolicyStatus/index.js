import { diffPolicyDueDate } from '@cp-util/common';
import { POLICY_STATUS } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import React from 'react';
import Icon from 'react-icons-kit';
import { clock2 } from 'react-icons-kit/icomoon';
import { closeCircled } from 'react-icons-kit/ionicons';
import { checkmarkCircled } from 'react-icons-kit/ionicons';

function PolicyStatus({ policyStatus, policyDueDate,isSubscribe, lang, locale }) {

  if (policyStatus == POLICY_STATUS.active) {
    if (isSubscribe === false) {
      return (
        <div className="flex rounded-3xl text-red-500 border py-2 items-center justify-center border-red-600">
          <Icon icon={clock2} size={22} className="text-red-500" />
          <p className="text-sm xs:text-xs pl-2">
            {trans(locale, lang, 'berakhir')}
            {diffPolicyDueDate(policyDueDate)}
            {trans(locale, lang, 'hari')}
          </p>
        </div>
      );
    } else {
      return (
        <div className="flex rounded-3xl text-green-600 border py-2 items-center justify-center border-green-600">
          <Icon icon={checkmarkCircled} size={22} className="text-green-500" />
          <p className="text-sm pl-2">{trans(locale, lang, policyStatus)}</p>
        </div>
      );
    }
  }

  if (policyStatus === POLICY_STATUS.gracePeriod) {
    return (
      <div className="flex rounded-3xl text-orange-400 border py-2 items-center justify-center border-orange-400">
        <Icon icon={clock2} size={22} />
        <p className="text-sm pl-2">{trans(locale, lang, policyStatus)}</p>
      </div>
    );
  }

  if (policyStatus === POLICY_STATUS.lapse) {
    return (
      <div className="flex rounded-3xl text-gray-400 border py-2 items-center justify-center border-gray-400">
        <Icon icon={closeCircled} size={22} />
        <p className="text-sm pl-2">{trans(locale, lang, 'LAPSE_Detail')}</p>
      </div>
    );
  }
}

export default PolicyStatus;
