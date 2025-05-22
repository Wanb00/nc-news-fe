import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticle, postComment, updateArticleVotes } from "../fetch";
import CommentCard from "./CommentCard";


const ArticlePage = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [votes, setVotes] = useState(0);
    const [userVote, setUserVote] = useState(0);

    const [commentBody, setCommentBody] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [postError, setPostError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        Promise.all([
            getArticleById(article_id),
            getCommentsByArticle(article_id)
        ])
        .then(([article, commentsArr]) => {
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
        });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!commentBody.trim()) return;
        setIsPosting(true);
        setPostError(null);
        setSuccess(false);

        postComment(article.article_id, "jessjelly", commentBody)
        .then((newComment) => {
            setComments((currComments) => [newComment, ...currComments]);
            setCommentBody("")
            setSuccess(true);
        })
        .catch((err) => {
            setPostError("Failed to post comment. Try again.");
        })
        .finally(() => {
            setIsPosting(false)
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
                <section className="add-comment">
                    <h3>Post a comment:</h3>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea 
                            value={commentBody}
                            onChange={(e) => setCommentBody(e.target.value)}
                            placeholder="Write your comment here..."
                            required
                        />
                        <button type="submit" className="post-comment-btn" disabled={isPosting || !commentBody.trim()}>
                            {isPosting ? "Posting..." : "Post Comment"}
                        </button>
                        {success && <p className="success">Comment posted successfully!</p>}
                        {error && <p className="error">{postError}</p>}
                    </form>
                </section>
                <h3>Comments</h3>
                {comments.length === 0 ? (<p>No comments...</p>) 
                : (comments.map(comment => (<CommentCard key={comment.comment_id} comment={comment} />)))}
            </section>
        </div>
    )
}

export default ArticlePage;