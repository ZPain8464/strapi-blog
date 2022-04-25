import React, { useEffect, useState } from "react";
import qs from "qs";
import { useParams } from "react-router-dom";

import {CommentCard} from "./CommentCard";
import { CreateComment } from "./CreateComment";

import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi
} from '../api.js'

export const CommentsContainer = () => {

    const [comments, setComments] = useState([]);
    const [showComponent, setShowComponent] = useState(false);
    
    useEffect(() => {
        const fetchComments = async () => {
            const query = qs.stringify({
                populate: ['article', 'users_permissions_user'], 
              }, {
                encodeValuesOnly: true,
              });
            const response = await fetch(`http://localhost:1337/api/comments?${query}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            const commentsArr = data.data;
            setComments(commentsArr);
          };
          
          fetchComments();

      }, []);

      const toggleComponent = () => {
        setShowComponent((prevShowComponent) => !prevShowComponent);
    }

    // Filter comments from comments state
    const params = useParams();
    const filterBlogComments = comments.filter(c => {
    return c.attributes.article.data.id.toString() === params.id
    });
    const commentCount = filterBlogComments;

    return (
        <div className="comments_container">
            <div className="comments_header">
                {commentCount.length > 0 
                ? <h3>Comments ({commentCount.length})</h3>
                : ""
                }
                <button 
                    className="comment_button"
                    onClick={toggleComponent}
                    >
                    + Write a Comment
                </button>
            </div>
            <div className={showComponent ? `create_comment_container` : 'hidden'}>
                <CreateComment 
                    comments={comments}
                    setComments={setComments}
                    setShowComponent={setShowComponent}/>
            </div>
            {commentCount.length > 0 && 
            filterBlogComments.reverse().map((c, i) => (
                <React.Fragment key={i}>
                    <CommentCard 
                        comments={filterBlogComments}
                        setComments={setComments}
                        username={c.attributes.users_permissions_user.data.attributes.username}
                        cardId={i}
                        commentId={c.id}
                        createdAt={c.attributes.createdAt}
                        commentText={c.attributes.comment_text}
                        strapiUId={c.attributes.users_permissions_user.data.id}
                    />
                </React.Fragment>   
            ))
            }
        </div>
    );
};