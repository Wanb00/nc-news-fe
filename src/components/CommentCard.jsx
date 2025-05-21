import '../App.css';

const CommentCard = ({ comment }) => {
    return (
        <div className='comment-card'>
            <p><strong>{comment.author}:</strong></p>
            <p>{comment.body}</p>
            <small>Votes: {comment.votes}</small>
        </div>
    )
}

export default CommentCard;