"use client";

import { useState } from "react";

export function useTitleFilter<T>(items: T[], getTitle: (item: T) => string) {
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) =>
    getTitle(item).toLowerCase().includes(query.toLowerCase())
  );

  return { query, setQuery, filtered };
}
