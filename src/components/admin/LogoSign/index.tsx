import { Box, Tooltip, Badge, TooltipProps, tooltipClasses, styled, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
`
);

const LogoSign = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.grey[50]};
        width: 18px;
        height: 18px;
        border-radius: ${4};
        position: relative;
        transform: rotate(45deg);
        top: 3px;
        left: 17px;

        &:after, 
        &:before {
            content: "";
            display: block;
            width: 18px;
            height: 18px;
            position: absolute;
            top: -1px;
            right: -20px;
            transform: rotate(0deg);
            border-radius: ${3};
        }

        &:before {
            background: ${theme.palette.primary.main};
            right: auto;
            left: 0;
            top: 20px;
        }

        &:after {
            background: ${theme.palette.secondary.main};
        }
`
);

const LogoSignInner = styled(Box)(
  ({ theme }) => `
        width: 16px;
        height: 16px;
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 5;
        border-radius: ${3};
        background: ${theme.palette.grey[50]};
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.grey[50],
    color: theme.palette.getContrastText(theme.palette.text.primary),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: 3,
    boxShadow: '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.grey[400]
  }
}));

function Logo() {
  const theme = useTheme();

  return (
    <TooltipWrapper title='Tokyo Free White React Typescript Admin Dashboard' arrow>
      <LogoWrapper to='/overview'>
        <Badge
          sx={{
            '.MuiBadge-badge': {
              fontSize: theme.typography.pxToRem(11),
              right: -2,
              top: 8
            }
          }}
          overlap='circular'
          color='success'
          badgeContent='2.0'
        >
          <LogoSignWrapper>
            <LogoSign>
              <LogoSignInner />
            </LogoSign>
          </LogoSignWrapper>
        </Badge>
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
