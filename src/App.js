import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
