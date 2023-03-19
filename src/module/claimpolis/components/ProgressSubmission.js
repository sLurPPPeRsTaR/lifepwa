import propTypes from 'prop-types'
import {
    PapanKertas,
    Dokumen,
    Folder,
} from '@cp-config/Images';
import classNames from 'classnames';

export default function Component({
    endPoints,
}) {
    let dataMap = []

    for (let i = 0; i < endPoints.length; i++) {
        if (i !== 0) {
            let data = [
                {
                    type: "line",
                    isActive: endPoints[i]?.isActive,
                },
                endPoints[i]
            ]

            dataMap = [...dataMap, ...data]

        } else {
            dataMap.push(endPoints[i])
        }
    }

    return (
        <div className='rounded-2xl border shadow-md py-5 px-3 flex justify-around'>
            {
                dataMap?.map((item, index) => {
                    if (item?.type === 'point') {
                        return (
                            <div className={classNames("", { "grayscale": !item?.isActive })} key={index}>
                                <img className='mx-auto mb-2' src={item?.src} alt="icon" />
                                <p className={classNames("text-xs", { "text-[#6F7A7B]": !item?.isActive, "text-[#ED1C24] font-bold": item?.isActive })}>{item?.title}</p>
                            </div>
                        )
                    } else if (item?.type === 'line') {
                        return (
                            <div className={classNames("h-0.5 w-16 my-auto", { "bg-[#ED1C24]": item?.isActive, "bg-[#D9D9D9]": !item?.isActive })} key={index}>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

Component.defaultProps = {
    endPoints: [
        {
            type: "point",
            src: PapanKertas,
            title: "Pilih Polis",
            isActive: true,
        },
        {
            type: "point",
            src: Dokumen,
            title: "Data Klaim",
            isActive: false,
        },
        {
            type: "point",
            src: Folder,
            title: "Upload Dokumen",
            isActive: false,
        },
    ]
}

Component.propTypes = {
    endPoints: propTypes.array,
}