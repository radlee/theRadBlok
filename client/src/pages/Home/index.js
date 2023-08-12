import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { toast } from "react-hot-toast";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllBlogs } from "../../apicalls/blogs";
import Blog from "./Blog";
import { Pagination } from 'antd';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(6);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBlogs();
      if (response.success) {
        setBlogs(response.data);
        setTotal(response.data.length)
      } else {
        toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const indexOfLastPage = page * blogsPerPage;
  const indexOfFirstPage = indexOfLastPage - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPage, indexOfLastPage);

  const onShowSizeChange = (current, pageSize) => {
    setBlogsPerPage(pageSize);
  }

  const itemRender = (current, type, originalElement) => {
    if(type === 'prev') {
      return <a  href="/#">Previous</a>
    }
    if(type === 'next') {
      return <a href="/#">Next</a>
    }

    return originalElement;
  }

  return (
    
    <div>
      

      <br />

      <br />
      <br />
      <h1 className="font-black text-center border-l-8  border-primary"><span className="heading"> "Blogger's Republic: Where Words Shape Worlds" </span></h1>
      <br />
      <br />
      <p className="text-center text-primary text-5xl"><span className="para"> Unleash Your Creativity, Fuel the Discourse – Your Online Oasis for Crafting and Sharing Written Content.</span></p>
      <br />
      <p className="text-center text-primary text-5xl"><span className="paragraph"> Embark on a literary journey like no other with Blogger's Republic, a dynamic online haven where your words become the architects of new realities. Fuel your creative fire and let your ideas take flight in this digital realm dedicated to the art of expression. Whether you're a seasoned wordsmith or a budding scribe, Blogger's Republic empowers you to curate, captivate, and collaborate, forging connections that transcend boundaries. Join the movement that celebrates the power of the written word – your passport to a thriving community where thoughts converge, stories flourish, and the echoes of minds resonate. Welcome to a republic where imagination knows no bounds, and every keystroke paves the way for a brighter, more eloquent tomorrow
</span></p>
      <br />

      <hr />

      <br />
      <br />

      
      <Button
          title="Add Blog"
          variant="primary-outlined"
          onClick={() => navigate("/add-blog")}
        />

      <div className="grid lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5 sm:grid-cols-1 xs:grid-cols-1">
        {currentBlogs.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
      <hr />
      <br />
      <Pagination 
        onChange={(value) => setPage(value)}
        pageSize={blogsPerPage}
        total={total}
        current={page}
        showSizeChanger
        showQuickJumper
        onShowSizeChange={onShowSizeChange}
        itemRender={itemRender}
      />
      <br />
      <hr />
    </div>
  );
}

export default Home;
