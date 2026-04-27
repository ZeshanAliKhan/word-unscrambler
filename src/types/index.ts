export interface WordResult {
  word: string;
  length: number;
  score: number;
}

export interface Filters {
  startsWith: string;
  endsWith: string;
  contains: string;
  wordLength: string;
  sortBy: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}