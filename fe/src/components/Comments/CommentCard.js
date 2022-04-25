import React, { useState, useContext } from "react";
import Cookies from "universal-cookie";
import qs from "qs";
import { useParams } from "react-router-dom";

import { ArticleContext } from "../Articles/Article";

export const CommentCard = ({
    comments,
    setComment,
    username,
    cardId,
    createdAt,
    commentText,
    strapiUId,
    commentId
}) => {

    let [editCommentId, setEditCommentId] = useState("");
    let [isEditing, setIsEditing] = useState(false);
    let [initialText, setInitialText] = useState("");
    let [editedText, setEditedText] = useState("");

    const params = useParams();
    const articles = useContext(ArticleContext);

    const cookies = new Cookies();
    const getStrapiUserId = cookies.get("id")
    const strapiUserId = parseInt(getStrapiUserId);
    const token = cookies.get("token");

    const commentToEdit = (cId) => {
        editCommentId = cId;
        initialText = commentText;
        setEditCommentId(editCommentId);
        setIsEditing(true);
        setInitialText(initialText);
    }

    const getNewText = (e) => {
        editedText = e.target.value;
        setEditedText(editedText);
    }

    const cancelEditComment = () => {
        setEditCommentId("");
        setIsEditing(false);
        setEditedText(initialText);
    }

    const postEditedComment = async () => {

        const filterArticle = articles.filter(a => {
            return a.id.toString() === params.id;
        });
        const articleId = filterArticle[0].id;
        const request = await fetch(`http://localhost:1337/api/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    data: {
                        comment_text: editedText,
                        article: {
                            id: articleId
                        },
                        users_permissions_user: {
                            id: strapiUserId
                        }
                    }
                })
        });
        const response = await request.json();
        const query = qs.stringify({
            populate: ['article', 'users_permissions_user'], 
          }, {
            encodeValuesOnly: true,
          });
        // Retrieve edited comment by id
         const getComment = await fetch(`http://localhost:1337/api/comments/${commentId}?${query}`);
         const editedComment = await getComment.json();
        setComment([...comments, editedComment.data]);
        setEditCommentId("");
        setIsEditing(false);
    }

    return (
        <div className="comment_card_container" key={cardId}>
                    <div className="comment_card_posted_details">
                        <p>{username}</p>
                        <span>{createdAt}</span>
                    </div>
                    <div className="comment_card_textarea">
                        {!isEditing && <p>{commentText}</p>}
                        {isEditing && <textarea
                                        onChange={(e) => getNewText(e)}
                                        >
                                            {initialText}
                                        </textarea>}
                        
                    </div>
                    <div className="comment_card_actions_container">
                        <div className="comment_card_actions_buttons">
                            {editCommentId === commentId 
                            ? (
                                <>
                                <button 
                                    className="edit_comment_post_button"
                                    onClick={postEditedComment}
                                    >
                                    Save
                                </button>
                                <button 
                                onClick={cancelEditComment}
                                >
                                    Cancel
                                </button>
                                </>
                            ) : (
                                <>
                                <button>Reply</button> 
                                <button>Like</button>
                                <button className={
                                    strapiUId === strapiUserId
                                    ? "edit_comment_button"
                                    : "hidden"}
                                    onClick={() => commentToEdit(commentId)}
                                    >
                                        Edit
                                </button> 
                                </>
                            )
                            }
                        </div>
                        
                    </div>
                </div>
    )

}