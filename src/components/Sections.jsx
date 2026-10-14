import site from '../content/site.json';
import { trackContact } from '../lib/analytics';
import { AudienceInfographic, ServiceInfographic, ReputationInfographic } from './Infographics';

export function Header() {
  return <header><div className="wrap"><nav aria-label="Main navigation">
    <a className="wordmark" href="#main" aria-label={site.brand.name}>{site.brand.wordmark}<em>.</em>{site.brand.wordmarkSuffix}</a>
    <div className="navlinks">{site.navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
    <a className="nav-cta" href="#contact">{site.contact.navCta}</a>
  </nav></div></header>;
}

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title"><div className="wrap hero-grid"><div className="hero-copy">
    <p className="kicker">{site.hero.kicker}</p>
    <h1 id="hero-title">{site.hero.headline}<i>{site.hero.emphasis}</i></h1>
    <div className="hero-foot"><p className="hero-sub">{site.hero.description}</p><a className="hero-cta" href="#contact">{site.hero.cta}</a></div>
  </div><AudienceInfographic /></div></section>;
}

export function Services() {
  return <section className="services" id="services" aria-labelledby="services-title"><div className="wrap">
    <div className="section-head"><h2 className="section-title" id="services-title">{site.services.title}</h2><p className="section-note">{site.services.note}</p></div>
    <ServiceInfographic />
    {site.services.items.map(service => <article className="service-row" key={service.id}>
      <h3 className="service-name"><span className="mark" aria-hidden="true">—</span>{service.title}</h3>
      <p className="service-desc">{service.description}</p>
    </article>)}
  </div></section>;
}

export function Philosophy() {
  return <section className="philosophy" id="philosophy" aria-labelledby="philosophy-title"><div className="wrap phil-grid">
    <div className="philosophy-copy"><h2 className="phil-label" id="philosophy-title">{site.philosophy.label}</h2><p className="phil-quote">{site.philosophy.quote}</p></div>
    <ReputationInfographic />
  </div></section>;
}

export function Approach() {
  return <section className="approach" aria-label="Our approach"><div className="wrap approach-grid">
    {site.approach.map(item => <div className="approach-item" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}
  </div></section>;
}

export function Footer() {
  return <footer id="contact"><div className="wrap contact">
    <h2>{site.contact.headline}<i>{site.contact.emphasis}</i>{site.contact.ending}</h2>
    <div className="contact-row">
      <a className="contact-email" href={`mailto:${site.contact.email}`} onClick={() => trackContact('email')}>{site.contact.email}</a>
      <a className="contact-email" href={`tel:${site.contact.phoneHref}`} onClick={() => trackContact('phone')}>{site.contact.phone}</a>
      <span className="contact-meta">{site.contact.response}</span>
    </div>
    <div className="foot-bottom"><span>{site.brand.name}</span><span>{site.contact.category}</span></div>
  </div></footer>;
}
