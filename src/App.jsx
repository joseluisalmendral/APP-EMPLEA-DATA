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

// Contenedor fijo para el StarsCanvas
const StarsCanvasWrapper = () => (
  <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
    <StarsCanvas />
  </div>
);

export default App;
