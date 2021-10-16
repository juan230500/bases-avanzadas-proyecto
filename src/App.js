import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Info from "./components/Info/Info";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { BASE_URL, NODE_1, NODE_2, NODE_3 } from "./constants";

function App() {
  const [userId, setUserId] = useState(null);
  const [url, setUrl] = useState(BASE_URL);

  console.log(url);

  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="App">
        <FormControl>
          <InputLabel id="node">Nodo</InputLabel>
          <Select
            labelId="node"
            id="node"
            value={url}
            label="Nodo"
            onChange={(e) => setUrl(e.target.value)}
          >
            <MenuItem value={BASE_URL}>Local</MenuItem>
            <MenuItem value={NODE_1}>Nodo 1</MenuItem>
            <MenuItem value={NODE_2}>Nodo 2</MenuItem>
            <MenuItem value={NODE_3}>Nodo 3</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Switch>
            <Route path="/login">
              <Login url={url} setUserId={setUserId}></Login>
            </Route>
            <Route path="/register">
              <Register
                url={url}
                userId={userId}
                setUserId={setUserId}
              ></Register>
            </Route>
            <Route path="/info">
              <Info url={url}></Info>
            </Route>
            <Redirect to="/login" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
