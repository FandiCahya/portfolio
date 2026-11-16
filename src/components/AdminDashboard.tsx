import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Save, RotateCcw, Plus, Trash2, ArrowLeft, LayoutDashboard,
  User, Briefcase, FolderKanban, Wrench, GraduationCap, Globe, FileText, Menu, Languages
} from 'lucide-react';
import { getDefaults, getAllContent, setAllContent, clearOverrides, type Lang } from '../utils/contentStore';

type Section = 'hero' | 'experience' | 'projects' | 'skills' | 'education' | 'additional' | 'footer';

const sections: { id: Section; label: string; icon: any }[] = [
  { id: 'hero', label: 'Hero', icon: User },
  { id: 'experience', label: 'Pengalaman', icon: Briefcase },
  { id: 'projects', label: 'Proyek', icon: FolderKanban },
  { id: 'skills', label: 'Kemampuan', icon: Wrench },
  { id: 'education', label: 'Pendidikan', icon: GraduationCap },
  { id: 'additional', label: 'Bahasa & Sertifikasi', icon: Globe },
  { id: 'footer', label: 'Footer & Navbar', icon: FileText },
];

const emptyProject = () => ({
  title: 'Project Baru',
  category: 'Kategori',
  description: '',
  details: { status: 'Selesai', type: '', technologies: [] as string[] },
  url: '',
  images: [] as string[],
});

const emptyExperience = () => ({
  role: '',
  company: '',
  period: '',
  description: '',
});

function clone<T>(v: T): T { return JSON.parse(JSON.stringify(v)); }

export default function AdminDashboard() {
  const { i18n } = useTranslation();
  const defaults = useMemo(() => getDefaults(), []);
  const [data, setData] = useState<Record<Lang, any>>(() => getAllContent());
  const [lang, setLang] = useState<Lang>(i18n.language === 'id' ? 'id' : 'en');
  const [section, setSection] = useState<Section>('projects');
  const [savedMsg, setSavedMsg] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const d = data[lang];

  const setField = (path: (string | number)[], value: any) => {
    setData((prev) => {
      const next = clone(prev);
      let cur: any = next[lang];
      for (let i = 0; i < path.length - 1; i++) {
        if (cur[path[i]] == null) cur[path[i]] = {};
        cur = cur[path[i]];
      }
      cur[path[path.length - 1]] = value;
      return next;
    });
  };

  const save = () => {
    setAllContent(data);
    i18n.addResourceBundle('en', 'translation', data.en, true, true);
    i18n.addResourceBundle('id', 'translation', data.id, true, true);
    i18n.changeLanguage(i18n.language);
    setSavedMsg('Perubahan tersimpan dan diterapkan ke situs.');
    setTimeout(() => setSavedMsg(''), 2500);
  };

  const reset = () => {
    if (!confirm('Reset semua konten (EN & ID) ke default?')) return;
    clearOverrides();
    const fresh = { en: clone(defaults.en), id: clone(defaults.id) };
    setData(fresh);
    i18n.addResourceBundle('en', 'translation', fresh.en, true, true);
    i18n.addResourceBundle('id', 'translation', fresh.id, true, true);
    i18n.changeLanguage(i18n.language);
    setSavedMsg('Konten direset ke default.');
    setTimeout(() => setSavedMsg(''), 2500);
  };

  const exit = () => { window.location.hash = ''; };

  const inputCls = "w-full rounded-xl bg-slate-900/80 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50";
  const labelCls = "block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide";
  const cardCls = "rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg shadow-black/20";

  const renderHero = () => (
    <div className="space-y-5">
      <div className={cardCls}>
        <h3 className="text-white font-semibold mb-4">Teks Hero</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={labelCls}>Status</label><input className={inputCls} value={d.hero?.status || ''} onChange={e => setField(['hero','status'], e.target.value)} /></div>
          <div><label className={labelCls}>Teks Tombol</label><input className={inputCls} value={d.hero?.viewProjects || ''} onChange={e => setField(['hero','viewProjects'], e.target.value)} /></div>
          <div><label className={labelCls}>Judul (awal)</label><input className={inputCls} value={d.hero?.title || ''} onChange={e => setField(['hero','title'], e.target.value)} /></div>
          <div><label className={labelCls}>Judul Highlight</label><input className={inputCls} value={d.hero?.titleHighlight || ''} onChange={e => setField(['hero','titleHighlight'], e.target.value)} /></div>
          <div><label className={labelCls}>Judul (akhir)</label><input className={inputCls} value={d.hero?.titleEnd || ''} onChange={e => setField(['hero','titleEnd'], e.target.value)} /></div>
          <div className="md:col-span-2"><label className={labelCls}>Deskripsi</label><textarea rows={5} className={inputCls} value={d.hero?.description || ''} onChange={e => setField(['hero','description'], e.target.value)} /></div>
        </div>
      </div>
    </div>
  );

  const renderExperience = () => {
    const items = d.experience?.experiences || [];
    return (
      <div className="space-y-5">
        <div className={cardCls}>
          <h3 className="text-white font-semibold mb-4">Header Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelCls}>Judul</label><input className={inputCls} value={d.experience?.title || ''} onChange={e => setField(['experience','title'], e.target.value)} /></div>
            <div><label className={labelCls}>Subjudul</label><input className={inputCls} value={d.experience?.subtitle || ''} onChange={e => setField(['experience','subtitle'], e.target.value)} /></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">Daftar Pengalaman</h3>
          <button onClick={() => setField(['experience','experiences'], [...items, emptyExperience()])} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-sm font-semibold"><Plus className="w-4 h-4"/>Tambah</button>
        </div>
        {items.map((exp: any, idx: number) => (
          <div key={idx} className={cardCls}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-primary">Pengalaman #{idx + 1}</span>
              <button onClick={() => setField(['experience','experiences'], items.filter((_: any, i: number) => i !== idx))} className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 text-sm"><Trash2 className="w-4 h-4"/>Hapus</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelCls}>Posisi / Role</label><input className={inputCls} value={exp.role || ''} onChange={e => { const n=[...items]; n[idx]={...n[idx], role:e.target.value}; setField(['experience','experiences'], n); }} /></div>
              <div><label className={labelCls}>Perusahaan</label><input className={inputCls} value={exp.company || ''} onChange={e => { const n=[...items]; n[idx]={...n[idx], company:e.target.value}; setField(['experience','experiences'], n); }} /></div>
              <div><label className={labelCls}>Periode</label><input className={inputCls} value={exp.period || ''} onChange={e => { const n=[...items]; n[idx]={...n[idx], period:e.target.value}; setField(['experience','experiences'], n); }} /></div>
              <div className="md:col-span-2"><label className={labelCls}>Deskripsi</label><textarea rows={3} className={inputCls} value={exp.description || ''} onChange={e => { const n=[...items]; n[idx]={...n[idx], description:e.target.value}; setField(['experience','experiences'], n); }} /></div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className={`${cardCls} text-slate-400`}>Belum ada pengalaman.</div>}
      </div>
    );
  };

  const renderProjects = () => {
    const items = d.projects?.projects || [];
    const updateItem = (idx: number, patch: any) => {
      const n = items.map((p: any, i: number) => i === idx ? { ...p, ...patch, details: { ...(p.details||{}), ...(patch.details||{}) } } : p);
      setField(['projects','projects'], n);
    };
    return (
      <div className="space-y-5">
        <div className={cardCls}>
          <h3 className="text-white font-semibold mb-4">Header & Label</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className={labelCls}>Judul Section</label><input className={inputCls} value={d.projects?.title || ''} onChange={e => setField(['projects','title'], e.target.value)} /></div>
            <div><label className={labelCls}>Label Tombol View</label><input className={inputCls} value={d.projects?.viewProject || ''} onChange={e => setField(['projects','viewProject'], e.target.value)} /></div>
            <div><label className={labelCls}>Label Tombol URL</label><input className={inputCls} value={d.projects?.openUrl || ''} onChange={e => setField(['projects','openUrl'], e.target.value)} /></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">Daftar Proyek ({items.length})</h3>
          <button onClick={() => setField(['projects','projects'], [...items, emptyProject()])} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-sm font-semibold"><Plus className="w-4 h-4"/>Tambah Proyek</button>
        </div>
        {items.map((p: any, idx: number) => (
          <div key={idx} className={cardCls}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-primary truncate pr-4">Proyek #{idx + 1}{p.title ? ` — ${p.title}` : ''}</span>
              <button onClick={() => setField(['projects','projects'], items.filter((_: any, i: number) => i !== idx))} className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 text-sm shrink-0"><Trash2 className="w-4 h-4"/>Hapus</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelCls}>Judul</label><input className={inputCls} value={p.title || ''} onChange={e => updateItem(idx, { title: e.target.value })} /></div>
              <div><label className={labelCls}>Kategori</label><input className={inputCls} value={p.category || ''} onChange={e => updateItem(idx, { category: e.target.value })} /></div>
              <div className="md:col-span-2"><label className={labelCls}>Deskripsi</label><textarea rows={4} className={inputCls} value={p.description || ''} onChange={e => updateItem(idx, { description: e.target.value })} /></div>
              <div className="md:col-span-2"><label className={labelCls}>URL (repo / live demo)</label><input className={inputCls} value={p.url || ''} onChange={e => updateItem(idx, { url: e.target.value })} placeholder="https://..." /></div>
              <div><label className={labelCls}>Status</label><input className={inputCls} value={p.details?.status || ''} onChange={e => updateItem(idx, { details: { ...p.details, status: e.target.value } })} /></div>
              <div><label className={labelCls}>Tipe</label><input className={inputCls} value={p.details?.type || ''} onChange={e => updateItem(idx, { details: { ...p.details, type: e.target.value } })} /></div>
              <div className="md:col-span-2"><label className={labelCls}>Teknologi (pisahkan dengan koma)</label><input className={inputCls} value={(p.details?.technologies || []).join(', ')} onChange={e => updateItem(idx, { details: { ...p.details, technologies: e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean) } })} /></div>
              <div className="md:col-span-2"><label className={labelCls}>Gambar/Media (URL, satu per baris)</label><textarea rows={3} className={inputCls} value={(p.images || []).join('\n')} onChange={e => updateItem(idx, { images: e.target.value.split('\n').map((s:string)=>s.trim()).filter(Boolean) })} placeholder="https://.../gambar1.webp&#10;https://.../demo.mp4 (opsional)" /><p className="text-xs text-slate-500 mt-1.5">Jika diisi, URL ini yang dipakai. Jika kosong, sistem otomatis memakai gambar/media dari <code>src/assets</code> berdasarkan judul/nama file.</p></div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className={`${cardCls} text-slate-400`}>Belum ada proyek. Klik &quot;Tambah Proyek&quot;.</div>}
      </div>
    );
  };

  const renderSkills = () => (
    <div className="space-y-5">
      <div className={cardCls}>
        <h3 className="text-white font-semibold mb-4">Skills (Label & Grup)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={labelCls}>Judul Section</label><input className={inputCls} value={d.skills?.title || ''} onChange={e => setField(['skills','title'], e.target.value)} /></div>
          <div><label className={labelCls}>Grup: Languages</label><input className={inputCls} value={d.skills?.groups?.languages || ''} onChange={e => setField(['skills','groups','languages'], e.target.value)} /></div>
          <div><label className={labelCls}>Grup: Frameworks</label><input className={inputCls} value={d.skills?.groups?.frameworks || ''} onChange={e => setField(['skills','groups','frameworks'], e.target.value)} /></div>
          <div><label className={labelCls}>Grup: Database & API</label><input className={inputCls} value={d.skills?.groups?.databaseApi || ''} onChange={e => setField(['skills','groups','databaseApi'], e.target.value)} /></div>
          <div><label className={labelCls}>Grup: Tools</label><input className={inputCls} value={d.skills?.groups?.tools || ''} onChange={e => setField(['skills','groups','tools'], e.target.value)} /></div>
        </div>
        <p className="text-xs text-slate-500 mt-3">Daftar item skill saat ini ada di kode komponen. Label grup bisa diubah di sini.</p>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-5">
      <div className={cardCls}>
        <h3 className="text-white font-semibold mb-4">Pendidikan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={labelCls}>Judul Section</label><input className={inputCls} value={d.education?.title || ''} onChange={e => setField(['education','title'], e.target.value)} /></div>
          <div><label className={labelCls}>Institusi</label><input className={inputCls} value={d.education?.school || ''} onChange={e => setField(['education','school'], e.target.value)} /></div>
          <div><label className={labelCls}>Periode</label><input className={inputCls} value={d.education?.period || ''} onChange={e => setField(['education','period'], e.target.value)} /></div>
          <div><label className={labelCls}>Jurusan</label><input className={inputCls} value={d.education?.major || ''} onChange={e => setField(['education','major'], e.target.value)} /></div>
          <div className="md:col-span-2"><label className={labelCls}>IPK / Keterangan</label><input className={inputCls} value={d.education?.gpa || ''} onChange={e => setField(['education','gpa'], e.target.value)} /></div>
        </div>
      </div>
    </div>
  );

  const renderAdditional = () => {
    const certs: string[] = d.additional?.certifications?.list || [];
    return (
      <div className="space-y-5">
        <div className={cardCls}>
          <h3 className="text-white font-semibold mb-4">Bahasa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelCls}>Judul Section</label><input className={inputCls} value={d.additional?.languages?.title || ''} onChange={e => setField(['additional','languages','title'], e.target.value)} /></div>
            <div></div>
            <div><label className={labelCls}>Label Indonesia</label><input className={inputCls} value={d.additional?.languages?.indonesian || ''} onChange={e => setField(['additional','languages','indonesian'], e.target.value)} /></div>
            <div><label className={labelCls}>Label English</label><input className={inputCls} value={d.additional?.languages?.english || ''} onChange={e => setField(['additional','languages','english'], e.target.value)} /></div>
          </div>
        </div>
        <div className={cardCls}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Sertifikasi</h3>
            <button onClick={() => setField(['additional','certifications','list'], [...certs, 'Sertifikasi Baru'])} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-sm font-semibold"><Plus className="w-4 h-4"/>Tambah</button>
          </div>
          <div className="mb-4"><label className={labelCls}>Judul Section Sertifikasi</label><input className={inputCls} value={d.additional?.certifications?.title || ''} onChange={e => setField(['additional','certifications','title'], e.target.value)} /></div>
          <div className="space-y-3">
            {certs.map((c, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input className={inputCls} value={c} onChange={e => { const n=[...certs]; n[idx]=e.target.value; setField(['additional','certifications','list'], n); }} />
                <button onClick={() => setField(['additional','certifications','list'], certs.filter((_,i)=>i!==idx))} className="p-2.5 rounded-xl text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20"><Trash2 className="w-4 h-4"/></button>
              </div>
            ))}
            {certs.length === 0 && <div className="text-slate-400 text-sm">Belum ada sertifikasi.</div>}
          </div>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <div className="space-y-5">
      <div className={cardCls}>
        <h3 className="text-white font-semibold mb-4">Footer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={labelCls}>Nama</label><input className={inputCls} value={d.footer?.name || ''} onChange={e => setField(['footer','name'], e.target.value)} /></div>
          <div className="md:col-span-2"><label className={labelCls}>Copyright</label><input className={inputCls} value={d.footer?.copyright || ''} onChange={e => setField(['footer','copyright'], e.target.value)} /></div>
        </div>
      </div>
      <div className={cardCls}>
        <h3 className="text-white font-semibold mb-4">Navbar & Menu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={labelCls}>Brand</label><input className={inputCls} value={d.navbar?.brand || ''} onChange={e => setField(['navbar','brand'], e.target.value)} /></div>
          <div><label className={labelCls}>Tombol Hire Me</label><input className={inputCls} value={d.navbar?.hireMe || ''} onChange={e => setField(['navbar','hireMe'], e.target.value)} /></div>
          <div><label className={labelCls}>Menu Home</label><input className={inputCls} value={d.navbar?.home || ''} onChange={e => setField(['navbar','home'], e.target.value)} /></div>
          <div><label className={labelCls}>Menu Experience</label><input className={inputCls} value={d.navbar?.experience || ''} onChange={e => setField(['navbar','experience'], e.target.value)} /></div>
          <div><label className={labelCls}>Menu Projects</label><input className={inputCls} value={d.navbar?.projects || ''} onChange={e => setField(['navbar','projects'], e.target.value)} /></div>
          <div><label className={labelCls}>Menu Skills</label><input className={inputCls} value={d.navbar?.skills || ''} onChange={e => setField(['navbar','skills'], e.target.value)} /></div>
        </div>
      </div>
    </div>
  );

  const contentMap: Record<Section, () => any> = {
    hero: renderHero,
    experience: renderExperience,
    projects: renderProjects,
    skills: renderSkills,
    education: renderEducation,
    additional: renderAdditional,
    footer: renderFooter,
  };
  const content = contentMap[section]();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#070b14]/85 backdrop-blur-xl">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10"><Menu className="w-5 h-5"/></button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center"><LayoutDashboard className="w-5 h-5 text-primary"/></div>
              <div>
                <div className="font-bold leading-tight">Admin Dashboard</div>
                <div className="text-[11px] text-slate-400">Kelola semua konten portofolio</div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-end">
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1">
              {(['id','en'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${lang===l?'bg-primary text-white shadow':'text-slate-300 hover:text-white'}`}>
                  <Languages className="w-3.5 h-3.5"/>{l.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={save} className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:brightness-110 shadow-lg shadow-primary/20"><Save className="w-4 h-4"/><span className="hidden sm:inline">Simpan</span></button>
            <button onClick={reset} className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10"><RotateCcw className="w-4 h-4"/><span className="hidden sm:inline">Reset</span></button>
            <button onClick={exit} className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl border border-white/10 text-sm font-semibold hover:bg-white/10"><ArrowLeft className="w-4 h-4"/><span className="hidden sm:inline">Situs</span></button>
          </div>
        </div>
        {savedMsg && <div className="px-4 md:px-6 pb-3"><div className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2">{savedMsg}</div></div>}
      </div>

      <div className="max-w-7xl mx-auto flex relative">
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-[57px] left-0 z-20 lg:z-auto w-64 shrink-0 border-r border-white/10 h-[calc(100vh-57px)] p-4 bg-[#070b14] transition-transform`}>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Section Konten</div>
          <nav className="space-y-1">
            {sections.map(s => {
              const Icon = s.icon;
              const active = section === s.id;
              return (
                <button key={s.id} onClick={() => { setSection(s.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${active ? 'bg-primary/15 text-white border border-primary/30' : 'text-slate-300 hover:bg-white/5 border border-transparent'}`}>
                  <Icon className={`w-4 h-4 ${active ? 'text-primary' : 'text-slate-400'}`}/>{s.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-6 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-400 leading-relaxed space-y-2">
            <p>Edit bahasa <b className="text-slate-200">{lang.toUpperCase()}</b> lalu klik <b className="text-slate-200">Simpan</b>.</p>
            <p>Data disimpan di <code>localStorage</code> browser ini (cocok untuk edit lokal/pratinjau). Untuk situs live di Vercel, gunakan export/commit atau CMS agar permanen.</p>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8 min-w-0 lg:ml-0">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-white">{sections.find(s=>s.id===section)?.label}</h2>
              <p className="text-sm text-slate-400 mt-1">Tambah atau ubah konten ({lang.toUpperCase()}).</p>
            </div>
            <div className="text-xs text-slate-500 bg-white/5 border border-white/10 rounded-lg px-3 py-2">Perubahan belum permanen sampai disimpan</div>
          </div>
          {content}
        </main>
      </div>
    </div>
  );
}
