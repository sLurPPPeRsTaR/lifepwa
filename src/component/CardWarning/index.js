import React from 'react'
import { WarningIcon } from '@cp-config/Images'

export default function CardWarning({ desc }) {
    return (
        <div className='rounded-2xl bg-main-light-yellow p-4 md:w-1/2 mb-5 flex'>
            <img src={WarningIcon} style={{ height: 20, width: 20 }} className='mr-2' />
            <p className='text-caption1 text-mediumGray-light-mediumGray font-medium'>{desc}</p>
        </div>
    )
}
