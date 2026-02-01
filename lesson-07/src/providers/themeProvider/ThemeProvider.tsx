import { useState, type ReactNode } from 'react';
import { GlobalStyles } from '@mui/material';
import { ThemeContext } from './ThemeContext';
import { themeColors } from './constants';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');
    const colors = themeColors[themeName];

    const toggleTheme = () => {
        setThemeName((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const value = {theme: themeName, colors: colors, toggleTheme};

    return (
        <ThemeContext.Provider value={value}>
            <GlobalStyles styles={{
                html: { 
                    height: '100%', 
                },
                body: { 
                    height: '100%', 
                    backgroundColor: colors.background,
                    color: colors.text,
                    overflow: 'hidden',
                },
                '#root': {
                    height: '100%',
                }
            }} />
            {children}
        </ThemeContext.Provider>
    );
};