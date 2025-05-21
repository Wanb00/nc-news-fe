import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../fetch";


const ArticlePage = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticleById(article_id)
        .then((article) => {
            setArticle(article);
            setLoading(false);
        })
    }, [article_id])

    if (loading) return <p>Loading article...</p>;
    if (!article) return <p>Article not found.</p>;

    return (
        <div className="container">
            <h1>{article.title}</h1>
            <p><strong>Author:</strong> {article.author}</p>
            <p><strong>Topic:</strong> {article.topic}</p>
            <p><strong>Posted:</strong> {new Date(article.created_at).toLocaleString()}</p>
            <article>{article.body}</article>
        </div>
    )
}

export default ArticlePage;