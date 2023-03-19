import clsx from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const animateButtonVariants = {
  show: {
    opacity: 1,
    display: 'flex',
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

const CardLanding = ({ img, title, content }) => {
  const contentRef = useRef(null);

  const [showDetail, setShowDetail] = useState(false);
  const [contentLength, setContentLength] = useState(0);

  const contentClass = clsx('font-medium text-[14px] leading-[21px] mb-3', {
    'line-clamp-2': !showDetail,
  });
  const buttonClass = clsx(
    'absolute text-[14px] text-[#ED1A33] bottom-[15px] text-[##ED1A33] font-semibold underline',
    {
      'line-clamp-2': !showDetail,
    },
  );

  useEffect(() => {
    if (contentRef.current) {
      const html = contentRef.current?.innerHTML;
      if (html) {
        const text = html.replace(/<[^>]*>/g, '');
        setContentLength(text.length);
      }
    }
  }, [contentRef]);

  return (
    <div className="w-full relative min-h-[186px] bg-white shadow-lg rounded-[16px] overflow-hidden">
      <div className="bg-gradient-red h-[5px]" />
      <div className="flex min-h-full gap-4 pt-5 px-5 pb-10">
        <div className="flex-initial self-start">
          <img src={img} alt="" width={42} height={42} />
        </div>
        <div className="flex-1">
          <div className="font-semibold mb-3">{title}</div>
          <p ref={contentRef} className={contentClass}>
            {content}
          </p>

          {contentLength > 64 && (
            <motion.button
              variants={animateButtonVariants}
              animate={showDetail ? 'hide' : 'show'}
              exit="hide"
              initial="show"
              className={buttonClass}
              onClick={() => setShowDetail(true)}>
              Lihat Detail
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardLanding;
