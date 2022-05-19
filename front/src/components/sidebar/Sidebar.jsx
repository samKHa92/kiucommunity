import "./sidebar.css";
import logo from "../../images/logosquare.svg";
import {
  RssFeed,
  Chat,
  Group,
  Event,
  School,
  Mood,
  MenuBook,
  Star,
} from "@material-ui/icons";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import { useNavigate } from "react-router-dom";
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
  let history = useNavigate();

  function routeHome() {
    history("/");
  }

  function routeCourseFeed() {
    history("/coursefeed/" + course);
  }

  function routeMemeFeed() {
    history("/memes/");
  }

  function routeGangFeed() {
    history("/gangfeed/" + gang);
  }

  function routeLibrary() {
    history("/library");
  }
  function routeEvents() {
    history("/events");
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

          <li className="sidebarListItem" onClick={routeLibrary}>
            <MenuBook className="sidebarIcon" />
            <span className="sidebarListItemText">Library</span>
          </li>
          <li className="sidebarListItem" onClick={routeEvents}>
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <li className="sidebarListItem">
          <LocalLaundryServiceIcon className="sidebarIcon" />
          <span className="sidebarListItemText">Laundry</span>
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
