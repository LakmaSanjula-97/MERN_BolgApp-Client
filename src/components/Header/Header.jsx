import "./header.css";
import image from "../../Assests/home-banner.jpg";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">
          Unleash Your Words, Share Your World ...
        </span>
        <span className="headerTitleLg">WRITEWAVE</span>
      </div>
      <img className="headerImg" src={image} alt="" />
    </div>
  );
}
