import { useEffect, useState } from "react";
import { getAllArticles } from "../fetch";
import { Link } from "react-router-dom";
import '../App.css'
import ArticleCard from "./ArticleCard";

const HomePage = () => {
    const [latestArticles, setLatestArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllArticles().then((articles) => {
            const sorted = articles
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 3);
            setLatestArticles(sorted);
            setLoading(false);
        });
    }, []);

    return (
        <div className="container">
            <header className="header">
                <nav>
                    <Link to="/articles" className="nav-link">Articles</Link>
                </nav>
            </header>
            <h1>Latest Articles</h1>
            {loading ? (<p>Loading...</p>) : (
                latestArticles.map((article) => (
                    <ArticleCard key={article.article_id} article={article} />                ))
                )}
        </div>
    );
};

export default HomePage;