import { getEligiblePos } from '@cp-module/lifesaver/lifesaverAction';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//hooks to list product lifesaver

function useProductList({ translate }) {
  const ListTitleProtection = [
    {
      text: translate('title2'),
      isCashLess: true,
      withDetail: true,
    },
    {
      text: translate('title3'),
    },
    {
      text: translate('title4'),
      withDetail: true,
      withProtectionPlus: true,
    },
    {
      text: translate('title5'),
      specials: true,
      withDetail: false,
      withProtectionPlus: false,
    },
    {
      text: translate('title6'),
      isPromo: true,
      isCashLess: true,
      // tnc: true,
    },
    {
      text: translate('title7'),
      isPromo: true,
      isCashLess: true,
      // tnc: true,
      withDetail: true,
    },
    {
      text: translate('title8'),
      withProtection: true,
      withProtectionPlus: true,
      isPromo: true,
      // tnc: true,
    },
  ];
  const dispatch = useDispatch();
  const getEligiblePosResponse = useSelector(
    (state) => state.lifesaver.getEligiblePosResponse,
  );
  const userId = useSelector((state) => state.auth.userData.userId);
  const [listProtection, setListProtection] = useState([
    {
      title1: 'Life',
      title2: 'SAVER',
      plan: 'lifesaver',
      price: '49' + translate('rb') + translate('bulan'),
      priceTag: 49000,
      detail: [
        { claim: '200 ' + translate('jt'), cashless: true },
        { claim: '20 ' + translate('jt') },
        { claim: '' },
        { claim: false },
        { claim: '10 ' + translate('jt'), cashless: true },
        { claim: '20 ' + translate('jt'), cashless: true },
        { claim: true },
      ],
    },
    {
      title1: 'Life',
      title2: 'SAVER+',
      plan: 'lifesaverplus',
      price: '99' + translate('rb') + translate('bulan'),
      priceTag: 99000,
      detail: [
        { claim: '400 ' + translate('jt'), cashless: true },
        { claim: '40 ' + translate('jt') },
        { claim: true },
        { claim: false },
        { claim: '10 ' + translate('jt'), cashless: true },
        { claim: '20 ' + translate('jt'), cashless: true },
        { claim: true },
      ],
    },
  ]);

  useEffect(() => {
    if (userId !== '') {
      dispatch(getEligiblePos());
    }
  }, []);

  //if user is from pt post show this product
  useEffect(() => {
    const pos = {
      title1: 'Life',
      title2: 'SAVER',
      title3: 'POS',
      plan: 'lifesaverpos',
      price: '35' + translate('rb') + translate('bulan'),
      detail: [
        { claim: '100 ' + translate('jt'), cashless: true },
        { claim: '15 ' + translate('jt') },
        { claim: '' },
        { claim: false },
        { claim: '7.5 ' + translate('jt'), cashless: true },
        { claim: '12.5 ' + translate('jt'), cashless: true },
        { claim: true },
      ],
    };
    if (
      getEligiblePosResponse?.isEligible &&
      userId !== '' &&
      listProtection.length < 3
    ) {
      listProtection.unshift(pos);
    }
  }, [getEligiblePosResponse]);
  return {
    listProtection,
    ListTitleProtection
  };
}

export default useProductList;
