import { useContext, useEffect, useState } from "react";
import "../App.css";
import { deleteComment, updateCommentVotes } from "../fetch";
import { UserContext } from "../contexts/UserContext";

const CommentCard = ({ comment }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);
  const [userVote, setUserVote] = useState(0);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    setVotes(comment.votes)
  }, [userVote])

  const handleDelete = () => {
    setIsDeleting(true);
    setError(null);

    deleteComment(comment.comment_id)
      .then(() => {
        setDeleted(true);
      })
      .catch(() => {
        setError("Failed to delete comment. Please try again.");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleVote = (change) => {
    const newVote = userVote === change ? 0 : change;
    const voteDif = newVote - userVote;

    setVotes((curr) => curr + voteDif);
    setUserVote(newVote);

    updateCommentVotes(comment.comment_id, voteDif)
      .then((updatedComment) => {
        setVotes(updatedComment.votes);
      })
      .catch(() => {
        setVotes((curr) => curr - voteDif);
      });
  };

  if (deleted) return <p className="deleted-msg">Comment Deleted.</p>;

  return (
    <div className="comment-card">
      <p>
        <strong>{comment.author}:</strong>
      </p>
      <p>{comment.body}</p>
      <small>Votes: {votes}</small>
      <button
        className={userVote === 1 ? "active vote-btn-comment" : "vote-btn-comment"}
        onClick={() => handleVote(1)}
      >
        ⬆️
      </button>
      <button
        className={userVote === -1 ? "active vote-btn-comment" : "vote-btn-comment"}
        onClick={() => handleVote(-1)}
      >
        ⬇️
      </button>
      {comment.author === loggedInUser.username && (
        <button
          className="delete-comment-btn"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CommentCard;
