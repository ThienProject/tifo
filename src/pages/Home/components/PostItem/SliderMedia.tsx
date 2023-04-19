import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Button, CardActionArea, IconButton } from '@mui/material';
import { IMedia } from 'src/types/post';
// import LightBox from './LightBox';
import { CPath } from 'src/constants';
import CardMedia from '@mui/material/CardMedia/CardMedia';
import { SxProps } from '@mui/material/styles';
import { ArrowForwardIos, ArrowBackIosNew } from '@mui/icons-material';
// import { Waypoint } from 'react-waypoint';
function ItemMedia(props: { item: IMedia; sx: SxProps; isClose?: boolean }) {
  const { item, sx, isClose = false } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const mediaCardRect = videoRef.current?.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (mediaCardRect.top < viewportHeight && mediaCardRect.bottom > (viewportHeight * 80) / 100) {
          // videoRef.current.play();
        } else {
          if (videoRef.current.pause) videoRef.current.pause();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (videoRef.current && isClose && videoRef.current.pause) {
      videoRef.current.pause();
    }
  }, [isClose]);
  return (
    <Box sx={{ ...sx, p: 0 }} overflow={'hidden'} borderRadius={2}>
      <CardActionArea>
        <CardMedia
          ref={videoRef}
          sx={sx}
          // loop={playing}
          // muted={playing}
          component={item.type === 'video' ? 'video' : 'img'}
          alt='media'
          src={CPath.host_public + item.media_link}
          title={item.type}
          controls
        />
      </CardActionArea>
    </Box>
  );
}
const SliderMedia = ({ medias, sx }: { medias?: IMedia[]; sx: SxProps }) => {
  const [isClose, setIsClose] = useState(false);
  return (
    <>
      {medias && (
        <Box>
          {medias.length >= 2 ? (
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
              // NavButton={({
              //   onClick,
              //   className,
              //   style,
              //   next,
              //   prev
              // }: {
              //   onClick: any;
              //   className: any;
              //   style: SxProps;
              //   next: any;
              //   prev: any;
              // }) => {
              //   // Other logic

              //   return (
              //     <Box onClick={onClick} className={className} sx={style}>
              //       {next && (
              //         <IconButton
              //           onClick={() => {
              //             setIsClose(true);
              //           }}
              //         >
              //           <ArrowForwardIos />
              //         </IconButton>
              //       )}
              //       {prev && (
              //         <IconButton
              //           onClick={() => {
              //             setIsClose(true);
              //           }}
              //         >
              //           <ArrowBackIosNew />
              //         </IconButton>
              //       )}
              //     </Box>
              //   );
              // }}
            >
              {medias.map((item, i) => (
                <ItemMedia isClose={isClose} sx={sx} key={i} item={item} />
              ))}
            </Carousel>
          ) : (
            <ItemMedia sx={sx} item={medias[0]} />
          )}
        </Box>
      )}
    </>
  );
};

export default SliderMedia;
