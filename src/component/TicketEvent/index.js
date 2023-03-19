import { RedCalender, RedClock, GrayCalender, GrayClock } from '@cp-config/Svgs'
import { extrakDateEvent } from '@cp-util/func'
import PropTypes from 'prop-types' 
import clsx from 'classnames'
import locale from './locale'
import { trans } from '@cp-util/trans'

export default function TicketEvent ({
    name,
    city,
    thumb,
    startDate,
    endDate,
    lang,
    onDetailTiket,
    isClosed,
    toDetail,
    toTiket
}){

    const date = extrakDateEvent(startDate, endDate, lang)
    const printMonth = date.stDate.nameOfMonth.substr(0, 3)

    return(
        <div className='flex rounded-2xl shadow items-center overflow-hidden p-2'>
            <div style={{
                background: "black",
                height: "96px"
            }} className="flex items-center rounded-2xl overflow-hidden mr-2 w-1/4">
                <div>
                    <img src={thumb} style={{ width: "100%" }} />
                </div>
            </div>
            <div className='w-3/4'>
                <div className='mb-2'>
                    <h1 className={clsx('text-body2 font-bold truncate ...', { ['text-[#6B7580]'] : isClosed })}>{name}</h1>
                </div>
                <div className='flex justify-between items-center text-[9px] md:text-xs lg:text-[10px] text-[#6B7580]'>
                    <div className='flex'>
                        <div className='mr-1'>
                            <img src={isClosed ? GrayCalender : RedCalender} />
                        </div>
                        <p>{date.stDate.date} {printMonth} {date.stDate.year}</p>
                    </div>
                    <div className='flex justify-between'>
                        <ul className={clsx('list-disc')}>
                            <li>{city}</li>
                        </ul>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex'>
                        <div className='mr-1'>
                            <img src={isClosed ? GrayClock : RedClock} />
                        </div>
                        <p className={clsx('text-[9px] md:text-xs lg:text-[10px] text-[#6B7580]')}>{date.stDate.time} - {date.endDate.time}</p>
                    </div>
                    <button onClick={onDetailTiket}>
                        {
                            toTiket ? <a className='text-primary-dark-primary90 text-[9px] md:text-xs lg:text-[10px] underline'>{trans(locale, lang, 'lihatTiket')}</a>
                            : toDetail ? <a className='text-primary-dark-primary90 text-[9px] md:text-xs lg:text-[10px] underline'>{trans(locale, lang, 'lihatDetail')}</a> : null
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

const defaultProps = {
    name: "name",
    city: "city",
    thumb: "",
    startDate: "",
    endDate: "",
    lang: "id",
    onDetailTiket: () => {},
    isClosed: false,
    toDetail: false,
    toTiket: false
}

const propTypes =  {
    name: PropTypes.string,
    city: PropTypes.string,
    thumb: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    lang: PropTypes.oneOf(['id', 'en']),
    onDetailTiket: PropTypes.any,
    isClosed: PropTypes.bool,
    toDetail: PropTypes.bool,
    toTiket: PropTypes.bool
}

TicketEvent.defaultProps = defaultProps
TicketEvent.propTypes = propTypes