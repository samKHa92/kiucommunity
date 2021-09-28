import "./reply.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import tick from "../../images/tick.png";
import APIService from "../../APIService";

export default function Reply(props) {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("undefined");
  const [username, setUsername] = useState(props.username);
  const [parsedData, setParsedData] = useState(false);

  const [token, setToken, removeToken] = useCookies(
    ["mytoken"],
    ["usernametoken"],
    ["nametoken"]
  );
  const [labelText, setLabelText] = useState(
    "Comment here, " + token["nametoken"]
  );
  let history = useHistory();

  //   if (!parsedData) {
  //     setParsedData(true);
  //     APIService.GetUserData(token["usernametoken"]).then((resp) => {
  //       setProg(resp.program);
  //       setGng(resp.gang);
  //     });
  //   }

  function AddCommentBtnClicked() {
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
    data.append("post_id", props.pid);
    data.append("text", postText);
    // data.append("date_posted", String(datetime));
    console.log(data);
    if (postImage !== "undefined") {
      data.append("image1", postImage, postImage.name);
    }
    fetch("http://localhost:8000/comments/", {
      method: "POST",
      body: data,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    history.go(0);
  }

  return (
    <div className="reply" hidden={!props.isauth}>
      <div className="replyWrapper">
        <div className="shareTop">
          <img className="replyProfileImg" src={props.profilepic} alt="" />
          <input
            placeholder={labelText}
            className="shareInput"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button className="commentButton" onClick={AddCommentBtnClicked}>
            Comment
          </button>
        </div>
        {/* <hr className="shareHr" />
        <div className="shareBottom"></div> */}
      </div>
    </div>
  );
}
