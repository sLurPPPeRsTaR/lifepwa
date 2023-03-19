import React from 'react';
import {
  AccordionCustom,
  CardCustom,
  SelectCustomV2,
} from '@cp-module/lifecover/component';
import { Button, Input } from '@cp-component';
import {
  BIRTH_DATE,
  BIRTH_PLACE,
  NAME,
  PERCENTAGE,
  RELATIONSHIP_STATUS,
  GENDER,
  MALE,
  FEMALE,
} from '../View';
import Icon from 'react-icons-kit';
import { venus, mars } from 'react-icons-kit/fa';
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
import { trans } from '@cp-util/trans';
import locale from '../locale';
import moment from 'moment';

export const relationList = [
  'AYAH',
  'IBU',
  'SUAMI',
  'ISTRI',
  'KAKAK',
  'ADIK',
  'ANAK',
];

const PenerimaListItem = ({
  beneficiary = {},
  changeValue = () => {},
  identifier = '',
  index = 0,
  uangPertanggungan = 0,
  deleteBeneficiaryRecipient = () => {},
  lang,
  invalidInputs,
  isSubmitted,
  disableDelete = false,
}) => {
  const RELATIONSHIP_OPTIONS = [
    {
      icon: LifecoverRelationAyah,
      label: trans(locale, lang, 'father'),
      value: 'AYAH',
    },
    {
      icon: LifecoverRelationIbu,
      label: trans(locale, lang, 'mother'),
      value: 'IBU',
    },
    {
      icon: LifecoverRelationSuami,
      label: trans(locale, lang, 'husband'),
      value: 'SUAMI',
    },
    {
      icon: LifecoverRelationIstri,
      label: trans(locale, lang, 'wife'),
      value: 'ISTRI',
    },
    {
      icon: LifecoverRelationKakak,
      label: trans(locale, lang, 'olderBrotherSister'),
      value: 'KAKAK',
    },
    {
      icon: LifecoverRelationAdik,
      label: trans(locale, lang, 'youngerBrotherSister'),
      value: 'ADIK',
    },
    {
      icon: LifecoverRelationAnak,
      label: trans(locale, lang, 'child'),
      value: 'ANAK',
    },
  ];

  const onNameChange = ({ index, name }) => {
    if (name.length > 100) {
      return;
    }
    if (!name || name.match(/^[a-zA-Z ,'.]*$/)) {
      changeValue({ index: index, value: name, type: NAME });
    }
  };

  const onRateChange = ({ index, amount }) => {
    if (!amount || amount.match(/^\d{1,}(\.\d{0,1})?$/)) {
      changeValue({ index: index, value: amount, type: PERCENTAGE });
    }
  };

  const onGenderClick = ({ index, gender }) => {
    if (gender === MALE) {
      changeValue({ index: index, value: 'L', type: GENDER });
    } else if (gender === FEMALE) {
      changeValue({ index: index, value: 'P', type: GENDER });
    }
  };

  return (
    <AccordionCustom.Item eventKey={identifier} defaultOpen>
      <AccordionCustom.Header
        as="h2"
        className="text-sm font-semibold mb-1 py-3 border-b mt-4">
        {trans(locale, lang, 'beneficiaryRecipientData')} {index + 1}
      </AccordionCustom.Header>
      <AccordionCustom.Body>
        <CardCustom className={'!overflow-visible'}>
          <CardCustom.Body
            className={'grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4'}>
            <div>
              <div className="mb-4 md:mb-5">
                <Input
                  label={trans(locale, lang, 'fullName')}
                  value={beneficiary.name}
                  required
                  className={`font-medium ${
                    isSubmitted && invalidInputs[index].includes('name')
                      ? 'border-red-600'
                      : ''
                  }`}
                  placeholder={trans(locale, lang, 'fullNamePlaceholder')}
                  autoFocus={true}
                  maxLength={100}
                  handleOnChange={(val) => {
                    onNameChange({ index: index, name: val });
                  }}
                />
              </div>
              <div className="mb-4 md:mb-5">
                <div className="font-normal">
                  <div className="flex items-end">
                    <div className=" font-semibold mb-1 text-neutral-light-neutral40 text-[11px] lg:text-xs">
                      {trans(locale, lang, 'selectRelationStatus')}
                    </div>
                    <sup className="text-primary-light-primary90">*</sup>
                  </div>
                  <SelectCustomV2
                    options={RELATIONSHIP_OPTIONS}
                    labelMenu={trans(
                      locale,
                      lang,
                      'selectRelationStatusPlaceholder',
                    )}
                    borderColor={
                      isSubmitted &&
                      invalidInputs[index].includes('relationshipStatus')
                        ? 'rgb(220, 38, 38)'
                        : ''
                    }
                    placeholder={trans(
                      locale,
                      lang,
                      'selectRelationStatusPlaceholder',
                    )}
                    value={RELATIONSHIP_OPTIONS.find(
                      (item) => item.value === beneficiary.relationshipStatus,
                    )}
                    styles={{
                      height: '2.75rem',
                    }}
                    onChange={(relation) => {
                      changeValue({
                        index: index,
                        value: relation.value,
                        type: RELATIONSHIP_STATUS,
                      });
                    }}
                    components={{
                      SingleValue: SelectCustomV2.SingleValueWithIcon,
                      Option: SelectCustomV2.OptionWithIcon,
                      Menu: SelectCustomV2.MenuWithIcon,
                    }}
                  />
                </div>
              </div>
              <div className="mb-4 md:mb-5">
                <Input
                  className={`font-medium ${
                    isSubmitted && invalidInputs[index].includes('percentage')
                      ? 'border-red-600'
                      : ''
                  }`}
                  label={trans(locale, lang, 'percentage')}
                  placeholder={trans(locale, lang, 'percentagePlaceholder')}
                  value={beneficiary.percentage}
                  autoFocus={true}
                  required
                  handleOnChange={(val) => {
                    onRateChange({ index: index, amount: val });
                  }}
                />
              </div>
            </div>
            <div>
              <div className="mb-4 md:mb-5">
                <div className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="flex items-end">
                      <div className=" font-semibold mb-1 text-neutral-light-neutral40 text-[11px] lg:text-xs">
                        {trans(locale, lang, 'gender')}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between text-xs xm:text-sm md:text-base">
                    <div
                      className={
                        'w-[48%] lg:w-[49%] h-[48px] flex border-2 px-2 md:px-2 py-3 rounded-xl cursor-pointer ' +
                        (beneficiary.gender === 'L'
                          ? 'bg-red-100 border-red-200'
                          : 'bg-gray-100 border-gray-200')
                      }
                      onClick={() =>
                        onGenderClick({ gender: MALE, index: index })
                      }>
                      <p
                        className={
                          'basis-5/6 text-xs md:text-sm ' +
                          (beneficiary.gender === 'L'
                            ? 'text-red-300'
                            : 'text-neutral-light-neutral40')
                        }>
                        {trans(locale, lang, 'male')}
                      </p>
                      <Icon
                        className={
                          'basis-1/6 leading-4 ' +
                          (beneficiary.gender === 'L'
                            ? 'text-red-300'
                            : 'text-neutral-light-neutral40')
                        }
                        size={16}
                        icon={mars}
                      />
                    </div>
                    <div
                      className={
                        'w-[48%] lg:w-[49%] h-[48px] flex border-2 px-2 md:px-2 py-3 rounded-xl cursor-pointer ' +
                        (beneficiary.gender === 'P'
                          ? 'bg-red-100 border-red-200'
                          : 'bg-gray-100 border-gray-200')
                      }
                      onClick={() =>
                        onGenderClick({ gender: FEMALE, index: index })
                      }>
                      <p
                        className={
                          'basis-5/6 text-[11px] md:text-sm ' +
                          (beneficiary.gender === 'P'
                            ? 'text-red-300'
                            : 'text-neutral-light-neutral40')
                        }>
                        {trans(locale, lang, 'female')}
                      </p>
                      <Icon
                        className={
                          'basis-1/6 leading-4 ' +
                          (beneficiary.gender === 'P'
                            ? 'text-red-300'
                            : 'text-neutral-light-neutral40')
                        }
                        icon={venus}
                        size={16}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4 md:mb-5">
                <Input
                  className="font-medium"
                  value={beneficiary.birthPlace}
                  label={trans(locale, lang, 'placeOfBirth')}
                  placeholder={trans(locale, lang, 'placeOfBirthPlaceholder')}
                  handleOnChange={(val) => {
                    changeValue({
                      index: index,
                      value: val,
                      type: BIRTH_PLACE,
                    });
                  }}
                />
              </div>
              <div className="mb-4 md:mb-5">
                <Input
                  type="date"
                  className="font-medium"
                  label={trans(locale, lang, 'selectDateOfBirth')}
                  placeholder={trans(locale, lang, 'DD MM YYYY')}
                  lang={lang}
                  maxDate={new Date()}
                  placeholderColor="text-gray-400"
                  valueDate={
                    beneficiary.birthDate
                      ? moment(beneficiary.birthDate, 'YYYY-MM-DD').format(
                          'DD-MM-YYYY',
                        )
                      : null
                  }
                  formatDateOutput="DD MMM YYYY"
                  handleOnChange={(val) => {
                    changeValue({
                      index: index,
                      value: moment(val, 'DD-MM-YYYY', true).format(
                        'YYYY-MM-DD',
                      ),
                      type: BIRTH_DATE,
                    });
                  }}
                />
              </div>
            </div>

            <div className="w-full">
              <p className="text-[12px] mt-3 font-medium text-neutral-light-neutral40">
                {trans(locale, lang, 'assuredObtained')}
              </p>
              <p className="text-base md:text-[20px] font-semibold mt-2 font-medium text-[#00B76A]">
                {formatRupiah({
                  total: (uangPertanggungan * beneficiary.percentage) / 100,
                })}
              </p>
            </div>
          </CardCustom.Body>
          {!disableDelete && (
            <div className="w-full px-5 mb-5">
              <Button
                className="text-xs md:text-sm w-auto p-2 md:p-5 mt-2 md:mt-0 max-w-[160px] mt-0"
                outline
                bordered
                onButtonClick={() => deleteBeneficiaryRecipient(index)}>
                {trans(locale, lang, 'deleteData')}
              </Button>
            </div>
          )}
        </CardCustom>
      </AccordionCustom.Body>
    </AccordionCustom.Item>
  );
};

export default PenerimaListItem;
