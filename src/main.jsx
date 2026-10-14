import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import site from './content/site.json';
import './styles.css';
import './infographics.css';

const root = document.getElementById('root');
if (root.querySelector('main')) hydrateRoot(root, <App />);
else {
  document.title = site.seo.title;
  createRoot(root).render(<App />);
}
