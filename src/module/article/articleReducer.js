import * as STATE from './articleInitialState';
import * as CONST from './articleConstant';

const initialState = {
    ...STATE.article,
    ...STATE.articles,
    ...STATE.categories,
    action: '',
}

export const articleReducer = (state = initialState, action) => {
    const { type, payload } = action

    const actions = {
        [CONST.GET_ARTICLE]: () => ({
            ...state,
            getArticleParams: payload,
            getArticleFetch: true,
            action: type
        }),
        [CONST.GET_ARTICLE_SUCCESS]: () => ({
            ...state,
            getArticleResponse: payload,
            getArticleFetch: false,
            action: type
        }),
        [CONST.GET_ARTICLE_FAILED]: () => ({
            ...state,
            getArticleFetch: false,
            action: type
        }),
        [CONST.GET_ARTICLES]: () => ({
            ...state,
            getArticlesParams: payload,
            getArticlesFetch: true,
            action: type
        }),
        [CONST.GET_ARTICLES_SUCCESS]: () => ({
            ...state,
            getArticlesResponse: payload,
            getArticlesFetch: false,
            action: type
        }),
        [CONST.GET_ARTICLES_FAILED]: () => ({
            ...state,
            getArticlesFetch: false,
            action: type
        }),
        [CONST.GET_ARTICLES_CLEAR]: () => ({
            ...state,
            getArticlesResponse: initialState?.getArticlesResponse,
            action: type
        }),
        [CONST.GET_ARTICLE_CATEGORIES]: () => ({
            ...state,
            getCategoriesFetch: true,
            action: type
        }),
        [CONST.GET_ARTICLE_CATEGORIES_SUCCESS]: () => ({
            ...state,
            getCategoriesFetch: false,
            getCategoriesResponse: payload,
            action: type
        }),
        [CONST.GET_ARTICLE_CATEGORIES_FAILED]: () => ({
            ...state,
            getCategoriesFetch: false,
            action: type
        }),
        DEFAULT: () => state
    }

    return(actions[type] || actions.DEFAULT)()
}

