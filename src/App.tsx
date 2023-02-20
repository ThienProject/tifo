import 'src/assets/styles/app.css';
import 'src/assets/styles/app.scss';
import { useRoutes } from 'react-router';
import routes from 'src/routes/routes';
const App = () => {
  const isLogin = true;
  return useRoutes(routes(isLogin));
};

export default App;
