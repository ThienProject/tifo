import { useColorScheme } from '@mui/material/styles';
import React from 'react';
import Button from '@mui/material/Button';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
// ModeSwitcher is an example interface for toggling between modes.
// Material UI does not provide the toggle interface—you have to build it yourself.
// coppy ở :  https://mui.com/material-ui/experimental-api/css-theme-variables/usage/#using-theme-variables
const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // for server-side rendering
    // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    return null;
  }

  return (
    <Button
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeOutlinedIcon /> : <WbSunnyOutlinedIcon />}
    </Button>
  );
};
export default ModeSwitcher;
