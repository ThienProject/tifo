import { ChangeEvent, useState } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  SelectChangeEvent
} from '@mui/material';

import { LockTwoTone, EditTwoTone, RemoveRedEyeTwoTone } from '@mui/icons-material';
import BulkActions from './BulkActions';
import { IUserAdmin } from 'src/types/user';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';
import DetailUserModal from './DetailUserModal';
import { useAppDispatch } from 'src/redux_store';
import LockUserModal from '../../components/LockUserModal';
import { t } from 'i18next';
import UnClockUserModal from '../../components/UnClockUserModal';
import ChangeRuleModal from '../../components/ChangeRuleModal';

const getStatusLabel = (userStatus: 'banned' | 'reported' | 'online' | 'offline'): JSX.Element => {
  const map = {
    banned: {
      text: t('admin.users.filter.banned'),
      color: '#f50057'
    },
    reported: {
      text: t('admin.users.filter.reported'),
      color: '#ff9100'
    },
    online: {
      text: 'Online',
      color: ''
    },
    offline: {
      text: 'Offline',
      color: ''
    }
  };
  console.log({ userStatus });
  const { text, color }: any = map[userStatus];

  return <Typography color={color}>{text}</Typography>;
};
const statusOptions = [
  {
    id: 'banned',
    name: t('admin.users.filter.banned')
  },
  {
    id: 'reported',
    name: t('admin.users.filter.reported')
  },
  {
    id: 'all',
    name: t('admin.users.filter.all')
  }
];

const UsersTable = ({
  users,
  page,
  limit,
  total,
  handlePageChange,
  handleLimitChange,
  setFilters
}: {
  users: IUserAdmin[];
  page: number;
  limit: number;
  total: number;
  filters: any;
  setFilters: any;
  handlePageChange: (event: any, newPage: number) => void;
  handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const selectedBulkActions = selectedUsers.length > 0;
  const dispatch = useAppDispatch();
  const handleStatusChange = (event: SelectChangeEvent<string>): void => {
    let value: any = null;
    if (event.target.value !== '') {
      value = event.target.value;
      setFilters([value]);
    }
  };

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedUsers(event.target.checked ? users.map((user) => user.id_user!) : []);
  };

  const handleSelectOneUser = (event: ChangeEvent<HTMLInputElement>, userId: string): void => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((id) => id !== userId));
    }
  };

  const selectedSomeUsers = selectedUsers.length > 0 && selectedUsers.length < users.length;
  const selectedAllUsers = selectedUsers.length === users.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel>Status</InputLabel>
                <Select defaultValue={'all'} onChange={handleStatusChange} label={t('admin.posts.status')} autoWidth>
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title={t('admin.manageUser')}
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  color='primary'
                  checked={selectedAllUsers}
                  indeterminate={selectedSomeUsers}
                  onChange={handleSelectAllUsers}
                />
              </TableCell>
              <TableCell>{t('admin.users.detail')}</TableCell>
              {/* <TableCell>User ID</TableCell> */}
              <TableCell>{t('admin.users.role')}</TableCell>
              <TableCell align='right'>{t('admin.users.totalPost')}</TableCell>
              <TableCell align='right'>{t('admin.users.postReport')}</TableCell>
              <TableCell align='right'>{t('admin.users.status')}</TableCell>
              <TableCell align='right'>{t('admin.users.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const isUserSelected = selectedUsers.includes(user.id_user!);
              return (
                <TableRow hover key={user.id_user} selected={isUserSelected}>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      color='primary'
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneUser(event, user.id_user!)}
                      value={isUserSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {user?.username}
                    </Typography>
                    <Typography variant='body2' color='text.secondary' noWrap>
                      {user?.id_user}
                    </Typography>
                  </TableCell>
                  {/* <TableCell>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {user?.id_user}
                    </Typography>
                  </TableCell> */}
                  <TableCell>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {user?.role}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {user?.post_quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {user?.post_reports || 0}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>{user.status && getStatusLabel(user.status!)}</TableCell>
                  <TableCell align='right'>
                    <Tooltip title='View' arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.palette.primary.light
                          },
                          color: theme.palette.primary.main
                        }}
                        color='inherit'
                        size='small'
                        onClick={() => {
                          const action = openModal({
                            modalId: MODAL_IDS.viewDetailUser,
                            dialogComponent: <DetailUserModal user={user} />
                          });
                          dispatch(action);
                        }}
                      >
                        <RemoveRedEyeTwoTone />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Edit User' arrow>
                      <IconButton
                        onClick={() => {
                          const action = openModal({
                            modalId: MODAL_IDS.changeRuleUser,
                            dialogComponent: <ChangeRuleModal user={user} />
                          });
                          dispatch(action);
                        }}
                        sx={{
                          '&:hover': {
                            background: theme.palette.primary.light
                          },
                          color: theme.palette.primary.main
                        }}
                        color='inherit'
                        size='small'
                      >
                        <EditTwoTone />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Lock User' arrow>
                      <IconButton
                        onClick={() => {
                          if (user.status !== 'banned') {
                            const action = openModal({
                              modalId: MODAL_IDS.lockUser,
                              dialogComponent: <LockUserModal user={user} />
                            });
                            dispatch(action);
                          } else {
                            const action = openModal({
                              modalId: MODAL_IDS.unLockUser,
                              dialogComponent: <UnClockUserModal user={user} />
                            });
                            dispatch(action);
                          }
                        }}
                        sx={{
                          '&:hover': { background: theme.palette.error.light },
                          color: theme.palette.error.main
                        }}
                        color='inherit'
                        size='small'
                      >
                        <LockTwoTone fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component='div'
          count={total}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default UsersTable;
