import React from "react";
import { downloadThumbnail } from "./thumbnail-downloader";

import "./Thumbnail.scss";

const EmptyThumbnail = () => <div className="emptyThumbnail" />;

const Thumbnail = ({ title, author, thumbnailUrl }) => {
  if (!thumbnailUrl) {
    return <EmptyThumbnail />;
  }
  return <img className="thumbnail" alt="thumb" src={thumbnailUrl} />;
};

export default Thumbnail;
