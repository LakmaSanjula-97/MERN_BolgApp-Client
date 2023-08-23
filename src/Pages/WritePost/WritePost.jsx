import { useState } from "react";
import "./writePost.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {}
    }

    try {
      const res = await axios.post("/post/", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };

  return (
    <div className="writepost">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus" title="Add Image"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            type="text"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            className="writeCategory"
            type="text"
            placeholder="Category"
            autoFocus={true}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Write Your Article..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
