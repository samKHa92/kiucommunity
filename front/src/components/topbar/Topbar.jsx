import "./topbar.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useCookies } from "react-cookie";
import APIService from "../../APIService";

export default function Topbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [notfications, setNotfications] = useState("");
  const [messages, setMessages] = useState("");
  const [buttonText, setButtonText] = useState("Log In");
  const [token, setToken, removeToken] = useCookies(
    ["mytoken"],
    ["usernametoken"],
    ["nametoken"]
  );

  let history = useHistory();

  function SignInBtnClicked() {
    history.push("/login");
  }

  useEffect(() => {
    if (token["mytoken"]) {
      setName(token["nametoken"]);
      setUsername(token["usernametoken"]);
      setIsAuth(true);
    }
  }, [token]);

  APIService.GetUserData(token["usernametoken"])
    .then((resp) => {
      if (resp.name) {
        setName(resp.name);
      }
      if (resp.lastname) {
        setLastName(resp.lastname);
      }
      if (resp.username) {
        setUsername(resp.username);
      }
      if (resp.email) {
        setEmail(resp.email);
      }
      if (resp.mobile) {
        setMobile(resp.mobile);
      }
      if (resp.profile_picture) {
        setProfilePicture(resp.profile_picture);
      }
      if (resp.notfication_quantity) {
        setNotfications(resp.notfication_quantity);
        console.log(notfications);
      }
      if (resp.message_quantity) {
        setMessages(resp.message_quantity);
      }
    })
    .catch((error) => console.log(error));

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">KIU Community</span>
      </div>
      {/* <div className="topbarRight3">
        <div className="topbarLinks">
          <span className="topbarLink">KIU feed </span>
          <span className="topbarLink"> Gang feed</span>
        </div>
      </div> */}
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, gang or post"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div> */}
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">{notfications}</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">{messages}</span>
          </div>
        </div>
      </div>
      <div className="topbarRight2">
        <p>{token["usernametoken"]}</p>
        <button
          hidden={isAuth}
          className="btn-login"
          onClick={SignInBtnClicked}
        >
          {buttonText}
        </button>
        <img
          hidden={!isAuth}
          src={profilePicture}
          alt=""
          className="topbarImg"
        />
      </div>
    </div>
  );
}