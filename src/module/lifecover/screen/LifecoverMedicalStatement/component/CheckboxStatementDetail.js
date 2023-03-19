import clsx from 'classnames';
import {
  AccordionCustom,
  CheckCustom,
  SelectCustom,
} from '@cp-module/lifecover/component';
import { useRef } from 'react';

const CheckboxQuestionDetail = ({
  key,
  lang,
  values = [],
  questionDetail = [],
  onChange = (values = []) => {},
}) => {
  const checkSelectedDetail = (detailQuestion) => {
    return !!values.find(
      (detail) => detail?.detailId === detailQuestion?.idDetail,
    );
  };
  const handleChange = (detailQuestion) => {
    let newValues = [];
    if (checkSelectedDetail(detailQuestion)) {
      newValues = values.filter(
        (value) => value.detailId !== detailQuestion?.idDetail,
      );
    } else {
      newValues = [...values, { detailId: detailQuestion?.idDetail }];
    }

    onChange(newValues);
  };

  const renderLabel = () => {
    switch (lang) {
      case 'en':
        return 'If “Yes”, please select the type of disease suffered';
      default:
        return 'Jika ada jawaban “Ya” silahkan pilih jenis penyakit kamu';
    }
  };

  return (
    <div>
      {/* <p className="text-[12px] font-bold my-3">{renderLabel()}</p> */}
      <div className="border rounded-[16px] p-4 mt-5">
        <AccordionCustom defaultActiveKey={key}>
          <AccordionCustom.Item eventKey={key} defaultOpen>
            <AccordionCustom.Header as="div" className="text-black font-medium">
              {lang === 'en' ? 'Select Disease' : 'Pilih Jenis Penyakit'}
            </AccordionCustom.Header>
            <AccordionCustom.Body className="py-4">
              <div className="grid grid-cols-12 gap-3">
                {questionDetail?.map((detail, idx) => (
                  <div
                    className="col-span-12 sm:col-span-6 lg:col-span-4"
                    key={'question-detail-' + idx}>
                    <label className="cursor-pointer flex gap-3 items-start">
                      <div className="flex-initial flex-shrink-0 pt-1 pl-2">
                        <CheckCustom
                          key={detail?.idDetail ?? idx}
                          checked={checkSelectedDetail(detail)}
                          onChange={() => handleChange(detail)}
                        />
                      </div>
                      <div className="flex-1 text-[10px] md:text-[12px] text-black">
                        {detail?.questionNameDetail}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionCustom.Body>
          </AccordionCustom.Item>
        </AccordionCustom>
      </div>
    </div>
  );
};

export default CheckboxQuestionDetail;
