import Home from '../components/Home';
import Games from '../components/Games';
import Play from '../components/Play';
import NotFound from '../components/NotFound';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/games',
    component: Games,
    exact: true
  },
  {
    path: '/play',
    component: Play,
    exact: true
  },
  {
    path: '/*',
    component: NotFound
  }
];

export default routes;