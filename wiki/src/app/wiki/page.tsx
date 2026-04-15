"use client";

import FeaturedArticle from "@/components/wiki/FeaturedArticle";
import RecentlyUpdated from "@/components/wiki/RecentlyUpdated";
import BrowseByType from "@/components/wiki/BrowseByType";
import WikiFragments from "@/components/wiki/WikiFragments";
import WikiHomeHero from "@/components/wiki/WikiHomeHero";

export default function WikiArticlePage() {
  return (
    <div className="wiki-page-wrapper wiki-home-page flex w-full flex-col items-center">
      <WikiHomeHero />

      {/* Figma 217:35526 — 104px gap below hero (y 203 → 307) */}
      <div
        className="wiki-cards-container wiki-home-cards"
        style={{
          width: 920,
          maxWidth: "calc(100% - 48px)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div className="wiki-cards-row">
          <div style={{ flex: 1, minWidth: 0 }}>
            <FeaturedArticle />
          </div>
          <RecentlyUpdated />
        </div>

        <BrowseByType />

        <WikiFragments />
      </div>
    </div>
  );
}
