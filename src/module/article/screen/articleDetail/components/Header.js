import {
    useRouter,
} from 'next/router';
import { Icon } from 'react-icons-kit';
import {
    ic_share,
} from 'react-icons-kit/md/ic_share';
import {
    ic_close,
} from 'react-icons-kit/md/ic_close';
import {
    ShareBox,
} from '@cp-component';
import {
    useState,
} from 'react';
import {
    trans,
} from '@cp-util/trans';
import locale from '../locale';
import axios from 'axios'
import { eventAppsflyer } from '@cp-util/func';
import { NAVIGATION } from '@cp-util/constant';

export default function Component({ data, lang, userId, prev }) {
    const [openShare, setOpenShare] = useState(false)
    const [urlToShare, setUrlToShare] = useState()
    const { attributes } = data
    const router = useRouter()
    const API_FIREBASE = 'AIza\\SyBuo0PQKVjM740b\\HQhg0XrUlmhep1E\\alJM';

    const getShortLink = async () => {
        const TYPE = process.env.BASE_URL === 'https://uat.life.id/api' ? '-uat' : '-prod'
        const afl = {
            '': `https://life.id${NAVIGATION.ARTICLE.ArticleDetail}/${attributes?.Slug}/`,
            '-uat': `https://uat.life.id${NAVIGATION.ARTICLE.ArticleDetail}/${attributes?.Slug}/`,
        };
        const bannerUrl = attributes?.ImageThumb;
        const deepLink = {
            '': `&apn=id.lifecustomer&isi=1627986095&ibi=id.life.customer&isi=1627986095&afl=${afl[TYPE]}&ifl=${afl[TYPE]}`,
            '-uat': `&apn=id.lifecustomer.uat&isi=1627986095&ibi=id.life.customer.uat&isi=1627986095&afl=${afl[TYPE]}&ifl=${afl[TYPE]}`,
        };
        const content = `&st=${attributes?.Title}&sd=${attributes?.ShortArticle}&si=${bannerUrl}`;
        const linkPrefix = {
            '': `https://life.id${NAVIGATION.ARTICLE.ArticleDetail}/${attributes?.Slug}/${deepLink[TYPE]}${content}`,
            '-uat': `https://uat.life.id${NAVIGATION.ARTICLE.ArticleDetail}/${attributes?.Slug}/${deepLink[TYPE]}${content}`,
        };
        try {
            const bodyReq = {
                longDynamicLink: `https://lifecustomer.page.link/?link=${linkPrefix[TYPE]}`,
                suffix: {
                    option: 'SHORT',
                },
            };
            const url =  `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${API_FIREBASE.replace(/\\/g, '')}`;
            return await axios
                .post(url, bodyReq)
                .then((res) => {
                    setUrlToShare(attributes?.Title + '\n'+ res?.data?.shortLink)
                })
                .catch((err) => console.log('error', err));
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div>
            <div className='relative w-full h-80 overflow-hidden' style={{ backgroundImage: `url(${attributes?.ImageLarge})`, backgroundSize: "cover" }}>
                <button className='absolute top-4 left-4 z-10 p-2 rounded-full flex items-center justify-center bg-[#F9F9F9]' onClick={() => {
                    prev === 'articleMain' ? 
                    router.back() :
                    router.push(NAVIGATION.HOME.Home)
                }}>
                    <div style={{ width: "28px", height: "28px", color: "#8E8E93" }}>
                        <Icon size={"100%"} icon={ic_close} />
                    </div>
                </button>
                <div className='absolute bottom-4 left-4 z-10'>
                    <div className='rounded-lg bg-[#FDE8EB] text-[#FF8694] p-2 text-[9px] sm:text-xs'>
                        <p>{attributes?.category?.data?.attributes?.name}</p>
                    </div>
                </div>
                <button className='absolute top-4 right-4 rounded-full bg-[#F9F9F9] p-2' onClick={() => {
                    eventAppsflyer({
                        eventName: 'af_article_share',
                        payload: { 
                          af_user_id: userId,
                          af_channel: "website",
                          af_category_name: attributes?.category?.data?.attributes?.name,
                          af_article_title : attributes?.Title,
                          af_prev_page: '',
                          af_current_page : '',
                          af_current_page: 1,
                        },
                    });
                    setOpenShare(true)
                    getShortLink()
                }}>
                    <div style={{ width: "28px", height: "28px", color: "#8E8E93" }}>
                        <Icon size={"100%"} icon={ic_share} />
                    </div>
                </button>
            </div>
            <div className='p-4'>
                <h1 className='font-bold text-lg'>{attributes?.Title}</h1>
            </div>
            <ShareBox
                active={openShare}
                onClose={() => setOpenShare(false)}
                title={trans(locale, lang, 'titleShare')}
                urlToShare={urlToShare}
            // titleWatoShare={titleWatoShare}
            />
        </div>
    )
}