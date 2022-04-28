import React, { useState } from "react";
import Cookies from "universal-cookie";

export const CreateComment = ({ 
    handleComment,
    setShowComponent, 
    isNewComment, 
    initialText = "",
    setActiveComment,
    setShowEditsButton,
    showEditsButton,
    toggleComponent,
    commentId,
    isEditingComment
}) => {
    
    const [commentText, setCommentText] = useState(initialText);
    const cookies = new Cookies();
    const username = cookies.get("username");

    const postComment = async () => {
        handleComment(commentText, commentId);
        if(isEditingComment) {
            setShowEditsButton((prevShowEditsButton) => !prevShowEditsButton)
        }
        if (!isEditingComment) {
        setShowComponent((prevShowComponent) => !prevShowComponent);
        setCommentText("");
        }
    }

    const handleCancel = () => {
        setActiveComment(null)
        setShowEditsButton((prevShowEditsButton) => !prevShowEditsButton)
    }

    return (
        <>
        {isNewComment && (
                <div className="comment_card_posted_details">
                    <p>{username}</p>
                    <span>date</span>
                </div>
                )}
                <div className="comment_card_textarea">
                    <textarea 
                        value={commentText} 
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Start typing..."></textarea>
                </div>
                <div className="comment_card_actions_container">
                <div className="comment_card_actions_buttons">
                    <button 
                        className="create_comment_post_button"
                        onClick={postComment}
                        >
                        {showEditsButton ? "Save" : "Post"}
                    </button>
                    {showEditsButton ? (
                        <button
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        ) : (
                        <button
                            onClick={toggleComponent}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </>
    )

}