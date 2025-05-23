import { useEffect, useState } from "react";
import { getAllArticles, getArticlesByTopic, getTopics } from "../../fetch";
import { useNavigate } from "react-router-dom";
import '../../App.css';
import useLoadingError from "../../hooks/useLoadingError";
import ArticleCard from "./ArticleCard";

const ArticlesList = ({ articles, setArticles}) => {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("all");
    const { loading, error, startLoading, handleError, finishLoading } = useLoadingError();
    const navigate = useNavigate();

    useEffect(() => {
        startLoading();
        getAllArticles().then((allArticles) => {
            setArticles(allArticles);
            finishLoading();
        })
        .catch(handleError)
    }, [setArticles])

    useEffect(() => {
        getTopics().then((topics) => {
            setTopics(topics);
        })
        .catch(() => {
            setTopics([]);
        })
    }, [])

    const handleTopicChange = (e) => {
        const topic = e.target.value;
        setSelectedTopic(topic);

        if (topic === "all") {
            startLoading();
            getAllArticles().then((articles) => {
                setArticles(articles);
                finishLoading();
            })
            .catch(handleError);
        } else {
            startLoading();
            getArticlesByTopic(topic).then((articles) => {
                setArticles(articles);
                finishLoading();
            })
            .catch(handleError);
        }
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