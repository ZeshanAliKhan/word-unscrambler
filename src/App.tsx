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
    <div className="min-h-screen bg-stone-50">
      <section className="border-b border-stone-200 bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 py-5 md:py-7">
          <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
            <div className="order-2 xl:order-1">
              <Header />
            </div>
            <div className="order-1 xl:order-2">
              <ToolSection onSearch={handleSearch} onClear={handleClear} isSearching={isSearching} />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-6 md:py-7">
        {loadError ? (
          <section className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {loadError}
          </section>
        ) : null}
        <ResultsSection results={results} searchLetters={searchLetters} isSearching={isSearching} hasSearched={hasSearched} />
        <SEOContent />
        <FAQSection />
        <RelatedTools />
        <Footer />
      </main>
    </div>
  );
}
