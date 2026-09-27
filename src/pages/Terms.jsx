import { ShieldCheck, Gavel, IdentificationCard, FileText, LockKey, EnvelopeSimple } from '@phosphor-icons/react';
import SectionHero from '../components/SectionHero';
import RevealOnScroll from '../components/RevealOnScroll';
import GlassCard from '../components/GlassCard';
import CTA from '../components/CTA';

export default function Terms() {
  const lastUpdated = "September 7, 2026";

  return (
    <main id="main" style={{ paddingBottom: '140px' }}>
      <SectionHero
        eyebrow="Legal & Compliance"
        title={'TERMS &\nCONDITIONS'}
        lead="Terms of use, legal notices, and copyright policies for ProPower Engineering & Contracting L.L.C. website and services across the UAE & GCC."
        badgeLabel="Legal Firm"
        badgeValue="ProPower L.L.C."
        image="/assets/img/hero-legal.jpg"
        imageAlt="ProPower Engineering legal terms"
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
                <span className="eyebrow" style={{ fontSize: '0.8rem' }}>Legal Agreement</span>
                <h2 style={{ fontSize: '1.8rem', margin: '4px 0 0', color: 'var(--text-main)' }}>ProPower Terms of Service</h2>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
                Last Updated: {lastUpdated}
              </span>
            </div>

            <div style={{ display: 'grid', gap: '40px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              
              {/* Section 1: Firm Identification & Scope */}
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(196, 144, 63, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IdentificationCard size={20} color="var(--accent-gold)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>1. Corporate Identification & Acceptance</h3>
                </div>
                <p>
                  This website (<strong>propower.ae</strong>) is operated and maintained by <strong>ProPower Engineering & Contracting L.L.C.</strong> ("ProPower", "Company", "We", "Us", or "Our"), a limited liability company registered in the United Arab Emirates.
                </p>
                <p>
                  By accessing or browsing this website, submitting an inquiry, or engaging with our engineering services, you ("User", "Client", or "Visitor") acknowledge that you have read, understood, and agreed to be legally bound by these Terms and Conditions. If you do not agree with any part of these terms, you must refrain from using this website.
                </p>
              </section>

              {/* Section 2: Intellectual Property & Copyright Notice */}
              <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(95, 212, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={20} color="var(--accent-electric)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>2. Copyright & Intellectual Property Protection</h3>
                </div>
                <p>
                  All content, technical schematics, architectural designs, logos, text, graphics, branding, interactive features, code, and media displayed on this website are the exclusive intellectual property of <strong>ProPower Engineering & Contracting L.L.C.</strong> and are protected under UAE Federal Law No. (38) of 2021 on Copyrights and Neighboring Rights as well as international copyright and intellectual property treaties.
                </p>
                <ul style={{ paddingLeft: '20px', display: 'grid', gap: '8px', marginTop: '12px' }}>
                  <li><strong>Copyright Notice:</strong> © {new Date().getFullYear()} ProPower Engineering & Contracting L.L.C. All rights reserved.</li>
                  <li><strong>Restrictions:</strong> No portion of this website or its underlying assets may be reproduced, modified, distributed, republished, framed, or transmitted in any form without explicit prior written authorization from ProPower Engineering & Contracting L.L.C.</li>
                  <li><strong>Trademarks:</strong> The ProPower name, logo, ISO certification designations, and brand collateral are registered trademarks of ProPower Engineering & Contracting L.L.C. Unauthorized use is strictly prohibited.</li>
                </ul>
              </section>

              {/* Section 3: Engineering Proposals & Quotations */}
              <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(196, 144, 63, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} color="var(--accent-gold)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>3. Engineering Proposals, Quotations & Scopes of Work</h3>
                </div>
                <p>
                  Information, engineering specifications, and project scope summaries published on this site are provided for informational and preliminary consultation purposes. 
                </p>
                <p>
                  Formal engineering contracting agreements, High Voltage / Extra High Voltage (HV/EHV) substation modifications, testing & commissioning scopes, and maintenance contracts are executed under dedicated written commercial agreements containing specific engineering specifications, timelines, and commercial terms signed by authorized signatories of ProPower Engineering & Contracting L.L.C.
                </p>
              </section>

              {/* Section 4: Limitation of Liability */}
              <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(95, 212, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LockKey size={20} color="var(--accent-electric)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>4. Website Usage & Limitation of Liability</h3>
                </div>
                <p>
                  While ProPower strives to ensure that all information on this website is accurate, complete, and up to date:
                </p>
                <ul style={{ paddingLeft: '20px', display: 'grid', gap: '8px', marginTop: '12px' }}>
                  <li>The website content is provided on an "as is" and "as available" basis without express or implied warranties of any kind.</li>
                  <li>ProPower Engineering & Contracting L.L.C. shall not be held liable for any direct, indirect, incidental, consequential, or special damages arising out of the use or inability to use this website or reliance upon any information contained herein.</li>
                  <li>Users are responsible for taking appropriate precautions against viruses, malware, or electronic security breaches when accessing digital media.</li>
                </ul>
              </section>

              {/* Section 5: Governing Law & Jurisdiction */}
              <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(196, 144, 63, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Gavel size={20} color="var(--accent-gold)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>5. Governing Law & Jurisdiction</h3>
                </div>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of the <strong>United Arab Emirates</strong> as applicable in the Emirate of Dubai.
                </p>
                <p>
                  Any dispute, controversy, or claim arising out of or in connection with the use of this website or these Terms shall be subject to the exclusive jurisdiction of the competent Courts of Dubai, United Arab Emirates.
                </p>
              </section>

              {/* Section 6: Legal Inquiries */}
              <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(95, 212, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <EnvelopeSimple size={20} color="var(--accent-electric)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>6. Legal & Compliance Inquiries</h3>
                </div>
                <p>
                  For any legal inquiries, copyright clearance requests, or compliance notices related to ProPower Engineering & Contracting L.L.C., please contact our headquarters:
                </p>
                <GlassCard style={{ padding: '20px 24px', background: 'var(--bg-secondary)', borderRadius: '14px', marginTop: '16px' }}>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>ProPower Engineering & Contracting L.L.C.</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Email: <a href="mailto:info@propower.ae" style={{ color: 'var(--accent-gold-light)' }}>info@propower.ae</a> | Phone: <a href="tel:+971564040765" style={{ color: 'var(--accent-gold-light)' }}>+971 56 404 0765</a> / <a href="tel:+97146657693" style={{ color: 'var(--accent-gold-light)' }}>+971 4 665 7693</a>
                    <br />United Arab Emirates & GCC Operations
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
