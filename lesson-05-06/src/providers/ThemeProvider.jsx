import React, { createContext, useState, useContext } from 'react';
import { GlobalStyles } from '@mui/material';

const themeColors = {
    light: {
        name: 'light',
        background: '#FFFFFF',
        text: '#232029',
        sidebarBg: '#FFFFFF',
        gridRow: '#FFFFFF',
        gridRowHover: '#F5F5F5',
        gridHeader: '#E0E0E0',
        borderColor: '#E0E0E0'
    },
    dark: {
        name: 'dark',
        background: '#0E1621',
        text: '#E0E0E0',
        sidebarBg: '#17212B',
        gridRow: '#17212B',
        gridRowHover: '#202B36',
        gridHeader: '#17212B',
        borderColor: '#0E1621'
    }
};

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState('light');
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
