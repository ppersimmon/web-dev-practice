import { apiClient } from './api';

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  image: string;

  location: {
    name: string;
    url: string;
  };
}

export interface GetCharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export const getCharacters = (page: number = 1): Promise<GetCharactersResponse> => {
  return apiClient.get('/character', { 
    params: { page } 
  });
};

export const getSingleCharacter = (id: number): Promise<Character> => {
  return apiClient.get(`/character/${id}`);
};