import React from 'react';
import AppRoot from './containers/App';
import { SnackbarProvider } from 'notistack';
function App() {
  return (
    <SnackbarProvider>
      <AppRoot />
    </SnackbarProvider>
  );
}

export default App;
