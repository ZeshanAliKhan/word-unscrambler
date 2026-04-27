import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ToolSection } from './components/ToolSection';
import { ResultsSection } from './components/ResultsSection';
import { SEOContent } from './components/SEOContent';
import { FAQSection } from './components/FAQSection';
import { RelatedTools } from './components/RelatedTools';
import { Footer } from './components/Footer';
import { Filters, WordResult } from './types';
import { getWordList, preloadWordList } from './data/wordListClient';
import { unscrambleWords } from './utils/wordMatcher';

export default function App() {
  const [results, setResults] = useState<WordResult[]>([]);
  const [searchLetters, setSearchLetters] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    preloadWordList();
  }, []);

  const handleSearch = useCallback(async (letters: string, filters: Filters) => {
    setIsSearching(true);
    setHasSearched(true);
    setSearchLetters(letters);

    try {
      setLoadError('');
      const wordList = await getWordList();
      const foundWords = unscrambleWords(letters, filters, wordList);
      setResults(foundWords);
    } catch (error) {
      console.error(error);
      setResults([]);
      setLoadError('Could not load the word list right now. Please try again in a moment.');
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setResults([]);
    setSearchLetters('');
    setHasSearched(false);
    setLoadError('');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <ToolSection onSearch={handleSearch} onClear={handleClear} isSearching={isSearching} />
        {loadError ? (
          <section className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {loadError}
          </section>
        ) : null}
        <ResultsSection results={results} searchLetters={searchLetters} isSearching={isSearching} hasSearched={hasSearched} />
        <div className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Wildcard tip</h2>
          <p className="text-sm leading-6 text-slate-600">
            If you are missing one letter, try a wildcard like <code className="rounded bg-white px-1.5 py-0.5">?</code> or <code className="rounded bg-white px-1.5 py-0.5">*</code>. It can unlock many more word combinations.
          </p>
        </div>
        <SEOContent />
        <div className="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Result sorting tip</h2>
          <p className="text-sm leading-6 text-slate-600">
            Sort by score when you want stronger game moves, or sort by longest when you are trying to stretch a small set of letters into bigger words.
          </p>
        </div>
        <FAQSection />
        <RelatedTools />
        <Footer />
      </main>
    </div>
  );
}
