import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export const EditComment = ({
    cancelEditComment,
    username,
    cardId,
    createdAt,
    commentText,
    strapiUId,
    commentId
}) => {

    const cookies = new Cookies();
    const getStrapiUserId = cookies.get("id")
    const strapiUserId = parseInt(getStrapiUserId);

    // editing state
    
    return (
        <>
            <div className="edit_comment_card_details">
                <p>{username}</p>
                <span>{createdAt}</span>
            </div>
            <div className="create_comment_textarea">
                <textarea 
                    // value={initialComment} 
                    // onChange={(e) => editComment(e.target.value)}
                    placeholder="Start typing..."></textarea>
            </div>
            <div className="edit_comment_post_button_container">
                <button 
                    className="edit_comment_post_button"
                    // onClick={postComment}
                    >
                    Save
                </button>
                <button 
                onClick={cancelEditComment}
                >
                    Cancel
                </button>
            </div>
        </>
    )
}