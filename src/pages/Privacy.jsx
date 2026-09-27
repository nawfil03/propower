import { ShieldCheck, LockKey, EnvelopeSimple, Eye, Database } from '@phosphor-icons/react';
import SectionHero from '../components/SectionHero';
import RevealOnScroll from '../components/RevealOnScroll';
import GlassCard from '../components/GlassCard';
import CTA from '../components/CTA';

export default function Privacy() {
  const lastUpdated = "September 7, 2026";

  return (
    <main id="main" style={{ paddingBottom: '140px' }}>
      <SectionHero
        eyebrow="Privacy & Data Governance"
        title={'PRIVACY\nPOLICY'}
        lead="How ProPower Engineering & Contracting L.L.C. protects, processes, and safeguards client and visitor information across the UAE & GCC."
        badgeLabel="Data Security"
        badgeValue="ISO Compliant"
        image="/assets/img/hero-legal.jpg"
        imageAlt="ProPower Privacy Policy"
      />

      <div className="container" style={{ marginTop: '60px', maxWidth: '1000px' }}>
        <RevealOnScroll>
          <div style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '24px',
            padding: 'clamp(24px, 4vw, 48px)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '40px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '24px', marginBottom: '32px' }}>
              <div>
                <span className="eyebrow" style={{ fontSize: '0.8rem' }}>Data Governance</span>
                <h2 style={{ fontSize: '1.8rem', margin: '4px 0 0', color: 'var(--text-main)' }}>ProPower Privacy Policy</h2>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
                Last Updated: {lastUpdated}
              </span>
            </div>

            <div style={{ display: 'grid', gap: '40px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              
              {/* Section 1: Overview & Scope */}
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(196, 144, 63, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={20} color="var(--accent-gold)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>1. Privacy Commitment</h3>
                </div>
                <p>
                  <strong>ProPower Engineering & Contracting L.L.C.</strong> is committed to upholding the privacy, confidentiality, and security of all personal and commercial data provided by clients, partners, contractors, and website visitors in accordance with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL) and international data safety best practices.
                </p>
              </section>

              {/* Section 2: Collection of Data */}
              <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(95, 212, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Database size={20} color="var(--accent-electric)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>2. Data Collection & Purpose</h3>
                </div>
                <p>
                  We collect information strictly necessary to provide engineering services, respond to technical inquiries, process project proposals, and maintain business communications:
                </p>
                <ul style={{ paddingLeft: '20px', display: 'grid', gap: '8px', marginTop: '12px' }}>
                  <li><strong>Contact Details:</strong> Full name, company name, professional email address, phone number, and project specifications provided via inquiry forms or email.</li>
                  <li><strong>Technical Inquiries:</strong> Substation, transmission, testing, commissioning, or maintenance details submitted to our engineering team.</li>
                  <li><strong>Technical Log Data:</strong> IP address, browser type, device information, and site interaction metrics for website performance optimization.</li>
                </ul>
              </section>

              {/* Section 3: Data Protection & Non-Disclosure */}
              <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(196, 144, 63, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LockKey size={20} color="var(--accent-gold)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>3. Data Protection & Non-Disclosure</h3>
                </div>
                <p>
                  ProPower Engineering & Contracting L.L.C. adheres to strict confidentiality standards aligned with our ISO 9001:2015 quality management procedures.
                </p>
                <ul style={{ paddingLeft: '20px', display: 'grid', gap: '8px', marginTop: '12px' }}>
                  <li><strong>No Selling of Data:</strong> We do not sell, lease, rent, or trade client or user data to third parties under any circumstances.</li>
                  <li><strong>Confidential Engineering Information:</strong> All client project drawings, substation layouts, and tender documentation are treated as strictly confidential commercial information.</li>
                  <li><strong>Authorized Disclosure:</strong> Information is disclosed only when required by UAE statutory regulations, court orders, or utility authority mandates (such as DEWA, SEWA, EtihadWE).</li>
                </ul>
              </section>

              {/* Section 4: Data Security Measures */}
              <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(95, 212, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Eye size={20} color="var(--accent-electric)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>4. Information Security</h3>
                </div>
                <p>
                  We implement robust technical and organizational security controls to protect your data against unauthorized access, loss, alteration, or misuse. Access to client information is restricted exclusively to authorized engineering and project management personnel.
                </p>
              </section>

              {/* Section 5: Contact Privacy Officer */}
              <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(196, 144, 63, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <EnvelopeSimple size={20} color="var(--accent-gold)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>5. Privacy Inquiries & Data Rights</h3>
                </div>
                <p>
                  If you wish to review, update, or request the deletion of any personal contact data stored by ProPower Engineering & Contracting L.L.C., please contact our privacy desk:
                </p>
                <GlassCard style={{ padding: '20px 24px', background: 'var(--bg-secondary)', borderRadius: '14px', marginTop: '16px' }}>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>ProPower Engineering & Contracting L.L.C. — Data Protection</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Email: <a href="mailto:info@propower.ae" style={{ color: 'var(--accent-gold-light)' }}>info@propower.ae</a> | Phone: <a href="tel:+971564040765" style={{ color: 'var(--accent-gold-light)' }}>+971 56 404 0765</a>
                    <br />United Arab Emirates
                  </p>
                </GlassCard>
              </section>

            </div>
          </div>
        </RevealOnScroll>
      </div>

      <CTA />
    </main>
  );
}
