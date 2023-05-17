import { Card } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from 'src/redux_store';
import PostsTable from './PostsTable';
import { useLocation, useParams } from 'react-router';
import { getPostsThunk } from 'src/redux_store/admin/admin_action';
import { IPostAdmin } from 'src/types/post';
import queryString from 'query-string';

function RecentOrders() {
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<IPostAdmin[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const location = useLocation();
  const filter = queryString.parse(location.search)['filter'];
  const [filters, setFilters] = useState<string[]>(() => {
    return filter === 'reported' ? [filter] : [];
  });
  const { id_user } = useParams();
  const fetchUser = (params: any) => {
    const action = getPostsThunk({ ...params, id_user });
    dispatch(action)
      .unwrap()
      .then((data) => {
        const { posts, total } = data;
        console.log({ total });
        if (posts) {
          setTotal(total);
          setPosts(posts);
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
    // if (filter === 'banned') {
    //   setFilters([filter]);
    // }
    fetchUser({ id_role: 1, limit, offset: page * limit, filters });
  }, [limit, filters, page]);
  return (
    <Card>
      <PostsTable
        setFilters={setFilters}
        filters={filters}
        total={total}
        page={page}
        limit={limit}
        handlePageChange={handlePageChange}
        posts={posts}
        handleLimitChange={handleLimitChange}
      />
    </Card>
  );
}

export default RecentOrders;
