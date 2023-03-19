import { connect } from 'react-redux'
import View from './View'
import { 
    setInternalServerError 
} from '@cp-bootstrap/bootstrapAction'
import {
    getArticles,
    getArticleCategories,
    getArticlesClear,
} from '@cp-module/article/articleAction'
const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    getArticlesCategoriesResponse: state.article.getCategoriesResponse,
    getArticlesResponse: state.article.getArticlesResponse,
    articleAction: state.article.action,
    userId: state.auth.userData.userId,
})

const mapDispatchToProps = {
    setInternalServerError: (payload) => setInternalServerError(payload),
    getArticles: (payload) => getArticles(payload),
    getArticleCategories: (payload) => getArticleCategories(payload),
    getArticlesClear: (payload) => getArticlesClear(payload),
}
export default connect(mapStateToProps, mapDispatchToProps)(View)