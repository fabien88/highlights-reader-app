import React, { Fragment } from "react";
import Clipping from "./Clipping";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from 'react-swipeable-views-utils';
import "./Clippings.scss";

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const Clippings = ({
  thumbnails,
  currentIndex,
  randomClippings,
  onChangeIndex,
  settings
}) => {
  const { books, randomSeed = 0 } = settings;
  const clippingsToShow = randomClippings.filter(
    ({ title }) => books[title].show
  );

  const slideRenderer = ({ key, index }) => {
    if (index < 0 || index > clippingsToShow.length - 1) {
      return null
    }
    const { title, authors, content, loc } = clippingsToShow[index];

    return (
      <Clipping
        id={index}
        key={index}
        //showThumbnail={shouldLoadThumbnail(index, currentIndex)}
        thumbnailUrl={thumbnails[title + "->" + authors[0]]}
        title={title}
        authors={authors}
        content={content}
        loc={loc}
      />
    )
  };
  return (
    <VirtualizeSwipeableViews
      enableMouseEvents
      resistance
      slideCount={clippingsToShow.length}
      onChangeIndex={onChangeIndex}
      index={Math.max(0, currentIndex)}
      slideRenderer={slideRenderer}
    />
  );
};
export default Clippings;
