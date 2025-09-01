import { useState, useEffect } from 'react';

import { Download, Github, Linkedin, Mail, Menu, X, Code, Smartphone, Database, GitBranch, Home, User, Briefcase, FolderOpen, Award, MessageCircle } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state immediately
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
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
    video?: string;
    repo: string;
  };

  const projects: Project[] = [

    {
      title: "Olirab",
      description: "Delivery platform with comprehensive backend architecture. Built complete order management system, user authentication, and delivery logistics using Laravel.",
      tech: ["Laravel", "PHP", "MySQL", "REST APIs"],
      color: "bg-emerald-50 border-emerald-200",
      images: ["/movie_app1.png"],
      video: "https://res.cloudinary.com/dyli6fvzh/video/upload/v1753803305/video_2025-07-05_14-40-43_b5iytc.mp4",
      repo: "https://github.com/your-username/olirab"
    },

    {
      title: "Movie App",
      description: "📱 mobile application allows users to discover, search, and view details about movies with a modern and intuitive interface.it integrates the latest Android development technologies for a smooth and responsive user experience.",
      tech: ["Kotlin", "Jetpack Compose", "MVI", "Retrofit", "Dagger Hilt", "Coroutines/Flow"],
      color: "bg-blue-50 border-blue-200",
      images: ["/movieApp.png"],
      repo: "https://github.com/your-username/movie-app"
    },

    {
      title: "Crypto Tracker",
      description: "💸 Coin Tracker is a simple, user-friendly app built with Jetpack Compose and Material 3, designed to provide real-time cryptocurrency data.",
      tech: ["kotlin", "jetpack compose", "Ktor client", "koin DI", "coil"],
      color: "bg-purple-50 border-purple-200",
      images: ["/crypto-trucker.png"],
      repo: "https://github.com/your-username/ecommerce-app"
    }
  ];

  const ProjectCard = ({ project }: { project: Project }) => {
    return (
      <div className="max-w-4xl mx-auto">
        <div
          className="bg-white rounded-2xl overflow-hidden border border-gray-200 transition-transform transition-shadow duration-300 hover:shadow-lg hover:-translate-y-0.5"
          data-animate-on-scroll
          data-animation="fade-in-up"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left Content Section */}
            <div className="lg:w-5/12 p-4 lg:p-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">{project.title}</h1>

                <div className="space-y-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      {project.description}
                    </p>
                  </div>


                </div>

                <div className="mb-2">
                  <p className="text-gray-900 text-sm font-semibold mb-2">Tools & Tech:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Media Section */}
            <div className="lg:w-7/12 p-4 lg:p-6 flex justify-end">
              {project.title === 'Olirab' && project.video ? (
                <div className="w-full max-w-md aspect-[16/9] mx-auto overflow-hidden rounded-2xl">
                  <video
                    className="w-full h-full object-contain object-center rounded-2xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    crossOrigin="anonymous"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-[100%] h-auto rounded-xl"
                  />
                </div>
              )}
            </div>



          </div>
        </div>
      </div>
    );
  };

  const skills = [
    // Android Development Skills
    { name: "Kotlin", icon: Code, category: "android", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png" },
    { name: "Jetpack Compose", icon: Smartphone, category: "android", iconUrl: "/compose.svg" },
    { name: "Android SDK", icon: Smartphone, category: "android", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/Android_logo_2019_%28stacked%29.svg" },

    {
      name: "Retrofit", icon: Code, category: "android", iconUrl: ""
    },

    {
      name: "Koin",
      icon: Code,
      category: "android",
      iconUrl: ""
    },
    {
      name: "Coroutines/Flow",
      icon: Code,
      category: "android",
      iconUrl: ""
    },
    // Backend Development Skills
    { name: "Laravel", icon: Database, category: "backend", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" },
    { name: "NestJS", icon: Database, category: "backend", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg" },
    { name: "Firebase", icon: Database, category: "backend", iconUrl: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg" },
    { name: "MySQL", icon: Database, category: "backend", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0a/MySQL_textlogo.svg" },
    { name: "MongoDB", icon: Database, category: "backend", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
    { name: "REST APIs", icon: Database, category: "backend", iconUrl: "" },
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
              {['hero', 'about', 'projects', 'skills', 'contact'].map((section) => (
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
                      src="/profile.jpg"
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
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/cv.pdf';
                      link.download = 'Raouf_Boukhobza_CV.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-2xl font-medium text-base shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                  >
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



      {/* Projects Section */}
      <section id="projects" className="py-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Skills</h2>

          {/* Two Cards Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Android Development Skills Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-center mb-6 text-emerald-600">Android Development</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.filter(skill => skill.category === "android").map((skill) => {
                  return (
                    <div
                      key={skill.name}
                      className="flex flex-col items-center text-center space-y-2 p-3 rounded-xl hover:bg-emerald-50/50 transition-all duration-200 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300">
                        {skill.iconUrl ? (
                          <img
                            src={skill.iconUrl}
                            alt={skill.name}
                            className="w-11 h-11 object-contain"
                          />
                        ) : (
                          <Code size={24} className="text-emerald-600" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-gray-700 group-hover:text-emerald-700 transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Backend Development Skills Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-center mb-6 text-blue-600">Backend Development</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.filter(skill => skill.category === "backend").map((skill) => {
                  return (
                    <div
                      key={skill.name}
                      className="flex flex-col items-center text-center space-y-2 p-3 rounded-xl hover:bg-blue-50/50 transition-all duration-200 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300">
                        {skill.iconUrl ? (
                          <img
                            src={skill.iconUrl}
                            alt={skill.name}
                            className="w-11 h-11 object-contain"
                          />
                        ) : (
                          <Database size={24} className="text-blue-600" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
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
              <a
                href="https://github.com/Raouf-boukhobza"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <Github size={20} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/raouf-boukhobza-570873300/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=raoufboukhobza3@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <Mail size={20} />
                Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;