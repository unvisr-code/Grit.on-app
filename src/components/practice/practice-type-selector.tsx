"use client";

import { Repeat, ListMusic, PlayCircle } from "lucide-react";
import type { PracticeType } from "@/types";

const PRACTICE_TYPES = [
  {
    id: "partial" as PracticeType,
    label: "부분 연습",
    icon: Repeat,
    description: "특정 구간 반복 연습",
    color: "blue",
  },
  {
    id: "routine" as PracticeType,
    label: "루틴",
    icon: ListMusic,
    description: "일상적인 연습",
    color: "green",
  },
  {
    id: "runthrough" as PracticeType,
    label: "런스루",
    icon: PlayCircle,
    description: "처음부터 끝까지 통주",
    color: "purple",
  },
];

interface PracticeTypeSelectorProps {
  selectedType: PracticeType;
  onSelectType: (type: PracticeType) => void;
}

export function PracticeTypeSelector({
  selectedType,
  onSelectType,
}: PracticeTypeSelectorProps) {
  return (
    <div className="mb-6">
      <p className="text-xs text-muted-foreground mb-2">연습 유형</p>
      <div className="grid grid-cols-3 gap-2">
        {PRACTICE_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onSelectType(type.id)}
              className={`p-3 rounded-xl border transition-all ${
                isSelected
                  ? type.color === "blue"
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : type.color === "green"
                      ? "bg-green-50 border-green-300 text-green-700"
                      : "bg-purple-50 border-purple-300 text-purple-700"
                  : "bg-card border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? "" : "opacity-60"}`} />
              <p className="text-xs font-medium">{type.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
