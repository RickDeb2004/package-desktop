import React from "react";
import {getArticles} from '../../helper/controller'

export default function News() {
    const [articles, setArticles] = React.useState([]);
    React.useEffect(() => {
        getArticles((data) => {
        // console.log(Object.values(data));
        setArticles(Object.values(data));
        });
    }, []);
    return (
        <div>
        {articles.map((article) => (
            <div key={article.articleId}>
            <h1>{article.heading}</h1>
            <p>{article.publisher}</p>
            <p>{article.date}</p>
            <p>{article.file}</p>
            <p>{article.category}</p>
            </div>
        ))}
        This is the news component
        </div>
    );
    }