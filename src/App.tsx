import 'src/assets/styles/app.css';
import 'src/assets/styles/app.scss';
import { useRoutes } from 'react-router';
import routes from 'src/routes/routes';
import { useAppSelector } from './redux_store';
const App = () => {
  const { auth } = useAppSelector((state) => state.userSlice);
  const isLogin = auth?.accessToken;
  return useRoutes(routes(isLogin));
};

export default App;
