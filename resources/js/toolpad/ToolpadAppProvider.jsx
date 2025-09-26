import React, { useState, useEffect } from 'react';
import { ReactRouterAppProvider as AppProvider } from '@toolpad/core/react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SensorsIcon from '@mui/icons-material/Sensors';

import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import test_theme from './theme';

const ToolpadAppProvider = () => {

  const navigation = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: '',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      segment: 'sensor-simulator',
      title: 'Sensor Simulator',
      icon: <SensorsIcon />,
    },
  ];

  return (
    <AppProvider
      theme={test_theme}
      navigation={navigation}
      branding={{
        title: import.meta.env.VITE_APP_NAME,
        logo: <img src={'/logo.png'} alt="Test logo" />,
      }}
    >
      <Outlet />
    </AppProvider>
  );
};

export default ToolpadAppProvider;