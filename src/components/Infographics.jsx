import site from '../content/site.json';

function Icon({ index = 0 }) {
  const paths = [
    <><rect x="4" y="5" width="24" height="22" rx="2" /><path d="M9 11h14M9 16h8M9 21h14" /></>,
    <><path d="M5 26V16M12 26V11M19 26V18M26 26V6M4 7l8-3 7 5 8-6" /></>,
    <><path d="m7 22-2 5 5-2L26 9l-5-5Z M18 7l7 7M5 29h23" /></>,
    <><path d="M5 13h7L26 6v20l-14-7H5Z M12 19l3 9H9l-3-9M29 12v8" /></>,
    <><rect x="4" y="5" width="24" height="18" rx="3" /><path d="m9 23-1 5 8-5M10 12h12M10 17h7" /></>,
    <><path d="m16 3 3 9 10 4-10 3-3 10-4-10-9-3 9-4Z" /></>,
  ];
  return <svg className="info-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index % paths.length]}</svg>;
}

export function ServiceInfographic() {
  const { visuals } = site;
  return <figure className="info-card ecosystem" aria-labelledby="ecosystem-title">
      <div className="info-heading"><p className="info-label">{visuals.ecosystem.label}</p><h3 id="ecosystem-title">{visuals.ecosystem.title}</h3></div>
      <div className="ecosystem-map">
        <svg className="ecosystem-lines" viewBox="0 0 1000 360" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M290 60H360Q400 60 420 100L500 180M290 180H710M290 300H360Q400 300 420 260L500 180M710 60H640Q600 60 580 100L500 180M710 300H640Q600 300 580 260L500 180" /></svg>
        <div className="ecosystem-centre"><div className="founder-orbit"><span>{visuals.ecosystem.centre}</span></div><p>{visuals.ecosystem.centreNote}</p></div>
        {site.services.items.map((item, index) => <div className={`ecosystem-node ecosystem-node-${index}`} key={item.id}><Icon index={index} /><span>{item.title}</span></div>)}
      </div>
      <figcaption>{visuals.ecosystem.caption}</figcaption>
    </figure>;
}

export function ReputationInfographic() {
  const { visuals } = site;
  return <figure className="info-card reputation-graphic" aria-labelledby="reputation-title">
        <div className="info-heading"><p className="info-label">{visuals.reputation.label}</p><h3 id="reputation-title">{visuals.reputation.title}</h3></div>
        <ol className="reputation-path">{visuals.reputation.steps.map((step, index) => <li key={step.title}><span className="step-marker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h4>{step.title}</h4><p>{step.description}</p></div></li>)}</ol>
        <figcaption>{visuals.reputation.caption}</figcaption>
      </figure>;
}

export function AudienceInfographic() {
  const { visuals } = site;
  return <figure className="info-card audience-graphic" aria-labelledby="audience-title">
        <div className="info-heading"><p className="info-label">{visuals.audience.label}</p><h3 id="audience-title">{visuals.audience.title}</h3></div>
        <div className="audience-map"><div className="audience-source"><Icon index={2} /><span>{visuals.audience.source}</span></div><div className="audience-bridge">{visuals.audience.bridge}</div>
          <ul className="audience-groups">{visuals.audience.groups.map(group => <li key={group.title}><span className="audience-dot" aria-hidden="true" /><h4>{group.title}</h4><p>{group.description}</p></li>)}</ul>
        </div><figcaption>{visuals.audience.caption}</figcaption>
      </figure>;
}
