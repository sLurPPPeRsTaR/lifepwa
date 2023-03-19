import React, { useState } from 'react';
import { confirmRow, confirmRowLabel, confirmRowValue, divider } from './View';
import { formatCurrency } from '@cp-util/numbro';
import { trans } from '@cp-util/trans';
import locale from './locale';

const BeneficiariesBox = ({
  beneficiaries = [],
  uangPertanggungan = 0,
  lang,
}) => {
  const [isDisplayAll, setIsDisplayAll] = useState(false);

  return (
    <div>
      <div className={confirmRow}>
        <label
          className={
            confirmRowLabel + ' text-black font-semibold cursor-pointer'
          }>
          {trans(locale, lang, 'penerimaManfaat')} ({beneficiaries.length})
        </label>
        <span
          className={
            confirmRowValue + ' text-red-600 font-semibold cursor-pointer'
          }
          onClick={() => setIsDisplayAll(!isDisplayAll)}>
          {isDisplayAll
            ? trans(locale, lang, 'lihatSedikit')
            : trans(locale, lang, 'lihatSemua')}
        </span>
      </div>
      {beneficiaries.map((item, index) => {
        if (index == 0) {
          return (
            <>
              <div className={confirmRow}>
                <label className={confirmRowLabel}>
                  {trans(locale, lang, 'namaLengkap')}
                </label>
                <span className={confirmRowValue}>{item.name}</span>
              </div>
              <div className={confirmRow}>
                <label className={confirmRowLabel}>
                  {trans(locale, lang, 'menerimaUP')}
                </label>
                <span className={confirmRowValue}>{`Rp ${formatCurrency({
                  value: (uangPertanggungan * item.percentage) / 100,
                })},-`}</span>
              </div>
              {index !== beneficiaries.length - 1 && (
                <div className={divider} />
              )}
            </>
          );
        } else {
          return (
            <>
              {isDisplayAll && (
                <>
                  <div className={confirmRow}>
                    <label className={confirmRowLabel}>
                      {trans(locale, lang, 'namaLengkap')}
                    </label>
                    <span className={confirmRowValue}>{item.name}</span>
                  </div>
                  <div className={confirmRow}>
                    <label className={confirmRowLabel}>
                      {trans(locale, lang, 'menerimaUP')}
                    </label>
                    <span className={confirmRowValue}>{`Rp ${formatCurrency({
                      value: (uangPertanggungan * item.percentage) / 100,
                    })},-`}</span>
                  </div>
                  {index !== beneficiaries.length - 1 && (
                    <div className={divider} />
                  )}
                </>
              )}
            </>
          );
        }
      })}
    </div>
  );
};

export default BeneficiariesBox;
