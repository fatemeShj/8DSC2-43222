import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

const ToggleSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 38,
  height: 22,
  padding: 0,
  display: "flex",
  alignItems: "center",
  "& .MuiSwitch-switchBase": {
    padding: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#008000",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 18,
    height: 18,
    boxShadow: "none",
  },
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: "#888888",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default ToggleSwitch;
