import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import Comment from "../components/Comment";
import WriteComment from "../components/WriteComment";
import { ExhibitType } from "../interfaces/ExhibitType";
import { CommentI } from "../interfaces/CommentI";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../api/commentActions";
import { useAppSelector } from "../store/hooks";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface PostProps {
  post: ExhibitType;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post = ({ post, showDelete = false, onDelete }: PostProps) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = React.useState<CommentI[]>([]);
  const [loadingComments, setLoadingComments] = React.useState(false);
  const [commentsCount, setCommentsCount] = React.useState(
    post.commentCount || 0,
  );
  const currentUser = useAppSelector((state) => state.users.singleUser);

  const handleExpandClick = async () => {
    if (!expanded && comments.length === 0 && commentsCount > 0) {
      setLoadingComments(true);
      try {
        const data: any = await fetchComments(post.id);
        setComments(data);
        setCommentsCount(data.length);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingComments(false);
      }
    }
    setExpanded(!expanded);
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(post.id);
  };

  const handleAddComment = async (text: string) => {
    try {
      const newComment: any = await addComment(post.id, text);
      setComments([...comments, newComment]);
      setCommentsCount((prev) => prev + 1);
    } catch (e) {
      console.error("Failed to add comment", e);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(post.id, commentId);
      setComments(comments.filter((c) => c.id !== commentId));
      setCommentsCount((prev) => prev - 1);
    } catch (e) {
      console.error("Failed to delete comment", e);
    }
  };

  return (
    <Card sx={{ width: 650, maxWidth: "100%", boxShadow: 3, borderRadius: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
            {post.user?.username ? post.user.username[0].toUpperCase() : "U"}
          </Avatar>
        }
        title={post.user?.username || "Unknown User"}
        subheader={
          post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""
        }
        action={
          showDelete && (
            <IconButton aria-label="delete post" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          )
        }
      />
      <CardMedia
        component="img"
        height="300"
        image={post.imageUrl}
        alt={post.title}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            wordWrap: "break-word",
          }}
        >
          {post.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {commentsCount}
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ marginLeft: 0 }}
          >
            <ModeCommentIcon color="action" />
          </ExpandMore>
        </Box>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {currentUser ? (
            <WriteComment onAdd={handleAddComment} />
          ) : (
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography variant="body2" gutterBottom>
                Log in to post a comment.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </Button>
            </Box>
          )}

          {loadingComments ? (
            <Typography>Loading comments...</Typography>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                isOwner={Number(currentUser?.id) === Number(comment.user?.id)}
                onDelete={handleDeleteComment}
              />
            ))
          )}

          {comments.length === 0 && !loadingComments && (
            <Typography variant="body2" color="text.secondary" align="center">
              No comments yet.
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
