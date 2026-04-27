import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ToolSectionProps {
  onSearch: (letters: string, filters: {
    startsWith: string;
    endsWith: string;
    contains: string;
    wordLength: string;
    sortBy: string;
  }) => void;
  onClear: () => void;
  isSearching: boolean;
}

const EXAMPLE_SEARCHES = [
  { label: 'LISTEN', value: 'LISTEN' },
  { label: 'GARDEN', value: 'GARDEN' },
  { label: 'PLANET', value: 'PLANET' },
  { label: 'ORANGE', value: 'ORANGE' },
  { label: 'SCHOOL', value: 'SCHOOL' },
  { label: '?ATE', value: '?ATE' },
];

export function ToolSection({ onSearch, onClear, isSearching }: ToolSectionProps) {
  const [letters, setLetters] = useState('');
  const [startsWith, setStartsWith] = useState('');
  const [endsWith, setEndsWith] = useState('');
  const [contains, setContains] = useState('');
  const [wordLength, setWordLength] = useState('any');
  const [sortBy, setSortBy] = useState('longest');
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const validateInput = (value: string): boolean => {
    if (!value.trim()) {
      setError('Please enter some letters to unscramble.');
      return false;
    }
    const cleaned = value.replace(/[^a-zA-Z?*]/g, '');
    if (cleaned.length === 0) {
      setError('Only letters, ? and * are allowed.');
      return false;
    }
    if (cleaned.length > 15) {
      setError('Maximum 15 characters allowed.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput(letters)) return;
    onSearch(letters, { startsWith, endsWith, contains, wordLength, sortBy });
  };

  const handleExampleClick = (value: string) => {
    setLetters(value);
    setError('');
    setTimeout(() => {
      onSearch(value, { startsWith, endsWith, contains, wordLength, sortBy });
    }, 10);
  };

  const handleClear = () => {
    setLetters('');
    setStartsWith('');
    setEndsWith('');
    setContains('');
    setWordLength('any');
    setSortBy('longest');
    setError('');
    onClear();
  };

  const handleLettersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z?*]/g, '');
    if (value.length <= 15) {
      setLetters(value);
      setError('');
    }
  };

  return (
    <section id="word-unscrambler-tool" className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Search from letters</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">Find words fast</h2>
            </div>
            <div className="hidden rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-right text-xs text-stone-600 sm:block">
              <div>Grouped by length</div>
              <div>Click any word to copy</div>
            </div>
          </div>

          <Label htmlFor="letters" className="mb-2 block text-base font-semibold text-stone-700">
            Enter letters or wildcard tiles
          </Label>
          <div className="relative">
            <Input
              id="letters"
              type="text"
              value={letters}
              onChange={handleLettersChange}
              placeholder="Try letters like LISTEN or ?ATE"
              className="h-14 border-2 border-stone-300 px-4 pr-24 text-xl transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              aria-describedby="letters-help"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">
              {letters.length}/15
            </span>
          </div>
          <p id="letters-help" className="mt-2 text-sm text-stone-500">
            Use <code className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-700">?</code> or <code className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-700">*</code> as a blank tile. The tool cleans symbols automatically and keeps duplicate letters honest.
          </p>
          {error && (
            <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </div>

        <div className="mb-5">
          <p className="mb-3 text-sm font-medium text-stone-600">Quick examples</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_SEARCHES.map((example) => (
              <button
                key={example.value}
                type="button"
                onClick={() => handleExampleClick(example.value)}
                className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-300 hover:bg-stone-200"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            <svg className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {showAdvanced ? 'Hide filters' : 'Show filters'}
          </button>
        </div>

        {showAdvanced && (
          <div className="mb-5 grid grid-cols-1 gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label htmlFor="startsWith" className="mb-1.5 block text-sm font-medium text-stone-600">
                Starts With
              </Label>
              <Input
                id="startsWith"
                type="text"
                value={startsWith}
                onChange={(e) => setStartsWith(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                placeholder="e.g., A"
                className="h-10"
                maxLength={5}
              />
            </div>
            <div>
              <Label htmlFor="endsWith" className="mb-1.5 block text-sm font-medium text-stone-600">
                Ends With
              </Label>
              <Input
                id="endsWith"
                type="text"
                value={endsWith}
                onChange={(e) => setEndsWith(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                placeholder="e.g., ING"
                className="h-10"
                maxLength={5}
              />
            </div>
            <div>
              <Label htmlFor="contains" className="mb-1.5 block text-sm font-medium text-stone-600">
                Contains
              </Label>
              <Input
                id="contains"
                type="text"
                value={contains}
                onChange={(e) => setContains(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                placeholder="e.g., QU"
                className="h-10"
                maxLength={5}
              />
            </div>
            <div>
              <Label htmlFor="wordLength" className="mb-1.5 block text-sm font-medium text-stone-600">
                Word Length
              </Label>
              <select
                id="wordLength"
                value={wordLength}
                onChange={(e) => setWordLength(e.target.value)}
                className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-stone-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              >
                <option value="any">Any length</option>
                <option value="2">2 letters</option>
                <option value="3">3 letters</option>
                <option value="4">4 letters</option>
                <option value="5">5 letters</option>
                <option value="6">6 letters</option>
                <option value="7">7 letters</option>
                <option value="8">8 letters</option>
                <option value="9">9+ letters</option>
              </select>
            </div>
          </div>
        )}

        <div className="mb-5">
          <Label htmlFor="sortBy" className="mb-1.5 block text-sm font-medium text-stone-600">
            Sort Results By
          </Label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-stone-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 md:w-64"
          >
            <option value="longest">Longest words first</option>
            <option value="shortest">Shortest words first</option>
            <option value="alpha">A-Z</option>
            <option value="score">Highest score first</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            disabled={isSearching}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 text-lg font-semibold text-white shadow-sm transition-all hover:bg-emerald-700"
          >
            {isSearching ? (
              <>
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Searching...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Find Words
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="flex items-center gap-2 rounded-xl border-2 border-stone-300 px-6 py-3 text-lg font-medium hover:bg-stone-50"
          >
            <X className="h-5 w-5" />
            Clear
          </Button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Wildcard help</p>
            <p className="mt-1 text-sm leading-6 text-stone-600">Use one blank tile when you know most letters, and two only when the search would otherwise miss too many options.</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Filter tip</p>
            <p className="mt-1 text-sm leading-6 text-stone-600">If the result list gets noisy, start with a known prefix, suffix, or target length before you search again.</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Copy flow</p>
            <p className="mt-1 text-sm leading-6 text-stone-600">Click any result chip to copy one word, or use the full copy button if you want the whole list in one shot.</p>
          </div>
        </div>
      </form>
    </section>
  );
}
