import {
    Header,
} from './components';
import {
    Container,
} from '@cp-component';
import parser from 'html-react-parser';
import {
    useRouter,
} from 'next/router';
import {
    useEffect,
} from 'react';
import {
    GET_ARTICLE_FAILED,
    GET_ARTICLE_SUCCESS,
} from '@cp-module/article/articleConstant';
import moment from 'moment';

export default function Page({
    lang,
    getArticle,
    getArticleResponse,
    // getArticlesResponse,
    // getArticles,
    articleAction,
    setLoading,
    userId,
}) {
    const router = useRouter()
    const {
        query: { prev },
      } = router;
    useEffect(() => {
        moment.locale(lang)
    }, [])

    useEffect(() => {
        if (router?.query?.slug?.[0]) {
            setLoading(true)
            getArticle({
                params: {
                    filterField: "[Slug]",
                    filterValue: router?.query?.slug?.[0]
                }
            })
        }
    }, [router])

    useEffect(() => {
        if (articleAction) {
            if (articleAction === GET_ARTICLE_FAILED) {
                setLoading(false)
                router.back()
            }

            if(articleAction === GET_ARTICLE_SUCCESS){
                setLoading(false)
            }
        }
    }, [articleAction])

    return (
        <Container>
            <Header data={getArticleResponse?.data} lang={lang} userId={userId} prev={prev} />
            <div className='flex justify-between px-[5%]'>
                {
                getArticleResponse?.data?.attributes?.authorImage && getArticleResponse?.data?.attributes?.author ? 
                <div className='flex'>
                    <div className='flex items-center justify-center bg-black w-12 h-12 rounded-full overflow-hidden mr-2'>
                        <img className='w-full' src={getArticleResponse?.data?.attributes?.authorImage} alt="thumb" />
                    </div>
                    <div className='my-auto'>
                        <p className='font-bold text-sm'>{getArticleResponse?.data?.attributes?.author}</p>
                    </div>
                </div> : <div></div>
                }
                <div className='my-auto'>
                    {getArticleResponse?.data?.attributes?.publishedAt && (
                        <p className='text-sm'>{moment(getArticleResponse?.data?.attributes?.publishedAt).format('DD MMMM YYYY') || ''}</p>
                    )}
                </div>
            </div>
            <div className='px-[5%] my-4 default_content'>
                {
                    parser(getArticleResponse?.data?.attributes?.Content || '<p></p>')
                }
            </div>
        </Container>
    )
}