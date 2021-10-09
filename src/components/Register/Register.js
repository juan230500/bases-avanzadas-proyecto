import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import classes from "./Register.module.css";
import json from "../../assets/data.json";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ListInput from "../UI/ListInput/ListInput";

const Register = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const newData = json.fields;
    Object.keys(json.fields).forEach(
      (k) => (newData[k].value = newData[k].type === "basic" ? "" : [])
    );
    setData(newData);
  }, []);

  const update = (k, v) => {
    const newData = { ...data };
    newData[k].value = v;
    setData(newData);
  };

  const send = () => {
    const result = {};
    Object.keys(data).forEach((k) => (result[k] = data[k].value));
    console.log(result);
  };

  return (
    <div className={classes.Register}>
      <h1>Registro</h1>
      {Object.keys(data).map((k) =>
        data[k].type === "basic" ? (
          <TextField
            key={k}
            label={data[k].label}
            variant="standard"
            value={data[k].value}
            onChange={(e) => update(k, e.target.value)}
          />
        ) : (
          <ListInput
            label={data[k].label}
            list={data[k].value}
            onChange={(v) => update(k, v)}
          />
        )
      )}
      <Button variant="contained" onClick={send}>
        Registrar
      </Button>
      <Link to="/login">Iniciar sesión</Link>
    </div>
  );
};

export default Register;
