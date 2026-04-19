"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, X } from "lucide-react";
import type { EditorView } from "@codemirror/view";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { T } from "@/lib/typography";
import { getPromptIcon } from "@/lib/promptIcons";
import { cn } from "@/lib/utils";
import type { ApiErrorBody, PromptEditorProps } from "./types";
import VariableChipList from "./VariableChipList";

// Dynamic-import the CodeMirror wrapper so CM6 never ships in the server bundle.
const PromptEditorCM = dynamic(() => import("./PromptEditorCM"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded border border-input bg-muted/30">
      <Spinner className="size-5" />
    </div>
  ),
});

export default function PromptEditor({
  slug,
  displayLabel,
  initialYaml,
  defaultYaml: _defaultYaml,
  inputVariables,
  basedOnVersion,
  userModified,
  onSaved,
  onClose,
  compact = false,
  footerActions,
  mode: _mode = "full-yaml",
}: PromptEditorProps) {
  // mode !== "full-yaml" is a Phase 3 extension point — this plan treats it the same as "full-yaml".
  const [yaml, setYaml] = useState(initialYaml);
  const [savedYaml, setSavedYaml] = useState(initialYaml);
  const [saveError, setSaveError] = useState<ApiErrorBody | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const viewRef = useRef<EditorView | null>(null);

  const Icon = getPromptIcon(slug);

  const handleInsertVariable = useCallback((name: string) => {
    const view = viewRef.current;
    if (!view) return;
    const token = `{{${name}}}`;
    const head = view.state.selection.main.head;
    view.dispatch({
      changes: { from: head, insert: token },
      selection: { anchor: head + token.length },
    });
    view.focus();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/wiki-types/${slug}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptYaml: yaml }),
      });
      if (!res.ok) {
        let body: ApiErrorBody;
        try {
          body = (await res.json()) as ApiErrorBody;
        } catch {
          body = { error: `Save failed (${res.status})` };
        }
        // TODO(PE-04): map error codes
        setSaveError(body);
        setIsSaving(false);
        return;
      }
      const json = (await res.json()) as {
        ok: boolean;
        slug: string;
        basedOnVersion: number;
        warnings: string[];
      };
      setSavedYaml(yaml);
      onSaved?.({
        basedOnVersion: json.basedOnVersion,
        warnings: json.warnings ?? [],
      });
    } catch (e) {
      // TODO(PE-04): map error codes
      setSaveError({
        error: e instanceof Error ? e.message : "Save failed",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const isDirty = yaml !== savedYaml;

  return (
    <div className="flex flex-col gap-3">
      {/* Header (non-compact) */}
      {!compact ? (
        <header className="flex items-center gap-2.5">
          <Icon
            size={20}
            strokeWidth={1.5}
            style={{ color: "var(--prompt-wiki-icon-stroke)" }}
          />
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span
              style={{
                ...T.bodySmall,
                fontWeight: 600,
                color: "var(--heading-color)",
              }}
            >
              {displayLabel}
            </span>
            <Badge variant="secondary" className="text-[10px]">
              v{basedOnVersion}
            </Badge>
            {userModified ? (
              <Badge variant="secondary" className="text-[10px]">
                Customized
              </Badge>
            ) : null}
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </header>
      ) : null}

      {/* Editor + right pane */}
      <div
        className={cn(
          "grid gap-3",
          compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1fr_220px]",
        )}
      >
        <div className="min-h-[400px] overflow-hidden rounded border border-input bg-background">
          <PromptEditorCM
            value={yaml}
            onChange={setYaml}
            compact={compact}
            variables={inputVariables}
            onViewReady={(v) => {
              viewRef.current = v;
            }}
          />
        </div>
        {!compact ? (
          <aside className="min-w-0">
            <VariableChipList
              variables={inputVariables}
              onInsert={handleInsertVariable}
            />
          </aside>
        ) : null}
      </div>

      {compact ? (
        <Collapsible>
          <CollapsibleTrigger
            render={
              <button
                type="button"
                className="flex w-full items-center gap-1.5 rounded border border-input px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted"
              />
            }
          >
            <ChevronDown className="size-3.5" aria-hidden />
            {inputVariables.length} variable
            {inputVariables.length === 1 ? "" : "s"}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <VariableChipList
              variables={inputVariables}
              onInsert={handleInsertVariable}
            />
          </CollapsibleContent>
        </Collapsible>
      ) : null}

      {/* Save error (temporary; Plan 04 replaces with ValidationBanner) */}
      {saveError ? (
        <p className="text-sm text-destructive" role="alert">
          {saveError.code ? `[${saveError.code}] ` : ""}
          {saveError.error}
        </p>
      ) : null}

      {/* Footer */}
      {compact ? (
        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" disabled>
            Reset
          </Button>
          {footerActions}
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !isDirty}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" disabled>
            Reset
          </Button>
          {footerActions}
          {onClose ? (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          ) : null}
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !isDirty}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      )}
    </div>
  );
}
