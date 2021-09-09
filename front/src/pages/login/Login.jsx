import "./login.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import APIService from "../../APIService";

export default function Login() {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken, removeToken] = useCookies(
    ["mytoken"],
    ["usernametoken"],
    ["nametoken"]
  );
  let history = useHistory();
  useEffect(() => {
    if (token["usernametoken"]) {
      // history.push(`/profile/${token["usernametoken"]}`);
      history.push("/profile/" + username);
    }
  }, [token]);

  const LoginBtnClicked = () => {
    APIService.LoginUser({ username, password })
      .then((resp) => {
        console.log(resp);
        if (resp.token) {
          setToken("mytoken", resp.token);
        }
      })
      .catch((error) => console.log(error));
    APIService.GetUserData(username)
      .then((resp) => {
        console.log(resp);
        if (resp.username) {
          setToken("usernametoken", resp.username);
        }
        if (resp.name) {
          setToken("nametoken", resp.name);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">KIU Community</h3>
          <span className="loginDesc">
            Connect with friends and on KIU Community.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              onKeyDown={LoginBtnClicked}
              placeholder="Username"
              className="loginInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              onKeyDown={LoginBtnClicked}
              type="password"
              placeholder="Password"
              className="loginInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" onClick={LoginBtnClicked}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}