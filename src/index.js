import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import ls from "local-storage";

import "./styles.scss";
import Clippings from "./Highlights/Clippings";
import Navigation from "./Navigation";
import Settings from "./Settings/Settings";
require('offline-plugin/runtime').install();
const factoryState = {
  clippings: [],
  randomClippings: [],
  currentIndex: 0,
  thumbnails: {},
  currentView: "highlights",

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
    currentView
  } = state;
  const setState = args => {
    dispatch({ type: "setState", args });
  };

  const onChangeIndex = currentIndex => {
    console.log({ currentIndex })
    setState({ currentIndex });
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
