const ArticleCard = ({ article }) => {
    const { title, topic, author, created_at, votes } = article;

    return (
        <div className="article-card">
            <h2>{title}</h2>
            <p><strong>Topic:</strong> {topic}</p>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Date:</strong> {new Date(created_at).toLocaleDateString()}</p>
            <p><strong>Votes:</strong> {votes}</p>
        </div>
    );
};

export default ArticleCard;