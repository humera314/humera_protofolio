import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Rocket, BarChart3 } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: 'Interstellar Chat App',
      description: 'Real-time WebSocket chat application with React & Tailwind CSS',
      longDescription: 'A modern real-time chat application featuring WebSocket connections, message encryption, file sharing, and a beautiful space-themed UI. Built with React, TypeScript, and Socket.io.',
      icon: Rocket,
      technologies: ['React', 'TypeScript', 'Socket.io', 'Tailwind CSS', 'Node.js'],
      github: 'https://github.com/humera314',
      demo: '#',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Nebula Data Visualizer',
      description: 'D3.js astronomical data graphs in real time',
      longDescription: 'Interactive data visualization platform for astronomical data using D3.js. Features real-time data updates, multiple chart types, and responsive design for exploring cosmic datasets.',
      icon: BarChart3,
      technologies: ['D3.js', 'React', 'TypeScript', 'WebSocket', 'Python'],
      github: 'https://github.com/humera314',
      demo: '#',
      gradient: 'from-orange-500 to-pink-600'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-black relative overflow-hidden" ref={ref}>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Projects
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Showcasing innovative solutions and cutting-edge technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="card-minimal h-full flex flex-col">
                {/* Project Icon */}
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${project.gradient} mr-4`}>
                    <project.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>

                {/* Project Description */}
                <p className="text-foreground/90 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <p className="text-foreground/70 text-sm mb-6 leading-relaxed flex-grow">
                  {project.longDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4 mt-auto">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                              border border-white/20 rounded-lg transition-all duration-300 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                  
                  <motion.a
                    href={project.demo}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground 
                              hover:bg-primary/90 rounded-lg transition-all duration-300 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;