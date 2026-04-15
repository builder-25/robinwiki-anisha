"use client";

import Link from "next/link";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BookOpen, FileCode, UserRound } from "lucide-react";
import WikiSearchBar from "@/components/wiki/WikiSearchBar";

const CHIP = {
  fontFamily: "var(--font-inter), Inter, sans-serif",
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: "-0.0288px",
  color: "rgba(140, 140, 140, 0.7)",
} as const;

function HomeSearchBlock() {
  const pathname = usePathname();
  const router = useRouter();
  const sp = useSearchParams();
  const qFromUrl = sp.get("q") ?? "";
  const [draft, setDraft] = useState("");
  const prevPathRef = useRef("");

  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;

    if (pathname.startsWith("/wiki/search")) {
      setDraft(qFromUrl);
      return;
    }
    if (
      prev.startsWith("/wiki/search") &&
      !pathname.startsWith("/wiki/search")
    ) {
      setDraft("");
    }
  }, [pathname, qFromUrl]);

  const submit = () => {
    const t = draft.trim();
    if (!t) return;
    router.push(`/wiki/search?q=${encodeURIComponent(t)}`);
  };

  return (
    <div
      className="w-full max-w-[591px] min-w-0 overflow-hidden"
      style={{
        background: "var(--wiki-chat-bg)",
        borderRadius: 12,
        boxSizing: "border-box",
      }}
    >
      <WikiSearchBar
        layout="stacked"
        embedded
        value={draft}
        onChange={setDraft}
        onSubmit={submit}
        placeholder="Who is the president?"
      />
    </div>
  );
}

function FilterChip({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center justify-center gap-1"
      style={{
        padding: "2px 8px",
        background: "var(--wiki-search-chip-bg)",
        textDecoration: "none",
      }}
    >
      <span className="flex h-3 w-3 shrink-0 items-center justify-center text-[rgba(140,140,140,0.7)]">
        {icon}
      </span>
      <span style={CHIP}>{label}</span>
    </Link>
  );
}

/** Figma ROBIN 217:35527 — title + chat search + filter chips (wiki home only) */
export default function WikiHomeHero() {
  return (
    <div
      className="flex w-full flex-col items-center"
      style={{ gap: 30, maxWidth: 864, marginLeft: "auto", marginRight: "auto" }}
    >
      <div
        className="flex items-center justify-center"
        style={{ padding: 10, boxSizing: "border-box" }}
      >
        <h1
          className="wiki-home-title m-0 text-center"
          style={{
            fontFamily:
              "var(--font-source-serif-4), 'Source Serif 4', 'Source Serif Pro', serif",
            fontSize: 40,
            fontWeight: 400,
            lineHeight: "35px",
            color: "var(--wiki-title)",
            maxWidth: "100%",
            paddingLeft: 8,
            paddingRight: 8,
            boxSizing: "border-box",
            whiteSpace: "normal",
          }}
        >
          Antellopia, Returns!
        </h1>
      </div>

      <div
        className="flex w-full min-w-0 flex-col items-stretch"
        style={{ gap: 8, maxWidth: 591 }}
      >
        <Suspense
          fallback={
            <div
              className="h-[88px] w-full max-w-[591px] shrink-0"
              style={{ background: "var(--wiki-chat-bg)", borderRadius: 12 }}
              aria-hidden
            />
          }
        >
          <HomeSearchBlock />
        </Suspense>

        <div
          className="flex flex-wrap items-start justify-start"
          style={{ gap: 8 }}
        >
          <FilterChip
            href="/wiki/people"
            label="People"
            icon={<UserRound size={12} strokeWidth={1.5} aria-hidden />}
          />
          <FilterChip
            href="/wiki/article"
            label="Fragments"
            icon={<FileCode size={12} strokeWidth={1.5} aria-hidden />}
          />
          <FilterChip
            href="/wiki/research"
            label="Wiki"
            icon={<BookOpen size={12} strokeWidth={1.5} aria-hidden />}
          />
        </div>
      </div>
    </div>
  );
}
