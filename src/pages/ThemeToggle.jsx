import { Switch, FormControlLabel, Box } from "@mui/material";
import { useTheme } from "../hooks/useTheme.jsx";

const ThemeToggle = () => {
  const { toggleTheme, getCurrentTheme } = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <FormControlLabel
        control={
          <Switch
            checked={getCurrentTheme() === "dark"}
            onChange={toggleTheme}
          />
        }
        label="Тёмная тема"
      />
    </Box>
  );
};

export default ThemeToggle;