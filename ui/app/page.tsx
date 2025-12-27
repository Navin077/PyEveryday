"use client";

import { useCallback, useEffect, useState } from "react";

const scriptCategories = [
  {
    emoji: "🤖",
    name: "Automation",
    description:
      "Schedule emails, categorize folders, and trigger routines without touching the keyboard.",
    scripts: [
      "Auto Email Sender",
      "File Organizer",
      "Backup Scheduler",
      "File Renamer",
      "Folder Monitor",
    ],
    accent: "from-cyan-500/25 via-cyan-400/10 to-sky-500/0",
    border: "border-cyan-400/40",
  },
  {
    emoji: "🧠",
    name: "Productivity",
    description:
      "Protect focus time with timers, reminders, and quote boosts when the day gets loud.",
    scripts: [
      "Pomodoro Timer",
      "Quote Fetcher",
      "Reminder System",
      "Time Tracker",
      "Todo Manager",
    ],
    accent: "from-fuchsia-500/25 via-purple-400/10 to-pink-500/0",
    border: "border-fuchsia-400/40",
  },
  {
    emoji: "🌐",
    name: "Web Scraping",
    description:
      "Harvest news, monitor weather, and capture web intel in clean CSVs and dashboards.",
    scripts: [
      "News Fetcher",
      "Weather Checker",
      "Web Scraper",
      "YouTube Downloader",
    ],
    accent: "from-emerald-400/25 via-teal-400/10 to-green-500/0",
    border: "border-emerald-400/40",
  },
  {
    emoji: "⚙️",
    name: "Utilities",
    description:
      "Swiss-army helpers for the things you do every morning: convert, compress, calculate.",
    scripts: [
      "Age Calculator",
      "Currency Converter",
      "Password Generator",
      "Unit Converter",
    ],
    accent: "from-amber-400/25 via-orange-400/10 to-red-400/0",
    border: "border-amber-400/40",
  },
  {
    emoji: "📊",
    name: "Data Tools",
    description:
      "Wrangle messy datasets, reshape formats, and visualize insights on the fly.",
    scripts: ["Data Converter", "Data Processor", "Data Visualizer"],
    accent: "from-indigo-500/25 via-indigo-400/10 to-purple-500/0",
    border: "border-indigo-400/40",
  },
  {
    emoji: "🔐",
    name: "Security",
    description:
      "Stress-test passwords and simulate firewalls before incidents happen.",
    scripts: ["Password Checker"],
    accent: "from-rose-500/25 via-rose-400/10 to-pink-500/0",
    border: "border-rose-400/40",
  },
  {
    emoji: "🎵",
    name: "Media",
    description:
      "Batch process audio, enhance images, and prep content for every channel.",
    scripts: ["Audio Processor", "Image Processor"],
    accent: "from-yellow-400/25 via-orange-300/10 to-amber-300/0",
    border: "border-yellow-300/40",
  },
];

const terminalCommands = [
  "python automation/auto_email_sender.py --schedule daily",
  "python productivity/pomodoro_timer.py --work 25 --break 5",
  "python web_scraping/news_fetcher.py --source tech --limit 10",
  "python utilities/password_generator.py --length 16 --secure",
  "python data_tools/data_visualizer.py --input data.csv --chart bar",
  "python security/password_checker.py --file passwords.txt",
  "python media/image_processor.py --resize 1920x1080 --format jpg",
];

const heroStats = [
  { value: "1,200+", label: "Hours automated" },
  { value: "25+", label: "Scripts ready" },
  { value: "7", label: "Script suites" },
  { value: "∞", label: "Ways to remix" },
];

const quickLaunchCommands = [
  {
    label: "Organize downloads",
    command: "python automation/file_organizer.py --smart",
  },
  {
    label: "Send follow-ups",
    command: "python automation/auto_email_sender.py --template followup",
  },
  {
    label: "Track focus intervals",
    command: "python productivity/pomodoro_timer.py --work 45",
  },
  {
    label: "Refresh dashboards",
    command: "python data_tools/data_processor.py --pipeline daily",
  },
];

const workflowPhases = [
  {
    step: "01",
    title: "Collect signals",
    description:
      "Monitor inboxes, RSS feeds, folders, and APIs in parallel without rate-limit surprises.",
    badge: "Monitor",
  },
  {
    step: "02",
    title: "Process + enrich",
    description:
      "Normalize formats, score priorities, and enrich payloads before handing them downstream.",
    badge: "Enrich",
  },
  {
    step: "03",
    title: "Deliver + notify",
    description:
      "Drop neatly packaged outputs into Slack, email, Notion, or your CLI with zero friction.",
    badge: "Ship",
  },
  {
    step: "04",
    title: "Measure + adapt",
    description:
      "Log execution stats, trace bottlenecks, and tweak thresholds as your workload scales.",
    badge: "Measure",
  },
];

const insightBadges = [
  {
    title: "MIT Licensed",
    detail: "Customize without legal gymnastics.",
  },
  {
    title: "Fast install",
    detail: "pip install -r requirements.txt",
  },
  {
    title: "Human-friendly",
    detail: "Readable scripts, no black boxes.",
  },
];

const highlightTraits = [
  {
    title: "Event-driven",
    detail: "React to file drops, inbox updates, or CRON signals instantly.",
  },
  {
    title: "Composable",
    detail: "Link scripts like Lego bricks without yak-shaving glue code.",
  },
  {
    title: "Observable",
    detail: "Every run logs stats so you can tune bottlenecks in minutes.",
  },
  {
    title: "Portable",
    detail: "Ship to Pi, laptops, or CI runners with identical configs.",
  },
];

const showcaseSnippet = `"""PyEveryday // File Organizer"""
from pathlib import Path
from collections import defaultdict

CATEGORY_MAP = {
  "images": {".png", ".jpg", ".gif"},
  "docs": {".pdf", ".docx", ".txt"},
  "media": {".mp4", ".mp3"},
}

def organize(directory: str) -> None:
  inbox = Path(directory)
  grouped = defaultdict(list)
  for file in inbox.iterdir():
    if not file.is_file():
      continue
    bucket = next((k for k, v in CATEGORY_MAP.items() if file.suffix in v), "other")
    grouped[bucket].append(file)

  for bucket, files in grouped.items():
    target = inbox / bucket
    target.mkdir(exist_ok=True)
    for file in files:
      file.rename(target / file.name)
    print(f"➤ {bucket} refreshed • {len(files)} items")
`;

const MAX_HISTORY = 60;

export default function Home() {
  const [commandIndex, setCommandIndex] = useState(0);
  const [typingText, setTypingText] = useState(terminalCommands[0]);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Launching PyEveryday studio...",
    "Syncing automation suites...",
  ]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(0);
  const [showcaseExpanded, setShowcaseExpanded] = useState(true);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [motionAllowed, setMotionAllowed] = useState(true);

  const liveCategory = scriptCategories[selectedCategory ?? 0];
  const codeLines = showcaseSnippet.trim().split("\n");

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setCommandIndex((prev) => (prev + 1) % terminalCommands.length);
    }, 5200);
    return () => window.clearInterval(rotation);
  }, []);

  useEffect(() => {
    const command = terminalCommands[commandIndex];
    setTypingText("");
    let i = 0;
    const typer = window.setInterval(() => {
      setTypingText(command.slice(0, i + 1));
      i += 1;
      if (i === command.length) {
        window.clearInterval(typer);
      }
    }, 30);
    return () => window.clearInterval(typer);
  }, [commandIndex]);

  const handleRunCommand = useCallback((command: string, status?: string) => {
    setTerminalHistory((prev) => [
      ...prev,
      `$ ${command}`,
      status ?? "✅ Completed without warnings",
    ]);
  }, []);

  const handleTerminalSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!terminalInput.trim()) return;
    handleRunCommand(terminalInput.trim());
    setTerminalInput("");
  };

  const handleQuickLaunch = (command: string) => {
    handleRunCommand(command, "⚡ Launching shortcut pipeline");
  };

  return (
    <div className="relative min-h-screen bg-[#05060c] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,183,255,0.08),transparent_35%),_radial-gradient(circle_at_80%_10%,rgba(94,234,212,0.08),transparent_35%)]" />
      <div className="grain-overlay absolute inset-0" />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#06070d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-gray-200">
              PyEveryday
            </span>
            <p className="hidden text-sm text-gray-400 sm:block">
              Automate, monitor, and ship your daily routines.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a
              href="https://github.com/Vaibhav2154/PyEveryday#readme"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-gray-200 transition hover:border-white/40"
            >
              Docs
            </a>
            <a
              href="https://github.com/Vaibhav2154/PyEveryday"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 text-sm font-semibold text-black"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 space-y-24 pb-24 pt-16">
        <section className="px-6">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gray-200">
                Built for personal ops
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                  Ship daily automations without rebuilding the scaffolding.
                </h1>
                <p className="max-w-2xl text-lg text-gray-300">
                  PyEveryday bundles focused Python scripts for automation,
                  productivity, and data wrangling—ready to remix, schedule, and
                  monitor from one calm surface.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <a
                  href="https://github.com/Vaibhav2154/PyEveryday"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-6 py-3 text-black transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Clone the repo
                </a>
                <a
                  href="https://github.com/Vaibhav2154/PyEveryday#readme"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-6 py-3 text-white transition hover:border-white"
                >
                  Read the docs
                </a>
                <button
                  className="rounded-full border border-white/20 px-6 py-3 text-white transition hover:border-white/60"
                  onClick={() =>
                    handleRunCommand(
                      "python automation/file_organizer.py --preview",
                      "📦 Organized 47 files in 1.2s"
                    )
                  }
                >
                  Preview a run
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center"
                  >
                    <p className="text-3xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/50 p-6 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>user@pyeveryday</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="mt-4 h-64 overflow-y-auto rounded-2xl border border-white/5 bg-black/40 p-5 text-sm font-mono text-gray-200">
                {terminalHistory.map((line, index) => (
                  <p
                    key={index}
                    className={
                      line.startsWith("$")
                        ? "text-cyan-300"
                        : "text-emerald-300"
                    }
                  >
                    {line}
                  </p>
                ))}
                <p className="mt-4 text-cyan-300">$ {typingText}</p>
              </div>
              <form
                onSubmit={handleTerminalSubmit}
                className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="font-mono text-cyan-300">$</span>
                <input
                  value={terminalInput}
                  onChange={(event) => setTerminalInput(event.target.value)}
                  placeholder={typingText}
                  className="flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-xs font-semibold text-black"
                >
                  Run
                </button>
              </form>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {quickLaunchCommands.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickLaunch(action.command)}
                    className="rounded-2xl border border-white/15 px-4 py-3 text-left text-xs text-gray-200 transition hover:border-cyan-300/60 hover:text-white"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[32px] border border-white/10 bg-black/45 p-8">
            <div className="flex flex-col gap-2 text-left sm:text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
                Why builders keep it installed
              </p>
              <h2 className="text-3xl font-semibold">
                Opinionated defaults without lock-in.
              </h2>
              <p className="text-lg text-gray-300">
                Lean scripts with comments and sensible parameters so you can
                swap in your own providers and APIs fast.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {highlightTraits.map((trait) => (
                <div
                  key={trait.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
                    {trait.title}
                  </p>
                  <p className="mt-3 text-base text-gray-100">{trait.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-6xl rounded-[28px] border border-white/10 bg-black/50 p-7">
            <div className="rounded-[28px] border border-white/10 bg-black/50 p-7">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
                Suites directory
              </p>
              <h3 className="mt-3 text-3xl font-semibold">
                Pick a stack, see the scripts.
              </h3>
              <p className="mt-2 text-gray-300">
                Hover or click to focus a suite.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {scriptCategories.map((category, index) => {
                  const isActive = selectedCategory === index;
                  return (
                    <button
                      key={category.name}
                      onMouseEnter={() => setSelectedCategory(index)}
                      onClick={() => setSelectedCategory(index)}
                      className={`rounded-3xl border px-5 py-5 text-left transition ${
                        isActive
                          ? "border-white/70 bg-white/10"
                          : "border-white/15 bg-black/40 hover:border-white/40"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-gray-400">
                        <span>{category.name}</span>
                        <span>
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-3xl">{category.emoji}</span>
                        <p className="text-sm text-gray-200">
                          {category.description}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-200">
                        {category.scripts.slice(0, 3).map((script) => (
                          <span
                            key={script}
                            className="rounded-full border border-white/15 px-3 py-1"
                          >
                            {script}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-6xl rounded-[28px] border border-white/10 bg-black/50 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
                  Automation flow
                </p>
                <h3 className="mt-2 text-3xl font-semibold">
                  From signal to delivery.
                </h3>
              </div>
              <p className="text-sm text-gray-300 max-w-xl">
                Trace the default choreography. Hover a phase to highlight; swap
                in your own providers without touching glue code.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {workflowPhases.map((phase, index) => {
                const isActive = activePhase === index;
                return (
                  <div
                    key={phase.step}
                    onMouseEnter={() => setActivePhase(index)}
                    onMouseLeave={() => setActivePhase(null)}
                    className={`rounded-3xl border p-5 transition ${
                      isActive
                        ? "border-cyan-300/80 bg-white/10"
                        : "border-white/10 bg-black/40 hover:border-cyan-200/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-semibold text-white/80">
                        {phase.step}
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-1 text-xs tracking-[0.35em] text-gray-200">
                        {phase.badge}
                      </span>
                    </div>
                    <h4 className="mt-4 text-xl font-semibold">
                      {phase.title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-300">
                      {phase.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-white/10 bg-black/50 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
                    Live snippet
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold">
                    Readable scripts, ready to remix.
                  </h3>
                </div>
                <button
                  onClick={() => setShowcaseExpanded((prev) => !prev)}
                  className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white"
                >
                  {showcaseExpanded ? "Hide" : "Show"}
                </button>
              </div>
              {showcaseExpanded && (
                <div className="mt-8 rounded-[24px] border border-white/10 bg-[#050a16] p-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 text-sm text-gray-400">
                    <span>file_organizer.py</span>
                    <span>Python 3.11</span>
                  </div>
                  <div className="relative mt-4 overflow-hidden rounded-2xl bg-black/60 p-5 font-mono text-sm">
                    <div className="absolute inset-y-4 left-0 w-12 select-none bg-white/5 text-right text-xs text-gray-500">
                      {codeLines.map((_, line) => (
                        <div key={line} className="pr-3 leading-6">
                          {line + 1}
                        </div>
                      ))}
                    </div>
                    <div className="ml-12 space-y-1 text-gray-100">
                      {codeLines.map((line, index) => (
                        <pre
                          key={index}
                          className="whitespace-pre-wrap leading-6"
                        >
                          {line}
                        </pre>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <button
                      className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-black"
                      onClick={() =>
                        handleRunCommand(
                          "python automation/file_organizer.py --preview",
                          "📦 Organized 47 files in 1.2s"
                        )
                      }
                    >
                      Run preview
                    </button>
                    <p className="text-sm text-gray-400">
                      Output syncs to the terminal log for quick inspection.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/55 p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
                Command journal
              </p>
              <h4 className="mt-2 text-2xl font-semibold">Recent dispatches</h4>
              <div className="mt-5 space-y-3">
                {[...terminalHistory]
                  .slice(-8)
                  .reverse()
                  .map((line, index) => (
                    <div
                      key={`${line}-${index}`}
                      className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-mono"
                    >
                      {line}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-6xl rounded-[28px] border border-white/10 bg-black/50 p-8">
            <div className="flex flex-col gap-2 text-left sm:text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
                Quick starts
              </p>
              <h3 className="text-3xl font-semibold">
                Fire off the everyday jobs.
              </h3>
              <p className="text-lg text-gray-300">
                Use the presets as-is or tailor the args to your workflow.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickLaunchCommands.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickLaunch(action.command)}
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-left text-sm text-gray-100 transition hover:border-cyan-300/60 hover:text-white"
                >
                  <p className="font-semibold">{action.label}</p>
                  <p className="mt-1 text-xs text-gray-400">{action.command}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/12 via-blue-500/12 to-transparent p-12 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">
              Ready when you are
            </p>
            <h2 className="mt-6 text-4xl font-semibold">
              Pull the repo, add your keys, let PyEveryday handle the grind.
            </h2>
            <p className="mt-4 text-lg text-gray-100">
              Runs anywhere Python feels at home—laptops, Pis, CI runners, and
              beyond.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/Vaibhav2154/PyEveryday"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white px-8 py-4 text-sm font-semibold tracking-wide text-black"
              >
                Clone repository
              </a>
              <a
                href="https://github.com/Vaibhav2154/PyEveryday#readme"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/40 px-8 py-4 text-sm font-semibold tracking-wide text-white transition hover:border-white"
              >
                Browse docs
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#06070d]/90 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-center text-sm text-gray-400 md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <p className="text-lg text-white">PyEveryday</p>
            <p>Open-source automation studio • © 2025</p>
          </div>
          <div className="flex justify-center gap-6 text-white/70 md:justify-end">
            <a
              href="https://github.com/Vaibhav2154/PyEveryday"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cyan-300"
            >
              GitHub
            </a>
            <a
              href="https://github.com/Vaibhav2154/PyEveryday#readme"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cyan-300"
            >
              README
            </a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
