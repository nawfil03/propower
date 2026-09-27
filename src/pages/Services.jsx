import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Lightning,
  Gauge,
  ShieldCheck,
  ChartLineUp,
  Thermometer,
  ClipboardText,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react';

import RevealOnScroll from '../components/RevealOnScroll';
import SectionHero from '../components/SectionHero';
import GlassCard from '../components/GlassCard';
import CTA from '../components/CTA';

const servicesList = [
  {
    id: 1,
    num: '01',
    title: 'EPC/Turnkey Contracting',
    category: 'Power & Utility',
    desc: 'Single-source execution managing your complete project lifecycle—from engineering and procurement to site construction, integration, and handover for utility(substation), Industries, Oil & Gas and infrastructure.',
    img: '/assets/img/hero-engineer.png',
    points: [
      'End-to-End Project Management',
      'Engineering, Procurement & Construction (EPC)',
      'Utility & Industrial Execution',
    ],
  },
  {
    id: 2,
    num: '02',
    title: 'Power, Utility & Energy Solutions',
    category: 'Power & Utility',
    desc: 'High-voltage transmission up to 220kV, grid substations, power transformer SITC, protection relays, and solar energy solutions.',
    img: '/assets/img/hero-3d.jpg',
    points: [
      'Power transmission & distribution up to 220kV',
      'Substations & power transformer commissioning',
      'Protection & control relay coordination',
    ],
  },
  {
    id: 3,
    num: '03',
    title: 'Data Center Solutions',
    category: 'Critical Infrastructure',
    desc: 'Mission-critical Tier III/IV power distribution, modular 2N UPS & battery banks, precision PDUs, and integrated load bank validation.',
    img: '/assets/img/services-datacenter.png',
    points: [
      'Critical power systems & 2N UPS redundancy',
      'Precision power distribution units (PDU)',
      'Remote telemetry & IST commissioning',
    ],
  },
  {
    id: 4,
    num: '04',
    title: 'Industrial Automation & Instrumentation',
    category: 'Industrial Automation',
    desc: 'Precision industrial field instrumentation, custom PLC/SCADA programming, and automated motor control centers (MCC).',
    img: '/assets/img/hero-infrastructure.png',
    points: [
      'Industrial instrumentation & transmitters',
      'PLC, SCADA & HMI logic engineering',
      'Motor control centers (MCC) & VFD panels',
    ],
  },
  {
    id: 5,
    num: '05',
    title: 'ELV & Communication Systems',
    category: 'Automation & ELV',
    desc: 'Enterprise structured fiber and copper cabling, high-definition IP CCTV surveillance, and integrated biometric access control.',
    img: '/assets/img/services-elv.jpg',
    points: [
      'Structured fiber optic & Cat6A cabling',
      'IP CCTV surveillance & security networks',
      'Biometric access control & smart ELV',
    ],
  },
  {
    id: 6,
    num: '06',
    title: 'Fire & Life Safety Systems',
    category: 'Life Safety',
    desc: 'Intelligent addressable fire alarm networks, VESDA high-sensitivity laser air sampling, and architectural central battery emergency lighting.',
    img: '/assets/img/hero-substation.png',
    points: [
      'Addressable fire alarm & detection systems',
      'VESDA early smoke detection systems',
      'Central battery emergency & exit lighting',
    ],
  },
  {
    id: 7,
    num: '07',
    title: 'Residential & Commercial Solutions',
    category: 'Commercial Fit-Out',
    desc: 'Turnkey electrical fit-outs for commercial towers, luxury residential villas, and architectural lighting & power factor control.',
    img: '/assets/img/about-team.png',
    points: [
      'Commercial high-rise electrical fit-outs',
      'Luxury residential villa electrification',
      'Architectural lighting & power factor filters',
    ],
  },
  {
    id: 8,
    num: '08',
    title: 'Retrofit, Testing & Maintenance',
    category: 'Testing & Diagnostics',
    desc: 'Omicron primary/secondary injection testing, live switchgear retrofitting up to 220kV, relay calibration, and 24/7 AMC emergency support.',
    img: '/assets/img/hero-wide.png',
    points: [
      'Omicron primary & secondary injection testing',
      'Switchgear modifications & retrofits to 220kV',
      '24/7 preventive & corrective maintenance (AMC)',
    ],
  },
  {
    id: 9,
    num: '09',
    title: 'Infrastructure & Specialized Solutions',
    category: 'Civil Infrastructure',
    desc: 'Major civil utility corridors, highway and bridge electrical networks, heavy cable pulling, and ETAP power system studies.',
    img: '/assets/img/infrastructure-solutions.jpg',
    points: [
      'Civil utility trenching & duct bank projects',
      'Heavy & high-voltage cable installation',
      'ETAP & CYME short-circuit & load flow studies',
    ],
  },
];

const filterCategories = [
  'All Disciplines (9)',
  'Power & Utility',
  'Critical Infrastructure',
  'Industrial Automation',
  'Civil Infrastructure',
];

const capabilities = [
  { icon: Lightning, label: 'Omicron CPC100 — Primary Injection Test Set' },
  { icon: Lightning, label: 'Omicron CMC356 — Secondary Injection Kit' },
  { icon: Gauge, label: 'Meggar Programma TM1800 — Breaker Analyzer' },
  { icon: ShieldCheck, label: 'Meggar — Insulation Resistance Tester' },
  { icon: ShieldCheck, label: 'Meggar — Hi-Pot Cable Tester' },
  { icon: ChartLineUp, label: 'Meggar DLRO — Micro-Ohm Meter' },
  { icon: Thermometer, label: 'Fluke 1760 — Power Quality Analyzer' },
  { icon: Thermometer, label: 'Fluke Ti400+ — Thermal Imager' },
  { icon: ClipboardText, label: 'Vanguard ATRT 03 — Transformer Turns Ratio' },
  { icon: Gauge, label: 'Dranetz — Power Quality Monitor' },
  { icon: ChartLineUp, label: 'ETAP / CYME — Load Flow & Short Circuit' },
];

function ServicesCompactGrid() {
  const [activeFilter, setActiveFilter] = useState('All Disciplines (9)');

  const filtered = activeFilter === 'All Disciplines (9)'
    ? servicesList
    : servicesList.filter((s) => s.category.includes(activeFilter) || activeFilter.includes(s.category));

  return (
    <div className="services-grid-wrapper">
      {/* Category Pills */}
      <div className="services-filter-row">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`services-filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3x3 Animated Compact Grid */}
      <motion.div layout className="services-compact-grid">
        <AnimatePresence>
          {filtered.map((service, index) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="service-compact-card"
            >
              {/* Image Banner */}
              <div className="service-card-media-box">
                <img src={service.img} alt={service.title} loading="lazy" />
                <div className="service-card-media-vignette" />
                <div className="service-card-header-pills">
                  <span className="service-card-num">{service.num}</span>
                  <span className="service-card-cat">{service.category}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="service-compact-body">
                <h3 className="service-compact-title">{service.title}</h3>
                <p className="service-compact-desc">{service.desc}</p>

                {/* Bullet Points */}
                <ul className="service-compact-points">
                  {service.points.map((pt) => (
                    <li key={pt}>
                      <CheckCircle size={15} weight="fill" color="#E5A93C" className="point-icon" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Action */}
                <div className="service-compact-footer">
                  <Link to="/contact" className="service-contact-link">
                    <span>Inquire for Scope</span>
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function Services() {
  return (
    <main id="main">
      <SectionHero
        eyebrow="Capabilities"
        title={'COMPREHENSIVE\nEPC SOLUTIONS'}
        lead="Nine integrated solution areas covering electrical contracting, power & utility infrastructure, data centers, automation, ELV, fire & life safety, and retrofit & maintenance — supply through commissioning, under one accountable scope."
        badgeLabel="Solutions Portfolio"
        badgeValue="9 Disciplines"
        image="/assets/img/hero-services.jpg"
        imageAlt="ProPower data center critical power installation"
      />

      <div className="container" style={{ paddingBottom: '90px' }}>
        <RevealOnScroll style={{ maxWidth: '780px', marginBottom: '32px', borderTop: '2px solid rgba(255,255,255,0.12)', paddingTop: '28px' }}>
          <span className="eyebrow">Portfolio Grid</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '12px', fontWeight: 700 }}>
            Nine Engineering Disciplines
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every discipline is engineered by our certified in-house teams under single-source EPC accountability.
          </p>
        </RevealOnScroll>

        <ServicesCompactGrid />
      </div>

      {/* In-house testing capability */}
      <div style={{ background: 'var(--bg-secondary)', padding: '120px 0' }}>
        <div className="container">
          <RevealOnScroll style={{ maxWidth: '640px', marginBottom: '56px' }}>
            <span className="eyebrow">In-House Capability</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', marginBottom: '20px' }}>
              Professional Testing &amp; Diagnostics
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Our own equipment and engineering studies mean fast, safe field commissioning with no third-party dependency.
            </p>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <RevealOnScroll delay={0.1}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {capabilities.map((cap) => (
                  <GlassCard
                    key={cap.label}
                    className="cap-card card-3d"
                    animateEntrance={false}
                  >
                    <cap.icon size={22} weight="duotone" color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.3 }}>{cap.label}</span>
                  </GlassCard>
                ))}
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                <img src="/assets/img/hero-substation.png" alt="ProPower field testing and commissioning" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      <CTA />
    </main>
  );
}
