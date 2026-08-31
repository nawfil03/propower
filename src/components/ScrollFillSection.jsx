import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollFillSection() {
  const containerRef = useRef(null);

  // Track scroll progress within this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress (0 to 1) into height percentage (0% to 100%)
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Transform background color to change as it fills (e.g., from light to a subtle dark or just keeping it minimalist)
  const bgColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#fbfbfd", "#f5f5f7", "#fbfbfd"]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ 
        height: '300vh', // Make it long so we have plenty of scroll distance to "fill" it
        position: 'relative',
        backgroundColor: bgColor
      }}
    >
      <div 
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow">Continuous Power</span>
          <h2 style={{ fontSize: '3rem', maxWidth: '800px', margin: '0 auto' }}>
            Powering infrastructure<br/>as you scale
          </h2>
        </div>

        {/* The "Glass" (Battery/Energy Core Outline) */}
        <div 
          style={{
            position: 'relative',
            width: '200px',
            height: '300px',
            border: '4px solid var(--text-main)',
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          {/* Battery Top Bump */}
          <div style={{
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '15px',
            backgroundColor: 'var(--text-main)',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
          }}></div>

          {/* The "Water" / Energy Fill */}
          <motion.div 
            style={{
              width: '100%',
              height: fillHeight,
              background: 'linear-gradient(180deg, var(--accent-gold) 0%, #e8b05c 100%)',
              boxShadow: '0 0 40px rgba(196, 144, 63, 0.5)',
              transformOrigin: 'bottom'
            }}
          />

          {/* Percentage Text inside the glass */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mixBlendMode: 'difference',
              color: '#fff',
              fontSize: '3rem',
              fontWeight: 700,
              fontFamily: 'var(--font-display)'
            }}
          >
            <motion.span>
              {useTransform(scrollYProgress, (val) => Math.round(val * 100) + "%")}
            </motion.span>
          </motion.div>
        </div>
        
        <p style={{ marginTop: '40px', maxWidth: '500px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Just as you scroll to fill this energy cell, ProPower brings relentless, on-demand power distribution to the region's most critical projects.
        </p>
      </div>
    </motion.section>
  );
}
