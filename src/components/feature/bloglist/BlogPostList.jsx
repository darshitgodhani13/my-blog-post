import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import axiosInstanceAuth from "../../hooks/axiosinstance";
import { apiKey } from "../../config/configJson";

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstanceAuth.get(
          `/everything?q=blog&page=${currentPage}&pageSize=10&apiKey=${apiKey}`
        );
        setPosts(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / 10));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  console.log(posts);

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      <div className="blog-post-list">
        {posts.map(
          (post, index) =>
            post.author && (
              <div key={index} className="blog-post-item">
                <Link to={`/post/${index}`}>
                  <div className="blog-main-card">
                    <img src={post.urlToImage} alt="" />
                    <h2>{post.title}</h2>
                  </div>
                  <p>{post.description}</p>
                  <p className="post-date">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </Link>
              </div>
            )
        )}
      </div>
      <div>
        <button
          className="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogPostList;
