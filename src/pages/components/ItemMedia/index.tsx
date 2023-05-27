import React, { useEffect, useRef, useState } from 'react';
import { Box, CardActionArea, CardActions } from '@mui/material';
import { IMedia } from 'src/types/post';
import { CPath } from 'src/constants';
import CardMedia from '@mui/material/CardMedia/CardMedia';
import { Pause, PlayArrow } from '@mui/icons-material';
import { SxProps } from '@mui/material/styles';
function ItemMedia(props: {
  item: IMedia;
  sx: SxProps;
  isClose?: boolean;
  control?: boolean;
  isReel?: boolean;
  autoPlay?: boolean;
}) {
  const { item, sx, isClose = false, control = true, isReel, autoPlay = false } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayAuto, setIsPlayAuto] = useState(false);
  console.log('render...', item.media_link);
  useEffect(() => {
    if (item.type === 'video') {
      const handleScroll = () => {
        if (videoRef.current) {
          const mediaCardRect = videoRef.current?.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          if (mediaCardRect.top > 0 && mediaCardRect.bottom < viewportHeight) {
            // console.log(item.media_link, 'mediaCardRect.top ', mediaCardRect.top);
            isReel && setIsPlayAuto(true);
          } else {
            // console.log('stop', item.media_link, mediaCardRect.top);
            setIsPlayAuto(false);
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && isClose && videoRef.current.pause) {
      videoRef.current.pause();
    }
  }, [isClose]);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      const mediaCardRect = videoRef.current?.getBoundingClientRect();
      if (mediaCardRect) {
        const viewportHeight = window.innerHeight;
        if (mediaCardRect.top > 0 && mediaCardRect.bottom < viewportHeight) setIsPlayAuto(true);
      }
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlayAuto) {
        console.log('play', item.media_link);
        if (videoRef.current.play)
          videoRef.current.play().catch((error) => {
            // Autoplay was prevented, handle the error
            console.log('Autoplay prevented:', error);
          });
      } else {
        console.log('pause');
        if (videoRef.current.pause) videoRef.current.pause();
      }
    }
  }, [isPlayAuto]);

  return (
    <Box sx={{ ...sx, p: 0, position: 'relative' }} overflow={'hidden'} borderRadius={2}>
      <CardActionArea
        onClick={() => {
          item.type === 'video' && !control && setIsPlayAuto((prev) => !prev);
        }}
      >
        <CardMedia
          ref={videoRef}
          sx={sx}
          autoPlay={isPlayAuto}
          loop={true}
          // muted={playing}
          component={item.type === 'video' ? 'video' : 'img'}
          alt='media'
          src={CPath.host_public + item.media_link}
          title={item.type}
          controls={control}
          onPause={() => {
            setIsPlayAuto(false);
          }}
          onPlay={() => {
            setIsPlayAuto(true);
          }}
        />
        {!control && item.type === 'video' && (
          <CardActions>
            {isPlayAuto ? (
              <Pause sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            ) : (
              <PlayArrow sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            )}
          </CardActions>
        )}
      </CardActionArea>
    </Box>
  );
}
export default ItemMedia;
