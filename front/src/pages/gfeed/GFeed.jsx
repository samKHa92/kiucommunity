import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import GangFeed from "../../components/gangfeed/GangFeed";
import Rightbar from "../../components/rightbar/Rightbar";
import "../home/home.css";
import { useState, useEffect } from "react";
import APIService from "../../APIService";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export default function GFeed() {
  const params = useParams();
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
  const [gang, setGang] = useState("");
  const [program, setProgram] = useState("");

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
        if (resp.gang) {
          setGang(resp.gang);
        }
        if (resp.program) {
          setProgram(resp.program);
        }
      })
      .catch((error) => console.log(error));
  }
  if (params.indicator === gang) {
    return (
      <>
        <Topbar />
        <div className="homeContainer">
          <Sidebar />
          <GangFeed indicator={params.indicator} />
          <Rightbar />
        </div>
      </>
    );
  } else {
    return <h1>Please wait until we check your permission...</h1>;
  }
}
