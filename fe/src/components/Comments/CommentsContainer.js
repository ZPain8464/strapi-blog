import React, { useEffect, useState } from "react";
import qs from "qs";
import { useParams } from "react-router-dom";


import { CommentsList } from "./CommentsList";
import { CreateComment } from "./CreateComment";

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
            <CommentsList comments={filterBlogComments}/>
            }
        </div>
    );
};