import "./sidebar.css";
import logo from "../../images/logosquare.svg";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
  Mood,
  MenuBook,
  Star,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import APIService from "../../APIService";
import { useCookies } from "react-cookie";

export default function Sidebar() {
  const [course, setCourse] = useState("None");
  const [gang, setGang] = useState("None");
  const [haveGang, setHaveGang] = useState(false);
  const [haveCourse, setHaveCourse] = useState(false);

  const [parsedData, setParsedData] = useState(false);

  const [token, setToken, removeToken] = useCookies(
    ["mytoken"],
    ["usernametoken"],
    ["nametoken"]
  );

  if (!parsedData) {
    setParsedData(true);
    APIService.GetUserData(token["usernametoken"])
      .then((resp) => {
        if (resp.program) {
          if (resp.program !== "None") {
            setCourse(resp.program);
            setHaveCourse(true);
          }
        }

        if (resp.gang) {
          if (resp.gang !== "None") {
            setGang(resp.gang);
            setHaveGang(true);
          }
        }
      })
      .catch((error) => console.log(error));
    console.log(course);
    console.log(gang);
    console.log(haveCourse);
    console.log(haveGang);
  }
  let history = useHistory();

  function routeHome() {
    history.push("/");
  }

  function routeCourseFeed() {
    history.push("/coursefeed/" + course);
  }

  function routeMemeFeed() {
    history.push("/memes/");
  }

  function routeGangFeed() {
    history.push("/gangfeed/" + gang);
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <img className="sidebarAd" src={logo} onClick={routeHome} alt="" />
        <hr />
        <br />
        <ul className="sidebarList">
          <li className="sidebarListItem" onClick={routeHome}>
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">KIU Main Feed</span>
          </li>
          <div hidden={!haveCourse}>
            <li className="sidebarListItem" onClick={routeCourseFeed}>
              <School className="sidebarIcon" />
              <span className="sidebarListItemText">{course}</span>
            </li>
          </div>
          <div hidden={!haveGang}>
            <li className="sidebarListItem" onClick={routeGangFeed}>
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">{gang}</span>
            </li>
          </div>
          {/* <li className="sidebarListItem" onClick={routeStaffFeed}>
              <Star className="sidebarIcon" />
              <span className="sidebarListItemText">Staff Posts</span>
            </li> */}
          <li className="sidebarListItem" onClick={routeMemeFeed}>
            <Mood className="sidebarIcon" />
            <span className="sidebarListItemText">Memes</span>
          </li>

          <hr className="sidebarHr" />

          <li className="sidebarListItem">
            <MenuBook className="sidebarIcon" />
            <span className="sidebarListItemText">Library</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <li className="sidebarListItem">
          <Chat className="sidebarIcon" />
          <span className="sidebarListItemText">Chats</span>
        </li>
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
