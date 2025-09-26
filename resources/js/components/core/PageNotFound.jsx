import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };


  return (
    <Box 
      sx={{ 
        height: '100%',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        maxHeight: '100%', 
        textAlign: 'center', 
        p: 3,
        overflow: 'hidden' 
      }}
    >
      <img src="/logo.png" alt="Test logo" width="200px" height="200px" />
      <Typography variant="h3" sx={{ mt: 2, fontWeight: 'bold' }}>
        Error 404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Looks like the page you're looking for might be unavailable or does not exist.
      </Typography>
      <Button 
        startIcon={<HomeIcon />}
        variant="contained"
        color="primary" 
        sx={{ mt: 3, borderRadius: '50px' }}
        onClick={handleNavigate}
        title={'Go to homepage'}
      >
        Go to Homepage
      </Button>

    </Box>
  );
};

export default PageNotFound;
