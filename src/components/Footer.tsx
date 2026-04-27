export function Footer() {
  return (
    <footer className="mt-8 rounded-2xl bg-slate-800 p-6 text-slate-300 md:p-8">
      <div className="mb-6">
        <h2 className="mb-3 text-xl font-bold text-white">Important Disclaimer</h2>
        <p className="text-sm leading-relaxed text-slate-400">
          This word unscrambler is designed for educational, puzzle-solving, and word-learning purposes. Word lists can vary between dictionaries and games, so a word shown by this tool may not always be accepted in every word game. Always check the official dictionary or rules for the game you are playing.
        </p>
      </div>
      <div className="border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Word Unscrambler. Free to use. No signup required.</p>
      </div>
    </footer>
  );
}
