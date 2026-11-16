import enDefault from '../locales/en.json';
import idDefault from '../locales/id.json';

export type Lang = 'en' | 'id';

const STORAGE_KEY = 'portfolio_content_v1';

const defaults: Record<Lang, any> = {
  en: enDefault,
  id: idDefault,
};

function deepMerge(base: any, override: any): any {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : base;
  }
  if (base && typeof base === 'object') {
    const result: any = { ...base };
    if (override && typeof override === 'object') {
      for (const key of Object.keys(override)) {
        if (key in base) {
          result[key] = deepMerge(base[key], override[key]);
        } else {
          result[key] = override[key];
        }
      }
    }
    return result;
  }
  return override !== undefined ? override : base;
}

export function getDefaults() {
  return defaults;
}

export function loadOverrides(): Partial<Record<Lang, any>> {
  // Production content must match the prerendered JSON files.
  if (import.meta.env.PROD) return {};

  if (typeof window === 'undefined') return {};

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveOverrides(overrides: Partial<Record<Lang, any>>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export function clearOverrides() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getContent(lang: Lang) {
  const overrides = loadOverrides();
  return deepMerge(defaults[lang], overrides[lang] || {});
}

export function getAllContent(): Record<Lang, any> {
  return {
    en: getContent('en'),
    id: getContent('id'),
  };
}

export function setAllContent(content: Record<Lang, any>) {
  saveOverrides(content);
}
