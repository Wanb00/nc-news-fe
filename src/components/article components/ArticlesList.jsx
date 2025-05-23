import { useEffect, useState } from "react";
import { getArticles, getTopics } from "../../fetch";
import '../../App.css';
import useLoadingError from "../../hooks/useLoadingError";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

const ArticlesList = ({ articles, setArticles}) => {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("all");
    const { loading, error, startLoading, handleError, finishLoading } = useLoadingError();
    
    const [searchParams, setSearchParams] = useSearchParams();
    const sort_by = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    useEffect(() => {
        startLoading();
        const topicParam = selectedTopic === "all" ? null : selectedTopic;
        getArticles({ topic: topicParam, sort_by, order }).then((articles) => {
            setArticles(articles);
            finishLoading();
        })
        .catch(handleError)
    }, [setArticles, sort_by, order, selectedTopic])

    useEffect(() => {
        getTopics().then((topics) => {
            setTopics(topics);
        })
        .catch(() => {
            setTopics([]);
        })
    }, [])

    const handleTopicChange = (e) => {
        setSelectedTopic(e.target.value);
    }

    const handleSortByChange = (e) => {
        setSearchParams((params) => {
            params.set("sort_by", e.target.value)
            return params;
        });
    };

    const handleOrderToggle = () => {
        setSearchParams((params) => {
            const currentOrder = params.get("order") || "desc";
            params.set("order", currentOrder === "asc" ? "desc" : "asc")
            return params;
        })
    }

    return (
        <div className="container">
            <h1 className="all-articles">All Articles</h1>
            <div className="dropdown-container">
                <label htmlFor="topic-select">Filter By Topic: </label>
                <select id="topic-select" value={selectedTopic} onChange={handleTopicChange}>
                    <option value="all">All Topics</option>
                    {topics.map((topic) => (
                        <option key={topic.slug} value={topic.slug}>
                            {topic.slug}
                        </option>
                    ))}
                </select>
            </div>
            <div className="sort-controls">
                <label htmlFor="sort-by">Sort By: </label>
                <select id="sort-by" value={sort_by} onChange={handleSortByChange}>
                    <option value="created_at">Date</option>
                    <option value="votes">Votes</option>
                    <option value="comment_count">Comment Count</option>
                </select>

                <button onClick={handleOrderToggle} className="order-btn">
                    Order: {order === "asc" ? "Ascending" : "Descending"}
                </button>
            </div>
            <section className="articles-list-section">
                {loading ? 
                (<p>Loading articles...</p>) 
                : articles.length === 0 ? (<p>No articles found.</p>) 
                : (articles.map((article) => (<ArticleCard key={article.article_id} article={article} /> )) 
                )}
            </section>
        </div>
    );
};

export default ArticlesList;