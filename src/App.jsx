import { Header, Hero, Services, Philosophy, Approach, Footer } from './components/Sections';

export default function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header />
    <main id="main"><Hero /><div className="divider" /><Services /><Philosophy /><Approach /></main><Footer /></>;
}
