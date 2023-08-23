import { useEffect, useState } from "react";
import "./sideBar.css";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function SideBar() {

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/category")
      setCategory(res.data);
    };
    getCategory();
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT </span>
        <img
          className="sidebarImg"
          src="https://c1.wallpaperflare.com/preview/168/515/807/camera-canon-girl-lens.jpg"
          alt=""
        />
        <p>
          Discover a new way to express yourself with our innovative online blog
          application. Seamlessly write, edit, and publish captivating articles
          on topics that matter to you. Connect with a global community of
          like-minded individuals, fostering discussions and insights. Whether
          you're a seasoned writer or just starting your blogging journey, our
          platform offers intuitive tools to craft and share your stories
          effortlessly.
          <br />
          <br />
          Join us and let your thoughts resonate across the digital landscape.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {category.map((c) => (
            <Link to={`/?category=${c.name}`} className="link" key={c._id}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
        </div>
      </div>
    </div>
  );
}
