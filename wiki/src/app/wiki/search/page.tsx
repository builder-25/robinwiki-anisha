"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import WikiSearchResults from "@/components/wiki/WikiSearchResults";

function WikiSearchPageInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const rawQ = sp.get("q") ?? "";
  const qTrim = rawQ.trim();

  useEffect(() => {
    if (!qTrim) router.replace("/wiki");
  }, [qTrim, router]);

  if (!qTrim) return null;

  return (
    <div
      className="wiki-search-page-shell flex w-full flex-col items-center"
      style={{
        paddingTop: 96,
        paddingBottom: 60,
        paddingLeft: 24,
        paddingRight: 24,
        boxSizing: "border-box",
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: 864 }}>
        <WikiSearchResults query={rawQ} />
      </div>
    </div>
  );
}

export default function WikiSearchPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex w-full justify-center p-8"
          style={{ color: "var(--wiki-title)" }}
        >
          Loading…
        </div>
      }
    >
      <WikiSearchPageInner />
    </Suspense>
  );
}
