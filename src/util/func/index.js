// log the pageview with their URL
export const pageview = (url) => {
  window.gtag('config', process.env.GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag('event', action, params);
};

export const eventAppsflyer = ({ eventName, payload }) => {
  window.AF('pba', 'event', {
    eventType: 'EVENT',
    eventName: eventName,
    eventRevenue: 12,
    eventValue: payload,
  });
};
/* Fungsi format ribuan */
export const formatRibuan = (val, prefix, suffix) => {
  try {
    let result = '';

    // proses format value ke ribuan
    if (['number'].includes(typeof val)) {
      val = val.toString();
      /*
          handling panjang value tidak lebih / sama dengan 2 digit
          jika tidak panjang value tidak sama dengan atau lebih dari 3 digit maka tidak perlu di format
        */
      if (val.length <= 2) {
        result = val;
      } else {
        const sisa = val.length % 3;
        let pecahan = val.substr(0, sisa);
        const ribuan = val.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
          const separator = sisa ? '.' : '';
          pecahan += separator + ribuan.join('.');

          result = pecahan;
        }
      }
    } else {
      throw `val = ${typeof val}, val must be a number`;
    }

    // cek prefix
    if (prefix) {
      if (!['string'].includes(typeof prefix)) {
        throw 'prefix must be a string';
      }

      result = prefix + result;
    }

    // cek suffix
    if (suffix) {
      if (!['string'].includes(typeof suffix)) {
        throw 'suffix must be a string';
      }

      result = result + suffix;
    }

    return result;
  } catch (error) {
    // console.error(error);
  }
};

// fungsi ekstrak tanggal
export const extrakDateEvent = (stDate, endDate, lang) => {
  stDate = stDate?.replace(/-/g, '/');
  endDate = endDate?.replace(/-/g, '/');
  try {
    if (
      !stDate ||
      !endDate ||
      new Date(stDate) == 'Invalid Date' ||
      new Date(endDate) == 'Invalid Date' ||
      !['id', 'en'].includes(lang)
    ) {
      throw {
        message: 'stDate or endDate is not valid, lang value must be id or en',
        stDate: stDate,
        endDate: endDate,
        text: 'error',
      };
    }

    let bahasa = [
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
    ];

    let english = [
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
    ];

    let month = lang === 'id' ? bahasa : english;

    const sTd = new Date(stDate);
    const eTd = new Date(endDate);
    const stDateD = sTd.getDate();
    const stDateM = sTd.getMonth();
    const stDateY = sTd.getFullYear();
    const endDateD = eTd.getDate();
    const endDateM = eTd.getMonth();
    const endDateY = eTd.getFullYear();
    const stDateT = stDate.split(' ')[1].substr(0, 5);
    const EndDateT = endDate.split(' ')[1].substr(0, 5);

    let isDiffD = stDateD !== endDateD;
    let isDiffM = stDateM !== endDateM;
    let isDiffY = stDateY !== endDateY;

    let text = `${stDateD} ${month[stDateM]} ${stDateY}`;

    if (isDiffD) {
      text = `${stDateD} - ${endDateD} ${month[stDateM]} ${stDateY}`;
      if (isDiffM) {
        text = `${stDateD} ${month[stDateM]} - ${endDateD} ${month[endDateM]} ${stDateY}`;
        if (isDiffY) {
          text = `${stDateD} ${month[stDateM]} ${stDateY} - ${endDateD} ${month[endDateM]} ${endDateY}`;
        }
      }
    }

    return {
      text: text,
      isDiffD: isDiffD,
      isDiffM: isDiffM,
      isDiffY: isDiffY,
      stDate: {
        time: stDateT,
        date: stDateD,
        month: stDateM,
        nameOfMonth: month[stDateM],
        year: stDateY,
      },
      endDate: {
        time: EndDateT,
        date: endDateD,
        month: endDateM,
        nameOfMonth: month[endDateM],
        year: endDateY,
      },
      response: 'success',
    };
  } catch (error) {
    const response = {
      text: 'Invalid Date',
      isDiffD: 'Invalid Date',
      isDiffM: 'Invalid Date',
      isDiffY: 'Invalid Date',
      stDate: {
        time: 'Invalid Date',
        date: 'Invalid Date',
        month: 'Invalid Date',
        nameOfMonth: 'Invalid Date',
        year: 'Invalid Date',
      },
      endDate: {
        time: 'Invalid Date',
        date: 'Invalid Date',
        month: 'Invalid Date',
        nameOfMonth: 'Invalid Date',
        year: 'Invalid Date',
      },
      response: error,
    };
    return response;
  }
};
