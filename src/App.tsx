import { useRef, useState } from 'react';
import { Icon, type IconName } from './icons';

type DemoFile = { id: number; name: string; description: string; content: string };
const initialFiles: DemoFile[] = [
  { id: 1, name: 'Getting started.txt', description: 'A short guide to this workspace', content: 'Welcome to Filebar. These are fictional sample files, kept in memory.\n' },
  { id: 2, name: 'Interface notes.md', description: 'Decisions for a consistent toolbar', content: '# Interface notes\nUse one icon family. Give buttons clear names. Check disabled states.\n' },
  { id: 3, name: 'Release checklist.txt', description: 'Small checks before a handoff', content: 'Check focus, contrast, icon size, and selection.\n' },
];

export function App() {
  const [files, setFiles] = useState(initialFiles);
  const [selected, setSelected] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [size, setSize] = useState<20 | 24>(24);
  const [message, setMessage] = useState('Choose a file to enable its actions.');
  const [preview, setPreview] = useState<DemoFile | null>(null);
  const [pendingDelete, setPendingDelete] = useState(false);
  const search = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const nextId = useRef(4);
  const visible = files.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));
  const current = visible.find(file => file.id === selected);
  function reset() {
    setFiles(initialFiles); setSelected(null); setQuery(''); setPendingDelete(false);
    setMessage('Sample files restored.');
  }
  function download() {
    if (!current) return;
    const url = URL.createObjectURL(new Blob([current.content], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = current.name;
    anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage(`Download requested for ${current.name}.`);
  }
  function addSample() {
    const id = nextId.current++;
    const file = { id, name: `Sample note ${id - 3}.txt`, description: 'Added locally for this demonstration', content: 'This sample was created locally. No upload request was sent.\n' };
    setFiles(previous => [...previous, file]); setQuery(''); setSelected(id); setPendingDelete(false);
    setMessage(`${file.name} added locally. Nothing was uploaded.`);
  }
  const action = (name: IconName, label: string, onClick: () => void, disabled = false) =>
    <button type="button" disabled={disabled} onClick={onClick}><Icon name={name} size={size}/>{label}</button>;
  return <div className="app" data-theme={theme} data-icon-size={size}>
    <header className="site-header"><a className="wordmark" href="#workspace">filebar<span> / </span>lab</a><span className="edition">SVGicons · React example 01</span></header>
    <main>
      <section className="intro"><p className="eyebrow">SIX ICONS. ONE FAMILY.</p><h1>A little order<br/>for your files.</h1><p className="lede">One consistent Lucide kit, from a quiet file list to selected, disabled and focused controls.</p></section>
      <section className="workspace" id="workspace" aria-labelledby="workspace-title">
        <div className="workspace-top"><div><p className="eyebrow">LOCAL WORKSPACE</p><h2 id="workspace-title">Project files <span>{files.length}</span></h2></div>
          <div className="controls"><fieldset><legend>Theme</legend>{(['light','dark'] as const).map(value => <button key={value} aria-pressed={theme === value} onClick={() => setTheme(value)}>{value === 'light' ? 'Light' : 'Dark'}</button>)}</fieldset><fieldset><legend>Icon size</legend>{([20,24] as const).map(value => <button key={value} aria-pressed={size === value} onClick={() => setSize(value)}>{value} px</button>)}</fieldset></div></div>
        <div className="action-bar" role="group" aria-label="File actions">
          {action('folder','Open',() => { if (current) { setPreview(current); dialog.current?.showModal(); } },!current)}
          {action('search','Find',() => search.current?.focus())}
          {action('upload','Add sample',addSample)}
          <span className="action-spacer"/>
          {action('download','Download',download,!current)}
          {action('trash-2','Delete',() => setPendingDelete(true),!current)}
        </div>
        <div className="filter"><Icon name="search" size={20}/><label className="sr-only" htmlFor="search">Filter files</label><input ref={search} id="search" type="search" placeholder="Find a file by name…" value={query} onChange={event => {setQuery(event.target.value);setSelected(null);setPendingDelete(false);}}/><span>{visible.length} shown</span></div>
        <div className="list-heading"><span>NAME</span><span>SELECTION</span></div>
        <ul className="file-list" aria-label="Files">
          {visible.map(file => <li key={file.id}><button className="file-row" aria-pressed={selected === file.id} onClick={() => {setSelected(selected === file.id ? null : file.id);setPendingDelete(false);setMessage(selected === file.id ? 'Selection cleared.' : `${file.name} selected.`);}}><span className="file-symbol"><Icon name="file" size={size}/></span><span className="file-info"><strong>{file.name}</strong><small>{file.description}</small></span><span className="selection-label">{selected === file.id ? 'Selected' : 'Select'}</span></button></li>)}
        </ul>
        {visible.length === 0 && <div className="empty"><Icon name="folder" size={size}/><h3>{files.length ? 'No matching files' : 'A clear workspace'}</h3><p>{files.length ? 'Try another name or clear the filter.' : 'Add a sample or restore the starting files.'}</p>{query && <button onClick={() => setQuery('')}>Clear filter</button>}</div>}
        {pendingDelete && current && <div className="confirmation" role="group" aria-label="Confirm deletion"><span>Remove {current.name} from this demo?</span><button onClick={() => {setFiles(previous => previous.filter(file => file.id !== current.id));setSelected(null);setPendingDelete(false);setMessage(`${current.name} removed. Use Reset demo to restore it.`);}}>Confirm delete</button><button onClick={() => setPendingDelete(false)}>Cancel</button></div>}
        <footer className="workspace-footer"><p role="status">{message}</p><button onClick={reset}>Reset demo</button></footer>
      </section>
      <section className="notes"><div><span className="note-number">01</span><h3>One visual language</h3><p>Six Lucide icons. A 24-unit viewBox, rounded strokes and color inherited from the interface.</p></div><div><span className="note-number">02</span><h3>States with a purpose</h3><p>Select a file, use the keyboard, change the theme. Actions become available when they make sense.</p></div><div><span className="note-number">03</span><h3>Try your own kit</h3><p>Explore a family on SVGicons and make your own selection.</p><a href="https://svgicons.com/project-kits">Explore SVGicons collections →</a></div></section>
      <p className="provenance">Local demonstration · No uploads or analytics. Icons downloaded from SVGicons public SVG URLs; React wrappers written for this example. Not a collection-export demonstration.</p>
    </main>
    <dialog ref={dialog} aria-labelledby="preview-title"><h2 id="preview-title">{preview?.name}</h2><pre>{preview?.content}</pre><form method="dialog"><button>Close preview</button></form></dialog>
  </div>;
}
