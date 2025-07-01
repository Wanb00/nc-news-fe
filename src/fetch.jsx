import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://back-end-northcoders-news.onrender.com/api"
});

export const getArticles = ({ topic = null, sort_by = "created_at", order = "desc"} = {}) => {
    const params = {};

    if (topic && topic !== "all") params.topic = topic;
    if (sort_by) params.sort_by = sort_by;
    if (order) params.order = order;

    return apiClient.get('/articles', { params })
    .then((res) => res.data.articles);
};

export const getArticleById = (article_id) => {
    return apiClient.get(`/articles/${article_id}`)
    .then((res) => res.data.article);
};

export const getCommentsByArticle = (article_id) => {
    return apiClient.get(`/articles/${article_id}/comments`)
    .then((res) => res.data.comments);
        
};

export const updateArticleVotes = (article_id, voteChange) => {
    return apiClient.patch(`articles/${article_id}`, { inc_votes: voteChange })
    .then((res) => res.data.article);
};

export const postComment = (article_id, username, body) => {
    return apiClient.post(`/articles/${article_id}/comments`, { username, body })
    .then((res) => res.data.comment);
};

export const postArticle = (articleDetails) => {
    return apiClient.post(`/articles`, articleDetails )
    .then((res) => res.data.article);
};

export const deleteComment = (comment_id) => {
    return apiClient.delete(`/comments/${comment_id}`)
    .then((res) => res.data);
};

export const getTopics = () => {
    return apiClient.get(`/topics`)
    .then((res) => res.data.topics);
};

export const userLogin = (username, password) => {
    return apiClient.post(`/login`, { username, password })
    .then((res) => res.data);
};

export const getArticlesByUser = (username) => {
    return apiClient.get(`/users/${username}/articles`)
    .then((res) => res.data.articles);
};

export const updateCommentVotes = (comment_id, voteChange) => {
    return apiClient.patch(`comments/${comment_id}`, { inc_votes: voteChange })
    .then((res) => res.data.comment);
};

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
