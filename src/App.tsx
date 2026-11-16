/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  Instagram,
  Linkedin,
  Github,
  Briefcase,
  Terminal,
  ArrowUpRight,
  Mail,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Code2,
  Database,
  Globe,
  Languages,
  ChevronLeft,
  Sparkles,
  Menu,
  X,
  Cpu,
  Layers,
  Award,
} from 'lucide-react';

import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { getProjectImages } from './data/projectImages';
import AdminDashboard from './components/AdminDashboard';
import profilePhoto from './assets/images/profile/foto1.png';
import { applySeo, getLangFromPath, type SiteLang } from './utils/seo';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
};

const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
  <div className="mb-10 md:mb-14">
    {eyebrow && <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-3">{eyebrow}</p>}
    <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">{title}</h2>
    {subtitle && <p className="mt-3 text-zinc-400 max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang: SiteLang = i18n.language === 'en' ? 'id' : 'en';
    const target = nextLang === 'id' ? '/id/' : '/en/';
    window.location.assign(`${target}${window.location.hash}`);
  };

  const navItems = ['home', 'experience', 'projects', 'skills'];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0b]/70 backdrop-blur-xl border-b border-white/8' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 md:h-18 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-colors">
            <Code2 className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-semibold text-sm md:text-base tracking-tight text-white">{t('navbar.brand')}</span>
        </a>

        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/8">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} className="px-4 py-2 rounded-full text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
              {t(`navbar.${item}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleLanguage} className="h-9 px-3 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold text-zinc-300 hover:text-white hover:border-white/20 transition flex items-center gap-1.5" title={i18n.language === 'en' ? 'Switch to Indonesian' : 'Switch to English'} aria-label={i18n.language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}>
            <Languages className="w-3.5 h-3.5" aria-hidden="true" />
            {i18n.language === 'en' ? 'EN' : 'ID'}
          </button>
          <a href="mailto:fandicahya56@gmail.com?subject=Halo&body=Saya tertarik dengan layanan Anda" className="hidden sm:inline-flex h-9 px-4 rounded-full bg-white text-black text-xs font-semibold hover:bg-primary transition-colors items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> {t('navbar.hireMe')}
          </a>
          <button onClick={() => setMenuOpen((p) => !p)} className="md:hidden h-9 w-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-300" aria-label="Menu">
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-5 pb-4">
          <div className="panel rounded-2xl p-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition">
                {t(`navbar.${item}`)}
              </a>
            ))}
            <a href="mailto:fandicahya56@gmail.com?subject=Halo&body=Saya tertarik dengan layanan Anda" className="mt-1 px-4 py-3 rounded-xl bg-white text-black text-sm font-semibold text-center">{t('navbar.hireMe')}</a>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const [cursor, setCursor] = useState({ x: 50, y: 50, active: false });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursor({ x, y, active: true });
  };

  const handleLeave = () => setCursor((c) => ({ ...c, active: false }));

  return (
    <section id="home" className="relative pt-24 md:pt-32 pb-10 md:pb-14">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/10 blur-[120px] rounded-full opacity-60" />
        <div className="absolute top-40 right-0 w-[400px] h-[300px] bg-accent/10 blur-[120px] rounded-full opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-300 mb-7">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t('hero.status')}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-white text-balance">
            {t('hero.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-300 to-accent">{t('hero.titleHighlight')}</span>{' '}
            {t('hero.titleEnd')}
          </h1>

          <p className="mt-6 text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl">
            {t('hero.description')}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a href="#projects" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-black font-semibold text-sm hover:bg-primary transition-colors">
              {t('hero.viewProjects')} <ArrowUpRight className="w-4 h-4" />
            </a>
            <a href="mailto:fandicahya56@gmail.com?subject=Halo&body=Saya tertarik dengan layanan Anda" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-white/12 bg-white/[0.02] text-white font-medium text-sm hover:bg-white/[0.06] transition-colors">
              <Mail className="w-4 h-4" /> {t('navbar.hireMe')}
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4 text-zinc-400">
            <a href="https://github.com/FandiCahya" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub"><Github className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/muhammad-fandi-nurcahya-1061041b7/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/cay56f/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram"><Instagram className="w-5 h-5" /></a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="relative lg:justify-self-end w-full max-w-md mx-auto flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 blur-3xl rounded-full" />
          </div>
          <div
            className="relative w-72 md:w-[30rem] lg:w-[34rem] aspect-square cursor-none select-none"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            aria-label="Foto profil"
          >
            <img
              src={profilePhoto}
              alt="Foto profil Muhammad Fandi Nurcahya"
              className="absolute inset-0 w-full h-full object-contain object-center"
              draggable={false}
              fetchPriority="high"
              decoding="async"
            />
            <img
              src={profilePhoto}
              alt=""
              aria-hidden="true"
              draggable={false}
              decoding="async"
              className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none transition-opacity duration-150"
              style={{
                filter: 'brightness(0) invert(1)',
                opacity: cursor.active ? 1 : 0,
                WebkitMaskImage: `radial-gradient(circle 80px at ${cursor.x}% ${cursor.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 70%)`,
                maskImage: `radial-gradient(circle 80px at ${cursor.x}% ${cursor.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 70%)`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const WorkExperience = () => {
  const { t } = useTranslation();
  const experiences = (t('experience.experiences', { returnObjects: true }) as any[]) || [];

  return (
    <section id="experience" className="py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="Career" title={t('experience.title')} subtitle={t('experience.subtitle')} />
        <div className="relative">
          <div className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent" />
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div key={index} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.06 }} className="relative pl-12 md:pl-16">
                <div className="absolute left-0 top-1.5 w-10 h-10 md:w-12 md:h-12 rounded-2xl panel flex items-center justify-center">
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="panel panel-hover rounded-2xl p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display text-lg md:text-xl font-semibold text-white">{exp.role}</h3>
                      <p className="text-zinc-300 font-medium">{exp.company}</p>
                    </div>
                    <span className="inline-flex self-start px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 whitespace-nowrap">{exp.period}</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, onView }: { project: any; onView: () => void }) => {
  const { t } = useTranslation();
  const image = project.images?.[0];
  return (
    <div className="panel panel-hover rounded-3xl overflow-hidden h-full flex flex-col">
      <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
        {image ? (
          <img src={image} alt={project.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600"><Layers className="w-10 h-10" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-70" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur border border-white/10 text-[11px] font-medium text-zinc-200">{project.category}</span>
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-5">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          <button onClick={onView} className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-primary transition-colors">
            {t('projects.viewProject')} <ArrowUpRight className="w-4 h-4" />
          </button>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-white/12 text-zinc-200 text-sm font-medium hover:bg-white/5 transition-colors">
              {t('projects.openUrl')} <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
  const { t } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  useEffect(() => { setActiveImageIndex(0); }, [project]);

  const isVideoUrl = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
  const images = project.images || [];
  const nextImage = () => { if (images.length > 1) setActiveImageIndex((p) => (p + 1) % images.length); };
  const prevImage = () => { if (images.length > 1) setActiveImageIndex((p) => (p - 1 + images.length) % images.length); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.97, opacity: 0, y: 8 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 260 }} className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-[#111113] rounded-3xl border border-white/10 shadow-2xl modal-scroll" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition" aria-label="Close"><X className="w-5 h-5" /></button>
        <div className="p-5 md:p-8">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-zinc-900 flex items-center justify-center group">
            {images[activeImageIndex] && isVideoUrl(images[activeImageIndex]) ? (
              <video src={images[activeImageIndex]} controls muted preload="metadata" className="max-w-full max-h-full object-contain" />
            ) : (
              <img src={images[activeImageIndex] ?? `https://picsum.photos/seed/${encodeURIComponent(project.title)}/1200/675`} alt={project.title} loading="lazy" decoding="async" className="max-w-full max-h-full object-contain" />
            )}
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition"><ChevronRight className="w-5 h-5" /></button>
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/50 text-xs text-white">{activeImageIndex + 1} / {images.length}</div>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto mb-6 pb-1 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
              {images.map((img: string, idx: number) => (
                <button key={idx} onClick={() => setActiveImageIndex(idx)} className={`shrink-0 rounded-xl overflow-hidden border-2 transition ${idx === activeImageIndex ? 'border-primary' : 'border-white/10 hover:border-white/25'}`}>
                  {isVideoUrl(img) ? <div className="w-20 h-14 bg-zinc-800 flex items-center justify-center text-[10px] font-semibold text-zinc-300">VIDEO</div> : <img src={img} alt="" loading="lazy" decoding="async" className="w-20 h-14 object-cover bg-zinc-800" />}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold tracking-wide mb-3">{project.category}</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">{project.title}</h2>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-white/12 text-sm font-medium text-zinc-200 hover:bg-white/5 transition mb-5">
                  <ExternalLink className="w-4 h-4" /> {t('projects.openUrl')}
                </a>
              )}
              <p className="text-zinc-300 leading-relaxed text-[15px] md:text-base">{project.description}</p>
            </div>
            <div className="space-y-5">
              <div className="panel rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-3">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4"><span className="text-zinc-400">Status</span><span className="text-zinc-200 font-medium">{project.details?.status || '-'}</span></div>
                  <div className="flex justify-between gap-4"><span className="text-zinc-400">Type</span><span className="text-zinc-200 font-medium text-right">{project.details?.type || project.category}</span></div>
                </div>
              </div>
              <div className="panel rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {(project.details?.technologies || []).length > 0 ? (
                    project.details.technologies.map((tech: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-300">{tech}</span>
                    ))
                  ) : <span className="text-sm text-zinc-500">-</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const { t } = useTranslation();
  const rawProjects = (t('projects.projects', { returnObjects: true }) as any[]) || [];
  const projectTechs = Array.from(
    new Map(
      rawProjects
        .flatMap((p) => (Array.isArray(p?.details?.technologies) ? p.details.technologies : []))
        .filter((tech) => typeof tech === 'string' && tech.trim())
        .map((tech) => [tech.trim().toLowerCase(), tech.trim()])
    ).values()
  );

  const baseGroups: { key: string; title: string; skills: string[]; icon: any }[] = [
    { key: 'languages', title: t('skills.groups.languages'), skills: ['Python', 'JavaScript', 'PHP', 'Kotlin', 'Dart'], icon: <Globe className="w-5 h-5" /> },
    { key: 'frameworks', title: t('skills.groups.frameworks'), skills: ['Laravel', 'Django', 'Flutter', 'React.js', 'Bootstrap'], icon: <Layers className="w-5 h-5" /> },
    { key: 'databaseApi', title: t('skills.groups.databaseApi'), skills: ['MySQL', 'PostgreSQL', 'REST API', 'Supabase', 'Firebase'], icon: <Database className="w-5 h-5" /> },
    { key: 'tools', title: t('skills.groups.tools'), skills: ['Git', 'GitHub', 'GitLab', 'Docker', 'Postman'], icon: <Terminal className="w-5 h-5" /> },
    { key: 'others', title: t('others', { defaultValue: 'Others' }), skills: ['Roblox Studio'], icon: <Cpu className="w-5 h-5" /> },
  ];

  const categoryMap: Record<string, string> = {
    python: 'languages', javascript: 'languages', php: 'languages', kotlin: 'languages', dart: 'languages', typescript: 'languages', java: 'languages', 'c#': 'languages', 'c++': 'languages', go: 'languages', ruby: 'languages',
    laravel: 'frameworks', django: 'frameworks', flutter: 'frameworks', 'react.js': 'frameworks', react: 'frameworks', bootstrap: 'frameworks', 'chart.js': 'frameworks', chartjs: 'frameworks', tailwind: 'frameworks', 'tailwind css': 'frameworks', vue: 'frameworks', 'vue.js': 'frameworks', next: 'frameworks', 'next.js': 'frameworks', express: 'frameworks', 'node.js': 'frameworks', nodejs: 'frameworks',
    mysql: 'databaseApi', postgresql: 'databaseApi', 'rest api': 'databaseApi', supabase: 'databaseApi', firebase: 'databaseApi', mongodb: 'databaseApi', sqlite: 'databaseApi', api: 'databaseApi',
    git: 'tools', github: 'tools', gitlab: 'tools', docker: 'tools', postman: 'tools', vercel: 'tools', figma: 'tools', vscode: 'tools',
  };

  const addUnique = (arr: string[], value: string) => {
    if (!arr.some((s) => s.toLowerCase() === value.toLowerCase())) arr.push(value);
  };

  projectTechs.forEach((tech) => {
    const key = tech.toLowerCase().replace(/\s+/g, ' ').trim();
    const cat = categoryMap[key] || categoryMap[key.replace(/\./g, '')] || 'tools';
    const group = baseGroups.find((g) => g.key === cat) || baseGroups.find((g) => g.key === 'tools')!;
    addUnique(group.skills, tech);
  });

  const skillGroups = baseGroups;

  return (
    <section id="skills" className="py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="Expertise" title={t('skills.title')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {skillGroups.map((group, idx) => (
            <motion.div key={idx} {...fadeUp} transition={{ ...fadeUp.transition, delay: idx * 0.05 }} className="panel panel-hover rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">{group.icon}</div>
                <h3 className="font-display font-semibold text-white">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/8 text-sm text-zinc-300">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const { t } = useTranslation();
  return (
    <section className="py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="Background" title={t('education.title')} />
        <motion.div {...fadeUp} className="panel rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-1">
              <h3 className="font-display text-xl md:text-2xl font-semibold text-white">{t('education.school')}</h3>
              <span className="inline-flex self-start px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">{t('education.period')}</span>
            </div>
            <p className="text-zinc-300 font-medium">{t('education.major')}</p>
            <p className="text-zinc-400 mt-1">{t('education.gpa')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AdditionalInfo = () => {
  const { t } = useTranslation();
  const certifications = (t('additional.certifications.list', { returnObjects: true }) as string[]) || [];

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="More" title={t('additional.languages.title') + ' & ' + t('additional.certifications.title')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <motion.div {...fadeUp} className="panel panel-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent"><Globe className="w-5 h-5" /></div>
              <h3 className="font-display font-semibold text-white">{t('additional.languages.title')}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/8 text-sm text-zinc-300">{t('additional.languages.indonesian')}</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/8 text-sm text-zinc-300">{t('additional.languages.english')}</span>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} className="panel panel-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary"><Award className="w-5 h-5" /></div>
              <h3 className="font-display font-semibold text-white">{t('additional.certifications.title')}</h3>
            </div>
            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
              {certifications.length === 0 && <p className="text-sm text-zinc-500">-</p>}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const adminEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_ADMIN === 'true';
  return (
    <footer className="border-t border-white/8 mt-8">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-white">{t('footer.name')}</span>
          </div>
          <p className="text-xs text-zinc-500">{t('footer.copyright')}</p>
          {adminEnabled && <a href="#admin" className="inline-block mt-2 text-[10px] uppercase tracking-widest text-zinc-600 hover:text-zinc-400">Admin</a>}
        </div>
        <div className="flex items-center gap-3">
          <a className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition" href="https://github.com/FandiCahya" target="_blank" rel="noopener noreferrer" title="GitHub"><Github className="w-4 h-4" /></a>
          <a className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition" href="https://www.linkedin.com/in/muhammad-fandi-nurcahya-1061041b7/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><Linkedin className="w-4 h-4" /></a>
          <a className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition" href="https://www.instagram.com/cay56f/" target="_blank" rel="noopener noreferrer" title="Instagram"><Instagram className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
};

function TerminalLoader() {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    applySeo(null);
  }, []);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'));
    }, 250);
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 7));
    }, 90);

    const redirectTimer = setTimeout(() => {
      const lang = typeof navigator !== 'undefined' && (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase().startsWith('id') ? 'id' : 'en';
      window.location.replace(`/${lang}/`);
    }, 1400);

    return () => {
      clearInterval(dotTimer);
      clearInterval(progressTimer);
      clearTimeout(redirectTimer);
    };
  }, []);

  const lines = [
    '> initializing portfolio',
    '> loading modules',
    '> detecting language',
    '> launching interface',
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-emerald-400 font-mono flex items-center justify-center p-6">
      <div className="w-full max-w-2xl border border-emerald-500/20 bg-black/60 rounded-xl p-5 md:p-7 shadow-2xl shadow-emerald-900/10">
        <div className="flex items-center gap-2 mb-5 text-xs text-emerald-300/70">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          <span className="ml-2">boot@cahyame:~</span>
        </div>
        <div className="space-y-2 text-sm md:text-base">
          {lines.map((line, i) => (
            <p key={i} className={progress >= (i + 1) * 22 ? 'opacity-100' : 'opacity-30'}>{line} <span className="text-emerald-300">{progress >= (i + 1) * 22 ? 'ok' : '...'}</span></p>
          ))}
          <p className="text-emerald-300 mt-4">redirecting{dots}</p>
        </div>
        <div className="mt-6 h-2 w-full bg-emerald-950/60 rounded overflow-hidden border border-emerald-500/20">
          <div className="h-full bg-emerald-400 transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-xs text-emerald-300/70">{progress}%</p>
      </div>
    </div>
  );
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [route, setRoute] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  );
  const pathLang = typeof window !== 'undefined' ? getLangFromPath(window.location.pathname) : null;

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathLang) {
      if (i18n.language !== pathLang) i18n.changeLanguage(pathLang);
      applySeo(pathLang);
    } else if (window.location.pathname === '/' || window.location.pathname === '') {
      applySeo(null);
    }
  }, [pathLang, i18n]);

  const rawProjects = t('projects.projects', { returnObjects: true }) as any[];
  const projects = (Array.isArray(rawProjects) ? rawProjects : []).map((project) => {
    const customImages = Array.isArray(project.images)
      ? project.images.filter((img: any) => typeof img === 'string' && img.trim())
      : [];
    return {
      ...project,
      images: customImages.length > 0 ? customImages : getProjectImages(project.title),
    };
  });

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (currentProjectIndex >= projects.length) setCurrentProjectIndex(0);
  }, [projects.length, currentProjectIndex]);

  const adminEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_ADMIN === 'true';
  if (route === '#admin') {
    if (!adminEnabled) {
      return (
        <div className="min-h-screen bg-site text-slate-100 flex items-center justify-center p-6">
          <div className="panel rounded-2xl p-8 max-w-md text-center">
            <h1 className="text-xl font-bold mb-2">Admin tidak tersedia</h1>
            <p className="text-zinc-400 text-sm mb-4">Dashboard admin dinonaktifkan pada situs produksi.</p>
            <a href={pathLang ? `/${pathLang}/` : '/'} className="inline-flex px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold">Kembali ke Beranda</a>
          </div>
        </div>
      );
    }
    return <AdminDashboard />;
  }

  if (!pathLang) {
    return <TerminalLoader />;
  }

  const nextProject = () => setCurrentProjectIndex((prev) => (projects.length ? (prev + 1) % projects.length : 0));
  const prevProject = () => setCurrentProjectIndex((prev) => (projects.length ? (prev - 1 + projects.length) % projects.length : 0));
  const goToProject = (index: number) => setCurrentProjectIndex(index);
  const openProjectModal = (project: any) => { setSelectedProject(project); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setSelectedProject(null); };

  const featured = projects.length > 0 ? projects[currentProjectIndex] : null;

  return (
    <div className="min-h-screen bg-site text-zinc-100 font-sans selection:bg-primary/25 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <WorkExperience />

        <section id="projects" className="py-10 md:py-14">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <SectionHeading eyebrow="Selected Work" title={t('projects.title')} />
            {projects.length > 0 && featured ? (
              <div className="space-y-6">
                <div className="relative">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4 md:gap-5 items-stretch">
                    <motion.div key={currentProjectIndex} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="panel rounded-3xl overflow-hidden min-h-[360px] md:min-h-[440px] relative">
                      <img src={featured.images?.[0] || `https://picsum.photos/seed/${currentProjectIndex}/1200/800`} alt={featured.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur border border-white/10 text-[11px] font-medium text-zinc-200 mb-3">{featured.category}</span>
                        <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3">{featured.title}</h3>
                        <p className="text-zinc-300 text-sm md:text-base line-clamp-2 max-w-2xl mb-4">{featured.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => openProjectModal(featured)} className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-primary transition-colors">{t('projects.viewProject')} <ArrowUpRight className="w-4 h-4" /></button>
                          {featured.url && <a href={featured.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-white/15 bg-black/20 backdrop-blur text-sm text-white hover:bg-white/10 transition">{t('projects.openUrl')} <ExternalLink className="w-4 h-4" /></a>}
                        </div>
                      </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5 content-start">
                      {projects.filter((_, i) => i !== currentProjectIndex).slice(0, 3).map((p) => (
                        <button key={p.title + p.url} onClick={() => goToProject(projects.indexOf(p))} className="panel panel-hover rounded-2xl p-4 text-left flex gap-4 items-center">
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-white/8">
                            {p.images?.[0] ? <img src={p.images[0]} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-600"><Layers className="w-5 h-5"/></div>}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-wider text-primary mb-1">{p.category}</p>
                            <h4 className="font-display font-semibold text-white truncate">{p.title}</h4>
                            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{p.description}</p>
                          </div>
                        </button>
                      ))}
                      <div className="panel rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={prevProject} className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center hover:bg-white/5 transition" aria-label="Previous"><ChevronLeft className="w-4 h-4" /></button>
                          <button onClick={nextProject} className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center hover:bg-white/5 transition" aria-label="Next"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {projects.map((_, index) => (
                            <button key={index} onClick={() => goToProject(index)} className={`h-1.5 rounded-full transition-all ${index === currentProjectIndex ? 'w-6 bg-primary' : 'w-1.5 bg-white/20 hover:bg-white/40'}`} aria-label={`Go to project ${index + 1}`} />
                          ))}
                        </div>
                        <span className="text-xs text-zinc-500">{currentProjectIndex + 1} / {projects.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="panel rounded-3xl p-10 text-center text-zinc-400">Belum ada project.</div>
            )}
          </div>
        </section>

        <Skills />
        <Education />
        <AdditionalInfo />
      </main>
      <Footer />

      {showModal && selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
