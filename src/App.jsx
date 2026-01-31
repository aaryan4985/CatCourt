import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Sparkles, Gavel, Scale, AlertTriangle, MessageCircle, Cat, Eye, EyeOff, Zap, ShieldAlert, Cloud } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import confetti from 'canvas-confetti';

const cn = (...inputs) => twMerge(clsx(inputs));

// --- CONSTANTS ---
const JURY_COMMENTS = [
  "HISSSSSS", "BORING!", "MEOW?", "MORE TREATS LESS TALK",
  "GUILTY!", "LOOK AT THAT POSTURE", "UNACCEPTABLE", "PURRRRRHAPS",
  "JUDGING INTENSIFIES", "MY BOWL IS EMPTY", "DISGUSTING", "INTRIGUING"
];

const INTRO_TEXTS = [
  "ALL RISE!",
  "THE COURT IS NOW IN SESSION",
  "PREPARE FOR JUDGMENT",
  "CATS ARE WATCHING"
];

// --- COMPONENTS ---

const Button = ({ children, className, variant = 'primary', onClick, disabled, icon: Icon }) => {
  const baseStyles = "relative px-8 py-4 font-display text-2xl uppercase tracking-wider border-4 border-black transition-all active:translate-x-1 active:translate-y-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000] shadow-[5px_5px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3";

  const variants = {
    primary: "bg-pop-pink text-white hover:bg-pop-purple",
    secondary: "bg-pop-cyan text-black hover:bg-white",
    judge: "bg-black text-pop-red hover:bg-zinc-800 border-pop-red shadow-[5px_5px_0px_#ff0000]",
    therapy: "bg-pop-green text-black hover:bg-white border-black"
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05, rotate: Math.random() * 4 - 2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={24} />}
      {children}
    </motion.button>
  );
};

const Sticker = ({ children, x, y, rotate, delay = 0, scale = 1 }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{ scale: scale, rotate }}
    transition={{ type: "spring", bounce: 0.6, delay }}
    className="absolute z-0 pointer-events-none mix-blend-multiply"
    style={{ left: x, top: y }}
  >
    {children}
  </motion.div>
);

const JuryMember = ({ delay }) => {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setComment(JURY_COMMENTS[Math.floor(Math.random() * JURY_COMMENTS.length)]);
        setShowComment(true);
        setTimeout(() => setShowComment(false), 2000);
      }
    }, 3000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 + Math.random(), ease: "easeInOut", delay }}
        className="text-6xl cursor-pointer hover:scale-125 transition-transform"
      >
        🐱
      </motion.div>
      <AnimatePresence>
        {showComment && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white border-2 border-black px-2 py-1 whitespace-nowrap font-comic text-xs font-bold text-black shadow-[2px_2px_0px_#000] z-20"
          >
            {comment}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const JuryBox = () => (
  <div className="fixed left-4 top-1/4 flex flex-col gap-4 z-40 hidden md:flex">
    <div className="bg-black text-white font-display text-xl p-2 -rotate-2 border-2 text-center">THE JURY</div>
    {Array(5).fill(null).map((_, i) => (
      <JuryMember key={i} delay={i * 0.2} />
    ))}
  </div>
);

const Marquee = () => (
  <div className="bg-black border-y-4 border-white py-2 overflow-hidden whitespace-nowrap shadow-lg z-50 relative">
    <motion.div
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      className="inline-block font-display text-3xl text-pop-yellow"
    >
      {Array(10).fill("• SUPREME CAT COURT • JUSTICE IS SERVED COLD • NO DOGS ALLOWED • HONESTY IS MANDATORY ").map((text, i) => (
        <span key={i} className="mx-4">{text}</span>
      ))}
    </motion.div>
  </div>
);

const Courtroom = () => {
  const [confession, setConfession] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gavelHit, setGavelHit] = useState(false);
  const controls = useAnimation();

  // Shake effect
  const shakeScreen = async () => {
    await controls.start({
      x: [0, -10, 10, -10, 10, 0],
      y: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 }
    });
  };

  const handleImpatient = () => {
    confetti({
      particleCount: 10,
      spread: 30,
      origin: { y: 0.8 },
      colors: ['#555', '#000']
    });
    alert("HISS! DO NOT RUSH JUSTICE!");
  };

  const handleJudge = async () => {
    if (!confession.trim()) return;
    setLoading(true);
    setResult(null);
    setGavelHit(false);

    // Initial tension
    shakeScreen();

    try {
      // Dramatic delay for "deliberation"
      await new Promise(r => setTimeout(r, 1500));

      const response = await fetch('http://localhost:3000/api/catcourt/judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: confession }),
      });

      const data = await response.json();

      // Gavel Strike Effect
      setGavelHit(true);
      shakeScreen();
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.5 },
        colors: data.judgement.verdict.includes("Guilty") ? ['#ff0000', '#000000'] : ['#00ff00', '#ffff00']
      });

      setResult(data);

    } catch (error) {
      console.error("Error:", error);
      // Fallback if backend is down
      setResult({
        judgement: { verdict: "The judge is asleep. You got lucky.", imageUrl: "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg" },
        therapy: { message: "Go play with a laser pointer.", imageUrl: "https://cdn2.thecatapi.com/images/MTc3NDcwNQ.jpg" }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div animate={controls} className="min-h-screen bg-pop-yellow relative overflow-hidden flex flex-col items-center pt-10 pb-20 px-4">

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <Sticker x="5%" y="10%" rotate={-10}><Scale size={120} className="text-black opacity-20" /></Sticker>
      <Sticker x="85%" y="15%" rotate={10}><Gavel size={120} className="text-pop-red opacity-20" /></Sticker>
      <Sticker x="80%" y="80%" rotate={-5}><Cat size={150} className="text-pop-purple opacity-20" /></Sticker>

      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="text-center z-10 mb-12 relative"
      >
        <div className="bg-black text-white font-display text-xl px-4 py-1 rotate-[-2deg] inline-block mb-2">SUPREME COURT OF THE FELINE</div>
        <h1 className="text-[5rem] md:text-[8rem] leading-[0.8] font-display text-stroke-lg text-white drop-shadow-[8px_8px_0px_#000]">
          CAT COURT
        </h1>
        <h2 className="text-3xl font-comic font-bold text-black mt-4 bg-pop-cyan px-6 py-2 border-4 border-black rotate-2 inline-block shadow-[5px_5px_0px_#000]">
          WHERE JUSTICE PUZZLES HUMANS
        </h2>
      </motion.div>

      {/* Main Interface */}
      <div className="max-w-5xl w-full grid lg:grid-cols-[1.5fr_1fr] gap-12 z-10">

        {/* Confession Box */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border-4 border-black p-1 shadow-[10px_10px_0px_#000] rotate-[-1deg]">
            <div className="bg-black text-white font-display text-2xl p-2 mb-1 flex items-center gap-2">
              <MessageCircle size={24} />
              DEFENDANT'S CONFESSION
            </div>
            <textarea
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              placeholder="I didn't feed the cat at exactly 5:00 AM..."
              className="w-full h-48 p-4 font-comic text-2xl focus:outline-none resize-none bg-zinc-50 border-2 border-dashed border-zinc-300 focus:border-black focus:bg-yellow-50 transition-colors"
            />
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              variant="judge"
              onClick={handleJudge}
              disabled={loading || !confession}
              className="flex-1 text-3xl py-6"
              icon={Gavel}
            >
              {loading ? "DELIBERATING..." : "JUDGE ME"}
            </Button>
            {loading && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Gavel size={48} className="text-black" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Verdict Box Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!result && !loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center border-4 border-black bg-pop-purple/10 border-dashed"
              >
                <div className="text-center opacity-50">
                  <Scale size={64} className="mx-auto mb-4" />
                  <p className="font-display text-2xl">Awaiting Testimony...</p>
                </div>
              </motion.div>
            ) : null}

            {result && (
              <motion.div
                key="result"
                initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                className="bg-zinc-900 border-8 double border-white p-6 shadow-[15px_15px_0px_rgba(0,0,0,0.5)] transform rotate-1 text-white relative overflow-hidden"
              >
                {/* Stamp */}
                <motion.div
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="absolute top-4 right-4 z-20"
                >
                  <div className="border-4 border-red-500 text-red-500 font-display text-4xl px-4 py-2 -rotate-12 opacity-80 mix-blend-screen">
                    VERDICT
                  </div>
                </motion.div>

                <h3 className="font-display text-4xl text-pop-red mb-2 border-b-2 border-zinc-700 pb-2 flex gap-2 items-center">
                  <ShieldAlert /> THE JUDGMENT
                </h3>

                <img
                  src={result.judgement.imageUrl}
                  alt="Judge"
                  className="w-full h-48 object-cover border-4 border-black mb-4 grayscale hover:grayscale-0 transition-all"
                />

                <p className="font-comic text-xl font-bold text-pop-yellow mb-6">
                  "{result.judgement.verdict}"
                </p>

                <div className="bg-white/10 p-4 rounded-lg mt-4">
                  <h4 className="font-display text-xl text-pop-green mb-1 flex items-center gap-2">
                    <Sparkles size={18} /> COURT ORDERED THERAPY
                  </h4>
                  <div className="flex gap-4 items-center">
                    <img src={result.therapy.imageUrl} className="w-16 h-16 rounded-full border-2 border-pop-green object-cover" />
                    <p className="font-comic text-sm italic">"{result.therapy.message}"</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="bg-black text-white py-12 border-t-4 border-pop-cyan text-center font-comic">
    <p className="mb-4 text-zinc-500">© {new Date().getFullYear()} Cat Court. All Rights Reserved (by the Cats).</p>
    <div className="flex justify-center gap-4 text-sm uppercase font-display tracking-widest text-pop-cyan">
      <a href="#" className="hover:text-pop-pink">Appeal (Denied)</a>
      <span>•</span>
      <a href="#" className="hover:text-pop-pink">Bribes</a>
      <span>•</span>
      <a href="#" className="hover:text-pop-pink">Sitemap</a>
    </div>
  </footer>
);

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <Marquee />
      <JuryBox />
      <Courtroom />
      <Footer />

      {/* Floating Chaos Elements */}
      <Sticker x="2%" y="40%" rotate={45} delay={1}><Zap size={64} className="text-pop-yellow animate-pulse" /></Sticker>
      <Sticker x="90%" y="60%" rotate={-15} delay={1.5}><Cloud size={80} className="text-pop-cyan opacity-50" /></Sticker>
    </div>
  );
}
