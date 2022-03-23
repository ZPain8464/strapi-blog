import React, { createContext } from "react";
import { useParams } from "react-router-dom";

import { CommentsContainer } from "../Comments/CommentsContainer";

export const ArticleContext = createContext();

const Article = ({props}) => {

    const articles = props;
    const params = useParams();
    // Filter article form articles prop
    const filterArticle = articles.filter(a => {
        return a.id.toString() === params.id
        });
    const blogPost = filterArticle;
    
    return (
        <>
        <ArticleContext.Provider value={articles}>
        {params.id && blogPost.map((b, i) => (
            <div key={i} className="post">
            <h1>{b.attributes.title}</h1>
                <div>
                    <p>{b.attributes.author}</p>
                    <span>{b.attributes.createdAt}</span>
                </div>
                <div className="post_image_container">
                    <img alt="" className="post_image" src={`http://localhost:1337${b.attributes.image.data.attributes.url}`} />
                </div>
                <div className="post_content_container">
                    <p>{b.attributes.content}</p>
                </div>
                <hr/>
                <CommentsContainer />
            </div>
        )) 
        }   
        </ArticleContext.Provider>
        </>
    )
}

export default Article;