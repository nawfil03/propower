import { useMemo } from 'react';
import RevealOnScroll from './RevealOnScroll';

const GOLD = '#c4903f';
const GOLD_LIGHT = '#e7c789';
const ELECTRIC = '#5fd4ff';

const WIDTH = 1400;
const HEIGHT = 460;
const ROWS = 9;

// Hand-shaped PCB-style traces (right-angle jogs, not fully random) so the
// pattern reads as a designed circuit rather than noise.
function useTraces() {
  return useMemo(() => {
    const traces = [];
    for (let i = 0; i < ROWS; i++) {
      const y = (HEIGHT / (ROWS + 1)) * (i + 1);
      const jogX = 180 + ((i * 137) % (WIDTH - 360));
      const jogDir = i % 2 === 0 ? 1 : -1;
      const jogY = y + jogDir * 46;
      const d = `M -40 ${y} L ${jogX - 60} ${y} L ${jogX} ${jogY} L ${jogX + 70} ${jogY} L ${jogX + 130} ${y} L ${WIDTH + 40} ${y}`;
      traces.push({
        d,
        key: i,
        color: i % 3 === 0 ? ELECTRIC : i % 3 === 1 ? GOLD : GOLD_LIGHT,
        duration: 3.2 + (i % 4) * 0.6,
        delay: (i * 0.35) % 2.5,
        nodes: [
          { x: -40, y },
          { x: jogX, y: jogY },
          { x: WIDTH + 40, y },
        ],
      });
    }
    return traces;
  }, []);
}

export default function LiveGridPulse() {
  const traces = useTraces();

  return (
    <section className="live-grid" aria-label="ProPower engineered grid, illustrative">
      <div className="live-grid-svg" aria-hidden="true">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          {traces.map((t) => (
            <g key={t.key}>
              <path d={t.d} stroke={t.color} strokeWidth="1.5" fill="none" opacity="0.18" />
              <path
                d={t.d}
                stroke={t.color}
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="10 340"
                className="live-grid-trace"
                style={{ animationDuration: `${t.duration}s`, animationDelay: `${t.delay}s` }}
              />
              {t.nodes.map((n, ni) => (
                <circle key={ni} cx={n.x} cy={n.y} r="4" fill={t.color} opacity="0.55" />
              ))}
            </g>
          ))}
        </svg>
      </div>
      <div className="live-grid-vignette" />
      <div className="container live-grid-content">
        <RevealOnScroll>
          <span className="eyebrow" style={{ background: 'rgba(196, 144, 63, 0.18)' }}>The Grid, Engineered</span>
          <h2 style={{ color: '#fff', margin: '20px 0' }}>Power that never stops moving</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '620px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.7 }}>
            From switchgear to substation, every system we deliver is engineered for continuous, reliable operation — designed, tested and maintained by one accountable team.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
