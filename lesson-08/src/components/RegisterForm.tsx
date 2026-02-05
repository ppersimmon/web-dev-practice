import { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockedOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../store/hooks";
import { loginUserThunk } from "../store/slices/userSlice";
import { registerUser } from "../api/userActions";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUser({ username, password });
      const resultAction = await dispatch(
        loginUserThunk({ username, password }),
      );

      if (loginUserThunk.fulfilled.match(resultAction)) {
        navigate("/my-profile");
      }
    } catch (err: any) {
      const serverMessage = err.response?.data?.message || err.message;
      setError(serverMessage || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={6}
          sx={{ padding: 4, textAlign: "center", width: "100%" }}
        >
          <Avatar sx={{ mx: "auto", mb: 1, bgcolor: "primary.main" }}>
            <LockedOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              placeholder="Enter username"
              fullWidth
              required
              autoFocus
              sx={{ mb: 2 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              placeholder="Enter password"
              fullWidth
              required
              sx={{ mb: 1 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 1, mb: 3 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>

            <Typography component="p">
              Do you have an account? <Link to={"/sign-in"}>Sign In</Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterForm;
