import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import ClipLoader from "react-spinners/ClipLoader";
import loadingAnimation from "../AnimationLoading.gif";
import "../../style/style.css";

const defaultTheme = createTheme();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [loading, setLoading] = useState(false); // State variable for loading

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch(
        "https://arena-backend-git-main-arenas-projects.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const response2 = await fetch("https://nexa-backend-git-main-saboo-nexas-projects.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const response3 = await fetch("https://autozone-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const response4 = await fetch("https://commercial-backend-git-main-saboo-commercials-projects.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      const responseData2 = await response2.json();
      const responseData3 = await response3.json();
      const responseData4 = await response4.json();

      if (response.ok) {
        if (responseData.status) {
          const token = responseData.data.token;
          localStorage.setItem("authToken", token);
          window.location.href = "/dashboard";
        } else {
          setError("Login failed: " + responseData.message);
          setIsShaking(true);
          setTimeout(() => {
            setIsShaking(false);
          }, 300);
        }
      } else {
        setError(responseData.message);
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 300);
      }
      if (response2.ok) {
        if (responseData2.status) {
          const token = responseData2.data.token;
          localStorage.setItem("authTokenNexa", token);
        }
      }
      if (response3.ok) {
        if (responseData3.status) {
          const token = responseData3.data.token;
          localStorage.setItem("authTokenAutozone", token);
        }
      }
      if (response4.ok) {
        if (responseData4.status) {
          const token = responseData4.data.token;
          localStorage.setItem("authTokenCommercial", token);
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ flexGrow: 1 }}></Box>
      {loading ? (
        <Box  sx={{
          display: "flex",
          flexDirection: "column", // Change to column
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
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
            ) : (
              <>
      <Grid container component="main" sx={{ height: "calc(100vh - 64px)" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={7}
          sx={{
            backgroundImage: "url(https://miro.medium.com/v2/resize:fit:1358/1*9m-WDdL_ji01bGbjEnutEw.gif)",
            backgroundRepeat: "no-repeat",
            backgroundColor: "light",
            backgroundPosition: "center",
            height: "500px",
            width: "400px",
            marginTop: "80px",
            backgroundSize: "contain",
          }}
        />
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              height: "63vh",
              width: "27vw",
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "100px",
              padding: "50px",
              boxShadow: "1px 2px 7px rgba(0.3, 0.3, 0.3, 0.3)",
              borderRadius: "20px",
              animation: isShaking ? "shake 0.5s" : "",
            }}
          >
          
                <img
                  src="https://www.saboogroups.com/assets/images/black-logo.png"
                  alt="Logo"
                  height="150"
                  width="150"
                  style={{ marginBottom: "16px" }}
                />
                {/* <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                  <span style={{ height: "8px", width: "8px", backgroundColor: "#1d3a8a", borderRadius: "50%", display: "inline-block", marginRight: "4px" }}></span>
                  <span style={{ height: "8px", width: "8px", backgroundColor: "#1d3a8a", borderRadius: "50%", display: "inline-block", marginRight: "4px" }}></span>
                  <span style={{ height: "8px", width: "8px", backgroundColor: "#1d3a8a", borderRadius: "50%", display: "inline-block" }}></span>
                </div> */}
                <Avatar sx={{ m: 1, backgroundColor: "#1d3a8a" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
                  Sign in
                </Typography>

              
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={toggleShowPassword}
                          aria-label={
                            showPassword ? "Hide Password" : "Show Password"
                          }
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "#1d3a8a",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "red",
                      },
                    }}
                    disabled={loading} // Disable button while loading
                  >
                    Log In
                  </Button>
                </Box>
                {error && <p className=" text-red-600">{error}</p>}
              {/* </>
            )} */}
          </Box>
        </Grid>
      </Grid>
      </>
            )}
    </ThemeProvider>
  );
};

export default Login;
