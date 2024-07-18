import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';
import './index.css';

const rootElement = document.getElementById('root') as HTMLDivElement;

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  process.env.DEV ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  ),
);
