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
            <h1>All Articles</h1>
            {loading ? 
            (<p>Loading articles...</p>) 
            : articles.length === 0 ? (<p>No articles found.</p>) 
            : (articles.map((article) => (<ArticleCard key={article.article_id} article={article} /> )) 
            )}
        </div>
    );
};

export default ArticlesList;