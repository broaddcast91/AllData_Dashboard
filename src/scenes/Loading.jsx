// LoadingComponent.js
import React from 'react';
import { Box } from '@mui/material';
import loadingAnimation from "../components/AnimationLoading.gif";
const LoadingComponent = () => {
  return (
    <Box  sx={{
        display: "flex",
        flexDirection: "column", // Change to column
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}>
            <img
                src="https://www.saboogroups.com/assets/images/black-logo.png"
                alt="Logo"
                height="150"
                width="150"
                style={{ marginBottom: "16px" }}
              />
               <img src={loadingAnimation} alt="loading" style={{}} />
             </Box>
  );
};

export default LoadingComponent;
