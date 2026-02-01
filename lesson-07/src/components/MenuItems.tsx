import React from "react";
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

interface MenuItems {
    text: string;
    path: string;
    icon: React.ReactNode;
}

export const menuItems: MenuItems[] = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Heroes', path: '/heroes', icon: <PeopleIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
]