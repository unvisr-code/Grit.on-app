import Link from "next/link";
import { Clock, Calendar, TrendingUp, Play, Zap } from "lucide-react";
import { StatsCard, QuoteCard, DailyGoal } from "@/components/app";
import { mockDrillCards, mockUser, mockStats, hasAIAnalysis, getGreeting, getTotalPlanMinutes } from "@/data";

const totalPlanMinutes = getTotalPlanMinutes(mockDrillCards);

export default function HomePage() {
  const greeting = getGreeting();

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-2">
        <div>
          <h1 className="text-2xl font-semibold text-foreground leading-tight">
            {greeting},<br />
            <span className="text-primary">{mockUser.name}</span>님
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            오늘도 훌륭한 연주를 기대해요
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-secondary border-2 border-background shadow-soft flex items-center justify-center overflow-hidden">
            <span className="text-lg">🎹</span>
        </div>
      </div>

      {/* Daily Goal - Hero Section */}
      <div className="mb-6">
        <DailyGoal
          completed={mockStats.todayMinutes}
          target={mockStats.dailyGoal}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatsCard
          icon={Clock}
          value={mockStats.totalHours}
          unit="시간"
          label="총 연습"
        />
        <StatsCard
          icon={Calendar}
          value={mockStats.weekSessions}
          unit="세션"
          label="이번 주"
        />
        <StatsCard
          icon={TrendingUp}
          value={mockStats.streakDays}
          unit="일"
          label="연속"
        />
      </div>

      {/* Quote Card */}
      <div className="mb-6">
        <QuoteCard />
      </div>

      {/* Start Practice Button */}
      <Link
        href="/practice"
        className="group relative flex items-center justify-center gap-3 w-full bg-gradient-to-r from-primary to-violet-600 text-primary-foreground rounded-2xl py-4 text-lg font-bold shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/50 mb-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-2xl" />
        <Play className="w-6 h-6 fill-white" />
        <span className="relative">연습 시작하기</span>
      </Link>

      {/* Today's Practice Plan - Drill Cards */}
      {hasAIAnalysis && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <h3 className="text-base font-bold text-foreground">오늘의 연습 플랜</h3>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                {totalPlanMinutes}분
              </span>
            </div>
            <Link href="/plans" className="text-xs font-medium text-primary hover:text-primary/80">
              전체 보기 &rarr;
            </Link>
          </div>
          <div className="space-y-2">
            {mockDrillCards.map((drill, index) => (
              <Link
                key={drill.id}
                href={`/practice?type=partial&measures=${drill.measures}&tempo=${drill.tempo}`}
                className="block rounded-xl p-4 bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all active:scale-[0.99]"
              >
                <div className="flex items-start gap-3">
                  {/* 아이콘 */}
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-lg">{drill.icon}</span>
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5 truncate">{drill.song}</p>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-foreground text-sm">{drill.title}</p>
                      <span className="text-[10px] text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">
                        {drill.recurrence}회 반복
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{drill.measures}</p>
                    <p className="text-xs text-primary font-medium">→ {drill.action}</p>
                  </div>

                  {/* 템포 & 시간 */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-foreground">♩={drill.tempo}</p>
                    <p className="text-xs text-muted-foreground">{drill.duration}분</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 시간 캡 안내 */}
          <p className="text-xs text-muted-foreground text-center mt-3">
            💡 과부하 방지를 위해 {totalPlanMinutes}분 이내로 구성됨
          </p>
        </div>
      )}

    </div>
  );
}