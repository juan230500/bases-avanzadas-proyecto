import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import classes from "./Register.module.css";
import json from "../../assets/data.json";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import ListInput from "../UI/ListInput/ListInput";
import { toast } from "react-toastify";
import axios from "axios";

const Register = (props) => {
  const history = useHistory();
  const [data, setData] = useState({});

  const getUser = async () => {
    const newData = { ...json.fields };
    const res = await axios.get(props.url + "/GetUser/" + props.userId);
    console.log(res.data);
    Object.keys(json.fields).forEach((k) => (newData[k].value = res.data[k]));
    setData(newData);
  };

  useEffect(() => {
    if (props.userId) {
      getUser();
    } else {
      const newData = { ...json.fields };
      Object.keys(json.fields).forEach(
        (k) =>
          (newData[k].value =
            newData[k].type === "basic"
              ? ""
              : newData[k].type === "check"
              ? false
              : [])
      );
      setData(newData);
    }
  }, [props.userId]);

  const update = (k, v) => {
    const newData = { ...data };
    newData[k].value = v;
    setData(newData);
  };

  const check = () => {
    for (let k in data) {
      if (k === "programmingLanguages" && !data.ITarea.value) {
        continue;
      }
      if (data[k].value.length <= 0) {
        toast.warning("Falta llenar el campo: " + data[k].label);
        return false;
      }
    }

    return true;
  };

  const register = async () => {
    const result = {};
    if (!check()) return;
    Object.keys(data).forEach((k) => (result[k] = data[k].value));

    const id = toast.info("Se está procesando su solicitud");
    const res = await axios.post(props.url + "/Register", result);
    console.log(res);
    toast.dismiss(id);
    if (res.data === "Recibido") {
      toast.success("Recibido");
      props.setUserId(result.email);
    }
  };

  const edit = async () => {
    const result = {};
    if (!check()) return;
    Object.keys(data).forEach((k) => (result[k] = data[k].value));

    const id = toast.info("Se está procesando su solicitud");

    const res = await axios.put(props.url + "/Put/" + result.email, result);
    console.log(result, res);
    toast.dismiss(id);
    if (res.data === "El dato ha sido modificado") {
      toast.success("El dato ha sido modificado");
      props.setUserId(result.email);
    }
  };

  const cancel = () => {
    toast.success("Sesión cerrado con éxito");
    props.setUserId(null);
    history.push("/login");
  };

  const setup = props.userId
    ? { title: "Editar datos", btns: { Editar: edit, "Cerrar sesión": cancel } }
    : { title: "Registro", btns: { Registrar: register } };

  return (
    <div className={classes.Register}>
      <h1>{setup.title}</h1>
      {Object.keys(data)
        .filter((el) => el !== "programmingLanguages" || data.ITarea.value)
        .map((k) =>
          data[k].type === "basic" ? (
            <TextField
              disabled={k === "email" && props.userId}
              type={k}
              key={k}
              label={data[k].label}
              variant="standard"
              value={data[k].value}
              onChange={(e) => update(k, e.target.value)}
            />
          ) : data[k].type === "check" ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={data[k].value}
                  onChange={(e) => update(k, e.target.checked)}
                />
              }
              label={data[k].label}
            />
          ) : (
            <ListInput {...data[k]} onChange={(v) => update(k, v)} />
          )
        )}
      {Object.keys(setup.btns).map((k) => (
        <Button variant="contained" onClick={setup.btns[k]}>
          {k}
        </Button>
      ))}
      {!props.userId && <Link to="/login">Iniciar sesión</Link>}
    </div>
  );
};

export default Register;
