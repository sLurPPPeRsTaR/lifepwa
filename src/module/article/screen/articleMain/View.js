import {
    ArrowBackBlack,
} from '@cp-config/Svgs';
import {
    ArticleCarousel,
} from '@cp-module/article/components';
import {
    Container,
} from '@cp-component';
import {
    useEffect,
    useState,
    useMemo,
} from 'react';
import {
    useRouter,
} from 'next/router';
import {
    GET_ARTICLE_CATEGORIES_SUCCESS,
    GET_ARTICLES_SUCCESS,
} from '@cp-module/article/articleConstant';
import moment from 'moment';
import { NAVIGATION } from '@cp-util/constant';
import InfiniteScroll from 'react-infinite-scroll-component';
// import {
//     ButtonCategories,
// } from '@cp-module/home/screen/HomeLifeArticel/components';
import {
    ButtonCategories,
} from './components'
import { trans } from '@cp-util/trans';
import locale from './locale';
import { eventAppsflyer } from '@cp-util/func';

export default function Page({
    lang,
    getArticleCategories,
    getArticles,
    getArticlesCategoriesResponse,
    getArticlesResponse,
    articleAction,
    getArticlesFetch,
    getCategoriesFetch,
    setLoading,
    userId,
}) {
    const [renderButtons, setRenderButton] = useState([])
    const [renderTopArticles, setRenderTopArticles] = useState([])
    const [renderArticles, setRenderArticles] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [currentCategory, setCurrentCategory] = useState({
        id: 999,
        name: "Semua",
        slug: "Semua",
        created_at: "",
        updated_at: "",
        published_at: "",
        isActive: true,
    })
    const [isDiffCategory, setIsDiffCategory] = useState(true)
    const [getArticleParams, setGetArticleParams] = useState({
        page: 1,
        pageSize: 10,
        sortField: "publishedAt",
        sortDirection: "desc",
    })

    const router = useRouter()
    moment.locale(lang)

    useEffect(() => {
        setLoading(true)
        getArticles({ params: getArticleParams })

        getArticleCategories({
            params: {
                sortField: "publishedAt",
                sortDirection: "desc",
                pageSize: 9999,
            }
        })
    }, [])

    useEffect(() => {
        if (articleAction) {
            if (articleAction === GET_ARTICLE_CATEGORIES_SUCCESS) {
                setRenderButton([
                    {
                        id: 999,
                        name: "Semua",
                        slug: "Semua",
                        created_at: "",
                        updated_at: "",
                        published_at: "",
                        isActive: true,
                    },
                    ...getArticlesCategoriesResponse?.data,
                ])
            }

            if (articleAction === GET_ARTICLES_SUCCESS) {
                let topArticles = []
                let articles = []
                if (getArticlesResponse?.data?.length > 6 && isDiffCategory) {
                    topArticles = getArticlesResponse?.data?.filter((item, index) => index < 5)
                    articles = getArticlesResponse?.data?.filter((item, index) => index > 4)
                } else {
                    articles = getArticlesResponse?.data
                }

                if (isDiffCategory) {
                    setRenderArticles(articles)
                    setRenderTopArticles(topArticles)
                    setIsDiffCategory(false)
                } else {
                    setRenderArticles([...renderArticles, ...articles])
                }

                // stop pagination condition
                if (getArticlesResponse?.meta?.pagination?.pageCount === getArticlesResponse?.meta?.pagination?.page || getArticlesResponse?.meta?.pagination?.pageCount < getArticlesResponse?.meta?.pagination?.page) {
                    setHasMore(false)
                } else {
                    setHasMore(true)
                    setGetArticleParams({
                        ...getArticleParams,
                        page: getArticleParams?.page + 1
                    })
                }
            }

            if(getArticlesFetch && getCategoriesFetch){
                setLoading(false)
            }
        }
    }, [articleAction])

    const fetchData = () => {
        getArticles({ params: getArticleParams })
    }

    const handleClickCategory = useMemo(() => {
        return (item) => {
            if (currentCategory?.id === item.id) return

            const updateRenderButton = renderButtons?.map((data) => {
                if (item.id === data.id) {
                    return {
                        ...data,
                        isActive: true,
                    }
                } else {
                    return {
                        ...data,
                        isActive: false,
                    }
                }
            })

            eventAppsflyer({
                eventName: 'af_article_filter_category',
                payload: { 
                  af_user_id: userId,
                  af_channel: "website",
                  af_category_name: item.name,
                  af_current_page: 1,
                },
            });

            setRenderButton(updateRenderButton)
            setIsDiffCategory(true)
            setCurrentCategory(item)
            let params = {}

            if (item?.id === 999) {
                params = {
                    page: 1,
                    pageSize: 10,
                    sortField: "publishedAt",
                }

                setGetArticleParams(params)
            } else {
                params = {
                    page: 1,
                    pageSize: 10,
                    filterField: "[category][name]",
                    filterValue: item?.name,
                }

                setGetArticleParams(params)
            }

            getArticles({ params: params })
        }
    })

    const Header = () => {
        return (
            <div className='px-[5%]'>
                <div className='flex justify-between items-center my-7'>
                    <button onClick={() => {
                        router.back()
                    }}>
                        <img src={ArrowBackBlack} alt="ico" />
                    </button>
                    <h1 className='font-bold'>{trans(locale, lang, 'titleSession')}</h1>
                    <div></div>
                </div>
            </div>
        )
    }

    const CardArticle = ({ data }) => {
        const { attributes } = data

        return (
            <button className="px-[5%] py-3 bg-white hover:bg-slate-100 w-full" onClick={() => {
                eventAppsflyer({
                    eventName: 'af_article_detail',
                    payload: { 
                      af_user_id: userId,
                      af_channel: "website",
                      af_category_name: attributes?.category?.data?.attributes?.name,
                      af_article_title: attributes.Title,
                      af_article_section: 'List All Article',
                      af_current_page: 1,
                    },
                });
                router.push({
                    pathname: `${NAVIGATION.ARTICLE.ArticleDetail}/${attributes?.Slug}`,
                    query: {
                        prev: 'articleMain',
                      }
                })
            }}>
                <div className='flex w-full'>
                    <div className='relative pr-3 w-4/6'>
                        <div className="text-left">
                            <h1 className="font-bold text-[10px] md:text-sm multiline-ellipsis mb-2">{attributes.Title}</h1>
                            <p className="text-[9px] sm:text-xs mb-4 md:text-xs multiline-ellipsis">{attributes.ShortArticle}</p>
                            <div className='absolute bottom-0 left-0'>
                                <p className="text-[8px] sm:text-xs mb-1">{moment(attributes?.publishedAt).format('YYYY, DD MMMM')}</p>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-md overflow-hidden h-24 sm:h-28 md:h-32 bg-black w-2/6'>
                        <div className='w-full h-5/6' style={{ backgroundImage: `url(${attributes?.ImageSmall})`, backgroundSize: "cover" }}>
                        </div>
                        <div className='w-full h-1/6'>
                            <div className='bg-[#FDE8EB] text-[#FF8694] h-full text-[9px] sm:text-xs flex items-center justify-center'>
                                <p>{attributes?.category?.data?.attributes?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        )
    }

    const RenderLoading = () => {
        return (
            <div className='my-5'>
                <svg className="animate-spin h-7 w-7 rounded-full border-t-2 border-r-2 border-[#ED1C24] mx-auto" viewBox="0 0 24 24">
                </svg>
            </div>
        )
    }

    return (
        <Container>
            <Header />
            <div className='px-[5%]'>
                <ButtonCategories data={renderButtons} onClick={handleClickCategory} />
                <ArticleCarousel data={renderTopArticles} onClick={(item) => {
                    eventAppsflyer({
                        eventName: 'af_article_detail',
                        payload: { 
                          af_user_id: userId,
                          af_channel: "website",
                          af_category_name: item?.attributes?.category?.data?.attributes?.name,
                          af_article_title: item?.attributes?.Title,
                          af_article_section: 'Highlight',
                          af_current_page: 1,
                        },
                    });
                    router.push({ 
                        pathname: `${NAVIGATION.ARTICLE.ArticleDetail}/${item?.attributes?.Slug}`,
                        query: {
                            prev: 'articleMain',
                          }
                    })
                }} />
                <InfiniteScroll
                    dataLength={renderArticles.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<RenderLoading />}
                >
                    {
                        renderArticles?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <CardArticle data={item} />
                                </div>
                            )
                        })
                    }
                </InfiniteScroll>
            </div>
        </Container>
    )
}