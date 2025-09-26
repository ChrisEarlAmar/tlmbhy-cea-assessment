import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
  IconButton, 
  InputAdornment, 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { isLoggingOutAtom } from '../store/atom';
import { useAtomValue, useSetAtom } from 'jotai';
import { login, getUser } from "../auth/authService";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const setIsLoggingOut = useSetAtom(isLoggingOutAtom);

  useEffect(() => {
    setIsLoggingOut(false);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      const user = await getUser();
      setUser(user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Login failed: invalid credentials or server error");
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
          {/* <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography> */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: 2, // spacing between logo and text
              mb: 3,
            }}
          >
            <img
              src="/logo.png"
              alt="App Logo"
              style={{ width: "100px", height: "auto" }}
            />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center', justifyContent: 'center' }}>
            Login
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
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
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
              }
            }}
          />

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Don’t have an account?{" "}
            <Typography
              component={Link}
              to="/register"
              variant="body2"
              sx={{ ml: 0.5, textDecoration: "none", fontWeight: 500, color: "primary.main" }}
            >
              Register
            </Typography>
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant={loading ? 'outlined' : "contained"}
            size="large"
            disabled={loading}
            sx={{ mt: 3, borderRadius: 2, height: 48 }}
          >
            {loading ? (
              <CircularProgress size={24} color="primary" />
            ) : (
              "Login"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
