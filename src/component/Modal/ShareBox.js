import { 
    Modal 
} from '@cp-component';
import {
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    EmailShareButton,
    EmailIcon
} from 'next-share';
import {
    useState,
} from 'react';
import propType from 'prop-types';
import {
    WhiteLink,
    RedCheck,
    Close,
} from '@cp-config/Svgs';

export default function Component({ active, onClose, title, urlToShare, titleWatoShare }) {
    const [checked, setCheked] = useState(false)

    const copy = (text) => {
        navigator.clipboard.writeText(text)
        setCheked(true)
        setTimeout(() => {
            setCheked(false)
        }, 1000)
    }

    const SalinLink = ({ text }) => {
        return (
            <button className='flex justify-center items-center' style={{ width: "32px", height: "32px", background: checked ? "white" : "rgba(237,28,36,1)", borderRadius: "50%", border: checked ? "1px solid rgba(237,28,36,1)" : "none" }}
                onClick={() => {
                    copy(text)
                }}
            >
                <img src={checked ? RedCheck : WhiteLink} />
            </button>
        )
    }
    return (
        <Modal isOpen={active}>
            <div className='relative'>
                <button className='absolute right-0 top-0' onClick={onClose}>
                    <img src={Close} />
                </button>
                <div>
                    <h1 className='font-bold text-md text-center mb-3'>{title}</h1>
                </div>
                <div className='flex overflow-auto'>
                    <div className='mr-2' style={{ width: "80px" }}>
                        <div className='flex flex-col items-center'>
                            <FacebookShareButton
                                url={urlToShare}
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <p className='text-center text-[10px] text-[#6B7580] mt-2'>Facebook</p>
                        </div>
                    </div>
                    <div className='mr-2' style={{ width: "80px" }}>
                        <div className='flex flex-col items-center'>
                            <WhatsappShareButton
                                url={urlToShare}
                                title={titleWatoShare}
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                            <p className='text-center text-[10px] text-[#6B7580] mt-2'>WhatsApp</p>
                        </div>
                    </div>
                    <div className='mr-2' style={{ width: "80px" }}>
                        <div className='flex flex-col items-center'>
                            <TelegramShareButton
                                url={urlToShare}
                            >
                                <TelegramIcon size={32} round />
                            </TelegramShareButton>
                            <p className='text-center text-[10px] text-[#6B7580] mt-2'>Telegram</p>
                        </div>
                    </div>
                    <div className='mr-2' style={{ width: "80px" }}>
                        <div className='flex flex-col items-center'>
                            <TwitterShareButton
                                url={urlToShare}
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <p className='text-center text-[10px] text-[#6B7580] mt-2'>Twitter</p>
                        </div>
                    </div>
                    <div className='mr-2' style={{ width: "80px" }}>
                        <div className='flex flex-col items-center'>
                            <EmailShareButton
                                url={urlToShare}
                            >
                                <EmailIcon size={32} round />
                            </EmailShareButton>
                            <p className='text-center text-[10px] text-[#6B7580] mt-2'>Email</p>
                        </div>
                    </div>
                    <div style={{ width: "80px" }}>
                        <div className='flex flex-col items-center'>
                            <SalinLink text={urlToShare}></SalinLink>
                            <p className='text-center text-[10px] text-[#6B7580] mt-2'>Salin Link</p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const defaultProps = {
    active: true, 
    onClose: () => {}, 
    title: "title", 
    urlToShare: "", 
    titleWatoShare: ""
}

const propTypes = {
    active: propType.bool,
    onClose: propType.func,
    title: propType.string,
    urlToShare: propType.string,
    titleWatoShare: propType.string,
}

Component.defaultProps = defaultProps
Component.propTypes = propTypes