import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import tick from "../../images/tick.png";

export default function Share(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [isPPup, setIsPPup] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("undefined");
  const [username, setUsername] = useState(props.username);

  const [token, setToken, removeToken] = useCookies(
    ["mytoken"],
    ["usernametoken"],
    ["nametoken"]
  );
  const [labelText, setLabelText] = useState(
    "What's on your mind, " + token["nametoken"] + "?"
  );
  let history = useHistory();
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
    data.append("gang", "None");
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
          <button className="shareButton" onClick={AddPostBtnClicked}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
