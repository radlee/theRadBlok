import React, { useEffect } from "react";
import "./../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddNewBlog, GetBlogById, UpdateBlog } from "../../apicalls/blogs";
import { toast } from "react-hot-toast";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useNavigate, useParams } from "react-router-dom";

function AddEditBlog() {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blog, setBlog] = React.useState({
    title: "",
    content: '',
    description: "",
    file: "",
    canShare: false,
    canComment: false,
    canLike: false,
  });

  const onSave = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('content', blog.content);
      formData.append('description', blog.description);
      formData.append('user', currentUser._id);
      formData.append('file', blog.file);  // Use 'file' as the key
      console.log(" First --  Form Data ----- ", formData);
      let response = null;
      if (params.id) {
        formData.append('_id', params.id);
        response = await UpdateBlog(formData);
      } else {
        response = await AddNewBlog(formData);
      }

      console.log("After ---  Form Data ----- ", formData);
  
      if (response.success) {
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBlogById(params.id);
      if (response.success) {
        setBlog({
          ...response.data,
          content: EditorState.createWithContent(
            convertFromRaw(JSON.parse(response.data.content))
          ),
        });
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
    if(params.id)
    {
      getData(); 
    }
    // eslint-disable-next-line
  }, []); 

  return (

    <div>
      <div className="flex justify-between">
        <h1 className="text-primary uppercase text-2xl font-bold">
          {params.id ? "Edit Blog" : "Add New Blog"}
        </h1>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <input
          type="text"
          placeholder="Title"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />
        <input
          type="file"
          name="file"
          onChange={(e) => setBlog({ ...blog, file: e.target.files[0] })}
        />
        <textarea
          placeholder="Description"
          value={blog.description}
          onChange={(e) => setBlog({ ...blog, description: e.target.value })}
          rows={5}
        />

        <div>
          <p className="text-red warning"><em>Please upload Images less that 50MB</em></p>
          <br />
          <Editor
            toolbarStyle={{
              border: "1px solid #ccc",
              zIndex: 1000,
            }}
    
            editorStyle={{
              border: "1px solid #ccc",
              lineHeight: '75%',
              minHeight: "200px",
              padding: "10px",
              
            }}

            editorState={blog.content}
            onEditorStateChange={(content) =>
              setBlog({ ...blog, content: content })
            }
           
          />
        </div>

        <div className="flex gap-5">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={blog.canShare}
              onChange={(e) => setBlog({ ...blog, canShare: e.target.checked })}
            />

            <h1>Can Share ?</h1>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={blog.canComment}
              onChange={(e) =>
                setBlog({ ...blog, canComment: e.target.checked })
              }
            />

            <h1>Can Comment ?</h1>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={blog.canLike}
              onChange={(e) => setBlog({ ...blog, canLike: e.target.checked })}
            />

            <h1>Can Like ?</h1>
          </div>
        </div>

        <div className="flex justify-end gap-5">
          <Button title="Cancel" variant="primary-outlined"/>
          <Button title="Save" onClick={onSave} />
        </div>
      </div>
    </div>
  );
}

export default AddEditBlog;
