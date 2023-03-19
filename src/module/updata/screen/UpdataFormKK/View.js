import _ from 'lodash';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { HeaderPage, Input, Button, Modal } from '@cp-component';
import { trans } from '@cp-util/trans';
import { Icon } from 'react-icons-kit';
import { x, mars, venus, warning } from 'react-icons-kit/fa';
import { ic_clear, ic_check } from 'react-icons-kit/md';
import { chevronDown } from 'react-icons-kit/feather';
import {
  Female,
  FemaleActive,
  Male,
  MaleActive,
  Calendar,
} from '@cp-config/Svgs';
import locale from './locale';
import {
  regexNameBachelorDegree,
  regexBirthPlace,
  regexOccupation,
  matchTypoTolerance,
  removeColumnFromObject,
} from '@cp-util/common';
import {
  GET_UPDATA_LAST_KK_INFO_FAILED,
  GET_UPDATA_LAST_KK_INFO_SUCCESS,
  GET_UPDATA_LAST_KTP_INFO_FAILED,
  GET_UPDATA_LAST_KTP_INFO_SUCCESS,
  SET_UPDATA_CHECK_KK_KTP_FAILED,
  SET_UPDATA_CHECK_KK_KTP_SUCCESS,
} from '@cp-module/updata/updataConstant';
import {
  Child,
  Father,
  FatherGray,
  KtpTidakCocok,
  Mother,
  MotherGray,
  ReviewKK,
  TrashBin,
} from '@cp-config/Images';
import { formatCapitalizeEachWord, formatOrdinal } from '@cp-util/format';
import UpdataStep from '../UpdataStep';
import 'moment/locale/id';
import { NAVIGATION } from '@cp-util/constant';

// Constant
const CONSTANT = {
  KEPALA_KELUARGA: 'KEPALA KELUARGA',
  ISTRI: 'ISTRI',
  ANAK: 'ANAK',
  ANAK_KANDUNG: 'ANAK KANDUNG',
  ANAK_ANGKAT: 'ANAK ANGKAT',
  ANAK_TIRI: 'ANAK TIRI',
  LAKI_LAKI: 'Laki-laki',
  PEREMPUAN: 'Perempuan',
};
const ERRORS = {
  required: 'required',
  invalid: 'invalid',
  numberOnly: 'numberOnly',
  notWorking: 'notWorking',
  notMarried: 'notMarried',
  headOfFamilyNull: 'headOfFamilyNull',
  dataUncompleted: 'dataUncompleted',
  maxBeneficiaryAge: 'maxBeneficiaryAge',
  maxBeneficiaryTotal5: 'maxBeneficiaryTotal5',
  maxSelectedChildren3: 'maxSelectedChildren3',
  maxHeadOfFamily1: 'maxHeadOfFamily1',
  maxWife1: 'maxWife1',
};
const KEYS = {
  familyCardNumber: 'familyCardNumber',
  familyRelationshipStatus: 'familyRelationshipStatus',
  idCardNumber: 'idCardNumber',
  name: 'name',
  gender: 'gender',
  pob: 'pob',
  dob: 'dob',
  occupation: 'occupation',
  maritalStatus: 'maritalStatus',
};
const RELATIONSHIP_STATUS = {
  HEAD_OF_FAMILY: [CONSTANT.KEPALA_KELUARGA],
  WIFE: [CONSTANT.ISTRI],
  CHILD: [
    CONSTANT.ANAK,
    CONSTANT.ANAK_KANDUNG,
    CONSTANT.ANAK_ANGKAT,
    CONSTANT.ANAK_TIRI,
  ],
};
const MARITAL_STATUS = {
  BELUM_KAWIN: 'BELUM KAWIN',
  KAWIN: 'KAWIN',
  CERAI_HIDUP: 'CERAI HIDUP',
  CERAI_MATI: 'CERAI MATI',
  KAWIN_TERCATAT: 'KAWIN TERCATAT',
  KAWIN_BELUM_TERCATAT: 'KAWIN BELUM TERCATAT',
};

// Config
const REGEXS_CONFIG = {
  name: regexNameBachelorDegree,
  pob: regexBirthPlace,
  occupation: regexOccupation,
};

const RULES_CONFIG = {
  FORMAT_DATE_INPUT: 'DD-MM-YYYY',
  FORMAT_DATE_OUTPUT: 'DD MMMM YYYY',
  DEFAULT_DATE: '01-01-1990',
  MAX_HEAD_OF_FAMILY: 1,
  MAX_WIFE: 1,
  MAX_BENEFICIARY_AGE: 25,
  MAX_BENEFICIARY: 5,
  MAX_CHILD: 3,
  ALLOWED_BENEFICIARY_OCCUPATION: [
    'BELUM/TIDAK BEKERJA',
    'MENGURUS RUMAH TANGGA',
    'PELAJAR/MAHASISWA',
  ],
  ALLOWED_BENEFICIARY_MARITAL_STATUS: [MARITAL_STATUS.BELUM_KAWIN],
};
const familyMembersInitialConfig = {
  familyRelationshipStatus: ['required'],
  idCardNumber: ['required', 'number', 'equalLength16'],
  name: ['required', 'validRegex'],
  gender: ['required'],
  pob: ['required', 'validRegex'],
  dob: ['required'],
  occupation: ['required', 'validRegex'],
  maritalStatus: ['required'],
  age: [],
};
const childsInitialConfig = {
  familyRelationshipStatus: ['required'],
  idCardNumber: ['required', 'number', 'equalLength16'],
  name: ['required', 'validRegex'],
  gender: ['required'],
  pob: ['required', 'validRegex'],
  dob: ['required'],
  occupation: ['required', 'validRegex'],
  maritalStatus: ['required'],
  age: [],
  // dob: ['required', 'limitAge'],
  // occupation: ['required', 'limitOccupation', 'validRegex'],
  // maritalStatus: ['required', 'limitMaritalStatus'],
};
const familyCardNumberInitialConfig = ['required', 'number', 'equalLength16'];

const familyMembersInitialState = {
  idCardNumber: '',
  name: '',
  gender: '',
  pob: '',
  dob: '',
  occupation: '',
  familyRelationshipStatus: '',
  maritalStatus: '',
  age: '',
};

const familyMembersInitialMessage = {
  idCardNumber: null,
  name: null,
  gender: null,
  pob: null,
  dob: null,
  occupation: null,
  familyRelationshipStatus: null,
  maritalStatus: null,
  age: null,
};

const dummySetUpdataKTPResponse = {
  data: {
    user: {
      idCardNumber: '3151392312018321',
      name: 'John Doe',
      gender: 'Laki-Laki',
      pob: 'Surabaya',
      dob: '26-04-1980',
      address: 'Jl. Jalan Jalan',
      province: 'DKI Jakarta',
      city: 'Jakarta Barat',
      district: 'Kalideres',
      subDistrict: 'Semanan',
      neighborhood: '092',
      hamlet: '093',
      maritalStatus: 'Kawin',
      occupation: 'Pegawai Swasta',
    },
  },
};

const dummySetUpdataKKResponse = {
  data: {
    family: {
      familyCardNumber: '4674214235467854123',
      headOfFamilyName: 'John Doe',
      address: 'Jl. Raya',
      province: 'Jawa Barat',
      city: 'Bandung',
      district: 'Cipayung',
      neighborhood: '002',
      hamlet: '003',
      familyMembers: [
        {
          idCardNumber: '3173032604990001',
          name: 'John Doe',
          gender: 'Laki-Laki',
          pob: 'Jakarta',
          dob: '24-10-1970',
          occupation: 'Karyawan Swasta',
          familyRelationshipStatus: 'Kepala Keluarga',
          maritalStatus: 'Kawin',
          age: 52,
        },
        {
          idCardNumber: '3173032604990001',
          name: 'Karen Doe',
          gender: 'Perempuan',
          pob: 'Jakarta',
          dob: '26-04-1970',
          occupation: 'Karyawan Swasta',
          familyRelationshipStatus: 'Istri',
          maritalStatus: 'Kawin',
          age: 52,
        },
        {
          idCardNumber: '3173032604990001',
          name: 'Anak 1',
          gender: 'Laki-Laki',
          pob: 'Jakarta',
          dob: '26-04-1990',
          occupation: 'Karyawan Swasta',
          familyRelationshipStatus: 'Anak Kandung',
          maritalStatus: 'Belum Kawin',
          age: 32,
        },
        {
          idCardNumber: '3173032604990001',
          name: 'Anak 2',
          gender: 'Laki-Laki',
          pob: 'Jakarta',
          dob: '26-04-1999',
          occupation: 'Pelajar/Mahasiswa',
          familyRelationshipStatus: 'Anak Kandung',
          maritalStatus: 'Kawin',
          age: 23,
        },
        {
          idCardNumber: '3173032604990001',
          name: 'Anak 3',
          gender: 'Laki-Laki',
          pob: 'Jakarta',
          dob: '26-04-2000',
          occupation: 'Pegawai Swasta',
          familyRelationshipStatus: 'Anak Angkat',
          maritalStatus: 'Belum Kawin',
          age: 22,
        },
        {
          idCardNumber: '3173032604990001',
          name: 'Anak 4',
          gender: 'Laki-Laki',
          pob: 'Jakarta',
          dob: '26-04-2009',
          occupation: 'Pelajar/Mahasiswa',
          familyRelationshipStatus: 'Anak',
          maritalStatus: 'Belum Kawin',
          age: 13,
        },
      ],
    },
  },
};

export default function View(props) {
  const {
    lang,
    isKKSame,
    isKTPSame,
    updataAction,
    kkpmTempState,
    setKkpmTemp,

    setUpdataKTPResponse,
    // setUpdataKKResponse,

    getUpdataLastKTPInfo,
    getUpdataLastKTPInfoClear,
    getUpdataLastKTPInfoFailed,
    getUpdataLastKTPInfoResponse,

    getUpdataLastKKInfo,
    getUpdataLastKKInfoClear,
    getUpdataLastKKInfoFailed,
    getUpdataLastKKInfoResponse,

    setUpdataCheckKKKTP,
    setUpdataCheckKKKTPClear,
    setUpdataCheckKKKTPFailed,
    setUpdataCheckKKKTPResponse,

    setLoading,
    setToastMsg,
    setUpdataTempState,

    setKkpmDataKk,
    kkpmDataKkState,
  } = props;
  moment.locale(lang);
  const router = useRouter();
  const { data, category, certificateNo, policyNo, source } = kkpmTempState;

  // isSubmit
  const [isSubmit, setIsSubmit] = useState(false);

  // Input
  const [idCardInput, setIdCardInput] = useState({});
  const [familyMembersInput, setFamilyMembersInput] = useState([
    {
      values: {
        ...familyMembersInitialState,
        familyRelationshipStatus: CONSTANT.KEPALA_KELUARGA,
      },
      messages: { ...familyMembersInitialMessage },
      configs: { ...familyMembersInitialConfig },
    },
  ]);
  const [familyCardNumberInput, setFamilyCardNumberInput] = useState('');
  const [familyCardNumberMessage, setFamilyCardNumberMessage] = useState(null);

  // Modal
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [isInvalidNIKModal, setIsInvalidNIKModal] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({
    isShow: false,
    activeIndex: '',
    config: [],
  });

  const [activeAccordion, setActiveAccordion] = useState([]);

  // Dropdown
  const [dateTimePickerDropdown, setDateTimePickerDropdown] = useState({
    isShow: false,
    activeIndex: '',
    config: [],
  });
  const [
    familyRelationshipStatusDropdown,
    setFamilyRelationshipStatusDropdown,
  ] = useState({
    isShow: false,
    activeIndex: '',
    config: [],
  });
  const [maritalStatusDropdown, setMaritalStatusDropdown] = useState({
    isShow: false,
    activeIndex: '',
    config: [],
  });

  const todayDate = new Date();
  const yesterdayDate = todayDate.setDate(todayDate.getDate() - 1);

  const translate = useCallback((val) => trans(locale, lang, val), [lang]);

  const validateInput = useCallback(
    (key, value, config) => {
      // required
      if (config.includes('required')) {
        if (!value) {
          return {
            error: `${trans(locale, lang, key)} ${trans(
              locale,
              lang,
              ERRORS.required,
            )}`,
          };
        }
      }
      // validRegex
      if (config.includes('validRegex')) {
        if (key === KEYS.name) {
          if (!REGEXS_CONFIG.name.test(value)) {
            return {
              error: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid,
              )}`,
            };
          }
        }
        if (key === KEYS.pob) {
          if (REGEXS_CONFIG.pob.test(value)) {
            return {
              error: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid,
              )}`,
            };
          }
        }
        if (key === KEYS.occupation) {
          if (REGEXS_CONFIG.occupation.test(value)) {
            return {
              error: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid,
              )}`,
            };
          }
        }
      }
      // number
      if (config.includes('number')) {
        if (Number.isNaN(Number(value))) {
          return {
            error: `${trans(locale, lang, key)} ${trans(
              locale,
              lang,
              ERRORS.numberOnly,
            )}`,
          };
        }
      }
      // equalLength
      const equalLength = config.find((item) => {
        return item.match('equalLength');
      });
      if (equalLength) {
        if (value.length !== Number(equalLength.substring(11))) {
          return {
            error: `${trans(locale, lang, key)} ${trans(
              locale,
              lang,
              ERRORS.invalid,
            )}`,
          };
        }
      }
      // limitAge
      if (config.includes('limitAge')) {
        const age = moment(new Date()).diff(
          moment(value, RULES_CONFIG.FORMAT_DATE_INPUT, true),
          'years',
          false,
        );
        if (age >= RULES_CONFIG.MAX_BENEFICIARY_AGE) {
          setToastMsg({
            isOpen: true,
            warn: true,
            title: translate(`${ERRORS.maxBeneficiaryAge}Row`),
          });
          return {
            error: `${translate(ERRORS.maxBeneficiaryAge)}`,
          };
        }
      }
      // limitOccupation
      if (config.includes('limitOccupation')) {
        if (
          !RULES_CONFIG?.ALLOWED_BENEFICIARY_OCCUPATION?.some((item) => {
            return value?.toUpperCase() === item?.toUpperCase();
          })
        ) {
          setToastMsg({
            isOpen: true,
            warn: true,
            title: translate(`${ERRORS.notWorking}Row`),
          });
          return {
            error: `${translate(ERRORS.notWorking)}`,
          };
        }
      }
      // limitMaritalStatus
      if (config.includes('limitMaritalStatus')) {
        if (
          !RULES_CONFIG?.ALLOWED_BENEFICIARY_MARITAL_STATUS?.some((item) => {
            return value?.toUpperCase() === item?.toUpperCase();
          })
        ) {
          setToastMsg({
            isOpen: true,
            warn: true,
            title: translate(`${ERRORS.notMarried}Row`),
          });
          return {
            error: `${trans(locale, lang, ERRORS.notMarried)}`,
          };
        }
      }
      return null;
    },
    [lang, setToastMsg, translate],
  );

  // Family Members Section Validation
  const validateFamilyMembersSection = useCallback(
    (values, configs) => {
      return {
        familyRelationshipStatus: validateInput(
          KEYS.familyRelationshipStatus,
          values.familyRelationshipStatus,
          configs.familyRelationshipStatus,
        ),
        idCardNumber: validateInput(
          KEYS.idCardNumber,
          values.idCardNumber,
          configs.idCardNumber,
        ),
        name: validateInput(KEYS.name, values.name, configs.name),
        gender: validateInput(KEYS.gender, values.gender, configs.gender),
        pob: validateInput(KEYS.pob, values.pob, configs.pob),
        dob: validateInput(KEYS.dob, values.dob, configs.dob),
        occupation: validateInput(
          KEYS.occupation,
          values.occupation,
          configs.occupation,
        ),
        maritalStatus: validateInput(
          KEYS.maritalStatus,
          values.maritalStatus,
          configs.maritalStatus,
        ),
      };
    },
    [validateInput],
  );

  // Initial Setup Family Members Data & OCR Validation
  const initSetupFamilyMembersData = useCallback(
    (familyMembers, familyCardNumber) => {
      let tempHeadOfFamily = [];
      let tempWife = [];
      let tempChild = [];
      let tempAnotherFamily = [];

      const tempFamilyCardNumber = familyCardNumber;
      let tempFamilyCardNumberMessage = null;

      familyMembers?.forEach((item) => {
        // eslint-disable-next-line no-nested-ternary
        const gender = matchTypoTolerance(item.gender, CONSTANT.LAKI_LAKI)
          ? CONSTANT.LAKI_LAKI
          : matchTypoTolerance(item.gender, CONSTANT.PEREMPUAN)
          ? CONSTANT.PEREMPUAN
          : null;
        const maritalStatus =
          matchTypoTolerance(
            item.maritalStatus,
            MARITAL_STATUS.KAWIN_TERCATAT,
          ) ||
          matchTypoTolerance(
            item.maritalStatus,
            MARITAL_STATUS.KAWIN_BELUM_TERCATAT,
          )
            ? MARITAL_STATUS.KAWIN
            : item.maritalStatus;
        const newItem = {
          rawValues: { ...item },
          values: {
            ...item,
            gender: gender,
            maritalStatus: maritalStatus,
            age: item.dob
              ? moment(new Date()).diff(
                  moment(item.dob, RULES_CONFIG.FORMAT_DATE_INPUT, true),
                  'years',
                  false,
                )
              : null,
          },
          messages: { ...familyMembersInitialMessage },
          configs: { ...familyMembersInitialConfig },
        };
        if (
          RELATIONSHIP_STATUS.HEAD_OF_FAMILY.some((i) => {
            return matchTypoTolerance(
              i,
              newItem.values.familyRelationshipStatus,
            );
          })
        ) {
          tempHeadOfFamily.push({
            ...newItem,
            values: {
              ...newItem.values,
              familyRelationshipStatus: CONSTANT.KEPALA_KELUARGA,
            },
          });
        } else if (
          RELATIONSHIP_STATUS.WIFE.some((i) => {
            return matchTypoTolerance(
              i,
              newItem.values.familyRelationshipStatus,
            );
          })
        ) {
          tempWife.push({
            ...newItem,
            values: {
              ...newItem.values,
              familyRelationshipStatus: CONSTANT.ISTRI,
            },
          });
        } else if (
          RELATIONSHIP_STATUS.CHILD.some((i) => {
            return matchTypoTolerance(
              i,
              newItem.values.familyRelationshipStatus,
            );
          })
        ) {
          tempChild.push({
            ...newItem,
            values: {
              ...newItem.values,
              familyRelationshipStatus: CONSTANT.ANAK,
            },
            configs: { ...childsInitialConfig },
          });
        } else {
          tempAnotherFamily.push({
            ...newItem,
            values: {
              ...newItem.values,
              familyRelationshipStatus: null,
            },
          });
        }
      });

      // Section Validation
      tempHeadOfFamily = tempHeadOfFamily.map((item) => {
        return {
          ...item,
          messages: validateFamilyMembersSection(item.values, item.configs),
        };
      });
      tempWife = tempWife.map((item) => {
        return {
          ...item,
          messages: validateFamilyMembersSection(item.values, item.configs),
        };
      });
      tempChild = tempChild.map((item) => {
        return {
          ...item,
          messages: validateFamilyMembersSection(item.values, item.configs),
        };
      });
      tempAnotherFamily = tempAnotherFamily.map((item) => {
        return {
          ...item,
          messages: validateFamilyMembersSection(item.values, item.configs),
        };
      });
      tempFamilyCardNumberMessage = validateInput(
        KEYS.familyCardNumber,
        tempFamilyCardNumber,
        familyCardNumberInitialConfig,
      );

      // Data not completed validation
      const requiredKeys = [KEYS.idCardNumber, KEYS.name, KEYS.dob];
      const tempFamily = [
        ...tempHeadOfFamily,
        ...tempWife,
        ...tempChild,
        ...tempAnotherFamily,
      ];
      const isTempFamilyUncompleted = tempFamily.some((item) => {
        return Object.entries(item.values).some(([key, value]) => {
          if (requiredKeys.includes(key)) {
            return value === null;
          }
          return false;
        });
      });
      if (isTempFamilyUncompleted) {
        setToastMsg({
          isOpen: true,
          warn: true,
          title: translate(ERRORS.dataUncompleted),
        });
      }

      // Head of Family Validation
      // Kepala Keluarga hanya 1
      if (tempHeadOfFamily.length > RULES_CONFIG.MAX_HEAD_OF_FAMILY) {
        tempHeadOfFamily = tempHeadOfFamily.map((i) => ({
          ...i,
          messages: {
            ...i,
            familyRelationshipStatus: {
              error: trans(locale, lang, ERRORS.maxHeadOfFamily1),
            },
          },
        }));
      }

      // Wife Validation
      // Istri/Pasangan hanya 1
      if (tempWife.length > RULES_CONFIG.MAX_WIFE) {
        tempWife = tempWife.map((i) => ({
          ...i,
          messages: {
            ...i,
            familyRelationshipStatus: {
              error: trans(locale, lang, ERRORS.maxWife1),
            },
          },
        }));
      }

      // Child Validation
      // Anak maksimal 3
      // if (tempChild.length > RULES_CONFIG.MAX_CHILD) {
      //   tempChild = tempChild.map((i) => ({
      //     ...i,
      //     messages: {
      //       ...i.messages,
      //       familyRelationshipStatus: {
      //         error: trans(locale, lang, ERRORS.maxSelectedChildren3),
      //       },
      //     },
      //   }));
      //   toast.warn(trans(locale, lang, ERRORS.maxSelectedChildren3))
      // }

      // Penerima Manfaat maksimal 5
      // if (familyMembers.length > RULES_CONFIG.MAX_BENEFICIARY) {
      //   toast.warn(trans(locale, lang, ERRORS.maxBeneficiaryTotal5))
      // }

      // Sort Child by Age
      tempChild = tempChild.sort((a, b) => b.values.age - a.values.age);

      // Formatter
      setFamilyMembersInput([
        ...tempHeadOfFamily,
        ...tempWife,
        ...tempChild,
        ...tempAnotherFamily,
      ]);
      setFamilyCardNumberInput(tempFamilyCardNumber);
      setFamilyCardNumberMessage(tempFamilyCardNumberMessage);
    },
    [lang, setToastMsg, translate, validateFamilyMembersSection, validateInput],
  );

  // User Input Validations
  const getUpdataResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_LAST_KTP_INFO_SUCCESS) {
        setLoading(false);
        getUpdataLastKTPInfoClear();
        setIdCardInput(getUpdataLastKTPInfoResponse?.data);
      }
      if (act === GET_UPDATA_LAST_KTP_INFO_FAILED) {
        setLoading(false);
        getUpdataLastKTPInfoClear();
        if (getUpdataLastKTPInfoFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          setToastMsg({
            isOpen: true,
            error: true,
            title: getUpdataLastKTPInfoFailed?.message,
          });
        }
      }
      if (act === GET_UPDATA_LAST_KK_INFO_SUCCESS) {
        setLoading(false);
        setKkpmDataKk(getUpdataLastKKInfoResponse);
        initSetupFamilyMembersData(
          getUpdataLastKKInfoResponse?.data?.familyMembers,
          getUpdataLastKKInfoResponse?.data?.familyCardNumber,
        );
        getUpdataLastKKInfoClear();
      }
      if (act === GET_UPDATA_LAST_KK_INFO_FAILED) {
        setLoading(false);
        getUpdataLastKKInfoClear();
        if (getUpdataLastKKInfoFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          setToastMsg({
            isOpen: true,
            error: true,
            title: getUpdataLastKKInfoFailed?.message,
          });
        }
      }
      if (act === SET_UPDATA_CHECK_KK_KTP_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        setUpdataCheckKKKTPClear();
        // setIsSubmit(false);
        setIsResponseModal(true);
      }
      if (act === SET_UPDATA_CHECK_KK_KTP_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        setUpdataCheckKKKTPClear();
        // setIsSubmit(false);
        if (setUpdataCheckKKKTPFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setUpdataCheckKKKTPFailed?.message === 'INVALID_NIK') {
            setIsInvalidNIKModal(true);
            return;
          }
          setToastMsg({
            isOpen: true,
            error: true,
            title: setUpdataCheckKKKTPFailed?.message,
          });
        }
      }
    },
    [
      getUpdataLastKKInfoClear,
      getUpdataLastKKInfoFailed?.message,
      getUpdataLastKKInfoResponse,
      getUpdataLastKTPInfoClear,
      getUpdataLastKTPInfoFailed?.message,
      getUpdataLastKTPInfoResponse?.data,
      initSetupFamilyMembersData,
      setKkpmDataKk,
      setLoading,
      setToastMsg,
      setUpdataCheckKKKTPClear,
      setUpdataCheckKKKTPFailed?.message,
    ],
  );

  // GET DATA KTP
  useEffect(() => {
    getUpdataLastKTPInfo({ category: 'reminder' });
    if (!isKTPSame) {
      setIdCardInput(setUpdataKTPResponse?.data?.user);
    } else {
      setLoading(true);
      getUpdataLastKTPInfo({ category: 'reminder' });
    }
  }, [
    getUpdataLastKTPInfo,
    isKTPSame,
    setLoading,
    setUpdataKTPResponse?.data?.user,
  ]);

  // GET DATA KK
  useEffect(() => {
    if (!isKKSame) {
      initSetupFamilyMembersData(
        kkpmDataKkState?.data?.family?.familyMembers,
        kkpmDataKkState?.data?.family?.familyCardNumber,
      );
    } else {
      setLoading(true);
      getUpdataLastKKInfo({ category: 'reminder' });
    }
  }, [
    getUpdataLastKKInfo,
    initSetupFamilyMembersData,
    isKKSame,
    setLoading,
    kkpmDataKkState?.data?.family?.familyCardNumber,
    kkpmDataKkState?.data?.family?.familyMembers,
  ]);

  // API RESULT
  // Get Last KTP and KK info
  useEffect(() => {
    getUpdataResult(updataAction);
  }, [updataAction, getUpdataResult]);

  // COUNT TOTAL RELATIONSHIP STATUS
  const getTotalFamilyRelationshipStatus = useCallback((familyMembers) => {
    const tempHeadOfFamily = [];
    const tempWife = [];
    const tempChild = [];
    const tempAnotherFamily = [];

    familyMembers.forEach((item) => {
      if (
        RELATIONSHIP_STATUS.HEAD_OF_FAMILY.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempHeadOfFamily.push(item);
      } else if (
        RELATIONSHIP_STATUS.WIFE.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempWife.push(item);
      } else if (
        RELATIONSHIP_STATUS.CHILD.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempChild.push(item);
      } else {
        tempAnotherFamily.push(item);
      }
    });

    return {
      total: familyMembers.length,
      headOfFamily: tempHeadOfFamily.length,
      wife: tempWife.length,
      child: tempChild.length,
      anotherFamily: tempAnotherFamily.length,
    };
  }, []);
  const totalFamily = useMemo(() => {
    return getTotalFamilyRelationshipStatus(familyMembersInput);
  }, [familyMembersInput, getTotalFamilyRelationshipStatus]);

  // Form Validation
  const isFormInvalid = useCallback(() => {
    const { headOfFamily } =
      getTotalFamilyRelationshipStatus(familyMembersInput);

    // Kepala Keluarga wajib
    const isHeadOfFamilyInvalid =
      headOfFamily < RULES_CONFIG.MAX_HEAD_OF_FAMILY;
    if (isHeadOfFamilyInvalid) {
      setToastMsg({
        isOpen: true,
        error: true,
        title: translate(ERRORS.headOfFamilyNull),
      });
    }

    // const isMaxBeneficiaryInvalid = total > RULES_CONFIG.MAX_BENEFICIARY;
    // if (isMaxBeneficiaryInvalid) {
    //   toast.warn(trans(locale, lang, ERRORS.maxBeneficiaryTotal5))
    // }

    // const isMaxChildInvalid = child > RULES_CONFIG.MAX_CHILD;
    // if (isMaxChildInvalid) {
    //   toast.warn(trans(locale, lang, ERRORS.maxSelectedChildren3))
    // }

    const isFamilyCardNumberInputInvalid = familyCardNumberMessage !== null;

    const isFamilyMembersInputInvalid = familyMembersInput.some((item) => {
      return Object.values(item.messages).some((value) => value !== null);
    });

    return (
      isHeadOfFamilyInvalid ||
      // isMaxBeneficiaryInvalid ||
      // isMaxChildInvalid ||
      isFamilyCardNumberInputInvalid ||
      isFamilyMembersInputInvalid
    );
  }, [
    familyCardNumberMessage,
    familyMembersInput,
    getTotalFamilyRelationshipStatus,
    setToastMsg,
    translate,
  ]);

  // SORT
  const sortFamilyMembersInputState = useCallback((newFamilyMembers) => {
    const tempHeadOfFamily = [];
    const tempWife = [];
    let tempChild = [];
    const tempAnotherFamily = [];

    newFamilyMembers.forEach((item) => {
      if (
        RELATIONSHIP_STATUS.HEAD_OF_FAMILY.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempHeadOfFamily.push(item);
      } else if (
        RELATIONSHIP_STATUS.WIFE.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempWife.push(item);
      } else if (
        RELATIONSHIP_STATUS.CHILD.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempChild.push(item);
      } else {
        tempAnotherFamily.push(item);
      }
    });

    // Sort Child by Age
    tempChild = tempChild.sort((a, b) => {
      const aAge = moment(new Date()).diff(
        moment(a.values.dob, RULES_CONFIG.FORMAT_DATE_INPUT, true),
        'years',
        false,
      );
      const bAge = moment(new Date()).diff(
        moment(b.values.dob, RULES_CONFIG.FORMAT_DATE_INPUT, true),
        'years',
        false,
      );
      return bAge - aAge;
    });

    return [
      ...tempHeadOfFamily,
      ...tempWife,
      ...tempChild,
      ...tempAnotherFamily,
    ];
  }, []);

  // Set State
  // CREATE
  const addFamilyMembersInputState = useCallback(
    (familyRelationshipStatus) => {
      const newConfigs =
        familyRelationshipStatus !== CONSTANT.ANAK
          ? familyMembersInitialConfig
          : childsInitialConfig;
      const errorRequiredMsg = trans(locale, lang, ERRORS.required);
      const newFamilyMember = {
        values: {
          ...familyMembersInitialState,
          familyRelationshipStatus,
        },
        messages: {
          idCardNumber: {
            warning: `${trans(
              locale,
              lang,
              KEYS.idCardNumber,
            )} ${errorRequiredMsg}`,
          },
          name: {
            warning: `${trans(locale, lang, KEYS.name)} ${errorRequiredMsg}`,
          },
          gender: {
            warning: `${trans(locale, lang, KEYS.gender)} ${errorRequiredMsg}`,
          },
          pob: {
            warning: `${trans(locale, lang, KEYS.pob)} ${errorRequiredMsg}`,
          },
          dob: {
            warning: `${trans(locale, lang, KEYS.dob)} ${errorRequiredMsg}`,
          },
          occupation: {
            warning: `${trans(
              locale,
              lang,
              KEYS.occupation,
            )} ${errorRequiredMsg}`,
          },
          maritalStatus: {
            warning: `${trans(
              locale,
              lang,
              KEYS.maritalStatus,
            )} ${errorRequiredMsg}`,
          },
          age: null,
        },
        configs: { ...newConfigs },
      };
      const updatedFamilyMembers = [...familyMembersInput, newFamilyMember];

      // Sort
      const sortedFamilyMembers =
        sortFamilyMembersInputState(updatedFamilyMembers);

      setFamilyMembersInput(sortedFamilyMembers);
    },
    [familyMembersInput, lang, sortFamilyMembersInputState],
  );
  // UPDATE
  const updateFamilyMembersInputState = useCallback(
    (index, inputKey, value, config) => {
      const updatedFamilyMembers = [...familyMembersInput];

      if (inputKey !== KEYS.familyRelationshipStatus) {
        let inputValue = value;

        if (config.includes('number')) {
          inputValue = inputValue.replace(/[^0-9]$/, '');
        }
        const equalLength = config.find((item) => {
          return item.match('equalLength');
        });
        if (equalLength) {
          const maxLength = Number(equalLength.substring(11));
          inputValue = inputValue.substring(0, maxLength);
        }
        updatedFamilyMembers[index] = {
          ...updatedFamilyMembers[index],
          values: {
            ...updatedFamilyMembers[index].values,
            [inputKey]: inputValue,
          },
          messages: {
            ...updatedFamilyMembers[index].messages,
            [inputKey]: validateInput(inputKey, inputValue, config),
          },
        };
      } else {
        updatedFamilyMembers[index] = {
          ...updatedFamilyMembers[index],
          configs:
            value === CONSTANT.ANAK
              ? { ...childsInitialConfig }
              : { ...familyMembersInitialConfig },
        };

        updatedFamilyMembers[index] = {
          ...updatedFamilyMembers[index],
          values: {
            ...updatedFamilyMembers[index].values,
            [inputKey]: value,
          },
          messages: {
            ...updatedFamilyMembers[index].messages,
            [inputKey]: validateInput(inputKey, value, config),
            [KEYS.dob]: validateInput(
              KEYS.dob,
              updatedFamilyMembers[index].values[KEYS.dob],
              updatedFamilyMembers[index].configs[KEYS.dob],
            ),
            [KEYS.occupation]: validateInput(
              KEYS.occupation,
              updatedFamilyMembers[index].values[KEYS.occupation],
              updatedFamilyMembers[index].configs[KEYS.occupation],
            ),
            [KEYS.maritalStatus]: validateInput(
              KEYS.maritalStatus,
              updatedFamilyMembers[index].values[KEYS.maritalStatus],
              updatedFamilyMembers[index].configs[KEYS.maritalStatus],
            ),
          },
        };
      }

      // Sort
      const sortedFamilyMembers =
        sortFamilyMembersInputState(updatedFamilyMembers);

      setFamilyMembersInput(sortedFamilyMembers);
    },
    [familyMembersInput, sortFamilyMembersInputState, validateInput],
  );
  // DELETE
  const deleteFamilyMembersInputState = useCallback(
    (index) => {
      if (index === '') {
        return;
      }
      const updatedFamilyMembers = [...familyMembersInput];

      // const isCurrentFamilyChild =
      //   updatedFamilyMembers[index].values.familyRelationshipStatus ===
      //   CONSTANT.ANAK;
      // const isMaxChildInvalid = totalFamily?.child - 1 > RULES_CONFIG.MAX_CHILD;

      updatedFamilyMembers.splice(index, 1);

      // Mapping Childs Messages
      // if (isCurrentFamilyChild && !isMaxChildInvalid) {
      //   updatedFamilyMembers = updatedFamilyMembers.map((item) => {
      //     if (item.values.familyRelationshipStatus === CONSTANT.ANAK) {
      //       return {
      //         ...item,
      //         messages: {
      //           ...item.messages,
      //           familyRelationshipStatus: null,
      //         },
      //       };
      //     }
      //     return item;
      //   });
      // }

      // Sort
      const sortedFamilyMembers =
        sortFamilyMembersInputState(updatedFamilyMembers);

      setFamilyMembersInput(sortedFamilyMembers);
    },
    [familyMembersInput, sortFamilyMembersInputState],
  );

  const decodeFamilyRelationshipStatus = useCallback((familyStatus) => {
    if (
      familyStatus?.toUpperCase().match('KEPALA KELUARGA') ||
      familyStatus?.toUpperCase().match('SUAMI')
    ) {
      return 'S';
    }
    if (
      familyStatus?.toUpperCase().match('ISTRI') ||
      familyStatus?.toUpperCase().match('ISTERI')
    ) {
      return 'I';
    }
    if (
      familyStatus?.toUpperCase().match('ANAK') ||
      familyStatus?.toUpperCase().match('ANAK KANDUNG') ||
      familyStatus?.toUpperCase().match('ANAK ANGKAT') ||
      familyStatus?.toUpperCase().match('ANAK TIRI')
    ) {
      return '1';
    }
    return familyStatus;
  }, []);

  const decodeMaritalStatus = useCallback((maritalStatus) => {
    if (maritalStatus?.toUpperCase() === MARITAL_STATUS.BELUM_KAWIN) {
      return 'B0';
    }
    if (
      maritalStatus?.toUpperCase() === MARITAL_STATUS.KAWIN ||
      maritalStatus?.toUpperCase() === MARITAL_STATUS.KAWIN_TERCATAT ||
      maritalStatus?.toUpperCase() === MARITAL_STATUS.KAWIN_BELUM_TERCATAT
    ) {
      return 'K0';
    }
    if (
      maritalStatus?.toUpperCase() === MARITAL_STATUS.CERAI_HIDUP ||
      maritalStatus?.toUpperCase() === MARITAL_STATUS.CERAI_MATI
    ) {
      return 'JD';
    }
    return maritalStatus;
  }, []);

  // Mapping Payload
  const mappingPayload = useCallback(
    (type) => {
      const familyCardRes = !isKKSame
        ? kkpmDataKkState?.data?.family
        : kkpmDataKkState?.data;

      const filteredFamilyCard = removeColumnFromObject(
        familyCardRes,
        'familyMembers',
      );

      // Filtered Family Members Input
      const sortedFamilyMembers =
        sortFamilyMembersInputState(familyMembersInput);
      let filteredFamilyMembers = [];
      filteredFamilyMembers = Object.values(sortedFamilyMembers).map((item) => {
        const { age, ...filteredFamilyMember } = item.values;
        return {
          ...filteredFamilyMember,
          dob: moment(
            filteredFamilyMember?.dob,
            RULES_CONFIG.FORMAT_DATE_INPUT,
          ).format(RULES_CONFIG.FORMAT_DATE_INPUT),
        };
      });

      // Filtered Family Members Raw
      let filteredFamilyMembersRaw = [];
      filteredFamilyMembersRaw = Object.values(sortedFamilyMembers).map(
        (item) => {
          if (item.rawValues) {
            const { age, ...filteredFamilyMember } = item.rawValues;
            return filteredFamilyMember;
          }
          const { age, ...filteredFamilyMember } = item.values;
          return {
            ...filteredFamilyMember,
            dob: moment(
              filteredFamilyMember?.dob,
              RULES_CONFIG.FORMAT_DATE_INPUT,
            ).format(RULES_CONFIG.FORMAT_DATE_INPUT),
          };
        },
      );

      if (type === 'verifyPengkinian') {
        const verifyPengkinianPayload = {
          user: {
            ...idCardInput,
            dob: moment(
              idCardInput?.dob,
              RULES_CONFIG.FORMAT_DATE_INPUT,
            ).format(RULES_CONFIG.FORMAT_DATE_INPUT),
          },
          family: {
            ...filteredFamilyCard,
            familyCardNumber: familyCardNumberInput,
            familyMembers: [...filteredFamilyMembers],
          },
        };
        return verifyPengkinianPayload;
      }

      if (type === 'checkKKAndKTP') {
        const checkKKAndKTPPayload = {
          KK: {
            familyCardData: {
              ...filteredFamilyCard,
              familyCardNumber: familyCardNumberInput,
            },
            rawFamilyMembers: [...filteredFamilyMembersRaw],
            familyMembers: [
              // eslint-disable-next-line no-unsafe-optional-chaining
              ...filteredFamilyMembers?.map((data) => {
                return {
                  ...data,
                  gender: data.gender.toUpperCase() === 'PEREMPUAN' ? 'F' : 'M',
                  maritalStatus: decodeMaritalStatus(data.maritalStatus),
                  familyRelationshipStatus: decodeFamilyRelationshipStatus(
                    data.familyRelationshipStatus,
                  ),
                };
              }),
            ],
          },
          KTP: {
            user: {
              ...idCardInput,
              dob: moment(
                idCardInput?.dob,
                RULES_CONFIG.FORMAT_DATE_INPUT,
              ).format(RULES_CONFIG.FORMAT_DATE_INPUT),
              gender:
                idCardInput?.gender?.toUpperCase() === 'PEREMPUAN' ? 'F' : 'M',
              maritalStatus: decodeMaritalStatus(idCardInput?.maritalStatus),
            },
          },
        };
        return checkKKAndKTPPayload;
      }
      return null;
    },
    [
      decodeFamilyRelationshipStatus,
      decodeMaritalStatus,
      familyCardNumberInput,
      familyMembersInput,
      idCardInput,
      isKKSame,
      kkpmDataKkState,
      sortFamilyMembersInputState,
    ],
  );

  // UI Render
  function renderContentContainer() {
    if (_.isEmpty(familyMembersInput)) {
      return <div></div>;
    }
    return (
      <div>
        {familyMembersInput.map((item, index) => {
          return renderItemAccordion(item, index);
        })}
      </div>
    );
  }

  // accordion
  function renderItemAccordion(item, index) {
    const { values, messages, configs } = item;

    let headerLabel =
      trans(locale, lang, values.familyRelationshipStatus) ||
      `${trans(locale, lang, 'keluarga')} ${index + 1}`;

    const isSectionError = Object.values(messages).some(
      (value) => value !== null,
    );

    if (
      RELATIONSHIP_STATUS.CHILD.some((i) => {
        return matchTypoTolerance(i, values.familyRelationshipStatus);
      })
    ) {
      const { headOfFamily, wife } = totalFamily;
      const indexChild = index + 1 - headOfFamily - wife;
      // headerLabel =
      //   lang === 'id'
      //     ? `${trans(locale, lang, 'anak')} ${formatCapitalizeEachWord(
      //         formatOrdinal(Number(indexChild), lang)
      //       )}`
      //     : `${formatCapitalizeEachWord(
      //         formatOrdinal(Number(indexChild), lang)
      //       )} ${trans(locale, lang, 'anak')}`;
      headerLabel = `${trans(
        locale,
        lang,
        values.familyRelationshipStatus,
      )} ${indexChild}`;
    }

    return (
      <div key={index} className="px-4 md:px-10">
        {/* header */}
        <div
          role="button"
          onClick={() => {
            if (activeAccordion.includes(`Panel_${index}`)) {
              setActiveAccordion(
                activeAccordion.filter((i) => i !== `Panel_${index}`),
              );
            } else {
              setActiveAccordion((val) => [...val, `Panel_${index}`]);
            }
          }}
          className={`flex items-center justify-between w-full border-b px-3 py-2 mt-2 rounded-t-xl hover:bg-red-50 
          ${activeAccordion.includes(`Panel_${index}`) ? 'bg-red-50' : ''}
          `}>
          <div className="flex items-center">
            {isSectionError && (
              <Icon icon={warning} size={16} className="text-red-500 mr-2" />
            )}
            <p
              className={`text-sm md:text-sm ${
                isSectionError ? 'text-red-500' : ''
              }`}>{`${translate('dataDiri')} - ${headerLabel}`}</p>
          </div>
          <Icon
            icon={chevronDown}
            size={20}
            className={`duration-500 ${isSectionError ? 'text-red-500' : ''} 
            ${activeAccordion.includes(`Panel_${index}`) ? '-rotate-180' : ''}
            `}
          />
        </div>

        {/* body */}
        <div
          className={`overflow-hidden px-2 sm:px-4 duration-500 ${
            activeAccordion.includes(`Panel_${index}`)
              ? 'h-full py-5 border-b'
              : 'h-0 '
          }`}>
          {renderFamilyRelationshipStatusInput(
            index,
            values.familyRelationshipStatus,
            messages.familyRelationshipStatus,
            configs.familyRelationshipStatus,
          )}
          {renderFamilyCardNumberInput(values.familyRelationshipStatus)}
          {renderIdCardNumberInput(
            index,
            values.idCardNumber,
            messages.idCardNumber,
            configs.idCardNumber,
          )}
          {renderNameInput(index, values.name, messages.name, configs.name)}
          {renderGenderInput(
            index,
            values.gender,
            messages.gender,
            configs.gender,
          )}
          {renderPobInput(index, values.pob, messages.pob, configs.pob)}
          {renderDobInput(index, values.dob, messages.dob, configs.dob)}
          {renderOccupationInput(
            index,
            values.occupation,
            messages.occupation,
            configs.occupation,
          )}
          {renderMaritalStatusInput(
            index,
            values.maritalStatus,
            messages.maritalStatus,
            configs.maritalStatus,
          )}
          {renderDeleteButton(index)}
        </div>
      </div>
    );
  }
  function renderDeleteButton(index) {
    return (
      <div>
        <Button
          type="linear-gradient"
          className="ml-auto mt-6 mb-4 text-[11px] px-5 !w-fit !h-9 xm:text-xs md:px-8"
          onButtonClick={() => {
            setDeleteConfirmationModal({
              isShow: true,
              activeIndex: index,
              config: [],
            });
          }}>
          {trans(locale, lang, 'hapusData')}
        </Button>
      </div>
    );
  }
  function renderFamilyRelationshipStatusInput(index, value, message, config) {
    const inputKey = KEYS.familyRelationshipStatus;
    const onClickInput = () => {
      setFamilyRelationshipStatusDropdown({
        isShow: true,
        activeIndex: index,
        config: config,
      });
    };
    return (
      <div className="mb-2 md:mb-4">
        <Input
          required
          disabled
          disableBgWhite
          role="button"
          value={trans(locale, lang, value)}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          suffixIcon={
            <Icon icon={chevronDown} size={18} className="text-gray-400" />
          }
          handleOnChange={onClickInput}
          message={message}
          inputClassName="!text-xs md:!text-sm"
        />
      </div>
    );
  }
  function renderFamilyCardNumberInput(value) {
    const inputKey = KEYS.familyCardNumber;
    if (!matchTypoTolerance(value, CONSTANT.KEPALA_KELUARGA)) {
      return null;
    }
    return (
      <div className="mb-2 md:mb-4">
        <Input
          required
          type="text"
          inputMode="date"
          value={familyCardNumberInput}
          label={trans(locale, lang, KEYS.familyCardNumber)}
          placeholder={trans(locale, lang, KEYS.familyCardNumber)}
          handleOnChange={(text) => {
            let value = text.replace(/[^0-9]$/, '');
            value = value.substring(0, 16);
            setFamilyCardNumberInput(value);
            setFamilyCardNumberMessage(
              validateInput(inputKey, value, familyCardNumberInitialConfig),
            );
          }}
          message={familyCardNumberMessage}
        />
      </div>
    );
  }
  function renderIdCardNumberInput(index, value, message, config) {
    const inputKey = KEYS.idCardNumber;
    return (
      <div className="mb-2 md:mb-4">
        <Input
          required
          type="text"
          inputMode="date"
          value={value}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          handleOnChange={(text) => {
            updateFamilyMembersInputState(index, inputKey, text, config);
          }}
          message={message}
        />
      </div>
    );
  }
  function renderNameInput(index, value, message, config) {
    const inputKey = KEYS.name;
    return (
      <div className="mb-2 md:mb-4">
        <Input
          required
          value={value}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          handleOnChange={(text) => {
            updateFamilyMembersInputState(index, inputKey, text, config);
          }}
          message={message}
        />
      </div>
    );
  }
  function renderGenderInput(index, value, message, config) {
    const matchGenderMan = matchTypoTolerance(
      value?.toString() || '',
      CONSTANT.LAKI_LAKI,
    );
    const matchGenderGirl = matchTypoTolerance(
      value?.toString() || '',
      CONSTANT.PEREMPUAN,
    );
    const inputKey = KEYS.gender;
    let errorType = [];
    let errorColor = '';
    if (message) {
      errorType = Object.keys(message);
      if (errorType[0] === 'success') {
        errorColor = '';
      }
      if (errorType[0] === 'warning') {
        errorColor = 'text-secondary-light-secondary90';
      }
      if (errorType[0] === 'error') {
        errorColor = 'text-red-500';
      }
    }

    return (
      <div className="mb-2 md:mb-4">
        <div className="flex flex-col items-end justify-between gap-x-4 sm:flex-row">
          <Input
            required
            role="button"
            className={`w-full hover:border-gray-500 mb-2 md:mb-0`}
            inputClassName={`!text-xs ${
              matchGenderMan ? '' : '!text-gray-400'
            }`}
            value="LAKI-LAKI"
            label={translate(inputKey)}
            suffixIcon={
              <Image
                src={matchGenderMan ? MaleActive : Male}
                width={24}
                height={24}
              />
            }
            handleOnChange={() => {
              updateFamilyMembersInputState(
                index,
                inputKey,
                CONSTANT.LAKI_LAKI,
                config,
              );
            }}
            active={matchGenderMan}
          />
          <Input
            required
            role="button"
            className={`w-full`}
            inputClassName={`!text-xs ${
              matchGenderGirl ? '' : '!text-gray-400'
            }`}
            value="PEREMPUAN"
            suffixIcon={
              <Image
                src={matchGenderGirl ? FemaleActive : Female}
                width={24}
                height={24}
              />
            }
            handleOnChange={() => {
              updateFamilyMembersInputState(
                index,
                inputKey,
                CONSTANT.PEREMPUAN,
                config,
              );
            }}
            active={matchGenderGirl}
          />
        </div>
        {errorType[0] ? (
          <p className={`text-caption2 font-medium mt-1 ${errorColor}`}>
            {message[errorType[0]]}
          </p>
        ) : null}
      </div>
    );
  }
  function renderPobInput(index, value, message, config) {
    const inputKey = KEYS.pob;
    return (
      <div className="mb-2 md:mb-4">
        <Input
          required
          value={value}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          handleOnChange={(text) => {
            updateFamilyMembersInputState(index, inputKey, text, config);
          }}
          message={message}
        />
      </div>
    );
  }
  const renderDobInput = useCallback(
    (index, value, message, config) => {
      const inputKey = KEYS.dob;
      const { isShow, activeIndex } = dateTimePickerDropdown;

      const dobValue = moment(
        value,
        RULES_CONFIG.FORMAT_DATE_INPUT,
        true,
      ).isValid()
        ? moment(value, RULES_CONFIG.FORMAT_DATE_INPUT, true).format(
            RULES_CONFIG.FORMAT_DATE_OUTPUT,
          )
        : '';

      const dobDefaultValue = moment(
        value,
        RULES_CONFIG.FORMAT_DATE_INPUT,
        true,
      ).isValid()
        ? new Date(
            moment(value, RULES_CONFIG.FORMAT_DATE_INPUT, true).toISOString(),
          )
        : null;

      const showDateTimePicker = () => {
        setDateTimePickerDropdown({
          isShow: true,
          activeIndex: index,
          config: config,
        });
      };
      const hideDateTimePicker = () => {
        setDateTimePickerDropdown({
          isShow: false,
          activeIndex: '',
          config: [],
        });
      };
      return (
        <div className="mb-2 md:mb-4">
          <Input
            type="date"
            required
            valueDate={value}
            label={trans(locale, lang, inputKey)}
            placeholder={trans(locale, lang, inputKey)}
            suffixIcon={<Image src={Calendar} width={32} height={32} alt="" />}
            maxDate={yesterdayDate}
            formatDateOutput={RULES_CONFIG.FORMAT_DATE_OUTPUT}
            lang={lang}
            handleOnChange={(event, selectedDate) => {
              const tempDate = event;
              updateFamilyMembersInputState(index, inputKey, tempDate, config);
            }}
            message={message}
          />
        </div>
      );
    },
    [
      dateTimePickerDropdown,
      lang,
      yesterdayDate,
      updateFamilyMembersInputState,
    ],
  );
  function renderOccupationInput(index, value, message, config) {
    const inputKey = KEYS.occupation;
    return (
      <div className="mb-2 md:mb-4">
        <Input
          required
          inputMode="number"
          value={value}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          handleOnChange={(text) => {
            updateFamilyMembersInputState(index, inputKey, text, config);
          }}
          message={message}
        />
      </div>
    );
  }
  function renderMaritalStatusInput(index, value, message, config) {
    const inputKey = KEYS.maritalStatus;
    const onClickInput = () => {
      setMaritalStatusDropdown({
        isShow: true,
        activeIndex: index,
        config: config,
      });
    };
    return (
      <div className="mb-2 md:mb-4">
        <Input
          required
          disabled
          disableBgWhite
          role="button"
          value={trans(locale, lang, value)}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          suffixIcon={
            <Icon icon={chevronDown} size={18} className="text-gray-400" />
          }
          handleOnChange={onClickInput}
          message={message}
          inputClassName="!text-xs md:!text-sm"
        />
      </div>
    );
  }
  function renderFooterContainer() {
    const addData = () => {
      setFamilyRelationshipStatusDropdown({
        isShow: true,
        activeIndex: '',
        config: [],
      });

      // setTimeout(() => {
      //   const temp = activeAccordion?.slice(0, activeAccordion?.length - 2);
      //   setActiveAccordion([
      //     ...temp,
      //     { id: activeAccordion?.length - 1, status: true },
      //   ]);
      // }, 2000);
    };
    const submitData = () => {
      setIsSubmit(true);
      setLoading(true);
      setUpdataCheckKKKTP({
        category,
        certificateNo,
        policyNo,
        source,
        ...mappingPayload('checkKKAndKTP'),
      });
      setUpdataTempState({
        verifyPengkinianPayload: {
          ...mappingPayload('verifyPengkinian'),
        },
      });
    };

    return (
      <div className="w-full max-w-2xl mx-auto px-3 py-4 md:p-5">
        <Button
          full
          outline
          className="mb-3 md:mb-4 !h-10 text-sm md:!h-11 md:text-base"
          onButtonClick={addData}>
          {translate('plusPenerimaManfaat')}
        </Button>
        <Button
          full
          type="linear-gradient"
          className="!h-10 text-sm md:!h-11 md:text-base"
          disabled={isFormInvalid() || isSubmit}
          onButtonClick={submitData}>
          {translate('lanjut')}
        </Button>
      </div>
    );
  }

  // Modal
  const renderResponseModal = useCallback(() => {
    let icon = ReviewKK;
    let title = 'kamiTidakMenemukan';
    let subtitle = 'dataKartuKeluarga';
    // if (
    //   setUpdataCheckKKKTPResponse?.data?.isChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === 'kurang'
    // ) {
    //   // Kurang
    //   icon = KKEdit;
    //   title = 'kamiMenemukanPerubahan';
    //   subtitle = 'dataLamaPada';
    // }
    // if (
    //   setUpdataCheckKKKTPResponse?.data?.isChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === 'tambah'
    // ) {
    //   // Tambah
    //   icon = KKVerifikasi;
    //   title = 'kamiMenemukanPerubahan';
    //   subtitle = 'dataBaruPada';
    // }
    // if (
    //   setUpdataCheckKKKTPResponse?.data?.isChanged &&
    //   !setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === ''
    // ) {
    //   // Change
    //   icon = KKVerifikasi;
    //   title = 'kamiMenemukanPerubahan';
    //   subtitle = 'dataKamuAkan';
    // }
    // if (
    //   !setUpdataCheckKKKTPResponse?.data?.isChanged &&
    //   !setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === ''
    // ) {
    //   // No Change
    //   icon = KKVerifikasi;
    //   title = 'kamiTidakMenemukan';
    //   subtitle = 'dataKartuKeluarga';
    // }

    if (setUpdataCheckKKKTPResponse?.data?.isChanged) {
      // Changed
      icon = ReviewKK;
      title = 'kamiMenemukanPerubahan';
      subtitle = 'dataKamuAkan';
    } else {
      // No Change
      icon = ReviewKK;
      title = 'kamiTidakMenemukan';
      subtitle = 'dataKartuKeluarga';
    }

    const reviewRow = (row) => {
      return (
        <div className="flex items-center">
          <Icon
            icon={ic_check}
            size={20}
            className="text-red-500 font-semibold mb-0.5"
          />
          <p className="pl-2 md:pl-3 md:text-base text-sm">{row}</p>
        </div>
      );
    };

    return (
      <Modal isOpen={isResponseModal} size="sm" className="relative mt-10">
        <div className="absolute -top-16 w-full flex justify-center mb-6 xm:-top-20">
          <img
            src={ReviewKK}
            className="relative mx-auto -left-4 w-3/5 md:w-3/5"
          />
        </div>
        <p className="font-bold text-center mt-10 text-sm xm:text-base md:text-lg md:mt-16">
          {translate(title)}
        </p>
        <div className="py-2 md:py-4">
          {totalFamily.headOfFamily > 0 &&
            reviewRow(translate(CONSTANT.KEPALA_KELUARGA))}
          {totalFamily.wife > 0 && reviewRow(translate(CONSTANT.ISTRI))}
          {totalFamily.child > 0 &&
            Array(totalFamily.child)
              .fill(CONSTANT.ANAK)
              .map((item, index) => {
                const text =
                  lang === 'id'
                    ? `${translate(item)} ${formatCapitalizeEachWord(
                        formatOrdinal(Number(index) + 1, lang),
                      )}`
                    : `${formatCapitalizeEachWord(
                        formatOrdinal(Number(index) + 1, lang),
                      )} ${translate('anak')}`;
                return reviewRow(text);
              })}
        </div>

        <p className="text-center pb-6 pt-2 text-xs md:text-sm">
          {translate(subtitle)}
        </p>

        <Button
          full
          outline
          onButtonClick={() => setIsResponseModal(false)}
          className="text-xs xm:text-sm mb-2 !h-10 md:mb-4 md:!h-11 md:text-base">
          {translate('kembali')}
        </Button>
        <Button
          full
          type="linear-gradient"
          onButtonClick={() => {
            setIsResponseModal(false);
            router.push(NAVIGATION.UPDATA.UpdataInformation);
          }}
          className="text-xs xm:text-sm !h-10 md:!h-11 md:text-base">
          {translate('lanjut')}
        </Button>
      </Modal>
      // <BottomSheet isVisible={isResponseModal} swipeable={false}>
      //   <View style={style.modal.noChange.container}>
      //     <View style={style.modal.noChange.image.container}>
      //       <Image
      //         source={icon}
      //         style={style.modal.noChange.image.image}
      //         resizeMode="contain"
      //       />
      //     </View>
      //     <Text
      //       textStyle="bold"
      //       size={Size.text.h6.size}
      //       line={27}
      //       letterSpacing={0.5}
      //       align="center"
      //       style={style.modal.noChange.title}>
      //       {trans(locale, lang, title)}
      //     </Text>
      //     <View style={style.modal.noChange.reviewRow.container}>
      //       {totalFamily.headOfFamily > 0 &&
      //         reviewRow(trans(locale, lang, CONSTANT.KEPALA_KELUARGA))}
      //       {totalFamily.wife > 0 &&
      //         reviewRow(trans(locale, lang, CONSTANT.ISTRI))}
      //       {totalFamily.child > 0 &&
      //         Array(totalFamily.child)
      //           .fill(CONSTANT.ANAK)
      //           .map((item, index) => {
      //             const text =
      //               lang === 'id'
      //                 ? `${trans(
      //                     locale,
      //                     lang,
      //                     item,
      //                   )} ${formatCapitalizeEachWord(
      //                     formatOrdinal(Number(index) + 1, lang),
      //                   )}`
      //                 : `${formatCapitalizeEachWord(
      //                     formatOrdinal(Number(index) + 1, lang),
      //                   )} ${trans(locale, lang, 'anak')}`;
      //             return reviewRow(text);
      //           })}
      //     </View>
      //   </View>
      // </BottomSheet>
    );
  }, [
    isResponseModal,
    lang,
    router,
    setUpdataCheckKKKTPResponse?.data?.isChanged,
    totalFamily.child,
    totalFamily.headOfFamily,
    totalFamily.wife,
    translate,
  ]);
  const renderFamilyRelationshipStatusDropdown = useCallback(() => {
    const inputKey = KEYS.familyRelationshipStatus;
    const { isShow, activeIndex, config } = familyRelationshipStatusDropdown;
    const { headOfFamily, wife, child } = totalFamily;

    const closeDropdown = () => {
      setFamilyRelationshipStatusDropdown({
        isShow: false,
        activeIndex: '',
        config: [],
      });
    };
    const addData = (value) => {
      addFamilyMembersInputState(value);
      setActiveAccordion([
        ...activeAccordion,
        { id: activeAccordion?.length, status: true },
      ]);
    };
    const updateData = (value) => {
      updateFamilyMembersInputState(activeIndex, inputKey, value, config);
    };

    const options = [
      {
        disabled: headOfFamily >= RULES_CONFIG.MAX_HEAD_OF_FAMILY,
        label: trans(locale, lang, CONSTANT.KEPALA_KELUARGA),
        icon:
          headOfFamily >= RULES_CONFIG.MAX_HEAD_OF_FAMILY ? (
            <img src={FatherGray} className="w-6 md:w-8" />
          ) : (
            <img src={Father} className="w-6 md:w-8" />
          ),
        onClick: () => {
          if (activeIndex !== '') {
            updateData(CONSTANT.KEPALA_KELUARGA);
          } else {
            addData(CONSTANT.KEPALA_KELUARGA);
          }
          closeDropdown();
        },
      },
      {
        disabled: wife >= RULES_CONFIG.MAX_WIFE,
        label: trans(locale, lang, CONSTANT.ISTRI),
        icon:
          wife >= RULES_CONFIG.MAX_WIFE ? (
            <img src={MotherGray} className="w-6 md:w-8" />
          ) : (
            <img src={Mother} className="w-6 md:w-8" />
          ),
        onClick: () => {
          if (activeIndex !== '') {
            updateData(CONSTANT.ISTRI);
          } else {
            addData(CONSTANT.ISTRI);
          }
          closeDropdown();
        },
      },
      {
        // disabled: child >= RULES_CONFIG.MAX_CHILD,
        disabled: false,
        label: trans(locale, lang, CONSTANT.ANAK),
        // icon:
        //   child >= RULES_CONFIG.MAX_CHILD ? (
        //     <ChildGray style={style.dropDown.icon} />
        //   ) : (
        //     <Child style={style.dropDown.icon} />
        //   ),
        icon: <img src={Child} className="w-6 md:w-8" />,
        onClick: () => {
          if (activeIndex !== '') {
            updateData(CONSTANT.ANAK);
          } else {
            addData(CONSTANT.ANAK);
          }
          closeDropdown();
        },
      },
    ];
    return (
      <Modal isOpen={isShow} size="sm">
        <div className="flex items-center pb-4 mb-1 border-b font-semibold justify-between text-xs xm:text-sm md:text-base">
          <Icon
            icon={ic_clear}
            size={18}
            role="button"
            className="md:pl-3"
            onClick={closeDropdown}
          />
          <p className="pl-2">{translate('familyRelationshipStatus')}</p>
          <div></div>
        </div>
        <div className="divide-y">
          {options.map(({ disabled, label, icon, onClick }, idx) => (
            <div
              key={idx}
              role="button"
              onClick={disabled ? null : onClick}
              className={`flex items-center px-1 py-3 duration-300 ${
                disabled ? 'cursor-default' : 'hover:bg-red-50'
              }`}>
              {icon}
              <p
                className={`pl-3 text-xs xm:text-sm md:text-base md:pl-4 ${
                  disabled ? 'text-gray-400' : 'text-gray-700'
                }`}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    );
  }, [
    activeAccordion,
    addFamilyMembersInputState,
    familyRelationshipStatusDropdown,
    lang,
    totalFamily,
    translate,
    updateFamilyMembersInputState,
  ]);
  const renderMaritalStatusDropdown = useCallback(() => {
    const inputKey = KEYS.maritalStatus;
    const { isShow, activeIndex, config } = maritalStatusDropdown;

    const closeDropdown = () => {
      setMaritalStatusDropdown({
        isShow: false,
        activeIndex: '',
        config: [],
      });
    };

    const options = [
      {
        label: trans(locale, lang, MARITAL_STATUS.BELUM_KAWIN),
        onClick: () => {
          updateFamilyMembersInputState(
            activeIndex,
            inputKey,
            MARITAL_STATUS.BELUM_KAWIN,
            config,
          );
          closeDropdown();
        },
      },
      {
        label: trans(locale, lang, MARITAL_STATUS.KAWIN),
        onClick: () => {
          updateFamilyMembersInputState(
            activeIndex,
            inputKey,
            MARITAL_STATUS.KAWIN,
            config,
          );
          closeDropdown();
        },
      },
      {
        label: trans(locale, lang, MARITAL_STATUS.CERAI_HIDUP),
        onClick: () => {
          updateFamilyMembersInputState(
            activeIndex,
            inputKey,
            MARITAL_STATUS.CERAI_HIDUP,
            config,
          );
          closeDropdown();
        },
      },
      {
        label: trans(locale, lang, MARITAL_STATUS.CERAI_MATI),
        onClick: () => {
          updateFamilyMembersInputState(
            activeIndex,
            inputKey,
            MARITAL_STATUS.CERAI_MATI,
            config,
          );
          closeDropdown();
        },
      },
    ];

    return (
      <Modal isOpen={isShow} size="sm" toggle={closeDropdown}>
        <div className="divide-y">
          {options.map(({ label, onClick }, idx) => (
            <div
              role="button"
              key={idx}
              onClick={onClick}
              className="flex items-center duration-300 hover:bg-red-50">
              <p className="px-1 py-2 text-xs xm:text-sm md:text-base">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Modal>
      // <BottomSheet
      //   isVisible={isShow}
      //   leftTitle={false}
      //   swipeable={false}
      //   isPadder={false}
      //   title={trans(locale, lang, inputKey)}
      //   onClosePress={closeDropdown}>
      //   <View style={style.dropDown.container}>
      //     {options.map(({ label, onPress }) => (
      //       <TouchableOpacity key={label} onPress={onPress}>
      //         <View style={style.dropDown.item}>
      //           <Text
      //             textStyle="semi"
      //             size={Size.text.body2.size}
      //             line={20}
      //             letterSpacing={0.5}>
      //             {label}
      //           </Text>
      //         </View>
      //       </TouchableOpacity>
      //     ))}
      //   </View>
      // </BottomSheet>
    );
  }, [lang, maritalStatusDropdown, updateFamilyMembersInputState]);
  const renderDeleteConfirmationModal = useCallback(() => {
    const { isShow, activeIndex } = deleteConfirmationModal;
    const hideModal = () => {
      setDeleteConfirmationModal({
        isShow: false,
        activeIndex: '',
        config: [],
      });
    };
    const deleteData = () => {
      deleteFamilyMembersInputState(activeIndex);
      hideModal();
    };
    return (
      <Modal isOpen={isShow} size="sm" className="relative mt-20">
        <div className="absolute w-full -top-20 xm:-top-28 left-0">
          <img src={TrashBin} className="w-3/5 mx-auto" />
        </div>
        <div className="pb-6 pt-14 xm:pt-16 md:pb-10 md:pt-28">
          <p className="font-bold text-center text-base xm:text-base md:text-lg">
            {translate('apakahKamuYakin')}
          </p>
        </div>
        <Button
          full
          outline
          onButtonClick={hideModal}
          className="text-xs xm:text-sm mb-2 !h-10 md:mb-4 md:!h-11 md:text-base">
          {translate('kembali')}
        </Button>
        <Button
          full
          type="linear-gradient"
          onButtonClick={deleteData}
          className="text-xs xm:text-sm !h-10 md:!h-11 md:text-base">
          {translate('hapus')}
        </Button>
      </Modal>
    );
  }, [deleteConfirmationModal, deleteFamilyMembersInputState, translate]);
  function renderInvalidNIKModal() {
    return (
      <Modal isOpen={isInvalidNIKModal} size="sm">
        <div>
          <img src={KtpTidakCocok} />
        </div>
        <div>
          <p>{translate('oopsNIKKamu')}</p>
          <p>{translate('nikSaatVerifikasi')}</p>
        </div>
        <Button
          full
          type="linear-gradient"
          onButtonClick={() => {
            setIsInvalidNIKModal(false);
          }}>
          {translate('cobaLagi')}
        </Button>
      </Modal>
    );
  }

  return (
    <div>
      <HeaderPage
        isHelp
        title={trans(locale, lang, 'pengkinianData')}
        onClickBack={() => {
          router.back();
        }}
      />
      <div className="relative w-full flex justify-center -top-10 min-h-[60vh] mb-12 sm:px-4 sm:p-4 md:-top-16">
        <div className="z-10 w-full pb-5 bg-white md:shadow-md sm:rounded-3xl sm:max-w-2xl">
          <UpdataStep step3 title={translate('reviewKartuKeluarga')} />
          <div className="flex flex-col justify-between h-full md:h-5/6">
            {renderContentContainer()}
            {renderFooterContainer()}
          </div>
        </div>
      </div>
      {renderResponseModal()}
      {renderInvalidNIKModal()}
      {renderFamilyRelationshipStatusDropdown()}
      {renderMaritalStatusDropdown()}
      {renderDeleteConfirmationModal()}
    </div>
  );
}
