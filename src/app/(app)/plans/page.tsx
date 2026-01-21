"use client";

import { useState } from "react";
import { Calendar, Target, CheckCircle, Circle, Sparkles } from "lucide-react";
import { weekDays, mockWeeklyData, initialTodayPlan, mockAISuggestions } from "@/data";
import type { TodayPlanItem } from "@/types";

const today = new Date().getDay();

export default function PlansPage() {
  const [todayPlan, setTodayPlan] = useState<TodayPlanItem[]>(initialTodayPlan);

  const togglePlanComplete = (id: string) => {
    setTodayPlan((prev) =>
      prev.map((plan) =>
        plan.id === id ? { ...plan, completed: !plan.completed } : plan
      )
    );
  };

  const completedCount = todayPlan.filter((p) => p.completed).length;
  const totalDuration = todayPlan.reduce((acc, p) => acc + p.duration, 0);
  const completedDuration = todayPlan
    .filter((p) => p.completed)
    .reduce((acc, p) => acc + p.duration, 0);

  return (
    <div className="px-4 py-6 max-w-lg mx-auto pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">연습 계획</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          주간 연습 계획을 확인하세요
        </p>
      </div>

      {/* Weekly Calendar */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-sm">이번 주</h3>
          <Calendar className="w-4 h-4 text-gray-400" />
        </div>
        <div className="grid grid-cols-7 gap-2">
          {mockWeeklyData.map((data, index) => {
            const isToday = index === today;
            return (
              <div key={index} className="text-center">
                <div
                  className={`text-xs mb-1 ${isToday ? "font-bold text-primary" : "text-gray-500"}`}
                >
                  {weekDays[index]}
                </div>
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    data.completed
                      ? "bg-primary text-white shadow-sm"
                      : isToday
                        ? "bg-primary/10 text-primary ring-2 ring-primary"
                        : data.minutes > 0
                          ? "bg-gray-100 text-gray-600"
                          : "bg-gray-50 text-gray-300"
                  }`}
                >
                  {data.minutes > 0 ? data.minutes : "-"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Plan */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">오늘의 계획</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {completedCount}/{todayPlan.length} 완료
            </span>
            <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full">
              {completedDuration}/{totalDuration}분
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(completedDuration / totalDuration) * 100}%` }}
          />
        </div>

        <div className="space-y-3">
          {todayPlan.map((plan) => (
            <div
              key={plan.id}
              onClick={() => togglePlanComplete(plan.id)}
              className={`rounded-xl p-4 border transition-all cursor-pointer active:scale-[0.99] ${
                plan.completed
                  ? "bg-gray-50 border-gray-100"
                  : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {plan.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 hover:text-primary transition-colors" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`font-medium text-base ${
                        plan.completed ? "text-gray-400 line-through" : "text-gray-900"
                      }`}
                    >
                      {plan.piece}
                    </h4>
                    {plan.priority === "high" && !plan.completed && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded-full">
                        중요
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm mt-0.5 ${
                      plan.completed ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {plan.measures}
                  </p>
                  {!plan.completed && plan.note && (
                    <p className="text-xs text-primary/70 mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {plan.note}
                    </p>
                  )}
                </div>
                <div
                  className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md ${
                    plan.completed
                      ? "text-gray-400 bg-gray-100"
                      : "text-slate-500 bg-slate-50"
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  {plan.duration}분
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">AI 분석 및 추천</h3>
        {mockAISuggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`rounded-xl p-4 border ${
              suggestion.priority === "high"
                ? "bg-orange-50 border-orange-200"
                : suggestion.priority === "medium"
                  ? "bg-blue-50 border-blue-200"
                  : "bg-primary/5 border-primary/10"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  suggestion.priority === "high"
                    ? "bg-orange-100"
                    : suggestion.priority === "medium"
                      ? "bg-blue-100"
                      : "bg-primary/10"
                }`}
              >
                <span className="text-sm">
                  {suggestion.type === "tempo" ? "⏱️" : suggestion.type === "dynamics" ? "🎵" : "📊"}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{suggestion.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
