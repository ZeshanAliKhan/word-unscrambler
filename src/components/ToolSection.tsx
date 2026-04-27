import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Search, X } from 'lucide-react';

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
  { label: 'CAT', value: 'CAT' },
  { label: 'DOG', value: 'DOG' },
  { label: 'STARE', value: 'STARE' },
  { label: 'PUZZLE', value: 'PUZZLE' },
  { label: 'GARDEN', value: 'GARDEN' },
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
    <section id="word-unscrambler-tool" className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label htmlFor="letters" className="text-base font-semibold text-slate-700 mb-2 block">
            Enter Your Letters
          </Label>
          <div className="relative">
            <Input
              id="letters"
              type="text"
              value={letters}
              onChange={handleLettersChange}
              placeholder="Enter letters, like TCA or DGO"
              className="text-xl h-14 px-4 pr-24 border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              aria-describedby="letters-help"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              {letters.length}/15
            </span>
          </div>
          <p id="letters-help" className="text-sm text-slate-500 mt-2">
            Use <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">?</code> or <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">*</code> as a blank tile/wildcard.
          </p>
          {error && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-slate-600 mb-3">Quick Examples:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_SEARCHES.map((example) => (
              <button
                key={example.value}
                type="button"
                onClick={() => handleExampleClick(example.value)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200 hover:border-slate-300"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            <svg className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Advanced Filters
          </button>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <Label htmlFor="startsWith" className="text-sm font-medium text-slate-600 mb-1.5 block">
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
              <Label htmlFor="endsWith" className="text-sm font-medium text-slate-600 mb-1.5 block">
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
              <Label htmlFor="contains" className="text-sm font-medium text-slate-600 mb-1.5 block">
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
              <Label htmlFor="wordLength" className="text-sm font-medium text-slate-600 mb-1.5 block">
                Word Length
              </Label>
              <select
                id="wordLength"
                value={wordLength}
                onChange={(e) => setWordLength(e.target.value)}
                className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
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

        <div className="mb-6">
          <Label htmlFor="sortBy" className="text-sm font-medium text-slate-600 mb-1.5 block">
            Sort Results By
          </Label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-64 h-10 px-3 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            {isSearching ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Unscramble Words
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="px-6 py-3 text-lg font-medium rounded-xl border-2 border-slate-300 hover:bg-slate-50 flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Clear
          </Button>
        </div>
      </form>
    </section>
  );
}
