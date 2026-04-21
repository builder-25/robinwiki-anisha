// Type definitions for the Knowledge Graph. Mirrors the node/edge shape used
// in robinwiki's GET /graph.

export type GraphNodeType = "wiki" | "fragment" | "person";

/** Sub-type for wikis (Belief, Objective, etc.) or fragments (Fact, Idea, etc.) */
export type GraphNodeSubtype = string;

export type GraphNode = {
  id: string;
  label: string;
  type: GraphNodeType;
  size: number;
  /** Wiki or fragment sub-type label. Drives node color. */
  subtype?: GraphNodeSubtype;
  /** Optional slug/key for entity page navigation. Falls back to id. */
  lookupKey?: string;
};

export type GraphEdge = {
  source: string;
  target: string;
  edgeType: "filing" | "wikilink" | "mention";
};

export type GraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

