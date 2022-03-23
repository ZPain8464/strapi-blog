import React, { useState, useContext } from "react";
import Cookies from "universal-cookie";
import qs from "qs";
import { useParams } from "react-router-dom";

import { ArticleContext } from "../Articles/Article";

export const CreateComment = ({comments, setComments, setShowComponent}) => {
    
    const [commentText, setCommentText] = useState("");

    const params = useParams();
    const articles = useContext(ArticleContext);
    const cookies = new Cookies();
    const username = cookies.get("username");
    const token = cookies.get("token");
    const id = cookies.get("id");

    const postComment = async () => {
        const filterArticle = articles.filter(a => {
            return a.id.toString() === params.id;
        });
        const articleId = filterArticle[0].id;

        const request = await fetch(`http://localhost:1337/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    data: {
                        comment_text: commentText,
                        article: {
                            id: articleId
                        },
                        users_permissions_user: {
                            id: id
                        }
                    }
                })
        });
        const response = await request.json();
        const newCommentId = response.data.id;
        
        // Fetch new comment by ID 
        const query = qs.stringify({
            populate: ['article', 'users_permissions_user'], 
          }, {
            encodeValuesOnly: true,
          });
        const newCommentDataRequest = await fetch(`http://localhost:1337/api/comments/${newCommentId}?${query}`);
        const newComment = await newCommentDataRequest.json();
        
        setComments([...comments, newComment.data]);
        setShowComponent((prevShowComponent) => !prevShowComponent);
        setCommentText("");
    }

    return (
        <>
            <div className="create_comment_card_details">
                <p>{username}</p>
                <span>date</span>
            </div>
            <div className="create_comment_textarea">
                <textarea 
                    value={commentText} 
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Start typing..."></textarea>
            </div>
            <div className="create_comment_post_button_container">
                <button 
                    className="create_comment_post_button"
                    onClick={postComment}
                    >
                    Post
                </button>
            </div>
        </>
    )
}