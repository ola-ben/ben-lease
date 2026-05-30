import { useCallback, useEffect, useState } from 'react';

const SAVED_KEY = 'bl.saved';
const VIEWED_KEY = 'bl.viewed';
const MAX_VIEWED = 10;

const read = (key: string): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as string[]) : [];
  } catch {
    return [];
  }
};

const write = (key: string, value: string[]) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(`bl.${key}`));
  } catch {
    /* ignore */
  }
};

const useStoredList = (key: string) => {
  const [ids, setIds] = useState<string[]>(() => read(key));

  useEffect(() => {
    const sync = () => setIds(read(key));
    window.addEventListener(`bl.${key}`, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(`bl.${key}`, sync);
      window.removeEventListener('storage', sync);
    };
  }, [key]);

  return ids;
};

export const useSaved = () => {
  const ids = useStoredList(SAVED_KEY);
  const toggle = useCallback(
    (id: string) => {
      const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
      write(SAVED_KEY, next);
    },
    [ids],
  );
  return { ids, toggle, isSaved: (id: string) => ids.includes(id) };
};

export const useRecentlyViewed = () => {
  const ids = useStoredList(VIEWED_KEY);
  return { ids };
};

export const addRecentlyViewed = (id: string) => {
  const current = read(VIEWED_KEY);
  const next = [id, ...current.filter((x) => x !== id)].slice(0, MAX_VIEWED);
  write(VIEWED_KEY, next);
};
