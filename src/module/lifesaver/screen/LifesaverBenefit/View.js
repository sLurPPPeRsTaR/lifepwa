import { Container } from '@cp-component';
import { BtnBack, LifesaverProtection2 } from '@cp-config/Svgs';
import Image from 'next/image';
import clsx from 'classnames';
import { useState } from 'react';
import { Modal } from '@cp-component';
import { useEffect } from 'react';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { specialRender } from '@cp-util/common';

export default function Page({ lang, showModalBenefit, setShowModalBenefit }) {
  const [activeTab, setActiveTab] = useState(showModalBenefit?.id);

  useEffect(() => {
    if (showModalBenefit?.pos) {
      setActiveTab(showModalBenefit?.id);
    }else{
      setActiveTab(showModalBenefit?.id + 1);
    }
  }, [showModalBenefit]);

  function renderHeader() {
    return (
      <div className="relative border-b py-4 font-bold flex justify-center mb-4">
        <div
          role="button"
          onClick={() => setShowModalBenefit({ status: false })}
          className="absolute flex items-center left-4 md:left-6 z-10">
          <Image src={BtnBack} width={24} height={24} />
        </div>
        <div>{trans(locale, lang, 'header')}</div>
      </div>
    );
  }

  function renderTabNavigation() {
    return (
      <div className="flex font-semibold xm:text-sm xs:text-[10px]">
        {showModalBenefit?.pos && (
          <div
            role="button"
            onClick={() => setActiveTab(0)}
            className={clsx(
              'w-full text-center border-b-2 py-2 whitespace-nowrap',
              activeTab === 0
                ? 'text-primary-light-primary90 border-primary-light-primary90'
                : 'text-[#C4C4C4]',
            )}>
            {specialRender({
              content: trans(locale, lang, 'lifesaverPos'),
              mapping: [['SAVER', <span className="italic">SAVER</span>]],
            })}
          </div>
        )}
        <div
          role="button"
          onClick={() => setActiveTab(1)}
          className={clsx(
            'w-full text-center border-b-2 py-2',
            activeTab === 1
              ? 'text-primary-light-primary90 border-primary-light-primary90'
              : 'text-[#C4C4C4]',
          )}>
          {specialRender({
            content: trans(locale, lang, 'lifesaver'),
            mapping: [['SAVER', <span className="italic">SAVER</span>]],
          })}
        </div>
        <div
          role="button"
          onClick={() => setActiveTab(2)}
          className={clsx(
            'w-full text-center border-b-2 py-2',
            activeTab === 2
              ? 'text-primary-light-primary90 border-primary-light-primary90'
              : 'text-[#C4C4C4]',
          )}>
          {specialRender({
            content: trans(locale, lang, 'lifesaverPlus'),
            mapping: [['SAVER', <span className="italic">SAVER</span>]],
          })}
        </div>
      </div>
    );
  }

  const CardPoint = ({ children }) => {
    return (
      <div className="flex gap-2 md:gap-4 mb-2">
        <div>
          <Image src={LifesaverProtection2} width={16} height={16} />
        </div>
        {children}
      </div>
    );
  };

  function renderBenefitLifesaverPos() {
    return (
      <div className="py-4 px-0 md:px-8 text-caption1 text-[#666B6F] text-medium">
        <CardPoint>
          <div>
            <div>{trans(locale, lang, 'lifesaverPos_list1')}</div>
            <div className="text-primary-light-primary90 font-semibold">
              {specialRender({
                content: trans(locale, lang, 'lifesaverPos_desc1'),
                mapping: [
                  [
                    '/kejadian',
                    <span className="text-[#666B6F] font-normal">
                      /kejadian
                    </span>,
                  ],
                ],
              })}
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>{trans(locale, lang, 'lifesaverPos_list2')}</div>
            <div className="text-primary-light-primary90 font-semibold">
              {specialRender({
                content: trans(locale, lang, 'lifesaverPos_desc2'),
                mapping: [
                  [
                    '/kejadian',
                    <span className="text-[#666B6F] font-normal">
                      /kejadian
                    </span>,
                  ],
                ],
              })}
            </div>
            <div className="pt-3">
              <div className="">
                {specialRender({
                  content: trans(locale, lang, 'lifesaverPos_list2_subtitle'),
                  mapping: [
                    [
                      'inner limit*',
                      <span className="text-primary-light-primary90 font-semibold italic">
                        inner limit*
                      </span>,
                    ],
                  ],
                })}
              </div>
            </div>
            <div className="px-4 flex flex-col gap-2">
              <div>
                <div>{trans(locale, lang, 'lifesaverPos_list2_sublist1')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPos_list2_subdesc1')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPos_list2_sublist2')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPos_list2_subdesc2')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPos_list2_sublist3')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPos_list2_subdesc3')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPos_list2_sublist4')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPos_list2_subdesc4')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPos_list2_sublist5')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPos_list2_subdesc5')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPos_list2_sublist6')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPos_list2_subdesc6')}
                </div>
                <div className="text-primary-light-primary90 font-semdium italic">
                  {trans(locale, lang, 'lifesaverPos_list2_subtnc6')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPos_list2_sublist7')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPos_list2_subdesc7')}
                </div>
              </div>
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>{trans(locale, lang, 'lifesaverPos_list2_sublist9')}</div>
            <div className="text-primary-light-primary90 font-semibold">
              {trans(locale, lang, 'lifesaverPos_list2_subdesc9')}
            </div>
          </div>
        </CardPoint>
        <div className="mt-1 mb-2">
          {trans(locale, lang, 'lifesaverPos_subtitle')}
        </div>
        <CardPoint>
          <div>
            <div>
              {trans(locale, lang, 'lifesaverPos_list3')}{' '}
              <span className="text-white rounded-full px-2 bg-primary-light-primary90 h-max">
                Promo
              </span>
            </div>
            <div className="text-primary-light-primary90 font-semibold">
              {trans(locale, lang, 'lifesaverPos_desc3')}
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>
              {trans(locale, lang, 'lifesaverPos_list4')}{' '}
              <span className="text-white rounded-full px-2 bg-primary-light-primary90 h-max">
                Promo
              </span>
              <div className="text-primary-light-primary90 font-semibold">
                {trans(locale, lang, 'lifesaverPos_desc4')}
              </div>
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>
              {trans(locale, lang, 'lifesaverPos_list5')}{' '}
              <span className="text-white rounded-full px-2 bg-primary-light-primary90 h-max">
                Promo
              </span>
            </div>
          </div>
        </CardPoint>
        <div className="mt-12 italic">
          {specialRender({
            content: trans(locale, lang, 'lifesaverPos_tnc'),
            mapping: [
              [
                '*Inner limit',
                <span className="font-semibold text-primary-light-primary90">
                  *Inner limit
                </span>,
              ],
            ],
          })}
        </div>
      </div>
    );
  }

  function renderBenefitLifesaver() {
    return (
      <div className="py-4 px-0 md:px-8 text-caption1 text-[#666B6F] text-medium">
        <CardPoint>
          <div>
            <div>{trans(locale, lang, 'lifesaver_list1')}</div>
            <div className="text-primary-light-primary90 font-semibold">
              {specialRender({
                content: trans(locale, lang, 'lifesaver_desc1'),
                mapping: [
                  [
                    '/kejadian',
                    <span className="text-[#666B6F] font-normal">
                      /kejadian
                    </span>,
                  ],
                ],
              })}
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>{trans(locale, lang, 'lifesaver_list2')}</div>
            <div className="text-primary-light-primary90 font-semibold">
              {specialRender({
                content: trans(locale, lang, 'lifesaver_desc2'),
                mapping: [
                  [
                    '/kejadian',
                    <span className="text-[#666B6F] font-normal">
                      /kejadian
                    </span>,
                  ],
                ],
              })}
            </div>
            <div className="pt-3">
              <div className="">
                {specialRender({
                  content: trans(locale, lang, 'lifesaver_list2_subtitle'),
                  mapping: [
                    [
                      'inner limit*',
                      <span className="text-primary-light-primary90 font-semibold italic">
                        inner limit*
                      </span>,
                    ],
                  ],
                })}
              </div>
            </div>
            <div className="px-4 flex flex-col gap-2">
              <div>
                <div>{trans(locale, lang, 'lifesaver_list2_sublist1')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaver_list2_subdesc1')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaver_list2_sublist2')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaver_list2_subdesc2')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaver_list2_sublist3')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaver_list2_subdesc3')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaver_list2_sublist4')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaver_list2_subdesc4')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaver_list2_sublist5')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaver_list2_subdesc5')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaver_list2_sublist6')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaver_list2_subdesc6')}
                </div>
                <div className="text-primary-light-primary90 font-semdium italic">
                  {trans(locale, lang, 'lifesaver_list2_subtnc6')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaver_list2_sublist7')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaver_list2_subdesc7')}
                </div>
              </div>
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>{trans(locale, lang, 'lifesaver_list2_sublist8')}</div>
            <div className="text-primary-light-primary90 font-semibold">
              {trans(locale, lang, 'lifesaver_list2_subdesc8')}
            </div>
          </div>
        </CardPoint>
        <div className="mt-1 mb-2">
          {trans(locale, lang, 'lifesaver_subtitle')}
        </div>
        <CardPoint>
          <div>
            <div>
              {trans(locale, lang, 'lifesaver_list3')}{' '}
              <span className="text-white rounded-full px-2 bg-primary-light-primary90 h-max">
                Promo
              </span>
            </div>
            <div className="text-primary-light-primary90 font-semibold">
              {trans(locale, lang, 'lifesaver_desc3')}
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>
              {trans(locale, lang, 'lifesaver_list4')}{' '}
              <span className="text-white rounded-full px-2 bg-primary-light-primary90 h-max">
                Promo
              </span>
              <div className="text-primary-light-primary90 font-semibold">
                {trans(locale, lang, 'lifesaver_desc4')}
              </div>
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>
              {trans(locale, lang, 'lifesaver_list5')}{' '}
              <span className="text-white rounded-full px-2 bg-primary-light-primary90 h-max">
                Promo
              </span>
            </div>
          </div>
        </CardPoint>
        <div className="mt-12 italic">
          {specialRender({
            content: trans(locale, lang, 'lifesaver_tnc'),
            mapping: [
              [
                '*Inner limit',
                <span className="font-semibold text-primary-light-primary90">
                  *Inner limit
                </span>,
              ],
            ],
          })}
        </div>
      </div>
    );
  }

  function renderBenefitLifesaverPlus() {
    return (
      <div className="py-4 px-0 md:px-8 text-caption1 text-[#666B6F] text-medium">
        <CardPoint>
          <div>
            <div>{trans(locale, lang, 'lifesaverPlus_list1')}</div>
            <div className="text-primary-light-primary90 font-semibold">
              {specialRender({
                content: trans(locale, lang, 'lifesaverPlus_desc1'),
                mapping: [
                  [
                    '/kejadian',
                    <span className="text-[#666B6F] font-normal">
                      /kejadian
                    </span>,
                  ],
                ],
              })}
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>{trans(locale, lang, 'lifesaverPlus_list2')}</div>
            <div className="text-primary-light-primary90 font-semibold">
              {specialRender({
                content: trans(locale, lang, 'lifesaverPlus_desc2'),
                mapping: [
                  [
                    '/kejadian',
                    <span className="text-[#666B6F] font-normal">
                      /kejadian
                    </span>,
                  ],
                ],
              })}
            </div>
            <div className="pt-3">
              <div className="">
                {specialRender({
                  content: trans(locale, lang, 'lifesaverPlus_list2_subtitle'),
                  mapping: [
                    [
                      'inner limit*',
                      <span className="text-primary-light-primary90 font-semibold italic">
                        inner limit*
                      </span>,
                    ],
                  ],
                })}
              </div>
            </div>
            <div className="px-4 flex flex-col gap-2">
              <div>
                <div>{trans(locale, lang, 'lifesaverPlus_list2_sublist1')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPlus_list2_subdesc1')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPlus_list2_sublist2')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPlus_list2_subdesc2')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPlus_list2_sublist3')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPlus_list2_subdesc3')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPlus_list2_sublist4')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPlus_list2_subdesc4')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPlus_list2_sublist5')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPlus_list2_subdesc5')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPlus_list2_sublist6')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPlus_list2_subdesc6')}
                </div>
                <div className="text-primary-light-primary90 font-semdium italic">
                  {trans(locale, lang, 'lifesaverPlus_list2_subtnc6')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPlus_list2_sublist7')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPlus_list2_subdesc7')}
                </div>
              </div>
              <div>
                <div>{trans(locale, lang, 'lifesaverPlus_list2_sublist8')}</div>
                <div className="text-primary-light-primary90 font-semibold">
                  {trans(locale, lang, 'lifesaverPlus_list2_subdesc8')}
                </div>
              </div>
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>{trans(locale, lang, 'lifesaverPlus_list2_sublist9')}</div>
            <div className="text-primary-light-primary90 font-semibold">
              {trans(locale, lang, 'lifesaverPlus_list2_subdesc9')}
            </div>
          </div>
        </CardPoint>
        <div className="mt-1 mb-2">
          {trans(locale, lang, 'lifesaverPlus_subtitle')}
        </div>
        <CardPoint>
          <div>
            <div>
              {trans(locale, lang, 'lifesaverPlus_list3')}{' '}
              <span className="text-white rounded-full px-2 bg-primary-light-primary90 h-max">
                Promo
              </span>
            </div>
            <div className="text-primary-light-primary90 font-semibold">
              {trans(locale, lang, 'lifesaverPlus_desc3')}
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>
              {trans(locale, lang, 'lifesaverPlus_list4')}{' '}
              <span className="text-white rounded-full px-2 bg-primary-light-primary90 h-max">
                Promo
              </span>
              <div className="text-primary-light-primary90 font-semibold">
                {trans(locale, lang, 'lifesaverPlus_desc4')}
              </div>
            </div>
          </div>
        </CardPoint>
        <CardPoint>
          <div>
            <div>
              {trans(locale, lang, 'lifesaverPlus_list5')}{' '}
              <span className="text-white rounded-full px-2 bg-primary-light-primary90 h-max">
                Promo
              </span>
            </div>
          </div>
        </CardPoint>
        <div className="mt-12 italic">
          {specialRender({
            content: trans(locale, lang, 'lifesaverPlus_tnc'),
            mapping: [
              [
                '*Inner limit',
                <span className="font-semibold text-primary-light-primary90">
                  *Inner limit
                </span>,
              ],
            ],
          })}
        </div>
      </div>
    );
  }

  return (
    <Modal isOpen={showModalBenefit?.status} size="full">
      <Container noBackground fullScreen>
        {renderHeader()}
        <div className="w-full max-w-[960px] mx-auto px-4">
          {renderTabNavigation()}
          {activeTab === 0 && renderBenefitLifesaverPos()}
          {activeTab === 1 && renderBenefitLifesaver()}
          {activeTab === 2 && renderBenefitLifesaverPlus()}
        </div>
      </Container>
    </Modal>
  );
}
