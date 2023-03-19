export function getTimestamp(date) {
  let bulan = date.getMonth();
  switch (bulan) {
    case 0:
      bulan = '01';
      break;
    case 1:
      bulan = '02';
      break;
    case 2:
      bulan = '03';
      break;
    case 3:
      bulan = '04';
      break;
    case 4:
      bulan = '05';
      break;
    case 5:
      bulan = '06';
      break;
    case 6:
      bulan = '07';
      break;
    case 7:
      bulan = '08';
      break;
    case 8:
      bulan = '09';
      break;
    case 9:
      bulan = '10';
      break;
    case 10:
      bulan = '11';
      break;
    case 11:
      bulan = '12';
      break;
    default:
  }
  return `${date.getFullYear()}-${bulan}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function formatOrdinal(val, locale = 'id') {
  if (val === 1) {
    return locale === 'id' ? 'pertama' : 'first';
  }
  if (val === 2) {
    return locale === 'id' ? 'kedua' : 'second';
  }
  if (val === 3) {
    return locale === 'id' ? 'ketiga' : 'third';
  }
  if (val === 4) {
    return locale === 'id' ? 'keempat' : 'fourth';
  }
  if (val === 5) {
    return locale === 'id' ? 'kelima' : 'fifth';
  }
  if (val === 6) {
    return locale === 'id' ? 'keenam' : 'sixth';
  }
  if (val === 7) {
    return locale === 'id' ? 'ketujuh' : 'seventh';
  }
  if (val === 8) {
    return locale === 'id' ? 'kedelapan' : 'eighth';
  }
  if (val === 9) {
    return locale === 'id' ? 'kesembilan' : 'ninth';
  }
  if (val === 0) {
    return locale === 'id' ? 'kesepuluh' : 'tenth';
  }
  return '';
}

export function formatCapitalizeEachWord(text) {
  const mySentence = text;
  if (mySentence.toLowerCase() === 'dki jakarta') {
    return 'DKI Jakarta';
  }
  return mySentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => {
    return letter.toUpperCase();
  });
}

export function formatDate(dt, symbol='') {
  var res = "";
    if ((dt.getMonth() + 1).toString().length < 2)
        res += "0" + (dt.getMonth() + 1).toString();
    else
        res += (dt.getMonth() + 1).toString();
    res += symbol;
    if (dt.getDate().toString().length < 2)
        res += "0" + dt.getDate().toString();
    else
        res += dt.getDate().toString();
    res += symbol + dt.getFullYear().toString();
    return res;
}