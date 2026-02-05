import { useEffect, useState } from "react";
import { Box, Toolbar, CircularProgress, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import ControlBar from "../components/ControlBar";
import AppPagination from "../components/AppPagination";
import Post from "../components/Post";
import { getEveryUserExhibit, deleteExhibit } from "../api/exhibitActions";
import { ExhibitType } from "../interfaces/ExhibitType";
import { usePageParam } from "../hooks/usePageParam";
import { useAppSelector } from "../store/hooks";

const HomePage = () => {
  const [posts, setPosts] = useState<ExhibitType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useAppSelector((state) => state.users.singleUser);
  const page = usePageParam();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response: any = await getEveryUserExhibit(page);

        console.log("My Posts API Response:", response);

        if (Array.isArray(response)) {
          setPosts(response);
        } else if (response.data && Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error("Unknown data format:", response);
          setPosts([]);
        }
      } catch (err: any) {
        setError("Failed to load your posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  const handleDeletePost = async (id: number) => {
    try {
      await deleteExhibit(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  const handlePostCreated = (newPost: ExhibitType) => {
    const postWithUser = { ...newPost, user: currentUser };

    if (page === 1) {
      setPosts([newPost, ...posts]);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: blue[50],
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        pb: 4,
      }}
    >
      <ControlBar onPostCreated={handlePostCreated} />
      <Toolbar />

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        Array.isArray(posts) &&
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            showDelete={true}
            onDelete={handleDeletePost}
          />
        ))
      )}

      {!loading && Array.isArray(posts) && posts.length === 0 && !error && (
        <Typography>You haven't posted anything yet</Typography>
      )}

      <AppPagination />
    </Box>
  );
};

export default HomePage;
