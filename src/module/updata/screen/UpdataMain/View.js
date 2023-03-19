import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';
import {
  GET_UPDATA_VALIDATION_CHECK_FAILED,
  GET_UPDATA_VALIDATION_CHECK_SUCCESS,
} from '@cp-module/updata/updataConstant';
import { NAVIGATION } from '@cp-util/constant';

export default function View(props) {
  const {
    setToastMsg,
    updataAction,
    setLoading,
    setKkpmTemp,
    kkpmTempState,
    setKkpmDataKk,
    getUpdataValidationCheck,
    getUpdataValidationCheckFailed,
    setClearKkpm,
  } = props;
  const router = useRouter();

  useEffect(() => {
    setKkpmDataKk({});
  }, []);

  const getValidationCheck = useCallback(() => {
    const { category, certificateNo, policyNo, source } = kkpmTempState;
    // const { category, certificateNo, policyNo, source } = kkpmTempState;
    setLoading(true);
    getUpdataValidationCheck({ category, certificateNo, policyNo, source });
  }, [getUpdataValidationCheck, kkpmTempState, setLoading]);

  useEffect(() => {
    getValidationCheck();
  }, [getValidationCheck]);

  const updataResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_VALIDATION_CHECK_SUCCESS) {
        setLoading(false);
        router.replace(NAVIGATION.UPDATA.UpdataUploadSelfie);
      }
      if (act === GET_UPDATA_VALIDATION_CHECK_FAILED) {
        setLoading(false);
        const message = getUpdataValidationCheckFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          setToastMsg({ isOpen: true, error: true, title: message });
        }
        if (kkpmTempState.navFrom) {
          setKkpmTemp({});
          router.replace(kkpmTempState.navFrom);
          if (
            kkpmTempState?.navFrom === NAVIGATION.HOME.Home ||
            kkpmTempState?.navFrom === NAVIGATION.POLICY.Polis
          ) {
            setTimeout(() => {
              setClearKkpm();
            }, 1500);
          }
        } else {
          setKkpmTemp({});
          router.back();
        }
      }
    },
    [
      getUpdataValidationCheckFailed?.message,
      kkpmTempState.navFrom,
      router,
      setClearKkpm,
      setKkpmTemp,
      setLoading,
      setToastMsg,
    ],
  );

  useEffect(() => {
    updataResult(updataAction);
  }, [updataAction, updataResult]);

  return null;
}
