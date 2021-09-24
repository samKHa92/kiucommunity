import Home from "./pages/home/Home";
import CFeed from "./pages/cfeed/CFeed";
import GFeed from "./pages/gfeed/GFeed";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MFeed from "./pages/mfeed/MFeed";
import Topbar from "./components/topbar/Topbar";

function App() {
  return (
    <div className="App">
      {/* <Topbar /> */}
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile/:username" exact component={Profile} />
          <Route path="/gangfeed/:indicator" exact component={GFeed} />
          <Route path="/coursefeed/:indicator" exact component={CFeed} />
          <Route path="/memes/" exact component={MFeed} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
