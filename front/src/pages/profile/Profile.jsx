import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import FeedProf from "../../components/feedprof/FeedProf";
import Rightbar from "../../components/rightbar/Rightbar";
import APIService from "../../APIService";
import React, { useState, useEffect } from "react";
import coverPH from "../../images/cover.jpg";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [program, setProgram] = useState("");
  const [course, setCourse] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");

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
      if (resp.program) {
        setProgram(resp.program);
      }
      if (resp.course) {
        setCourse(resp.course);
      }
      if (resp.status) {
        setStatus(resp.status);
      }

      if (status === "Student") {
        setBio(program + " Student | Year - " + course);
      } else {
        setBio(status);
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
              <img className="profileCoverImg" src={coverPH} alt="" />
              <img className="profileUserImg" src={profilePicture} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">
                {name} {lastname}
              </h4>
              <span className="profileInfoDesc">{bio}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <FeedProf indicator={username} />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
