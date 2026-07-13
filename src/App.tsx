/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Instagram,
  Linkedin,
  Github,
  Briefcase,
  Cpu, 
  Terminal, 
  ArrowUpRight, 
  MessageSquare, 
  Share2, 
  Code, 
  Mail, 
  Wallet,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Code2,
  Database,
  Globe,
  Languages,
  ChevronLeft
} from 'lucide-react';

import { getProjectImages } from './data/projectImages';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navItems = ['HOME', 'EXPERIENCE', 'PROJECTS', 'SKILLS'];

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 px-6 md:px-20 py-4 glass sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="text-primary flex items-center justify-center">
          <Code2 className="w-8 h-8 text-glow-primary" />
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-tight uppercase">{t('navbar.brand')}</h2>
      </div>

      <div className="flex flex-1 justify-end items-center gap-4 md:gap-10">
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              className="text-slate-300 hover:text-primary transition-colors text-sm font-medium tracking-wider"
              href={`#${item.toLowerCase()}`}
            >
              {t(`navbar.${item.toLowerCase()}`)}
            </a>
          ))}
        </nav>

        <button
          onClick={toggleLanguage}
          className="flex min-w-10.5 sm:min-w-13 cursor-pointer items-center justify-center rounded-full h-11 px-3 bg-white/10 text-white text-xs font-black tracking-widest border border-white/30 hover:brightness-125 transition-all"
          title={i18n.language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
        >
          <Languages className="w-4 h-4" />
        </button>

        <button
          onClick={() => window.location.href = 'mailto:fandicahya56@gmail.com?subject=Halo&body=Saya tertarik dengan layanan Anda'}
          className="hidden sm:flex items-center justify-center rounded-full h-11 px-6 bg-primary text-white text-xs font-black tracking-widest glow-primary border border-white/30 hover:brightness-125 transition-all whitespace-nowrap"
        >
          <Mail className="w-4 h-4 mr-2" />
          <span className="truncate">{t('navbar.hireMe')}</span>
        </button>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex md:hidden items-center justify-center rounded-full h-11 w-11 bg-white/10 text-white border border-white/30 hover:bg-white/20 transition-all"
          aria-label="Open navigation menu"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-6 top-full mt-3 w-[calc(100vw-3rem)] max-w-sm rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-xl p-4 shadow-2xl md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item}
                onClick={() => setMenuOpen(false)}
                href={`#${item.toLowerCase()}`}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 transition-colors"
              >
                {t(`navbar.${item.toLowerCase()}`)}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-100 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <Languages className="w-4 h-4" />
              {i18n.language === 'en' ? 'ID' : 'EN'}
            </button>
            <button
              onClick={() => window.location.href = 'mailto:fandicahya56@gmail.com?subject=Halo&body=Saya tertarik dengan layanan Anda'}
              className="flex items-center justify-center rounded-2xl px-4 py-3 bg-primary text-white text-sm font-semibold tracking-widest hover:brightness-110 transition-all"
            >
              <Mail className="w-4 h-4 mr-2" />
              {t('navbar.hireMe')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 pt-12">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 w-fit glow-primary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-primary text-[10px] font-bold tracking-widest uppercase">{t('hero.status')}</span>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
            {t('hero.title')} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-accent-violet to-accent-cyan animate-pulse">{t('hero.titleHighlight')}</span> {t('hero.titleEnd')}
          </h1>
          <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
            {t('hero.description')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#projects" className="flex w-full sm:w-auto cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white text-black text-sm font-bold tracking-wider hover:bg-accent-cyan hover:glow-cyan transition-all no-underline">
            {t('hero.viewProjects')}
          </a>
          <button className="flex w-full sm:w-14 h-14 items-center justify-center rounded-xl glass text-white hover:text-primary hover:border-primary/50 transition-all border border-white/10">
            <Terminal className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative flex justify-center items-center"
      >
        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-accent-violet/15 blur-[150px] rounded-full animate-pulse"></div>
        <div className="relative w-full aspect-square max-w-md rounded-full border border-white/20 shadow-[0_0_80px_rgba(112,0,255,0.3)] overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvHQ3rtlUxwSoNuA3yFi8oooDe7ECNhGR9zf_sDqtzkjqTSwwhajFMpB51s7KXmX9m9abOmNe53qLC7G4oRnqqrhvdeChdoMHwhoJBGCLVvNjy6WKscq0W0IR6TUVR-vFd4DAl40Ny_IwEvf-VjERBqMWF6OYJT0XSFDOFRF7UQEDzVnbm2Uo_744VszHaacHWpVD19B_GqTHoIrwwpdJhjF1BpdCmX_joF-HzZyE3-wChEXNF2S3hA-wXYtZd4Bhr9ecwOCWQVrw" 
            alt="Abstract 3D particle sphere"
            className="w-full h-full object-cover animate-float"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-accent-violet/40 via-transparent to-accent-cyan/20 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

const WorkExperience = () => {
  const { t } = useTranslation();
  const experiences = t('experience.experiences', { returnObjects: true }) as any[];

  return (
    <section id="experience" className="max-w-4xl mx-auto mb-24">
      <div className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <Briefcase className="w-16 h-16 text-accent-cyan/10 animate-pulse" />
        </div>
        <div className="relative z-10">
          <h2 className="text-white text-2xl font-bold mb-2">{t('experience.title')}</h2>
          <p className="text-slate-400 text-sm mb-8">{t('experience.subtitle')}</p>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex gap-6 items-start hover:bg-white/10 transition-all hover:border-white/20">
                <div className={`w-12 h-12 rounded-full bg-linear-to-br ${index === 0 ? 'from-primary to-accent-violet' : 'from-cyan-400 to-blue-600'} shrink-0 flex items-center justify-center shadow-lg`}>
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                    <span className="text-accent-cyan font-mono text-xs text-glow-cyan">{exp.period}</span>
                  </div>
                  <div className="text-slate-300 font-medium text-sm">{exp.company}</div>
                  <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-4xl mx-auto mb-24">
      <div className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <GraduationCap className="w-16 h-16 text-primary/10 animate-pulse" />
        </div>
        <div className="relative z-10">
          <h2 className="text-white text-2xl font-bold mb-2">{t('education.title')}</h2>
          <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/5 flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-orange-600 shrink-0 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <h3 className="text-white font-bold text-lg">{t('education.school')}</h3>
                <span className="text-accent-cyan font-mono text-xs text-glow-cyan">{t('education.period')}</span>
              </div>
              <div className="text-slate-300 font-medium text-sm">{t('education.major')}</div>
              <p className="text-slate-400 text-sm">{t('education.gpa')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const { t } = useTranslation();
  const skillGroups = [
    { title: t('skills.groups.languages'), skills: ['Python', 'JavaScript','Kotlin','Dart','PHP'], icon: <Globe className="w-5 h-5" /> },
    { title: t('skills.groups.frameworks'), skills: ['Laravel', 'Django','Flutter'], icon: <Code className="w-5 h-5" /> },
    { title: t('skills.groups.databaseApi'), skills: ['MySQL', 'REST API'], icon: <Database className="w-5 h-5" /> },
    { title: t('skills.groups.tools'), skills: ['Git', 'GitHub','Gitlab'], icon: <Terminal className="w-5 h-5" /> }
  ];

  return (
    <section id="skills" className="mb-24">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-white text-3xl font-bold tracking-tight">{t('skills.title')}</h2>
        <div className="h-px flex-1 mx-8 bg-linear-to-r from-primary/50 via-white/10 to-transparent"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillGroups.map((group, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-3 mb-4 text-primary">
              {group.icon}
              <h3 className="text-white font-bold">{group.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, sIdx) => (
                <span key={sIdx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ title, category, description, image, colorClass, delay, onViewProject, projectUrl }: any) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={`group relative overflow-hidden rounded-3xl glass border border-white/10 flex flex-col hover:border-${colorClass}/50 transition-all duration-300 animate-float min-h-104 md:min-h-112`}
      style={{ animationDelay: `${delay * 2}s` }}
    >
      <div className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105" 
           style={{ 
             backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.9) 100%), url("${image}")` 
           }}>
      </div>
      <div className="relative mt-auto p-6 md:p-8 flex flex-col gap-4 justify-end min-h-88">
        <div className="absolute inset-x-0 bottom-0 top-0 rounded-3xl bg-linear-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">
            {category}
          </span>
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">{title}</h3>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={onViewProject}
            className="flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 text-white rounded-xl font-bold text-xs transition-all group-hover:-translate-y-2 border border-white/30 hover:border-white/60 cursor-pointer"
          >
            {t('projects.viewProject')} <ArrowUpRight className="w-4 h-4" />
          </button>
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 text-primary rounded-xl font-bold text-xs transition-all group-hover:-translate-y-2 border border-primary/40 bg-primary/10 hover:bg-primary/20"
            >
              {t('projects.openUrl')} <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
  const { t } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Reset image index when switching projects
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  const isVideoUrl = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

  const nextImage = () => {
    if (project.images && project.images.length > 1) {
      setActiveImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project.images && project.images.length > 1) {
      setActiveImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl modal-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          aria-label="Close modal"
        >
          <span className="text-xl font-bold">×</span>
        </button>

        {/* Modal Content */}
        <div className="p-8">
          {/* Project Media Gallery */}
          <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden mb-4 group bg-slate-800 flex items-center justify-center">
            {project.images?.[activeImageIndex] && isVideoUrl(project.images[activeImageIndex]) ? (
              <video
                src={project.images[activeImageIndex]}
                controls
                muted
                className="max-w-full max-h-full object-contain transition-all duration-300"
              />
            ) : (
              <img
                src={project.images?.[activeImageIndex] ?? `https://picsum.photos/seed/project${project.title.replace(/\s+/g, '').toLowerCase()}/1200/600`}
                alt={project.title}
                className="max-w-full max-h-full object-contain transition-all duration-300"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />

            {/* Navigation Arrows */}
            {project.images && project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {project.images && project.images.length > 1 && (
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                {activeImageIndex + 1} / {project.images.length}
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {project.images && project.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto mb-6 pb-2 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
              {project.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    idx === activeImageIndex
                      ? 'border-primary shadow-lg shadow-primary/30 scale-105'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  {isVideoUrl(img) ? (
                    <div className="relative w-24 h-16 bg-slate-700 flex items-center justify-center text-white text-xs font-semibold">
                      VIDEO
                    </div>
                  ) : (
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-24 h-16 object-contain bg-slate-700"
                    />
                  )}
                  {idx === activeImageIndex && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Single Image Indicator */}
          {project.images && project.images.length === 1 && (
            <div className="mb-6 text-center">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase rounded-full">
                Project Screenshot
              </span>
            </div>
          )}

          {/* Project Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase rounded-full mb-3">
                {project.category}
              </span>
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{project.title}</h2>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-all mb-4"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('projects.openUrl')}
                </a>
              )}
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 text-lg leading-relaxed">{project.description}</p>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div className="space-y-4">
                <h3 className="text-white text-xl font-semibold">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-slate-300">Category: <span className="text-white font-medium">{project.category}</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-cyan rounded-full"></div>
                    <span className="text-slate-300">Status: <span className="text-green-400 font-medium">{project.details?.status || 'Completed'}</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-violet rounded-full"></div>
                    <span className="text-slate-300">Type: <span className="text-white font-medium">{project.details?.type || 'Application'}</span></span>
                  </div>
                  
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-xl font-semibold">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.details?.technologies ? (
                    project.details.technologies.map((tech: string, index: number) => {
                      const colors = [
                        'bg-blue-500/20 text-blue-300',
                        'bg-green-500/20 text-green-300',
                        'bg-orange-500/20 text-orange-300',
                        'bg-purple-500/20 text-purple-300',
                        'bg-red-500/20 text-red-300',
                        'bg-yellow-500/20 text-yellow-300',
                        'bg-indigo-500/20 text-indigo-300',
                        'bg-pink-500/20 text-pink-300'
                      ];
                      return (
                        <span key={index} className={`px-3 py-1 ${colors[index % colors.length]} text-xs rounded-full`}>
                          {tech}
                        </span>
                      );
                    })
                  ) : (
                    <>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">Technology</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="px-6 md:px-20 py-12 border-t border-white/10 glass">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary text-glow-primary" />
            <span className="text-white font-bold tracking-widest uppercase">{t('footer.name')}</span>
          </div>
          <p className="text-slate-500 text-xs">{t('footer.copyright')}</p>
        </div>
        <div className="flex gap-6">
          <a 
            className="text-slate-400 hover:text-accent-cyan transition-all transform hover:scale-110" 
            href="https://github.com/FandiCahya" 
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            className="text-slate-400 hover:text-accent-violet transition-all transform hover:scale-110" 
            href="https://www.linkedin.com/in/muhammad-fandi-nurcahya-1061041b7/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            className="text-slate-400 hover:text-primary transition-all transform hover:scale-110" 
            href="https://www.instagram.com/cay56f/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

const AdditionalInfo = () => {
  const { t } = useTranslation();
  const certifications = t('additional.certifications.list', { returnObjects: true }) as string[];

  return (
    <section className="max-w-4xl mx-auto mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Globe className="w-12 h-12 text-accent-cyan/10 animate-pulse" />
          </div>
          <h2 className="text-white text-xl font-bold mb-4">{t('additional.languages.title')}</h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300">{t('additional.languages.indonesian')}</span>
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300">{t('additional.languages.english')}</span>
          </div>
        </div>
        
        <div className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Share2 className="w-12 h-12 text-primary/10 animate-pulse" />
          </div>
          <h2 className="text-white text-xl font-bold mb-4">{t('additional.certifications.title')}</h2>
          <div className="space-y-3">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const { t } = useTranslation();
  const rawProjects = t('projects.projects', { returnObjects: true }) as any[];
  const projects = rawProjects.map((project) => ({
    ...project,
    images: getProjectImages(project.title),
  }));

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentProjectIndex(index);
  };
  const openProjectModal = (project: any) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen mesh-bg text-slate-100 font-sans selection:bg-primary/30 overflow-x-hidden">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 md:px-20">
        <Hero />
        
        <WorkExperience />

        <section id="projects" className="mb-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-white text-3xl font-bold tracking-tight">{t('projects.title')}</h2>
            <div className="h-px flex-1 mx-8 bg-linear-to-r from-primary/50 via-white/10 to-transparent"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="absolute left-0 top-1/3 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextProject}
              className="absolute right-0 top-1/3 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Project Display */}
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                key={currentProjectIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <ProjectCard
                  title={projects[currentProjectIndex].title}
                  category={projects[currentProjectIndex].category}
                  description={projects[currentProjectIndex].description}
                  image={projects[currentProjectIndex].images?.[0] ?? `https://picsum.photos/seed/project${currentProjectIndex + 1}/800/500`}
                  colorClass={currentProjectIndex % 2 === 0 ? "cyan" : "violet"}
                  delay={0.1}
                  onViewProject={() => openProjectModal(projects[currentProjectIndex])}
                  projectUrl={projects[currentProjectIndex].url}
                />
              </motion.div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex
                      ? 'bg-primary scale-125 shadow-lg shadow-primary/50'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Project Counter */}
            <div className="text-center mt-4">
              <span className="text-slate-400 text-sm">
                {currentProjectIndex + 1} / {projects.length}
              </span>
            </div>
          </div>
        </section>

        <Skills />

        <Education />

        <AdditionalInfo />
      </main>
      <Footer />

      {/* Project Modal */}
      {showModal && selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
}
