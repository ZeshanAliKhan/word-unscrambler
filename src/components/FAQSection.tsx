import { useState } from 'react';
import { FAQItem } from '../types';

const FAQ_DATA: FAQItem[] = [
  {
    question: 'What is a word unscrambler?',
    answer: 'A word unscrambler is a tool that rearranges letters and finds possible words that can be made from those letters.',
  },
  {
    question: 'How do I unscramble letters?',
    answer: 'Enter your letters into the tool, use optional filters if needed, and click Unscramble Words. The tool will show words that can be made from your letters.',
  },
  {
    question: 'Can I use wildcards?',
    answer: 'Yes. You can use ? or * as wildcard characters. Each wildcard can represent one missing or blank letter.',
  },
  {
    question: 'Can this tool find words for word games?',
    answer: 'Yes. This tool can help find word ideas for word games, puzzles, anagrams, and classroom activities. However, every game may use a different dictionary.',
  },
  {
    question: 'Does this word unscrambler work offline?',
    answer: 'The tool works in the browser using a local word list after the page loads. It does not require a paid API or backend.',
  },
  {
    question: 'Why are some words missing?',
    answer: 'The first version uses a built-in word list. Some rare words may not appear. The word list can be expanded later with a larger free dictionary file.',
  },
  {
    question: 'Is this word unscrambler free?',
    answer: 'Yes. This word unscrambler is free to use and does not require signup.',
  },
  {
    question: 'What is the difference between a word unscrambler and an anagram solver?',
    answer: 'A word unscrambler finds words from a set of letters. An anagram solver usually focuses on rearranging all letters to form a new word or phrase. Many tools can do both.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="word-unscrambler-faq" className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {FAQ_DATA.map((faq, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-slate-700">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-slate-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-slate-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQ_DATA.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}
