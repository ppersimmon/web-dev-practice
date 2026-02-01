import { Character } from '../../api/getCharacters'; 

export interface CharactersContextType {
    characters: Character[];
    loading: boolean;
    error?: Error;
    totalCount: number;
    page: number;
    setPage: (page: number) => void;
}