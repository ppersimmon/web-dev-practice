export interface ThemeColors {
    name: string;
    background: string;
    text: string;
    sidebarBg: string;
    gridRow: string;
    gridRowHover: string;
    gridHeader: string;
    borderColor: string;
}

export interface ThemeContextType {
    theme: 'light' | 'dark';
    colors: ThemeColors;
    toggleTheme: () => void;
}