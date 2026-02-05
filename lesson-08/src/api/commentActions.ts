import api from "./axiosInstance";
import { CommentI } from "../interfaces/CommentI";

export const fetchComments = async (exhibitId: number) => {
  const response = await api.get<CommentI[]>(
    `/api/exhibits/${exhibitId}/comments`,
  );
  return response.data;
};

export const addComment = async (exhibitId: number, text: string) => {
  const response = await api.post<CommentI>(
    `/api/exhibits/${exhibitId}/comments`,
    {
      text,
    },
  );
  return response.data;
};

export const deleteComment = async (exhibitId: number, commentId: number) => {
  const response = await api.delete(
    `/api/exhibits/${exhibitId}/comments/${commentId}`,
  );
  return response.data;
};
