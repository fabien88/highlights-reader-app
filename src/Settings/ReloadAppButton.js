import React, { useState } from "react";

import { parseClippings } from "./clipping-parser";
import "./Settings.scss";
import Button from "@material-ui/core/Button";
import ReplayIcon from '@material-ui/icons/Replay';
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
     container: {
          display: 'flex',
          justifyContent: 'center',
     },
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

const ReloadApp = ({ clippings, setState }) => {
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
          <div className={classes.container}>


               <Button
                    onClick={() => document.location.reload(true)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
               >
                    Recharger l'application
          <ReplayIcon className={classes.rightIcon} />

               </Button>
          </div>
     );
};
export default ReloadApp;
