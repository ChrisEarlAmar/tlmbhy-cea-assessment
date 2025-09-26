import React, { useEffect, useState } from 'react';
import { Typography, Box, LinearProgress } from '@mui/material';

const Loader = () => {

  const [loadingDots, setLoadingDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots(prev => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70vh',
        }}
      >
        <img width="240px" src="/logo.png" />
        <Typography sx={{ mt: 4, mb: 2, fontWeight: 'bold' }} variant="h3" align="center" gutterBottom>
          Test
        </Typography>
        <Typography sx={{ mt: 1 }} variant="h6" align="center" gutterBottom>
          Loading{'.'.repeat(loadingDots)}
        </Typography>

      </Box>
    </>

  );
};

export default Loader;