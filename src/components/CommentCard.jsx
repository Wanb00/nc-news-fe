import { useContext, useState } from 'react';
import '../App.css';
import { deleteComment } from '../fetch';
import { UserContext } from '../contexts/UserContext';

const CommentCard = ({ comment }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [error, setError] = useState(null);
    const { loggedInUser } = useContext(UserContext);

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
        })
    }
    console.log(loggedInUser);
    
    if (deleted) return <p className='deleted-msg'>Comment Deleted.</p>

    return (
        <div className='comment-card'>
            <p><strong>{comment.author}:</strong></p>
            <p>{comment.body}</p>
            <small>Votes: {comment.votes}</small>
            {comment.author === loggedInUser.username && (
                <button className='delete-comment-btn' onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            )}
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default CommentCard;