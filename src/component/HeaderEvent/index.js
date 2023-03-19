import {
    ArrowBackWhite,
    HeartWhite,
    CalenderWhite,
    WhiteShare,
} from '@cp-config/Svgs'
import { NAVIGATION } from '@cp-util/constant'
import { useRouter } from 'next/router'
import propTypes from 'prop-types'
import { ShareBox } from '@cp-component'
import { useState } from 'react'
import locale from './locale'
import { trans } from '@cp-util/trans'
import { useSelector } from 'react-redux'
import { eventAppsflyer } from '@cp-util/func'

export default function Component({
    title,
    children,
    activeRightMenu,
    customStyle,
    customClassName,
    pathname,
    activeShareFitur,
    urlToShare,
    getShortLink,
    lang,
    titleWatoShare,
    onClickRouter,
}) {

    const router = useRouter()
    const [openShare, setOpenShare] = useState(false)
    const bg = {
        background: "linear-gradient(169deg, rgba(251,176,76,1) 0%, rgba(237,28,36,1) 50%)"
    }

    const userId = useSelector(state => state.auth.userData.userId)

    return (
        <div style={{ ...bg, ...customStyle }} className={`px-[5%] py-3 ${customClassName}`}>
            <div className="flex justify-between items-center relative" style={{ height: "86px" }}>
                <button onClick={(e) => {
                    if (pathname == '') {
                        router.back()
                    } else {
                        router.push(pathname)
                    }
                }}>
                    <img src={ArrowBackWhite} />
                </button>
                <div>
                    <h3 className='font-bold text-white'>{title}</h3>
                </div>
                {/* right menu here */}
                {activeRightMenu ?
                    <div className='flex'>
                        <button className='pr-3' onClick={() => {
                            if (userId === '') {
                                router.push(NAVIGATION.LOGIN.Login)
                            } else {
                                router.push(NAVIGATION.EVENT.EventFavorite)
                            }
                        }}>
                            <img src={HeartWhite} />
                        </button>
                        <button onClick={() => {
                            if (userId === '') {
                                router.push(NAVIGATION.LOGIN.Login)
                            } else {
                                router.push(NAVIGATION.EVENT.EventHistory)
                            }
                        }}>
                            <img src={CalenderWhite} />
                        </button>
                    </div>
                    : null}
                {/* ----------------- */}
                {/* active share fitur */}
                {activeShareFitur ?
                    <div className='flex'>
                        <button onClick={() => {
                            getShortLink()
                            setOpenShare(true)
                            eventAppsflyer({
                                eventName: 'af_event_tile',
                                payload: { 
                                  af_user_id: userId,
                                  af_channel: "website" 
                                },
                            });
                        }}>
                            <img src={WhiteShare} />
                        </button>
                    </div> : null
                }
                {/* this div code to keep flex structure */}
                {!activeRightMenu && !activeShareFitur ? <div></div> : null}
                {/* ----------------- */}
            </div>
            <div>
                {children}
            </div>
            <ShareBox 
                active={openShare} 
                onClose={() => setOpenShare(false)} 
                title={trans(locale, lang, 'titleModalShare')} 
                urlToShare={urlToShare} 
                titleWatoShare={titleWatoShare}
            />
        </div>
    )
}

Component.propTypes = {
    title: propTypes.string,
    children: propTypes.node,
    activeRightMenu: propTypes.bool,
    pathname: propTypes.string,
    customStyle: propTypes.object,
    customClassName: propTypes.string,
    activeShareFitur: propTypes.bool,
    urlToShare: propTypes.string,
    lang: propTypes.oneOf(['id', 'en']),
}

Component.defaultProps = {
    title: "Title",
    children: null,
    activeRightMenu: false,
    pathname: '',
    customStyle: {},
    customClassName: '',
    activeShareFitur: false,
    urlToShare: 'https://www.life.id',
    lang: 'id',
}
