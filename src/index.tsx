import { createRoot } from 'react-dom/client';

import App from './ui/App';

const WINDOW_WIDTH = 500;
const WINDOW_HEIGHT = 570;

document.addEventListener('DOMContentLoaded', event => {
  const rootElement = document.getElementById('root');

  rootElement && createRoot(rootElement).render(<App />);

  const isBrowser = matchMedia('(display-mode: browser)').matches;

  if (!isBrowser) {
    window.resizeTo(WINDOW_WIDTH, WINDOW_HEIGHT);
    window.moveTo((screen.availWidth - WINDOW_WIDTH) / 2, (screen.availHeight - WINDOW_HEIGHT) / 2);
  }
});
