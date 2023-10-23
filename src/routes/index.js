import { useRoutes } from 'react-router-dom';

import AuthenticationRoutes from './authRoutes';

export default function ThemeRoutes() {
  return useRoutes([AuthenticationRoutes]);
}
