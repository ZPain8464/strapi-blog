import React from "react";
import Articles from "./Articles";


const ArticlesContainer = ({props}) => {
    return (
        <>
        <div className="articles_container">
            <div className="articles_container_header">
                <h1>Catch the Latest:</h1>
            </div>
            <div className="articles_list">
                <Articles props={props}/>
            </div>
        </div>
        </>
    )
}

export default ArticlesContainer;