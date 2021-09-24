import Post from "../post/Post";
import Share from "../share/Share";
import "../post/post.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import APIService from "../../APIService";
import { useHistory } from "react-router-dom";
import { setRef } from "@material-ui/core";

export default function GangFeed(props) {
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
    ["nametoken"],
    ["profilepictoken"]
  );
  const [Posts, setPosts] = useState([]);
  // const [refreshed, setRefreshed] = useState(false);

  let history = useHistory();

  // if (!refreshed) {
  //   setRefreshed(true);
  //   history.go(0);
  // }

  function SignInBtnClicked() {
    history.push("/login");
  }

  useEffect(() => {
    if (token["mytoken"]) {
      setIsAuth(true);
      setName(token["nametoken"]);
      setUsername(token["usernametoken"]);
      setProfilePicture(token["profilepictoken"]);

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
      })
      .catch((error) => console.log(error));

    APIService.GetAllPosts()
      .then((resp) => {
        console.log(resp);
        resp = resp.filter(function (element) {
          return element.gang === props.indicator;
        });
        resp.sort(function (a, b) {
          return parseInt(b.id) - parseInt(a.id);
        });
        setPosts(resp);
        console.log(resp);
        return (
          <div className="feed">
            <div className="feedWrapper">
              <Share
                username={username}
                name={name}
                profilepic={profilePicture}
                isauth={isAuth}
              />
              {resp.map((p) => (
                <Post key={p.id} post={p} />
              ))}
            </div>
          </div>
        );
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share
          username={token["usernametoken"]}
          name={token["nametoken"]}
          profilepic={profilePicture}
          isauth={isAuth}
        />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
