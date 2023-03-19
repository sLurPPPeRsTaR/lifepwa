import { takeLatest, call, put } from 'redux-saga/effects';
import * as CONST from './articleConstant';
import {
    getArticlesApi,
    getArticleCategoriesApi,
} from './articleApi';
import {
    getArticleSuccess,
    getArticleFailed,
    getArticlesSuccess,
    getArticlesFailed,
    getArticleCategoriesSuccess,
    getArticleCategoriesFailed,
} from './articleAction'
function* getArticle(params){
    try {
        const article = yield call(getArticlesApi, params?.payload)
        if(article?.data?.data?.length === 0) throw new Error()
        const setData = {
            data: article?.data?.data?.[0]
        }
        yield put(getArticleSuccess(setData))
    } catch (error) {
        yield put(getArticleFailed())
        console.log(error)
    }
}

function* getArticles(params){
    try {
        const articles = yield call(getArticlesApi, params?.payload)
        yield put(getArticlesSuccess(articles?.data))
    } catch (error) {
        yield put(getArticlesFailed())
        console.log(error)
    }
}

function* getArticleCategories(params){
    try {
        const categories = yield call(getArticleCategoriesApi, params?.payload)
        yield put(getArticleCategoriesSuccess(categories?.data))
    } catch (error) {
        yield put(getArticleCategoriesFailed())
        console.log(error)
    }
}
export default [
    takeLatest(CONST.GET_ARTICLES, getArticles),
    takeLatest(CONST.GET_ARTICLE, getArticle),
    takeLatest(CONST.GET_ARTICLE_CATEGORIES, getArticleCategories)
]