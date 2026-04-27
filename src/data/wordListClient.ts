const REMOTE_WORD_LIST_URL = "https://files.ciinemaapk.com.br/Tools%20Site%20Data/W-Unscrambler/word-list.json";
const LOCAL_WORD_LIST_URL = "/word-list.json";

let cachedWordList: string[] | null = null;
let cachedWordListPromise: Promise<string[]> | null = null;

async function fetchWordList(url: string): Promise<string[]> {
  const response = await fetch(url, {
    cache: "force-cache",
    credentials: "omit",
  });

  if (!response.ok) {
    throw new Error(`Failed to load word list from ${url}`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || !data.every((item) => typeof item === "string")) {
    throw new Error(`Invalid word list payload from ${url}`);
  }

  return data;
}

export async function getWordList(): Promise<string[]> {
  if (cachedWordList) {
    return cachedWordList;
  }

  if (cachedWordListPromise) {
    return cachedWordListPromise;
  }

  cachedWordListPromise = (async () => {
    try {
      cachedWordList = await fetchWordList(LOCAL_WORD_LIST_URL);
      return cachedWordList;
    } catch {
      cachedWordList = await fetchWordList(REMOTE_WORD_LIST_URL);
      return cachedWordList;
    } finally {
      cachedWordListPromise = null;
    }
  })();

  return cachedWordListPromise;
}

export function preloadWordList() {
  void getWordList();
}
