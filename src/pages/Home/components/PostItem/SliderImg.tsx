import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';
import { IMedia } from 'src/types/post';
// import LightBox from './LightBox';
import { CPath } from 'src/constants';
import CardActionArea from '@mui/material/CardActionArea/CardActionArea';
import CardMedia from '@mui/material/CardMedia/CardMedia';
import { SxProps } from '@mui/material/styles';
function ItemImg(props: { item: IMedia; sx: SxProps }) {
  const { item, sx } = props;
  // const [isLightBox, setIsLightBox] = useState(false);
  return (
    <Box
      /*  onClick={() => {
        setIsLightBox(!isLightBox);
      }} */
      sx={{ ...sx, p: 0 }}
      overflow={'hidden'}
      borderRadius={2}
    >
      {
        /* !isLightBox  && */ <CardActionArea>
          <CardMedia
            sx={sx}
            component={item.type_media === 'video' ? 'video' : 'img'}
            alt='media'
            src={CPath.host_public + item.media_link}
            title={item.type_media}
            controls
          />
        </CardActionArea>
      }
      {/* {isLightBox && <LightBox />} */}
    </Box>
  );
}
const SliderImg = ({ medias, sx }: { medias?: IMedia[]; sx: SxProps }) => {
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
            >
              {medias.map((item, i) => (
                <ItemImg sx={sx} key={i} item={item} />
              ))}
            </Carousel>
          ) : (
            <ItemImg sx={sx} item={medias[0]} />
          )}
        </Box>
      )}
    </>
  );
};

export default SliderImg;
