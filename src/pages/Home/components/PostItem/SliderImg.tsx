import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';
import { IMedia } from 'src/types/post';
import LightBox from './LightBox';
function ItemImg(props: { item: IMedia }) {
  const { item } = props;
  const [isLightBox, setIsLightBox] = useState(false);
  return (
    <Box
      onClick={() => {
        setIsLightBox(!isLightBox);
      }}
      height={300}
      overflow={'hidden'}
      borderRadius={2}
      sx={{ p: 0 }}
    >
      {!isLightBox && (
        <img
          style={{
            objectFit: 'cover',
            height: '100%',
            width: '100%'
          }}
          alt={item.id_media + item.type}
          src={'https://res.cloudinary.com/vuongute/image/upload/v1653878124/DO_AN/ytp8xvawdebeetm9cvll.webp'}
        />
      )}
      {isLightBox && <LightBox />}
    </Box>
  );
}
const SliderImg = ({ medias }: { medias: IMedia[] }) => {
  return (
    <Box>
      <Carousel
        autoPlay={false}
        indicatorIconButtonProps={{
          style: {
            // 1
            color: 'var(--mui-palette-grey-800)' // 3
          }
        }}
        activeIndicatorIconButtonProps={{
          style: {
            fontSize: '13px',
            color: 'var(--mui-palette-common-white)'
            // backgroundColor: 'var(--mui-palette-common-white)' // 2
          }
        }}
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            zIndex: 2,
            marginTop: '-30px', // 5
            textAlign: 'center' // 4
          }
        }}
        navButtonsProps={{
          // Move the buttons to the bottom. Unsetting top here to override default style.
          style: {
            padding: 0,
            opacity: '0.6'
          }
        }}
      >
        {medias.map((item, i) => (
          <ItemImg key={i} item={item} />
        ))}
      </Carousel>
    </Box>
  );
};

export default SliderImg;
