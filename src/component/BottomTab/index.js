import {useState} from 'react'
import { Icon } from 'react-icons-kit';
import { home,fileText,ticket } from 'react-icons-kit/icomoon';
import {useRouter} from 'next/router';
import { user } from 'react-icons-kit/icomoon';
import { fileText2 } from 'react-icons-kit/icomoon';
import { search } from 'react-icons-kit/icomoon';
import { trans } from '@cp-util/trans';

import locale from './locale';

function Component({active, lang}) {
  
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(active)

  const tabList = [
    { key: 0, title: trans(locale, lang, 'title1'), icon: home, link: './not-found' },
    { key: 1, title: trans(locale, lang, 'title2'), icon: search, link: './not-found' },
    { key: 2, title: trans(locale, lang, 'title3'), icon: fileText2, link: './not-found' },
    { key: 3, title: trans(locale, lang, 'title4'), icon: user, link: './profile' },
  ]

  const renderActiveTab = (key) => {
    if (key == activeTab) {
      return 'basis-1/4 grid place-items-center text-[#ED1C24]';
    }else{
      return 'basis-1/4 grid place-items-center opacity-30';
    }
  }

  const setActive = (link, key) => {
    setActiveTab(key);
    goToPage(link);
  }

  const goToPage = (link) => {
    router.replace(link);
  }

  return (
    <div className="w-[100%] left-0 h-[75px] fixed z-20 lg:z-20 top-0 flex justify-between bg-white border-t-2">
      <div className="flex w-full h-full flex-row">
        <div className='md:basis-1/3'>

        </div>
        <div className='md:basis-1/3 flex flex-row w-full'>
          {tabList.map(val=>(
            <div key={val.key} className={renderActiveTab(val.key)} onClick={() => setActive(val.link, val.key)}>
              <Icon className='mt-3' icon={val.icon} size={18} />
              <p className='text-xs font-semibold mb-5'>{val.title}</p>
            </div>
          ))}
        </div>
        <div className='md:basis-1/3'>

        </div>
      </div>
    </div>
  );
}

export default Component;
