import "./App.css";
import React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Explore from "./pages/Explore/Explore";
import NewPost from "./components/NewPost/NewPost";
import Profile from "./pages/Profile/Profile";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { checkAuthToken } from "./store/actions/auth";
import DetailedPost from "./components/DetailedPost/DetailedPost";
import DetailedUser from "./components/DetailedUser/DetailedUser";
import Editprofile from './pages/EditProfile/Editprofile';

class App extends React.Component {
  componentDidMount = () => {
    this.props.checkAuth();
  };

  render() {
    let routes = null;
    if (this.props.isAuthenticated) {
      routes = (
        <>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
          />
          <Navbar user={this.props.user} />
          <Switch>
            <Route exact path="/profile" component={Profile} />
            <Route path="/post/:id" component={DetailedPost} />
            <Route path="/user/:id" component={DetailedUser} />
            <Route path="/editprofile" component={Editprofile} />
            <Route path="/newpost" component={NewPost} />
            <Route path="/explore" component={Explore} />
            <Route exact path="/" component={HomePage} />
            <Redirect to="/" />
          </Switch>
        </>
      );
    }else{
      routes = (
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Redirect to="/login" />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        <div className="App">{routes}</div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(checkAuthToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
