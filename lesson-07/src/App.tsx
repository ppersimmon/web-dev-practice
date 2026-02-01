import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CharactersProvider } from './providers/charactersProvider/CharactersProvider';
import { ThemeProvider } from './providers/themeProvider/ThemeProvider';
import AppLayout from './components/AppLayout';
import HeroesPage from './pages/HeroesPage';
import HeroDetails from './components/HeroDetails';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NoPageFound from './pages/NoPageFound';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <ThemeProvider>
        <CharactersProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="heroes" element={<HeroesPage />}>
                  <Route path=":id" element={<HeroDetails />} />
              </Route>
              <Route path="about" element={<AboutPage />} />
              <Route path="*" element={<NoPageFound />} />
            </Route>
          </Routes>
        </CharactersProvider>
      </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
