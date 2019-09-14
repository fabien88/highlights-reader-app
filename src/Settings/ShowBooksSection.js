import React, { useState } from "react";

import { parseClippings } from "./clipping-parser";
import "./Settings.scss";
import PublishIcon from "@material-ui/icons/Publish";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "../Elements/Switch";
import Section from "./Section";
import Thumbnail from "../Highlights/Thumbnail";

import "./ShowBooksSection.scss";
const alphaSort = (a, b) => {
  var nameA = a.title.toLowerCase(),
    nameB = b.title.toLowerCase();
  if (nameA < nameB)
    //sort string ascending
    return -1;
  if (nameA > nameB) return 1;
  return 0; //default return value (no sorting)
};

const Book = ({ title, author, thumbnailUrl }) => {
  return (
    <div>
      <Thumbnail title={title} author={author} thumbnailUrl={thumbnailUrl} />
      <div className="title">{title}</div>
    </div>
  );
};

const ShowBooksSection = ({ books = {}, setSettings, thumbnails }) => {
  const onChange = (title, bookSetting) => show => {
    const updatedBookSetting = { ...bookSetting, show };
    const updatedBook = { [title]: updatedBookSetting };
    setSettings({ books: { ...books, ...updatedBook } });
  };
  return (
    <Section header="Livres affichés">
      {Object.values(books)
        .sort(alphaSort)
        .map(book => (
          <Switch
            key={book.title}
            checked={book.show}
            label={
              <Book
                title={book.title}
                author={book.author}
                thumbnailUrl={thumbnails[book.title + "->" + book.author]}
              />
            }
            onChange={onChange(book.title, book)}
          />
        ))}
    </Section>
  );
};
export default ShowBooksSection;
