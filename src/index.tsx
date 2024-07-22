import { createRoot } from 'react-dom/client';

import { App } from './app';
import prepare from './bootstrap';

const container = document.getElementById('app-root')!;
const root = createRoot(container);

prepare().then(() => root.render(<App />));
