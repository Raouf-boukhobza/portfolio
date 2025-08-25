import { useState, useEffect } from 'react';
import type React from 'react';
import { Download, Github, Linkedin, Mail, Menu, X, Code, Smartphone, Database, GitBranch, Home, User, Briefcase, FolderOpen, Award, MessageCircle } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate elements on scroll using IntersectionObserver
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate-on-scroll]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const animation = target.getAttribute('data-animation') || 'fade-in-up';
            target.classList.add(`animate-${animation}`);
            target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  type Project = {
    title: string;
    description: string;
    tech: string[];
    color: string;
    images: string[];
    repo: string;
  };

  const projects: Project[] = [
    {
      title: "Olirab",
      description: "Delivery platform with comprehensive backend architecture. Built complete order management system, user authentication, and delivery logistics using Laravel.",
      tech: ["Laravel", "PHP", "MySQL", "REST APIs"],
      color: "bg-emerald-50 border-emerald-200",
      images: [
        "/images/projects/olirab/1.jpg",
        "/images/projects/olirab/2.jpg"
      ],
      repo: "https://github.com/your-username/olirab"
    },
    {
      title: "Movie App",
      description: "Modern Android application showcasing latest movies with beautiful UI. Implemented using Kotlin and Jetpack Compose following Material Design principles.",
      tech: ["Kotlin", "Jetpack Compose", "Android SDK", "MVVM"],
      color: "bg-blue-50 border-blue-200",
      images: [
        "/images/projects/movie-app/1.png",
        "/images/projects/movie-app/2.png",
        "/images/projects/movie-app/3.png"
      ],
      repo: "https://github.com/your-username/movie-app"
    },
    {
      title: "Ecommerce App",
      description: "Collection of experimental mobile applications and backend services. Focused on exploring new technologies and architectural patterns.",
      tech: ["Android", "Backend", "Experiments"],
      color: "bg-purple-50 border-purple-200",
      images: [
        "/images/projects/ecommerce/1.jpg",
        "/images/projects/ecommerce/2.jpg"
      ],
      repo: "https://github.com/your-username/ecommerce-app"
    }
  ];

  const ProjectCard = ({ project }: { project: Project }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const showPrev = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    const showNext = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % project.images.length);
    };

    return (
      <div
        className={`${project.color} rounded-3xl p-0 shadow-sm border transform transition-all duration-700 cursor-pointer group perspective-1000 overflow-hidden`}
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'rotateY(10deg) rotateX(5deg) scale(1.05)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }}
      >
        {project.images && project.images.length > 0 && (
          <div className="relative px-4 pt-5 pb-4 bg-gradient-to-b from-black/5 to-transparent">
            {/* Phone mockup */}
            <div className="relative mx-auto w-[220px] sm:w-[240px] aspect-[9/19.5] rounded-[2.2rem] bg-black shadow-xl ring-1 ring-white/20 p-2">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/70 rounded-b-2xl" />
              <div className="w-full h-full rounded-[1.6rem] overflow-hidden bg-gray-900">
                <img
                  src={project.images[currentIndex]}
                  alt={`${project.title} screenshot ${currentIndex + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3'; }}
                />
              </div>
            </div>

            {/* Overlay actions */}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} repository on GitHub`}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span className="bg-white/90 backdrop-blur text-gray-900 p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ring-1 ring-white/40">
                <Github size={22} />
              </span>
            </a>

            {/* Slider controls */}
            {project.images.length > 1 && (
              <>
                <button onClick={showPrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md">
                  ‹
                </button>
                <button onClick={showNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md">
                  ›
                </button>
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                      className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/60'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-emerald-700 transition-colors duration-500">{project.title}</h3>
          <p className="text-gray-700 mb-4 leading-relaxed group-hover:text-gray-800 transition-colors duration-500">{project.description}</p>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-200 to-transparent mb-4" />
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 group-hover:bg-white group-hover:shadow-sm transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const skills = [
    { name: "Kotlin", icon: Code, category: "mobile" },
    { name: "Jetpack Compose", icon: Smartphone, category: "mobile" },
    { name: "Android SDK", icon: Smartphone, category: "mobile" },
    { name: "Clean Architecture", icon: Code, category: "mobile" },
    { name: "Firebase", icon: Database, category: "backend" },
    { name: "Laravel", icon: Database, category: "backend" },
    { name: "NestJS", icon: Database, category: "backend" },
    { name: "Git", icon: GitBranch, category: "tools" },
    { name: "MOngodb", icon: Database, category: "backend" },
    { name: "mySQL", icon: Database, category: "backend" },
    { name: "REST APIs", icon: Database, category: "backend" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Material 3 App Bar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">RB</span>
              </div>
              <span className="ml-3 font-semibold text-lg">Raouf Boukhobza</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-1">
              {['hero', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeSection === section
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {section === 'hero' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {['hero', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeSection === section
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {section === 'hero' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Android-style Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 z-50 lg:hidden">
        <div className="flex justify-around items-center py-2">
          {[
            { id: 'hero', icon: Home, label: 'Home' },
            { id: 'about', icon: User, label: 'About' },
            { id: 'experience', icon: Briefcase, label: 'Work' },
            { id: 'projects', icon: FolderOpen, label: 'Projects' },
            { id: 'skills', icon: Award, label: 'Skills' },
            { id: 'contact', icon: MessageCircle, label: 'Contact' }
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${activeSection === item.id
                  ? 'text-green-600 bg-green-50 scale-110'
                  : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                  }`}
              >
                <IconComponent size={20} className="mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Android-style Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 z-50 lg:hidden animate-slideUp">
        <div className="flex justify-around items-center py-2">
          {[
            { id: 'hero', icon: Home, label: 'Home' },
            { id: 'about', icon: User, label: 'About' },
            { id: 'experience', icon: Briefcase, label: 'Work' },
            { id: 'projects', icon: FolderOpen, label: 'Projects' },
            { id: 'skills', icon: Award, label: 'Skills' },
            { id: 'contact', icon: MessageCircle, label: 'Contact' }
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${activeSection === item.id
                  ? 'text-green-600 bg-green-50 scale-110'
                  : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                  }`}
              >
                <IconComponent size={20} className="mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-4xl p-8 sm:p-16 shadow-2xl border-0 bg-gradient-to-br from-white via-emerald-50/20 to-green-50/30 opacity-0" data-animate-on-scroll data-animation="fade-in-up">
            {/* Subtle background patterns */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-100/30 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-100/30 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="text-left space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200/50">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Available for opportunities
                  </div>
                </div>

                <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-gray-900 leading-tight">
                  Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">Raouf</span>
                </h1>

                <p className="text-2xl sm:text-3xl text-gray-700 font-semibold leading-relaxed">
                  Android Developer & <br />
                  <span className="text-emerald-600">Mobile Software Engineer</span>
                </p>

                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Crafting performant mobile apps with clean architecture and thoughtful user experiences.
                  Passionate about building scalable solutions that make a difference.
                </p>
              </div>

              {/* Right Column - Profile & Actions */}
              <div className="text-center space-y-8">
                <div className="relative">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/60">
                    <div className="absolute inset-0 grid place-items-center bg-gradient-to-tr from-emerald-500 to-green-600 text-white font-bold text-3xl">RB</div>
                    <img
                      src="/images/profile.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover relative z-10"
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                  <button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-2xl font-medium text-base shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                    <Download size={18} />
                    Download CV
                  </button>

                  <a href="#projects" className="px-6 py-3 rounded-2xl font-medium text-base border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 hover:scale-105">
                    View Projects
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">About Me</h2>
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 transform transition-all duration-300 hover:shadow-md opacity-0" data-animate-on-scroll data-animation="fade-in-up">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    I'm a passionate Android developer with a strong foundation in <strong className="text-emerald-600">Kotlin</strong> and <strong className="text-emerald-600">Jetpack Compose</strong>.
                    I believe in writing clean, maintainable code following <strong className="text-emerald-600">Clean Architecture</strong> principles.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    My expertise extends beyond mobile development into backend technologies, where I've worked extensively with
                    <strong className="text-emerald-600"> Laravel</strong> and <strong className="text-emerald-600">NestJS</strong> to build robust,
                    scalable server-side solutions.
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    I hold a <strong className="text-emerald-600">Bachelor's degree in Information Systems</strong> and am currently pursuing a <strong className="text-emerald-600">Master's degree in Artificial Intelligence</strong>,
                    which fuels my passion for creating intelligent, user-centric applications.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    I'm committed to creating applications that not only function flawlessly but also provide delightful user experiences
                    through thoughtful design and smooth performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Work Experience</h2>
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 transform transition-all duration-300 hover:shadow-md opacity-0" data-animate-on-scroll data-animation="fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Software Engineer Intern</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">R</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-green-700">Routimize</p>
                      <p className="text-sm text-gray-500">Internship</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Current
                </div>
              </div>

              <div className="prose prose-lg text-gray-700 leading-relaxed">
                <p className="text-lg mb-4">
                  Currently working as a Software Engineer Intern at Routimize, where I'm gaining hands-on experience
                  in software development and contributing to innovative solutions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Software development and testing</li>
                      <li>• Code review and optimization</li>
                      <li>• Collaborative problem solving</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                        Software Engineering
                      </span>
                      <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                        Development
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Skills</h2>
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 opacity-0" data-animate-on-scroll data-animation="fade-in-up">
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              {skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 bg-gradient-to-br from-emerald-50 to-green-50 hover:from-white hover:to-white text-emerald-800 px-4 sm:px-5 py-2.5 rounded-2xl font-medium border border-emerald-200 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-md cursor-pointer"
                  >
                    <IconComponent size={18} />
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900">Let's Connect</h2>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 sm:p-12 shadow-sm border border-green-100 opacity-0" data-animate-on-scroll data-animation="fade-in-up">
            <p className="text-xl text-gray-700 mb-8">
              Ready to discuss your next project or just want to say hello?
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Github size={20} />
                GitHub
              </button>
              <button className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Linkedin size={20} />
                LinkedIn
              </button>
              <button className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Mail size={20} />
                Email
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 pb-20 lg:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Raouf Boukhobza. Crafted with ❤️ using React & Material Design principles.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;