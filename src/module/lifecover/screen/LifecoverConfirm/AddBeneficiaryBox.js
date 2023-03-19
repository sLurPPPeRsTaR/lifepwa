import React from 'react';
import Icon from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather';
import { useRouter } from 'next/router';
import { NAVIGATION } from '@cp-util/constant';
import { confirmRow, confirmRowLabel } from './View';
import { trans } from '@cp-util/trans';
import locale from './locale';

const AddBeneficiaryBox = ({ lang, isDisplayError = false }) => {
  const router = useRouter();
  return (
    <div>
      <div className={confirmRow}>
        <label className={confirmRowLabel}>
          {trans(locale, lang, 'tambahkanPenerima')}
        </label>
      </div>
      <div
        className={
          confirmRow +
          ' bg-red-100 text-[#F53036] p-2 rounded-lg cursor-pointer'
        }
        onClick={() =>
          router.push(NAVIGATION.LIFECOVER.LifecoverAddBeneficiary)
        }>
        <label className="font-medium text-xs mt-auto mb-auto">
          {trans(locale, lang, 'tambah')}
        </label>
        <Icon icon={chevronRight} className="text-[#F53036]" size={24} />
      </div>
      {isDisplayError && (
        <div className={confirmRow}>
          <label className={confirmRowLabel + ' text-red-600 font-semibold'}>
            {trans(locale, lang, 'dataPenerimaManfaat')}
          </label>
        </div>
      )}
    </div>
  );
};

export default AddBeneficiaryBox;
