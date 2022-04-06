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
    <Router>
      <div className="App">
        {/* <Topbar /> */}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/profile/:username" exact element={<Profile />} />
          <Route path="/gangfeed/:indicator" exact element={<GFeed />} />
          <Route path="/coursefeed/:indicator" exact element={<CFeed />} />
          <Route path="/memes/" exact element={<MFeed />} />
          <Route path="/post/:id" exact element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
