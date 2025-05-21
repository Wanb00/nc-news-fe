import axios from "axios";

export const apiClient = axios.create({
    baseURL: "https://back-end-northcoders-news.onrender.com/api"
})

export const getAllArticles = () => {
    return apiClient.get('/articles')
    .then((res) => res.data.articles)
    .catch((err) => {
        console.error(err);
        return [];
    });
};

export const getArticleById = (article_id) => {
    return apiClient.get(`/articles/${article_id}`)
    .then((res) => res.data.article);
}

export const getCommentsByArticle = (article_id) => {
    return apiClient.get(`/articles/${article_id}/comments`)
    .then((res) => {
        if (res.data && res.data.comments) {
            return res.data.comments;
        } else {
            return [];
        }
    })
}