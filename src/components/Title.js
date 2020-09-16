import React, { useState } from "react";
import { Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { token, api_key } from "../config";

const useStyles = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: "flex",
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  editTitle: {
    flexGrow: 1,
    background: "white",
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default function Title(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.data.name);
  const classes = useStyles();

  const saveChange = async () => {
    setOpen(!open);

    const id = props.data.id;
    await axios.put(
      `https://api.trello.com/1/lists/${id}?name=${title}&key=${api_key}&token=${token}`
    );
  };

  return (
    <div>
      {open ? (
        <div>
          <InputBase
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={classes.editTitle}
            onBlur={() => saveChange()}
            fullWidth
          />
        </div>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
          >
            {title}
          </Typography>
        </div>
      )}
    </div>
  );
}
