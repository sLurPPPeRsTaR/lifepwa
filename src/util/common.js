import { store } from '@cp-config/Store';
import CryptoJS from 'crypto-js';
import { useEffect, useRef, useState } from 'react';
import { LIFETAG_ENV } from './constant';

export const regexNumber = /^-?\d+\.?\d*$/;
export const regexWord = /^[a-zA-Z0-9_ ]*$/;
export const regexName = /^[a-zA-Z\w']+([\s][a-zA-Z\w']+)*$/;
export const regexNickName =
  /^[a-zA-Z\w']+([a-zA-Z']{2,25}$)+([\s][a-zA-Z\w']+[^']+)*$/;
export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const regexMobile =
  /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,7}$/;
export const regexPassword =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
export const regexGlobalPhoneNumber = /^\+{0,1}[0-9]+$/;
export const regexAddress = /[^a-zA-Z 0-9\w.'/,-]/g;
export const regexNameBachelorDegree =
  /^([A-Za-z]\.\s)*([A-Za-z'’`\.\s]+)(,\s?([A-Za-z]{1,5}|([A-Za-z]{1,5}[\.\-]\s?)+([A-Za-z]{1,5})?))*$/;
export const regexNumeric = /[^0-9]/g;
export const regexBirthPlace = /[^a-zA-Z 0-9\w'’]/g;
export const regexOccupation = /[^a-zA-Z/ -]/;
export const regexDiseaseHistory = /^[a-zA-Z0-9_\-.()'/ ]*$/;

export const monthName = {
  id: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

export const monthThreeCharacter = {
  id: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ],
  en: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
};

export const setFormatDate = (date, lang, three) => {
  let result = '';
  const newDate = date?.toString()?.split('-')?.reverse();

  if (three) {
    result = newDate
      ?.map((e, i) => (i === 1 ? monthThreeCharacter?.[lang]?.[+e - 1] : e))
      ?.join(' ');
  } else {
    result = newDate
      ?.map((e, i) => (i === 1 ? monthName?.[lang]?.[+e - 1] : e))
      ?.join(' ');
  }

  return result;
};

export const getCurrentTime = () => {
  const newTime = new Date();
  const hour = newTime.getHours();
  const minutes = newTime.getMinutes();
  const times = (e) => (e < 10 ? `0${e}` : e);
  return times(hour) + ':' + times(minutes);
};

export const setRupiahEn = (val) => {
  const convert =
    val
      ?.toString()
      ?.split('')
      ?.reverse()
      ?.map((e, i) => (i && !(i % 3) ? `${e}.` : e))
      ?.reverse()
      ?.join('') || '-';

  return 'IDR ' + convert + ',-';
};

export const setRupiah = (val, lang, fraction) => {
  const convert =
    val
      ?.toString()
      ?.split('')
      ?.reverse()
      ?.map((e, i) => (i && !(i % 3) ? `${e}.` : e))
      ?.reverse()
      ?.join('') || '-';

  if (lang === 'id') {
    return 'Rp ' + convert + (fraction ? ',00' : ',-');
  } else if (lang === 'en') {
    return 'IDR ' + convert + (fraction ? ',00' : ',-');
  }
};

export const useBreakpoints = () => {
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [isXl, setIsXl] = useState(false);

  const handleResize = (windowWidth) => {
    if (windowWidth > 1024) {
      setIsXl(true);
      setIsLg(false);
      setIsMd(false);
      setIsSm(false);
      return;
    } else if (windowWidth > 768 && windowWidth < 1024) {
      setIsLg(true);
      setIsXl(false);
      setIsMd(false);
      setIsSm(false);
      return;
    } else if (windowWidth > 640 && windowWidth < 768) {
      setIsMd(true);
      setIsXl(false);
      setIsLg(false);
      setIsSm(false);
      return;
    } else if (windowWidth < 640) {
      setIsSm(true);
      setIsXl(false);
      setIsLg(false);
      setIsMd(false);
      return;
    }
  };

  useEffect(() => {
    handleResize(window.innerWidth);

    const unsub = () => handleResize(window.innerWidth);
    window.addEventListener('resize', unsub);
    return () => {
      window.removeEventListener('resize', unsub);
    };
  }, [handleResize]);

  return {
    isSm,
    isMd,
    isLg,
    isXl,
  };
};

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

const browserVersion = (userAgent, regex) => {
  return userAgent.match(regex) ? userAgent.match(regex)[2] : null;
};

export const getBrowser = () => {
  const userAgent = navigator.userAgent;
  let browser = 'unkown';
  // Detect browser name
  browser = /ucbrowser/i.test(userAgent) ? 'UCBrowser' : browser;
  browser = /edg/i.test(userAgent) ? 'Edge' : browser;
  browser = /googlebot/i.test(userAgent) ? 'GoogleBot' : browser;
  browser = /chromium/i.test(userAgent) ? 'Chromium' : browser;
  browser =
    /firefox|fxios/i.test(userAgent) && !/seamonkey/i.test(userAgent)
      ? 'Firefox'
      : browser;
  browser =
    /; msie|trident/i.test(userAgent) && !/ucbrowser/i.test(userAgent)
      ? 'IE'
      : browser;
  browser =
    /chrome|crios/i.test(userAgent) &&
    !/opr|opera|chromium|edg|ucbrowser|googlebot/i.test(userAgent)
      ? 'Chrome'
      : browser;
  browser =
    /safari/i.test(userAgent) &&
    !/chromium|edg|ucbrowser|chrome|crios|opr|opera|fxios|firefox/i.test(
      userAgent,
    )
      ? 'Safari'
      : browser;
  browser = /opr|opera/i.test(userAgent) ? 'Opera' : browser;

  // detect browser version
  switch (browser) {
    case 'UCBrowser':
      return `${browser}/${browserVersion(userAgent, /(ucbrowser)\/([\d]+)/i)}`;
    case 'Edge':
      return `${browser}/${browserVersion(
        userAgent,
        /(edge|edga|edgios|edg)\/([\d]+)/i,
      )}`;
    case 'GoogleBot':
      return `${browser}/${browserVersion(userAgent, /(googlebot)\/([\d]+)/i)}`;
    case 'Chromium':
      return `${browser}/${browserVersion(userAgent, /(chromium)\/([\d]+)/i)}`;
    case 'Firefox':
      return `${browser}/${browserVersion(
        userAgent,
        /(firefox|fxios)\/([\d]+)/i,
      )}`;
    case 'Chrome':
      return `${browser}/${browserVersion(
        userAgent,
        /(chrome|crios)\/([\d]+)/i,
      )}`;
    case 'Safari':
      return `${browser}/${browserVersion(userAgent, /(safari)\/([\d]+)/i)}`;
    case 'Opera':
      return `${browser}/${browserVersion(userAgent, /(opera|opr)\/([\d]+)/i)}`;
    case 'IE':
      const version = browserVersion(userAgent, /(trident)\/([\d]+)/i);
      // IE version is mapped using trident version
      // IE/8.0 = Trident/4.0, IE/9.0 = Trident/5.0
      return version
        ? `${browser}/${parseFloat(version) + 4.0}`
        : `${browser}/7.0`;
    default:
      return `unknown/0.0.0.0`;
  }
};

export const getTimeLeft = (until) => {
  return {
    seconds: until % 60,
    minutes: parseInt(until / 60, 10) % 60,
    hours: parseInt(until / (60 * 60), 10) % 24,
    days: parseInt(until / (60 * 60 * 24), 10),
  };
};

export const generateCardNo = (num, pastValue) => {
  const joy = num.replace(/ /g, '').match(/.{1,4}/g);
  let join;

  const check = pastValue.replace(/ /g, '');
  if (check.length % 4 === 0 && num.includes(' ')) {
    return num;
  }
  if (joy?.length > 0) {
    join = joy?.join(' ');
  } else {
    join = '';
  }
  if (/^(?=.*\d)[\d ]+$/.test(num)) {
    return join;
  }
  if (num === '') {
    return num;
  }
  return pastValue;
};

export const formatedCardDate = (expdate, pastValue) => {
  let value = expdate;
  if (pastValue?.length === 1 && expdate?.length === 2) {
    value = expdate + '/';
  }

  if (expdate?.length === 6) {
    value = expdate.substring(0, 5);
  }

  const thisDate = new Date();
  const isExpMonthValid = value.split('/')[0] <= 12;
  const isFormatValid = value.split('/')[1]?.length === 2;
  const isExpValid = () => {
    if (value.split('/')[1] > thisDate.getFullYear() % 2000) {
      return true;
    } else if (
      value.split('/')[1] >= thisDate.getFullYear() % 2000 &&
      parseInt(value.split('/')[0], 10) >= thisDate.getMonth() + 1
    ) {
      return true;
    }
    return false;
  };
  if (!isExpMonthValid) {
    return {
      value,
      error: 'formatBulanTidakValid',
    };
  }
  if (!isFormatValid) {
    return {
      value,
      error: 'formatTglTidakValid',
    };
  }
  if (!isExpValid()) {
    return {
      value,
      error: 'cardExpired',
    };
  }
  return {
    value,
    error: false,
  };
};

export const specialRender = ({ content = '', mapping = [] }) => {
  if (!content) return;

  let initContent = content;

  // mapping new content
  mapping?.forEach((e) => {
    if (content?.includes(e[0])) {
      initContent = initContent?.replace(e[0], 'XFLAG' + e[0] + 'XFLAG');
    }
  });

  // get new content
  const renderedContent = initContent?.split('XFLAG');

  renderedContent?.forEach((e, i) => {
    const isSpecialRenderIndex = mapping?.findIndex((f) => f[0] === e);

    if (isSpecialRenderIndex !== -1) {
      renderedContent.splice(i, 1, mapping[isSpecialRenderIndex][1]);
    }
  });

  return <div>{renderedContent}</div>;
};

export const diffPolicyDueDate = (policyDueDate) => {
  return Math.ceil(
    (new Date(new Date(policyDueDate) - 1000 * 60 * 60 * 7) - new Date()) /
      (1000 * 60 * 60 * 24),
  );
};

// fotmat phone
export const setPhoneFormat = (origin) => {
  const orgStr = origin?.replace(/\s/g, '');
  let str = origin?.replace(/\D/g, '');
  str = str?.startsWith(0) ? str.substring(1) : str;
  str = str?.startsWith('62') ? str.substring(2) : str;
  str = str?.startsWith(8) ? `+62${str}` : orgStr;
  return str;
};

export const setMaskingPhone = (origin) => {
  if (!origin) {
    return origin;
  }
  const formatted = setPhoneFormat(origin);
  const length = formatted?.length;
  const prefix = formatted.substring(0, 6);
  const masked = '*'.repeat(length - 2 - 6);
  const suffix = formatted.substring(length - 2, length);
  return `${prefix}${masked}${suffix}`;
};

export const encryptMpin = (payload, dataValue, action) => {
  const { deviceId } = store.getState().auth.userData;
  const { parameter, timePeriodSeconds } =
    store.getState().bootstrap.appConfig.features;
  const hash = CryptoJS.SHA256(dataValue).toString();
  const iv = CryptoJS.enc.Latin1.parse(parameter);
  const key = CryptoJS.PBKDF2(hash, deviceId, {
    iterations: 64,
    keySize: 8,
    hasher: CryptoJS.algo.SHA256,
  });
  const signature = (data) => {
    const time = Math.ceil(new Date().getTime() / 1000 / timePeriodSeconds);
    const text = CryptoJS.SHA256(
      `${hash}:${JSON.stringify(data)}:${time}`,
    ).toString();
    return text;
  };
  if (action === 'VERIFY_PIN') {
    const encryptResult = CryptoJS.AES.encrypt(JSON.stringify(payload), key, {
      iv: iv,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.NoPadding,
    });
    return {
      data: encryptResult.toString(),
      signature: signature(payload),
    };
  }
  if (action === 'CHANGE_PIN') {
    const encryptResult = CryptoJS.AES.encrypt(JSON.stringify(payload), key, {
      iv: iv,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.NoPadding,
    });
    return {
      data: encryptResult.toString(),
      signature: signature(payload),
    };
  }
  if (action === 'CREATE_PIN') {
    const encryptResult = CryptoJS.SHA256(payload, key);
    return {
      pin: encryptResult.toString(),
      pinConfirmation: encryptResult.toString(),
    };
  }
  return {};
};

export const encryptLifetagId = (text) => {
  const { id, iv } = LIFETAG_ENV;
  const cipherText = CryptoJS.AES.encrypt(text, id, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  }).toString();
  const returnText = cipherText;
  return CryptoJS.enc.Base64.parse(returnText);
};

export const decryptLifetagId = (text) => {
  const { id, iv } = LIFETAG_ENV;
  const decr = CryptoJS.enc.Hex.parse(text);
  const cipherText = CryptoJS.enc.Base64.stringify(decr);
  return CryptoJS.AES.decrypt(cipherText, id, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  }).toString(CryptoJS.enc.Utf8);
};

function sanitizeInput(input) {
  return input.replace(/<\/?[\w\s="/.':;#-\/\?]+>/gi, '');
}

export const windowTopLocation = () => {
  if (window.location !== window.top.location) {
    window.top.location = window.location;
    // window.open("https://uat.life.id/payment/success","_self")
  }
};

export const generateAddress = (data) => {
  const jalan = data?.street || '',
    rt = data?.rt || '',
    rw = data?.rw || '',
    desa = data?.subDistrict?.value
      ? data?.subDistrict?.value
      : data?.subDistrict || '',
    kecamatan = data?.district?.value
      ? data?.district?.value
      : data?.district || '',
    kota = data?.city?.value ? data?.city?.value : data?.city || '',
    provinsi = data?.province?.value
      ? data?.province?.value
      : data?.province || '',
    kodePos = data?.postcode?.value
      ? data?.postcode?.value
      : data?.postcode || '';

  const stringAddress = `${jalan}, ${
    rt && rw ? `RT${rt}/RW${rw}` : ''
  }, ${desa}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
    .replace(/ ,/g, '')
    .trim()
    .replace(/^, /g, '')
    .trim()
    .replace(/,$/g, '');

  return stringAddress;
};

const levenshtein = (a, b) => {
  const c = a.length + 1;
  const d = b.length + 1;
  const r = Array(c);
  for (let i = 0; i < c; i += 1) r[i] = Array(d);
  for (let i = 0; i < c; i += 1) r[i][0] = i;
  for (let j = 0; j < d; j += 1) r[0][j] = j;
  for (let i = 1; i < c; i += 1) {
    for (let j = 1; j < d; j += 1) {
      const s = a[i - 1] === b[j - 1] ? 0 : 1;
      r[i][j] = Math.min(r[i - 1][j] + 1, r[i][j - 1] + 1, r[i - 1][j - 1] + s);
    }
  }
  return r[a.length][b.length];
};

export const matchTypoTolerance = (str1, str2, minTolerance = 3) => {
  const s1 = str1 || '';
  const s2 = str2 || '';
  const distance = levenshtein(
    s1.toLowerCase().replace(/\s/g, ''),
    s2.toLowerCase().replace(/\s/g, ''),
  );
  return distance <= minTolerance;
};

export const removeColumnFromObject = (obj, columnKey) => {
  const newObj = { ...obj };
  delete newObj[columnKey];
  return newObj;
};

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export function age(birthdate) {
  const today = new Date();
  const age =
    today.getFullYear() -
    birthdate.getFullYear() -
    (today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() &&
        today.getDate() < birthdate.getDate()));
  return age;
}
