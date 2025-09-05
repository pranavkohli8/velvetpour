import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cocktails from './components/Cocktails';
import About from './components/About';
import Art from './components/Art';
import Menu from './components/Menu';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  const path = window.location.pathname;

  // List of valid paths (since you aren't using routes)
  const validPaths = ['/', ''];

  return (
    <main>
      {validPaths.includes(path) ? (
        <>
          <Navbar />
          <Hero />
          <Cocktails />
          <About />
          <Art />
          <Menu />
          <Contact />
        </>
      ) : (
        <NotFound />
      )}
    </main>
  );
};

export default App;
