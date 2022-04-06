import Comment from "../comment/Comment";
import Reply from "../reply/Reply";
import "./commentfeed.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import APIService from "../../APIService";
import { useNavigate } from "react-router-dom";
import PPost from "../post/PPost";

export default function CommentFeed(props) {
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

  let history = useNavigate();

  function SignInBtnClicked() {
    history("/login");
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

    APIService.GetAllComments()
      .then((resp) => {
        console.log(resp);
        resp = resp.filter(function (element) {
          return element.post_id === props.pid;
        });
        resp.sort(function (a, b) {
          return parseInt(b.id) - parseInt(a.id);
        });
        setPosts(resp);
        console.log(resp);
        return (
          <div className="commentfeed">
            <div className="commentfeedWrapper">
              <Reply
                username={username}
                name={name}
                profilepic={profilePicture}
                isauth={isAuth}
                pid={props.pid}
              />
              <h3>Comments:</h3>
              {resp.map((p) => (
                <Comment key={p.id} post={p} />
              ))}
            </div>
          </div>
        );
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="commentfeed">
      <div className="commentfeedWrapper">
        <PPost id={props.pid} />
        <h3>Comments:</h3>
        <br />

        <Reply
          username={token["usernametoken"]}
          name={token["nametoken"]}
          profilepic={profilePicture}
          isauth={isAuth}
          pid={props.pid}
        />
        {/* <hr /> */}

        {Posts.map((p) => (
          <Comment key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
