import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  BaseLayout,
  AccordionCustom,
  CardCustom,
} from '@cp-module/lifecover/component';
import { Button } from '@cp-component';
import PenerimaListItem, { relationList } from './component/PenerimaListItem';
import { v4 as uuidv4 } from 'uuid';
import PersentaseListItem from './component/PersentaseListItem';
import { setRupiah } from '@cp-util/common';
import AlertMessage, {
  SAME_RELATION,
  MORE_THAN_100_PERCENT,
  LESS_THAN_100_PERCENT,
  NOT_VALIDATED,
} from './component/AlertMessage';
import { trans } from '@cp-util/trans';
import locale from './locale';
import {
  ADD_BENEFICIARY_SUCCESS,
  ADD_BENEFICIARY_FAILED,
} from '@cp-module/lifecover/lifecoverConstant';

const PENERIMA_MANFAAT_KEY = 'penerima-manfaat';
export const NAME = 'name';
export const PERCENTAGE = 'percentage';
export const RELATIONSHIP_STATUS = 'relationshipStatus';
export const GENDER = 'gender';
export const BIRTH_PLACE = 'birthPlace';
export const BIRTH_DATE = 'birthDate';
export const MALE = 'male';
export const FEMALE = 'female';

export const formatUangPertanggungan = ({ total }) => {
  const floatNumber = Number(parseFloat(total).toFixed(2));
  return setRupiah(floatNumber, 'id');
};

const LifecoverAddBeneficiary = ({
  uangPertanggungan = 500000000,
  getBeneficiary,
  addBeneficiary,
  lifecoverState,
  setLoading,
  lang,
  lifeCoverAction,
  setInternalServerError,
  getBeneficiaryClear,
}) => {
  const [totalRates, setTotalRates] = useState(100);
  const [beneficiaryRecipients, setBeneficiaryRecipients] = useState([
    {
      key: '1-penerima-manfaat',
      name: '',
      relationshipStatus: 'AYAH',
      percentage: 100,
      gender: 'L', // L / P
      birthPlace: '',
      birthDate: null,
    },
  ]);
  const [deletedPenerimaManfaatList, setDeletedPenerimaManfaatList] = useState(
    [],
  );
  const [isSameRelation, setIsSameRelation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const addBeneficiaryRecipient = () => {
    if (beneficiaryRecipients.length < 5) {
      const penerima = {
        key: uuidv4() + '-' + PENERIMA_MANFAAT_KEY,
        name: '',
        relationshipStatus: relationList[beneficiaryRecipients.length],
        percentage: '',
        gender: '', //L / P
        birthPlace: '',
        birthDate: null,
      };

      let newArray = [...beneficiaryRecipients, penerima];
      for (let i = 0; i < newArray.length; i++) {
        if (newArray.length != 3) {
          newArray[i].percentage = 100 / newArray.length;
        } else {
          newArray[i].percentage = i === 0 ? 33.4 : 33.3;
        }
      }

      setBeneficiaryRecipients(newArray);
    }
  };

  const deleteBeneficiaryRecipient = (index) => {
    const deletedItem = beneficiaryRecipients[index];

    if ('id' in deletedItem) {
      setDeletedPenerimaManfaatList([
        ...deletedPenerimaManfaatList,
        deletedItem,
      ]);
    }

    let updatedBeneficiaryList = beneficiaryRecipients;
    updatedBeneficiaryList.splice(index, 1);

    setBeneficiaryRecipients(
      updatedBeneficiaryList.filter((item) => item.key !== deletedItem.key),
    );
  };

  const validateForm = () => {
    if (totalRates === 100 && invalidInputCount() < 1 && !isSameRelation) {
      const request = {
        create: [],
        update: [],
        delete: [],
      };

      beneficiaryRecipients.forEach((item) => {
        const req = item;
        delete req['key'];
        delete req['createdAt'];
        delete req['updatedAt'];
        req.percentage = parseFloat(item.percentage);
        req.relationshipStatus = item.relationshipStatus.toUpperCase();

        if ('id' in item) {
          return request.update.push(req);
        } else {
          return request.create.push(req);
        }
      });

      deletedPenerimaManfaatList.forEach((item) => {
        const req = item;
        delete req['key'];
        delete req['createdAt'];
        delete req['updatedAt'];
        req.percentage = parseFloat(item.percentage);
        req.relationshipStatus = item.relationshipStatus.toUpperCase();

        request.delete.push(req);
      });

      setLoading(true);
      addBeneficiary(request);
    }
    setIsSubmitted(true);
  };

  const lifeCoverApiResult = useCallback(
    (action) => {
      if (action === ADD_BENEFICIARY_SUCCESS) {
        getBeneficiaryClear();
        router.back();
        setLoading(false);
      }
      if (action === ADD_BENEFICIARY_FAILED) {
        getBeneficiaryClear();
        setInternalServerError(true);
        setLoading(false);
      }
    },
    [getBeneficiaryClear, router, setInternalServerError, setLoading],
  );

  useEffect(() => {
    lifeCoverApiResult(lifeCoverAction);
  }, [lifeCoverApiResult, lifeCoverAction]);

  const invalidInputs = useMemo(() => {
    let inputValidator = [];
    beneficiaryRecipients.forEach((item) => {
      // setValidator
      let itemValidator = [];

      if (item.name === '') {
        itemValidator.push('name');
      }
      if (item.relationshipStatus === '') {
        itemValidator.push('relationship_status');
      }

      const totalArray = [];
      beneficiaryRecipients.forEach((item) => {
        const number = parseFloat(item.percentage);
        totalArray.push(number);
      });

      const totalRate = sumFloats(totalArray);

      if (item.percentage === 0 || item.percentage === '' || totalRate < 100) {
        itemValidator.push('percentage');
      }

      inputValidator.push(itemValidator);
    });

    return inputValidator;
  }, [beneficiaryRecipients]);

  const invalidInputCount = () => {
    const isAllCorrect = beneficiaryRecipients.filter(
      (item) =>
        item.name === '' ||
        item.relationshipStatus === '' ||
        item.percentage === 0 ||
        item.percentage === '',
    );

    return isAllCorrect.length;
  };

  const changeValue = useCallback(
    ({ index, value, type }) => {
      return setBeneficiaryRecipients(
        beneficiaryRecipients.map((item, i) => {
          if (index == i) {
            return { ...item, [type]: value };
          }
          return item;
        }),
      );
    },
    [beneficiaryRecipients],
  );

  function checkDuplicateRelation(array) {
    const unique = array.filter(
      (obj, index) => array.findIndex((item) => item === obj) === index,
    );
    return unique.length !== array.length;
  }

  useEffect(() => {
    let totalArray = [];
    let statusList = [];
    let filtered = [];
    for (let i = 0; i < beneficiaryRecipients.length; i++) {
      if (
        ['ayah', 'ibu', 'suami', 'istri'].includes(
          beneficiaryRecipients[i].relationshipStatus.toLocaleLowerCase(),
        )
      ) {
        filtered.push(
          beneficiaryRecipients[i].relationshipStatus.toLocaleLowerCase(),
        );
      }
    }

    beneficiaryRecipients.forEach((item) => {
      const number = parseFloat(item.percentage);
      totalArray.push(number);
      statusList.push(item.relationshipStatus);
    });

    setIsSameRelation(checkDuplicateRelation(filtered));
    setTotalRates(sumFloats(totalArray));
  }, [beneficiaryRecipients]);

  function sumFloats(items) {
    var R = 0;
    for (var x = 0; x < items.length; x++) {
      R += parseFloat(items[x].toFixed(2));
    }

    R = parseFloat(R.toFixed(2));
    return R;
  }

  useEffect(() => {
    getBeneficiary();
  }, []);

  useEffect(() => {
    if (lifecoverState.getBeneficiaryResponse?.status) {
      let array = [];
      const beneficiaries = lifecoverState.getBeneficiaryResponse?.data;

      for (let i = 0; i < beneficiaries.length; i++) {
        let item = { key: `${i + 1}-${PENERIMA_MANFAAT_KEY}` };
        Object.entries(beneficiaries[i]).forEach(([key, value]) => {
          if (key === 'relationshipStatus') {
            item[key] = value?.toUpperCase();
          } else {
            item[key] = value;
          }
        });
        array.push(item);
      }

      setBeneficiaryRecipients(array);
    }
  }, [lifecoverState.getBeneficiaryResponse]);

  return (
    <BaseLayout title={trans(locale, lang, 'benefitRecipient')}>
      <BaseLayout.Container className="py-10 max-w-4xl p-4">
        <CardCustom className="min-h-screen pb-[160px] relative">
          <CardCustom.Body>
            <h2 className="text-sm md:text-body1 font-semibold mb-1">
              {trans(locale, lang, 'sumInsuredReceived')}
            </h2>
            <div className="text-sm text-gray-500">
              {trans(locale, lang, 'setSumInsured')}
            </div>
            <h2 className="text-sm md:text-body1 font-semibold mb-1 mt-4">
              {trans(locale, lang, 'totalSumAssured')}
            </h2>
            <div className="relative flex flex-col items-center justify-center py-4 px-4 md:px-8 z-10 rounded-[12px] shadow-[0_0px_10px_rgba(181,181,181,0.3)]">
              <div className="text-[#00B76A] text-body1 md:text-[20px] font-semibold">
                {setRupiah(uangPertanggungan, 'id')}
              </div>
            </div>
            <h2 className="text-sm md:text-body1 font-semibold mb-1 mt-4">
              {trans(locale, lang, 'percentage')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 md:gap-x-4 gap-y-4">
              {beneficiaryRecipients.map((item, index) => (
                <PersentaseListItem
                  key={item.key}
                  identifier={item.key}
                  index={index}
                  beneficiary={item}
                  uangPertanggungan={uangPertanggungan}
                />
              ))}
            </div>
            <AccordionCustom allOpen alwaysOpen>
              {beneficiaryRecipients.map((item, index) => (
                <PenerimaListItem
                  isSubmitted={isSubmitted}
                  invalidInputs={invalidInputs}
                  lang={lang}
                  key={item.key}
                  identifier={item.key}
                  index={index}
                  beneficiary={item}
                  changeValue={changeValue}
                  uangPertanggungan={uangPertanggungan}
                  deleteBeneficiaryRecipient={deleteBeneficiaryRecipient}
                  disableDelete={beneficiaryRecipients.length === 1}
                />
              ))}
            </AccordionCustom>
            {(totalRates !== 100 || Number.isNaN(totalRates)) && (
              <AlertMessage
                type={
                  totalRates < 100
                    ? LESS_THAN_100_PERCENT
                    : MORE_THAN_100_PERCENT
                }
                lang={lang}
              />
            )}
            {isSameRelation && (
              <AlertMessage type={SAME_RELATION} lang={lang} />
            )}
            {isSubmitted && invalidInputCount() > 0 && (
              <AlertMessage type={NOT_VALIDATED} lang={lang} />
            )}

            <div className="mt-3 md:mt-6 flex flex-col md:flex-row">
              <Button
                type="linear-gradient"
                className={'text-xs md:text-sm w-auto p-2 md:p-5 mr-0 md:mr-4 '}
                disabled={beneficiaryRecipients.length === 5 ? true : false}
                onButtonClick={() => addBeneficiaryRecipient()}>
                + {trans(locale, lang, 'benefitRecipient')}
              </Button>
            </div>

            <div className="fixed z-[88] bg-white mx-auto max-w-4xl left-0 right-0 bottom-0 px-2 md:px-4 py-2 md:py-4">
              <Button
                type="linear-gradient"
                className="max-w-none mt-2 md:mt-3"
                disabled={invalidInputCount() > 0}
                onButtonClick={() => validateForm()}>
                {trans(locale, lang, 'save')}
              </Button>
            </div>
          </CardCustom.Body>
        </CardCustom>
      </BaseLayout.Container>
    </BaseLayout>
  );
};

export default LifecoverAddBeneficiary;
