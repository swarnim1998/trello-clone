import React, { useState } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  card: {
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(0, 1, 1, 1),
  },
  input: {
    marginLeft: theme.spacing(1),
  },
  btnConform: {
    backgroundColor: "#5AAC44",
    "&:hover": {
      background: fade("#5AAC44", 0.25),
    },
  },
}));

export default function InputCard(props) {
  const classes = useStyle();
  const [cardTitle, setCardTitle] = useState();
  const handle = (e) => {
    setCardTitle(e.target.value);
  };
  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handle}
            value={cardTitle}
            multiline
            fullWidth
            className={classes.input}
            placeholder="Enter title..."
          />
        </Paper>
      </div>
      <div>
        <Button
          className={classes.btnConform}
          onClick={() => props.addCard(cardTitle)}
        >
          Add Card
        </Button>
        <IconButton>
          <ClearIcon onClick={() => props.setOpen(false)} />
        </IconButton>
      </div>
    </div>
  );
}
