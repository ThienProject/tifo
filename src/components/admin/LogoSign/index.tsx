import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import images from 'src/assets/images';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        height: 56px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {
  return (
    <Box>
      <LogoWrapper to='/admin'>
        <img src={images.full_Logo_black} alt='logo' />
      </LogoWrapper>
    </Box>
  );
}

export default Logo;
