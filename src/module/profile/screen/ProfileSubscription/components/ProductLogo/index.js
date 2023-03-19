import { LifecoverLogoDark, LifecoverlogoPlus, LifeSAVERLapse, LifeSaverPlus, LifeSAVERplusLapse, LifesaverPOS, LifesaverPOSLapse, LiveSaverLogo, MyLifecoverLogoDark } from '@cp-config/Images';
import React from 'react'

function ProductLogo({planName, status}) {
    let imgSrc;

    switch (planName) {
      case 'LifeSAVER':
        imgSrc = status === 'LAPSE' ? LifeSAVERLapse : LiveSaverLogo;
        break;
      case 'LifeSAVER POS':
        imgSrc = status === 'LAPSE' ? LifesaverPOSLapse : LifesaverPOS;
        break;
      case 'LifeCOVER':
        imgSrc = status === 'LAPSE' ? LifecoverLogoDark : LifecoverLogoDark;
        break;
      case 'LifeCOVER+':
        imgSrc = status === 'LAPSE' ? LifecoverlogoPlus : LifecoverlogoPlus;
        break;
      case 'MyLifeCOVER':
        imgSrc = status === 'LAPSE' ? MyLifecoverLogoDark : MyLifecoverLogoDark;
        break;
      default:
        imgSrc = status === 'LAPSE' ? LifeSAVERplusLapse : LifeSaverPlus;
    }

    return <img src={imgSrc} width={100} />;
  }

export default ProductLogo