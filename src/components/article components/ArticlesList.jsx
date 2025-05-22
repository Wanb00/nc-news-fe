import { useEffect, useState } from "react";
import { getAllArticles } from "../../fetch";
import ArticleCard from "./ArticleCard";
import '../../App.css';
import useLoadingError from "../../hooks/useLoadingError";

const ArticlesList = ({ articles, setArticles}) => {
    const { loading, error, startLoading, handleError, finishLoading } = useLoadingError();

    useEffect(() => {
        startLoading();
        getAllArticles().then((allArticles) => {
            setArticles(allArticles);
            finishLoading();
        })
        .catch(handleError)
    }, [setArticles])

    return (
        <div className="container">
            <h1 className="all-articles">All Articles</h1>
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