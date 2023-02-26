import React, { useEffect } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { Box } from '@mui/material';
import Fade from '@mui/material/Fade';
import { ImenuItem } from 'src/types/common';
interface Props {
  activeIcon: React.ReactNode;
  placement?: PopperPlacementType;
  content: (handleClose: (event: Event | React.SyntheticEvent) => void) => React.ReactNode;
  sx: object;
  isOpen: boolean;
  name: string;
  setMenus: React.Dispatch<React.SetStateAction<ImenuItem[]>>;
}
const PopperCustom = (props: Props) => {
  const { activeIcon, content, sx, placement, isOpen, setMenus, name } = props;
  const anchorRef = React.useRef<HTMLButtonElement>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>();
  useEffect(() => {
    setAnchorEl(anchorRef.current);
  }, [isOpen]);
  const handleToggle = () => {
    // setOpen((prevOpen) => {
    //   console.log(prevOpen);
    //   return !prevOpen;
    // });

    if (setMenus) {
      setMenus((prev) => {
        const newMenus = prev.map((newItem) => {
          if (newItem.name === name) {
            console.log(newItem.active);
            console.log('cos');
            console.log(!newItem.active);
            return { ...newItem, active: !newItem.active };
          } else return { ...newItem, active: false };
        });
        return newMenus;
      });
    }
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setMenus((prev) => {
      const newMenus = prev.map((newItem) => {
        if (newItem.name === name) {
          return { ...newItem, active: false };
        } else return { ...newItem };
      });
      return newMenus;
    });
  };

  // function handleListKeyDown(event: React.KeyboardEvent) {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //     setOpen(false);
  //   } else if (event.key === 'Escape') {
  //     setOpen(false);
  //   }
  // }

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = React.useRef(isOpen);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current?.focus();
  //     return;
  //   }

  //   prevOpen.current = open;
  //   return;
  // }, [open]);

  return (
    <Box sx={sx}>
      <Box
        ref={anchorRef}
        id='composition-button'
        aria-controls={isOpen ? 'composition-menu' : undefined}
        aria-expanded={isOpen ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        {activeIcon}
      </Box>
      {anchorEl && (
        <Popper
          sx={{ zIndex: 9999 }}
          open={isOpen ? isOpen : false}
          anchorEl={anchorEl}
          role={undefined}
          placement={placement}
          transition
          disablePortal={false}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    sx={{ p: 0, m: 0 }}
                    // autoFocusItem={open}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    // onKeyDown={handleListKeyDown}
                  >
                    {content(handleClose)}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      )}
    </Box>
  );
};

PopperCustom.propTypes = {};

export default PopperCustom;
