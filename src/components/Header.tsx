const BONUS_LINK = "https://www.profitablecpmratenetwork.com/j9f627innq?key=be46e17df9e34aa3b5b8e77e88a34740";

export function Header() {
  return (
    <header className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-7">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Free browser tool
        </span>
        <span className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600">
          Longer words first
        </span>
        <span className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600">
          Wildcards supported
        </span>
      </div>

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-stone-900 md:text-5xl">
        Word Unscrambler
      </h1>

      <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600 md:text-lg">
        Turn mixed letters into real words, then narrow the list by length, score, prefix, suffix, or a known middle pattern. It is built for fast puzzle work, cleaner board-game searches, and everyday spelling practice.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-sm font-semibold text-stone-800">Best for quick checks</p>
          <p className="mt-1 text-sm leading-6 text-stone-600">Enter letters once and scan grouped results without digging through a long page first.</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-sm font-semibold text-stone-800">Flexible search</p>
          <p className="mt-1 text-sm leading-6 text-stone-600">Use wildcards, starts-with, ends-with, contains, length, or score-based sorting when you already know part of the answer.</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-sm font-semibold text-stone-800">No signup friction</p>
          <p className="mt-1 text-sm leading-6 text-stone-600">The tool runs in the browser with a local word list, so it stays fast and simple on desktop or mobile.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href="#word-unscrambler-tool"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Open The Tool
        </a>
        <a
          href={BONUS_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
        >
          Explore Bonus Offers
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </header>
  );
}
