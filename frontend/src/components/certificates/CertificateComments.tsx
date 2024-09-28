import React, { useCallback, useState } from 'react';
import Button from '../form/Button';
import Textarea from '../form/Textarea';
import { UserContext } from '../../contexts/UserContext';
import { CommentDto } from '../../types/index';
import "./CertificateComments.css";

interface CertificateCommentsProps {
  comments: CommentDto[];
  addComment: (newComment: CommentDto) => void;
}

const CertificateComments: React.FC<CertificateCommentsProps> = ({ comments, addComment }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [error, setError] = useState<string>("");

  const { activeUser, users } = React.useContext(UserContext)!;

  const handleToggleForm = useCallback(() => {
    setShowForm((prev) => !prev);
    setNewComment('');
    setError('');
  }, []);

  const handleNewCommentSubmit = useCallback(() => {
    if (newComment.trim() === '') {
      setError('Please fill your comment!');
    } else {
      addComment({ userId: activeUser?.id, comment: newComment.trim() });
      setNewComment('');
      setShowForm(false);
      setError('');
    }
  }, [newComment, activeUser, addComment]);

  return (
    <div className="comments-section">
      <Button className={showForm ? 'btn btn-cancel' : 'btn btn-blue'} onClick={handleToggleForm}>
        {showForm ? 'Cancel Comment' : 'New comment'}
      </Button>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <p><strong>User:</strong> {users.find((user) => user.id === comment.userId)?.name}</p>
              <p><strong>Comment:</strong> {comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments!</p>
        )}
      </div>

      {showForm && (
        <div className="comment-form">
          <Textarea
            label={activeUser?.name}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Comment"
            required
            id="comment"
            rows={7}
            className="comment-textarea"
          />
          {error && <p className='error'>{error}</p>}
          <Button onClick={handleNewCommentSubmit} className="btn btn-red">
            Send
          </Button>
        </div>
      )}
    </div>
  );
};

export default CertificateComments;
