import React from "react";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";

const Articles = ({props}) => {
    const articles = props;
    const params = useParams();
    const filterArticles = articles.filter(a => {
        return a.attributes.category.data.attributes.category_name === params.id
        });
    return (
        <>  
            
            {params.id ? filterArticles.map((a,i) => (
                <div key={i} className="article_card_container">
                <Link to={`/article/${a.id}`}>
                    <h2>{a.attributes.title}</h2>
                    <div className="article_card">
                        <img alt='' src={`http://localhost:1337${a.attributes.image.data.attributes.formats.small.url}`} />
                    </div>
                </Link>
                </div>
            ))
            :
            articles.map((a, i) => (
                <div key={i} className="article_card_container">
                <Link to={`/article/${a.id}`}>
                        <h2>{a.attributes.title}</h2>
                        <div className="article_card">
                            <img alt="" src={`http://localhost:1337${a.attributes.image.data.attributes.formats.small.url}`} />
                        </div>
                </Link>
                </div>
            ))
            }
        </>
    )
}

export default Articles;