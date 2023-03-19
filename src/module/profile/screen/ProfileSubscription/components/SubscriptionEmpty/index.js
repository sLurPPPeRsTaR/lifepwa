import { Button } from '@cp-component';
import { ProfileAddress } from '@cp-config/Images';
import { NAVIGATION } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react'

function SubscriptionEmpty({locale,lang, tab}){
    const router = useRouter();
    const wordingButton = useMemo(()=>{
      if(tab === 'others'){
        return {
          desc:'emptySubscriptionOthers',
          button:'protectYourFiends'
        }
      }
      return {
        desc:'emptySubscription',
        button:'protectNow'
      }
    },[tab])
    console.log(wordingButton)
    return (
      <div className="mt-10 text-center">
        <img src={ProfileAddress} className="my-10 w-48 mx-auto" />
        <div className="pb-1 font-bold">Oops!</div>
        <p className="text-sm xm:text-base">
          {trans(locale, lang, wordingButton?.desc)}
        </p>
        <Button
          className="my-10 mx-auto text-xs xm:text-sm"
          type="linear-gradient"
          shadow
          onButtonClick={() => {
            router.push(NAVIGATION.LIFESAVER.LifesaverMain);
          }}>
          {trans(locale, lang, wordingButton?.button)}
        </Button>
      </div>
    );
  };

export default SubscriptionEmpty