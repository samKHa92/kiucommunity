import "./postpage.css";
import PPost from "../../components/post/PPost";
import React, { useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import APIService from "../../APIService";
import CommentFeed from "../../components/commentfeed/CommentFeed";
import { useCookies } from "react-cookie";

export default function PostPage(props) {
  const [visibility, setVisibility] = useState("");
  const [mygang, setgang] = useState("");
  const [mycourse, setcourse] = useState("");
  const [parsedData, setParsedData] = useState(false);
  const [token, setToken, removeToken] = useCookies(
    ["mytoken"],
    ["usernametoken"],
    ["nametoken"]
  );

  if (!parsedData) {
    APIService.GetPostData(props.match.params.id).then((resp) => {
      setVisibility(resp.gang);
    });
    APIService.GetUserData(token["usernametoken"]).then((resp) => {
      setgang(resp.gang);
      setcourse(resp.program);
    });
  }

  if (
    visibility === "None" ||
    visibility === mygang ||
    visibility === mycourse
  ) {
    return (
      <>
        <Topbar />
        <div className="homeContainer">
          <Sidebar />
          <CommentFeed pid={props.match.params.id} />
          <Rightbar />
        </div>
      </>
    );
  } else {
    return <h1>Please wait until we check your permission...</h1>;
  }
}
