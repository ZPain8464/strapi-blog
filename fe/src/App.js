import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import qs from "qs";

import Nav from "./components/Nav";
import ArticlesContainer from "./components/Articles/ArticlesContainer";
import Articles from "./components/Articles/Articles"
import Article from "./components/Articles/Article";
import SignUp from "./components/Auth/SignUp";
import SidebarContainer from "./components/Sidebar/SidebarContainer";

const App = () => {

  let [categories, setCategories] = useState([]);
  let [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`http://localhost:1337/api/categories?populate`);
      const data = await response.json();
      const categoriesArr = data.data;
      setCategories(categoriesArr);
    }
    const fetchArticles = async () => {
      const query = qs.stringify({
        populate: ['category', 'image'], 
      }, {
        encodeValuesOnly: true,
      });
      const response = await fetch(`http://localhost:1337/api/articles?${query}`);
      const data = await response.json();
      const articlesArr = data.data;
      setArticles(articlesArr);
    }

    fetchCategories();
    fetchArticles();
    
  }, []);


  
  return (
    <>
      <Nav props={categories}/>
      <div className="main">
        <SidebarContainer />
          <Routes>
              <Route path="/" element={<ArticlesContainer props={articles} />} >
                <Route path="category/:id" element={<Articles  props={articles}/>} />
              </Route>
              <Route path="article/:id" element={<Article props={articles} />}/>
              <Route path="signup" element={<SignUp />}/>
          </Routes>
      </div>
    </>
  );
}

export default App;