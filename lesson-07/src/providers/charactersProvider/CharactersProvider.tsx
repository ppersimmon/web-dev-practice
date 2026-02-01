import React, { useState, useMemo, ReactNode } from 'react';
import { useRequest } from 'ahooks';
import { getCharacters } from '../../api/getCharacters';
import { CharactersContext } from './CharactersContext';

export const CharactersProvider = ({ children }: { children: React.ReactNode }) => {
    const [page, setPage] = useState(1);
    const { data, loading, error } = useRequest(() => getCharacters(page), {
        refreshDeps: [page],
    });

    const contextValue = useMemo(() => ({
        characters: data?.results || [],
        totalCount: data?.info.count || 0,
        loading,
        error,
        page,
        setPage
    }), [data, loading, error, page]);

    return (
        <CharactersContext.Provider value={contextValue}>
            {children}
        </CharactersContext.Provider>
    );
}