import { Avatar, Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CPath } from 'src/constants';
import { IUser } from 'src/types/user';

const UserItem = ({
  user,
  size,
  sx,
  isFullname,
  to,
  callback
}: {
  sx?: React.CSSProperties;
  user: IUser;
  size: string;
  isFullname?: boolean;
  to?: string;
  callback?: () => void;
}) => {
  let newSize: number;
  if (size === 'medium') {
    newSize = 50;
  } else {
    if (size === 'small') {
      newSize = 30;
    } else newSize = 100;
  }
  const navigate = useNavigate();
  return (
    <>
      {user && (
        <Box
          sx={{ ...sx, width: '100%' }}
          onClick={() => {
            if (callback) callback();
            if (to) {
              navigate(to);
            }
          }}
        >
          <Box pl={1} display='flex' alignItems={'center'}>
            <Box width={newSize} height={newSize}>
              <Avatar
                style={{
                  boxShadow: 'var(--mui-shadows-1)',
                  // border: '1px solid var(--mui-palette-Slider-errorTrack)',
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%'
                }}
                alt='avatar'
                src={CPath.host_user + user?.avatar}
              />
            </Box>
            <Box textAlign={'left'}>
              <Typography
                px={1}
                fontWeight={700}
                overflow={'hidden'}
                // maxWidth={100}
                whiteSpace={'nowrap'}
                textOverflow={'ellipsis'}
                fontSize={14}
                color={'common.black'}
              >
                {user.username}
              </Typography>
              {isFullname && (
                <Typography
                  px={1}
                  fontWeight={300}
                  overflow={'hidden'}
                  // maxWidth={100}
                  whiteSpace={'nowrap'}
                  textOverflow={'ellipsis'}
                  fontSize={14}
                  color={'text.secondary'}
                >
                  {user.fullname}
                </Typography>
              )}
            </Box>

            <Divider />
          </Box>
        </Box>
      )}
    </>
  );
};

export default UserItem;
