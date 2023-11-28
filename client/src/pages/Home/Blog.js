import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Blog({ blog }) {
  const navigate = useNavigate();
  console.log('Image URL:', `http://localhost:3000/uploads/${blog.file}`);
  // Use window.location.protocol to get the current protocol (http or https)
  const currentProtocol = window.location.protocol;
  const imageUrl = `${currentProtocol}//localhost:3000/uploads/${blog.file}`;

// Then use imageUrl in your <img> tag
  return (
    <div className="container">


    <div
      className="border shadow p-5 flex space-x-4 flex-col gap-3 cursor-pointer "
      onClick={() => {
        navigate(`/blog-desc/${blog._id}`);
      }}
    >

      <div className="description border-b-4  border-red">
        <h1 className="text-black text-xl font-bold">{blog.title}</h1>
      </div>
      
      <img src={imageUrl} alt="Current Image" style={{ maxWidth: '100%', height: 'auto' }} />


      <hr />
      <p className="font-bold desc">{blog.description}</p>
      <hr />

      <div className="flex justify-between items-center">
      
        <div className="flex items-center space-x-4">
    
    <div className="font-medium">
        <div className="dark:text-primary">{blog.user.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {moment(blog.createdAt).fromNow()}
          <br />
          <br />
          <p className="read"><em><strong>Read More...</strong></em></p>
        </div>
    </div>
</div>

        <div className="flex gap-5 items-center">
          <div className="flex gap-1 items-center">
            <i className="ri-heart-line"></i>
            <span>{blog.likesCount}</span>
          </div>
          <div className="flex gap-1 items-center">
            <i className="ri-chat-1-line"></i>
            <span>{blog.commentsCount}</span>
          </div>
          <div className="flex gap-1 items-center">
            <i className="ri-share-forward-line"></i>
            <span>{blog.sharesCount}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Blog;
