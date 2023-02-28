import Box from '@mui/material/Box';
import React from 'react';
import ReactImageVideoLightbox from 'react-image-video-lightbox';
const LightBox = () => {
  return (
    <Box zIndex={10000}>
      <ReactImageVideoLightbox
        data={[
          {
            url: 'https://placekitten.com/450/300',
            type: 'photo',
            altTag: 'some image'
          },
          {
            url: 'https://www.youtube.com/embed/ScMzIvxBSi4',
            type: 'video',
            title: 'some video'
          },
          {
            url: 'https://placekitten.com/550/500',
            type: 'photo',
            altTag: 'some other image'
          },
          {
            url: 'https://www.youtube.com/embed/ScMzIvxBSi4',
            type: 'video',
            title: 'some other video'
          }
        ]}
        startIndex={0}
        showResourceCount={true}
        onCloseCallback={(callbackFunction: () => void) => {
          callbackFunction();
        }}
        onNavigationCallback={(currentIndex: 0) => console.log(`Current index: ${currentIndex}`)}
      />
    </Box>
  );
};

export default LightBox;
