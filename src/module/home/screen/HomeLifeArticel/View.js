import { trans } from '@cp-util/trans';
import locale from './locale';
import {
    BottomArticle,
    ButtonCategories,
} from './components';
import {
    useEffect,
    useState,
} from 'react';
import {
    useRouter,
} from 'next/router';
import {
    NAVIGATION,
} from '@cp-util/constant';
import {
    // GET_ARTICLES_SUCCESS,
    GET_ARTICLE_CATEGORIES_SUCCESS,
} from '@cp-module/article/articleConstant';
import { eventAppsflyer } from '@cp-util/func';

export default function Page({
    lang,
    // setInternalServerError,
    getArticles,
    getArticleCategories,
    getArticlesCategoriesResponse,
    getArticlesResponse,
    articleAction,
    getArticlesClear,
    userId,
}) {
    const [renderButtons, setRenderButton] = useState([])
    const [currentCategory, setCurentCategory] = useState({
        id: 999,
        name: "Semua",
        slug: "Semua",
        created_at: "",
        updated_at: "",
        published_at: "",
        isActive: true,
    })

    useEffect(() => {
        getArticles({
            params: {
                page: 1,
                pageSize: 5,
            }
        })

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
        }
    }, [getArticleCategories, getArticlesResponse, articleAction])

    const router = useRouter()

    // Components
    const TitleSesion = () => {
        return (
            <div className='flex justify-between items-center'>
                <h1 className="font-bold text-xs xm:text-sm md:text-body1">
                    {trans(locale, lang, 'titleSession')}
                </h1>
                <p className='text-[#ED1C24] text-[9px] md:text-sm underline cursor-pointer'
                    onClick={() => {
                        getArticlesClear()
                        eventAppsflyer({
                            eventName: 'af_article_show_all',
                            payload: { 
                              af_user_id: userId,
                              af_channel: "website" 
                            },
                        });
                        router.push(NAVIGATION.ARTICLE.ArticleMain)
                    }}>{trans(locale, lang, 'toEventListText')}</p>
            </div>
        )
    }

    if(getArticlesResponse?.data?.length > 0){
        return (
            <div className='max-w-6xl mx-auto pt-4 mt-3 mb-5 lg:pt-5 lg:mb-7'>
                <TitleSesion />
                <ButtonCategories data={renderButtons} onClick={(item) => {
                    if(item.id === currentCategory.id) return

                    const updateRenderButton = renderButtons?.map((data) => {
                        if(item.id === data.id){
                            return {
                                ...data,
                                isActive: true,
                            }
                        }else{
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
                    
                    setCurentCategory(item)
                    setRenderButton(updateRenderButton)

    
                    if(item.id === 999){
                        getArticles({
                            params: {
                                page: 1,
                                pageSize: 5,
                            }
                        })
                    }else{
                        getArticles({
                            params: {
                                page: 1,
                                pageSize: 5,
                                filterField: "[category][name]",
                                filterValue: item?.name,
                            }
                        })
                    }
                 }} />
                <BottomArticle data={getArticlesResponse?.data.filter((item) => item.attributes.category.data !== null)} userId={userId} />
            </div>
        )
    }

}