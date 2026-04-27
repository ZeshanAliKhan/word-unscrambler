export function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="text-center">
          <h1 className="mb-3 text-4xl font-bold text-slate-800 md:text-5xl">
            Word Unscrambler
          </h1>
          <p className="mx-auto mb-2 max-w-2xl text-lg text-slate-600">
            Unscramble letters, find words, solve anagrams, and discover word ideas for puzzles and word games.
          </p>
          <p className="text-sm text-slate-500">
            <span className="inline-flex items-center gap-1">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free to use
            </span>
            <span className="mx-2">&bull;</span>
            <span className="inline-flex items-center gap-1">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No signup required
            </span>
            <span className="mx-2">&bull;</span>
            <span className="inline-flex items-center gap-1">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Works in your browser
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}
