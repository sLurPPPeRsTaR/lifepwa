import {
  AccordionCustom,
  BaseLayout,
  ButtonCustom,
  CardCustom,
  ModalCustom,
  ProgressBar,
  SelectCustom,
  SelectCustomBMI,
  SelectCustomV2,
} from '@cp-module/lifecover/component';
import { LifecoverLogo } from '@cp-config/Images';
import Image from 'next/image';
import { ic_west } from 'react-icons-kit/md';
import { anchor, cloudDrizzle } from 'react-icons-kit/feather';
import Icon from 'react-icons-kit';
import { useCallback, useEffect, useState } from 'react';
import { Button, Input } from '@cp-component';
import {
  Check,
  Puzzle,
  AnnouncementLocked,
  LifeTagDiseaseHistory,
} from '@cp-config/Images';
import {
  // LifecoverRelationFather,
  // LifecoverRelationMother,
  LifecoverRelationBoy,
} from '@cp-config/Svgs';
import DropdownMultiSelect from '@cp-module/lifecover/screen/LifecoverMedicalStatement/component/DropdownMultiSelect';

const SELECTV2_WITH_ICON_OPTIONS = [
  {
    // icon: LifecoverRelationFather,
    icon: Check,
    label: 'Ayah',
    value: 'father',
    isDisabled: true,
  },
  {
    // icon: LifecoverRelationMother,
    icon: Check,
    label: 'Ibu',
    value: 'mother',
  },
];

const WEIGHT_OPTIONS = Array.from({ length: 50 }).map((_, idx) => {
  const value = 60 + idx;
  return {
    label: value,
    value,
  };
});
const HEIGHT_OPTIONS = Array.from({ length: 50 }).map((_, idx) => {
  const value = 155 + idx;
  return {
    label: value,
    value,
  };
});

const Page = () => {
  // STATE
  const [showModalIncorrect, setShowModalIncorrect] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalSelection, setShowModalSelection] = useState(false);
  const [layoutFooter, setLayoutFooter] = useState(null);
  const [layoutVariant, setLayoutVariant] = useState('default'); // 'default' | 'card-on-desktop'
  const [selectValueRelation, setSelectValueRelation] = useState(null);
  const [selectValueWeight, setSelectValueWeight] = useState(WEIGHT_OPTIONS[0]);
  const [selectValueHeight, setSelectValueHeight] = useState(HEIGHT_OPTIONS[0]);
  const [accordionValues, setAccordionValues] = useState([
    { key: 'event-test-1', label: 'accordion allwaysOpen' },
    { key: 'event-test-2', label: 'accordion allwaysOpen' },
    { key: 'event-test-3', label: 'accordion allwaysOpen' },
  ]);

  // State Dropdown Jenis penyakit
  const [valueDroprown, setValueDropdown] = useState([
    {
      id: '1',
      name: 'Gangguan Hati',
      checked: false,
    },
    {
      id: '2',
      name: 'Kelainan Tulang',
      checked: false,
    },
    {
      id: '3',
      name: 'Kelainan Darah',
      checked: false,
    },
    {
      id: '4',
      name: 'Kelainan Hormonal',
      checked: false,
    },
    {
      id: '5',
      name: 'Kencing Manis',
      checked: false,
    },
    {
      id: '6',
      name: 'Kelainan Ginjal',
      checked: false,
    },
    {
      id: '7',
      name: 'Penyakit Paru',
      checked: false,
    },
    {
      id: '8',
      name: 'Kista',
      checked: false,
    },
    {
      id: '9',
      name: 'Tumor',
      checked: false,
    },
    {
      id: '10',
      name: 'Jantung',
      checked: false,
    },
    {
      id: '11',
      name: 'Tiroid',
      checked: false,
    },
    {
      id: '12',
      name: 'Stoke',
      checked: false,
    },
    {
      id: '13',
      name: 'HIV',
      checked: false,
    },
    {
      id: '14',
      name: 'Hamil',
      checked: false,
    },
    {
      id: '15',
      name: 'Lainnya',
      checked: false,
    },
  ]);

  const [form, setForm] = useState({
    jenisPenyakit: [],
  });
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleChangeFrom = (fieldName, e) => {
    const { value, type, checked } = e.target;
    if (fieldName === 'jenisPenyakit') {
      if (type === 'checkbox') {
        setForm((prevState) => ({
          ...prevState,
          [fieldName]: checked
            ? [...prevState[fieldName], value]
            : [...prevState[fieldName], value].filter((val) => value !== val),
        }));
      }
    }
  };
  console.log(form, 'ini form');

  const dataValue = valueDroprown?.map((item) => {
    return {
      ...item,
      name: item.name,
      value: item.name,
      id: item.id,
      checked: item.checked,
    };
  });
  // State Dropdown Jenis penyakit

  // State Incorect Medical Statement
  const [showModalIncorrectMedical, setShowModalIncorrectMedical] =
    useState(false);
  const [showModalIncorrectPremi, setShowModalIncorrectPremi] = useState(false);
  const [showModalIncorrectKesehatan, setShowModalIncorrectKesehatan] =
    useState(false);
  const [showModalDatakesehatan, setShowModalDatakesehatan] = useState(false);
  // State Incorect Medical Statement

  // HANDLER
  const handleAppendAccordion = useCallback(() => {
    const key = `event-test-${accordionValues.length + 1}`;
    setAccordionValues((prev) => [
      ...prev,
      { key, label: 'accordion allwaysOpen' },
    ]);
  }, [accordionValues]);

  // EFFECT
  useEffect(() => {
    if (selectValueRelation) {
      alert(JSON.stringify({ selectValueRelation }));
    }
  }, [selectValueRelation]);

  return (
    <>
      <BaseLayout showProgressBar variant={layoutVariant} step={3} maxStep={5}>
        <BaseLayout.Container
          fullWidth={layoutVariant === 'card-on-desktop'}
          className="pt-10 pb-[160px]">
          <h1 className="font-bold mb-10">
            Base component Lifecover (module/lifecover/component)
          </h1>

          <div className="mb-10">
            <h2 className="font-semibold mb-3">Customize BaseLayout</h2>

            <div className="font-semibold mb-2 border-b">Variant</div>
            <label className="flex mb-2">
              <input
                type="radio"
                name="base-layout-variant"
                checked={layoutVariant === 'default'}
                onChange={() => setLayoutVariant('default')}
              />
              <div className="ml-3">default</div>
            </label>
            <label className="flex mb-2">
              <input
                type="radio"
                name="base-layout-variant"
                checked={layoutVariant === 'card-on-desktop'}
                onChange={() => setLayoutVariant('card-on-desktop')}
              />
              <div className="ml-3">card-on-desktop</div>
            </label>

            <div className="font-semibold mb-2 border-b">Footer</div>
            <label className="flex mb-2">
              <input
                type="radio"
                name="base-layout-footer"
                checked={!layoutFooter}
                onChange={() => setLayoutFooter(null)}
              />
              <div className="ml-3">No Footer</div>
            </label>
            <label className="flex mb-2">
              <input
                type="radio"
                name="base-layout-footer"
                checked={layoutFooter === 'default'}
                onChange={() => setLayoutFooter('default')}
              />
              <div className="ml-3">With Footer</div>
            </label>
            <label className="flex mb-2">
              <input
                type="radio"
                name="base-layout-footer"
                checked={layoutFooter === 'maxWidth'}
                onChange={() => setLayoutFooter('maxWidth')}
              />
              <div className="ml-3">With Footer (add maxWidth)</div>
            </label>
          </div>

          <div className="mb-10">
            <h2 className="font-semibold mb-3">SelectCustomV2</h2>
            <SelectCustomV2
              options={SELECTV2_WITH_ICON_OPTIONS}
              labelMenu="Pilih Status Relasi"
              placeholder="Pilih Status Relasi"
              value={selectValueRelation}
              onChange={(option) => setSelectValueRelation(option)}
              components={{
                SingleValue: SelectCustomV2.SingleValueWithIcon,
                Option: SelectCustomV2.OptionWithIcon,
                Menu: SelectCustomV2.MenuWithIcon,
              }}
            />
            <SelectCustomBMI
              options={WEIGHT_OPTIONS}
              placeholder="-- Pilih Berat Badan --"
              labelUnit="Kg"
              value={selectValueWeight}
              onChange={(option) => setSelectValueWeight(option)}
            />
            <SelectCustomBMI
              options={HEIGHT_OPTIONS}
              placeholder="-- Pilih Tinggi Badan --"
              labelUnit="Cm"
              value={selectValueHeight}
              onChange={(option) => setSelectValueHeight(option)}
            />
          </div>

          {/* accordion */}
          <div className="mb-10">
            <h2 className="font-semibold mb-3">Accordion</h2>
            <AccordionCustom>
              <AccordionCustom.Item eventKey="event-key-all-open-1">
                <AccordionCustom.Header
                  as="h2"
                  className="border-b py-3 font-semibold">
                  Header Accordion 1
                </AccordionCustom.Header>
                <AccordionCustom.Body>Body Accordion 1</AccordionCustom.Body>
              </AccordionCustom.Item>
              <AccordionCustom.Item eventKey="event-key-all-open-2">
                <AccordionCustom.Header
                  as="h2"
                  className="border-b py-3 font-semibold">
                  Header Accordion 2
                </AccordionCustom.Header>
                <AccordionCustom.Body>Body Accordion 2</AccordionCustom.Body>
              </AccordionCustom.Item>
            </AccordionCustom>
          </div>

          {/* accordion */}
          <div className="mb-10">
            <h2 className="font-semibold mb-3">
              Accordion allOpen & alwaysOpen
            </h2>
            <AccordionCustom allOpen alwaysOpen>
              {accordionValues.map((v, idx) => (
                <AccordionCustom.Item key={v.key} eventKey={v.key} defaultOpen>
                  <AccordionCustom.Header
                    as="h2"
                    className="border-b py-3 font-semibold">
                    Header {`${v.label} - ${idx + 1}`}
                  </AccordionCustom.Header>
                  <AccordionCustom.Body>
                    Body {`${v.label} - ${idx + 1}`}
                  </AccordionCustom.Body>
                </AccordionCustom.Item>
              ))}
            </AccordionCustom>

            <Button
              type="linear-gradient"
              onButtonClick={handleAppendAccordion}>
              Add More accordion item
            </Button>
          </div>

          {/* select */}
          <div className="mb-10">
            <h2 className="font-semibold line-through mb-3">
              SelectCustom Deprecated
            </h2>
            <SelectCustom placeholder="-- Pilih Item --">
              <SelectCustom.Item value="pelabuhan">
                <div className="flex gap-3 items-center">
                  <div className="flex-initial">
                    <Icon icon={anchor} />
                  </div>
                  <div className="flex-1 pt-[3px]">Pelabuhan</div>
                </div>
              </SelectCustom.Item>
              <SelectCustom.Item value="hujan">
                <div className="flex gap-3 items-center">
                  <div className="flex-initial">
                    <Icon icon={cloudDrizzle} />
                  </div>
                  <div className="flex-1 pt-[3px]">Hujan</div>
                </div>
              </SelectCustom.Item>
            </SelectCustom>
          </div>

          {/* card */}
          <div className="grid grid-cols-12 gap-3 mb-10">
            <div className="col-span-12">
              <h2 className="font-semibold mb-3">CardCustom</h2>
              <CardCustom>
                <CardCustom.Body>Simple Card Custom</CardCustom.Body>
              </CardCustom>
            </div>

            <div className="col-span-12">
              <h2 className="font-semibold mb-3">CardCustom with Header</h2>
              <CardCustom>
                <CardCustom.Header>
                  <div className="flex justify-between">
                    <div className="flex-initial flex-shrink-0 w-[136px] h-[24px] overflow-hidden relative">
                      <Image
                        src={LifecoverLogo}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div className="flex-initial">
                      <div className="text-white">
                        <strong>Rp99.000,</strong>- /bulan
                      </div>
                    </div>
                  </div>
                </CardCustom.Header>
                <CardCustom.Body>
                  Simple Card Custom
                  <Button outline bordered className="max-w-none mt-10">
                    + Tambahkan
                  </Button>
                  <Button type="linear-gradient" className="max-w-none mt-3">
                    Lanjutkan
                  </Button>
                </CardCustom.Body>
              </CardCustom>
            </div>
          </div>

          {/* button */}
          <div className="grid grid-cols-12 gap-3 mb-10">
            <div className="col-span-6">
              <h2 className="font-semibold mb-3">ButtonCustom</h2>
              <ButtonCustom
                active
                variant="selectable"
                textAlign="center"
                prefixIcon={<Icon icon={ic_west} />}>
                Keluarga
              </ButtonCustom>
            </div>
          </div>

          {/* progress bar */}
          <div className="grid grid-cols-12 gap-3 mb-10">
            <div className="col-span-4">
              <h2 className="font-semibold mb-3">ProgressBar</h2>
              <ProgressBar step={3} maxStep={5} />
            </div>
          </div>

          {/* modal */}
          <div className="grid grid-cols-12 gap-3 mb-10">
            <div className="col-span-4">
              <h2 className="font-semibold mb-3">Modal Selection</h2>
              <Button
                type="linear-gradient"
                onButtonClick={() => setShowModalSelection(true)}>
                Show Modal Selection
              </Button>
            </div>
            <div className="col-span-4">
              <h2 className="font-semibold mb-3">Modal Incorrect</h2>
              <Button
                type="linear-gradient"
                onButtonClick={() => setShowModalIncorrect(true)}>
                Show Modal Incorrect
              </Button>
            </div>
            <div className="col-span-4">
              <h2 className="font-semibold mb-3">Modal Success</h2>
              <Button
                type="linear-gradient"
                onButtonClick={() => setShowModalSuccess(true)}>
                Show Modal Success
              </Button>
            </div>
          </div>

          {layoutFooter && (
            <BaseLayout.Footer
              containerClassName={
                layoutFooter === 'maxWidth' ? 'max-w-2xl' : ''
              }>
              <div className="flex items-center">
                <div className="flex-1">
                  <h2 className="text-green-500">Rp. 99.000</h2>
                </div>
                <div className="flex-initial">
                  <div className="min-w-[320px]">
                    <Button type="linear-gradient">Bayar Sekarang</Button>
                  </div>
                </div>
              </div>
            </BaseLayout.Footer>
          )}

          {/* Dropdown Multi Select Jenis Penyakit */}
          <DropdownMultiSelect
            placeholder={'Pilih Jenis Penyakit'}
            dataValue={dataValue}
            handleChange={(e) => handleChangeFrom('jenisPenyakit', e)}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            labelName="Jika “Ya”, mohon pilih jenis penyakit yang diderita"
            name="jenisPenyakit"
            placeholderValue={form?.jenisPenyakit}
          />
          {/* Dropdown Multi Select Jenis Penyakit */}

          {/* Modal Incorect total uang pertanggungan Medical Statement */}
          <div className="col-span-4 mb-5 mt-10">
            <h2 className="font-semibold mb-3">
              Modal Incorrect Total uang pertanggungan
            </h2>
            <Button
              type="linear-gradient"
              onButtonClick={() => setShowModalIncorrectMedical(true)}>
              Show Modal
            </Button>
          </div>
          {/* Modal Incorect total uang pertanggungan Medical Statement */}
          {/* Modal Incorect premi Medical Statement */}
          <div className="col-span-4 mb-5">
            <h2 className="font-semibold mb-3">Modal Incorrect Premi</h2>
            <Button
              type="linear-gradient"
              onButtonClick={() => setShowModalIncorrectPremi(true)}>
              Show Modal
            </Button>
          </div>
          {/* Modal Incorect premi Medical Statement */}
          {/* Modal Incorect kondisi kesehatan Medical Statement */}
          <div className="col-span-4">
            <h2 className="font-semibold mb-3">
              Modal Incorrect Kondisi Kesehatan
            </h2>
            <Button
              type="linear-gradient"
              onButtonClick={() => setShowModalIncorrectKesehatan(true)}>
              Show Modal
            </Button>
          </div>
          {/* Modal Incorect kondisi kesehatan Medical Statement */}
          {/* Modal Incorect Data Kesehatan Medical Statement */}
          <div className="col-span-4 mt-5">
            <h2 className="font-semibold mb-3">Modal Data Kesehatan</h2>
            <Button
              type="linear-gradient"
              onButtonClick={() => setShowModalDatakesehatan(true)}>
              Show Modal
            </Button>
          </div>
          {/* Modal Incorect Data Kesehatan Medical Statement */}
        </BaseLayout.Container>
      </BaseLayout>
      <ModalCustom
        size="md"
        isOpen={showModalSelection}
        imageSrc={Puzzle}
        imageClassName="w-[185px] h-[185px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">
          Untuk siapa kamu berlangganan LifeCOVER?
        </div>

        <Button
          outline
          bordered
          className="mt-6 max-w-none"
          onButtonClick={() => setShowModalSelection(false)}>
          Diri Sendiri
        </Button>
        <Button
          type="linear-gradient"
          className="mt-3 max-w-none"
          onButtonClick={() => setShowModalSelection(false)}>
          Diri Sendiri
        </Button>
      </ModalCustom>
      <ModalCustom
        isOpen={showModalIncorrect}
        toggle={() => setShowModalIncorrect(false)}
        imageSrc={AnnouncementLocked}
        imageClassName="w-[145px] h-[145px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">Mohon Maaf</div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          Kondisi kesehatan yang sudah kamu isi belum sesuai kriteria, dalam
          beberapa saat kamu akan dihubungi agen pemasar kami untuk tetap
          berkesempatan dalam berlangganan <b>LifeCOVER</b>
        </div>

        <Button
          type="linear-gradient"
          className="mt-6 max-w-none"
          onButtonClick={() => setShowModalIncorrect(false)}>
          Kembali
        </Button>
      </ModalCustom>
      <ModalCustom
        isOpen={showModalSuccess}
        toggle={() => setShowModalSuccess(false)}
        imageSrc={Check}
        withCloseToggler>
        <ModalCustom.Body>
          <div className="max-w-[300px] font-bold">
            Pernyataan kamu berhasil memenuhi syarat LifeCOVER
          </div>
        </ModalCustom.Body>
      </ModalCustom>

      {/* Modal Incorect total uang pertanggungan Medical Statement */}
      <ModalCustom
        isOpen={showModalIncorrectMedical}
        toggle={() => setShowModalIncorrectMedical(false)}
        imageSrc={AnnouncementLocked}
        imageClassName="w-[180px] h-[180px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">Mohon Maaf</div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          Total uang pertanggungan yang anda miliki sudah melebihi batas
          maksimal. Kamu akan dihubungi agen pemasar kami dalam waktu 1x24 jam
          untuk bisa berlangganan <b>LifeCOVER</b>
        </div>

        <Button
          type="linear-gradient"
          className="mt-6 max-w-none"
          onButtonClick={() => setShowModalIncorrectMedical(false)}>
          Kembali
        </Button>
      </ModalCustom>
      {/* Modal Incorect total uang pertanggungan Medical Statement */}
      {/* Modal Incorect Premi Medical Statement */}
      <ModalCustom
        isOpen={showModalIncorrectPremi}
        toggle={() => setShowModalIncorrectPremi(false)}
        imageSrc={AnnouncementLocked}
        imageClassName="w-[180px] h-[180px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">Mohon Maaf</div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          Premi yang kamu miliki sudah melebihi batas maksimal. Kamu akan
          dihubungi agen pemasar kami dalam waktu 1x24 jam untuk bisa
          berlangganan <b>LifeCOVER</b>
        </div>

        <Button
          type="linear-gradient"
          className="mt-6 max-w-none"
          onButtonClick={() => setShowModalIncorrectPremi(false)}>
          Kembali
        </Button>
      </ModalCustom>
      {/* Modal Incorect Premi Medical Statement */}
      {/* Modal Incorect Kondisi kesehatan Medical Statement */}
      <ModalCustom
        isOpen={showModalIncorrectKesehatan}
        toggle={() => setShowModalIncorrectKesehatan(false)}
        imageSrc={AnnouncementLocked}
        imageClassName="w-[180px] h-[180px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">Mohon Maaf</div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          Kondisi kesehatan yang sudah kamu isi belum sesuai kriteria, dalam
          beberapa saat kamu akan dihubungi agen pemasar kami untuk tetap
          berkesempatan dalam berlangganan <b>LifeCOVER</b>
        </div>

        <Button
          type="linear-gradient"
          className="mt-6 max-w-none"
          onButtonClick={() => setShowModalIncorrectKesehatan(false)}>
          Kembali
        </Button>
      </ModalCustom>
      {/* Modal Incorect Kondisi kesehatan Medical Statement */}
      {/* Modal Data kesehatan Medical Statement */}
      <ModalCustom
        isOpen={showModalDatakesehatan}
        toggle={() => setShowModalDatakesehatan(false)}
        imageSrc={LifeTagDiseaseHistory}
        imageClassName="w-[145px] h-[145px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mb-5">Data Kesehatan</div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          Pastikan data kesehatan yang kamu isi sudah benar dan seusai dengan
          riwayat penyakit yang kamu punya.
        </div>

        <Button
          bordered
          className="mt-6 max-w-none text-red-dark-D71920"
          onButtonClick={() => setShowModalDatakesehatan(false)}>
          Kembali
        </Button>
        <Button
          type="linear-gradient"
          className="mt-6 max-w-none w-"
          onButtonClick={() => setShowModalDatakesehatan(false)}>
          Lanjutkan
        </Button>
      </ModalCustom>
      {/* Modal Data kesehatan Medical Statement */}
    </>
  );
};

export default Page;
