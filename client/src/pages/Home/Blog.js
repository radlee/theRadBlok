import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Blog({ blog }) {
  console.log("Blogger ", blog.content.data)
  const { currentUser } = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  return (
    <div className="container">



{/* <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
    <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Welcome</CardTitle>
    <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Mauris sagittis pellentesque lacus eleifend lacinia...
    </CardText>
    <CardActions border>
        <Button colored>Get Started</Button>
    </CardActions>
    <CardMenu style={{color: '#fff'}}>
        <IconButton name="share" />
    </CardMenu>
</Card> */}




    <div
      className="border shadow p-5 flex space-x-4 flex-col gap-3 cursor-pointer "
      onClick={() => {
        navigate(`/blog-desc/${blog._id}`);
      }}
    >

      <div className="description border-b-4  border-red">
        <h1 className="text-black text-xl font-bold">{blog.title}</h1>
      </div>
      <hr />
      <p className="font-bold desc">{blog.description}</p>
      <hr />

      <div className="flex justify-between items-center">
      
        <div class="flex items-center space-x-4">
    
    <div class="font-medium dark:text-white">
        <div>{blog.user.name}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{moment(blog.createdAt).fromNow()}</div>
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
