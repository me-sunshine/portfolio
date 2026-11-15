import fs from 'node:fs';
import { parse } from 'yaml';
import { marked } from 'marked';
import { getCollection } from 'astro:content';

const read = (file: string) => {
  try { return parse(fs.readFileSync(`./content/${file}`, 'utf8')) ?? null; } catch { return null; }
};
const arr = (v: any) => (Array.isArray(v) ? v.filter(Boolean) : []);

export const site = (() => {
  const s = read('site.yml') ?? {};
  return { title: s.title || 'Portfolio', description: s.description || '', url: s.url || '',
           home_sections: arr(s.home_sections), footer_note: s.footer_note || '' };
})();

export const profile = (() => {
  const p = read('profile.yml') ?? {};
  return { ...p, name: p.name || site.title, links: arr(p.links).filter((l: any) => l.url), objectives: arr(p.objectives),
           figures: arr(p.figures).filter((f: any) => f.value), languages: arr(p.languages), awards: arr(p.awards),
           volunteering: arr(p.volunteering) };
})();

export const skills = arr(read('skills.yml')).filter((s: any) => s.category && arr(s.items).length);
export const certifications = arr(read('certifications.yml')).filter((c: any) => c.name && c.published !== false);

const byStartDesc = (a: any, b: any) => (b.data.start || '').localeCompare(a.data.start || '');
const byOrder = (a: any, b: any) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);

export const experience = async () => (await getCollection('experience', (e) => e.data.published)).sort(byStartDesc);
export const education = async () => (await getCollection('education', (e) => e.data.published)).sort(byStartDesc);
export const projects = async () => (await getCollection('projects', (e) => e.data.published)).sort(byOrder);
export const caseStudies = async () => (await getCollection('caseStudies', (e) => e.data.published)).sort(byOrder);
export const articles = async () =>
  (await getCollection('articles', (e) => e.data.published)).sort((a, b) => b.data.date.localeCompare(a.data.date));

export const md = (s: string) => (s ? (marked.parse(s, { async: false }) as string) : '');

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const month = (d: string) => {
  const m = /^(\d{4})(?:-(\d{2}))?/.exec(String(d || ''));
  if (!m) return String(d || '');
  return m[2] ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : m[1];
};
export const period = (start: string, end: string) => [month(start), end ? month(end) : 'Present'].filter(Boolean).join(' – ');
export const fullDate = (d: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(d || ''));
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : month(d);
};
