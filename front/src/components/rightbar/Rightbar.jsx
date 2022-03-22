import "./rightbar.css";
import { useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const imgdir =
      "http://localhost:8000/media/slider/" +
      String(getRndInteger(1, 12)) +
      ".jpeg";

    const link1 = "http://localhost:8000/media/links/link1.png";
    const link2 = "http://localhost:8000/media/links/link2.png";

    console.log(imgdir);
    // let history = History();
    // function goLink(x) {
    //   if (x === 1)
    //   history.push("https://www.kiu.edu.ge/index.php?m=205&news_id=163&lng=eng")
    // }
    return (
      <>
        <div className="birthdayContainer">
          {/* <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span> */}
          <h2>Get Vaccinated!</h2>
        </div>
        <img className="rightbarAd" src={imgdir} alt="" />
        <h4 className="rightbarTitle">Activity News</h4>
        <a
          href="https://www.kiu.edu.ge/index.php?m=205&news_id=163&lng=eng"
          target="_blank"
        >
          <img className="rightbarLink" src={link1} alt="" />
        </a>

        <p className="activities-p">
          2021-2022 Fall Semester at KIU Starts on September 20
        </p>
        <br />
        <hr />
        <a
          href="https://www.kiu.edu.ge/index.php?m=205&news_id=161&lng=eng"
          target="_blank"
        >
          <img className="rightbarLink" src={link2} alt="" />
        </a>

        <p className="activities-p">
          Kutaisi International University is one most in-demand universities in
          Georgia
        </p>
        <br />
        <hr />
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {/* {profile ? <ProfileRightbar /> : <HomeRightbar />} */}
        <HomeRightbar />
      </div>
    </div>
  );
}
