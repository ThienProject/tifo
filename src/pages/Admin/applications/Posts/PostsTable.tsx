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

import { LockTwoTone, RemoveRedEyeTwoTone } from '@mui/icons-material';
import BulkActions from './BulkActions';
import { useAppDispatch } from 'src/redux_store';
import { IPostAdmin } from 'src/types/post';
import MODAL_IDS from 'src/constants/modal';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import DetailPostModal from './DetailPostModal';

const getStatusLabel = (postStatus: 'banned' | 'reported' | 'active'): JSX.Element => {
  const map = {
    banned: {
      text: 'Banned',
      color: '#f50057'
    },
    reported: {
      text: 'Reported',
      color: '#ff9100'
    },
    active: {
      text: 'Active',
      color: ''
    }
  };
  console.log({ postStatus });
  const { text, color }: any = map[postStatus];

  return <Typography color={color}>{text}</Typography>;
};
const statusOptions = [
  {
    id: 'banned',
    name: 'Banned'
  },
  {
    id: 'reported',
    name: 'Report'
  },
  {
    id: 'all',
    name: 'All'
  }
];

const PostsTable = ({
  posts,
  page,
  limit,
  handlePageChange,
  handleLimitChange,
  setFilters,
  filters,
  total
}: {
  posts: IPostAdmin[];
  page: number;
  limit: number;
  filters: any;
  setFilters: any;
  total: number;
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
    setSelectedUsers(event.target.checked ? posts.map((post) => post.id_post!) : []);
  };

  const handleSelectOneUser = (event: ChangeEvent<HTMLInputElement>, postId: string): void => {
    if (!selectedUsers.includes(postId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, postId]);
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((id) => id !== postId));
    }
  };

  const selectedSomeUsers = selectedUsers.length > 0 && selectedUsers.length < posts.length;
  const selectedAllUsers = selectedUsers.length === posts.length;
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
                <Select defaultValue={filters[0] || 'all'} onChange={handleStatusChange} label='Status' autoWidth>
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title='Users Manager'
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
              <TableCell>Post Details</TableCell>
              {/* <TableCell>User ID</TableCell> */}
              <TableCell>Username</TableCell>
              <TableCell align='right'>total loves</TableCell>
              <TableCell align='right'>total reports</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => {
              const isUserSelected = selectedUsers.includes(post.id_post!);
              return (
                <TableRow hover key={post.id_post} selected={isUserSelected}>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      color='primary'
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneUser(event, post.id_post!)}
                      value={isUserSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {post?.id_post}
                    </Typography>
                    <Typography variant='body2' color='text.secondary' width={200} noWrap>
                      {post?.description}
                    </Typography>
                  </TableCell>
                  {/* <TableCell>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {post?.id_post}
                    </Typography>
                  </TableCell> */}
                  <TableCell>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {post?.username}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {post?.loves || 0}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {post?.reports_quantity || 0}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>{post.status && getStatusLabel(post.status!)}</TableCell>
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
                            modalId: MODAL_IDS.viewDetailPostAdmin,
                            dialogComponent: <DetailPostModal post={post} />
                          });
                          dispatch(action);
                        }}
                      >
                        <RemoveRedEyeTwoTone />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip title='Edit post' arrow>
                      <IconButton
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
                    </Tooltip> */}
                    <Tooltip title='Lock post' arrow>
                      <IconButton
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

export default PostsTable;
