import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import APIService from "../../APIService";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Profile(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  APIService.GetUserData(props.match.params.username)
    .then((resp) => {
      if (resp.name) {
        setName(resp.name);
      }
      if (resp.lastname) {
        setLastName(resp.lastname);
      }
      if (resp.username) {
        setUsername(resp.username);
        console.log(username);
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
    })
    .catch((error) => console.log(error));
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src="" alt="" />
              <img className="profileUserImg" src={profilePicture} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">
                {name} {lastname}
              </h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
