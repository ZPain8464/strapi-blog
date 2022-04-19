import React from "react";
import {CommentCard} from "./CommentCard";


export const CommentsList = ({ comments }) => {
   
    return (
        comments.reverse().map((c, i) => (
                <CommentCard 
                    username={c.attributes.users_permissions_user.data.attributes.username}
                    cardId={i}
                    commentId={c.id}
                    createdAt={c.attributes.createdAt}
                    commentText={c.attributes.comment_text}
                    strapiUId={c.attributes.users_permissions_user.data.id}
                />
        ))
    );
};