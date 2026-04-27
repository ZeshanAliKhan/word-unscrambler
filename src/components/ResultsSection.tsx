import { useState } from 'react';
import { Check, Copy, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { WordResult } from '../types';

interface ResultsSectionProps {
  results: WordResult[];
  searchLetters: string;
  isSearching: boolean;
  hasSearched: boolean;
}

export function ResultsSection({ results, searchLetters, isSearching, hasSearched }: ResultsSectionProps) {
  const [copiedWord, setCopiedWord] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const copyToClipboard = async (text: string, word?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (word) {
        setCopiedWord(word);
        setTimeout(() => setCopiedWord(null), 2000);
      } else {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllResults = () => {
    const text = results.map((r) => `${r.word} (${r.length} letters, ${r.score} pts)`).join('\n');
    copyToClipboard(text);
  };

  const groupedResults = results.reduce((acc, result) => {
    const len = result.length;
    if (!acc[len]) acc[len] = [];
    acc[len].push(result);
    return acc;
  }, {} as Record<number, WordResult[]>);

  const sortedLengths = Object.keys(groupedResults).map(Number).sort((a, b) => b - a);
  const highestScoreWord = [...results].sort((a, b) => b.score - a.score || b.length - a.length)[0];
  const longestWord = [...results].sort((a, b) => b.length - a.length || a.word.localeCompare(b.word))[0];
  const shortestWord = [...results].sort((a, b) => a.length - b.length || a.word.localeCompare(b.word))[0];

  if (!hasSearched) {
    return (
      <section className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="py-6">
          <Sparkles className="mx-auto mb-4 h-14 w-14 text-stone-300" />
          <h2 className="mb-2 text-2xl font-semibold text-stone-800">Results will appear here</h2>
          <p className="text-stone-500">
            Enter letters above and click <span className="font-medium text-stone-700">Find Words</span> to generate grouped results.
          </p>
        </div>
      </section>
    );
  }

  if (isSearching) {
    return (
      <section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-center py-8">
          <svg className="h-8 w-8 animate-spin text-emerald-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="ml-3 text-lg text-stone-600">Searching for words...</span>
        </div>
      </section>
    );
  }

  if (results.length === 0) {
    return (
      <section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
            <svg className="h-8 w-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-semibold text-stone-800">No words found</h2>
          <p className="mx-auto max-w-md text-stone-500">
            No words matched <span className="font-medium text-stone-700">{searchLetters}</span>. Try fewer letters, remove filters, or use a wildcard (? or *).
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">
            {results.length} Word{results.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-stone-500">
            From letters: <span className="font-mono font-semibold text-emerald-700">{searchLetters}</span>
          </p>
        </div>
        <Button
          onClick={copyAllResults}
          variant="outline"
          className="flex items-center gap-2 border-2 border-stone-300 hover:bg-stone-50"
        >
          {copiedAll ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy All Results
            </>
          )}
        </Button>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Longest match</p>
          <p className="mt-2 text-xl font-bold text-stone-900">{longestWord?.word ?? '-'}</p>
          <p className="text-sm text-stone-500">{longestWord?.length ?? 0} letters</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Highest score</p>
          <p className="mt-2 text-xl font-bold text-stone-900">{highestScoreWord?.word ?? '-'}</p>
          <p className="text-sm text-stone-500">{highestScoreWord?.score ?? 0} points</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Shortest match</p>
          <p className="mt-2 text-xl font-bold text-stone-900">{shortestWord?.word ?? '-'}</p>
          <p className="text-sm text-stone-500">{shortestWord?.length ?? 0} letters</p>
        </div>
      </div>

      {sortedLengths.map((length) => (
        <div key={length} className="mb-6 last:mb-0">
          <h3 className="mb-3 border-b border-stone-200 pb-2 text-lg font-semibold text-stone-800">
            {length} Letter Words
            <span className="ml-2 text-sm font-normal text-stone-500">
              ({groupedResults[length].length} word{groupedResults[length].length !== 1 ? 's' : ''})
            </span>
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {groupedResults[length].map((result) => (
              <div
                key={result.word}
                className="group relative cursor-pointer rounded-xl border border-stone-200 bg-stone-50 p-3 transition-all hover:border-emerald-300 hover:bg-emerald-50"
                onClick={() => copyToClipboard(result.word, result.word)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800 group-hover:text-emerald-700">
                    {result.word}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    {result.score}
                  </span>
                </div>
                {copiedWord === result.word && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                    Copied!
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
