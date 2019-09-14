import React, { useState } from "react";

import "./Settings.scss";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Section from "./Section";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const ResetSection = ({ resetState }) => {
  const classes = useStyles();

  return (
    <Section header="Réinitialiser l'application">
      <Button
        onClick={resetState}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Réinitialiser tous les réglages
        <DeleteForeverIcon className={classes.rightIcon} />
      </Button>
    </Section>
  );
};
export default ResetSection;
