import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { useState, useEffect } from "react";
import APIService from "../../APIService";
import { useCookies } from "react-cookie";

export default function Home() {
  const [parsedData, setParsedData] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [buttonText, setButtonText] = useState("Log In");
  const [token, setToken, removeToken] = useCookies(
    ["mytoken"],
    ["usernametoken"],
    ["nametoken"]
  );

  useEffect(() => {
    if (token["mytoken"]) {
      setIsAuth(true);
      setName(token["nametoken"]);
      setUsername(token["usernametoken"]);
      setIsAuth(true);
    }
  }, [token]);
  if (!parsedData) {
    if (username !== "")
      APIService.GetUserData(token["usernametoken"])
        .then((resp) => {
          setParsedData(true);
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
        })
        .catch((error) => console.log(error));
  }

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
