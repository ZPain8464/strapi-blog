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
                    <div className="comment_card_actions_container">
                        <div className="comment_card_actions_buttons">
                            Reply | Like | <button className="edit_comment_button">Edit</button>
                        </div>
                        
                    </div>
                </div>
        ))
    );
};