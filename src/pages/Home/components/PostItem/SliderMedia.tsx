import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';
import { IMedia } from 'src/types/post';
import { SxProps } from '@mui/material/styles';
import ItemMedia from 'src/pages/components/ItemMedia';

const SliderMedia = ({ medias, sx }: { medias?: IMedia[]; sx: SxProps }) => {
  // const [isClose] = useState(false);
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
              {medias.map((item) => (
                <ItemMedia sx={sx} key={item.id_media} item={item} />
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
