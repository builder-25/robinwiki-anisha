"use client";

import { Laptop } from "lucide-react";
import {
  WikiBiographyBlock,
  WikiDesktopH4Lorem,
  WikiEntityArticle,
  WikiIntroLead,
  WikiProgressMarkersSection,
  WikiSectionH2,
} from "@/components/wiki/WikiEntityArticle";

export default function WikiSkillPage() {
  const bodyStyle = {
    fontFamily: "var(--font-inter), Inter, sans-serif" as const,
    fontSize: 14,
    lineHeight: "22px" as const,
    color: "var(--wiki-article-text)",
  };

  return (
    <WikiEntityArticle
      chipIcon={Laptop}
      chipLabel="Skill"
      title="Build a $2M ARR business by December 2026 — without raising."
      titleEllipsis
      infobox={{ kind: "extended", typeValue: "Voice", showSettings: true }}
    >
      <WikiIntroLead />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <WikiSectionH2 title="The Goal" />
        <div style={bodyStyle}>
          <WikiBiographyBlock />
        </div>
        <WikiDesktopH4Lorem />
      </div>
      <WikiProgressMarkersSection variant="project" />
    </WikiEntityArticle>
  );
}
