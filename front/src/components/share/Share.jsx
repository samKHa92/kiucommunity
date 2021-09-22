import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import tick from "../../images/tick.png";
import APIService from "../../APIService";

export default function Share(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [isPPup, setIsPPup] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("undefined");
  const [username, setUsername] = useState(props.username);
  const [parsedData, setParsedData] = useState(false);

  const [checkedCourse, setCheckedCourse] = useState(false);
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedGang, setCheckedGang] = useState(false);
  const [checkedMemes, setCheckedMemes] = useState(false);
  const [prog, setProg] = useState("");
  const [gng, setGng] = useState("");

  const [token, setToken, removeToken] = useCookies(
    ["mytoken"],
    ["usernametoken"],
    ["nametoken"]
  );
  const [labelText, setLabelText] = useState(
    "What's on your mind, " + token["nametoken"] + "?"
  );
  let history = useHistory();

  if (!parsedData) {
    setParsedData(true);
    APIService.GetUserData(token["usernametoken"]).then((resp) => {
      setProg(resp.program);
      setGng(resp.gang);
    });
  }

  function checkAll() {
    if (!checkedAll) setCheckedAll(true);

    setCheckedCourse(false);
    setCheckedMemes(false);
    setCheckedGang(false);
  }
  function checkMemes() {
    setCheckedAll(false);
    setCheckedCourse(false);
    if (!checkedMemes) setCheckedMemes(true);

    setCheckedGang(false);
  }
  function checkGang() {
    setCheckedAll(false);
    setCheckedCourse(false);
    setCheckedMemes(false);
    if (!checkedGang) setCheckedGang(true);
  }
  function checkCourse() {
    setCheckedAll(false);
    if (!checkedCourse) setCheckedCourse(true);
    setCheckedMemes(false);
    setCheckedGang(false);
  }
  function AddPostBtnClicked() {
    const data = new FormData();
    var date = new Date();
    var day = date.getDate();
    if (parseInt(day) < 10) day = "0" + day;
    var month = date.getMonth() + 1;
    if (parseInt(month) < 10) month = "0" + month;
    var hour = date.getHours();
    if (parseInt(hour) < 10) hour = "0" + hour;
    var minute = date.getMinutes();
    if (parseInt(minute) < 10) minute = "0" + minute;
    var datetime =
      day +
      "." +
      month +
      "." +
      date.getFullYear() +
      " | " +
      hour +
      ":" +
      minute;
    data.append("user_id", username);
    data.append("reacts", 0);
    data.append("description", postText);
    if (checkedAll) {
      data.append("gang", "None");
    }
    if (checkedCourse) {
      data.append("gang", prog);
    }
    if (checkedGang) {
      data.append("gang", gng);
    }
    if (checkedMemes) {
      data.append("gang", "memes");
    }
    data.append("date_posted", String(datetime));
    console.log(postImage);
    if (postImage !== "undefined") {
      data.append("image1", postImage, postImage.name);
    }
    fetch("http://localhost:8000/posts/", {
      method: "POST",
      body: data,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    history.go(0);
  }

  return (
    <div className="share" hidden={!props.isauth}>
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={props.profilepic} alt="" />
          <input
            placeholder={labelText}
            className="shareInput"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <label className="custom-file-upload">
                <input
                  type="file"
                  onChange={(evt) => setPostImage(evt.target.files[0])}
                />
                <PermMedia htmlColor="tomato" className="shareIcon" /> Add Photo
                <label> </label>
                <img
                  className="tickImage"
                  hidden={postImage === "undefined"}
                  src={tick}
                />
              </label>
            </div>
          </div>
          <div className="shareBottomMid">
            <div className="shareCheckbox">
              <input type="checkbox" checked={checkedAll} onChange={checkAll} />
              <label> KIU Main Feed</label>
            </div>
            <div className="shareCheckbox">
              <input
                type="checkbox"
                checked={checkedCourse}
                onChange={checkCourse}
              />
              <label> Your Course</label>
            </div>
            <div className="shareCheckbox">
              <input
                type="checkbox"
                checked={checkedGang}
                onChange={checkGang}
              />
              <label> Your Gang</label>
            </div>
            <div className="shareCheckbox">
              <input
                type="checkbox"
                checked={checkedMemes}
                onChange={checkMemes}
              />
              <label> Memes</label>
            </div>
          </div>
          <button className="shareButton" onClick={AddPostBtnClicked}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
