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
};

export const getCommentsByArticle = (article_id) => {
    return apiClient.get(`/articles/${article_id}/comments`)
    .then((res) => {
        if (res.data && res.data.comments) {
            return res.data.comments;
        } else {
            return [];
        };
    });
};

export const updateArticleVotes = (article_id, voteChange) => {
    return apiClient.patch(`articles/${article_id}`, { inc_votes: voteChange })
    .then((res) => res.data.article);
};

export const postComment = (article_id, username, body) => {
    return apiClient.post(`/articles/${article_id}/comments`, { username, body })
    .then((res) => res.data.comment);
};

export const deleteComment = (comment_id) => {
    return apiClient.delete(`/comments/${comment_id}`)
    .then((res) => res.data);
};

export const getTopics = () => {
    return apiClient.get(`/topics`)
    .then((res) => res.data.topics);
}

export const getArticlesByTopic = (topic) => {
    return apiClient.get(`/articles?topic=${topic}`)
    .then((res) => res.data.articles);
}

