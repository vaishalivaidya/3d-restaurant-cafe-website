import React, { useState } from 'react';
import { Flame, Sparkles, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { Pizza3D } from './3d/Pizza3D';
import { useCart } from '../lib/cartContext';
import { MENU_ITEMS } from '../lib/menu';

interface PizzaStageInfo {
  stage: number;
  name: string;
  shortDesc: string;
  culinaryFact: string;
  temp: string;
}

const PIZZA_STAGES: PizzaStageInfo[] = [
  {
    stage: 1,
    name: 'Dough Ball Fermentation',
    shortDesc: '72-hour cold-fermented mother dough made with Italian Tipo 00 flour and mountain spring water.',
    culinaryFact: 'Slow fermentation produces complex aromatic esters and ensures a light, easily digestible airy crust.',
    temp: '42°F Proofer',
  },
  {
    stage: 2,
    name: 'Hand Stretching & Shaping',
    shortDesc: 'Gently hand-stretched from center outward, pushing air pockets into the outer cornicione rim.',
    culinaryFact: 'No rolling pins allowed—hand-slapping preserves the delicate micro-alveoli trapped within the gluten mesh.',
    temp: 'Ambient Room Temp',
  },
  {
    stage: 3,
    name: 'San Marzano Sauce Spiral',
    shortDesc: 'A swirl of crushed San Marzano D.O.P. tomatoes harvested from volcanic soil near Mount Vesuvius.',
    culinaryFact: 'Seasoned only with sea salt and cold-pressed extra virgin olive oil to let natural sweetness shine.',
    temp: 'Cold Puree',
  },
  {
    stage: 4,
    name: 'Artisanal Mozzarella Spread',
    shortDesc: 'Hand-torn shreds of fresh fiore di latte and whole milk mozzarella distributed evenly.',
    culinaryFact: 'Drained for 4 hours prior to baking to avoid unwanted moisture pooling on the delicate base.',
    temp: 'Freshly Drained',
  },
  {
    stage: 5,
    name: 'Cured Pepperoni & Sweet Basil',
    shortDesc: 'Natural-casing cup-and-char pepperoni discs and fresh Genovese sweet basil leaves.',
    culinaryFact: 'The collagen casings cause pepperoni edges to cup and crisp under heat, capturing savory spiced oil.',
    temp: 'Room Temp Cured',
  },
  {
    stage: 6,
    name: 'Sliding Into 900°F Hearth',
    shortDesc: 'Transferred via perforated wooden peel onto the volcanic biscotto floor of our roaring wood-fired oven.',
    culinaryFact: 'Fueled exclusively by cured oak and cherrywood logs, generating an intense dry thermal convection.',
    temp: '880°F - 920°F Hearth',
  },
  {
    stage: 7,
    name: 'Volcanic Melting & Blistering',
    shortDesc: 'The intense heat causes the cheese to bubble rapidly and the outer crust to rise into blistered pillows.',
    culinaryFact: 'The hallmark of true Neapolitan pizza is "leopard spotting"—dark charred micro-bubbles that add smoky depth.',
    temp: '915°F Internal Dome',
  },
  {
    stage: 8,
    name: 'Emerging from the Flames',
    shortDesc: 'Removed after precisely 75 seconds with a crispy outer shell, blistered crust, and golden sheen.',
    culinaryFact: 'A gentle swirl of Sicilian extra virgin olive oil is applied immediately upon leaving the hearth.',
    temp: 'Fresh from Fire',
  },
  {
    stage: 9,
    name: 'Precision Slicing & Cheese Pull',
    shortDesc: 'Cut into 6 symmetrical triangular slices, displaying elastic molten mozzarella stretch and aromatic steam.',
    culinaryFact: 'Best enjoyed within 3 minutes of slicing while the crust maintains its quintessential crackle and chew.',
    temp: 'Plated at 180°F',
  },
];

export const PizzaExperience: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const { addItem } = useCart();

  // Timer loop for auto play
  React.useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStage((prev) => (prev % 9) + 1);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const stageInfo = PIZZA_STAGES[currentStage - 1];

  const handleOrderPepperoni = () => {
    const item = MENU_ITEMS.find((i) => i.id === 'p-pepperoni') || MENU_ITEMS[4];
    addItem(item, 1);
  };

  return (
    <section
      id="pizza"
      style={{
        paddingTop: '100px',
        paddingBottom: '110px',
        backgroundColor: 'var(--bg-canvas)',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-kicker">Wood-Fired Alchemy</span>
          <h2 className="section-title">Handcrafted Pizza Experience</h2>
          <p className="section-subtitle">
            From ancient 72-hour naturally leavened dough to 900°F wood-fired blistered perfection.
            Witness every stage of our Neapolitan craftsmanship in real-time 3D.
          </p>
        </div>

        {/* 9-Stage Progress Dots / Scrubber */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          {PIZZA_STAGES.map((s) => {
            const isActive = s.stage === currentStage;
            return (
              <button
                key={s.stage}
                onClick={() => {
                  setCurrentStage(s.stage);
                  setIsPlaying(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: isActive ? 'var(--accent-ember)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  fontWeight: 600,
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span className="tabular-nums">0{s.stage}</span>
                <span className="hidden md:inline">{s.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '40px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(24px, 4vw, 48px)',
            boxShadow: 'var(--shadow-medium)',
          }}
        >
          {/* 3D Canvas Box */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(400px, 50vh, 540px)',
              background: 'radial-gradient(circle at center, #26160e 0%, #0e0a07 80%)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Interactive 3D Pizza Canvas */}
            <Pizza3D currentStage={currentStage} interactive={true} />

            {/* Stage Temperature Badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(15, 12, 10, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-subtle)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Flame size={14} color="var(--accent-ember)" />
              <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
                {stageInfo.temp}
              </span>
            </div>

            {/* Play/Pause & Stage Stepper */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(15, 12, 10, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-subtle)',
                padding: '8px 16px',
                borderRadius: '8px',
              }}
            >
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent-gold)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Pause' : 'Auto Play Journey'}</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => {
                    setCurrentStage((prev) => (prev > 1 ? prev - 1 : 9));
                    setIsPlaying(false);
                  }}
                  className="btn-ghost"
                  style={{ padding: '4px 8px' }}
                  aria-label="Previous pizza stage"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="tabular-nums" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Stage {currentStage} / 9
                </span>
                <button
                  onClick={() => {
                    setCurrentStage((prev) => (prev < 9 ? prev + 1 : 1));
                    setIsPlaying(false);
                  }}
                  className="btn-ghost"
                  style={{ padding: '4px 8px' }}
                  aria-label="Next pizza stage"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Narrative Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-accent)',
                color: 'var(--accent-gold)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Stage 0{stageInfo.stage} of 09 · Wood-Fired Sequence
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3vw, 36px)',
                lineHeight: 1.2,
                color: 'var(--text-primary)',
              }}
            >
              {stageInfo.name}
            </h3>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              {stageInfo.shortDesc}
            </p>

            {/* Culinary Master Fact */}
            <div
              style={{
                background: 'rgba(230, 126, 34, 0.08)',
                borderLeft: '3px solid var(--accent-ember)',
                padding: '16px 20px',
                borderRadius: '0 8px 8px 0',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--accent-gold)',
                  marginBottom: '4px',
                }}
              >
                Pizzaiolo Master Secret
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {stageInfo.culinaryFact}
              </p>
            </div>

            {/* Action */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={handleOrderPepperoni} className="btn-primary">
                <Sparkles size={16} />
                <span>Order Artisan Pepperoni ($19.50)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
