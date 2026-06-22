import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  ArrowUpRight, 
  GraduationCap, 
  MapPin, 
  Phone,
  Code2,
  Server,
  Smartphone,
  Database,
  Cpu,
  Layers,
  LucideIcon,
  ChevronLeft,
  ChevronRight,
  Play,
  Eye,
  Video,
  User,
  Monitor,
  Info
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

interface Project {
  title: string;
  subtitle: string;
  year: string;
  description: string;
  bullets: string[];
  tech: string[];
  link: string;
  video?: string;
  coverImage?: string;
  images?: string[];
  videos?: string[];
}

interface SkillGroup {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  title: string;
  category: 'overview' | 'teacher' | 'student' | 'general';
}

const getNiceTitleFromUrl = (url: string): string => {
  try {
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const nameWithoutExt = filename.split('.')[0];
    const mainPart = nameWithoutExt.split('_')[0];
    return mainPart
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (e) {
    return 'Project Screen';
  }
};

const getProjectMediaItems = (project: Project): MediaItem[] => {
  const items: MediaItem[] = [];
  
  if (project.images) {
    project.images.forEach(img => {
      let category: 'overview' | 'teacher' | 'student' | 'general' = 'general';
      let title = 'Screenshot';
      
      const lower = img.toLowerCase();
      if (lower.includes('websiteintro')) {
        category = 'overview';
        title = 'Website Overview';
      } else if (lower.includes('-admin')) {
        category = 'teacher';
        title = getNiceTitleFromUrl(img);
      } else if (lower.includes('student')) {
        category = 'student';
        title = getNiceTitleFromUrl(img);
      }
      
      items.push({
        type: 'image',
        url: img,
        title,
        category
      });
    });
  } else if (project.coverImage) {
    items.push({
      type: 'image',
      url: project.coverImage,
      title: 'Cover Image',
      category: 'overview'
    });
  }
  
  const addVideo = (vidUrl: string) => {
    let category: 'overview' | 'teacher' | 'student' | 'general' = 'general';
    let title = 'Project Video Demo';
    
    const lower = vidUrl.toLowerCase();
    if (lower.includes('-admin')) {
      category = 'teacher';
      title = 'Teacher / Admin Demo';
    } else if (lower.includes('student')) {
      category = 'student';
      title = 'Student Portal Demo';
    }
    
    items.push({
      type: 'video',
      url: vidUrl,
      title,
      category
    });
  };
  
  if (project.video) {
    addVideo(project.video);
  }
  if (project.videos) {
    project.videos.forEach(vid => addVideo(vid));
  }
  
  return items;
};

const ProjectMedia = ({ 
  project, 
  onOpenGallery 
}: { 
  project: Project; 
  onOpenGallery: (project: Project) => void; 
}) => {
  if (project.coverImage || (project.images && project.images.length > 0)) {
    const mainImage = project.coverImage || (project.images && project.images[0]) || '';
    const totalItems = (project.images ? project.images.length : 0) + (project.video ? 1 : 0);

    let layer2Image = '';
    let layer3Image = '';
    
    if (project.images && project.images.length > 1) {
      if (project.images.length >= 9) {
        layer2Image = project.images[8]; // student grading details (visual details)
        layer3Image = project.images[3]; // dashboard 1 (graphs)
      } else {
        layer2Image = project.images[1];
        layer3Image = project.images[2] || '';
      }
    }

    return (
      <div 
        onClick={() => onOpenGallery(project)}
        className="w-full aspect-[16/10] sm:aspect-video md:aspect-[16/10] bg-[#fafaf9] border border-zinc-200/80 p-3 shadow-sm relative overflow-visible flex items-center justify-center min-h-[220px] cursor-pointer group select-none"
      >
        {/* Layer 3 (Back) */}
        {layer3Image ? (
          <div className="absolute inset-4 bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden translate-x-3 -translate-y-2.5 rotate-3 scale-[0.93] opacity-65 transition-all duration-300 group-hover:translate-x-6 group-hover:-translate-y-5 group-hover:rotate-6 group-hover:opacity-85">
            <img src={layer3Image} alt="" className="w-full h-full object-cover select-none pointer-events-none filter brightness-95" />
          </div>
        ) : (
          <div className="absolute inset-4 bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden translate-x-4 translate-y-3.5 scale-[0.92] opacity-40 transition-all duration-300 group-hover:translate-x-6 group-hover:translate-y-5.5 group-hover:scale-[0.94] group-hover:opacity-50" />
        )}
        
        {/* Layer 2 (Middle) */}
        {layer2Image ? (
          <div className="absolute inset-4 bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden -translate-x-3 translate-y-1.5 -rotate-3 scale-[0.96] opacity-85 transition-all duration-300 group-hover:-translate-x-6 group-hover:translate-y-3 group-hover:-rotate-6 group-hover:opacity-95">
            <img src={layer2Image} alt="" className="w-full h-full object-cover select-none pointer-events-none filter brightness-95" />
          </div>
        ) : (
          <div className="absolute inset-4 bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden translate-x-2 translate-y-1.5 scale-[0.96] opacity-75 transition-all duration-300 group-hover:translate-x-3 group-hover:translate-y-2.5 group-hover:scale-[0.98] group-hover:opacity-85" />
        )}
        
        {/* Layer 1 (Front/Main) */}
        <div className="absolute inset-4 bg-white border border-zinc-250 shadow-md rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.01] group-hover:shadow-xl">
          <img 
            src={mainImage} 
            alt={project.title} 
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="lazy"
          />
          
          {/* Overlay Tag */}
          <div className="absolute bottom-3 right-3 bg-zinc-950/85 backdrop-blur-md text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/10 group-hover:bg-indigo-600 transition-colors duration-300 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:bg-white animate-pulse" />
            <span>+{totalItems - 1} Screens</span>
          </div>
          
          {/* Eye Icon Hover Overlay */}
          <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <div className="bg-white/95 backdrop-blur-sm text-zinc-950 p-2.5 rounded-full shadow-lg border border-zinc-200/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Eye size={16} className="text-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.video) {
    const isEmbed = project.video.includes('embed') || project.video.includes('player.cloudinary.com');
    return (
      <div 
        onClick={() => onOpenGallery(project)}
        className="w-full aspect-[16/10] sm:aspect-video md:aspect-[16/10] bg-[#fafaf9] border border-zinc-200/80 p-3 shadow-sm relative overflow-hidden flex items-center justify-center min-h-[220px] cursor-pointer group select-none"
      >
        <div className="w-full h-full bg-black overflow-hidden relative border border-zinc-200 shadow-sm rounded-lg">
          {isEmbed ? (
            <iframe
              src={`${project.video}&autoplay=0&muted=1&loop=1`}
              className="w-full h-full object-cover select-none pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-200"
              style={{ border: 0 }}
              allow="autoplay; encrypted-media"
              title="video-thumbnail"
            />
          ) : (
            <video
              className="w-full h-full object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-200"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              crossOrigin="anonymous"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-sm text-zinc-950 p-2.5 rounded-full shadow-lg border border-zinc-200/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play size={16} className="text-indigo-600 fill-indigo-600" />
            </div>
          </div>

          <div className="absolute bottom-3 right-3 bg-zinc-950/85 backdrop-blur-md text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/10 group-hover:bg-indigo-600 transition-colors duration-300">
            <Video size={10} className="text-indigo-400 group-hover:text-white" />
            <span>Watch Demo</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-mono text-[10px] text-zinc-700 overflow-hidden border border-zinc-200 bg-white p-4 flex flex-col justify-between self-stretch select-none shadow-sm min-h-[220px]">
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-2">
          <div className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          </div>
          <span className="text-[8px] text-zinc-400 uppercase tracking-widest">Sys_Status</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-600 font-bold border border-zinc-200 text-[8px] uppercase">JOB</span>
          <span className="text-zinc-500 font-semibold">BullMQ::Workloads</span>
        </div>
        
        <div className="text-zinc-400 pl-4 border-l border-zinc-200 space-y-1">
          <div><span className="text-zinc-650">status</span>: <span className="text-indigo-600 font-semibold">"Active"</span></div>
          <div><span className="text-zinc-650">engine</span>: <span className="text-zinc-600">"Ollama:LLM"</span></div>
          <div><span className="text-zinc-650">cache</span>: [</div>
          <div className="pl-4 text-zinc-555">"PessimisticRowLock: OK",</div>
          <div className="pl-4 text-indigo-600 font-semibold">"RedisInvalidationTrigger: ON"</div>
          <div>]</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-[8px] text-zinc-400 border-t border-zinc-200 pt-2 mt-4">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" /> REDIS UP</span>
        <span className="text-zinc-700 font-semibold">200 OK</span>
      </div>
    </div>
  );
};

const ProjectGalleryModal = ({ 
  project, 
  onClose 
}: { 
  project: Project; 
  onClose: () => void; 
}) => {
  const mediaItems = getProjectMediaItems(project);
  const categories = Array.from(new Set(mediaItems.map(item => item.category)));
  
  const defaultTab = categories.includes('overview') 
    ? 'overview' 
    : categories.includes('student')
      ? 'student'
      : categories.includes('teacher')
        ? 'teacher'
        : categories[0] || 'general';

  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const activeTabMedia = mediaItems.filter(item => item.category === activeTab);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);

  useEffect(() => {
    setActiveMediaIndex(0);
  }, [activeTab]);

  const activeMedia = activeTabMedia[activeMediaIndex];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeTabMedia.length > 1) {
      setActiveMediaIndex((prev) => (prev + 1) % activeTabMedia.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeTabMedia.length > 1) {
      setActiveMediaIndex((prev) => (prev - 1 + activeTabMedia.length) % activeTabMedia.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTabMedia, activeMediaIndex]);

  const getTabLabel = (cat: string) => {
    if (cat === 'overview') return 'Overview';
    if (cat === 'teacher') return 'Teacher Panel (Admin)';
    if (cat === 'student') return 'Student Portal';
    return 'Gallery';
  };

  const getTabIcon = (cat: string) => {
    if (cat === 'overview') return <Info size={13} />;
    if (cat === 'teacher') return <Monitor size={13} />;
    if (cat === 'student') return <User size={13} />;
    return <Layers size={13} />;
  };

  const getMediaDescription = (url: string) => {
    const lower = url.toLowerCase();
    if (lower.includes('websiteintro')) {
      return "Corrigo Landing Page - Features a clean, high-conversion presentation showcasing how artificial intelligence transforms manual exam grading and student performance tracking.";
    }
    if (lower.includes('signin-student')) {
      return "Student Authentication Portal - Secure login screen enabling students to verify credentials before entering the grading space.";
    }
    if (lower.includes('singin-admin')) {
      return "Teacher Sign In Gateway - Administrative authentication screen with JWT protection and role-based permissions routing.";
    }
    if (lower.includes('dashboard1-admin')) {
      return "Main Administrative Dashboard - Real-time statistics, average grading times, aggregate scores, and quick action widgets for managing active exams.";
    }
    if (lower.includes('dashboard2-admin')) {
      return "Extended Academic Analytics - Visual metrics outlining classroom grade brackets, failure/pass rates, and section comparisons.";
    }
    if (lower.includes('create-section1-admin')) {
      return "Exam Section Wizard (Step 1) - Setup module to specify section rules, grading criteria, and base weights for qualitative AI evaluations.";
    }
    if (lower.includes('create-section2-admin')) {
      return "Exam Section Wizard (Step 2) - Detailed question mapping tool that lets teachers align section rubrics to curriculum benchmarks.";
    }
    if (lower.includes('manage-student-admin')) {
      return "Class Roster & Enrollment - Student administration workspace to enroll students, view active sections, and track grading completion.";
    }
    if (lower.includes('student-grading-details-admin')) {
      return "Qualitative AI Feedback Editor - Interactive grading panel displaying student exam responses alongside AI-generated score suggestions and annotations.";
    }
    if (lower.includes('section-details-admin')) {
      return "Section Metrics - Diagnostic panel highlighting student submission statuses, individual scores, and specific learning objective logs.";
    }
    if (lower.includes('system-grading-student')) {
      return "Automated Grading Lifecycle - System walkthrough demonstrating how answers are sent to the NestJS pipeline, processed by Ollama LLM, and synced to students in real-time.";
    }
    return "Application interface showcasing clean design, responsive structure, and backend API integration.";
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-zinc-950/45 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="bg-white border border-zinc-200/80 w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-zinc-150 flex items-center justify-between bg-zinc-50/60 select-none">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-600" />
              <h3 className="text-sm font-black tracking-tight uppercase text-zinc-950">{project.title}</h3>
              <span className="text-[10px] text-zinc-400 font-bold bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded">
                {project.year}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-normal">
              {project.subtitle} • Interactive Project Gallery
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-950 border border-transparent hover:border-zinc-200 hover:bg-white rounded-full transition-all duration-200"
            aria-label="Close Gallery"
          >
            <X size={18} />
          </button>
        </div>

        {categories.length > 1 && (
          <div className="px-6 bg-zinc-50/30 border-b border-zinc-150 flex items-center space-x-1 select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`py-3.5 px-4 text-[10px] font-extrabold uppercase tracking-widest transition-all duration-200 flex items-center gap-2 border-b-2 -mb-[1px] ${
                  activeTab === cat
                    ? 'border-indigo-600 text-indigo-600 font-black'
                    : 'border-transparent text-zinc-400 hover:text-zinc-800'
                }`}
              >
                {getTabIcon(cat)}
                <span>{getTabLabel(cat)}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 min-h-0 grid lg:grid-cols-12 overflow-hidden">
          <div className="lg:col-span-8 bg-zinc-50/50 p-6 flex flex-col items-center justify-center relative overflow-hidden group/preview border-r border-zinc-150">
            {activeMedia ? (
              <div className="w-full h-full flex items-center justify-center relative select-none">
                {activeMedia.type === 'image' ? (
                  <img
                    src={activeMedia.url}
                    alt={activeMedia.title}
                    className="max-h-[55vh] lg:max-h-[60vh] object-contain rounded-2xl shadow-md border border-zinc-200/50 bg-white"
                  />
                ) : (
                  <div className="w-full max-w-2xl aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border border-zinc-200 relative">
                    {activeMedia.url.includes('embed') || activeMedia.url.includes('player.cloudinary.com') ? (
                      <iframe
                        src={`${activeMedia.url}&autoplay=1&muted=0`}
                        className="w-full h-full border-0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        title={activeMedia.title}
                      />
                    ) : (
                      <video
                        src={activeMedia.url}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                )}
                
                {activeTabMedia.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-2 bg-white/90 hover:bg-white text-zinc-700 hover:text-indigo-600 p-2.5 rounded-full border border-zinc-200 shadow-md transition-all duration-200 hover:scale-105"
                      aria-label="Previous Media"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2 bg-white/90 hover:bg-white text-zinc-700 hover:text-indigo-600 p-2.5 rounded-full border border-zinc-200 shadow-md transition-all duration-200 hover:scale-105"
                      aria-label="Next Media"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="text-zinc-400 text-xs font-semibold">No media selected</div>
            )}

            {activeTabMedia.length > 1 && (
              <div className="absolute bottom-4 flex justify-center space-x-1.5 select-none bg-zinc-950/5 px-3 py-1.5 rounded-full backdrop-blur-sm">
                {activeTabMedia.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      activeMediaIndex === idx
                        ? 'bg-indigo-600 w-4'
                        : 'bg-zinc-300 hover:bg-zinc-400'
                    }`}
                    aria-label={`Go to media ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 p-6 flex flex-col justify-between overflow-y-auto bg-white">
            <div className="space-y-6">
              {activeMedia ? (
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[9px] font-black uppercase tracking-wider rounded-md">
                    {activeMedia.type === 'video' ? <Video size={10} /> : <Layers size={10} />}
                    {activeMedia.type === 'video' ? 'Video Demonstration' : 'Screen Capture'}
                  </span>
                  
                  <h4 className="text-base font-extrabold text-zinc-950 tracking-tight leading-tight">
                    {activeMedia.title}
                  </h4>
                  
                  <p className="text-xs text-zinc-550 leading-relaxed font-normal">
                    {getMediaDescription(activeMedia.url)}
                  </p>
                </div>
              ) : (
                <div className="text-zinc-400 text-xs">Select a thumbnail to view details.</div>
              )}

              {activeTabMedia.length > 1 && (
                <div className="space-y-3 pt-4 border-t border-zinc-100 select-none">
                  <h5 className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                    Screens in this Portal ({activeTabMedia.length})
                  </h5>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2">
                    {activeTabMedia.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveMediaIndex(idx)}
                        className={`aspect-video rounded-lg overflow-hidden border relative transition-all duration-200 group/thumb ${
                          activeMediaIndex === idx
                            ? 'border-indigo-600 ring-2 ring-indigo-600/10 shadow-sm'
                            : 'border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-950 flex items-center justify-center relative">
                            <Video size={14} className="text-zinc-400" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                              <Play size={10} className="text-white fill-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-100 flex flex-col gap-3 text-[10px] text-zinc-400 font-bold uppercase tracking-widest select-none">
              <div className="flex items-center justify-between">
                <span>Repository</span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 font-extrabold"
                >
                  GitHub <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface SkillGroup {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [imageError, setImageError] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 95;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  const projects: Project[] = [
    {
      title: "AI-Powered Grading & Exam Management",
      subtitle: "Academic Project",
      year: "2026",
      description: "A high-performance NestJS backend using local LLM models (Ollama) to automate student exam grading and qualitative feedback generation. Engineered with BullMQ and Redis to separate computationally heavy LLM workloads from the main API thread, keeping server latency minimal.",
      bullets: [
        "Architected an asynchronous job queue with BullMQ and Redis to handle concurrent LLM execution without blocking incoming requests.",
        "Established real-time bidirectional messaging via WebSockets (Socket.io) to stream grading status and progress milestones back to users.",
        "Designed secure, role-based database schemas and workflows for teachers and students using SQLite, TypeORM, and JWT auth guards."
      ],
      tech: ["NestJS", "TypeScript", "Ollama", "BullMQ", "Redis", "WebSockets", "TypeORM", "SQLite", "JWT"],
      link: "https://github.com/Raouf-boukhobza",
      coverImage: "https://res.cloudinary.com/dmtlqi1yz/image/upload/v1782084967/websiteIntro_roq9kt.png",
      images: [
        "https://res.cloudinary.com/dmtlqi1yz/image/upload/v1782084967/websiteIntro_roq9kt.png",
        "https://res.cloudinary.com/dmtlqi1yz/image/upload/v1782084967/singIn-admin_iqz8yy.png",
        "https://res.cloudinary.com/dmtlqi1yz/image/upload/v1782084968/signin-student_olebgn.png",
        "https://res.cloudinary.com/dmtlqi1yz/image/upload/v1782084968/dashboard1-admin_cxfoil.png",
        "https://res.cloudinary.com/dmtlqi1yz/image/upload/v1782084967/dashboard2-admin_lz1pom.png",
        "https://res.cloudinary.com/dmtlqi1yz/image/upload/v1782084967/manage-student-admin_gro05k.png",
        "https://res.cloudinary.com/dmtlqi1yz/image/upload/v1782084968/create-section1-admin_es0w2t.png",
        "https://res.cloudinary.com/dmtlqi1yz/image/upload/v1782084968/create-section2-admin_ohkrml.png",
        "https://res.cloudinary.com/dmtlqi1yz/image/upload/v1782084967/student-grading-details-admin_zjmi2f.png",
        "https://res.cloudinary.com/dmtlqi1yz/image/upload/v1782084967/section-details-admin_uw3gnj.png"
      ],
      video: "https://player.cloudinary.com/embed/?cloud_name=dmtlqi1yz&public_id=system-grading-student_jhwl21"
    },
    {
      title: "E-Commerce Backend Infrastructure",
      subtitle: "Production-grade Backend Architecture",
      year: "2025",
      description: "A resilient, production-ready order processing and inventory catalog API designed to handle checkout concurrency and race conditions under heavy load.",
      bullets: [
        "Implemented pessimistic database row-locking and strict transactional isolation levels in MySQL to prevent inventory double-selling.",
        "Engineered custom Redis caching layers with event-driven invalidation policies, reducing API query latency by up to 75%.",
        "Programmed a background data synchronization engine with custom cell formatting powered by the Google Sheets API.",
        "Secured resources using NestJS Throttler (rate limiting), RBAC permissions guards, and Pino-structured logging containerized in Docker."
      ],
      tech: ["NestJS", "TypeScript", "MySQL", "TypeORM", "Redis", "Docker", "Google Sheets API", "JWT", "Pino"],
      link: "https://github.com/Raouf-boukhobza"
    },
    {
      title: "Restaurant Ordering Platform Backend",
      subtitle: "Academic Project",
      year: "2025",
      description: "A modular REST API built with PHP and Laravel to power table management, ordering, and payment statuses in real-time.",
      bullets: [
        "Enforced strict business domain constraints using Eloquent relational structures, form requests, and dedicated controllers.",
        "Generated interactive, testable API reference libraries using Scribe documentation tooling.",
        "Optimized database indexing and request tracing flows utilizing Laravel Telescope for query and exception tracking."
      ],
      tech: ["Laravel", "PHP", "Eloquent ORM", "MySQL", "REST APIs", "Laravel Telescope", "Scribe Docs"],
      link: "https://github.com/Raouf-boukhobza",
      video: "https://res.cloudinary.com/dyli6fvzh/video/upload/v1753803305/video_2025-07-05_14-40-43_b5iytc.mp4"
    }
  ];

  const skillGroups: SkillGroup[] = [
    {
      title: "Languages",
      icon: Code2,
      skills: ["TypeScript", "PHP", "Python", "Java", "Kotlin", "SQL"]
    },
    {
      title: "Backend Engineering",
      icon: Server,
      skills: ["NestJS", "Laravel", "REST APIs", "JWT Auth", "Node.js"]
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      skills: ["Android SDK", "Jetpack Compose", "Kotlin Coroutines", "HTTP Clients"]
    },
    {
      title: "Databases & Caching",
      icon: Database,
      skills: ["MySQL", "SQLite", "MongoDB", "Redis", "Caching Strategies"]
    },
    {
      title: "Infrastructure & Tools",
      icon: Cpu,
      skills: ["Docker", "Docker Compose", "Git", "GitHub", "Postman", "BullMQ"]
    },
    {
      title: "Software Architecture",
      icon: Layers,
      skills: ["Clean Architecture", "SOLID Principles", "MVVM", "Repository Pattern"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-900 selection:bg-indigo-55 selection:text-indigo-950 antialiased">
      
      {/* Navigation Header */}
      <nav className="fixed top-6 left-0 right-0 z-50 px-6 sm:px-8 pointer-events-none">
        <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-6 py-4 flex justify-between items-center pointer-events-auto">
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="font-extrabold text-[13px] tracking-[0.05em] text-zinc-950">
              ABDERRAOUF BOUKHOBZA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-widest text-zinc-400">
              AI & BACKEND ENGINEER
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-7">
            {['about', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors py-1 ${
                  activeSection === section
                    ? 'text-indigo-600'
                    : 'text-zinc-450 hover:text-zinc-950'
                }`}
              >
                {section}
              </button>
            ))}
            <a
              href="/cv.pdf"
              download="Raouf_Boukhobza_CV.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-zinc-950 hover:bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-widest transition-colors rounded-full"
            >
              <Download size={10} />
              RESUME
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 text-zinc-500 hover:text-zinc-950 transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-[#fafaf9]/95 backdrop-blur-md border border-zinc-200 mt-2 rounded-2xl shadow-sm p-5 space-y-4 pointer-events-auto"
            >
              {['about', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left text-[10px] font-bold uppercase tracking-widest ${
                    activeSection === section ? 'text-indigo-600 pl-2 border-l border-indigo-600' : 'text-zinc-500'
                  }`}
                >
                  {section}
                </button>
              ))}
              <a
                href="/cv.pdf"
                download="Raouf_Boukhobza_CV.pdf"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-zinc-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl"
              >
                <Download size={12} />
                Download CV
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-36 pb-20 md:pt-48 md:pb-28 px-6 sm:px-8 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="md:col-span-7 space-y-8">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-400">
                <span className="w-1 h-1 bg-indigo-600" />
                AVAILABLE FOR ROLES
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-zinc-950 leading-[1.08]">
                Designing clean, <br />
                <span className="text-indigo-600">scalable backend</span> architectures.
              </h1>
            </motion.div>

            <motion.p 
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-lg text-zinc-500 font-normal leading-relaxed max-w-2xl"
            >
              Hi, I'm <strong className="font-bold text-zinc-950">Abderraouf Boukhobza</strong>. I build high-performance APIs, asynchronous workloads with Redis job queues, and robust Android integrations following Clean Architecture guidelines.
            </motion.p>

            <motion.div 
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3.5 bg-zinc-950 hover:bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest transition-all duration-200"
              >
                Get in Touch
              </button>
              
              <a
                href="/cv.pdf"
                download="Raouf_Boukhobza_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-zinc-200 hover:border-zinc-950 hover:bg-white text-[10px] font-bold uppercase tracking-widest transition-all duration-200"
              >
                <Download size={13} className="text-zinc-450" />
                Resume
              </a>

              <div className="flex items-center space-x-1.5 ml-2">
                <a 
                  href="https://github.com/Raouf-boukhobza" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-zinc-950 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github size={17} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/raouf-boukhobza-570873300/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-zinc-950 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Hero Profile Image */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute inset-0 border border-zinc-200 translate-x-3 translate-y-3" />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#fafaf9] border border-zinc-200 p-2.5 shadow-sm">
                <div className="w-full h-full overflow-hidden bg-zinc-100 relative">
                  {!imageError ? (
                    <img
                      src="/profile.png"
                      alt="Abderraouf Boukhobza"
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 font-bold text-zinc-300 text-3xl uppercase tracking-wider select-none">
                      RB
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-zinc-200/60 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-12 gap-12">
            
            {/* Left Header */}
            <div className="md:col-span-4 space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">01 / BIOGRAPHY</span>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950">About Me</h2>
              <div className="w-12 h-[1.5px] bg-zinc-950 mt-4" />
            </div>

            {/* Right Content */}
            <div className="md:col-span-8 space-y-12">
              <div className="text-zinc-650 font-normal leading-relaxed text-[15px] space-y-6">
                <p>
                  Software Engineering student pursuing a Master's Degree in Artificial Intelligence, with hands-on experience in backend and Android development.
                </p>
                <p>
                  My technical background includes building REST APIs, database-driven applications, and scalable backend services using NestJS, Laravel, MySQL, and Redis. I also develop native Android applications with Kotlin and Jetpack Compose, following Clean Architecture principles.
                </p>
                <p>
                  I am constantly learning, building projects, and seeking opportunities to grow as a software engineer while contributing to real-world products and teams.
                </p>

                <div className="pt-4 grid grid-cols-2 gap-4 text-xs border-t border-zinc-100 mt-6 text-zinc-500">
                  <div>
                    <span className="block text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Location</span>
                    Taher, Jijel, Algeria
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Languages</span>
                    Arabic (Native) / English (B1)
                  </div>
                </div>
              </div>

              {/* Education Timeline */}
              <div className="space-y-6 pt-6 border-t border-zinc-100">
                <h3 className="text-base font-bold text-zinc-955 flex items-center gap-2 uppercase tracking-wider text-[10px] text-zinc-400">
                  Academic Timeline
                </h3>

                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-200">
                  
                  {/* Master Degree */}
                  <div className="relative pl-8 group">
                    <div className="absolute left-[8.5px] top-2 w-2 h-2 rounded-full bg-indigo-600" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <h4 className="text-base font-bold text-zinc-950">Master's Degree in Artificial Intelligence</h4>
                        <p className="text-xs text-zinc-500 font-normal">Mohammed Seddik Benyahia University – Jijel, Algeria</p>
                      </div>
                      <span className="inline-flex items-center text-[9px] text-indigo-600 font-bold uppercase tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 self-start sm:self-auto">
                        2025 – PRESENT
                      </span>
                    </div>
                  </div>

                  {/* Bachelor Degree */}
                  <div className="relative pl-8 group">
                    <div className="absolute left-[8.5px] top-2 w-2 h-2 rounded-full bg-zinc-300" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <h4 className="text-base font-bold text-zinc-950">Bachelor's Degree in Computer Science</h4>
                        <p className="text-xs text-zinc-500 font-normal">Mohammed Seddik Benyahia University – Jijel, Algeria</p>
                      </div>
                      <span className="inline-flex items-center text-[9px] text-zinc-500 font-bold uppercase tracking-widest bg-zinc-100 border border-zinc-200 px-3 py-1 self-start sm:self-auto">
                        2022 – 2025
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Soft Skills */}
              <div className="space-y-4 pt-6 border-t border-zinc-100">
                <h3 className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Soft Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {["Problem Solving", "Teamwork & Collaboration", "Communication", "Time Management", "Adaptability", "Attention to Detail"].map((skill) => (
                    <span 
                      key={skill}
                      className="px-2.5 py-1 border border-zinc-200 bg-[#fafaf9] text-zinc-700 text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 border-t border-zinc-200/60 bg-[#fafaf9]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          
          <div className="space-y-2 mb-16">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">02 / PORTFOLIO</span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Selected Projects</h2>
            <div className="w-12 h-[1.5px] bg-zinc-950" />
          </div>

          {/* Project List */}
          <div className="space-y-16">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12 pb-16 border-b border-zinc-200 last:border-b-0 last:pb-0"
              >
                
                {/* Info Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                      <span>{project.subtitle}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                    
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 group/title"
                    >
                      <h3 className="text-xl sm:text-2xl font-black text-zinc-950 group-hover/title:text-indigo-600 transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight size={16} className="text-zinc-400 group-hover/title:text-indigo-600 transition-colors" />
                    </a>
                  </div>

                  <p className="text-zinc-650 font-normal leading-relaxed text-[15px]">
                    {project.description}
                  </p>

                  <ul className="space-y-3">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-normal text-zinc-500 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2 pt-2">
                    <span className="block text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Technologies Integration</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 border border-zinc-200 bg-white text-zinc-700 text-xs font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Media Column */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <ProjectMedia project={project} onOpenGallery={setSelectedProject} />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Technical Matrix */}
      <section id="skills" className="py-24 border-t border-zinc-200/60 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          
          <div className="space-y-2 mb-16">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">03 / SKILLS MATRIX</span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Technical Skills</h2>
            <div className="w-12 h-[1.5px] bg-zinc-950 mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => {
              const IconComponent = group.icon;
              return (
                <div 
                  key={group.title}
                  className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-sm hover:border-indigo-600/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
                        <IconComponent size={18} />
                      </div>
                      <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">
                        {group.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-zinc-50 border border-zinc-200/60 text-zinc-750 text-xs font-semibold rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200/80 transition-all duration-150 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Languages Section */}
          <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Communication Metrics</h4>
              <p className="text-xs text-zinc-500 font-normal">Spoken and written language competencies</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2 bg-[#fafaf9] px-3.5 py-2 border border-zinc-200">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span>Arabic: Native</span>
              </div>
              <div className="flex items-center gap-2 bg-[#fafaf9] px-3.5 py-2 border border-zinc-200">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>English: B1</span>
              </div>
              <div className="flex items-center gap-2 bg-[#fafaf9] px-3.5 py-2 border border-zinc-200">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span>French: A1</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-zinc-200/60 bg-[#fafaf9]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          
          <div className="grid md:grid-cols-12 gap-12">
            
            {/* Left Info Card */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">04 / DIALOGUE</span>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Let's Work Together</h2>
                  <div className="w-12 h-[1.5px] bg-zinc-950" />
                </div>

                <p className="text-zinc-500 font-normal leading-relaxed text-[15px]">
                  I am open to engineering requests, technical consulting, and developer contracts. Write me a short brief of your project and stack.
                </p>

                <div className="space-y-4 text-sm font-normal text-zinc-650">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-zinc-400" />
                    <a href="mailto:raoufboukhobza3@gmail.com" className="hover:text-indigo-600 transition-colors">
                      raoufboukhobza3@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-zinc-400" />
                    <a href="tel:+213665209813" className="hover:text-indigo-600 transition-colors">
                      +213 665 20 98 13
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-zinc-400" />
                    <span>Taher, Jijel, Algeria</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-8 border-t border-zinc-200 mt-12">
                <a 
                  href="https://github.com/Raouf-boukhobza" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors"
                >
                  <Github size={14} />
                  GitHub
                </a>
                <span className="text-zinc-300">|</span>
                <a 
                  href="https://www.linkedin.com/in/raouf-boukhobza-570873300/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="md:col-span-7 bg-white border border-zinc-200 p-8 sm:p-10 shadow-sm">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[8px] font-bold uppercase tracking-widest text-zinc-400">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#fafaf9] border-b border-zinc-200 focus:border-zinc-950 focus:bg-white focus:outline-none py-3 px-4 text-sm font-normal rounded-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[8px] font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#fafaf9] border-b border-zinc-200 focus:border-zinc-950 focus:bg-white focus:outline-none py-3 px-4 text-sm font-normal rounded-none transition-colors"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-[8px] font-bold uppercase tracking-widest text-zinc-400">Brief / Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#fafaf9] border-b border-zinc-200 focus:border-zinc-950 focus:bg-white focus:outline-none py-3 px-4 text-sm font-normal rounded-none resize-none transition-colors"
                    placeholder="Briefly describe your project details, timeline, or request..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-zinc-950 hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest transition-colors duration-200"
                >
                  Send Message
                </button>

                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-zinc-950 text-white text-xs text-center uppercase tracking-widest font-bold"
                    >
                      Message Transmitted. Thank you.
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>

          </div>

          {/* Footer */}
          <div className="mt-24 pt-8 border-t border-zinc-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
            <span>© {new Date().getFullYear()} Abderraouf Boukhobza. Designed for enterprise software solutions.</span>
            <span>Minimalist light mode design</span>
          </div>

        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectGalleryModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;