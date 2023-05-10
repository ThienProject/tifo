import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import EditProfile from './components/EditProfile';
import EditPassword from './components/EditPassword';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

export default function Setting() {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh' }}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 160, m: 0 }}
      >
        <Tab sx={{ textTransform: 'capitalize' }} label={t('setting.profile')} {...a11yProps(0)} />
        <Tab sx={{ textTransform: 'capitalize' }} label={t('setting.password')} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EditProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EditPassword />
      </TabPanel>
    </Box>
  );
}
