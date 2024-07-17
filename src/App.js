import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogPostList from "./components/feature/bloglist/BlogPostList";
import BlogPostDetails from "./components/feature/blogdetails/BlogPostDetails";
import axiosInstanceAuth from "./components/hooks/axiosinstance";
import { apiKey } from "./components/config/configJson";
  
function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstanceAuth.get(
          `/everything?q=blog&pageSize=100&apiKey=${apiKey}`
        );
        setPosts(response.data.articles);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogPostList />} />
        <Route path="/post/:id" element={<BlogPostDetails posts={posts} />} />
      </Routes>
    </Router>
  );
}

export default App;
