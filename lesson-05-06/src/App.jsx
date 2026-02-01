import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharactersProvider } from './providers/CharactersProvider.jsx';
import { ThemeProvider } from './providers/ThemeProvider.jsx';

import AppLayout from './layouts/AppLayout.jsx';

import HeroesPage from './pages/HeroesPage.jsx';
import HeroDetails from './components/HeroDetails.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NoPageFound from './pages/NoPageFound.jsx';

const App = () => {
  return (
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
  );
}

export default App;
