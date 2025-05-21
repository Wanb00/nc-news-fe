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
        <section className="container">
            <h1 className="latest-articles">Latest Articles</h1>
            <section className="latest-article-section">
                {loading ? (<p>Loading...</p>) : (
                    latestArticles.map((article) => (
                        <ArticleCard key={article.article_id} article={article} />                ))
                    )}
            </section>
        </section>
    );
};

export default HomePage;