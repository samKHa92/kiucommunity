import "./comment.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import APIService from "../../APIService";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

export default function Comment({ post }) {
  const [parsedData, setParsedData] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
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

  const [isMine, setIsMine] = useState(post.user_id === token["usernametoken"]);
  const [commentsCollapsed, setCommentsCollapsed] = useState(false);

  let history = useNavigate();

  function SignInBtnClicked() {
    history.push("/login");
  }

  function routeToProfile() {
    history.push("/profile/" + post.user_id);
  }

  function postDltBtnClicked() {
    APIService.DeleteComment(post.id)
      .then((resp) => resp)
      .catch((error) => console.log(error));
    history.go(0);
  }

  useEffect(() => {
    if (token["mytoken"]) {
      setName(token["nametoken"]);
      setUsername(token["usernametoken"]);
      setIsAuth(true);
    }
  }, [token]);

  if (!parsedData) {
    APIService.GetUserData(post.user_id)
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
        if (resp.status) {
          setStatus(resp.status);
        }
      })
      .catch((error) => console.log(error));
    APIService.GetPostData(post.post_id)
      .then((resp) => {
        setIsMine(isMine || resp.user_id === token["usernametoken"]);
      })
      .catch((error) => console.log(error));
  }
  if (post.id !== 0)
    return (
      <div className="comment">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src={profilePicture}
                onClick={routeToProfile}
                alt=""
              />
              <span className="postUsername" onClick={routeToProfile}>
                {username}
              </span>
              <span className="postStatus">({status})</span>
              <span className="postDate">{post.date_posted}</span>
            </div>
            <div className="postTopRight">
              <button
                className="deleteButton"
                hidden={!isMine}
                onClick={postDltBtnClicked}
              >
                <BsFillTrashFill />
              </button>
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.text}</span>
          </div>
          <div className="postMidLeft">
            {/* <label className="iconNamesBig" hidden={!AlreadyHahad}>
            Haha
          </label> */}
          </div>
        </div>
      </div>
    );
}
