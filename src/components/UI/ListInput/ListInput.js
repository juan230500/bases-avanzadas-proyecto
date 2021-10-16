import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./ListInput.module.css";
import DeleteIcon from "@material-ui/icons/Delete";

const ListInput = (props) => {
  const [val, setVal] = useState(props.schema || "");

  useEffect(() => {
    setVal(props.schema || "");
  }, [props.schema]);

  const add = () => {
    if (!val) return;
    const newList = [...props.value];
    newList.push(val);
    props.onChange(newList);
    setVal(props.schema || "");
  };

  const del = (i) => {
    const newList = [...props.value];
    newList.splice(i, 1);
    props.onChange(newList);
  };

  let input = null;
  if (props.schema) {
    input = Object.keys(props.schema).map((k) => (
      <TextField
        value={val[k]}
        onChange={(e) => {
          const newVal = { ...val };
          newVal[k] = e.target.value;
          setVal(newVal);
        }}
        label={k}
        variant="standard"
      />
    ));
  } else {
    input = (
      <TextField
        value={val}
        onChange={(e) => setVal(e.target.value)}
        label={props.label}
        variant="standard"
      />
    );
  }

  return (
    <div className={classes.Container}>
      {input}
      <Button style={{ flex: "unset" }} onClick={add}>
        Agregar
      </Button>
      <div style={{ flex: "100%" }}>
        {props.value?.map((el, i) => (
          <li className={classes.Item} onClick={() => del(i)}>
            {typeof el === "string"
              ? el
              : Object.keys(el)
                  .filter((k) => k !== "_id")
                  .map((k) => `${k}:${el[k]}`)
                  .join(", ")}{" "}
            <DeleteIcon />
          </li>
        ))}
      </div>
    </div>
  );
};

export default ListInput;
