import { useState } from 'react'
import { chevronDown, chevronUp } from 'react-icons-kit/ionicons';
import Icon from 'react-icons-kit';

export default function Component({ children, title, titleImage, openPanel }) {
    const [isPanelOpened, setPanelOpened] = useState(openPanel)

    const togglePanel = () => {
        if (isPanelOpened) {
            setPanelOpened(false)
        } else {
            setPanelOpened(true)
        }
    }
    return (
        <div className='rounded-2xl bg-white shadow overflow-hidden'>
            <div className='flex justify-between p-4' style={{
                background: "linear-gradient(169deg, rgba(251,176,76,1) 0%, rgba(237,28,36,1) 50%)"
            }}
            onClick={togglePanel}
            >
                {
                    titleImage ?
                        <div>
                            <img src={titleImage} />
                        </div>
                        :
                        <div>
                            <h1 className='text-md font-bold text-white'>{title}</h1>
                        </div>
                }
                <div>
                    <button onClick={togglePanel}>
                        <Icon
                            icon={isPanelOpened ? chevronUp : chevronDown}
                            className="text-white"
                        />
                    </button>
                </div>
            </div>
            <div style={{ height: isPanelOpened ? "auto" : "0px" }}>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

Component.defaultProps = {
    title: "title",
    openPanel: false,
    titleImage: null
}
