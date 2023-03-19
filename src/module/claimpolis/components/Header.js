import { androidArrowBack } from 'react-icons-kit/ionicons/androidArrowBack';
import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';

export default function Component(){
    const router = useRouter()

    return(
        <div className="bg-white w-full py-10 px-[5%] shadow" style={{ zIndex: 99999 }}>
            <div className='flex justify-between'>
                <button onClick={() => router.back()}>
                    <Icon icon={androidArrowBack} size={20} />
                </button>
                <h1 className='font-semibold'>Klaim</h1>
                <div></div>
            </div>
        </div>
    )
}