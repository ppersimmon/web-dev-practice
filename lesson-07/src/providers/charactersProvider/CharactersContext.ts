import { createContext } from 'react';
import { CharactersContextType } from './types';

export const CharactersContext = createContext<CharactersContextType | undefined>(undefined);