const RELATED_TOOLS = [
  { name: 'Start A New Search', description: 'Jump back to the main letter input tool', href: '#word-unscrambler-tool' },
  { name: 'Advanced Filters', description: 'Review how prefix, suffix, contains, and length filters work', href: '#advanced-filters' },
  { name: 'Wildcard Guide', description: 'See how blank tiles can expand your word options', href: '#wildcard-guide' },
  { name: 'Results Help', description: 'Understand grouped results, scores, and copy actions', href: '#results-guide' },
  { name: 'Unscramble Tips', description: 'Use quick solving tactics when you are stuck', href: '#unscramble-tips' },
  { name: 'Puzzle Uses', description: 'Read common ways people use a word unscrambler', href: '#puzzle-uses' },
  { name: 'FAQ', description: 'Open the frequently asked questions section', href: '#word-unscrambler-faq' },
  { name: 'How It Works', description: 'Learn how the built-in word matching logic works', href: '#how-it-works' },
];

const NETWORK_LINKS = [
  {
    name: 'Letters to Words',
    description: 'Use the companion tool when you want another layout for turning letters into words.',
    href: 'https://zeshan-letters-to-words.netlify.app/',
  },
  {
    name: 'Unscramble Letters',
    description: 'Open the sister solver for another wildcard-friendly interface in the same network.',
    href: 'https://zeshan-unscramble-letters-377.netlify.app/',
  },
  {
    name: 'Live Site Directory',
    description: 'Browse the wider network of GitHub Pages projects, Netlify tools, mirrors, and support posts.',
    href: 'https://zeshanalikhan.github.io/creator-app-hub-site/pages/site-directory.html',
  },
  {
    name: 'Blooket Login Guide',
    description: 'A related learning-page property from the same owned network.',
    href: 'https://zeshanalikhan.github.io/blooket-login-guide/',
  },
];

export function RelatedTools() {
  return (
    <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Related Word Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {RELATED_TOOLS.map((tool) => (
          <a
            key={tool.name}
            href={tool.href}
            className="block p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all group"
          >
            <h3 className="font-semibold text-slate-700 group-hover:text-blue-700 mb-1">
              {tool.name}
            </h3>
            <p className="text-sm text-slate-500">{tool.description}</p>
          </a>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4">More live pages in this network</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {NETWORK_LINKS.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              className="block p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all group"
            >
              <h4 className="font-semibold text-slate-700 group-hover:text-blue-700 mb-1">
                {tool.name}
              </h4>
              <p className="text-sm text-slate-500">{tool.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
