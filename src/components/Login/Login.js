import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import classes from "./Login.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const [data, setData] = useState({
    email: { label: "Correo electrónico ", type: "basic", value: "" },
    password: { label: "Clave de acceso", type: "basic", value: "" },
  });

  const update = (k, v) => {
    const newData = { ...data };
    newData[k].value = v;
    setData(newData);
  };

  const check = () => {
    for (let k in data) {
      if (data[k].value.length <= 0) {
        toast.warning("Falta llenar el campo: " + data[k].label);
        return false;
      }
    }
    toast.success("Se está procesando su solicitud");
    return true;
  };

  const send = () => {
    const result = {};
    check();
    Object.keys(data).forEach((k) => (result[k] = data[k].value));
    console.log(result);
    props.setUserId("AAA");
    history.push("/register");
  };

  return (
    <div className={classes.Login}>
      <h1>Inicio de sesión</h1>
      {Object.keys(data).map((k) => (
        <TextField
          type={k}
          key={k}
          label={data[k].label}
          variant="standard"
          value={data[k].value}
          onChange={(e) => update(k, e.target.value)}
        />
      ))}
      <Button variant="contained" onClick={send}>
        Ingresar
      </Button>
      <Link to="/register">Crear cuenta</Link>
    </div>
  );
};

export default Login;
