import React, { useState } from "react";

import { parseClippings } from "./clipping-parser";
import "./Settings.scss";
import PublishIcon from "@material-ui/icons/Publish";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "../Elements/SnackBar";
import Section from "./Section";
import { downloadThumbnail } from "../Highlights/thumbnail-downloader";

const uuidv1 = require('uuid/v1');

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

const ImportSection = ({
  setSettings,
  setState,
  settings,
  thumbnails,
  updateThumbnails
}) => {
  const { isShowUploadSuccessfull } = settings;
  const hideUploadSuccessFullMessage = () =>
    setState({ settings: { ...settings, isShowUploadSuccessfull: false } });
  console.log({ isShowUploadSuccessfull });

  const classes = useStyles();

  const computeBookList = clippings => {
    var booksTitle = clippings.map(({ title }) => title);
    var bookDict = clippings.reduce((acc, { title, authors }) => {
      acc[title] = { title, author: authors[0] };
      return acc;
    }, {});

    const books = {};
    for (let bookTitle of [...new Set(booksTitle)]) {
      books[bookTitle] = {
        title: bookTitle,
        author: bookDict[bookTitle].author,
        show: true
      };
    }
    return books;
  };

  const onFileUpload = event => {
    var files = event.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function (event) {
      var text = event.target.result;
      const clippings = parseClippings(text).map(
        ({title, author, loc, ...clipping}) => ({ title, author, loc, ...clipping, id: `${title}.${loc}` })
        );
      const books = computeBookList(clippings);
      const randomClippings = shuffleArray(clippings);

      setState({
        clippings,
        randomClippings,
        settings: {
          ...settings,
          books,
          isShowUploadSuccessfull: true
        },
        currentIndex: 0
      });

      // Download all thumbnails
      for (let book of Object.values(books)) {
        const { title, author } = book;
        const key = title + "->" + author;
        downloadThumbnail(thumbnails, title, author, thumbnailUrl => {
          updateThumbnails(key, thumbnailUrl);
        });
      }
    });
    reader.readAsText(file);
  };
  return (
    <Section header="Import des Clippings">
      <form>
        <Button variant="contained" color="primary" className={classes.button}>
          <label htmlFor="fileupload">
            Charger le fichier "My Clippings.txt"
            <PublishIcon className={classes.rightIcon} />
          </label>
        </Button>

        <input
          className="inputFile"
          id="fileupload"
          type="file"
          onChange={onFileUpload}
        />
      </form>
      {isShowUploadSuccessfull && (
        <Snackbar
          variant="success"
          className={classes.margin}
          message="Import réussi !"
          onClose={hideUploadSuccessFullMessage}
        />
      )}
    </Section>
  );
};
export default ImportSection;
