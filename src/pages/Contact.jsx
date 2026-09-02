import { useState } from 'react';
import { EnvelopeSimple, Phone, DeviceMobile, GlobeHemisphereEast, PaperPlaneTilt, CheckCircle } from '@phosphor-icons/react';

import RevealOnScroll from '../components/RevealOnScroll';
import SectionHero from '../components/SectionHero';
import GlassCard from '../components/GlassCard';
import MagneticButton from '../components/MagneticButton';

const contactMethods = [
  { icon: EnvelopeSimple, label: 'Email', value: 'info@propower.ae', href: 'mailto:info@propower.ae' },
  { icon: DeviceMobile, label: 'Mobile', value: '+971 56 404 0765', href: 'tel:+971564040765' },
  { icon: Phone, label: 'Landline', value: '+971 4 665 7693', href: 'tel:+97146657693' },
];

function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry — ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:info@propower.ae?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const fieldStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '14px',
    padding: '16px 18px',
    fontSize: '1rem',
    color: 'var(--text-main)',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.25s ease, background 0.25s ease',
  };

  return (
    <GlassCard
      className="card card-3d card-3d-dark"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '28px', padding: 'clamp(32px, 4vw, 56px)' }}
    >
      <span className="eyebrow">Project Inquiry</span>
      <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', margin: '20px 0 8px' }}>
        Tell Us About Your Requirement
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '36px' }}>
        Share a few details and this form opens a pre-filled email to our engineering team — no forms lost in a queue.
      </p>

      {sent ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '24px', background: 'rgba(196, 144, 63, 0.1)', border: '1px solid rgba(196, 144, 63, 0.25)', borderRadius: '16px' }}>
          <CheckCircle size={28} weight="fill" color="var(--accent-gold)" style={{ flexShrink: 0 }} />
          <span style={{ color: 'var(--text-main)', fontSize: '1rem' }}>
            Your email client should now be open with this message ready to send. If it didn't launch, email us directly at{' '}
            <a href="mailto:info@propower.ae" style={{ color: 'var(--accent-gold-light)', textDecoration: 'underline' }}>info@propower.ae</a>.
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Full Name *</label>
              <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} style={fieldStyle} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="company" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Company</label>
              <input id="company" name="company" type="text" value={form.company} onChange={handleChange} style={fieldStyle} placeholder="Organization" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Email *</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} style={fieldStyle} placeholder="you@company.com" />
            </div>
            <div>
              <label htmlFor="phone" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Phone</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} style={fieldStyle} placeholder="+971" />
            </div>
          </div>
          <div>
            <label htmlFor="message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Project Details *</label>
            <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} style={{ ...fieldStyle, resize: 'vertical', minHeight: '120px' }} placeholder="Tell us about your substation, transmission, data center or maintenance requirement..." />
          </div>
          <MagneticButton
            type="submit"
            className="btn btn-primary has-custom-cursor"
            style={{ fontSize: '1rem', padding: '16px 36px', border: 'none', justifySelf: 'flex-start' }}
          >
            Send Inquiry <PaperPlaneTilt size={18} weight="bold" />
          </MagneticButton>
        </form>
      )}
    </GlassCard>
  );
}

export default function Contact() {
  return (
    <main id="main" style={{ paddingBottom: '160px' }}>
      <SectionHero
        eyebrow="Get In Touch"
        title={'START A\nPROJECT'}
        lead="Tell us about your substation, transmission, data center or maintenance requirement — our engineering team responds directly, no call center."
        badgeLabel="Direct Engineering Contact"
        badgeValue="UAE Based"
        image="/assets/img/hero-wide.png"
        imageAlt="ProPower project site"
      />

      <div className="container">
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '40px', alignItems: 'start' }}>
          <RevealOnScroll variant="fadeRight">
            <ContactForm />
          </RevealOnScroll>

          <RevealOnScroll variant="fadeLeft" delay={0.15} style={{ display: 'grid', gap: '20px' }}>
            {contactMethods.map((m) => (
              <a key={m.label} href={m.href} className="has-custom-cursor" style={{ display: 'block' }}>
                <GlassCard
                  className="card card-3d card-3d-dark"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '28px 30px', display: 'flex', alignItems: 'center', gap: '18px' }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(196, 144, 63, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <m.icon size={22} weight="duotone" color="var(--accent-gold-light)" />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{m.label}</span>
                    <span style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)' }}>{m.value}</span>
                  </div>
                </GlassCard>
              </a>
            ))}

            <GlassCard
              className="card card-3d card-3d-dark"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '28px 30px', display: 'flex', alignItems: 'center', gap: '18px' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(95, 212, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <GlobeHemisphereEast size={22} weight="duotone" color="var(--accent-electric)" />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Coverage</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)' }}>UAE &amp; GCC</span>
              </div>
            </GlassCard>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
