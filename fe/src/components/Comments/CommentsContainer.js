import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ArticleContext } from "../Articles/Article";
import Cookies from "universal-cookie";

import {CommentCard} from "./CommentCard";
import { CreateComment } from "./CreateComment";

import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi,
} from "../../utils/api";

export const CommentsContainer = () => {

    const [comments, setComments] = useState([]);
    const [showComponent, setShowComponent] = useState(false);
    const [activeComment, setActiveComment] = useState(null);
    
    useEffect(() => {
         getCommentsApi().then((commentsArr) => {
            setComments(commentsArr);
         });
      }, []);

    const articles = useContext(ArticleContext);
    const cookies = new Cookies();
    const token = cookies.get("token");
    const id = cookies.get("id");

      const toggleComponent = () => {
        setShowComponent((prevShowComponent) => !prevShowComponent);
    };

    const addComment = (commentText, articleId, userId) => {
        const filterArticle = articles.filter(a => {
            return a.id.toString() === params.id;
        });
        articleId = filterArticle[0].id;
        userId = id;
        createCommentApi(commentText, articleId, userId, token).then((newComment) => {
            setComments([...comments, newComment.data]);
        });
    };

    const editComment = async (commentText, commentId, articleId, userId, token) => {
        updateCommentApi(commentText, commentId, articleId, userId, token).then((newComments) => {
            setComments(newComments);
            setActiveComment(null);
        })
    };

    const deleteComment = async (commentId, token) => {
        deleteCommentApi(commentId, token).then((response) => {
            console.log(response);
            const updatedComments = comments.filter(
                (comment) => comment.id !== commentId
            );
        setComments(updatedComments);
        });
    };

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
                    className={id ? "comment_button" : "hidden"}
                    onClick={toggleComponent}
                    >
                    + Write a Comment
                </button>
            </div>
            <div className={showComponent ? `comment_card_container` : 'hidden'}>
                <CreateComment 
                    isNewComment
                    showEditButton
                    setShowEditButton
                    handleComment={addComment}
                    setShowComponent={setShowComponent}
                    toggleComponent={toggleComponent}
                />
            </div>
            {commentCount.length > 0 && 
            filterBlogComments.reverse().map((c, i) => (
                <React.Fragment key={i}>
                    <CommentCard 
                        comment={c}
                        setComments={setComments}
                        username={c.attributes.users_permissions_user.data.attributes.username}
                        cardId={i}
                        commentId={c.id}
                        createdAt={c.attributes.createdAt}
                        commentText={c.attributes.comment_text}
                        strapiUId={c.attributes.users_permissions_user.data.id}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        editComment={editComment}
                        deleteComment={deleteComment}
                        
                    />
                </React.Fragment>   
            ))
            }
        </div>
    );
};