
import TextInput from '../TextInput';
import { Icon } from 'react-icons-kit';
import {search,bell} from 'react-icons-kit/icomoon';

function Component({ searchParameter, onChangeFunction,className,inputClassName }) {
  return (
    <div className="w-full fixed z-20 lg:z-20 top-0 flex justify-between bg-transparent px-6 py-4">
      <div className="flex items-center">
      <TextInput
              type="text"
              placeholder="cari event"
              name='event'
              value={searchParameter}
              handleOnChange={onChangeFunction}
              inputClassName={inputClassName}
              className={className}
            />
        <div className="relative bottom-[15px] justif">    
        <span className="text-white"><Icon icon={search} size={20}/></span>
        <span className="ml-[10px] text-white"><Icon icon={bell} size={20}/></span>
        </div>
      </div>
    </div>
  );
}

export default Component;
