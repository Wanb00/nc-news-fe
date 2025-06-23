import { useState } from "react";
import { postArticle } from "../../fetch";

export default function PostArticle() {
  const [articleDetails, setArticleDetails] = useState({
    title: "",
    topic: "",
    author: "jessjelly",
    body: "",
    article_img_url: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const newArticle = await postArticle(articleDetails);
      setMessage(
        `Article has posted successfully! ID: ${newArticle.article_id}`
      );
      setArticleDetails({
        title: "",
        topic: "",
        author: "jessjelly",
        body: "",
        article_img_url: "",
      });
    } catch (err) {
      setMessage("Failed to post the article. PLease try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-article-form">
      <h1>Post an article</h1>
      <input
        type="text"
        name="title"
        value={articleDetails.title}
        onChange={handleChange}
        placeholder="Title"
        className="post-article-input"
        required
      />
      <input
        type="text"
        name="topic"
        value={articleDetails.topic}
        onChange={handleChange}
        placeholder="Topic"
        className="post-article-input"
        required
      />
      <textarea
        name="body"
        value={articleDetails.body}
        onChange={handleChange}
        placeholder="Body"
        className="post-article-textarea"
        required
      />
      <input
        type="url"
        name="article_img_url"
        value={articleDetails.article_img_url}
        onChange={handleChange}
        placeholder="Image URL"
        className="post-article-input"
      />
      <button type="submit" className="post-article-button">
        Submit Article
      </button>
      {message && <p className="post-article-message">{message}</p>}
    </form>
  );
}
