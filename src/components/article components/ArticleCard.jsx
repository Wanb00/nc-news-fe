import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
    const { title, topic, author, created_at, votes } = article;
    const titleArr = title.split(" ");
    const splicedTitle = titleArr.length > 5 ? titleArr.splice(0, 5).join(" ") + "..." : title;
    return (
        <div className="article-card">
            <Link to={`/articles/${article.article_id}`} className="article-link">
                <h2>{splicedTitle}</h2>
            </Link>
                <img src={article.article_img_url} className="article-img" alt={`article image for ${title}`}></img>
                <p className="tags"><strong>Topic:</strong> {topic}</p>
                <p className="tags"><strong>Author:</strong> {author}</p>
                <p className="tags mobile-hidden"><strong>Date:</strong> {new Date(created_at).toLocaleDateString()}</p>
                <p className="tags mobile-hidden"><strong>Votes:</strong> {votes}</p>
        </div>
    );
};

export default ArticleCard;