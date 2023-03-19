import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getArticlesApi = (payload) => {
    return api.get(API.ARTICLE.getArticle, payload)
}

export const getArticleCategoriesApi = (payload) => {
    return api.get(API.ARTICLE.getArticleCategories, payload)
}