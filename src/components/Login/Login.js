import React from "react";
import TextField from "@mui/material/TextField";
import classes from "./Login.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={classes.Login}>
      <h1>Inicio de sesión</h1>
      <TextField label="Correo electrónico" variant="standard" />
      <TextField label="Clave de acceso" variant="standard" type="password" />
      <Button variant="contained">Ingresar</Button>
      <Link to="/register">Crear cuenta</Link>
    </div>
  );
};

export default Login;
