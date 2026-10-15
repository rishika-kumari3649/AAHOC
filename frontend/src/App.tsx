import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HospitalProvider } from './context/HospitalContext';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <HospitalProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HospitalProvider>
  );
};

export default App;