import React from "react";

import "./Settings.scss";
import ImportSection from "./ImportSection";
import ResetSection from "./ResetSection";
import ShowBooksSection from "./ShowBooksSection";
import ShuffleClippings from "./ShuffleClippings";
import { downloadThumbnail } from "../Highlights/thumbnail-downloader";

const defaultState = {
  isShowUploadSuccessfull: false
};

const Settings = ({
  setState,
  resetState,
  settings = defaultState,
  thumbnails,
  updateThumbnails,
  clippings
}) => {
  const setSettings = newSettings => {
    setState({ settings: { ...settings, ...newSettings } });
  };
  const { books = {} } = settings;
  // Download all thumbnails
  for (let book of Object.values(books)) {
    const { title, author } = book;
    const key = title + "->" + author;
    downloadThumbnail(thumbnails, title, author, thumbnailUrl => {
      updateThumbnails(key, thumbnailUrl);
    });
  }
  return (
    <div className="settings">
      <h1>Réglages</h1>
      <ImportSection
        settings={settings}
        setState={setState}
        setSettings={setSettings}
        updateThumbnails={updateThumbnails}
        thumbnails={thumbnails}
      />
      <ShuffleClippings clippings={clippings} setState={setState} />
      <ShowBooksSection
        books={books}
        setSettings={setSettings}
        thumbnails={thumbnails}
      />
      <ResetSection resetState={resetState} />
    </div>
  );
};

export default Settings;
