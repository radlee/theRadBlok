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
      <h1 className="font-black text-center border-l-8 heading border-primary">< span className="rad">rad</span>Blok</h1>
      <br />
  
      <p className="text-center text-primary text-5xl"><span className="para" contenteditable="true"> Blogger's Republic</span></p>

      
      <Button
          title="Add Blog"
          variant="primary-outlined"
          onClick={() => navigate("/add-blog")}
        />

      <div className="grid lg:grid-cols-3 xl:grid-cols-2 gap-5 mt-5 sm:grid-cols-1 xs:grid-cols-1">
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
