import React, { useEffect, useState } from 'react';
import { RedGradientWarning } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import locale from '../locale';

export const SAME_RELATION = 'SAME_RELATION';
export const MORE_THAN_100_PERCENT = 'MORE_THAN_100_PERCENT';
export const LESS_THAN_100_PERCENT = 'LESS_THAN_100_PERCENT';
export const NOT_VALIDATED = 'NOT_VALIDATED';

const AlertMessage = ({ type, lang = 'id' }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const updateErrorMessage = () => {
    let result = 'alertRequiredInput';

    switch (type) {
      case SAME_RELATION:
        result = 'alertSimilarRelation';
        break;
      case MORE_THAN_100_PERCENT:
        result = 'alertPercentageMore';
        break;
      case LESS_THAN_100_PERCENT:
        result = 'alertPercentageLess';
        break;

      default:
        break;
    }
    setErrorMessage(trans(locale, lang, result));
  };

  useEffect(() => {
    updateErrorMessage();
  }, [type]);

  return (
    <div className="mt-3 md:mt-5 bg-[#FFE2E2] mx-auto rounded-xl w-full p-2 md:p-4 flex">
      <img src={RedGradientWarning} className="text-[#FBB559]" />
      <span className="pl-2 mt-1 text-sm font-semibold text-[#ED1C24]">
        {errorMessage}
      </span>
    </div>
  );
};

export default AlertMessage;
