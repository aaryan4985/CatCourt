import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Zap, Star, Shapes, MousePointer2, Smile, Cloud } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Button = ({ children, className, variant = 'primary' }) => {
  const baseStyles = "relative px-8 py-4 font-display text-2xl uppercase tracking-wider border-4 border-black transition-all active:translate-x-1 active:translate-y-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000] shadow-[5px_5px_0px_#000]";

  const variants = {
    primary: "bg-pop-pink text-white hover:bg-pop-purple",
    secondary: "bg-pop-cyan text-black hover:bg-white",
    outline: "bg-white text-black hover:bg-pop-yellow"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </motion.button>
  );
};

const NavBar = () => (
  <nav className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
    <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white border-4 border-black p-2 rotate-[-3deg] shadow-[5px_5px_0px_#000]"
      >
        <span className="font-display text-4xl text-pop-red drop-shadow-sm">Pop!</span>
        <span className="font-display text-4xl text-pop-purple">Playground</span>
      </motion.div>

      <div className="flex gap-4">
        {['Play', 'Create', 'Chaos'].map((item, i) => (
          <motion.a
            key={item}
            href="#"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ rotate: Math.random() * 10 - 5, scale: 1.1 }}
            className={`
              font-comic font-bold text-xl px-4 py-2 border-3 border-black bg-pop-green text-black shadow-[4px_4px_0px_#000]
              ${i % 2 === 0 ? 'bg-pop-cyan' : 'bg-pop-green'}
              hover:shadow-[6px_6px_0px_#000] transition-transform
            `}
          >
            {item}
          </motion.a>
        ))}
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

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
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
          <Button className="-rotate-3">Start Playing</Button>
          <Button variant="secondary" className="rotate-2">Randomize</Button>
        </div>
      </motion.div>
    </section>
  );
};

const FeatureCard = ({ title, icon: Icon, color, rotate }) => (
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

    <div className="w-full h-40 bg-black overflow-hidden border-2 border-black mb-4 relative group">
      {/* Abstract pattern inside card image */}
      <div className={`absolute inset-0 ${color} opacity-20`}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon size={64} className="text-black group-hover:animate-bounce" />
      </div>
    </div>

    <h3 className="font-display text-4xl text-black mb-2">{title}</h3>
    <p className="font-comic font-semibold text-lg leading-tight">
      Design stuff that makes no sense but looks awesome.
    </p>

    <button className="mt-4 font-display text-xl uppercase border-b-4 border-black hover:border-pop-pink hover:text-pop-pink transition-colors">
            GO ->
    </button>
  </motion.div>
);

const Features = () => (
  <section className="py-20 px-4 bg-pop-purple border-y-4 border-black relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>

    <div className="max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="font-display text-7xl text-white text-stroke drop-shadow-[5px_5px_0px_#000] inline-block -rotate-2">
          PICK YOUR TOY
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-16 pt-10">
        <FeatureCard title="SQUIGGLES" icon={Shapes} color="bg-pop-yellow" rotate="rotate-2" />
        <FeatureCard title="SPLATTER" icon={Cloud} color="bg-pop-pink" rotate="-rotate-3" />
        <FeatureCard title="SPARKLE" icon={Sparkles} color="bg-pop-green" rotate="rotate-1" />
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
      {Array(10).fill("• DONT BE BORING • HAVE FUN • MAKE MESS ").map((text, i) => (
        <span key={i} className="mx-4">{text}</span>
      ))}
    </motion.div>
  </div>
);

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
          <div className="w-16 h-16 bg-white rounded-full animate-bounce"></div>
          <div className="w-16 h-16 bg-pop-green rounded-none animate-spin-slow"></div>
          <div className="w-16 h-16 bg-pop-cyan rounded-full border-4 border-white animate-wiggle"></div>
        </div>
        <div className="text-right font-display text-3xl uppercase">
          <a href="#" className="block hover:text-pop-yellow hover:underline decoration-wavy">Instagram</a>
          <a href="#" className="block hover:text-pop-yellow hover:underline decoration-wavy">TikTok</a>
          <a href="#" className="block hover:text-pop-yellow hover:underline decoration-wavy">Twitter</a>
        </div>
      </div>

      <p className="font-comic text-zinc-500">© 2024 Pop Playground. Steal this design, we dare you.</p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Marquee />
      <Hero />
      <Features />
      <div className="h-40 bg-pop-cyan flex justify-center items-center font-display text-6xl border-y-4 border-black">
        <span className="animate-pulse">MORE CHAOS BELOW</span>
      </div>
      <Footer />

      {/* Blobs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-pop-pink rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow pointer-events-none -z-10"></div>
      <div className="fixed bottom-20 right-10 w-48 h-48 bg-pop-purple rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse pointer-events-none -z-10"></div>
    </div>
  );
}
