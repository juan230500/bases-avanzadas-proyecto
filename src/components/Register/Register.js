import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import classes from "./Register.module.css";
import json from "../../assets/data.json";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import ListInput from "../UI/ListInput/ListInput";
import { toast } from "react-toastify";

const Register = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const newData = { ...json.fields };
    if (props.userId) {
      const res = json.data[0];
      console.log("TEST");
      Object.keys(json.fields).forEach((k) => (newData[k].value = res[k]));
    } else {
      Object.keys(json.fields).forEach(
        (k) =>
          (newData[k].value =
            newData[k].type === "basic"
              ? ""
              : newData[k].type === "check"
              ? false
              : [])
      );
    }
    setData(newData);
  }, [props.userId]);

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

  const register = () => {
    const result = {};
    check();
    Object.keys(data).forEach((k) => (result[k] = data[k].value));
    console.log(result);
    props.setUserId("AAA");
  };

  const edit = () => {
    const result = {};
    check();
    Object.keys(data).forEach((k) => (result[k] = data[k].value));
    console.log(result);
  };

  const cancel = () => {
    props.setUserId(null);
  };

  const setup = props.userId
    ? { title: "Editar datos", btns: { Editar: edit, Cancelar: cancel } }
    : { title: "Registro", btns: { Registrar: register } };

  return (
    <div className={classes.Register}>
      <h1>{setup.title}</h1>
      {Object.keys(data)
        .filter((el) => el !== "programmingLanguages" || data.TI.value)
        .map((k) =>
          data[k].type === "basic" ? (
            <TextField
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
