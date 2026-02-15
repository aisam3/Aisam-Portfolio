import "./App.scss";
import Backgroundvideo from "./Components/Backgroundvideo";
import Sidebar from "./Layout/Sidebar";
import Header from "./Layout/Header";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Portfolio from "./Components/Portfolio";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";

function App() {
  return (
    <div className="aside">
     <Backgroundvideo/>
      <Sidebar />
      <main className="content">
        <Header/>
        <Hero />
        <About/>
        <Skills/>
        <Portfolio/>
        <Resume/>
        <Contact/>
      </main>
    </div>
  );
}

export default App;
