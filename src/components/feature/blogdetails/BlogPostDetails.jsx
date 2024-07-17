import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const BlogPostDetails = ({ posts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts[id];

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="container blog-post-details">
      <button className="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>{post.title}</h1>
      <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
      {post.urlToImage && <img src={post.urlToImage} alt={post.title} />}
      <div className="post-content">{post.content}</div>
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
};

export default BlogPostDetails;
