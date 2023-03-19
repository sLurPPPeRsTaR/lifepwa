import {
    Container,
    Button,
    // Accordion,
} from '@cp-component';
import {
    Draft,
    History,
    Resubmit,
} from '@cp-config/Svgs';
import locale from './locale'
import {
    trans,
} from '@cp-util/trans';
import {
    NAVIGATION,
} from '@cp-util/constant';
import {
    useRouter,
} from 'next/router';
import {
    useEffect,
} from 'react';
import {
    Faq,
    Header,
} from '@cp-module/claimpolis/components';
import {
    GET_FAQ_CLAIM_DETAIL_SUCCESS,
} from '@cp-module/claimpolis/claimpolisConstant';

export default function Page({
    lang,
    getFaqClaim,
    getFaqClaimResponse,
    getFaqClaimSuccess,
    userData,
    setLoading,
    getFaqClaimFetch,
}) {
    const router = useRouter()

    const menus = [
        {
            url: "",
            icon: Draft,
            title: trans(locale, lang, "menuDraft"),
        },
        {
            url: "",
            icon: Resubmit,
            title: trans(locale, lang, "menuResubmit"),
        },
        {
            url: "",
            icon: History,
            title: trans(locale, lang, "menuHistory"),
        },
    ]

    useEffect(() => {
        getFaqClaim({
            params: {
                pageSize: 9999,
                page: 1,
                sortField: "publishedAt",
                lang: lang,
                sortDirection: 'desc',
            }
        })
    }, [])

    useEffect(() => {
        setLoading(getFaqClaimFetch)
    }, [getFaqClaimFetch])

    const openPanel = (id, isHeadQuestion) => {
        const dataMap = getFaqClaimResponse?.map((item) => {
            if (item?.id === id) {
                return {
                    ...item,
                    attributes: {
                        ...item?.attributes,
                        active: item?.attributes?.active ? false : true,
                    }
                }
            } else {
                return {
                    ...item,
                    attributes: {
                        ...item?.attributes,
                        active: false,
                    }
                }
            }
        })

        getFaqClaimSuccess(dataMap)
    }

    const submitDigitalClaim = () => {
        if (userData?.userId === '') {
            router.push({
                query: {
                    isFromClaimPolis: true,
                },
                pathname: NAVIGATION.LOGIN.Login,
            });

            return;
        }

        if (
            !userData?.alreadyKYC &&
            !userData?.alreadySetPin
        ) {
            router.push(NAVIGATION.KYC.KycMain);

            return;
        }

        if (
            userData?.alreadyKYC &&
            !userData?.alreadySetPin
        ) {
            router.push(NAVIGATION.KYC.KycCreatePin);

            return;
        }

        router.push(NAVIGATION.CLAIMPOLIS.polis)
    }

    const Menu = () => {
        return (
            <div className='rounded-xl shadow-md bg-white py-3 flex justify-around'>
                {
                    menus.map(((item, index) => {
                        return (
                            <div key={index} className="text-center text-xs">
                                <img className='mx-auto' src={item?.icon} alt="ico" />
                                <p className='font-semibold'>{item?.title}</p>
                            </div>
                        )
                    }))
                }
            </div>
        )
    }

    return (
        <div>
            <Header />
            <Container className="relative rounded-2xl shadow-md bg-white" noBackground>
                <div className='px-[5%] mb-28'>
                    <div className='mt-4 mb-8'>
                        <Menu />
                    </div>
                    <div className='my-2 text-center'>
                        <h1 className='font-bold'>FAQ</h1>
                    </div>
                    <Faq data={getFaqClaimResponse} onClick={openPanel} />
                </div>
                <div className='absolute bottom-5 w-full px-[5%]'>
                    <Button full type="linear-gradient" children={trans(locale, lang, "btnTextAjukan")} onButtonClick={submitDigitalClaim} />
                </div>
            </Container>
        </div>
    )
}