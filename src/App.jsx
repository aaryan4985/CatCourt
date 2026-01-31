import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Star, Shapes, Cloud, Send, Smile, Frown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import confetti from 'canvas-confetti';

const cn = (...inputs) => twMerge(clsx(inputs));

// Helper for scroll
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Button = ({ children, className, variant = 'primary', onClick, disabled }) => {
  const baseStyles = "relative px-8 py-4 font-display text-2xl uppercase tracking-wider border-4 border-black transition-all active:translate-x-1 active:translate-y-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000] shadow-[5px_5px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-pop-pink text-white hover:bg-pop-purple",
    secondary: "bg-pop-cyan text-black hover:bg-white",
    outline: "bg-white text-black hover:bg-pop-yellow",
    judge: "bg-black text-pop-red hover:bg-zinc-800 border-pop-red shadow-[5px_5px_0px_#ff0000]"
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05, rotate: Math.random() * 4 - 2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

const NavBar = ({ onChaos, onPlay, onCreate }) => (
  <nav className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
    <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white border-4 border-black p-2 rotate-[-3deg] shadow-[5px_5px_0px_#000] cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="font-display text-4xl text-pop-red drop-shadow-sm">Pop!</span>
        <span className="font-display text-4xl text-pop-purple">Playground</span>
      </motion.div>

      <div className="flex gap-4">
        <motion.button
          onClick={onPlay}
          whileHover={{ scale: 1.1, rotate: -3 }}
          className="font-comic font-bold text-xl px-4 py-2 border-3 border-black bg-pop-cyan text-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000]"
        >
          Play
        </motion.button>
        <motion.button
          onClick={onCreate}
          whileHover={{ scale: 1.1, rotate: 2 }}
          className="font-comic font-bold text-xl px-4 py-2 border-3 border-black bg-pop-green text-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000]"
        >
          Create
        </motion.button>
        <motion.button
          onClick={onChaos}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="font-comic font-bold text-xl px-4 py-2 border-3 border-black bg-pop-pink text-white shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000]"
        >
          CHAOS
        </motion.button>
      </div>
    </div>
  </nav>
);

const Sticker = ({ children, x, y, rotate, delay = 0 }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{ scale: 1, rotate }}
    transition={{ type: "spring", bounce: 0.6, delay }}
    className="absolute z-0 pointer-events-none"
    style={{ left: x, top: y }}
  >
    {children}
  </motion.div>
);

const Hero = ({ onStart, onRandomize }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Chaos */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="black" strokeWidth="0.5" />
          <path d="M0,60 Q25,80 50,60 T100,60" fill="none" stroke="black" strokeWidth="0.5" />
        </svg>
      </div>

      <Sticker x="10%" y="20%" rotate={-10} delay={0.2}>
        <Star size={64} className="text-pop-cyan fill-pop-cyan animate-spin-slow duration-75" />
      </Sticker>
      <Sticker x="80%" y="15%" rotate={15} delay={0.4}>
        <div className="w-24 h-24 bg-pop-purple rounded-full border-4 border-black flex items-center justify-center shadow-[5px_5px_0px_#000]">
          <Zap className="text-pop-yellow w-12 h-12" />
        </div>
      </Sticker>
      <Sticker x="75%" y="70%" rotate={-5} delay={0.6}>
        <div className="w-32 h-16 bg-pop-green border-4 border-black skew-x-12 shadow-[5px_5px_0px_#000]"></div>
      </Sticker>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative z-10 text-center max-w-5xl"
      >
        <h1 className="text-[8rem] leading-[0.9] font-display text-stroke-lg text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] mix-blend-hard-light relative">
          <span className="block text-pop-pink -rotate-2 inline-block">UNLEASH</span>
          <br />
          <span className="block text-pop-green rotate-2 inline-block">THE</span>
          <span className="block text-pop-cyan -rotate-1 inline-block">CHAOS!</span>
        </h1>

        <motion.p
          className="mt-8 text-2xl font-comic font-bold bg-white inline-block px-6 py-3 border-3 border-black mx-auto rotate-1 shadow-[5px_5px_0px_#000] max-w-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          No rules. No grids. Just pure creative freedom. <br />
          Welcome to the digital playground of your dreams!
        </motion.p>

        <div className="mt-12 flex gap-6 justify-center">
          <Button className="-rotate-3" onClick={onStart}>Start Playing</Button>
          <Button variant="secondary" className="rotate-2" onClick={onRandomize}>Randomize</Button>
        </div>
      </motion.div>
    </section>
  );
};

const FeatureCard = ({ title, icon: Icon, color, rotate, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 0 }}
    className={`
            relative p-6 border-4 border-black bg-white shadow-[8px_8px_0px_#000]
            flex flex-col items-center text-center
            ${rotate} w-full md:w-80 h-96 justify-between
        `}
  >
    <div className={`absolute -top-6 -right-6 w-16 h-16 ${color} border-4 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_#000]`}>
      <Icon className="w-8 h-8 text-black" />
    </div>

    <div className="w-full h-40 bg-black overflow-hidden border-2 border-black mb-4 relative group cursor-pointer" onClick={onClick}>
      {/* Abstract pattern inside card image */}
      <div className={`absolute inset-0 ${color} opacity-20`}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon size={64} className="text-black group-hover:animate-bounce" />
      </div>
    </div>

    <h3 className="font-display text-4xl text-black mb-2">{title}</h3>
    <p className="font-comic font-semibold text-lg leading-tight">
      Click the icon to explode {title.toLowerCase()} on screen!
    </p>

    <button
      onClick={onClick}
      className="mt-4 font-display text-xl uppercase border-b-4 border-black hover:border-pop-pink hover:text-pop-pink transition-colors"
    >
      GO -&gt;
    </button>
  </motion.div>
);

const Features = ({ onAddSticker }) => (
  <section id="features" className="py-20 px-4 bg-pop-purple border-y-4 border-black relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>

    <div className="max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="font-display text-7xl text-white text-stroke drop-shadow-[5px_5px_0px_#000] inline-block -rotate-2">
          PICK YOUR TOY
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-16 pt-10">
        <FeatureCard
          title="SQUIGGLES"
          icon={Shapes}
          color="bg-pop-yellow"
          rotate="rotate-2"
          onClick={() => onAddSticker('squiggles')}
        />
        <FeatureCard
          title="SPLATTER"
          icon={Cloud}
          color="bg-pop-pink"
          rotate="-rotate-3"
          onClick={() => onAddSticker('splatter')}
        />
        <FeatureCard
          title="SPARKLE"
          icon={Sparkles}
          color="bg-pop-green"
          rotate="rotate-1"
          onClick={() => onAddSticker('sparkle')}
        />
      </div>
    </div>
  </section>
);

const Marquee = () => (
  <div className="bg-pop-red border-y-4 border-black py-4 overflow-hidden whitespace-nowrap -rotate-1 origin-center shadow-[0_0_20px_rgba(0,0,0,0.2)] z-10 relative">
    <motion.div
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      className="inline-block font-display text-5xl text-white"
    >
      {Array(10).fill("• CAT COURT • CONFESS YOUR SINS • GET JUDGED ").map((text, i) => (
        <span key={i} className="mx-4">{text}</span>
      ))}
    </motion.div>
  </div>
);

// --- NEW COMPONENT: CatCourt ---

const CatCourt = () => {
  const [confession, setConfession] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleJudge = async () => {
    if (!confession.trim()) return;
    setLoading(true);
    setResult(null);

    // Fire confetti on judge start
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff0000', '#000000']
    });

    try {
      const response = await fetch('http://localhost:3000/api/catcourt/judge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: confession }),
      });

      const data = await response.json();
      setResult(data);

      // Fire more confetti on success
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#39ff14', '#ffff00', '#ff00ff']
      });

    } catch (error) {
      console.error("Error fetching judgement:", error);
      alert("The cats are sleeping. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cat-court" className="py-24 px-4 bg-pop-cyan border-b-4 border-black relative min-h-[800px] flex flex-col items-center">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 3px, transparent 3px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-4xl w-full z-10 flex flex-col items-center">
        <h2 className="font-display text-8xl text-black text-stroke text-center mb-8 rotate-1">
          CAT COURT
        </h2>
        <p className="font-comic text-2xl font-bold bg-white border-3 border-black p-4 rotate-[-1deg] shadow-[5px_5px_0px_#000] mb-12 max-w-2xl text-center">
          Confess your sins. Receive judgement. Get therapy.
          <br />(All via cats, obviously)
        </p>

        <div className="w-full relative mb-12">
          <textarea
            value={confession}
            onChange={(e) => setConfession(e.target.value)}
            placeholder="I skipped leg day to eat pizza..."
            className="w-full h-40 p-6 font-comic text-3xl border-4 border-black shadow-[8px_8px_0px_#000] focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all resize-none rotate-1 bg-white"
          />
          <div className="flex justify-center -mt-8 relative z-20">
            <Button
              variant="judge"
              className="rotate-[-2deg] scale-125"
              onClick={handleJudge}
              disabled={loading}
            >
              {loading ? "JUDGING..." : "JUDGE ME!"}
            </Button>
          </div>
        </div>

        {/* Results Area */}
        <div className="grid md:grid-cols-2 gap-12 w-full">
          <AnimatePresence>
            {result && (
              <>
                {/* JUDGEMENT CARD */}
                <motion.div
                  initial={{ x: -100, opacity: 0, rotate: -10 }}
                  animate={{ x: 0, opacity: 1, rotate: -2 }}
                  className="bg-black p-6 border-4 border-pop-red shadow-[8px_8px_0px_#ff0000]"
                >
                  <div className="flex justify-between items-center mb-4 text-pop-red">
                    <Frown size={48} />
                    <h3 className="font-display text-4xl uppercase">GUILTY!</h3>
                  </div>
                  <div className="aspect-square bg-zinc-800 border-2 border-pop-red mb-4 overflow-hidden relative">
                    <img src={result.judgement.imageUrl} alt="Judging Cat" className="object-cover w-full h-full grayscale contrast-125" />
                    <div className="absolute inset-0 bg-red-500 mix-blend-overlay opacity-50"></div>
                  </div>
                  <p className="font-display text-2xl text-white leading-tight">
                    "{result.judgement.verdict}"
                  </p>
                </motion.div>

                {/* THERAPY CARD */}
                <motion.div
                  initial={{ x: 100, opacity: 0, rotate: 10 }}
                  animate={{ x: 0, opacity: 1, rotate: 2 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white p-6 border-4 border-pop-green shadow-[8px_8px_0px_#39ff14]"
                >
                  <div className="flex justify-between items-center mb-4 text-pop-green">
                    <Smile size={48} />
                    <h3 className="font-display text-4xl uppercase">THERAPY</h3>
                  </div>
                  <div className="aspect-square bg-pop-green/20 border-2 border-pop-green mb-4 overflow-hidden relative">
                    <img src={result.therapy.imageUrl} alt="Therapy Cat" className="object-cover w-full h-full hover:scale-110 transition-transform duration-700" />
                  </div>
                  <p className="font-comic text-xl font-bold text-black leading-tight">
                    "{result.therapy.message}"
                  </p>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};


const Footer = () => (
  <footer className="bg-black text-white pt-20 pb-10 px-4 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-4 bg-pop-cyan"></div>
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <h2 className="font-display text-[10rem] leading-none text-pop-yellow mix-blend-exclusion opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
        GAME OVER
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="text-left font-comic text-2xl">
          <p className="mb-2 text-pop-pink">Pop Playground Inc.</p>
          <p>123 Wonky Street<br />Chaos City, CC 99999</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full animate-bounce cursor-pointer hover:rotate-180 transition-transform" onClick={() => confetti()}></div>
          <div className="w-16 h-16 bg-pop-green rounded-none animate-spin-slow cursor-pointer hover:scale-150 transition-transform"></div>
          <div className="w-16 h-16 bg-pop-cyan rounded-full border-4 border-white animate-wiggle cursor-pointer hover:skew-x-12 transition-transform"></div>
        </div>
        <div className="text-right font-display text-3xl uppercase">
          <a href="#" className="block hover:text-pop-yellow hover:underline decoration-wavy" onClick={(e) => { e.preventDefault(); alert('Instagram is too boring for this site.'); }}>Instagram</a>
          <a href="#" className="block hover:text-pop-yellow hover:underline decoration-wavy" onClick={(e) => { e.preventDefault(); alert('We are already viral.'); }}>TikTok</a>
          <a href="#" className="block hover:text-pop-yellow hover:underline decoration-wavy" onClick={(e) => { e.preventDefault(); alert('No one uses this anymore.'); }}>Twitter</a>
        </div>
      </div>

      <p className="font-comic text-zinc-500">© 2024 Pop Playground. Steal this design, we dare you.</p>
    </div>
  </footer>
);

export default function App() {
  const [stickers, setStickers] = useState([]);
  const [themeIndex, setThemeIndex] = useState(0);

  const gradients = [
    'radial-gradient(#000 2px, transparent 2px)',
    'radial-gradient(#ff00ff 2px, transparent 2px)',
    'radial-gradient(#0000ff 2px, transparent 2px)'
  ];

  const bgColors = [
    'var(--color-pop-yellow)',
    'var(--color-pop-cyan)',
    'var(--color-pop-green)'
  ];

  const handleRandomize = () => {
    setThemeIndex((prev) => (prev + 1) % bgColors.length);
    confetti({ spread: 360, ticks: 50, gravity: 0, decay: 0.94, startVelocity: 30, shapes: ['star'], colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FD9A9A'] });
  };

  const handleChaos = () => {
    const end = Date.now() + 2 * 1000;
    const colors = ['#bb0000', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleAddSticker = (type) => {
    const id = Math.random().toString(36).substr(2, 9);
    const x = Math.random() * 80 + 10; // Keep within 10-90%
    const y = Math.random() * 80 + 10;
    const rotate = Math.random() * 360;

    setStickers([...stickers, { id, type, x, y, rotate }]);

    // Auto remove after 5s to prevent DOM overload
    setTimeout(() => {
      setStickers(prev => prev.filter(s => s.id !== id));
    }, 5000);

    confetti({ particleCount: 20, spread: 30, origin: { x: x / 100, y: y / 100 } });
  };

  useEffect(() => {
    document.body.style.backgroundColor = bgColors[themeIndex];
    document.body.style.backgroundImage = `${gradients[themeIndex]}, ${gradients[themeIndex]}`;
  }, [themeIndex]);

  return (
    <div className="min-h-screen">
      <NavBar
        onPlay={() => scrollToSection('cat-court')}
        onCreate={() => scrollToSection('features')}
        onChaos={handleChaos}
      />
      <Marquee />
      <Hero
        onStart={() => scrollToSection('cat-court')}
        onRandomize={handleRandomize}
      />

      <CatCourt />

      <Features onAddSticker={handleAddSticker} />

      <div className="h-40 bg-pop-cyan flex justify-center items-center font-display text-6xl border-y-4 border-black">
        <span className="animate-pulse">MORE CHAOS BELOW</span>
      </div>
      <Footer />

      {/* Background Stickers Layer */}
      {stickers.map(s => (
        <motion.div
          key={s.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{ position: 'fixed', left: `${s.x}%`, top: `${s.y}%`, zIndex: 100, pointerEvents: 'none' }}
        >
          {s.type === 'squiggles' && <Shapes size={100} className="text-pop-purple animate-spin-slow" />}
          {s.type === 'splatter' && <Cloud size={120} className="text-pop-red fill-pop-red animate-pulse" />}
          {s.type === 'sparkle' && <Sparkles size={80} className="text-pop-yellow fill-pop-yellow animate-bounce" />}
        </motion.div>
      ))}

      {/* Blobs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-pop-pink rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow pointer-events-none -z-10"></div>
      <div className="fixed bottom-20 right-10 w-48 h-48 bg-pop-purple rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse pointer-events-none -z-10"></div>
    </div>
  );
}
