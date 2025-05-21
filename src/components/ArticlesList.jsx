import { useEffect, useState } from "react";
import { getAllArticles } from "../fetch";
import ArticleCard from "./ArticleCard";
import '../App.css';

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllArticles().then((data) => {
            setArticles(data);
            setLoading(false);
        })
    }, [])

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