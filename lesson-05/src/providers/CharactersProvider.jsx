import React, { createContext, useState, useCallback, useMemo } from "react";
import { getCharacters } from "../getCharacters/api.js";

export const CharactersContext = createContext(null);

export const CharactersProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);

    const fetchCharacters = useCallback(async (page) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCharacters(page);
            setCharacters(data.results);
            setTotalCount(data.info.count);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const contextValue = useMemo(() => ({
        characters,
        loading,
        error,
        totalCount,
        fetchCharacters
    }), [characters, loading, error, totalCount, fetchCharacters]);

    return (
        <CharactersContext.Provider value={contextValue}>
            {children}
        </CharactersContext.Provider>
    );
};
