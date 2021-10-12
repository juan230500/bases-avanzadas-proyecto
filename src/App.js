import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Info from "./components/Info/Info";

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login setUserId={setUserId}></Login>
          </Route>
          <Route path="/register">
            <Register userId={userId} setUserId={setUserId}></Register>
          </Route>
          <Route path="/info">
            <Info></Info>
          </Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
