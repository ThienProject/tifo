import 'src/assets/styles/app.css';
import 'src/assets/styles/app.scss';
import { useRoutes } from 'react-router';
import routes from 'src/routes/routes';
import { useAppSelector } from './redux_store';
// Add with other imports

const App = () => {
  const { me } = useAppSelector((state) => state.userSlice);
  const login = me;
  return useRoutes(routes(login));
};

export default App;
