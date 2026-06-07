// 프롬프트 카드용 조회수·추천수 pill. 0인 항목은 숨김 — 노이즈 감소.

export default function PromptStats({
  views,
  recommends,
}: {
  views: number;
  recommends: number;
}) {
  if (views === 0 && recommends === 0) return null;
  return (
    <div className="flex gap-1.5 text-xs">
      {views > 0 && (
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          조회 {views.toLocaleString('ko-KR')}
        </span>
      )}
      {recommends > 0 && (
        <span className="rounded bg-rose-50 px-1.5 py-0.5 font-medium text-rose-700 dark:bg-rose-950/30 dark:text-rose-400">
          추천 {recommends.toLocaleString('ko-KR')}
        </span>
      )}
    </div>
  );
}
