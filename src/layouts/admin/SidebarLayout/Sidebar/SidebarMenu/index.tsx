import { useContext } from 'react';

import { ListSubheader, alpha, Box, List, styled, Button, ListItem } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';

import { BrightnessLowTwoTone, AccountCircleTwoTone, DisplaySettingsTwoTone } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: rgba(255, 255, 255, 0.7);
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.palette.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.7);
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: rgba(255, 255, 255, 0.7);
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: rgba(255, 255, 255, 0.7);
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: rgba(255, 255, 255, 0.7);
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.palette.grey[100], 0.06)};
            color: ${theme.palette.grey[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.palette.grey[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.palette.grey[100]};
                opacity: 0;
                transition: ${theme.transitions.create(['transform', 'opacity'])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const { t } = useTranslation();

  return (
    <>
      <MenuWrapper>
        <List
          component='div'
          subheader={
            <ListSubheader component='div' disableSticky>
              {t('admin.menu.dashboards')}
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component='div'>
              <ListItem component='div'>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to='dashboards/crypto'
                  startIcon={<BrightnessLowTwoTone />}
                >
                  {t('admin.menu.statistical')}
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component='div'
          subheader={
            <ListSubheader component='div' disableSticky>
              {t('admin.menu.management')}
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component='div'>
              <ListItem component='div'>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to='users'
                  startIcon={<AccountCircleTwoTone />}
                >
                  {t('admin.menu.users')}
                </Button>
              </ListItem>
            </List>
            <List component='div'>
              <ListItem component='div'>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to='posts'
                  startIcon={<DisplaySettingsTwoTone />}
                >
                  {t('admin.menu.posts')}
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
