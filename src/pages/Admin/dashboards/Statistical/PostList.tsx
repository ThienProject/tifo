import { MouseEvent, useState } from 'react';
import { Button, Box, ToggleButton, ToggleButtonGroup, Card, Typography, styled } from '@mui/material';
import ViewWeekTwoToneIcon from '@mui/icons-material/ViewWeekTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import PostListColumn from './PostListColumn';

const EmptyResultsWrapper = styled('img')(
  ({ theme }) => `
      max-width: 100%;
      width: ${theme.spacing(66)};
      height: ${theme.spacing(34)};
`
);

function WatchList() {
  const [tabs, setTab] = useState<string | null>('watch_list_columns');

  const handleViewOrientation = (_event: MouseEvent<HTMLElement>, newValue: string | null) => {
    setTab(newValue);
  };

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          pb: 3
        }}
      >
        <Typography fontSize={28} variant='h3'>
          Posts List
        </Typography>
      </Box>

      {tabs === 'watch_list_columns' && <PostListColumn />}

      {!tabs && (
        <Card
          sx={{
            textAlign: 'center',
            p: 3
          }}
        >
          <Typography
            align='center'
            variant='h2'
            fontWeight='normal'
            color='text.secondary'
            sx={{
              mt: 3
            }}
            gutterBottom
          >
            Click something, anything!
          </Typography>
          <Button
            variant='contained'
            size='large'
            sx={{
              mt: 4
            }}
          >
            Maybe, a button?
          </Button>
        </Card>
      )}
    </>
  );
}

export default WatchList;