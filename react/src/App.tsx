import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Contact from "./components/sections/Contact";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Resume from "./components/sections/Resume";
import Skills from "./components/sections/Skills";

export default function App() {
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
