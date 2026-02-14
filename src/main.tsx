import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
// Using a simple cast to avoid TS issues with React 19 / HelmetProvider compatibility if they arise
const HelmetProviderAny = HelmetProvider as any;

root.render(
  <React.StrictMode>
    <HelmetProviderAny>
      <App />
    </HelmetProviderAny>
  </React.StrictMode>
);
