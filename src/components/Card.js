import React, { useState } from "react";
import { Paper, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { token, api_key } from "../config";

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(0.7, 1, 0.7, 2),
    margin: theme.spacing(1),
  },
  input: {
    background: "white",
    padding: theme.spacing(0.7, 1, 0.7, 2),
    marginLeft: "7px",
    width: "95%",
    borderRadius: "5px",
  },
}));

export default function Card(props) {
  const [open, setOpen] = useState(false);
  const [text, changeText] = useState(props.data.name);
  const classes = useStyle();

  const saveChange = async () => {
    setOpen(!open);
    const id = props.data.id;
    await axios.put(
      `https://api.trello.com/1/cards/${id}?name=${text}&key=${api_key}&token=${token}`
    );
  };
  return (
    <div>
      {open ? (
        <InputBase
          className={classes.input}
          onBlur={() => saveChange()}
          value={text}
          onChange={(e) => changeText(e.target.value)}
        />
      ) : (
        <Paper className={classes.card}>
          <div className="card-content">
            <span className="main-card-content" onClick={() => setOpen(!open)}>
              {text}
            </span>
            <div className="delete">
              <DeleteIcon
                onClick={() => props.deleteCard(props.data.id, text)}
              />
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
}
