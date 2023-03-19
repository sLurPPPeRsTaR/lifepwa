import { chevronUp } from 'react-icons-kit/ionicons';
import Icon from 'react-icons-kit';
import classNames from 'classnames';
import parse from 'html-react-parser';
import propTypes from 'prop-types'

export default function Component({ data, onClick }) {

    return (
        <div className=''>
            {data?.map((item1, index1) => (
                <div key={index1}>
                    <div
                        role="button"
                        className={`cursor-pointer border-b-2 w-full p-3 flex flex-row justify-between items-center mt-4 duration-500`}
                        onClick={() => {
                            onClick(item1.id, true)
                        }}
                    >
                        <span
                            className={`font-black text-xs mr-2 hover:text-red-300 xm:text-base md:text-base`}>
                            {item1?.attributes?.name}
                        </span>
                        <Icon
                            icon={chevronUp}
                            size={20}
                            className={classNames(`duration-500 group-hover:text-red-300 origin-center`, { 'rotate-180 ': !item1?.attributes?.active })}
                        />
                    </div>
                    {/* <div className={classNames('pl-4 divide-y overflow-hidden', { "h-auto": item1?.attributes?.active, "h-0": !item1?.attributes?.active })}>
                        {
                            item1?.attributes?.subQuestion?.data?.map((item2, index2) => {
                                return (
                                    <div key={index2}>
                                        <div
                                            role="button"
                                            className={classNames(`cursor-pointer w-full p-3 flex flex-row justify-between items-center mt-4 duration-500`, { "bg-red-500 text-white rounded-t-3xl": item2.attributes?.active })}
                                            onClick={(e) => {
                                                onClick(item2.id, false)
                                            }}
                                        >
                                            <span
                                                className={`font-black text-xs mr-2 hover:text-red-300 xm:text-base md:text-base`}>
                                                {item2?.attributes?.question}
                                            </span>
                                            <Icon
                                                icon={chevronUp}
                                                size={20}
                                                className={classNames(`duration-500 group-hover:text-red-300 origin-center`, { 'rotate-180': !item2?.attributes?.active })}
                                            />
                                        </div>
                                        <div
                                            className={classNames('w-full pt-4 px-2 h-0 !leading-6 duration-500 text-xs xm:text-sm xm:px-4', { "h-auto pb-5 mb-5 border rounded-b-3xl": item2?.attributes?.active, "overflow-hidden": !item2?.attributes?.active })}
                                        >
                                            {parse(item2?.attributes?.answer || '')}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div> */}
                    <div className={classNames('overflow-hidden', { "h-auto": item1?.attributes?.active, "h-0": !item1?.attributes?.active })}>
                        {
                            item1?.attributes?.subQuestion?.data?.map((item2, index2) => {
                                return (
                                    <div key={index2}>
                                        <div
                                            className={classNames(`cursor-pointer w-full p-3 flex flex-row justify-between items-center mt-4 duration-500`)}
                                        >
                                            <span
                                                className={`font-black text-xs mr-2 sm:text-sm text-[#6B7580]`}>
                                                {item2?.attributes?.question}
                                            </span>
                                        </div>
                                        <div className='flex'>
                                            {
                                                item2?.attributes?.image?.data ?
                                                <div className='my-auto'>
                                                    <img src={item2?.attributes?.image?.data[0]?.attributes?.formats?.small?.url || ''} />
                                                </div> : null
                                            }
                                            <div
                                                className={classNames('w-full px-2 !leading-6 duration-500 text-xs sm:text-sm xm:px-4 my-auto')}
                                            >
                                                {parse(item2?.attributes?.answer || '')}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

Component.defaultProps = {
    data: [],
    onClick: () => {},
}

Component.propTypes = {
    data: propTypes.array,
    onClick: propTypes.func,
}