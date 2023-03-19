import ReactDatePicker from 'react-datepicker';
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1800 },
  (_, i) => currentYear - i,
);

const DatePicker = ({
  selected,
  onChange = (date) => {},
  placeholder,
  ...rest
}) => {
  const months = [
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

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()],
  );

  return (
    <label onClick={(e) => e.preventDefault()}>
      <ReactDatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="m-3 flex justify-center text-gray-500">
            <button
              className="p-1 mr-1"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}>
              {'<'}
            </button>
            <select
              className="px-2 py-1 border-2 rounded-md bg-gray-100 border-gray-300 mr-1 text-gray-500 text-[13px] !font-Monstserrat"
              value={selectedYear}
              onChange={({ target: { value } }) => {
                setSelectedYear(value);
                changeYear(value);
              }}>
              {years.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="!font-Monstserrat">
                  {option}
                </option>
              ))}
            </select>

            <select
              className="px-2 py-1 border-2 rounded-md bg-gray-100 border-gray-300 mr-1 text-gray-500 text-[13px] !font-Monstserrat"
              value={selectedMonth}
              onChange={({ target: { value } }) => {
                const index = months.indexOf(value);
                changeMonth(index);
                setSelectedMonth(months[index]);
              }}>
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              className="p-1 mr-1"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}>
              {'>'}
            </button>
          </div>
        )}
        selected={selected}
        onChange={(date) => {
          const chosenYear = date.getFullYear();
          const chosenMonthIndex = date.getMonth();
          setSelectedMonth(months[chosenMonthIndex]);
          setSelectedYear(chosenYear);
          onChange(date);
        }}
        className="border w-full rounded-[16px] text-[12px] lg:text-[14px] px-3 py-3 lg:py-4 font-medium !font-Monstserrat"
        dateFormat="dd MMM yyyy"
        popperPlacement="auto"
        placeholderText={placeholder}
        shouldCloseOnSelect={true}
        maxDate={moment().toDate()}
        calendarClassName="!font-Monstserrat"
        {...rest}
      />
    </label>
  );
};

export default DatePicker;
