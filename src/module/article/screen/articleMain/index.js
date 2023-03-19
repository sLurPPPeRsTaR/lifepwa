import { connect } from 'react-redux';
import View from './View';
import {
    getArticles,
    getArticleCategories,
} from '@cp-module/article/articleAction';
import {
    setLoading,
} from '@cp-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    getArticlesCategoriesResponse: state.article.getCategoriesResponse,
    getArticlesResponse: state.article.getArticlesResponse,
    articleAction: state.article.action,
    getArticlesFetch: state.article.getArticlesFetch,
    getCategoriesFetch: state.article.getCategoriesFetch,
    userId: state.auth.userData.userId,
})

const mapDispatchToProps = {
    getArticles: (payload) => getArticles(payload),
    getArticleCategories: (payload) => getArticleCategories(payload),
    setLoading: (payload) => setLoading(payload),
}
export default connect(mapStateToProps, mapDispatchToProps)(View)