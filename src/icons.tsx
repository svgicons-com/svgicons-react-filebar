// Local React adaptation, NOT a SVGicons collection export. See icon-sources.json.
import type { ReactNode } from "react";
export const shapes = {
  "folder": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></>,
  "file": <><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path></g></>,
  "search": <><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m21 21l-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></g></>,
  "upload": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v12m5-7l-5-5l-5 5m14 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path></>,
  "download": <><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10l5 5l5-5"></path></g></>,
  "trash-2": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11v6m4-6v6m5-11v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></>,
} satisfies Record<string, ReactNode>;
export type IconName = keyof typeof shapes;
export function Icon({ name, size = 24 }: { name: IconName; size?: 20 | 24 }) {
  return <svg className="icon" data-icon={name} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">{shapes[name]}</svg>;
}
