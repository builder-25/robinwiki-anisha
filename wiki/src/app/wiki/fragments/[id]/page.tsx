"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { type CSSProperties } from "react";
import { T, FONT } from "@/lib/typography";
import {
  WikiEntityArticle,
  WikiSectionH2,
} from "@/components/wiki/WikiEntityArticle";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useFragment } from "@/hooks/useFragment";
import type { FragmentWithContentResponseSchema } from "@/lib/generated/types.gen";

type FragmentData = FragmentWithContentResponseSchema & {
  backlinks?: Array<{ id: string; name: string; type: string }>;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function FragmentInfobox({ fragment }: { fragment: FragmentData }) {
  const label: CSSProperties = {
    ...T.micro,
    fontWeight: 700,
    color: "var(--wiki-infobox-title)",
    margin: 0,
  };

  const body: CSSProperties = {
    ...T.micro,
    color: "var(--wiki-infobox-text)",
    opacity: 0.7,
    margin: 0,
  };

  return (
    <aside
      className="wiki-aside-infobox"
      style={{
        position: "relative",
        width: 217,
        flexShrink: 0,
        border: "1px solid var(--wiki-card-border)",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxSizing: "border-box",
        alignSelf: "flex-start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <p style={label}>Type</p>
        <p style={body}>{fragment.type}</p>
      </div>

      {fragment.tags.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <p style={label}>Tags</p>
          <p style={body}>{fragment.tags.join(", ")}</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <p style={label}>Created</p>
        <p style={body}>{formatDate(fragment.createdAt)}</p>
      </div>
    </aside>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <p
      style={{
        ...T.bodySmall,
        fontFamily: FONT.SANS,
        fontStyle: "italic",
        color: "var(--wiki-count)",
        margin: "12px 0 0 0",
      }}
    >
      {text}
    </p>
  );
}

function EntryOriginSection({ entryId }: { entryId: string }) {
  const bodyStyle = {
    ...T.bodySmall,
    color: "var(--wiki-article-text)",
    lineHeight: 1.6,
  };
  return (
    <section style={{ width: "100%" }}>
      <WikiSectionH2 title="Entry origin" count={1} />
      <ul
        style={{
          ...bodyStyle,
          listStyle: "decimal",
          paddingLeft: 20,
          margin: "12px 0 0 0",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <li>
          <Link
            href={`/wiki/entries/${entryId}`}
            style={{
              color: "var(--wiki-fragment-link)",
              textDecoration: "underline",
              textDecorationSkipInk: "none",
            }}
          >
            View source entry
          </Link>
        </li>
      </ul>
    </section>
  );
}

function BacklinksSection({ backlinks }: { backlinks: Array<{ id: string; name: string; type: string }> }) {
  return (
    <section style={{ width: "100%" }}>
      <WikiSectionH2 title="Wikis" count={backlinks.length} />
      {backlinks.length === 0 ? (
        <EmptyState text="Not filed in any wiki" />
      ) : (
        <ul
          style={{
            ...T.bodySmall,
            color: "var(--wiki-article-text)",
            lineHeight: 1.6,
            listStyle: "decimal",
            paddingLeft: 20,
            margin: "12px 0 0 0",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {backlinks.map((bl) => (
            <li key={bl.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <Link
                  href={`/wiki/${bl.id}`}
                  style={{
                    color: "var(--wiki-fragment-link)",
                    textDecoration: "underline",
                    textDecorationSkipInk: "none",
                  }}
                >
                  {bl.name}
                </Link>
                <Badge
                  variant="outline"
                  className="rounded-full"
                  style={{
                    backgroundColor: "#f5f5f5",
                    color: "#545353",
                    borderColor: "#d1d5db",
                    padding: "2px 10px",
                    ...T.micro,
                  }}
                >
                  {bl.type}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function FragmentBottomSections({ fragment }: { fragment: FragmentData }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%" }}>
      <EntryOriginSection entryId={fragment.entryId} />
      <BacklinksSection backlinks={fragment.backlinks ?? []} />
    </div>
  );
}

export default function FragmentPage() {
  const { id } = useParams<{ id: string }>();
  const { data: fragment, isLoading, error } = useFragment(id);

  const bodyStyle = {
    ...T.bodySmall,
    color: "var(--wiki-article-text)",
    lineHeight: 1.6,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (error || !fragment) {
    return (
      <div className="p-6">
        <h1 style={T.h1}>Fragment not found</h1>
        <p style={{ ...T.bodySmall, color: "var(--wiki-article-text)", marginTop: 8 }}>
          This fragment could not be loaded. It may have been deleted or you may not have access.
        </p>
      </div>
    );
  }

  const paragraphs = fragment.content.split(/\n\n+/).filter(Boolean);

  return (
    <WikiEntityArticle
      chipLabel="Fragment"
      title={fragment.title}
      infobox={{ kind: "simple", typeLabel: "Fragment", showSettings: false }}
      renderCustomInfobox={() => <FragmentInfobox fragment={fragment} />}
      customBottomSections={<FragmentBottomSections fragment={fragment} />}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12, ...bodyStyle }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ margin: 0 }}>
            {p}
          </p>
        ))}
      </div>
    </WikiEntityArticle>
  );
}
