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
  settings,
  toggleFavorite,
  favorites,
  showOnlyFavorites
}) => {
  const { books, randomSeed = 0 } = settings;
  const favoriteFilter = ({ id }) => {
    return !!favorites[id];
  }
  const clippingsToShow = randomClippings.filter(
    ({ title }) => books[title].show
  ).filter(showOnlyFavorites ? favoriteFilter : () => true)


  if (clippingsToShow.length === 0) {
    return <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',

    }}>
      <div style={{
        margin: 100,
        textAlign: 'center'
      }}>
        Aucun surlignements trouvés, allez dans la section réglages pour en importer
        </div></div >
  }

  const slideRenderer = ({ key, index }) => {
    if (index < 0 || index > clippingsToShow.length - 1) {
      return null
    }
    const { title, authors, content, loc, id } = clippingsToShow[index];
    return (
      <Clipping
        id={id}
        key={id}
        thumbnailUrl={thumbnails[title + "->" + authors[0]]}
        title={title}
        authors={authors}
        content={content}
        loc={loc}
        toggleFavorite={toggleFavorite}
        isInFavorite={favorites[id]}
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
