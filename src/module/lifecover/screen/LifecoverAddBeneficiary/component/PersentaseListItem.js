import React from 'react';
import clsx from 'classnames';
import {
  LifecoverRelationAdik,
  LifecoverRelationAnak,
  LifecoverRelationAyah,
  LifecoverRelationIbu,
  LifecoverRelationIstri,
  LifecoverRelationKakak,
  LifecoverRelationSuami,
} from '@cp-config/Svgs';
import { formatRupiah } from '@cp-module/lifecover/utils';

export const icon = clsx('h-4 xm:h-5 mr-1 my-auto scale-[2] ml-4', 'icon');

const PersentaseListItem = ({ beneficiary = {}, uangPertanggungan = 0 }) => {
  const getIcon = ({ status }) => {
    let image = null;
    switch (status) {
      case 'AYAH':
        image = <img className={icon} src={LifecoverRelationAyah} />;
        break;
      case 'IBU':
        image = <img className={icon} src={LifecoverRelationIbu} />;
        break;
      case 'SUAMI':
        image = <img className={icon} src={LifecoverRelationSuami} />;
        break;
      case 'ISTRI':
        image = <img className={icon} src={LifecoverRelationIstri} />;
        break;
      case 'ANAK':
        image = <img className={icon} src={LifecoverRelationAnak} />;
        break;
      case 'KAKAK':
        image = <img className={icon} src={LifecoverRelationKakak} />;
        break;
      case 'ADIK':
        image = <img className={icon} src={LifecoverRelationAdik} />;
        break;
      default:
        image = <img className={icon} src={LifecoverRelationAyah} />;
    }

    return image;
  };

  return (
    <div className="relative flex flex-column md:flex-row py-2 md:py-4 px-2 md:px-3 z-10 rounded-[12px] shadow-[0_0px_10px_rgba(181,181,181,0.3)]">
      {getIcon({ status: beneficiary.relationshipStatus })}
      <div className="flex flex-col ml-4 w-40 md:w-60">
        <p className="text-sm md:text-body1 font-semibold break-words">
          {beneficiary.name || '-'}
        </p>
        <span className="text-xs md:text-body1 text-gray-500 mt-3">
          {formatRupiah({
            total: (uangPertanggungan * beneficiary.percentage) / 100,
          })}
        </span>
      </div>
      <span className="text-sm md:text-body1 ml-auto mr-4 my-auto font-semibold">
        {beneficiary.percentage + `%`}
      </span>
    </div>
  );
};

export default PersentaseListItem;
