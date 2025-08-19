import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Story from '../components/Story';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <Projects />
      <Story />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
