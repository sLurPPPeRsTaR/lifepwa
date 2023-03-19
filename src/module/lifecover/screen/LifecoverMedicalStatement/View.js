import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import _, { max, isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import {
  BaseLayout,
  AccordionCustom,
  CardCustom,
  CheckCustom,
  SelectCustomBMI,
  ModalCustom,
} from '@cp-module/lifecover/component';
import { IllustrationMedicalSummary } from '@cp-config/Images';
import { Button, Input } from '@cp-component';
import { infoCircle } from 'react-icons-kit/fa';
import {
  useForm,
  Controller,
  useWatch,
  useFormState,
  useFieldArray,
} from 'react-hook-form';
import SelectBMI from './component/SelectBMI';
import ButtonCheck from './component/ButtonCheck';
import { NAVIGATION } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { useModal } from '@cp-hooks';
import { Warning } from '@cp-config/Svgs';
import {
  LifeTagDiseaseHistory,
  AnnouncementLocked,
  GreatJob,
} from '@cp-config/Images';
import { useRouter } from 'next/router';
import CheckboxQuestionDetail from './component/CheckboxStatementDetail';
import Icon from 'react-icons-kit';
import { ic_error } from 'react-icons-kit/md/ic_error';
import { x } from 'react-icons-kit/feather';
import { UW, FRAUD, FRAUD_DETECTED } from '@cp-module/lifecover/utils';
/*
  step behavior is following index by default, because step 1 is checkbmi 
  and after checkBMI nextstap is 2 which value of sio first question but 
  index of sio questions start from zero that's why the gap is 2
*/
const STEP_GAP = 1;
const SIO_OPTION = { iya: true, tidak: false };
const WEIGHT_OPTIONS = Array.from({ length: 181 }).map((_, idx) => {
  const value = 20 + idx;
  return {
    label: value,
    value,
  };
});
const HEIGHT_OPTIONS = Array.from({ length: 201 }).map((_, idx) => {
  const value = 100 + idx;
  return {
    label: value,
    value,
  };
});

const LifecoverMedicalStatement = (props) => {
  const {
    lang,
    authState,
    lifecoverState,
    getPremiPrivate,
    getUserConfirmationDetail,
    checkBmi,
    getQuestions,
    setSubmission,
    setLoading,
  } = props;
  const router = useRouter();
  const checkBmiEndRef = useRef();
  const buttonSubmitEndRef = useRef();
  const errorFirstSioDetailRef = useRef();
  const modalErrorLimitBenefit = useModal();
  const modalErrorHealthCondition = useModal();
  const modalSummary = useModal();
  const modalFraudDetected = useModal();
  const modalConfirmation = useModal();

  // STATE
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [maxStep, setMaxStep] = useState(4);
  const [step, setStep] = useState(0);
  const [checkedAccept, setCheckedAccept] = useState(false);
  // form values/errors will updated to following api payload later
  const benefit = Number(router.query?.benefit);
  const paymentType = router.query?.paymentType;
  const premi =
    lifecoverState.getPremiPrivateResponse?.[paymentType || 'monthly']?.premi;
  const planCode = router.query?.planCode;
  const [errorFirstSioDetail, setErrorFirstSioDetail] = useState('');
  const [selectedBmiHeight, setSelectedBmiHeight] = useState(null); // react-select payload value { label: '', value: 0 }
  const [selectedBmiWeight, setSelectedBmiWeight] = useState(null); // react-select payload value { label: '', value: 0 }
  const [previousSioState, setPreviousSioState] = useState([]); // handle history state for react-hook-form

  // FORM STATE
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
    values: {
      height: 0,
      weight: 0,
      refId: '',
      sio: [],
    },
    shouldFocusError: false,
  });
  const {
    fields: fieldsSio,
    append: appendSio,
    update: updateSio,
    prepend: prependSio,
    remove: removeSio,
    replace: replaceSio,
    swap: swapSio,
    move: moveSio,
    insert: insertSio,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'sio', // unique name for your Field Array
  });

  const watchSio = useWatch({ control, name: 'sio' });
  const watchHeight = useWatch({ control, name: 'height' });
  const watchWeight = useWatch({ control, name: 'weight' });
  const watchRefId = useWatch({ control, name: 'refId' });

  // COMPUTED
  const checkBmiData = {
    value: lifecoverState?.checkBmiResponse,
    error: lifecoverState?.checkBmiFailed?.message,
    isLoading: lifecoverState?.checkBmiFetch,
    isPass: lifecoverState?.checkBmiResponse?.generalResult === 'pass',
    isFinished:
      lifecoverState?.checkBmiResponse ||
      lifecoverState?.checkBmiFailed?.message,
    isSubmittedFinished:
      watchHeight &&
      watchWeight &&
      (lifecoverState?.checkBmiResponse ||
        lifecoverState?.checkBmiFailed?.message),
    isSubmittedInvalid:
      watchHeight &&
      watchWeight &&
      lifecoverState?.checkBmiResponse?.generalResult !== 'pass',
  };
  const questionsData = {
    value: _.sortBy(lifecoverState.getQuestionResponse?.data, [
      'orderQuestion',
    ]).slice(0, 20),
    error: lifecoverState.getQuestionFailed?.message,
    isLoading: lifecoverState.getQuestionFetch,
  };
  const userConfirmationDetailData = {
    value: lifecoverState?.getUserConfirmationDetailResponse?.data,
    error: lifecoverState?.getUserConfirmationDetailFailed?.message,
    status: lifecoverState.getUserConfirmationDetailResponse?.data?.status,
  };
  const getActivePolicyData = {
    isActive:
      lifecoverState.getCurrentSubsLifecoverResponse?.isActivePolicyExists ||
      false,
  };

  const disabledForm =
    lifecoverState.getUserConfirmationDetailResponse &&
    !lifecoverState.getUserConfirmationDetailFetch &&
    !lifecoverState.getUserConfirmationDetailFailed;

  // HANDLER
  const translate = (constant) => {
    return trans(locale, lang, constant);
  };
  const checkSelectedSio = (question) => {
    const sio = watchSio?.find((value) => value?.id === question?.id);
    if (sio) {
      return sio?.option ? SIO_OPTION.iya : SIO_OPTION.tidak;
    }
    return null;
  };
  const shouldMoveStatement = (question, flag) => {
    const sio = questionsData.value?.find(
      (value) => value?.id === question?.id,
    );
    if (sio && sio?.detail?.length) {
      const detailFlag = sio?.detail?.find(
        (detail) => detail?.flagQuestionDetail === flag,
      );
      return detailFlag;
    }
    return null;
  };
  const shouldRenderStatement = (idx, question) => {
    const sio = watchSio?.find((value) => value?.id === question?.id);
    return !!sio || idx <= step - STEP_GAP;
  };
  const shouldChangeStepQuestion = (question) => {
    return !watchSio?.find((value) => value?.id === question?.id);
  };
  const onSubmit = (data) => {
    if (modalSummary.isOpen) {
      modalSummary.toggle();
    }
    if (modalConfirmation.isOpen) {
      modalConfirmation.toggle();
    }

    const payload = {
      ...data,
      premi,
      benefit,
      paymentType,
    };

    if (!isEmpty(data.sio)) {
      setIsSubmitted(true);
      setLoading(true);
      setSubmission(payload);
    }
  };

  const handleChangeSio = (idx, question, option = false) => {
    const payload = {
      id: question?.id,
      option,
      orderQuestion: question?.orderQuestion,
      detail: [],
    };
    updateSio(idx, payload);

    // if want to reset next question when first question selected
    // setPreviousSioState((prev) => {
    //   if (prev[idx]) {
    //     let newPrev = [...prev];
    //     newPrev[idx] = payload;
    //     return newPrev;
    //   } else {
    //     return [...prev, payload];
    //   }
    // });

    if (idx + STEP_GAP < maxStep && shouldChangeStepQuestion(question)) {
      setStep(idx + STEP_GAP + 1);
    }
    if (idx + STEP_GAP < maxStep - 1 && shouldChangeStepQuestion(question)) {
      const unsub = () =>
        setTimeout(() => {
          const elRect = document
            .querySelector(`#question-item-${idx + 1}`)
            ?.getBoundingClientRect();
          window.scroll({
            top: elRect?.bottom + elRect?.y,
            behavior: 'smooth',
          });
        }, 500);
      clearTimeout(unsub());
      unsub();
    }
    if (idx + STEP_GAP === maxStep - 1 && shouldChangeStepQuestion(question)) {
      setTimeout(() => {
        buttonSubmitEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };
  const handleChangeSioDetail = (idx, values) => {
    const currentSio = watchSio[idx];
    updateSio(idx, {
      ...currentSio,
      detail: values,
    });
  };

  // EFFECT
  useLayoutEffect(() => {
    if (!authState.token.access_token) router.push('/');
  }, []);
  useEffect(() => {
    getQuestions();
    getUserConfirmationDetail();
    reset();
  }, []);
  useEffect(() => {
    if (disabledForm) {
      setStep(maxStep);
      setCheckedAccept(true);
    }
  }, [disabledForm, maxStep]);
  // effect : fetch premi from router query
  useEffect(() => {
    if (router.isReady && planCode && benefit && paymentType) {
      getPremiPrivate({
        planCode,
        benefit,
      });
    }
  }, [router.isReady]);
  // effect : handle init maxStep state, note: maxstep = total questions + 1 (1 is checkBmi)
  useEffect(() => {
    if (questionsData.value && questionsData.value.length) {
      setMaxStep(questionsData.value.length + 1);
    }
  }, [questionsData.value]);
  // effect : checkBmi when select value selected
  useEffect(() => {
    if (watchHeight && watchWeight && !disabledForm)
      checkBmi({
        height: watchHeight,
        weight: watchWeight,
        premi,
        benefit,
        // paymentType,
      });
  }, [watchHeight, watchWeight, checkBmi, disabledForm]);
  // effect : if refeth checkBmi all sio form values will reset, and step reset to 1
  useEffect(() => {
    if (checkBmiData.isLoading && !disabledForm) {
      setValue('sio', []);
      setErrorFirstSioDetail('');
      setCheckedAccept(false);
      setStep(1);
      // window.scroll({ top: 0, behavior: 'auto' });
      // setPreviousSioState([]);
    }
  }, [checkBmiData.isLoading, disabledForm]);
  // effect : if checkBmi isFinished go to step 2
  useEffect(() => {
    if (checkBmiData.isSubmittedFinished && !disabledForm) {
      setStep(1);
      const unsub = () =>
        setTimeout(() => {
          checkBmiEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      clearTimeout(unsub());
      unsub();
    }
  }, [checkBmiData.isSubmittedFinished, disabledForm]);
  // effect : change seelected height/weight to react-hook-form value height/weight
  useEffect(() => {
    if (selectedBmiWeight?.value) {
      setValue('weight', selectedBmiWeight?.value);
    }
    if (selectedBmiHeight?.value) {
      setValue('height', selectedBmiHeight?.value);
    }

    if (
      !selectedBmiWeight?.value &&
      !selectedBmiHeight?.value &&
      !disabledForm
    ) {
      setStep(1);
    }
  }, [selectedBmiHeight, selectedBmiWeight, disabledForm]);
  // effect : handle update question option when the user reselect sio option execpt last question
  // useEffect(() => {
  //   if (step < maxStep) {
  //     const updatedValues = previousSioState.filter(
  //       (_, idx) => idx < step - STEP_GAP,
  //     );
  //     replaceSio(updatedValues);
  //   }
  // }, [step, previousSioState]);
  // effect : handle questions error
  useEffect(() => {
    if (questionsData.error) toast.error(questionsData.error);
  }, [questionsData.error]);
  // effect : handle post submission error
  useEffect(() => {
    if (lifecoverState.setSubmissionfailed && !disabledForm) {
      setLoading(false);
      if (lifecoverState.setSubmissionfailed.message === FRAUD_DETECTED) {
        modalFraudDetected.open();
      } else {
        modalErrorHealthCondition.open();
      }
    }
  }, [lifecoverState.setSubmissionfailed, disabledForm]);

  // effect : handle redirect to LifecoverConfirm page
  useEffect(() => {
    if (lifecoverState.setSubmissionResponse && isSubmitted) {
      setLoading(false);
      router.push(NAVIGATION.LIFECOVER.LifecoverConfirm);
    }
  }, [lifecoverState.setSubmissionResponse, isSubmitted]);

  // RENDERER
  const renderBMI = () => {
    return (
      <AccordionCustom.Item eventKey="bmi">
        <AccordionCustom.Header
          as="h2"
          className="text-sm lg:text-body1 font-semibold mb-1 py-3 border-b">
          {trans(locale, lang, 'tinggiDanBerat')}
        </AccordionCustom.Header>
        <AccordionCustom.Body>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 md:w-1/2">
              <span className="text-xs font-medium">
                {trans(locale, lang, 'tinggi')}
              </span>
              <SelectCustomBMI
                placeholder={trans(locale, lang, 'placeholderTinggi')}
                labelUnit="Cm"
                options={HEIGHT_OPTIONS}
                value={
                  disabledForm
                    ? {
                        label: userConfirmationDetailData.value?.height,
                        value: userConfirmationDetailData.value?.height,
                      }
                    : selectedBmiHeight
                }
                isDisabled={disabledForm}
                onChange={setSelectedBmiHeight}
              />
            </div>
            <div className="flex-1 md:w-1/2">
              <span className="text-xs font-medium">
                {trans(locale, lang, 'berat')}
              </span>
              <SelectCustomBMI
                placeholder={trans(locale, lang, 'placeholderBerat')}
                labelUnit="Kg"
                options={WEIGHT_OPTIONS}
                value={
                  disabledForm
                    ? {
                        label: userConfirmationDetailData.value?.weight,
                        value: userConfirmationDetailData.value?.weight,
                      }
                    : selectedBmiWeight
                }
                isDisabled={disabledForm}
                onChange={setSelectedBmiWeight}
              />
            </div>
          </div>
          <div ref={checkBmiEndRef} />
        </AccordionCustom.Body>
      </AccordionCustom.Item>
    );
  };
  const renderStatement = ({ idx, question }) => {
    const sioWarningFlag = shouldMoveStatement(question, 'warning');
    // + 2 because idx started from 0, and index 1 is check bmi
    if (shouldRenderStatement(idx, question)) {
      return (
        <AccordionCustom.Item
          key={question.id}
          id={`question-item-${idx}`}
          eventKey={question.id}
          defaultOpen>
          <AccordionCustom.Header
            as="h2"
            className="lg:text-body1 text-sm font-semibold mb-1 py-3 border-b">
            {trans(locale, lang, 'pertanyaan')} {idx + 1}
          </AccordionCustom.Header>
          <AccordionCustom.Body>
            <CardCustom>
              <CardCustom.Body>
                <p className="text-[12px] font-medium mb-2">
                  {question?.questionName}
                </p>

                <div className="text-[12px] mt-3 mb-2">
                  {trans(locale, lang, 'pilih')}
                </div>
                <div className="md:flex gap-1 items-center">
                  <ButtonCheck
                    name={question.id}
                    label={trans(locale, lang, 'iya')}
                    value={SIO_OPTION.iya}
                    checked={
                      (disabledForm &&
                        userConfirmationDetailData.value?.sioAnswer[idx]
                          ?.option) ||
                      checkSelectedSio(question) === SIO_OPTION.iya
                    }
                    onChange={(e) => handleChangeSio(idx, question, true)}
                    disabled={disabledForm}
                    wrapperClassName="mb-1 md:mb-0"
                  />
                  <ButtonCheck
                    name={question.id}
                    label={trans(locale, lang, 'tidak')}
                    value={SIO_OPTION.tidak}
                    checked={
                      (disabledForm &&
                        !userConfirmationDetailData.value?.sioAnswer[idx]
                          ?.option) ||
                      checkSelectedSio(question) === SIO_OPTION.tidak
                    }
                    onChange={(e) => handleChangeSio(idx, question, false)}
                    disabled={disabledForm}
                  />
                </div>

                {/* {idx === 0 && checkSelectedSio(question) === SIO_OPTION.iya ? (
                  <CheckboxQuestionDetail
                    key={question.id}
                    lang={lang}
                    questionDetail={question?.detail}
                    values={watchSio[idx] ? watchSio[idx]?.detail : []}
                    onChange={(values) => handleChangeSioDetail(idx, values)}
                  />
                ) : null}
                {idx === 0 && errorFirstSioDetail ? (
                  <div
                    ref={errorFirstSioDetailRef}
                    className="mt-2 text-[12px] md:text-[14px] text-primary-dark-primary90">
                    {errorFirstSioDetail}
                  </div>
                ) : null} */}
              </CardCustom.Body>
            </CardCustom>
            {idx !== 0 && sioWarningFlag ? (
              <CardCustom className="bg-orange-100 !rounded-[10px] mt-3">
                <CardCustom.Body className="flex gap-3 items-start py-3 pl-3 pr-4">
                  <div className="flex-initial">
                    <Icon
                      icon={ic_error}
                      className="text-secondary-dark-secondary90"
                      size={18}
                    />
                  </div>
                  <div className="flex-1 text-neutral-500">
                    <p className="text-[12px] font-semibold mt-[5px]">
                      {sioWarningFlag?.questionNameDetail}
                    </p>
                  </div>
                </CardCustom.Body>
              </CardCustom>
            ) : null}
          </AccordionCustom.Body>
        </AccordionCustom.Item>
      );
    }
    return null;
  };
  const renderButtonNext = () => {
    return (
      <div className="max-w-2xl !py-8 mt-10 bottom-0 shadow-xl rounded-xl p-3">
        <label className="flex gap-3 items-start cursor-pointer">
          <div className="flex-initial">
            <CheckCustom
              name="check-tnc"
              checked={checkedAccept}
              onChange={(e) => setCheckedAccept(e.target.checked)}
            />
          </div>
          <div className="flex-1 text-sm text-justify font-medium text-neutral-dark-neutral40">
            {translate('denganIni')}
          </div>
        </label>

        <Button
          type="linear-gradient"
          onButtonClick={() => {
            if (disabledForm) {
              //If lifecover status is still paid but policy status is lapse.
              if (
                userConfirmationDetailData.status === 'PAID' &&
                !getActivePolicyData.isActive
              ) {
                onSubmit({
                  sio: userConfirmationDetailData.value?.sioAnswer,
                  height: userConfirmationDetailData.value?.height,
                  weight: userConfirmationDetailData.value?.weight,
                  refId: userConfirmationDetailData.value?.refId,
                });
              } else if (userConfirmationDetailData.status === UW) {
                modalErrorHealthCondition.open();
              } else if (userConfirmationDetailData.status === FRAUD) {
                modalFraudDetected.open();
              } else {
                router.push(NAVIGATION.LIFECOVER.LifecoverConfirm);
              }
            } else {
              modalSummary.toggle();
            }
          }}
          disabled={!checkedAccept}
          className="max-w-[572px] mx-auto mt-5">
          {translate('lanjutkan')}
        </Button>

        <div ref={buttonSubmitEndRef} />
      </div>
    );
  };
  const renderModalErrorLimitBenefit = () => {
    return (
      <ModalCustom
        isOpen={modalErrorLimitBenefit.isOpen}
        toggle={modalErrorLimitBenefit.toggle}
        imageSrc={AnnouncementLocked}
        imageClassName="w-[180px] h-[180px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">
          {trans(locale, lang, 'maaf')}
        </div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          {trans(locale, lang, 'totalUangPertanggungan')}
        </div>
        <Button
          type="linear-gradient"
          className="mt-6 max-w-none"
          onButtonClick={() => router.push(NAVIGATION.LIFECOVER.LifecoverMain)}>
          {trans(locale, lang, 'btnKembali')}
        </Button>
      </ModalCustom>
    );
  };
  const renderModalErrorHealthCondition = () => {
    return (
      <ModalCustom
        isOpen={modalErrorHealthCondition.isOpen}
        toggle={modalErrorHealthCondition.toggle}
        imageSrc={GreatJob}
        imageClassName="w-[180px] h-[180px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">
          {trans(locale, lang, 'terimaKasih')}
        </div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          {trans(locale, lang, 'kondisiKesehatan')}
        </div>
        <Button
          type="linear-gradient"
          className="mt-6 max-w-none"
          onButtonClick={() => router.push(NAVIGATION.LIFECOVER.LifecoverMain)}>
          {trans(locale, lang, 'btnKembali')}
        </Button>
      </ModalCustom>
    );
  };

  const renderModalFraudDetected = () => {
    return (
      <ModalCustom
        isOpen={modalFraudDetected.isOpen}
        toggle={modalFraudDetected.toggle}
        imageSrc={AnnouncementLocked}
        imageClassName="w-[180px] h-[180px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">
          {trans(locale, lang, 'maaf')}
        </div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          {trans(locale, lang, 'ktpKamuTidak')}
        </div>
        <Button
          type="linear-gradient"
          className="mt-6 max-w-none"
          onButtonClick={() => router.push(NAVIGATION.LIFECOVER.LifecoverMain)}>
          {trans(locale, lang, 'btnKembali')}
        </Button>
      </ModalCustom>
    );
  };

  const renderModalRingkasan = () => {
    if (!modalSummary.isOpen) {
      return null;
    }
    return (
      <div className="fixed inset-0 w-screen min-h-screen z-[9999] bg-black/60 px-3 xm:px-6 py-4 overflow-auto">
        <div className="min-h-full flex items-center z-20 py-[80px]">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full rounded-2xl mx-auto bg-white  max-w-[640px] p-[4%]">
            <button className="absolute top-[20px] left-[20px] text-gray-400">
              <Icon icon={x} size={20} onClick={() => modalSummary.toggle()} />
            </button>
            <div className="flex justify-center">
              <div className="h-[180px] w-[180px] overflow-hidden mt-[-140px]">
                <img
                  src={IllustrationMedicalSummary}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div className="text-[18px] text-center font-bold mb-8">
              {trans(locale, lang, 'ringkasanData')}
            </div>

            <section className="text-left">
              <div className="text-black text-body2 font-semibold mb-2">
                {trans(locale, lang, 'tinggiDanBerat')}
              </div>

              <div className="flex text-neutral-dark-neutral60 text-body2 font-medium mb-1">
                <div className="flex-initial flex-shrink-0 min-w-[120px]">
                  {trans(locale, lang, 'tinggi')}
                </div>
                <div className="flex-1">
                  : {watchHeight} {trans(locale, lang, 'cm')}
                </div>
              </div>
              <div className="flex text-neutral-dark-neutral60 text-body2 font-medium">
                <div className="flex-initial flex-shrink-0 min-w-[120px]">
                  {trans(locale, lang, 'berat')}
                </div>
                <div className="flex-1">
                  : {watchWeight} {trans(locale, lang, 'kg')}
                </div>
              </div>

              <hr className="my-7" />

              {/* {questionsData.value && questionsData.value?.length > 0
                ? questionsData.value.map((question, idx) => (
                    <div key={question.id}>
                      <div className="text-neutral-dark-neutral10 mb-5">
                        <div className="text-body2 font-medium mb-1">
                          {trans(locale, lang, 'pertanyaan')} {idx + 1}
                        </div>
                        <div className="text-body2">
                          {question?.questionName}
                        </div>
                      </div>
                      <div className="text-neutral-dark-neutral60 mb-2">
                        <div className="text-body2 font-medium mb-1">
                          {trans(locale, lang, 'jawab')}
                        </div>
                        <div className="text-body2 font-bold">
                          {watchSio[idx]?.option ? 'Ya' : 'Tidak'}
                        </div>
                      </div>
                      <hr className="my-7" />
                    </div>
                  ))
                : null} */}

              {questionsData.value && questionsData.value?.length > 0 && (
                <div>
                  <div className="text-neutral-dark-neutral10 mb-5">
                    <div className=" mb-1">
                      <span className="text-body2 text-black font-semibold ">
                        {trans(locale, lang, 'pertanyaan')}{' '}
                        {questionsData.value[0]?.orderQuestion}
                      </span>
                    </div>
                    <div className="text-body2 font-medium text-black text-justify">
                      {questionsData.value[0]?.questionName}
                    </div>
                  </div>
                  <div className="text-neutral-dark-neutral60 mb-3">
                    <div className="text-body2 font-medium mb-1">
                      {trans(locale, lang, 'jawab')}
                    </div>
                    <div className="text-body2 font-bold">
                      {watchSio[0]?.option
                        ? translate('iya')
                        : translate('tidak')}
                    </div>
                    {questionsData.value &&
                    questionsData.value?.length > 0 &&
                    watchSio[0]?.option ? (
                      <CheckboxQuestionDetail
                        lang={lang}
                        questionDetail={questionsData.value[0].detail}
                        values={watchSio[0] ? watchSio[0]?.detail : []}
                        onChange={(values) => handleChangeSioDetail(0, values)}
                      />
                    ) : null}
                  </div>
                  <hr className="my-7" />
                  <div className="text-neutral-dark-neutral10 mb-5">
                    <div className="mb-1">
                      <span className="text-body2 text-black font-semibold">
                        {trans(locale, lang, 'pertanyaan')}{' '}
                        {questionsData.value[1]?.orderQuestion}
                      </span>
                    </div>
                    <div className="text-body2 font-medium text-black text-justify">
                      {questionsData.value[1]?.questionName}
                    </div>
                  </div>
                  <div className="text-neutral-dark-neutral60 mb-3">
                    <div className="text-body2 font-medium mb-1">
                      {trans(locale, lang, 'jawab')}
                    </div>
                    <div className="text-body2 font-bold">
                      {watchSio[1]?.option
                        ? translate('iya')
                        : translate('tidak')}
                    </div>
                  </div>
                  <hr className="my-7" />
                  <div className="text-neutral-dark-neutral10 mb-5">
                    <div className=" mb-1">
                      <span className="text-body2 font-semibold text-black">
                        {trans(locale, lang, 'pertanyaan')}{' '}
                        {questionsData.value[2]?.orderQuestion}
                      </span>
                    </div>
                    <div className="text-body2 font-medium text-black text-justify">
                      {questionsData.value[2]?.questionName}
                    </div>
                  </div>
                  <div className="text-neutral-dark-neutral60 mb-2">
                    <div className="text-body2 font-medium mb-1">
                      {trans(locale, lang, 'jawab')}
                    </div>
                    <div className="text-body2 font-bold">
                      {watchSio[2]?.option
                        ? translate('iya')
                        : translate('tidak')}
                    </div>
                  </div>
                  <hr className="my-7" />
                </div>
              )}
            </section>

            <Button
              full
              outline
              bordered
              className="mt-6 max-w-none"
              onButtonClick={() => modalSummary.toggle()}>
              {trans(locale, lang, 'btnKembali')}
            </Button>
            <Button
              type="linear-gradient"
              full
              disabled={watchSio[0]?.option && !watchSio[0]?.detail?.length}
              className="mt-2 max-w-none"
              onButtonClick={() => {
                modalSummary.toggle();
                modalConfirmation.toggle();
              }}>
              {trans(locale, lang, 'btnLanjutkan')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderModalConfirmation = () => {
    if (!modalConfirmation.isOpen) {
      return null;
    }

    return (
      <ModalCustom
        isOpen={modalConfirmation.isOpen}
        toggle={modalConfirmation.toggle}
        imageSrc={IllustrationMedicalSummary}
        imageClassName="w-[180px] h-[180px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">
          {trans(locale, lang, 'dataKesehatan')}
        </div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          {trans(locale, lang, 'pastikanDataKesehatan')}
        </div>
        <Button
          outline
          bordered
          className="mt-6 max-w-none"
          onButtonClick={() => {
            modalSummary.toggle();
            modalConfirmation.toggle();
          }}>
          {trans(locale, lang, 'btnKembali')}
        </Button>
        <Button
          className="mt-2 max-w-none"
          type="linear-gradient"
          onButtonClick={handleSubmit(onSubmit)}>
          {trans(locale, lang, 'lanjutkan')}
        </Button>
      </ModalCustom>
    );
  };

  const displayBMIMessage = () => {
    if (checkBmiData.isSubmittedFinished) {
      if (checkBmiData.isPass) {
        return (
          <div className="mb-4">
            <div className="flex px-2 bg-[#00B76A] bg-opacity-5 justify-center w-full items-center gap-3 py-2 rounded-xl">
              <span className="text-sm font-semibold text-[#009262]">
                {trans(locale, lang, 'bmiSesuai')}
              </span>
              <svg
                className="mt-1 h-6 w-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
              </svg>
            </div>
          </div>
        );
      } else {
        return (
          <div className="mb-4">
            <div className="flex px-2 bg-orange-100 justify-center w-full items-center gap-3 py-2 rounded-xl">
              <Icon icon={infoCircle} size={20} className="text-yellow-500" />
              <span className="text-xs font-semibold mt-1">
                {trans(locale, lang, 'bmiTidakSesuai')}
              </span>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <>
      <BaseLayout
        title={translate('title')}
        step={step}
        maxStep={maxStep}
        showProgressBar
        showProgressBarIndicator
        headerFixed
        isLoadingProgressBarIndicator={questionsData.isLoading}>
        <BaseLayout.Container className="pb-10 lg:py-10">
          <CardCustom className="min-h-screen lg:h-auto" withDefaultMobileStyle>
            <CardCustom.Body>
              <h2 className="lg:text-body1 text-sm font-semibold mb-1">
                {translate('title')}
              </h2>
              <div
                className="lg:text-sm text-xs"
                dangerouslySetInnerHTML={{
                  __html: translate('sebelumLangganan'),
                }}
              />

              <AccordionCustom allOpen alwaysOpen>
                {renderBMI()}
                {checkBmiData.isLoading ? (
                  <div className="mb-4">
                    <div className="flex px-[5%] bg-gray-200/50 text-gray-600 justify-center w-full items-center gap-3 py-3 rounded-xl">
                      <svg
                        className="animate-spin h-5 w-5 text-mediumGray-light-mediumGray"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-xs font-semibold text-mediumGray-light-mediumGray">
                        {trans(locale, lang, 'sedangCheck')}
                      </span>
                    </div>
                  </div>
                ) : null}
                {displayBMIMessage()}
                {checkBmiData.isSubmittedFinished || disabledForm
                  ? questionsData.value?.map((question, idx) =>
                      renderStatement({
                        idx,
                        question,
                      }),
                    )
                  : null}
              </AccordionCustom>
              {step === maxStep && !questionsData.error
                ? renderButtonNext()
                : null}
            </CardCustom.Body>
          </CardCustom>
        </BaseLayout.Container>
      </BaseLayout>

      {renderModalErrorLimitBenefit()}
      {renderModalErrorHealthCondition()}
      {renderModalRingkasan()}
      {renderModalFraudDetected()}
      {renderModalConfirmation()}
    </>
  );
};

export default LifecoverMedicalStatement;
