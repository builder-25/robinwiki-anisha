"use client";

import { useEffect, useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { yaml } from "@codemirror/lang-yaml";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";

export interface PromptEditorCMProps {
  value: string;
  onChange: (v: string) => void;
  onViewReady?: (view: EditorView) => void;
  compact?: boolean;
}

export default function PromptEditorCM({
  value,
  onChange,
  onViewReady,
  compact = false,
}: PromptEditorCMProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const html = document.documentElement;
    const read = () =>
      setTheme(html.dataset.theme === "dark" ? "dark" : "light");
    read();
    const obs = new MutationObserver((muts) => {
      for (const m of muts) if (m.attributeName === "data-theme") read();
    });
    obs.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const extensions = useMemo(() => {
    const base = [yaml(), EditorView.lineWrapping, EditorState.tabSize.of(2)];
    return theme === "dark" ? [...base, oneDark] : base;
  }, [theme]);

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
        searchKeymap: false,
        autocompletion: false,
        dropCursor: true,
        allowMultipleSelections: false,
      }}
      theme={theme === "dark" ? "dark" : "light"}
      height={compact ? "320px" : "100%"}
      minHeight={compact ? "320px" : "400px"}
      maxHeight={compact ? "60vh" : "70vh"}
      onCreateEditor={(view) => onViewReady?.(view)}
    />
  );
}
