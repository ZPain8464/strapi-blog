import React, { useState, useContext } from "react";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

import { ArticleContext } from "../Articles/Article";
import { CreateComment } from "../Comments/CreateComment";

export const CommentCard = ({
    comment,
    username,
    cardId,
    createdAt,
    commentText,
    strapiUId,
    commentId,
    activeComment,
    setActiveComment,
    editComment,
    deleteComment
}) => {

    const [showEditsButton, setShowEditsButton] = useState(false);

    const params = useParams();
    const articles = useContext(ArticleContext);

    const cookies = new Cookies();
    const getStrapiUserId = cookies.get("id")
    const strapiUserId = parseInt(getStrapiUserId);
    const token = cookies.get("token");

    // Editing conditional requirements
    const isEditing =
    activeComment &&
    activeComment.id === commentId &&
    activeComment.type === "editing";

    const canEdit = strapiUserId === comment.attributes.users_permissions_user.data.id;
    const canDelete = strapiUserId === comment.attributes.users_permissions_user.data.id;

    const postEditedComment = async (commentText) => {
        
        const filterArticle = articles.filter(a => {
            return a.id.toString() === params.id;
        });
        const articleId = filterArticle[0].id;
        console.log("text: ", commentText, "commentId: ", commentId)
        editComment(commentText, commentId, articleId, strapiUId, token)
    }

    const handleEditsButton = () => {
        setActiveComment({ id: commentId, type: "editing"});
        setShowEditsButton((prevShowEditsButton) => !prevShowEditsButton);
    }

    const handleDeleteButton = (commentId, token) => {
        deleteComment(commentId, token)
    }
    
    return (
        <div className="comment_card_container" key={cardId}>
                    <div className="comment_card_posted_details">
                        <p>{username}</p>
                        <span>{createdAt}</span>
                    </div>
                    <div className="comment_card_textarea">
                        {!isEditing && <p>{commentText}</p>}
                        {isEditing && (
                            <CreateComment 
                                commentId
                                setShowEditsButton={setShowEditsButton}
                                showEditsButton
                                setActiveComment={setActiveComment}
                                initialText={commentText}
                                handleComment={postEditedComment}
                                isEditingComment
                                />
                        )}
                    </div>
                    <div className="comment_card_actions_container">
                        <div className="comment_card_actions_buttons">
                            {canEdit && (
                                <button 
                                    className={showEditsButton && comment.id === commentId ? "hidden" : "edits_button"}
                                    onClick={handleEditsButton}
                                    >
                                    Edit
                                </button>
                            )}
                            {canDelete && (
                                <button
                                    className={showEditsButton ? "hidden" : "delete_button"}
                                    onClick={() => handleDeleteButton(commentId, token)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                        
                    </div>
                </div>
    )

}