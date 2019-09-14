import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SettingsIcon from "@material-ui/icons/Settings";

import "./Navigation.scss";

const Navigation = ({ currentView, setCurrentView }) => (
  <BottomNavigation
    value={currentView}
    onChange={(event, currentView) => {
      setCurrentView(currentView);
    }}
    showLabels
    className="navigation"
  >
    <BottomNavigationAction
      label="Surlignements"
      icon={<ImportContactsIcon />}
      value="highlights"
    />
    <BottomNavigationAction
      label="Favoris"
      value="favorite"
      icon={<FavoriteIcon />}
    />
    <BottomNavigationAction
      label="Réglages"
      value="settings"
      icon={<SettingsIcon />}
    />
  </BottomNavigation>
);

export default Navigation;
