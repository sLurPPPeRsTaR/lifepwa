export const userActivity = {
  userActivity: {
    type: '',
    value: '',
    date: '',
    dateDiff: '',
  },
  currentScreen: 'HomeMain',
  isFirstLoad: true,
};

export const bootstrapInitialState = {
  isLoading: false,
  isFaqAsk: false,
  isHospital: false,
  isCustomerCare: false,
  isBetterOpenApp: true,
  isNotAvailable: false,
  isAvailableOnMobile: false,
  isInternalServerError: false,
  isLocationPermissionGranted: false,
  isShowModalComingSoon: false,
  isModalTermNCondition: false,
  isModalLsTnc: false,
  isModalShowRiplay: false,
  setUploadImageProgress: 0,
  isComingFromScreen: {},
  payloadSubSubscrib: {},
  isLifetagAccessFailed: false,
  isLifetagNotActive: false,
  isLifetagOutOffStock: false,
  isLifetagPairingFailed: false,
  isLifetagReadyToConnect: false,

  latitude: '',
  longitude: '',
  toastMsg: {},
  isProgressCodePush: undefined,
  action: '',
  appConfig: {
    features: {
      lifesaver: true,
      appleSignIn: false,
    },
  },
  eventCode: '',
  isOnlyAddCard: false,
  isReferral: false,
  // dimensions: {
  //   width: Dimensions.get('screen').width,
  //   height: Dimensions.get('screen').height,
  // },

  appsflyerData: {},
};
