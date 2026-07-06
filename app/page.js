"use client";
import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  BrainCircuit,
  ChevronRight,
  GraduationCap,
  Layers,
  ListChecks,
  MessageCircleQuestion,
  NotebookPen,
  Sparkles,
  Target,
  Video,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* ---------------------------------- data ---------------------------------- */

const ROTATING_WORDS = ["exam", "interview", "new skill", "course", "topic"];

const MARQUEE_TOPICS = [
  "Data Structures",
  "System Design",
  "React & Next.js",
  "UPSC Prep",
  "Machine Learning",
  "SQL & Databases",
  "Operating Systems",
  "Aptitude",
  "DevOps",
  "Python",
  "Computer Networks",
  "GATE CS",
];

const BENTO_FEATURES = [
  {
    icon: BrainCircuit,
    title: "AI Course Builder",
    desc: "Describe any topic and difficulty — get a complete chapter-by-chapter course layout in seconds, tailored to your goal.",
    className: "md:col-span-2",
    accent: "from-violet-500/20 to-indigo-500/5",
  },
  {
    icon: NotebookPen,
    title: "Chapter Notes",
    desc: "Deep-dive study notes generated per chapter, exactly when you need them.",
    className: "",
    accent: "from-sky-500/15 to-transparent",
  },
  {
    icon: Layers,
    title: "Smart Flashcards",
    desc: "Auto-generated flashcards that make concepts stick — flip, recall, repeat.",
    className: "",
    accent: "from-fuchsia-500/15 to-transparent",
  },
  {
    icon: ListChecks,
    title: "Adaptive Quizzes",
    desc: "Test yourself with instant feedback and a clear explanation for every answer.",
    className: "",
    accent: "from-emerald-500/15 to-transparent",
  },
  {
    icon: MessageCircleQuestion,
    title: "Q&A Practice",
    desc: "Interview-style questions and answers generated from your course, so you walk in prepared.",
    className: "md:col-span-2",
    accent: "from-amber-500/15 to-transparent",
  },
];

const STEPS = [
  {
    icon: Target,
    step: "01",
    title: "Pick your goal",
    desc: "Exam, job interview, coding practice or just curiosity — choose what you're preparing for.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Describe the topic",
    desc: "Type any subject and pick a difficulty. Gemini drafts your full course outline instantly.",
  },
  {
    icon: GraduationCap,
    step: "03",
    title: "Study smarter",
    desc: "Generate notes, flashcards, quizzes and Q&A per chapter — all in one workspace.",
  },
];

const STATS = [
  { value: 10, suffix: "s", label: "to a full course outline" },
  { value: 4, suffix: "", label: "study formats per course" },
  { value: 100, suffix: "%", label: "generated for your topic" },
  { value: 24, suffix: "/7", label: "your AI study partner" },
];

const DEMO_CARDS = [
  { q: "What does 'Big O' notation describe?", a: "The upper bound of an algorithm's growth rate as input size increases." },
  { q: "What is a closure in JavaScript?", a: "A function that remembers variables from the scope in which it was created." },
  { q: "REST stands for…?", a: "Representational State Transfer." },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* --------------------------------- pieces --------------------------------- */

function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "border-b border-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="Make It Easy logo" className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-white">
            Make It Easy
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-white">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-white">
            How it works
          </a>
          <a href="#demo" className="transition-colors hover:text-white">
            Flashcards
          </a>
        </nav>

        <Link href="/dashboard">
          <Button className="btn-gradient rounded-full px-6 font-semibold">
            Dashboard
          </Button>
        </Link>
      </div>
    </motion.header>
  );
}

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROTATING_WORDS.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient whitespace-nowrap"
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ParallaxOrbs() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const x1 = useTransform(sx, (v) => v * 40);
  const y1 = useTransform(sy, (v) => v * 40);
  const x2 = useTransform(sx, (v) => v * -60);
  const y2 = useTransform(sy, (v) => v * -60);

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <>
      <motion.div
        style={{ x: x1, y: y1 }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full glow-violet blur-3xl"
      />
      <motion.div
        style={{ x: x2, y: y2 }}
        className="pointer-events-none absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full glow-indigo blur-3xl"
      />
    </>
  );
}

function FlashcardDemo() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = DEMO_CARDS[index];

  const flip = () => {
    const sound = new Audio("/assets/audio/cardflip.mp3");
    sound.volume = 0.3;
    sound.play().catch(() => {});
    setFlipped((f) => !f);
  };

  const next = () => {
    setFlipped(false);
    setTimeout(() => setIndex((i) => (i + 1) % DEMO_CARDS.length), 250);
  };

  return (
    <div id="demo" className="flex flex-col items-center gap-4">
      <div className="[perspective:1200px]">
        <motion.div
          onClick={flip}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="relative h-52 w-80 cursor-pointer [transform-style:preserve-3d] md:h-56 md:w-96"
        >
          {/* front — question */}
          <div className="surface absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 shadow-card [backface-visibility:hidden]">
            <span className="chip">
              <Layers className="h-3.5 w-3.5 text-violet-400" /> Flashcard{" "}
              {index + 1}/{DEMO_CARDS.length}
            </span>
            <p className="text-center text-base font-semibold text-white md:text-lg">
              {card.q}
            </p>
            <span className="text-xs text-muted-foreground">
              click to reveal
            </span>
          </div>
          {/* back — answer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-600/20 to-indigo-600/10 p-6 shadow-glow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="chip">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" /> Answer
            </span>
            <p className="text-center text-sm leading-relaxed text-zinc-100 md:text-base">
              {card.a}
            </p>
          </div>
        </motion.div>
      </div>

      <button
        onClick={next}
        className="group inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-white"
      >
        Next card
        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

function TopicMarquee() {
  const track = [...MARQUEE_TOPICS, ...MARQUEE_TOPICS];
  return (
    <div className="marquee-mask relative overflow-hidden py-2">
      <div className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
        {track.map((topic, i) => (
          <span
            key={`${topic}-${i}`}
            className="chip whitespace-nowrap px-4 py-1.5 text-xs"
          >
            <Zap className="h-3 w-3 text-violet-400" />
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}

function AppPreview() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

  const chapters = [
    { title: "Introduction & Setup", progress: 100 },
    { title: "Core Concepts", progress: 72 },
    { title: "Advanced Patterns", progress: 38 },
    { title: "Real-world Project", progress: 0 },
  ];

  return (
    <div ref={ref} className="relative mx-auto mt-20 max-w-4xl [perspective:1400px]">
      {/* floating chips */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="chip absolute -left-4 top-10 z-10 hidden px-3 py-1.5 shadow-glow-sm md:inline-flex"
      >
        <ListChecks className="h-3.5 w-3.5 text-emerald-400" /> Quiz: 9/10
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="chip absolute -right-6 top-1/3 z-10 hidden px-3 py-1.5 shadow-glow-sm md:inline-flex"
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-400" /> Notes generated
      </motion.div>

      <motion.div
        style={{ rotateX, scale, opacity }}
        className="surface overflow-hidden shadow-card"
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 rounded-md bg-white/[0.05] px-3 py-1 text-[11px] text-muted-foreground">
            makeiteasy.app/course/react-mastery
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[180px,1fr]">
          {/* sidebar */}
          <div className="hidden border-r border-white/[0.06] p-4 md:block">
            <div className="mb-4 flex items-center gap-2">
              <img src="/logo.svg" alt="" className="h-5 w-5" />
              <span className="text-xs font-semibold text-white">Workspace</span>
            </div>
            {["Dashboard", "My Courses", "Flashcards", "Quizzes"].map((label, i) => (
              <div
                key={label}
                className={`mb-1 rounded-lg px-3 py-2 text-xs ${
                  i === 1
                    ? "bg-violet-500/15 font-medium text-violet-300"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          {/* main panel */}
          <div className="p-5 md:p-6">
            <div className="mb-1 flex items-center gap-2">
              <span className="eyebrow">Course</span>
              <span className="chip px-2 py-0 text-[10px]">Moderate</span>
            </div>
            <h4 className="text-lg font-bold text-white">React Mastery</h4>
            <p className="mb-5 mt-1 text-xs text-muted-foreground">
              4 chapters · notes, flashcards, quiz &amp; Q&amp;A
            </p>

            <div className="space-y-2.5">
              {chapters.map((ch, i) => (
                <motion.div
                  key={ch.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i, duration: 0.5 }}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-[11px] font-bold text-violet-300">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-zinc-200">
                      {ch.title}
                    </p>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${ch.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + 0.15 * i, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400"
                      />
                    </div>
                  </div>
                  <span className="text-[10px] tabular-nums text-muted-foreground">
                    {ch.progress}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SpotlightCard({ feature }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      variants={item}
      onMouseMove={onMouseMove}
      className={`surface surface-hover group relative overflow-hidden p-6 ${feature.className}`}
    >
      {/* mouse-follow spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(139 92 246 / 0.10), transparent 65%)",
        }}
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-40`}
      />

      <div className="relative">
        <div className="mb-4 inline-flex rounded-xl border border-violet-500/20 bg-violet-500/10 p-2.5 transition-transform duration-300 group-hover:scale-110">
          <feature.icon className="h-5 w-5 text-violet-400" />
        </div>
        <h3 className="text-base font-semibold text-white">{feature.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <ParallaxOrbs />

      <Nav />

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-36 md:pt-44">
        {/* ------------------------------- hero ------------------------------ */}
        <motion.div
          className="flex flex-col items-center text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={item} className="chip mb-6">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            AI-powered study workspace
          </motion.span>

          <motion.h1
            variants={item}
            className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl"
          >
            Ace your next <RotatingWord />
            <br className="hidden md:block" /> with AI-generated study material
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            Turn any exam, interview or topic into a structured course with
            notes, flashcards, quizzes and Q&amp;A — generated in seconds.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link href="/dashboard">
              <Button
                size="lg"
                className="btn-gradient group rounded-full px-8 text-base font-semibold"
              >
                Get Started — it&apos;s free
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="https://youtu.be/ampOXgVJijs">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/15 bg-white/[0.03] px-8 text-base text-zinc-200 hover:bg-white/[0.08] hover:text-white"
              >
                <Video className="text-violet-400" /> Watch Tutorial
              </Button>
            </Link>
          </motion.div>

          {/* topic marquee */}
          <motion.div variants={item} className="mt-14 w-full max-w-3xl">
            <p className="eyebrow mb-3">Generate a course on anything</p>
            <TopicMarquee />
          </motion.div>
        </motion.div>

        {/* --------------------------- app preview --------------------------- */}
        <AppPreview />

        {/* --------------------------- bento features ------------------------ */}
        <section id="features" className="mt-32 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <p className="eyebrow mb-3">Everything you need</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              One topic in, a full{" "}
              <span className="text-gradient">study kit</span> out
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-5 md:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {BENTO_FEATURES.map((feature) => (
              <SpotlightCard key={feature.title} feature={feature} />
            ))}
          </motion.div>
        </section>

        {/* ---------------------------- how it works -------------------------- */}
        <section id="how-it-works" className="mt-32 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              From topic to mastery in{" "}
              <span className="text-gradient">three steps</span>
            </h2>
          </motion.div>

          <motion.div
            className="relative grid grid-cols-1 gap-5 md:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* connecting line */}
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent md:block" />

            {STEPS.map((step) => (
              <motion.div
                key={step.step}
                variants={item}
                className="surface surface-hover relative p-6 text-center"
              >
                <span className="absolute right-5 top-4 text-4xl font-extrabold text-white/[0.05]">
                  {step.step}
                </span>
                <div className="mx-auto mb-4 inline-flex rounded-2xl border border-violet-500/20 bg-violet-500/10 p-3.5 shadow-glow-sm">
                  <step.icon className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ---------------------------- flashcard demo ------------------------ */}
        <section className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <p className="eyebrow mb-3">Try it right now</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Flashcards that <span className="text-gradient">actually stick</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <FlashcardDemo />
          </motion.div>
        </section>

        {/* -------------------------------- stats ----------------------------- */}
        <section className="mt-32">
          <motion.div
            className="surface grid grid-cols-2 gap-y-8 p-8 md:grid-cols-4 md:p-10"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={item} className="text-center">
                <p className="text-gradient text-3xl font-extrabold md:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* --------------------------------- CTA ------------------------------ */}
        <section className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 via-background to-indigo-600/10 px-6 py-16 text-center md:py-20"
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[480px] -translate-x-1/2 rounded-full glow-violet blur-3xl" />
            <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Stop organizing. <span className="text-gradient">Start learning.</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
              Your next exam won&apos;t wait. Generate your first course in
              under a minute — free.
            </p>
            <Link href="/dashboard" className="relative mt-8 inline-block">
              <Button
                size="lg"
                className="btn-gradient group rounded-full px-10 text-base font-semibold"
              >
                Create my first course
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* -------------------------------- footer ------------------------------ */}
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="" className="h-6 w-6" />
            <span className="text-sm font-semibold text-white">Make It Easy</span>
          </div>
          <nav className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#features" className="transition-colors hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-white">
              How it works
            </a>
            <Link href="/dashboard" className="transition-colors hover:text-white">
              Dashboard
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Make It Easy · Built with AI
          </p>
        </div>
      </footer>
    </div>
  );
}
