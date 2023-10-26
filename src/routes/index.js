import { useRoutes } from 'react-router-dom';

import AuthenticationRoutes from './authRoutes';
import MainRoutes from './mainRoutes';

export default function ThemeRoutes() {
  return useRoutes([AuthenticationRoutes, MainRoutes]);
}
