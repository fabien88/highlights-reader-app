import React, { useState } from "react";

import { parseClippings } from "./clipping-parser";
import "./Settings.scss";
import PublishIcon from "@material-ui/icons/Publish";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "../Elements/SnackBar";
import Section from "./Section";
import { downloadThumbnail } from "../Highlights/thumbnail-downloader";

const shuffleArray = arr =>
  arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginBottom: -7,
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const defaultState = {
  isShowUploadSuccessfull: false
};

const ImportSection = ({ clippings, setState }) => {
  const classes = useStyles();

  const shuffleClippings = event => {
    const randomClippings = shuffleArray(clippings);

    setState({
      randomClippings,
      currentIndex: 0,
      currentView: "highlights"
    });
  };
  return (
    <Section header="Surlignements aléatoires">
      <Button
        onClick={shuffleClippings}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Voir les surlignements en aléatoire
      </Button>
    </Section>
  );
};
export default ImportSection;
