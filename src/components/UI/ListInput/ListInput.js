import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import classes from "./ListInput.module.css";
import DeleteIcon from "@material-ui/icons/Delete";

const ListInput = (props) => {
  const [val, setVal] = useState("");

  const add = () => {
    if (!val) return;
    const newList = [...props.list];
    newList.push(val);
    props.onChange(newList);
    setVal("");
  };

  const del = (i) => {
    const newList = [...props.list];
    newList.splice(i, 1);
    props.onChange(newList);
  };

  return (
    <div>
      <TextField
        value={val}
        onChange={(e) => setVal(e.target.value)}
        label={props.label}
        variant="standard"
      />
      <Button onClick={add}>Agregar</Button>
      <div>
        {props.list?.map((el, i) => (
          <li className={classes.Item} onClick={() => del(i)}>
            {el} <DeleteIcon />
          </li>
        ))}
      </div>
    </div>
  );
};

export default ListInput;
