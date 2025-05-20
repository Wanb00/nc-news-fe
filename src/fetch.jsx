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