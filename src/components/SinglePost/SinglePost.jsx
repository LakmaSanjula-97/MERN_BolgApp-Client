import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./singlepost.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPosts] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const PF = "http://localhost:5000/images/"

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/post/" + path);
      setPosts(res.data);
      setTitle(res.data.title);
      setCategories(res.data.categories);
      setDesc(res.data.desc);
    };
    getPost()
  }, [path])
  
  const handleDelete = async () => {
    try {
      await axios.delete(`/post/${post._id}`, {
        data:{username: user.username},
      });
      window.location.replace("/");
    } catch (error) {
      
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/post/${post._id}`, {
          username: user.username,
          title,
          categories,
          desc,
      });
      //window.location.reload();
      setUpdateMode(false);
    } catch (error) {
      
    }
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="singlePostEditInput"
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-regular fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author :{" "}
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlepostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <span className="PostCatInfo">Category : </span>
        {updateMode ? (
          <input
            className="singlePostCatInput"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        ) : (
          <p className="singlePostCat">{categories}</p>
        )}

        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
