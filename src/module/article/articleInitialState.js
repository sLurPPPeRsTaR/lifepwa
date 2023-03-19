export const articles = {
    getArticlesFetch: false,
    getArticlesParams: {},
    getArticlesResponse: [],
}

export const article = {
    getArticleFetch: false,
    getArticleParams: {},
    getArticleResponse: {
        data: {
            id: 0,
            attributes: {
                Title: "",
                Slug: "",
                createdAt: "",
                updatedAt: "",
                publishedAt: "",
                ShortArticle: "",
                ImageThumb: "",
                ImageSmall: "",
                ImageMedium: "",
                ImageLarge: "",
                category: {
                    data: {
                        id: 0,
                        attributes: {
                            name: "",
                            slug: "",
                            createdAt: "",
                            updatedAt: "",
                            publishedAt: ""
                        }
                    }
                }
            },
        }
    }
}

export const categories = {
    getCategoriesFetch: false,
    getCategoriesParams: {},
    getCategoriesResponse: [],
}