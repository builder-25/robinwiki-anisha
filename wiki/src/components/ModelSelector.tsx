"use client";

import { useMemo, useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import type { AiModel } from "@/hooks/useModelPreferences";

interface ModelSelectorProps {
  label: string;
  description?: string;
  models: AiModel[];
  value: string;
  onChange: (modelId: string) => void;
  filterFn?: (model: AiModel) => boolean;
  disabled?: boolean;
}

function getDisplayName(model: AiModel): string {
  return model.name;
}

function getProviderId(modelId: string): string {
  return modelId.split("/")[0] ?? modelId;
}

export function ModelSelector({
  label,
  description,
  models,
  value,
  onChange,
  filterFn,
  disabled = false,
}: ModelSelectorProps) {
  const [inputValue, setInputValue] = useState("");

  const filtered = useMemo(() => {
    if (filterFn) return models.filter(filterFn);
    return models;
  }, [models, filterFn]);

  // Group by provider for display
  const grouped = useMemo(() => {
    const groups: Record<string, AiModel[]> = {};
    for (const model of filtered) {
      const provider = getProviderId(model.id);
      if (!groups[provider]) groups[provider] = [];
      groups[provider].push(model);
    }
    return groups;
  }, [filtered]);

  const currentModel = filtered.find((m) => m.id === value);
  const displayValue = currentModel
    ? getDisplayName(currentModel)
    : value || "Select a model";

  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {description && (
        <p className="text-[11px] text-muted-foreground/70">{description}</p>
      )}
      <Combobox
        value={value}
        onValueChange={(val) => {
          if (val) onChange(val as string);
        }}
        inputValue={inputValue}
        onInputValueChange={(val) => setInputValue(val)}
      >
        <ComboboxInput
          placeholder={displayValue}
          disabled={disabled}
          className="h-8 text-xs"
        />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No models found</ComboboxEmpty>
            {Object.entries(grouped).map(([, providerModels]) =>
              providerModels.map((model) => (
                <ComboboxItem key={model.id} value={model.id}>
                  <span className="truncate text-xs">
                    {getDisplayName(model)}
                  </span>
                </ComboboxItem>
              )),
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
