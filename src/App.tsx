import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Keyboard, 
  Zap, 
  ShieldCheck, 
  Settings2, 
  Globe, 
  ArrowRight, 
  Chrome, 
  Cpu,
  Fingerprint,
  RotateCcw
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- Components ---

const RevealText = ({ text }: { text: string | string[] }) => {
  const lines = Array.isArray(text) ? text : [text];

  const content = lines.map((line, lineIndex) => (
    <span key={lineIndex}>
      {line.split(" ").map((word, index, arr) => (
        <span key={index}>
          <motion.span
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {word}
          </motion.span>
          {index < arr.length - 1 ? " " : ""}
        </span>
      ))}
      {lineIndex < lines.length - 1 && <br />}
    </span>
  ));

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
        hidden: {},
      }}
    >
      {content}
    </motion.span>
  );
};

const Navbar = () => (
  <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
    <div className="px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl select-none grayscale">✍️</span>
        <span className="font-display font-bold text-xl tracking-tight text-white">Typelike</span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-white transition-colors">User Guide</a>
        <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
      </div>
      <a 
        href="https://chromewebstore.google.com/detail/pdccbfibcjhalnpfcnablookbbbanmpo?utm_source=item-share-cb"
        className="text-[11px] font-bold uppercase tracking-widest bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-lg transition-all"
      >
        Install
      </a>
    </div>
  </nav>
);

const TypingDemo = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('Standby');
  const targetText = "Typelike simulates realistic human patterns and the occasional typo...";
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let index = 0;
    let isCorrecting = false;

    const type = () => {
      setStatus('Typing');
      if (index < targetText.length) {
        if (!isCorrecting && Math.random() < 0.06 && index > 10 && index < targetText.length - 10) {
          const char = "qwerasdfzxcv"[Math.floor(Math.random() * 12)];
          setText(prev => prev + char);
          isCorrecting = true;
          timeout = setTimeout(type, 200 + Math.random() * 200);
        } else if (isCorrecting) {
          setText(prev => prev.slice(0, -1));
          isCorrecting = false;
          timeout = setTimeout(type, 150);
        } else {
          setText(targetText.slice(0, index + 1));
          index++;
          const delay = targetText[index-1] === ' ' ? 250 : 80 + Math.random() * 100;
          timeout = setTimeout(type, delay);
        }
      } else {
        setStatus('Finished');
        timeout = setTimeout(() => {
          setText('');
          index = 0;
          type();
        }, 3000);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative">
      <div className="bg-[#0e0e10] rounded-[32px] border border-white/5 p-10 shadow-2xl overflow-hidden shadow-black/80">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl grayscale">✍️</span>
            <span className="font-display text-2xl font-bold text-white">Typelike</span>
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500">
            <Settings2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#151517] rounded-3xl border border-white/5 p-8 min-h-[260px] relative mt-4 mb-2 group transition-all">
          <div className="text-zinc-600 font-mono text-xs absolute top-6 left-8 opacity-40">Paste the text you want to simulate typing...</div>
          <div className="text-zinc-300 font-sans text-base leading-relaxed pt-8 relative">
            {text}
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-[1px] h-5 bg-white ml-1 align-middle"
            />
          </div>
          
          <div className="absolute bottom-6 right-8 flex gap-3">
             <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center transition-transform active:scale-95 shadow-lg border border-white/5">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white/60 border-b-[8px] border-b-transparent translate-x-0.5" />
             </div>
             <div className="px-6 py-3 rounded-2xl bg-[#c5c5c5] text-black font-semibold text-sm flex items-center gap-3 transition-transform active:scale-95 shadow-lg shadow-black/20">
                <Keyboard className="w-4 h-4 opacity-70" />
                Type on Page
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="relative pt-40 pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 py-4 px-8 rounded-full mb-10 shadow-[0_0_40px_rgba(255,255,255,0.08)] backdrop-blur-sm scale-110 origin-left">
          <Chrome className="w-6 h-6 text-white" />
          <span className="mono-label !tracking-[0.2em] !text-[12px] !text-white font-bold">Official Chrome Extension</span>
        </div>
        
        <h1 className="font-display text-7xl md:text-8xl font-normal text-white leading-[1.1] tracking-tight mb-8">
          Humanize your <span className="italic">text.</span>
        </h1>
        
        <p className="text-2xl text-zinc-500 mb-14 max-w-lg leading-relaxed font-normal">
          The engine that performs your text with human-like hesitation, mistakes, and rhythm.
        </p>

        <div className="flex flex-col sm:flex-row gap-8">
          <a 
            href="https://chromewebstore.google.com/detail/pdccbfibcjhalnpfcnablookbbbanmpo?utm_source=item-share-cb"
            className="group relative px-10 py-6 bg-white text-black font-bold rounded-2xl overflow-hidden transition-all hover:translate-y-[-2px] active:translate-y-[0px] shadow-2xl shadow-white/10"
          >
            <div className="relative z-10 flex items-center gap-4 text-lg">
              <Chrome className="w-6 h-6" />
              Add to Chrome — It's Free
            </div>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-5" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <TypingDemo />
      </motion.div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-surface border border-white/5 p-10 group relative"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
      <div className="w-10 h-10 border border-zinc-700 dashed-border rounded-full flex items-center justify-center font-mono text-[8px]">TYPELIKE</div>
    </div>
    <div className="w-14 h-14 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors shadow-inner">
      <Icon className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-display font-bold text-white mb-4 tracking-tight uppercase leading-none"><RevealText text={title} /></h3>
    <p className="text-zinc-600 leading-relaxed text-sm font-medium"><RevealText text={description} /></p>
  </motion.div>
);

const Features = () => (
  <section id="features" className="py-40 bg-black relative">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div className="max-w-7xl mx-auto px-6 relative">
      <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
        <div className="max-w-xl">
          <span className="mono-label !text-white mb-4"><RevealText text="Capabilities" /></span>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.9]">
            <RevealText text={["EVERY DETAIL", "ACCOUNTED FOR."]} />
          </h2>
        </div>
        <p className="text-zinc-600 mb-2 font-mono text-[11px] uppercase tracking-widest font-bold"><RevealText text="Scroll to explore &darr;" /></p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
        <FeatureCard 
          icon={Globe}
          title="Universal Compatibility"
          description="Works seamlessly on any website, including complex editors like Google Docs, Microsoft Word Online, and Notion."
          delay={0.1}
        />
        <FeatureCard 
          icon={Zap}
          title="Bionic Rhythm"
          description="Simulates variable typing speeds and micro-pauses at punctuation, just like a human would while thinking."
          delay={0.2}
        />
        <FeatureCard 
          icon={RotateCcw}
          title="Natural Typos"
          description="Optionally makes occasional typos that it immediately backspaces and corrects to ensure total authenticity."
          delay={0.3}
        />
        <FeatureCard 
          icon={Settings2}
          title="Full Control"
          description="Adjust typing speed, mistake frequency, and rhythmic variance to match your unique personal typing style."
          delay={0.4}
        />
        <FeatureCard 
          icon={ShieldCheck}
          title="Offline"
          description="Your text never leaves your computer. Extension works completely offline with zero data tracking."
          delay={0.5}
        />
        <FeatureCard 
          icon={Keyboard}
          title="Sleek Interface"
          description="A minimalist dark-themed dashboard that stays out of your way and respects your system's aesthetic."
          delay={0.6}
        />
      </div>
    </div>
  </section>
);

const Step = ({ number, title, description, active }: { number: string, title: string, description: string, active?: boolean }) => (
  <div className={`p-8 border-l-2 transition-colors ${active ? 'border-white bg-white/5' : 'border-zinc-800'}`}>
    <div className="mono-label !text-zinc-200 mb-4 text-[12px]"><RevealText text={number} /></div>
    <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-tight uppercase leading-none"><RevealText text={title} /></h3>
    <p className="text-zinc-600 leading-relaxed font-medium text-sm"><RevealText text={description} /></p>
  </div>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-48 bg-black">
    <div className="max-w-3xl mx-auto px-6">
      <div className="mb-12">
        <span className="mono-label !text-white opacity-40 mb-4 block uppercase tracking-[0.3em]"><RevealText text="User Guide" /></span>
      </div>
      <div className="space-y-4">
        <Step 
          number="Step 01"
          title="Input & Buffer"
          description="Drop your pre-written content into the Typelike workspace. Our AI analyzes the structure for natural break points."
          active
        />
        <Step 
          number="Step 02"
          title="Calibrate Cadence"
          description="Adjust the 'Mistake Probability' and 'Variable Rhythm' sliders to match your specific human signature."
        />
        <Step 
          number="Step 03"
          title="Execute Input"
          description="Click 'Type on Page' and watch as the extension bridges your clipboard to the active window with perfect organic timing."
        />
      </div>
    </div>
  </section>
);

const Privacy = () => (
  <section id="privacy" className="py-48 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-zinc-900 opacity-50" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-zinc-900 opacity-50" />
    
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <div className="hardware-card inline-block mb-12 p-4">
        <ShieldCheck className="w-10 h-10 text-white" />
      </div>
      <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter uppercase leading-[0.8]">
        <RevealText text={["Encrypted.", "Local."]} />
        <br />
        <span className="text-zinc-700"><RevealText text="Invisible." /></span>
      </h2>
      <p className="text-xl text-zinc-500 leading-relaxed mb-12 font-medium max-w-2xl mx-auto">
        <RevealText text="Typelike operates within its own sandbox. No external APIs, no tracking cookies, and zero user data collection. Your typing patterns are yours alone." />
      </p>
      
      <div className="flex flex-col md:flex-row justify-center gap-12">
        <div className="text-center">
          <div className="mono-label mb-2">Network</div>
          <div className="text-sm font-bold text-white uppercase tracking-widest">Isolated</div>
        </div>
        <div className="text-center">
          <div className="mono-label mb-2">Storage</div>
          <div className="text-sm font-bold text-white uppercase tracking-widest">Client-Side</div>
        </div>
        <div className="text-center">
          <div className="mono-label mb-2">Analytics</div>
          <div className="text-sm font-bold text-white uppercase tracking-widest">None</div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-24 border-t border-white/5 bg-zinc-950">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 mb-24">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl grayscale">✍️</span>
            <span className="font-display font-bold text-xl text-white tracking-widest uppercase">Typelike</span>
          </div>
          <p className="text-zinc-600 max-w-sm mb-8 font-medium">
            <RevealText text="Bridging the gap between automated logic and human authenticity. Every keystroke is intentional." />
          </p>
          <div className="flex gap-6">
             <a href="#" className="mono-label hover:text-white transition-colors">Twitter</a>
             <a href="#" className="mono-label hover:text-white transition-colors">GitHub</a>
             <a href="#" className="mono-label hover:text-white transition-colors">Docs</a>
          </div>
        </div>
        <div className="flex flex-col md:items-end justify-between">
          <a 
            href="https://chromewebstore.google.com/detail/pdccbfibcjhalnpfcnablookbbbanmpo?utm_source=item-share-cb"
            className="flex items-center gap-4 text-white hover:opacity-70 transition-all font-display font-bold text-2xl group"
          >
            <span>ADD TO CHROME</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </a>
          <div className="text-zinc-700 font-mono text-[10px] uppercase tracking-widest mt-8 md:mt-0">
            &copy; {new Date().getFullYear()} Typelike Systems Engine. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---

const SettingsMockup = () => {
  const Slider = ({ label, value, left, right }: { label: string, value: string, left: string, right: string }) => (
    <div className="mb-10 last:mb-0">
      <div className="flex justify-between items-center mb-6">
        <label className="text-white font-bold text-lg tracking-tight">{label}</label>
        <span className="text-zinc-500 text-sm font-mono">{value}</span>
      </div>
      <div className="relative h-1 bg-zinc-800 rounded-full mb-4">
        <div 
          className="absolute h-full bg-white rounded-full flex items-center justify-end" 
          style={{ width: value }}
        >
          <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] translate-x-1/2" />
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-zinc-600 font-bold tracking-widest uppercase">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );

  return (
    <section className="py-40 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="mono-label mb-6 !text-white"><RevealText text="Granular Control" /></span>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-none uppercase">
            <RevealText text={["CALIBRATE", "YOUR SOUL."]} />
          </h2>
          <p className="text-xl text-zinc-500 leading-relaxed font-normal max-w-sm">
            <RevealText text="Fine-tune every aspect of the engine to match your specific human signature. No two typists are the same." />
          </p>
        </div>
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-12 shadow-2xl">
          <div className="flex items-center justify-between mb-12">
             <h3 className="text-white font-bold text-2xl uppercase tracking-tighter">Settings</h3>
             <div className="w-6 h-6 text-zinc-600">&times;</div>
          </div>
          <Slider label="Typing Speed" value="76%" left="Slow Thinker" right="Fast Typist" />
          <Slider label="Mistake Frequency" value="37%" left="Pristine" right="Chaotic" />
          <Slider label="Correction Style" value="86%" left="Leaves It" right="Always Fixes" />
          <Slider label="Pause Length" value="87%" left="Barely Thinks" right="Deep Deliberation" />
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <SettingsMockup />
        <Privacy />
      </main>
      <Footer />
    </div>
  );
}
