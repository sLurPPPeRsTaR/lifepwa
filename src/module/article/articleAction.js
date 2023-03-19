import * as CONST from './articleConstant'

export const getArticles = (payload) => ({
    type: CONST.GET_ARTICLES,
    payload,
})

export const getArticlesSuccess = (payload) => ({
    type: CONST.GET_ARTICLES_SUCCESS,
    payload,
})

export const getArticlesFailed = (payload) => ({
    type: CONST.GET_ARTICLES_FAILED,
    payload,
})

export const getArticlesClear = (payload) => ({
    type: CONST.GET_ARTICLES_CLEAR,
    payload,
})

export const getArticle = (payload) => ({
    type: CONST.GET_ARTICLE,
    payload,
})

export const getArticleSuccess = (payload) => ({
    type: CONST.GET_ARTICLE_SUCCESS,
    payload,
})

export const getArticleFailed = (payload) => ({
    type: CONST.GET_ARTICLE_FAILED,
    payload,
})

export const getArticleCategories = (payload) => ({
    type: CONST.GET_ARTICLE_CATEGORIES,
    payload,
}) 

export const getArticleCategoriesSuccess = (payload) => ({
    type: CONST.GET_ARTICLE_CATEGORIES_SUCCESS,
    payload,
}) 

export const getArticleCategoriesFailed = (payload) => ({
    type: CONST.GET_ARTICLE_CATEGORIES_FAILED,
    payload,
}) 