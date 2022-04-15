import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import qs from "qs";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

import Nav from "./components/Nav";
import ArticlesContainer from "./components/Articles/ArticlesContainer";
import Articles from "./components/Articles/Articles"
import Article from "./components/Articles/Article";
import SignUp from "./components/Auth/SignUp";
import SidebarContainer from "./components/Sidebar/SidebarContainer";

const App = () => {

  let [categories, setCategories] = useState([]);
  let [articles, setArticles] = useState([]);
  let [chatClient, setChatClient] = useState(null);

  const cookies = new Cookies();
  const streamToken = cookies.get("streamToken");
  const userName = cookies.get("username");

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
    const initChat = async () => {
      const chatClient = await StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);
      await chatClient.connectUser({
        id: userName,
        name: userName
      },
      streamToken
      );
      // await chatClient.setGuestUser({
      //   id: userName,
      // });
      setChatClient(chatClient);
      }
    
      initChat();

    fetchCategories();
    fetchArticles();
    
  }, []);

  if (!chatClient) {
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
  
    return (
      <>
      <Chat client={chatClient}>
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
      </Chat>
      </>
    );
}

export default App;