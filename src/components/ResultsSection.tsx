import { useState } from 'react';
import { Button } from './ui/button';
import { WordResult } from '../types';
import { Copy, Check, Sparkles } from 'lucide-react';

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
    const text = results.map(r => `${r.word} (${r.length} letters, ${r.score} pts)`).join('\n');
    copyToClipboard(text);
  };

  const groupedResults = results.reduce((acc, result) => {
    const len = result.length;
    if (!acc[len]) acc[len] = [];
    acc[len].push(result);
    return acc;
  }, {} as Record<number, WordResult[]>);

  const sortedLengths = Object.keys(groupedResults).map(Number).sort((a, b) => b - a);

  if (!hasSearched) {
    return (
      <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
        <div className="py-8">
          <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">Ready to Unscramble</h2>
          <p className="text-slate-500">Enter letters above and click "Unscramble Words" to find possible words.</p>
        </div>
      </section>
    );
  }

  if (isSearching) {
    return (
      <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="flex items-center justify-center py-8">
          <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="ml-3 text-lg text-slate-600">Searching for words...</span>
        </div>
      </section>
    );
  }

  if (results.length === 0) {
    return (
      <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">No Words Found</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            No words found for "<span className="font-medium text-slate-700">{searchLetters}</span>". 
            Try fewer letters, remove filters, or use a wildcard (? or *).
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {results.length} Word{results.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-slate-500">
            From letters: <span className="font-mono font-semibold text-blue-600">{searchLetters}</span>
          </p>
        </div>
        <Button
          onClick={copyAllResults}
          variant="outline"
          className="flex items-center gap-2 border-2 border-slate-300 hover:bg-slate-50"
        >
          {copiedAll ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy All Results
            </>
          )}
        </Button>
      </div>

      {sortedLengths.map((length) => (
        <div key={length} className="mb-6 last:mb-0">
          <h3 className="text-lg font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-200">
            {length} Letter Words
            <span className="ml-2 text-sm font-normal text-slate-500">
              ({groupedResults[length].length} word{groupedResults[length].length !== 1 ? 's' : ''})
            </span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {groupedResults[length].map((result) => (
              <div
                key={result.word}
                className="group relative bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg p-3 transition-all cursor-pointer"
                onClick={() => copyToClipboard(result.word, result.word)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 group-hover:text-blue-700">
                    {result.word}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {result.score}
                  </span>
                </div>
                {copiedWord === result.word && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
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