import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  LifecoverLandingImg1,
  LifecoverLandingImg2,
  LifecoverLandingImg3,
  LifecoverLogoLg,
  IllustrationCost,
  IllustrationCoverage,
  IllustrationMedicalCheck,
  IllustrationSuicide,
  IllustrationCriminal,
  IllustrationHospital,
  IllustrationCarCrash,
  IllustrationProtection,
} from '@cp-config/Images';
import {
  LifecoverLandingDec1,
  LifecoverLandingDec2,
  LifecoverLandingDec3,
} from '@cp-config/Svgs';
import { Button, Container, Toggle } from '@cp-component';
import Icon from 'react-icons-kit';
import { ic_west, ic_info_outline } from 'react-icons-kit/md';
import locale from './locale';
import { NAVIGATION, PRODUCT } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import {
  BoxHelp,
  BoxPremi,
  CardPackage,
  CardReason,
  SliderLanding,
  TabLanding,
} from './component';
import { useRouter } from 'next/router';
import { formatCurrency } from '@cp-util/numbro';

// CONSTANT
const JUTA = 1e6;
const TAB_OPTION_SECTION3 = {
  manfaat: 'manfaat',
  pengecualian: 'pengecualian',
};
const TAB_DATA = {
  manfaat: [
    {
      key: 1,
      img: IllustrationCost,
      content: {
        id: (
          <p className="text-neutral-dark-neutral80">
            Asuransi jiwa dengan pertanggungan yang dapat ditentukan sendiri
            hingga <strong>1,5 milyar</strong>
          </p>
        ),
        en: (
          <p className="text-neutral-dark-neutral80">
            Life insurance with self-determined coverage up to{' '}
            <strong>IDR 1,5 billion</strong>
          </p>
        ),
      },
    },
    {
      key: 2,
      img: IllustrationCoverage,
      content: {
        id: (
          <p className="text-neutral-dark-neutral80">
            <strong>Uang pertanggungan 100%</strong> jika tertanggung meninggal
            dunia karena sebab apapun
          </p>
        ),
        en: (
          <p className="text-neutral-dark-neutral80">
            <strong>100% guarantee insured</strong> if the insured dies for any
            reason
          </p>
        ),
      },
    },
  ],
  pengecualian: [
    {
      key: 3,
      img: IllustrationMedicalCheck,
      content: {
        id: (
          <>
            <div className="text-neutral-dark-neutral80 font-semibold mb-2">
              Kondisi yang sudah ada sebelumnya
            </div>
            <p className="text-[#666B6F] text-sm">
              Penyakit, cedera, maupun cacat tetap yang diakibatkan oleh kondisi
              yang telah ada sebelumnya (<i>pre-existing</i> condition).
            </p>
          </>
        ),
        en: (
          <>
            <div className="text-neutral-dark-neutral80 font-semibold mb-2">
              Pre-existing conditions
            </div>
            <p className="text-[#666B6F] text-sm">
              Illness, injury or permanent disability resulting from a
              pre-existing condition
            </p>
          </>
        ),
      },
    },
    {
      key: 4,
      img: IllustrationSuicide,
      content: {
        id: (
          <>
            <div className="text-neutral-dark-neutral80 font-semibold mb-2">
              Perilaku Mengakhiri Hidup
            </div>
            <p className="text-[#666B6F] text-sm">
              Perilaku yang disengaja untuk mengakhiri hidup diri sendiri.
            </p>
          </>
        ),
        en: (
          <>
            <div className="text-neutral-dark-neutral80 font-semibold mb-2">
              self-inflicted death
            </div>
            <p className="text-[#666B6F] text-sm">
              Deliberate behavior to end one's own life.
            </p>
          </>
        ),
      },
    },
    {
      key: 5,
      img: IllustrationCriminal,
      content: {
        id: (
          <>
            <div className="text-neutral-dark-neutral80 font-semibold mb-2">
              Tindakan kriminal atau ilegal
            </div>
            <p className="text-[#666B6F] text-sm">
              Cedera atau cacat tetap akibat partisipasi aktif dalam tindakan
              ilegal dan kriminalitas.
            </p>
          </>
        ),
        en: (
          <>
            <div className="text-neutral-dark-neutral80 font-semibold mb-2">
              Criminal or illegal acts
            </div>
            <p className="text-[#666B6F] text-sm">
              Injury or permanent disability resulting from active participation
              in illegal acts and criminality.
            </p>
          </>
        ),
      },
    },
  ],
};
const REASON_DATA = [
  {
    img: IllustrationHospital,
    title: {
      id: 'Meninggal Dunia Akibat Kecelakaan',
      en: 'Died Due to Accident',
    },
    content: {
      id: (
        <>
          Life<i>COVER</i> melindungi Lorem ipsum todo de atire.
        </>
      ),
      en: (
        <>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Quasi aliquam officiis
          optio facilis consectetur reiciendis soluta perferendis blanditiis a
          beatae.
        </>
      ),
    },
  },
  {
    img: IllustrationCarCrash,
    title: {
      id: 'Meninggal Dunia bukan akibat kecelakaan',
      en: 'Death is not the result of an accident',
    },
    content: {
      id: (
        <>
          Life<i>COVER</i> melindungi Lorem ipsum todo de atire.
        </>
      ),
      en: (
        <>
          Life<i>COVER</i> melindungi Lorem ipsum todo de atire.
        </>
      ),
    },
  },
];

// SCHEMA
const schemaSimulation = yup.object({
  dob: yup.string().required('Tanggal Lahir harus diisi'),
});

// FRAMER MOTION VARIANTS
const animateSimulationVariants = {
  show: {
    opacity: 1,
    display: 'block',
  },
  hide: {
    opacity: 0,
    display: 'none',
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
};

const LifecoverMain = ({
  // mapStateToProps
  lang,
  lifecoverState,
  // mapDispatchToProps
  getPremiPublic,
}) => {
  const router = useRouter();

  const footerRef = useRef(null);

  const getPremi = {
    value: lifecoverState.getPremiPublicResponse?.premi,
    isLoading: lifecoverState.getPremiPublicFetch,
    error: lifecoverState.getPremiPublicFailed?.message,
  };

  // FORM STATE
  const [showSimulation, setShowSimulation] = useState(false);
  const {
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      dob: '',
      benefit: 500 * JUTA,
      id: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecover.id,
      planCode: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecover.planCode,
      option: PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly,
    },
    shouldFocusError: false,
    resolver: yupResolver(schemaSimulation),
  });
  const watchBenefit = useWatch({ control, name: 'benefit' });
  const watchDob = useWatch({ control, name: 'dob' });
  const watchPlanCode = useWatch({ control, name: 'planCode' });
  const watchPackageOption = useWatch({ control, name: 'option' });

  // HANDLER
  const handlePremiVariant = useCallback(() => {
    setValue(
      'option',
      watchPackageOption === PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly
        ? PRODUCT.LIFECOVER.PACKAGE_OPTION.yearly
        : PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly,
    );
  }, [watchPackageOption]);
  const handleScrollSimulation = useCallback(() => {
    if (footerRef.current) {
      const y = footerRef.current.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y,
        behavior: 'smooth',
      });
    }
  }, [footerRef]);
  const handleRedirectSelectPackage = (value) => {
    router.push({
      pathname: NAVIGATION.LIFECOVER.LifecoverSelectPackage,
      query: value && {
        benefit: value,
      },
    });
  };
  const handleShowSimulation = () => {
    setShowSimulation(true);
    handleScrollSimulation();
  };

  // RENDERER
  const renderBg = useCallback((src) => {
    return (
      <>
        <img
          src={src}
          className="absolute w-full h-full left-0 right-0 top-0 bottom-0 object-cover object-center"
        />
        <div className="bg-black/25 absolute left-0 right-0 top-0 bottom-0" />
      </>
    );
  }, []);
  const renderLogo = useCallback(() => {
    return (
      <img
        src={LifecoverLogoLg}
        className="text-[4px] md:text-[10px] h-[8.3em] w-[47.2em]"
        alt="Lifecover Logo"
      />
    );
  }, []);
  const renderToggleSimulation = () => {
    // when sprint multiple simulation
    // return (
    //   <>
    //     <div className="text-[16px] md:text-[24px]">
    //       <strong>Untuk siapa kamu membuat simulasi ini?</strong>
    //     </div>
    //     <div className="flex items-center gap-3 max-w-[440px] mt-5">
    //       <Button outline bordered className="!border-white !text-white text-[14px]">
    //         Diri Sendiri
    //       </Button>
    //       <Button type="linear-gradient" className="text-[14px]">
    //         Keluarga
    //       </Button>
    //     </div>
    //   </>
    // )
    return (
      <Button
        outline
        bordered
        className="!border-white !text-white text-[14px]"
        onButtonClick={handleShowSimulation}>
        <span
          dangerouslySetInnerHTML={{
            __html: trans(locale, lang, 'cobaSimulasi'),
          }}
        />
      </Button>
    );
  };
  const renderSelectPackage = () => {
    return (
      <motion.div
        variants={animateSimulationVariants}
        animate={showSimulation ? 'hide' : 'show'}
        exit="hide"
        initial="show"
        className="max-w-6xl mx-auto px-[5%] relative z-10 py-[30px] lg:py-[52px]">
        <div className="grid grid-cols-12 items-center gap-5 xl:gap-3">
          <div className="col-span-12 xl:col-span-6 flex gap-5 items-center">
            <div className="flex-initial flex-shrink-0">
              <img
                src={IllustrationProtection}
                alt=""
                className="w-[120px] h-[120px] lg:w-[220px] lg:h-[220px]"
              />
            </div>
            <div className="flex-1">
              <h2 className="lg:text-[24px] text-neutral-dark-neutral80 leading-[36px] max-w-[420px] font-bold">
                {trans(locale, lang, 'pilihProteksi')}
              </h2>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardPackage
              cardVariant="button"
              lang={lang}
              active={watchBenefit === 500 * JUTA}
              onClick={(value) => setValue('benefit', value)}
              onButtonClick={() => handleRedirectSelectPackage(500 * JUTA)}
            />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardPackage
              variant="lifecoverPlus"
              cardVariant="button"
              lang={lang}
              active={watchBenefit === 1000 * JUTA}
              onClick={(value) => setValue('benefit', value)}
              onButtonClick={() => handleRedirectSelectPackage(1000 * JUTA)}
            />
          </div>
        </div>
      </motion.div>
    );
  };
  const renderSimulation = () => {
    return (
      <motion.div
        variants={animateSimulationVariants}
        animate={showSimulation ? 'show' : 'hide'}
        exit="hide"
        initial="hide"
        className="max-w-[833px] mx-auto px-[5%] md:px-0 relative z-10 py-[30px] lg:py-[52px]">
        <div className="bg-white rounded-[16px] min-h-[1059px] relative shadow-3xl overflow-hidden py-[45px] mt-[52px]">
          <div className="max-w-[554px] px-[20px] mx-auto">
            <h2 className="text-[24px] text-neutral-dark-neutral90 text-center font-semibold mb-[42px]">
              {trans(locale, lang, 'hitungSimulasi')}
            </h2>

            <label>
              <div className="text-center text-[14px] font-medium mb-2">
                {trans(locale, lang, 'tanggalLahir')}
              </div>
              <Controller
                name="dob"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full border-2 rounded-[16px] mt-2 p-[17px] text-sm"
                  />
                )}
              />
              {errors.dob?.message && (
                <div className="mt-2 text-primary-dark-primary90">
                  {errors.dob.message}
                </div>
              )}
            </label>

            <hr className="border-[#DADADA] my-7" />

            <div className="text-center text-[14px] font-medium mb-2">
              {trans(locale, lang, 'pilihPaket')} Life<i>COVER</i>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <Controller
                  name="benefit"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CardPackage
                      lang={lang}
                      active={value === 500 * JUTA}
                      onClick={(value) => onChange(value)}
                    />
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  name="benefit"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CardPackage
                      lang={lang}
                      active={value === 1000 * JUTA}
                      variant="lifecoverPlus"
                      onClick={(value) => onChange(value)}
                    />
                  )}
                />
              </div>
            </div>

            <hr className="border-[#DADADA] my-7" />

            <div className="text-center">
              <div className="text-[#232425] text-[16px] font-semibold mb-1">
                {trans(locale, lang, 'sayaInginPertanggungan')}
              </div>
              <div className="text-[#ED1C24] text-[20px] font-semibold underline">
                Rp {formatCurrency({ value: watchBenefit, mantissa: 0 })}
              </div>
            </div>

            <label className="block my-6">
              <div className="text-[12px] text-[#828282] text-center mb-5">
                {trans(locale, lang, 'aturUangPertanggungan')}
              </div>
              <Controller
                name="benefit"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SliderLanding
                    value={value}
                    onChange={(value) => onChange(value)}
                  />
                )}
              />
            </label>

            <div className="text-[12px] text-[#828282] text-center my-7">
              {trans(locale, lang, 'uangPertanggunganMulai')}
            </div>

            <BoxPremi
              lang={lang}
              isLoading={getPremi.isLoading}
              premi={getPremi.value}
              variant={watchPackageOption}
              error={
                errors.dob?.message ?? (getPremi.error ? 'Server error' : '')
              }
            />

            <div className="flex my-10">
              <div className="flex-1 flex items-center gap-1">
                <div className="flex-initial text-[14px] text-[#202021] font-medium">
                  {trans(locale, lang, 'bayarTahunan')}
                </div>
                <div className="flex-initial">
                  <Icon
                    icon={ic_info_outline}
                    className="text-primary-dark-primary90"
                  />
                </div>
              </div>
              <div className="flex-initial">
                <Toggle
                  active={
                    watchPackageOption ===
                    PRODUCT.LIFECOVER.PACKAGE_OPTION.yearly
                  }
                  onClick={handlePremiVariant}
                />
              </div>
            </div>

            <Button
              type="linear-gradient"
              className="max-w-[481px] mx-auto mt-20">
              {trans(locale, lang, 'langgananSekarang')}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };
  const renderHeader = () => {
    return (
      <header className="relative min-h-[600px] md:min-h-[835px]">
        {renderBg(LifecoverLandingImg1)}
        <div className="relative z-10">
          <nav className="container-xl relative mx-auto py-[20px]">
            <button className="text-white p-4">
              <Icon icon={ic_west} size={20} onClick={() => router.back()} />
            </button>
          </nav>

          <div className="max-w-6xl mx-auto px-[5%] sm:pl-[40px] lg:pl-[80px]">
            <h1 className="text-white text-[24px] md:text-[36px] font-semibold mb-6">
              <div className="mb-2">{trans(locale, lang, 'amanBersama')}</div>
              {renderLogo()}
            </h1>

            <h2
              dangerouslySetInnerHTML={{
                __html: trans(locale, lang, 'lifecoverAdalah'),
              }}
              className="text-[16px] md:text-[24px] text-white md:leading-[36px] font-medium max-w-[668px]"
            />

            <div className="flex flex-col md:flex-row md:items-center gap-3 mt-10">
              <Button
                outline
                bordered
                className="!border-white !text-white py-[16px] !h-auto"
                onButtonClick={handleShowSimulation}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: trans(locale, lang, 'cobaSimulasi'),
                  }}
                />
              </Button>
              <Button
                type="linear-gradient"
                className="!py-[17px] !h-auto"
                onButtonClick={() => handleRedirectSelectPackage()}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: trans(locale, lang, 'berlanggananLifecover'),
                  }}
                />
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  };
  const renderSection2 = () => {
    return (
      <section className="relative min-h-[600px] md:min-h-[835px]">
        {renderBg(LifecoverLandingImg2)}
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-[5%] sm:pl-[40px] pt-[128px] lg:pl-[120px]">
            <h2 className="text-white text-[36px] font-semibold mb-2">
              {renderLogo()}
              <div className="text-[18px] md:text-[29px] mt-6">
                {trans(locale, lang, 'memberikanKetenangan')}
              </div>
            </h2>

            <div className="text-white font-normal max-w-[669px]">
              <div className="text-[16px] md:text-[24px] md:leading-[36px] mb-[30px]">
                {trans(locale, lang, 'karenaKamu')}
              </div>
              <div className="text-[16px] md:text-[24px] md:leading-[36px]">
                {trans(locale, lang, 'berinvestasi')}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  const renderSection3 = () => {
    return (
      <section className="relative mt-[-58px] md:mt-[-48px]">
        <div className="max-w-6xl mx-auto px-[5%]">
          {/* benefit and exception */}
          <div className="bg-white rounded-[16px] relative shadow-xl overflow-hidden min-h-[428px] pb-[30px] md:py-[45px]">
            {/* decoration */}
            <img
              src={LifecoverLandingDec1}
              className="absolute bottom-0 w-full object-cover"
              alt=""
            />

            {/* tabs */}
            <TabLanding defaultActiveKey={TAB_OPTION_SECTION3.manfaat}>
              <TabLanding.Header>
                <TabLanding.Item eventKey={TAB_OPTION_SECTION3.manfaat}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: trans(locale, lang, 'manfaat'),
                    }}
                  />
                </TabLanding.Item>
                <TabLanding.Item eventKey={TAB_OPTION_SECTION3.pengecualian}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: trans(locale, lang, 'pengecualian'),
                    }}
                  />
                </TabLanding.Item>
              </TabLanding.Header>

              <TabLanding.Content eventKey={TAB_OPTION_SECTION3.manfaat}>
                {TAB_DATA.manfaat.map((manfaat) => (
                  <div
                    key={manfaat.key}
                    className="max-w-[258px] mx-auto flex flex-col items-center md:items-start text-center md:text-left p-5 md:py-8">
                    <img
                      src={manfaat.img}
                      width={72}
                      height={72}
                      alt=""
                      className="mb-3"
                    />
                    <div className="text-[12px] sm:text-[16px] md:text-[20px]">
                      {manfaat.content[lang]}
                    </div>
                  </div>
                ))}
              </TabLanding.Content>
              <TabLanding.Content eventKey={TAB_OPTION_SECTION3.pengecualian}>
                {TAB_DATA.pengecualian.map((pengecualian) => (
                  <div
                    key={pengecualian.key}
                    className="max-w-[258px] mx-auto flex flex-col items-center md:items-start text-center md:text-left p-5 md:py-8">
                    <img
                      src={pengecualian.img}
                      width={72}
                      height={72}
                      alt=""
                      className="mb-3"
                    />
                    <div className="text-[12px] md:text-[20px]">
                      {pengecualian.content[lang]}
                    </div>
                  </div>
                ))}
              </TabLanding.Content>
            </TabLanding>
          </div>

          {/* reason why you should have lifecover */}
          <div className="max-w-[740px] mx-auto py-[100px]">
            <h2
              dangerouslySetInnerHTML={{
                __html: trans(locale, lang, 'alasanPunyaLifecover'),
              }}
              className="text-neutral-dark-neutral90 text-[24px] font-semibold text-center mb-[50px]"
            />

            <div className="flex flex-col md:flex-row gap-5">
              {REASON_DATA.map((reason) => (
                <div key={reason.title[lang]} className="flex-1">
                  <CardReason
                    img={reason.img}
                    title={reason.title[lang]}
                    content={reason.content[lang]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  const renderSection4 = () => {
    return (
      <section className="relative bg-[#FAAD47] min-h-[465px] overflow-hidden">
        {/* decoration */}
        <img
          src={LifecoverLandingDec2}
          className="absolute top-0 inset-x-0 w-full object-cover"
          alt=""
        />

        <div className="max-w-6xl mx-auto px-[5%] relative z-10 py-[30px] lg:pt-[52px] lg:pb-[55px]">
          <div className="flex flex-col md:flex-row gap-[30px] lg:gap-[54px] md:items-center justify-center">
            <div className="flex-initial flex-shrink-0">
              <div className="text-[8px] md:text-[10px] w-full sm:w-[43.1em] h-[28.2em] rounded-[5px] shadow-md overflow-hidden">
                <img
                  src={LifecoverLandingImg3}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-white max-w-[550px]">
              <h2
                dangerouslySetInnerHTML={{
                  __html: trans(locale, lang, 'yukCobaSimulasi'),
                }}
                className="text-[24px] md:text-[40px] font-semibold leading-[47px] max-w-[290px] mb-[14px] md:mb-[18px]"
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: trans(locale, lang, 'sebelumLangganan'),
                }}
                className="text-[16px] md:text-[24px] font-medium md:leading-[36px] mb-7"
              />

              {renderToggleSimulation()}
            </div>
          </div>
        </div>
      </section>
    );
  };
  const renderFooter = () => {
    return (
      <footer ref={footerRef} className="relative min-h-[70px] overflow-hidden">
        {/* decoration */}
        <div className="absolute left-0 right-0 h-[1200px] w-full overflow-hidden">
          <img
            src={LifecoverLandingDec3}
            className="absolute top-0 right-0 w-full object-contain"
            alt=""
          />
        </div>

        {renderSelectPackage()}
        {renderSimulation()}

        <BoxHelp lang={lang} />

        <div className="text-gray-500 mt-[50px] font-medium text-xs text-center pb-[30px]">
          {trans(locale, lang, 'footer')}
        </div>
      </footer>
    );
  };

  // EFFECTS
  // effect : change package id & plane on benefit value change
  useEffect(() => {
    const selectedPackageId = (() => {
      if (watchBenefit === 500 * JUTA) {
        return {
          id: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecover.id,
          planCode: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecover.planCode,
        };
      } else if (watchBenefit === 1000 * JUTA) {
        return {
          id: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecoverPlus.id,
          planCode: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecoverPlus.planCode,
        };
      } else {
        return {
          id: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecoverFreeChoice.id,
          planCode: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecoverFreeChoice.planCode,
        };
      }
    })();
    setValue('id', selectedPackageId.id);
    setValue('planCode', selectedPackageId.planCode);
  }, [watchBenefit]);
  // effect : getPremiPublic
  useEffect(() => {
    getPremiPublic({
      planCode: watchPlanCode,
      benefit: watchBenefit,
      dob: watchDob,
    });
  }, [watchBenefit, watchPlanCode, watchDob]);

  return (
    <Container fullScreen noBackground>
      {renderHeader()}
      {renderSection2()}
      {renderSection3()}
      {renderSection4()}
      {renderFooter()}
    </Container>
  );
};

export default LifecoverMain;
