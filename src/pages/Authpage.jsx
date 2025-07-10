import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Avatar,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  CircularProgress,
  Backdrop,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { toast } from "react-toastify";
import { api } from "../api";

export default function AuthPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });

  useEffect(() => {
    const flash = sessionStorage.getItem("auth_error");
    if (flash) {
      toast.error(flash);
      sessionStorage.removeItem("auth_error");
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (!form.email || !form.password || (isSignup && (!form.username || !form.name))) {
        toast.error("Please fill in all required fields.");
        return;
      }

      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 25000);

      if (isSignup) {
        await api.signup(form);
        toast.success("Signup successful. Logging in...");
      }

      const { access_token } = await api.login({
        email: form.email,
        password: form.password,
      });

      if (rememberMe) {
        localStorage.setItem("token", access_token);
      } else {
        sessionStorage.setItem("token", access_token);
      }

      const sub = await api.getSubscription();

      clearTimeout(timeout);
      setLoading(false);

      if (sub.plan === "pro") {
        navigate("/dashboard/pro");
      } else if (sub.plan === "business") {
        navigate("/dashboard/business");
      } else {
        navigate("/dashboard/free");
      }
    } catch (err) {
      setLoading(false);
      const msg = err?.response?.data?.detail;
      console.error("Auth error:", err);

      if (msg?.toLowerCase().includes("user not found")) {
        toast.error("No account found with that email. Please sign up.");
      } else if (msg?.toLowerCase().includes("invalid email or password")) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error(msg || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      {/* Fullscreen loading indicator */}
      <Backdrop open={loading} sx={{ color: "#1976d2", zIndex: (t) => t.zIndex.drawer + 1 }}>
        <CircularProgress size={80} thickness={5} color="inherit" />
      </Backdrop>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          background: theme.palette.mode === "dark"
            ? theme.palette.background.default
            : "linear-gradient(135deg, #f0f4f8, #ffffff)",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 4 },
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[8],
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
          </Box>

          <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
            {isSignup ? "Create Account" : "Welcome Back"}
          </Typography>

          <Box mt={2}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={form.email}
              onChange={handleChange}
            />

            <TextField
              name="password"
              label="Password"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {isSignup && (
              <>
                <TextField
                  name="username"
                  label="Username"
                  fullWidth
                  margin="normal"
                  value={form.username}
                  onChange={handleChange}
                />
                <TextField
                  name="name"
                  label="Full Name"
                  fullWidth
                  margin="normal"
                  value={form.name}
                  onChange={handleChange}
                />
              </>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={() => setRememberMe((prev) => !prev)}
                />
              }
              label="Remember me"
              sx={{ mt: 1 }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              sx={{
                mt: 2,
                py: 1.4,
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: 2,
              }}
            >
              {isSignup ? "Sign Up & Login" : "Login"}
            </Button>

            <Box textAlign="center" mt={2}>
              <Link
                component="button"
                variant="body2"
                underline="hover"
                onClick={() => setIsSignup((prev) => !prev)}
              >
                {isSignup
                  ? "Already have an account? Login"
                  : "New here? Create an account"}
              </Link>
            </Box>

            <Typography variant="body2" align="center" mt={4} mb={1} color="text.secondary">
              Or continue with
            </Typography>

            <Box display="flex" gap={2} justifyContent="center" mt={1}>
              <Button
                startIcon={<GoogleIcon />}
                variant="outlined"
                color="inherit"
                fullWidth
                sx={{ textTransform: "none" }}
                disabled
              >
                Google
              </Button>
              <Button
                startIcon={<GitHubIcon />}
                variant="outlined"
                color="inherit"
                fullWidth
                sx={{ textTransform: "none" }}
                disabled
              >
                GitHub
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
