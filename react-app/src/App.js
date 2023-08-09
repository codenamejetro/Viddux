import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import MyVideos from "./components/ProfilePages/MyVideos";
import MyPlaylists from "./components/ProfilePages/MyPlaylists";
import ProtectedRoute from './components/auth/ProtectedRoute'
import VideoPage from "./components/VideoPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/videos/:videoId'>
            <VideoPage />
          </Route>
          <ProtectedRoute path='/profile/videos'>
            <MyVideos />
          </ProtectedRoute>
          {/* <Route exact path='/profile/videos'>
            <MyVideos />
          </Route> */}
          <ProtectedRoute exact path='/profile/playlists'>
            <MyPlaylists />
          </ProtectedRoute>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
