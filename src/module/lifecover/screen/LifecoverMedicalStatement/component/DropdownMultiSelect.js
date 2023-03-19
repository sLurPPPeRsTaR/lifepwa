import Icon from 'react-icons-kit';
import { arrow_down } from 'react-icons-kit/ikons/arrow_down';
import { arrow_up } from 'react-icons-kit/ikons/arrow_up';

const DropdownMultiSelect = ({
  labelName,
  dataValue,
  placeholderValue,
  name,
  handleChange,
  setOpenDropdown,
  openDropdown,
  placeholder,
}) => {
  const strValue = placeholderValue
    ?.map((val) => val?.replace('-', ' '))
    .join(', ');
  return (
    <div className="lg:mt-3 mx-2 lg:mx-0 md:mx-0">
      <span className="font-bold lg:text-sm md:text-sm text-xs ">
        {labelName}
      </span>
      <div className="relative">
        <div
          onClick={() => setOpenDropdown((prev) => !prev)}
          className="bg-white flex gap-4 text-xs lg:text-sm cursor-pointer rounded-lg w-full lg:px-5 md:px-4 px-2 lg:py-3 py-2 items-center justify-between border border-gray-400 mt-4">
          {placeholderValue?.length === 0 ? placeholder : strValue}
          {!openDropdown ? (
            <>
              <Icon icon={arrow_down} />
            </>
          ) : (
            <>
              <Icon icon={arrow_up} />
            </>
          )}
        </div>

        {openDropdown && (
          <div className="bg-white absolute lg:top-10 top-[1.8rem] items-center justify-center rounded-b-lg border-gray-400 w-full lg:h-auto max-h-[13rem] lg:overflow-auto overflow-y-auto scrollbar-hide   lg:p-4 md:p-3 p-2 border ">
            <div className="w-full lg:grid lg:grid-cols-3 lg:gap-5 flex flex-col gap-3 ">
              {dataValue?.map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center justify-start gap-4">
                  <input
                    type="checkbox"
                    className="items-center"
                    value={item.value}
                    name={name}
                    onChange={handleChange}
                  />
                  <span className="cursor-pointer  lg:text-sm md:text-sm text-xs font-medium">
                    {item.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMultiSelect;
