import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import APIService from "../../APIService";
import { useHistory } from "react-router-dom";

export default function Post({ post }) {
  const [like, setLike] = useState(post.reacts);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

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
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={profilePicture} alt="" />
            <span className="postUsername">{username}</span>
            <span className="postStatus">({status})</span>
            <span className="postDate">{post.date_posted}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          <img className="postImg" src={post.image1} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="assets/like.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
