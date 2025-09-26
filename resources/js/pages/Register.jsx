import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { register } from "../auth/authService";
import { useAuth } from "../auth/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(
        form.name,
        form.email,
        form.password,
        form.password_confirmation
      );

      // Optionally fetch user info after registration
      // const user = await getUser();
      // setUser(user);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed: invalid data or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Logo + App name like Login page */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <img
              src="/logo.png"
              alt="App Logo"
              style={{ width: "100px", height: "auto" }}
            />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
              Test System
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    color="primary"
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            name="password_confirmation"
            type={showConfirmPassword ? "text" : "password"}
            value={form.password_confirmation}
            onChange={handleChange}
            disabled={loading}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                    color="primary"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?{" "}
            <Typography
              component={Link}
              to="/login"
              variant="body2"
              sx={{
                ml: 0.5,
                textDecoration: "none",
                fontWeight: 500,
                color: "primary.main",
              }}
            >
              Login
            </Typography>
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant={loading ? "outlined" : "contained"}
            size="large"
            disabled={loading}
            sx={{ mt: 3, borderRadius: 2, height: 48 }}
          >
            {loading ? (
              <CircularProgress size={24} color="primary" />
            ) : (
              "Register"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
