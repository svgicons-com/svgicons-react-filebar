"""Translate acquired SVG geometry to static JSX; does not export from SVGicons."""
from pathlib import Path
import xml.etree.ElementTree as ET
import json, hashlib
root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'icon-sources.json').read_text())
def jsx(element):
    tag = element.tag.split('}')[-1]
    assert tag in ['g', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse']
    attributes = []
    for key, value in element.attrib.items():
        assert key in ['fill','stroke','stroke-linecap','stroke-linejoin','stroke-width','d','cx','cy','r','x','y','width','height','points','x1','x2','y1','y2','rx','ry']
        name = key.split('-')[0] + ''.join(part.title() for part in key.split('-')[1:])
        attributes.append(name + '=' + json.dumps(value))
    return '<' + tag + ' ' + ' '.join(attributes) + '>' + ''.join(jsx(child) for child in element) + '</' + tag + '>'
lines = ['// Local React adaptation, NOT a SVGicons collection export. See icon-sources.json.',
         'import type { ReactNode } from "react";', 'export const shapes = {']
for icon in manifest['icons']:
    svg = ET.fromstring((root / icon['file']).read_bytes())
    lines.append('  ' + json.dumps(icon['name']) + ': <>' + ''.join(jsx(child) for child in svg) + '</>,')
lines += ['} satisfies Record<string, ReactNode>;', 'export type IconName = keyof typeof shapes;',
          'export function Icon({ name, size = 24 }: { name: IconName; size?: 20 | 24 }) {',
          '  return <svg className="icon" data-icon={name} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">{shapes[name]}</svg>;', '}']
(root / 'src/icons.tsx').write_text('\n'.join(lines) + '\n', encoding='utf-8')
manifest['reactWrapper'] = {'file': 'src/icons.tsx', 'sha256': hashlib.sha256((root / 'src/icons.tsx').read_bytes()).hexdigest(),
    'changes': ['Root dimensions 800 replaced by size prop 20 or 24', 'Attribute names translated to JSX', 'Geometry and paint preserved', 'Decorative aria-hidden and focusable=false added; control labels live in app']}
(root / 'icon-sources.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print('Six shapes adapted to static JSX; original SVG bytes unchanged.')
