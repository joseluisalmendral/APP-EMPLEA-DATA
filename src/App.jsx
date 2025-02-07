import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  BarChartComponent,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  StarsCanvas,
} from "./components";

const App = () => {
  useEffect(() => {
    const pingAPIs = async () => {
      const endpoints = [
        "https://cv-interpreter2.onrender.com",
        "https://api-emplea-data.onrender.com",
      ];

      endpoints.forEach(async (url) => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            console.log(`La API en ${url} respondió correctamente (estado: ${response.status}).`);
          } else {
            console.log(`La API en ${url} respondió con error (estado: ${response.status}).`);
          }
        } catch (error) {
          console.error(`Error al conectar con ${url}:`, error);
        }
      });
    };

    pingAPIs();
  }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary overflow-hidden">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <BarChartComponent />
        <Tech />
        <Feedbacks />
        <Contact />
        <StarsCanvasWrapper />
      </div>
    </BrowserRouter>
  );
};

// Contenedor fijo para el StarsCanvas y no relentizar la web
const StarsCanvasWrapper = () => (
  <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
    <StarsCanvas />
  </div>
);

export default App;
