import React, { useState } from 'react';
import "./bootstrap";
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Router from './toolpad/router';

function App() {
  const defaultTheme = createTheme();

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
            <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
              <Router/>
            </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
