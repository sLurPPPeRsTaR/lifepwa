export const persistInitialState = {
  isComingFromScreen: {},
  isComingFromDeepLink: {},
};
// LIFETAG INIT TEMP STATE
export const lifetagInitialState = {
  lifetagTempState: {
    tempOrder: [],
  },
};
export const lifetagInitialOrderState = {
  lifetagTempOrderState: [],
};
export const lifetagOtherInfoState = {
  lifetagOtherInfoState: {},
};

//Liveness
export const livenessTempState = {
  livenessTempState: {},
};

// kkpm
export const kkpmTempState = {
  kkpmTempState: {},
};
export const kkpmDataKkState = {
  kkpmDataKkState: {},
};
export const updataInitialState = {
  isKTPSame: false,
  isKKSame: false,
  otherInformation: {
    data: {
      phoneNumber: null,
      email: null,
      bankAccount: null,
      address: {
        residentAddress: null,
        officeAddress: null,
        correspondAddress: null,
        billingAddress: null,
      },
    },
  },
  tempState: {
    isUploadBookAccount: false,
  },
};

export const buyForOthersFormState = {
  buyForOthersFormState: [{}]
};

//home widgets
export const widgetsShown = {
  shownsWidget: {
    renderWidgetSubmissionPayment: true,
    renderWidgetRenewalPayment: true,
    renderWidgetGracePeriodPayment: true,
    renderWidgetInvitation: true,
    renderWidgetLifeTag: true,
    renderWidgetInvited: true,
    renderWidgetKYC: true,
    renderWidgetBajoRun: true,
    renderWidgetActivatedLifeSAVER: true,
    renderWidgetReEkyc: true,
    renderWidgetLiveness: true,
    renderWidgetBulkInsurred: true,
  },
};
