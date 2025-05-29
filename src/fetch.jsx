import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://back-end-northcoders-news.onrender.com/api"
})

export const getArticles = ({ topic = null, sort_by = "created_at", order = "desc"} = {}) => {
    const params = {};

    if (topic && topic !== "all") params.topic = topic;
    if (sort_by) params.sort_by = sort_by;
    if (order) params.order = order;

    return apiClient.get('/articles', { params })
    .then((res) => res.data.articles);
} 

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

export const deleteComment = (comment_id) => {
    return apiClient.delete(`/comments/${comment_id}`)
    .then((res) => res.data);
};

export const getTopics = () => {
    return apiClient.get(`/topics`)
    .then((res) => res.data.topics);
}


