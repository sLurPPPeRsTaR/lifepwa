import classnames from 'classnames'
export default function Component({ data, onClick }) {
    return (
        <div className='overflow-auto'>
            <div className='my-3 flex overflow-auto'>
                {
                    data?.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className={classnames("text-[9px] text-xs px-3 py-1 sm:text-xs rounded-2xl border border-[#F9B4B6] text-[#FF8694] bg-white mr-2 mb-2", { "bg-[#FDE8EB] text-white border-[#FDE8EB]": item.isActive })}
                                onClick={() => {
                                    onClick(item)
                                }}>
                                {item.name}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

const defaultProps = {
    data: [],
    onClick: () => {}
}

Component.defaultProps = defaultProps
