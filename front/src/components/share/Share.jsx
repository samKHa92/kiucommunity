import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import APIService from "../../APIService";
import { useHistory } from "react-router-dom";

export default function Share(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken, removeToken] = useCookies(
    ["mytoken"],
    ["usernametoken"],
    ["nametoken"]
  );
  const [labelText, setLabelText] = useState(
    "What's on your mind, " + token["nametoken"] + "?"
  );

  return (
    <div className="share" hidden={!props.isauth}>
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={props.profilepic} alt="" />
          <input placeholder={labelText} className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Post</button>
        </div>
      </div>
    </div>
  );
}
