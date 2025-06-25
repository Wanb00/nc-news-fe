import "../App.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getArticlesByUser } from "../fetch";
import ArticleCard from "./article components/ArticleCard";

const Profile = () => {
  const { loggedInUser } = useContext(UserContext);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const userArticles = await getArticlesByUser(loggedInUser.username);
        setArticles(userArticles);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticles();
  }, [loggedInUser]);

  return (
    <section className="profile">
      <div className="profile-header">
        <h1 className="profile-name">{loggedInUser.username}</h1>
        <h2>Articles</h2>
      </div>
      <section className="profile-articles">
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        )}
      </section>
    </section>
  );
};

export default Profile;
