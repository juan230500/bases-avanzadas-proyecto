import React, { useState } from "react";
import classes from "./Info.module.css";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import json from "../../assets/data.json";

const Info = (props) => {
  const [keys, setKeys] = useState([]);
  const [data, setData] = useState([]);

  const req1 = async () => {
    setKeys(["name"]);
    const res = await axios.get(props.url + "/GetIsIT");
    setData(res.data);
  };

  const req2 = async () => {
    setKeys(["name", "country"]);
    const res = await axios.get(props.url + "/GetLanguage");
    setData(res.data);
  };

  const req3 = async () => {
    setKeys(["name", "titles"]);
    const res = await axios.get(props.url + "/GetIsNotIT");
    const newData = [...res.data];
    newData.forEach((el) => (el.titles = el.titles.join(",\n")));
    setData(newData);
  };

  return (
    <div className={classes.Info}>
      <h1>Consultas</h1>

      <Button onClick={req1}>Consulta 1: candidatos que son de TI</Button>
      <Button onClick={req2}>
        Consulta 2: Candidatos que hablan ingles avanzado
      </Button>
      <Button onClick={req3}>Consulta 3: candidatos que no son de TI</Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {keys.map((k) => (
                <TableCell>{json.fields[k].label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el) => (
              <TableRow
                key={el}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {keys.map((k) => (
                  <TableCell>{el[k]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/login">Cerrar sesión</Link>
    </div>
  );
};

export default Info;
