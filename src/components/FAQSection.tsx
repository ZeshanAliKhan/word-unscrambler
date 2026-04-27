import { useState } from 'react';
import { FAQItem } from '../types';

const FAQ_DATA: FAQItem[] = [
  {
    question: 'What does a word unscrambler do?',
    answer: 'It takes the letters you enter and shows real words that can be built from them, while respecting repeats and any wildcard tiles you use.',
  },
  {
    question: 'How should I use this tool for the fastest results?',
    answer: 'Start with your full letter set and run the search once. If the list is too wide, add a prefix, suffix, contains pattern, or target length to narrow it quickly.',
  },
  {
    question: 'Can I use a blank tile or unknown letter?',
    answer: 'Yes. Use ? or * as a wildcard. Each wildcard can stand in for one missing letter.',
  },
  {
    question: 'Does it work for word games and anagrams?',
    answer: 'Yes. It is useful for anagrams, letter puzzles, spelling drills, and board-style word games. Dictionary acceptance can still vary from one game to another.',
  },
  {
    question: 'Why might a word be missing?',
    answer: 'The tool uses a local word list, so some rare, niche, or game-specific entries may not appear. That is normal for browser-based dictionaries.',
  },
  {
    question: 'Does the tool need a backend or paid API?',
    answer: 'No. It runs in the browser with a local word list, which keeps it fast and free to use.',
  },
  {
    question: 'Is this word unscrambler free?',
    answer: 'Yes. There is no signup wall and no paid API behind the search.',
  },
  {
    question: 'What is the difference between a word unscrambler and an anagram solver?',
    answer: 'A word unscrambler finds as many valid words as it can from your letters. An anagram solver is usually stricter and often focuses on rearranging every letter into an exact full match.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="word-unscrambler-faq" className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 text-2xl font-bold text-stone-900">Frequently asked questions</h2>
      <div className="space-y-3">
        {FAQ_DATA.map((faq, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-stone-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between bg-white p-4 text-left transition-colors hover:bg-stone-50"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-stone-800">{faq.question}</span>
              <svg
                className={`h-5 w-5 text-stone-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 leading-7 text-stone-600">
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
            "mainEntity": FAQ_DATA.map((faq) => ({
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
