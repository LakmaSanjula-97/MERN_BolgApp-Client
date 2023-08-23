import { useContext } from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Setting from "./Pages/Settings/Setting";
import Single from "./Pages/Single/Single";
import WritePost from "./Pages/WritePost/WritePost";
import TopBar from "./components/TopBar/TopBar.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Context } from "./context/Context";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import About from "./Pages/About/About";
import Users from "./Pages/Users/Users";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/posts">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">{user ? <WritePost /> : <Login />}</Route>
        <Route path="/settings">{user ? <Setting /> : <Login />}</Route>
        <Route path="/category">{user ? <CategoryPage /> : <Login />}</Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/userdetails">{user ? <Users /> : <Login />}</Route>
      </Switch>
    </Router>
  );
}

export default App;