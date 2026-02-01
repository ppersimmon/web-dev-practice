import { useContext } from "react";
import { CharactersContext } from "../providers/CharactersProvider.jsx";

export const useCharacters = () => {
    const context = useContext(CharactersContext);
    return context;
};

export default useCharacters;
