import { useState, useEffect } from "react";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Contact from "./components/sections/Contact";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Resume from "./components/sections/Resume";
import Skills from "./components/sections/Skills";
import RenoHaul from "./components/projects/RenoHaul";

export default function App() {
  const [currentProject, setCurrentProject] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#/project/reno-haul") {
      setCurrentProject("reno-haul");
    } else {
      setCurrentProject(null);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash === "#/project/reno-haul") {
        setCurrentProject("reno-haul");
      } else {
        setCurrentProject(null);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (currentProject === "reno-haul") {
    return <RenoHaul />;
  }

  return (
    <div className="app">
      <div className="aurora" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <div className="container">
          <Projects />
          <Skills />
          <Resume />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
