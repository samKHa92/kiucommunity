import "./register.css";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { useState, React, useEffect } from "react";
import { useHistory } from "react-router-dom";
import APIService from "../../APIService";
import tick from "../../images/tick.png";
import { PermMedia } from "@material-ui/icons";
import { useCookies } from "react-cookie";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [badge_id, setBadge] = useState("");
  const [course, setYear] = useState("");
  const [program, setProgram] = useState("None");
  const [status, setStatus] = useState("");
  const [profile_picture, setProfilePic] = useState("undefined");

  const [checkedCS, setCheckedCS] = useState(false);
  const [checkedMT, setCheckedMT] = useState(false);
  const [checkedMA, setCheckedMA] = useState(false);

  const [checkedStudent, setCheckedStudent] = useState(true);
  const [checkedStaff, setCheckedStaff] = useState(false);

  const [token, setToken, removeToken] = useCookies(
    ["mytoken"],
    ["usernametoken"],
    ["nametoken"],
    ["profilepictoken"]
  );
  let history = useHistory();

  const handleChangeCS = () => {
    setProgram("Computer Science");
    setCheckedCS(!checkedCS);
    setCheckedMT(false);
    setCheckedMA(false);
  };

  const handleChangeMT = () => {
    setProgram("Mathematics");
    setCheckedCS(false);
    setCheckedMT(!checkedMT);
    setCheckedMA(false);
  };

  const handleChangeMA = () => {
    setProgram("Management");
    setCheckedCS(false);
    setCheckedMT(false);
    setCheckedMA(!checkedMA);
  };

  const handleChangeStudent = () => {
    setStatus("Student");
    setCheckedStudent(!checkedStudent);
    setCheckedStaff(false);
  };

  const handleChangeStaff = () => {
    setCheckedStudent(false);
    setCheckedStaff(!checkedStaff);
    setYear("0");
    if (checkedStaff) {
      setStatus("");
    }
  };

  function LoginBtnClicked() {
    history.push("/login");
  }

  // const uploadImage = async (e) => {
  //   const files = e.target.files;
  //   const file = JSON.stringify(files[0]);
  //   console.log(files[0]);
  //   setProfilePic(files[0]);
  // };

  function RegisterBtnClicked() {
    const data = new FormData();
    let gang = "None";
    let notfication_quantity = 0;
    let message_quantity = 0;
    if (checkedStaff) {
      setProgram("None");
    }
    data.append("gang", gang);
    data.append("notfication_quantity", notfication_quantity);
    data.append("message_quantity", message_quantity);
    data.append("username", username);
    data.append("name", name);
    data.append("lastname", lastname);
    data.append("password", password);
    data.append("mobile", mobile);
    data.append("email", email);
    data.append("badge_id", badge_id);
    data.append("room", room);
    data.append("course", course);
    data.append("status", status);
    data.append("program", program);
    data.append("profile_picture", profile_picture, profile_picture.name);

    fetch("http://localhost:8000/users/", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201 || res.status === 200) {
          history.push("/login");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">KIU Community</h3>
          <span className="registerDesc">
            Connect with friends and on KIU Community.
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input
              placeholder="Username"
              className="registerInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Name"
              className="registerInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Lastname"
              className="registerInput"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              placeholder="KIU Email"
              className="registerInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Mobile Number"
              className="registerInput"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              className="registerInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Password Again"
              type="password"
              className="registerInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              Type "None" in Room textbox, if you do not live in KIU dorms.
            </label>
            <div className="resgisterSmallInputs">
              <input
                placeholder="Badge ID (Example: 0099)"
                className="registerSmallInput"
                value={badge_id}
                onChange={(e) => setBadge(e.target.value)}
              />
              <input
                placeholder="Room (Example: E111)"
                className="registerSmallInput"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
              <input
                hidden={checkedStaff}
                placeholder="Academic Year (Example: 4)"
                className="registerSmallInput"
                value={course}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <br />
            <hr />
            <div className="registerBottom">
              <div className="registerBottomLeft" hidden={checkedStaff}>
                <label>Program: </label>
                <br />
                <div className="registerCheckbox">
                  <input
                    type="checkbox"
                    checked={checkedCS}
                    onChange={handleChangeCS}
                  />
                  <label> Computer Science</label>
                </div>
                <div className="registerCheckbox">
                  <input
                    type="checkbox"
                    checked={checkedMT}
                    onChange={handleChangeMT}
                  />
                  <label> Mathematics</label>
                </div>
                <div className="registerCheckbox">
                  <input
                    type="checkbox"
                    checked={checkedMA}
                    onChange={handleChangeMA}
                  />
                  <label> Management</label>
                </div>
              </div>
              <div className="registerBottomMid">
                <br />
                <br />
              </div>
              <div className="registerBottomRight">
                <label>Status: </label>
                <br />
                <div className="registerCheckbox">
                  <input
                    type="checkbox"
                    checked={checkedStudent}
                    onChange={handleChangeStudent}
                  />
                  <label> KIU Student</label>
                </div>
                <div className="registerCheckbox">
                  <input
                    type="checkbox"
                    checked={checkedStaff}
                    onChange={handleChangeStaff}
                  />
                  <label> KIU Staff</label>
                </div>
                <input
                  hidden={!checkedStaff}
                  placeholder="Title (Example: Lecturer)"
                  className="registerVerySmallInput"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            </div>
            <label className="custom-file-upload">
              <input
                type="file"
                onChange={(evt) => setProfilePic(evt.target.files[0])}
              />
              <PermMedia htmlColor="tomato" className="shareIcon" /> Add Profile
              Picture
              <label> </label>
              <img
                className="tickImage"
                hidden={profile_picture === "undefined"}
                src={tick}
              />
            </label>
            <button className="registerButton" onClick={RegisterBtnClicked}>
              Sign Up
            </button>
            <button
              className="registerRegisterButton"
              onClick={LoginBtnClicked}
            >
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
