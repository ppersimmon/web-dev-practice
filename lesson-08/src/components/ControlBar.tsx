import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import NewPost from "./NewPost";
import { logout } from "../store/slices/userSlice";
import { RootState } from "../store/store";

interface ControlBarProps {
  onPostCreated?: (post: any) => void;
}

const ControlBar = ({ onPostCreated }: ControlBarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.users.singleUser);
  const isAuth = !!user || !!localStorage.getItem("token");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handlePostSuccess = (post: any) => {
    if (onPostCreated) {
      onPostCreated(post);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Stack
          direction="row"
          sx={{ width: "100%", height: "100%" }}
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            {isAuth && (
              <Button
                sx={{ color: "#ffffff" }}
                onClick={() => setModalOpen(true)}
              >
                Add New Post
              </Button>
            )}
          </Box>

          <Box
            sx={{ flex: 1, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button sx={{ color: "#ffffff" }} onClick={() => navigate("/")}>
              All Posts
            </Button>
            {isAuth && (
              <Button
                sx={{ color: "#ffffff" }}
                onClick={() => navigate("/my-profile")}
              >
                My Posts
              </Button>
            )}
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            {isAuth ? (
              <Button sx={{ color: "#ffffff" }} onClick={handleLogout}>
                Log Out
              </Button>
            ) : (
              <>
                <Button
                  sx={{ color: "#ffffff" }}
                  onClick={() => navigate("/sign-in")}
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "#ffffff", borderColor: "#ffffff" }}
                  onClick={() => navigate("/sign-up")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Stack>

        <NewPost
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          onPostCreated={handlePostSuccess}
        />
      </Toolbar>
    </AppBar>
  );
};

export default ControlBar;
