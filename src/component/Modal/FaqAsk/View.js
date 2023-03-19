import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import locale from './locale';
import Icon from 'react-icons-kit';
import { trans } from '@cp-util/trans';
import { regexEmail } from '@cp-util/common';
import { NAVIGATION } from '@cp-util/constant';
import { Modal, Container, Button, Input } from '@cp-component';
import { chevronDown, androidArrowBack } from 'react-icons-kit/ionicons';
import { ShieldBig } from '@cp-config/Images';
import {
  SET_PROFILE_FAQ,
  SET_PROFILE_FAQ_FAILED,
  SET_PROFILE_FAQ_SUCCESS,
  SET_PROFILE_NOLOGINFAQ,
  SET_PROFILE_NOLOGINFAQ_FAILED,
  SET_PROFILE_NOLOGINFAQ_SUCCESS,
} from '@cp-module/profile/profileConstant';
import { chevronUp } from 'react-icons-kit/ionicons';

export default function Component(props) {
  const {
    lang,
    token,
    isOpen,
    setClose,
    setFaqAsk,
    faqAction,
    setLoading,
    setProfileFaq,
    setProfileFaqClear,
    setProfileFaqFailed,
    setProfileFaqResponse,
    setProfileNoLoginFaq,
    setProfileNoLoginFaqClear,
    setProfileNoLoginFaqFailed,
    setProfileNoLoginFaqResponse,
    setInternalServerError,
  } = props;

  const router = useRouter();

  // STATE
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [question, setQuestion] = useState(null);
  const [categoryOpt, setCategoryOpt] = useState(
    trans(locale, lang, 'pilihKategori'),
  );

  // REGEX
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidFullName, setValidFullName] = useState(false);
  const [isValidQuestion, setValidQuestion] = useState(false);

  // ERRORMSG
  const [emailMessage, setEmailMessage] = useState(null);
  const [fullNameMessage, setFullNameMessage] = useState(null);
  const [questionMessage, setQuestionMessage] = useState(null);

  // Modal
  const [openOption, setOpenOption] = useState(false);
  const [isModalSuccess, setModalSuccess] = useState(false);

  const translate = (e) => trans(locale, lang, e);

  // categoryOpt
  const categoryOptArr = [
    {
      title: (
        <>
          Life<span className="italic">SAVER</span>
        </>
      ),
      opt: translate('lifesaver'),
    },
    {
      title: (
        <>
          Life<span className="italic">COVER</span>
        </>
      ),
      opt: translate('lifecover'),
    },
    { title: translate('registrasiLogin'), opt: translate('registrasiLogin') },
    {
      title: translate('verifikasiDataDiri'),
      opt: translate('verifikasiDataDiri'),
    },
    { title: translate('informasiPolis'), opt: translate('informasiPolis') },
    { title: translate('pengkinianData'), opt: translate('pengkinianData') },
    { title: translate('akun'), opt: translate('akun') },
    { title: translate('keamanan'), opt: translate('keamanan') },
    { title: translate('pengirimanOtp'), opt: translate('pengirimanOtp') },
  ];

  const faqResult = useCallback(
    (act) => {
      if (act === SET_PROFILE_FAQ) {
        setLoading(true);
      }
      if (act === SET_PROFILE_FAQ_SUCCESS) {
        setLoading(false);
        setModalSuccess(true);
      }
      if (act === SET_PROFILE_FAQ_FAILED) {
        setLoading(false);
        if (setProfileFaqFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          console.log('internal error');
          setInternalServerError(true);
        }
      }
      if (act === SET_PROFILE_NOLOGINFAQ) {
        setLoading(true);
      }
      if (act === SET_PROFILE_NOLOGINFAQ_SUCCESS) {
        setLoading(false);
        setModalSuccess(true);
      }
      if (act === SET_PROFILE_NOLOGINFAQ_FAILED) {
        setLoading(false);
        if (setProfileFaqFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          console.log('internal error');
          setInternalServerError(true);
        }
      }
    },
    [setProfileFaqFailed?.message, setProfileNoLoginFaqFailed?.message],
  );

  const validateEmail = (text) => {
    if (!text || text?.length < 1) {
      setEmailMessage({ error: trans(locale, lang, 'emailRequired') });
      return false;
    }
    if (!regexEmail.test(text)) {
      setEmailMessage({ error: trans(locale, lang, 'emailInvalid') });
      return false;
    }
    setEmailMessage(null);
    return true;
  };

  const validateFullName = (text) => {
    const regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
    if (!text || text?.length < 1) {
      setFullNameMessage({ error: trans(locale, lang, 'nameRequired') });
      return false;
    }
    if (!regex.test(text)) {
      setFullNameMessage({ error: trans(locale, lang, 'nameInvalid') });
      return false;
    }
    if (text?.length > 100) {
      setFullNameMessage({
        error: trans(locale, lang, 'nameLengthTooLong'),
      });
      return false;
    }
    setFullNameMessage(null);
    return true;
  };

  const validateQuestion = (text) => {
    if (!text || text?.length < 1) {
      return false;
    }
    if (text?.length >= 300) {
      setQuestionMessage({ error: trans(locale, lang, 'questionInvalid') });
      return true;
    }
    setQuestionMessage(null);
    return true;
  };

  const renderModalSuccess = () => {
    return (
      <Modal isOpen={isModalSuccess} size="md">
        <div className="relative p-3">
          <img
            src={ShieldBig}
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center mx-auto my-3 px-[10%]">
            {trans(locale, lang, 'suksesTitle')}
          </p>
          <p className="pt-2 text-body1 text-center mx-auto my-3 px-[5%]">
            {trans(locale, lang, 'suksesTitle1')}
            <span className="font-bold">
              {setProfileFaqResponse?.data?.reffNumber ||
                setProfileNoLoginFaqResponse?.data?.reffNumber}
            </span>
            {trans(locale, lang, 'suksesTitle2')}
          </p>
          <Button
            className="mt-8 text-sm"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setFaqAsk(false);
              setModalSuccess(false);
              setProfileFaqClear();
              setProfileNoLoginFaqClear();
              setEmail(null);
              setFullName(null);
              setQuestion(null);
              setCategoryOpt(trans(locale, lang, 'pilihKategori'));
              router.push({
                pathname: NAVIGATION.HOME.Home,
              });
            }}>
            {trans(locale, lang, 'kembaliKeHome')}
          </Button>
        </div>
      </Modal>
    );
  };

  const renderOption = () => {
    return (
      openOption && (
        <div className="absolute top-20 border bg-white text-xs px-3 py-5 rounded-xl divide-y xm:text-sm hover:border-red-500">
          {categoryOptArr.map((e, idx) => (
            <div
              key={idx}
              role="button"
              className="py-1 px-2 mb-1 hover:bg-red-100"
              onClick={() => {
                setCategoryOpt(e.opt);
                setOpenOption(false);
              }}>
              {e.title}
            </div>
          ))}
        </div>
      )
    );
  };

  const renderFormLogin = () => {
    return (
      <>
        <Input
          required
          className="mb-5"
          value={fullName}
          placeholder={trans(locale, lang, 'namaLengkapKamu')}
          message={fullNameMessage}
          label={trans(locale, lang, 'namaLengkap')}
          handleOnChange={(val) => {
            setFullName(val);
            setValidFullName(validateFullName(val));
          }}
        />

        <Input
          required
          className="mb-5"
          value={email}
          inputMode="email"
          placeholder={trans(locale, lang, 'emailKamu')}
          message={emailMessage}
          label={trans(locale, lang, 'email')}
          handleOnChange={(val) => {
            setEmail(val);
            setValidEmail(validateEmail(val));
          }}
        />
      </>
    );
  };

  useEffect(() => {
    faqResult(faqAction);
  }, [faqAction, faqResult]);

  const renderForm = () => {
    return (
      <div className="h-[90%] relative">
        <div className="flex px-[4%] justify-between items-center border-b-4 w-full text-center">
          <div className="mb-1">
            <Icon
              icon={androidArrowBack}
              size={20}
              onClick={() => {
                setClose(false);
                setEmail(null);
                setFullName(null);
                setQuestion(null);
                setCategoryOpt(trans(locale, lang, 'pilihKategori'));
              }}
              className="cursor-pointer
                text-gray-600 hover:text-red-dark-red90"
            />
          </div>
          <p className="py-6 font-bold text-center text-sm xm:text-lg">
            {trans(locale, lang, 'ajukanPertanyaan')}
          </p>
          <div className="mr-5"></div>
        </div>

        <div className="py-10 px-[5%] h-full flex flex-col justify-between">
          <div>
            <p className="font-bold text-sm pb-5">
              {trans(locale, lang, 'apakahAdaYang')}
            </p>

            {!token && renderFormLogin()}
            <div className="relative z-10">
              <Input
                required
                role="button"
                className="mb-5"
                value={categoryOpt}
                placeholder={trans(locale, lang, 'kategori')}
                label={trans(locale, lang, 'pilihKategori')}
                suffixIcon={
                  <Icon
                    icon={!openOption ? chevronDown : chevronUp}
                    size={18}
                  />
                }
                handleOnChange={() => {
                  setOpenOption(true);
                }}
              />
              {renderOption()}
            </div>
            <div className="relative">
              <Input
                required
                value={question}
                maxLength={300}
                isTextarea={true}
                placeholder={trans(locale, lang, 'pertanyaanTentangAplikasi')}
                message={questionMessage}
                label={trans(locale, lang, 'pertanyaanKamu')}
                className="mb-5"
                textareaClassName="md:text-sm xs:text-[12px]"
                handleOnChange={(val) => {
                  setQuestion(val);
                  setValidQuestion(validateQuestion(val));
                }}
              />
              <div className="absolute -bottom-5 right-0 pr-3 text-xs">
                {question?.length ? question.length : 0} / 300
              </div>
            </div>
          </div>

          <Button
            type="linear-gradient"
            full
            disabled={
              token == ''
                ? !categoryOpt ||
                  categoryOpt === trans(locale, lang, 'pilihKategori') ||
                  !isValidQuestion ||
                  !isValidEmail ||
                  !isValidFullName
                : !categoryOpt ||
                  categoryOpt === trans(locale, lang, 'pilihKategori') ||
                  !isValidQuestion
            }
            className="w-full mx-auto text-xs xm:text-sm py-2 xs:mt-3"
            onButtonClick={() => {
              token == ''
                ? setProfileNoLoginFaq({
                    lang,
                    email,
                    name: fullName,
                    feedback: question,
                    category: categoryOpt,
                  })
                : setProfileFaq({
                    lang,
                    category: categoryOpt,
                    feedback: question,
                  });
            }}>
            {trans(locale, lang, 'kirimPertanyaan')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal size="full" isOpen={isOpen}>
      <div onClick={() => (openOption ? setOpenOption(false) : null)}>
        <Container
          noBackground
          fullScreen
          className="py-0 relative z-10 min-h-[90vh] h-[90%] mt-10">
          <div className="relative bg-white w-full h-full max-w-4xl mx-auto shadow-md z-10 rounded-2xl">
            {renderForm()}
          </div>
        </Container>

        {renderModalSuccess()}
      </div>
    </Modal>
  );
}
