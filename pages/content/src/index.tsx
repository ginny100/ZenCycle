import React from 'react';
import { createRoot } from 'react-dom/client';
import BlockView from './BlockView';

console.log('🎯 Content Script Loaded');

const overlay = document.createElement('div');
overlay.id = 'zen-block-overlay';
document.body.appendChild(overlay);

console.log('🎨 BlockView Overlay Created');

const root = createRoot(overlay);
root.render(<BlockView />);

console.log('✅ BlockView Mounted');