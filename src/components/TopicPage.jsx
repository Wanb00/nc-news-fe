import { useEffect } from "react";
import { useParams } from "react-router-dom"
import useLoadingError from "../hooks/useLoadingError";
import { getArticles } from "../fetch";


const TopicPage = ({ articles, setArticles }) => {
    const { topic } = useParams();
    const { loading, error, startLoading, finishLoading, handleError } = useLoadingError();

    useEffect(() => {
        startLoading();
        getArticles(topic)
            .then((articles) => {
                setArticles(articles);
                finishLoading();
            })
            .catch(() => {
                handleError("Topic not found or has no articles");
            });
    }, [topic, setArticles]);
    
    return (
        <div className="container">
            <section className="articles-list-section">
                {loading ? 
                (<p>Loading Articles...</p>) 
                : error ? (<p className="error">{error}</p>)
                : articles.length === 0 ? (<p>No articles found for this topic.</p>)
                : (articles.map((article) => (
                    <ArticleCard key={articles.article_id} article={article} />
                ))
            )}
            </section>
        </div>
    );
};

export default TopicPage;