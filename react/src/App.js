import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { StyledEngineProvider } from '@mui/material';
import Dashboard from './mainContainer/dashboard';
import NavBarComponent from './shared/components/material_navbar/navbar';
import './App.css';
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Box>
          <NavBarComponent />
          <Dashboard />
        </Box>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
