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
  }, []);

  return (
    <section>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))
      )}
    </section>
  );
};

export default Profile;
