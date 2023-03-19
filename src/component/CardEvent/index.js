import { WhiteLove, User24, RedPointer, RedLove, GrayPointer } from '@cp-config/Svgs'
import { formatRibuan, extrakDateEvent } from '@cp-util/func'
import { Button } from '@cp-component'
import PropTypes from 'prop-types'
import clsx from 'classnames'
import { trans } from '@cp-util/trans';
import locale from './locale'

export default function CardEvent({
    name,
    quotaEvent,
    userRegistered,
    type,
    city,
    thumb,
    price,
    startDate,
    endDate,
    onButtonClick,
    lang,
    onClickFavourite,
    watchlist,
    isClosedRegister,
    alreadyBought,
    isClosed
}) {

    const tiketState = ['PRIVATE', 'SEMIPVT'].includes(type) ? 'Limited Event' : 'Public Event'
    const date = extrakDateEvent(startDate, endDate, lang)
    const printD = date.isDiffD ? `${date.stDate.date} - ${date.endDate.date}` : date.stDate.date
    const printMonth = date.stDate.nameOfMonth.substr(0, 3)
    // const disabled = isClosedRegister || alreadyBought

    const parsingTextSisaTiket = () => {
        let result = ""
        switch (lang) {
            case "id": result = trans(locale, lang, "sisaTiket").replace("3%C", quotaEvent)
            case "en": result = `${quotaEvent} ${trans(locale, lang, "sisaTiket")}`
            default: result = trans(locale, lang, "sisaTiket").replace("3%C", quotaEvent)
        }

        return result
    }

    const BannerJumlahTiket = ({ children }) => {
        return (
            <button className='bg-[#FDE4C4] px-2.5 rounded-lg mb-3 text-[#F99D27]'>
                <p className='font-bold text-[9px] py-1 text-center'>
                    {children}
                </p>
            </button>
        )
    }

    const Poeples = () => {
        return (
            <div className='px-3'>
                <div className='relative flex mr-3 mb-1'>
                    <div>
                        <img src={User24} />
                    </div>
                    <div>
                        <img src={User24} />
                    </div>
                    <div>
                        <img src={User24} />
                    </div>
                    <div>
                        <img src={User24} />
                    </div>
                </div>
                <div>
                    <p className='text-[10px] md:text-xs text-[#6B7580]'>{userRegistered} {trans(locale, lang, 'jumlahOrangTerdaftar')}</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div
                style={{
                    // width: "295px",
                    borderRadius: "30px",
                }}
                className="p-3 shadow-lg cursor-pointer"
                onClick={onButtonClick}
            >
                <div
                    className='rounded-2xl overflow-hidden relative'
                    style={{ height: "150px", }}
                >
                    <div style={{
                        position: "absolute",
                        left: "0",
                        top: "0",
                        zIndex: "-1",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#080808"
                    }}>
                        <div>
                            <img src={thumb} width="100%" className={clsx({ ['disable-img']: isClosed })} />
                        </div>
                    </div>
                    <div className='absolute top-0 left-0 w-full p-2'>
                        <div className='flex justify-between mb-5'>
                            <div className='bg-white border rounded-xl text-xs p-2.5 text-center text-neutral-dark-neutral140 self-start' style={
                                {
                                    minWidth: "42px",
                                    height: "56px"
                                }
                            }>
                                <div className={clsx({ ['text-[#6B7580]']: isClosed })}>
                                    <span className='font-bold'>{printD}</span>
                                    <p className='font-bold'>{printMonth}</p>
                                </div>
                            </div>
                            {
                                isClosed ? null :
                                    <button className='mb-auto z-50' onClick={(e) => {
                                        e.stopPropagation();
                                        onClickFavourite()
                                    }}>
                                        <div className='bg-[#C3C5CC] p-1 rounded-full'>
                                            <div><img src={watchlist ? RedLove : WhiteLove} /></div>
                                        </div>
                                    </button>
                            }
                        </div>
                    </div>
                    {
                        type === 'EXTERNAL' || isClosed ? null : <div className='absolute bottom-0 w-full px-2'><BannerJumlahTiket> {parsingTextSisaTiket()}</BannerJumlahTiket></div>
                    }
                </div>
                <div className='bg-white rounded-[20px] pt-3'>
                    <div className='px-3'>
                        <h1 className={clsx('text-body2 font-bold truncate ...', { ['text-[#6B7580]']: isClosed })}>{name}</h1>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='p-3'>
                            <div className='flex items-center'>
                                <div className='mr-1'>
                                    <img src={isClosed ? GrayPointer : RedPointer} />
                                </div>
                                <p className={clsx('text-[10px] md:text-xs text-[#6B7580]', { ['text-[#C33025]']: isClosed })}>{city}</p>
                            </div>
                            <p className={clsx('font-bold text-[10px] md:text-xs', {
                                ['text-[#FAAF4C]']: ['PRIVATE', 'SEMIPVT'].includes(type),
                                ['text-success-light-success60']: ['PUBLIC', 'EXTPUBLIC'].includes(type),
                                ['text-[#6B7580]']: isClosed
                            })}>{tiketState}</p>
                        </div>
                        {
                            isClosed ? null :
                                <div>
                                    <div className='px-3 py-1'>
                                        <span className='text-success-light-success60 font-bold text-[10px] md:text-xs'>{formatRibuan(price, 'Rp. ', '.-') === 'Rp. 0.-' ? 'Free' : formatRibuan(price, 'Rp. ', '.-')}</span>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                {/* <div className='flex justify-between items-center'>
                    {
                        isClosed ? <p className='text-[#C33025] text-[10px] md:text-xs font-bold px-3'>{trans(locale, lang, 'pesanStatusEvent')}</p> : <Poeples />

                    }
                    <div>
                        <Button disabled={isClosed} type="linear-gradient" className="text-xs md:text-sm px-7" onButtonClick={onButtonClick}>{trans(locale, lang, 'textButton')}</Button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

const defaultProps = {
    name: "name",
    quotaEvent: 0,
    userRegistered: 0,
    type: "",
    city: "city",
    thumb: "",
    price: 0,
    startDate: "",
    endDate: "",
    lang: "id",
    onClickFavourite: () => { },
    onButtonClick: () => { },
    watchlist: false,
    isClosedRegister: false,
    alreadyBought: false,
    isClosed: false
}

const propTypes = {
    name: PropTypes.string,
    quotaEvent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    userRegistered: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    type: PropTypes.oneOf(['PRIVATE', 'SEMIPVT', 'PUBLIC', 'EXTERNAL', 'EXTPUBLIC']),
    city: PropTypes.string,
    thumb: PropTypes.string,
    price: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    lang: PropTypes.oneOf(['id', 'en']),
    onClickFavourite: PropTypes.any,
    onButtonClick: PropTypes.any,
    watchlist: PropTypes.bool,
    isClosedRegister: PropTypes.bool,
    alreadyBought: PropTypes.bool,
    isClosed: PropTypes.bool
}

CardEvent.defaultProps = defaultProps
CardEvent.propTypes = propTypes

