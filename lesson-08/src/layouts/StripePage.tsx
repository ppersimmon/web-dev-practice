import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Box, Toolbar, CircularProgress, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import Post from "../components/Post";
import ControlBar from "../components/ControlBar";
import AppPagination from "../components/AppPagination";
import { getEveryExhibit, deleteExhibit } from "../api/exhibitActions";
import { ExhibitType } from "../interfaces/ExhibitType";
import { usePageParam } from "../hooks/usePageParam";

const StripePage = () => {
  const [posts, setPosts] = useState<ExhibitType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((state) => state.users.singleUser);

  const page = usePageParam();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response: any = await getEveryExhibit(page);

        console.log("All Posts API Response:", response);

        if (Array.isArray(response)) {
          setPosts(response);
        } else if (response.data && Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          setPosts([]);
        }
      } catch (e) {
        console.error(e);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  const handleDeletePost = async (id: number) => {
    try {
      await deleteExhibit(id);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handlePostCreated = (newPost: ExhibitType) => {
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
      ) : (
        Array.isArray(posts) &&
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            showDelete={user?.id === post.user.id}
            onDelete={handleDeletePost}
          />
        ))
      )}

      {!loading && Array.isArray(posts) && posts.length === 0 && (
        <Typography>No posts found</Typography>
      )}

      <AppPagination />
    </Box>
  );
};

export default StripePage;
