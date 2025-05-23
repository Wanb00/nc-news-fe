import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
    const { title, topic, author, created_at, votes } = article;
    console.log(article)
    return (
        <div className="article-card">
            <Link to={`/articles/${article.article_id}`} className="article-link">
                <h2>{title}</h2>
            </Link>
                <img src={article.article_img_url} className="article-img" alt={`article image for ${title}`}></img>
                <p><strong>Topic:</strong> {topic}</p>
                <p><strong>Author:</strong> {author}</p>
                <p><strong>Date:</strong> {new Date(created_at).toLocaleDateString()}</p>
                <p><strong>Votes:</strong> {votes}</p>
        </div>
    );
};

export default ArticleCard;