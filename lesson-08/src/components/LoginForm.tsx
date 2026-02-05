import { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import LockedOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { loginUserThunk } from "../store/slices/userSlice";

const LoginForm = () => {
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
      const resultAction = await dispatch(
        loginUserThunk({ username, password }),
      );

      if (loginUserThunk.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
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
            Sign In
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
                "Sign In"
              )}
            </Button>

            <Typography component="p">
              Don't have an account? <Link to={"/sign-up"}>Sign Up</Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginForm;
