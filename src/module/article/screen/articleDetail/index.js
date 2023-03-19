import { connect } from 'react-redux';
import View from './View';
import {
    getArticle,
    getArticles,
} from '@cp-module/article/articleAction';
import {
    setLoading,
} from '@cp-bootstrap/bootstrapAction'

const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    getArticleResponse: state.article.getArticleResponse,
    getArticlesResponse: state.article.getArticlesResponse,
    articleAction: state.article.action,
    userId: state.auth.userData.userId,
})

const mapDispatchToProps = {
    getArticle: (payload) => getArticle(payload),
    getArticles: (payload) => getArticles(payload),
    setLoading: (payload) => setLoading(payload),
}

export default connect(mapStateToProps, mapDispatchToProps)(View)