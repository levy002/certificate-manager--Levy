import React, { useCallback, useState } from 'react';
import Button from '../form/Button';
import Textarea from '../form/Textarea';
import { UserContext } from '../../contexts/UserContext';
import { CommentDto } from '../../generated-sources/typesAndServices';
import "./CertificateComments.css";
import { useI18n } from '../../contexts/LanguageContext';

interface CertificateCommentsProps {
  comments: CommentDto[];
  addComment: (newComment: CommentDto) => void;
}

const CertificateComments: React.FC<CertificateCommentsProps> = ({ comments, addComment }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [error, setError] = useState<string>("");
  const { translate } = useI18n();

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
      addComment({ userId: activeUser!.id, comment: newComment.trim() });
      setNewComment('');
      setShowForm(false);
      setError('');
    }
  }, [newComment, activeUser, addComment]);

  return (
    <div className="comments-section">
      <Button className={showForm ? 'btn btn-cancel' : 'btn btn-blue'} onClick={handleToggleForm}>
        {showForm ? translate("cancel_comment") : translate('new_comment')}
      </Button>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map(({ userId, comment }, index) => {
            const user = users.find(user => user.id === userId);
            return (
              <div key={index} className="comment">
                <p><strong>{translate("user")}:</strong> {`${user?.firstName} ${user?.lastName}`}</p>
                <p><strong>{translate("comment")}:</strong> {comment}</p>
              </div>
            );
          })
        ) : (
          <p>{translate("no_comments_yet")}</p>
        )}
      </div>

      {showForm && (
        <div className="comment-form">
          <Textarea
            label={`${activeUser?.firstName} ${activeUser?.lastName}`}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={translate("comment")}
            required
            id="comment"
            rows={7}
            className="comment-textarea"
          />
          {error && <p className='error'>{error}</p>}
          <Button onClick={handleNewCommentSubmit} className="btn btn-green">
            {translate("send")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CertificateComments;
