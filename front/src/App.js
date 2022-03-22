import Home from "./pages/home/Home";
import CFeed from "./pages/cfeed/CFeed";
import GFeed from "./pages/gfeed/GFeed";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MFeed from "./pages/mfeed/MFeed";
import Topbar from "./components/topbar/Topbar";
import PostPage from "./pages/postpage/PostPage";

function App() {
  return (
    <div className="App">
      {/* <Topbar /> */}
      <Router>
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile/:username" exact component={Profile} />
          <Route path="/gangfeed/:indicator" exact component={GFeed} />
          <Route path="/coursefeed/:indicator" exact component={CFeed} />
          <Route path="/memes/" exact component={MFeed} />
          <Route path="/post/:id" exact component={PostPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
