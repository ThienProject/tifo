import { Card } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { IUser } from 'src/types/user';
import { useAppDispatch } from 'src/redux_store';
import UsersTable from './UsersTable';
import { getUsersThunk } from 'src/redux_store/admin/admin_action';

function RecentOrders() {
  const dispatch = useAppDispatch();
  const [users, setUser] = useState<IUser[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [filters, setFilters] = useState([]);

  const fetchUser = (params: any) => {
    const action = getUsersThunk(params);
    dispatch(action)
      .unwrap()
      .then((data) => {
        const { users, total } = data;
        console.log({ total });
        if (users) {
          setTotal(total);
          setUser(users);
        }
      });
  };
  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };
  useEffect(() => {
    fetchUser({ id_role: 1, limit, offset: page * limit, filters });
  }, [limit, filters, page]);
  return (
    <Card>
      <UsersTable
        total={total}
        setFilters={setFilters}
        filters={filters}
        page={page}
        limit={limit}
        handlePageChange={handlePageChange}
        users={users}
        handleLimitChange={handleLimitChange}
      />
    </Card>
  );
}

export default RecentOrders;
