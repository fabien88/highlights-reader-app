import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import ls from "local-storage";
import * as serviceWorker from './serviceWorker';

import "./styles.scss";
import Clippings from "./Highlights/Clippings";
import Navigation from "./Navigation";
import Settings from "./Settings/Settings";
// const runtime = require('offline-plugin/runtime');
// runtime.install({
//   onUpdating: () => {
//     console.log('SW Event:', 'onUpdating');
//   },
//   onUpdateReady: () => {
//     console.log('SW Event:', 'onUpdateReady');
//     // Tells to new SW to take control immediately
//     runtime.applyUpdate();
//   },
//   onUpdated: () => {
//     console.log('SW Event:', 'onUpdated');
//     // Reload the webpage to load into the new version
//     window.location.reload();
//   },
//   onUpdateFailed: () => {
//     console.log('SW Event:', 'onUpdateFailed');
//   }
// });

const factoryState = {
  clippings: [],
  randomClippings: [],
  currentIndex: 0,
  currentIndexFavorite: 0,
  thumbnails: {},
  currentView: "highlights",
  favorites: {},
  settings: { books: {}, randomSeed: 0 }
};

const initialState = {
  ...factoryState,
  ...ls.get("state")
};

function reducer(state, action) {
  let nextState = { ...state };
  switch (action.type) {
    case "resetState":
      nextState = factoryState;
      break;
    case "setState":
      nextState = { ...nextState, ...action.args };
      break;

    case "toggleFavorite":
      const { id } = action;
      const wasFavorite = !!nextState.favorites[id];
      const favorites = {
        ...nextState.favorites, [id]: !wasFavorite
      }
      console.log({ favorites })
      nextState = { ...nextState, favorites };
      break;

    case "setThumbnail":
      nextState = {
        ...nextState,
        thumbnails: { ...state.thumbnails, [action.key]: action.thumbnailUrl }
      };
      break;
    default:
    // console.log({ nextState });
  }
  setTimeout(() => ls.set("state", nextState), 500);
  return nextState;
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    clippings,
    randomClippings,
    currentIndex,
    thumbnails,
    currentView,
    currentIndexFavorite,
    favorites
  } = state;
  const setState = args => {
    dispatch({ type: "setState", args });
  };

  const toggleFavorite = (id) => {
    dispatch({ type: "toggleFavorite", id });
  }
  const onChangeIndex = currentIndex => {
    console.log({ currentIndex })
    setState({ currentIndex });
  };
  const onChangeFavoriteIndex = currentIndexFavorite => {
    setState({ currentIndexFavorite });
  };

  const resetState = () => {
    console.log("state reset");
    dispatch({ type: "resetState" });
  };
  const updateThumbnails = (key, thumbnailUrl) => {
    dispatch({ type: "setThumbnail", key, thumbnailUrl });
  };

  const View = () => {
    switch (currentView) {
      case "settings":
        return (
          <Settings
            setState={setState}
            resetState={resetState}
            settings={state.settings}
            clippings={state.clippings}
            thumbnails={thumbnails}
            updateThumbnails={updateThumbnails}
            clippings={clippings}
          />
        );

      case "highlights":
        return (
          <Clippings
            thumbnails={thumbnails}
            randomClippings={randomClippings}
            currentIndex={currentIndex}
            updateThumbnails={updateThumbnails}
            onChangeIndex={onChangeIndex}
            settings={state.settings}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        );
      case "favorites":
        return (
          <Clippings
            thumbnails={thumbnails}
            randomClippings={randomClippings}
            currentIndex={currentIndexFavorite}
            updateThumbnails={updateThumbnails}
            onChangeIndex={onChangeFavoriteIndex}
            settings={state.settings}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            showOnlyFavorites
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="App">
      {/* <Banner onFileUpload={onFileUpload} /> */}
      <div className="view">
        <View />
      </div>
      <Navigation
        currentView={currentView}
        setCurrentView={currentView => setState({ currentView })}
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

serviceWorker.register();
