import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import APIService from "../../APIService";
import { useHistory } from "react-router-dom";
import likeicon from "../../reacts/like.png";
import loveicon from "../../reacts/love.png";
import congratsicon from "../../reacts/congrats.png";
import applauseicon from "../../reacts/applause.png";
import smileicon from "../../reacts/smile.png";
import liked from "../../reacts/liked.png";
import loved from "../../reacts/loved.png";
import applaused from "../../reacts/applaused.png";
import hahad from "../../reacts/hahad.png";
import congrated from "../../reacts/congrated.png";

export default function Post({ post }) {
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

  function routeToProfile() {
    history.push("/profile/" + post.user_id);
  }

  const [likes, setLikes] = useState(0);
  const [loves, setLoves] = useState(0);
  const [applauses, setApplauses] = useState(0);
  const [congrats, setCongrats] = useState(0);
  const [hahas, setHahas] = useState(0);

  const [AlreadyLiked, setAlreadyLiked] = useState(false);
  const [AlreadyLoved, setAlreadyLoved] = useState(false);
  const [AlreadyHahad, setAlreadyHahad] = useState(false);
  const [AlreadyApplaused, setAlreadyApplaused] = useState(false);
  const [AlreadyCongrated, setAlreadyCongrated] = useState(false);

  function likeHandler() {
    if (
      !AlreadyLiked &&
      !AlreadyLoved &&
      !AlreadyApplaused &&
      !AlreadyHahad &&
      !AlreadyCongrated
    ) {
      var post_id = post.id;
      var sender = token["usernametoken"];
      var react_type = "like";
      APIService.AddReaction({ post_id, sender, react_type })
        .then((resp) => {})
        .catch((error) => console.log(error));
      setLikes(likes + 1);
      setAlreadyLiked(true);
    } else if (
      AlreadyLiked &&
      !AlreadyLoved &&
      !AlreadyApplaused &&
      !AlreadyHahad &&
      !AlreadyCongrated
    ) {
      APIService.GetAllReactions()
        .then((resp) => {
          for (var i = 0; i < resp.length; i++) {
            console.log(resp[i]);
            if (resp[i].sender === token["usernametoken"]) {
              APIService.DeleteReaction(resp[i].id)
                .then((resp) => {})
                .catch((error) => console.log(error));
              break;
            }
          }
        })
        .catch((error) => console.log(error));

      setLikes(likes - 1);
      setAlreadyLiked(false);
    } else {
      APIService.GetAllReactions()
        .then((resp) => {
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].sender === token["usernametoken"]) {
              APIService.DeleteReaction(resp[i].id)
                .then((resp) => {})
                .catch((error) => console.log(error));
              break;
            }
          }
        })
        .catch((error) => console.log(error));

      var post_id = post.id;
      var sender = token["usernametoken"];
      var react_type = "like";
      APIService.AddReaction({ post_id, sender, react_type })
        .then((resp) => {})
        .catch((error) => console.log(error));
      if (AlreadyLiked) {
        setLikes(likes - 1);
      }
      if (AlreadyLoved) {
        setLoves(loves - 1);
      }
      if (AlreadyApplaused) {
        setApplauses(applauses - 1);
      }
      if (AlreadyHahad) {
        setHahas(hahas - 1);
      }
      if (AlreadyCongrated) {
        setCongrats(congrats - 1);
      }
      setLikes(likes + 1);
      setAlreadyLiked(true);
      setAlreadyLoved(false);
      setAlreadyHahad(false);
      setAlreadyApplaused(false);
      setAlreadyCongrated(false);
    }
  }

  function loveHandler() {
    if (
      !AlreadyLiked &&
      !AlreadyLoved &&
      !AlreadyApplaused &&
      !AlreadyHahad &&
      !AlreadyCongrated
    ) {
      var post_id = post.id;
      var sender = token["usernametoken"];
      var react_type = "love";
      APIService.AddReaction({ post_id, sender, react_type })
        .then((resp) => {})
        .catch((error) => console.log(error));
      setLoves(loves + 1);
      setAlreadyLoved(true);
    } else if (
      !AlreadyLiked &&
      AlreadyLoved &&
      !AlreadyApplaused &&
      !AlreadyHahad &&
      !AlreadyCongrated
    ) {
      APIService.GetAllReactions()
        .then((resp) => {
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].sender === token["usernametoken"]) {
              APIService.DeleteReaction(resp[i].id)
                .then((resp) => {})
                .catch((error) => console.log(error));
              break;
            }
          }
        })
        .catch((error) => console.log(error));

      setLoves(loves - 1);
      setAlreadyLoved(false);
    } else {
      APIService.GetAllReactions()
        .then((resp) => {
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].sender === token["usernametoken"]) {
              APIService.DeleteReaction(resp[i].id)
                .then((resp) => {})
                .catch((error) => console.log(error));
              break;
            }
          }
        })
        .catch((error) => console.log(error));

      var post_id = post.id;
      var sender = token["usernametoken"];
      var react_type = "love";
      APIService.AddReaction({ post_id, sender, react_type })
        .then((resp) => {})
        .catch((error) => console.log(error));
      if (AlreadyLiked) {
        setLikes(likes - 1);
      }
      if (AlreadyLoved) {
        setLoves(loves - 1);
      }
      if (AlreadyApplaused) {
        setApplauses(applauses - 1);
      }
      if (AlreadyHahad) {
        setHahas(hahas - 1);
      }
      if (AlreadyCongrated) {
        setCongrats(congrats - 1);
      }
      setLoves(loves + 1);
      setAlreadyLiked(false);
      setAlreadyLoved(true);
      setAlreadyHahad(false);
      setAlreadyApplaused(false);
      setAlreadyCongrated(false);
    }
  }

  function hahaHandler() {
    if (
      !AlreadyLiked &&
      !AlreadyLoved &&
      !AlreadyApplaused &&
      !AlreadyHahad &&
      !AlreadyCongrated
    ) {
      var post_id = post.id;
      var sender = token["usernametoken"];
      var react_type = "haha";
      APIService.AddReaction({ post_id, sender, react_type })
        .then((resp) => {})
        .catch((error) => console.log(error));
      setHahas(hahas + 1);
      setAlreadyHahad(true);
    } else if (
      !AlreadyLiked &&
      !AlreadyLoved &&
      !AlreadyApplaused &&
      AlreadyHahad &&
      !AlreadyCongrated
    ) {
      APIService.GetAllReactions()
        .then((resp) => {
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].sender === token["usernametoken"]) {
              APIService.DeleteReaction(resp[i].id)
                .then((resp) => {})
                .catch((error) => console.log(error));
              break;
            }
          }
        })
        .catch((error) => console.log(error));

      setHahas(hahas - 1);
      setAlreadyHahad(false);
    } else {
      APIService.GetAllReactions()
        .then((resp) => {
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].sender === token["usernametoken"]) {
              APIService.DeleteReaction(resp[i].id)
                .then((resp) => {})
                .catch((error) => console.log(error));
              break;
            }
          }
        })
        .catch((error) => console.log(error));

      var post_id = post.id;
      var sender = token["usernametoken"];
      var react_type = "haha";
      APIService.AddReaction({ post_id, sender, react_type })
        .then((resp) => {})
        .catch((error) => console.log(error));
      if (AlreadyLiked) {
        setLikes(likes - 1);
      }
      if (AlreadyLoved) {
        setLoves(loves - 1);
      }
      if (AlreadyApplaused) {
        setApplauses(applauses - 1);
      }
      if (AlreadyHahad) {
        setHahas(hahas - 1);
      }
      if (AlreadyCongrated) {
        setCongrats(congrats - 1);
      }
      setHahas(hahas + 1);
      setAlreadyLiked(false);
      setAlreadyLoved(false);
      setAlreadyHahad(true);
      setAlreadyApplaused(false);
      setAlreadyCongrated(false);
    }
  }

  function applauseHandler() {
    if (
      !AlreadyLiked &&
      !AlreadyLoved &&
      !AlreadyApplaused &&
      !AlreadyHahad &&
      !AlreadyCongrated
    ) {
      var post_id = post.id;
      var sender = token["usernametoken"];
      var react_type = "applause";
      APIService.AddReaction({ post_id, sender, react_type })
        .then((resp) => {})
        .catch((error) => console.log(error));
      setApplauses(applauses + 1);
      setAlreadyApplaused(true);
    } else if (
      !AlreadyLiked &&
      !AlreadyLoved &&
      AlreadyApplaused &&
      !AlreadyHahad &&
      !AlreadyCongrated
    ) {
      APIService.GetAllReactions()
        .then((resp) => {
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].sender === token["usernametoken"]) {
              APIService.DeleteReaction(resp[i].id)
                .then((resp) => {})
                .catch((error) => console.log(error));
              break;
            }
          }
        })
        .catch((error) => console.log(error));

      setApplauses(applauses - 1);
      setAlreadyApplaused(false);
    } else {
      APIService.GetAllReactions()
        .then((resp) => {
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].sender === token["usernametoken"]) {
              APIService.DeleteReaction(resp[i].id)
                .then((resp) => {})
                .catch((error) => console.log(error));
              break;
            }
          }
        })
        .catch((error) => console.log(error));

      var post_id = post.id;
      var sender = token["usernametoken"];
      var react_type = "applause";
      APIService.AddReaction({ post_id, sender, react_type })
        .then((resp) => {})
        .catch((error) => console.log(error));
      if (AlreadyLiked) {
        setLikes(likes - 1);
      }
      if (AlreadyLoved) {
        setLoves(loves - 1);
      }
      if (AlreadyApplaused) {
        setApplauses(applauses - 1);
      }
      if (AlreadyHahad) {
        setHahas(hahas - 1);
      }
      if (AlreadyCongrated) {
        setCongrats(congrats - 1);
      }
      setApplauses(applauses + 1);
      setAlreadyLiked(false);
      setAlreadyLoved(false);
      setAlreadyHahad(false);
      setAlreadyApplaused(true);
      setAlreadyCongrated(false);
    }
  }

  function congratsHandler() {
    if (
      !AlreadyLiked &&
      !AlreadyLoved &&
      !AlreadyApplaused &&
      !AlreadyHahad &&
      !AlreadyCongrated
    ) {
      var post_id = post.id;
      var sender = token["usernametoken"];
      var react_type = "congrats";
      APIService.AddReaction({ post_id, sender, react_type })
        .then((resp) => {})
        .catch((error) => console.log(error));
      setCongrats(congrats + 1);
      setAlreadyCongrated(true);
    } else if (
      !AlreadyLiked &&
      !AlreadyLoved &&
      !AlreadyApplaused &&
      !AlreadyHahad &&
      AlreadyCongrated
    ) {
      APIService.GetAllReactions()
        .then((resp) => {
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].sender === token["usernametoken"]) {
              APIService.DeleteReaction(resp[i].id)
                .then((resp) => {})
                .catch((error) => console.log(error));
              break;
            }
          }
        })
        .catch((error) => console.log(error));

      setCongrats(congrats - 1);
      setAlreadyCongrated(false);
    } else {
      APIService.GetAllReactions()
        .then((resp) => {
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].sender === token["usernametoken"]) {
              APIService.DeleteReaction(resp[i].id)
                .then((resp) => {})
                .catch((error) => console.log(error));
              break;
            }
          }
        })
        .catch((error) => console.log(error));

      var post_id = post.id;
      var sender = token["usernametoken"];
      var react_type = "congrats";
      APIService.AddReaction({ post_id, sender, react_type })
        .then((resp) => {})
        .catch((error) => console.log(error));
      if (AlreadyLiked) {
        setLikes(likes - 1);
      }
      if (AlreadyLoved) {
        setLoves(loves - 1);
      }
      if (AlreadyApplaused) {
        setApplauses(applauses - 1);
      }
      if (AlreadyHahad) {
        setHahas(hahas - 1);
      }
      if (AlreadyCongrated) {
        setCongrats(congrats - 1);
      }
      setCongrats(congrats + 1);
      setAlreadyLiked(false);
      setAlreadyLoved(false);
      setAlreadyHahad(false);
      setAlreadyApplaused(false);
      setAlreadyCongrated(true);
    }
  }

  useEffect(() => {
    if (token["mytoken"]) {
      setName(token["nametoken"]);
      setUsername(token["usernametoken"]);
      setIsAuth(true);
    }
  }, [token]);

  if (!parsedData) {
    APIService.GetAllReactions()
      .then((resp) => {
        for (var i = 0; i < resp.length; i++) {
          if (
            resp[i].sender === token["usernametoken"] &&
            resp[i].post_id === post.id
          ) {
            if (resp[i].react_type === "like") {
              setAlreadyLiked(true);
            }
            if (resp[i].react_type === "love") {
              setAlreadyLoved(true);
            }
            if (resp[i].react_type === "haha") {
              setAlreadyHahad(true);
            }
            if (resp[i].react_type === "applause") {
              setAlreadyApplaused(true);
            }
            if (resp[i].react_type === "congrats") {
              setAlreadyCongrated(true);
            }
          }
        }

        var likes2 = 0;
        var loves2 = 0;
        var hahas2 = 0;
        var applauses2 = 0;
        var congrats2 = 0;

        for (var i = 0; i < resp.length; i++) {
          if (resp[i].post_id === post.id) {
            if (resp[i].react_type === "like") {
              likes2++;
            }
            if (resp[i].react_type === "love") {
              loves2++;
            }
            if (resp[i].react_type === "haha") {
              hahas2++;
            }
            if (resp[i].react_type === "applause") {
              applauses2++;
            }
            if (resp[i].react_type === "congrats") {
              congrats2++;
            }
          }
        }

        setLikes(likes2);
        setLoves(loves2);
        setHahas(hahas2);
        setApplauses(applauses2);
        setCongrats(congrats2);
      })
      .catch((error) => console.log(error));

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
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          <img className="postImg" src={post.image1} alt="" />
        </div>
        <div className="postMidLeft">
          <label className="iconNames" hidden={!isAuth}>
            Like
          </label>
          {/* <label className="iconNamesBig" hidden={!AlreadyLiked}>
            Like
          </label> */}

          <label className="iconNames" hidden={!isAuth}>
            Applause
          </label>
          {/* <label className="iconNamesBig" hidden={!AlreadyApplaused}>
            Applause
          </label> */}

          <label className="iconNames" hidden={!isAuth}>
            Love
          </label>
          {/* <label className="iconNamesBig" hidden={!AlreadyLoved}>
            Love
          </label> */}

          <label className="iconNames" hidden={!isAuth}>
            Congrats
          </label>
          {/* <label className="iconNamesBig" hidden={!AlreadyCongrated}>
            Congrats
          </label> */}

          <label className="iconNames" hidden={!isAuth}>
            Haha
          </label>
          {/* <label className="iconNamesBig" hidden={!AlreadyHahad}>
            Haha
          </label> */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={likeicon}
              onClick={likeHandler}
              alt=""
              hidden={AlreadyLiked || !isAuth}
            />
            <img
              className="likeCircle"
              src={liked}
              onClick={likeHandler}
              alt=""
              hidden={!AlreadyLiked || !isAuth}
            />
            <img
              className="likeIcon"
              src={applauseicon}
              onClick={applauseHandler}
              alt=""
              hidden={AlreadyApplaused || !isAuth}
            />
            <img
              className="likeCircle"
              src={applaused}
              onClick={applauseHandler}
              alt=""
              hidden={!AlreadyApplaused || !isAuth}
            />
            <img
              className="likeIcon"
              src={loveicon}
              onClick={loveHandler}
              alt=""
              hidden={AlreadyLoved || !isAuth}
            />
            <img
              className="likeCircle"
              src={loved}
              onClick={loveHandler}
              alt=""
              hidden={!AlreadyLoved || !isAuth}
            />
            <img
              className="likeIcon"
              src={congratsicon}
              onClick={congratsHandler}
              alt=""
              hidden={AlreadyCongrated || !isAuth}
            />
            <img
              className="likeCircle"
              src={congrated}
              onClick={congratsHandler}
              alt=""
              hidden={!AlreadyCongrated || !isAuth}
            />
            <img
              className="likeIcon"
              src={smileicon}
              onClick={hahaHandler}
              alt=""
              hidden={AlreadyHahad || !isAuth}
            />
            <img
              className="likeCircle"
              src={hahad}
              onClick={hahaHandler}
              alt=""
              hidden={!AlreadyHahad || !isAuth}
            />
          </div>
          <label className="postLikeCounter">
            {likes + loves + hahas + applauses + congrats} People reacted
          </label>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
        <div className="postFullBottomLeft">
          <label className="reactCount" hidden={!isAuth}>
            {likes}
          </label>
          <label className="reactCount" hidden={!isAuth}>
            {applauses}
          </label>
          <label className="reactCount" hidden={!isAuth}>
            {loves}
          </label>
          <label className="reactCount" hidden={!isAuth}>
            {congrats}
          </label>
          <label className="reactCount" hidden={!isAuth}>
            {hahas}
          </label>
        </div>
      </div>
    </div>
  );
}
