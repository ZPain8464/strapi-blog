import React from "react";

export const CommentsList = ({comments}) => {

    return (
        comments.reverse().map((c, i) => (
                <div className="comment_card_container" key={i}>
                    <div className="comment_card_posted_details">
                        <p>{c.attributes.users_permissions_user.data.attributes.username}</p>
                        <span>{c.attributes.createdAt}</span>
                    </div>
                    <div className="comment_card_textarea">
                        <p>{c.attributes.comment_text}</p>
                    </div>
                    <div>
                        Reactions | Reply
                    </div>
                </div>
        ))
    );
};