import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 29,
    padding: 0,
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between"
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
        height: 26
      }
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff"
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    height: 25,
    transition: theme.transitions.create(["background-color", "border"])
  },
  checked: {},
  focusVisible: {}
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  );
});

const useStyles = makeStyles(theme => ({
  label: {
    width: "100%"
  }
}));

export default function CustomizedSwitches({ checked, onChange, label }) {
  const classes = useStyles();
  return (
    <FormControlLabel
      style={{ width: "100%" }}
      control={
        <IOSSwitch
          checked={checked}
          onChange={() => onChange(!checked)}
          value="checkedB"
        />
      }
      labelPlacement="start"
      label={label}
      classes={{
        label: classes.label
      }}
    />
  );
}
