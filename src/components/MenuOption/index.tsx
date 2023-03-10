import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SxProps } from '@mui/material';
import { PopoverOrigin } from '@mui/material/Popover';

const ITEM_HEIGHT = 48;

export default function MenuOption(props: {
  options: any[];
  icon: React.ReactNode;
  sxIcon?: SxProps;
  classIcon?: string;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}) {
  const { options, icon, sxIcon, classIcon, anchorOrigin, transformOrigin } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        className={classIcon}
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        sx={sxIcon}
        onClick={handleClick}
      >
        {icon}
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorOrigin={
          anchorOrigin || {
            vertical: 'bottom',
            horizontal: 'right'
          }
        }
        transformOrigin={
          transformOrigin || {
            vertical: 'bottom',
            horizontal: 'right'
          }
        }
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right'
        // }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch'
          }
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={option === 'Pyxis'}
            onClick={() => {
              handleClose();
              option.handleClick && option.handleClick();
            }}
          >
            {option.name || option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
