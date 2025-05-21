import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../fetch";
import CommentCard from "./CommentCard";


const ArticlePage = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getArticleById(article_id),
            getCommentsByArticle(article_id)
        ])
        .then((article, comments) => {
            setArticle(article);
            setComments(comments);
            setLoading(false);
        })
    }, [article_id])

    if (loading) return <p>Loading article...</p>;
    if (!article) return <p>Article not found.</p>;

    return (
        <div className="container">
            <section className="article-section">
                <h1>{article.title}</h1>
                <p><strong>Author:</strong> {article.author}</p>
                <p><strong>Topic:</strong> {article.topic}</p>
                <p><strong>Posted:</strong> {new Date(article.created_at).toLocaleString()}</p>
                <article>{article.body}</article>     
            </section>
            <section className="comments-section">
                <h3>Comments</h3>
                {comments.length === 0 ? (<p>No comments...</p>) 
                : (comments.map(comment => (<CommentCard key={comment.comment_id} comment={comment} />)))}
            </section>
        </div>
    )
}

export default ArticlePage;