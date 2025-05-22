import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticle, updateArticleVotes } from "../fetch";
import CommentCard from "./CommentCard";


const ArticlePage = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [votes, setVotes] = useState(0);
    const [userVote, setUserVote] = useState(0);

    useEffect(() => {
        Promise.all([
            getArticleById(article_id),
            getCommentsByArticle(article_id)
        ])
        .then(([article, commentsArr]) => {
            console.log(commentsArr)
            setArticle(article);
            setVotes(article.votes)
            setComments(commentsArr);
            setLoading(false);
        })
    }, [article_id])

    const handleVote = (change) => {
        const newVote = userVote === change ? 0 : change;
        const voteDif = newVote - userVote;

        setVotes((curr) => curr + voteDif);
        setUserVote(newVote);
        setError(null);

        updateArticleVotes(article_id, voteDif)
        .then((updatedArticle) => {
            setVotes(updatedArticle.votes);
        })
        .catch(() => {
            setVotes((curr) => curr - voteDif);
            setError("Vote failed. Please try again.");
        })
    }

    if (loading) return <p>Loading article...</p>;
    if (!article) return <p>Article not found.</p>;
    if (!comments) return <p>Comments could not be loaded...</p>

    return (
        <div className="container">
            <section className="article-section">
                <h1>{article.title}</h1>
                <p><strong>Author:</strong> {article.author}</p>
                <p><strong>Topic:</strong> {article.topic}</p>
                <p><strong>Posted:</strong> {new Date(article.created_at).toLocaleString()}</p>
                <p><strong>Votes:</strong> {votes}</p>
                <button className={userVote === 1 ? "active vote-btn" : "vote-btn"} onClick={() => handleVote(1)} >⬆️</button>
                <button className={userVote === -1 ? "active vote-btn" : "vote-btn"} onClick={() => handleVote(-1)} >⬇️</button>
                {error && <p className="error">{error}</p>}
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