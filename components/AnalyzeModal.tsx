'use client';

import { useEffect, useState } from 'react';
import AdSlot from '@/components/AdSlot';

// 결과 분석 모달 — 3·2·1 카운트다운 → (작업 미완료면) 분석중 → 결과 보기.
// 광고를 노출하면서 최소 노출 시간을 확보. done이 false면 카운트다운 후에도 대기.
const COUNT_START = 3;

export default function AnalyzeModal({
  open,
  done,
  onConfirm,
  confirmLabel = '결과 보기',
}: {
  open: boolean;
  done: boolean;          // 내부 작업 완료 여부 (즉시 결과면 항상 true)
  onConfirm: () => void;  // 결과 보기 클릭
  confirmLabel?: string;
}) {
  const [count, setCount] = useState(COUNT_START);

  useEffect(() => {
    if (!open) {
      setCount(COUNT_START);
      return;
    }
    setCount(COUNT_START);
    const id = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(id);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [open]);

  if (!open) return null;

  const counting = count > 0;     // 3·2·1 진행 중
  const ready = !counting && done; // 카운트 끝 + 작업 완료

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="analyze-modal-title"
    >
      <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl dark:bg-slate-900">
        <h3
          id="analyze-modal-title"
          className="text-xl font-bold text-slate-900 dark:text-slate-100"
        >
          {counting ? '결과 분석중' : ready ? '분석 완료' : '분석중'}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {counting
            ? '곧 결과를 보여드릴게요.'
            : ready
              ? '결과가 준비됐어요. 닫으면 보여드릴게요.'
              : '거의 다 됐어요. 잠시만 기다려주세요.'}
        </p>

        {/* 광고 */}
        <div className="mt-4">
          <AdSlot />
        </div>

        {/* 인디케이터 — 카운트다운 숫자 / 스피너 / 완료 체크 */}
        <div className="mt-4 flex h-12 items-center justify-center">
          {counting ? (
            <span className="text-4xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              {count}
            </span>
          ) : ready ? (
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ) : (
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500 dark:border-slate-700 dark:border-t-emerald-400" />
          )}
        </div>

        <button
          onClick={onConfirm}
          disabled={!ready}
          className={
            ready
              ? 'mt-6 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700'
              : 'mt-6 w-full cursor-not-allowed rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-500'
          }
        >
          {ready ? confirmLabel : '분석중...'}
        </button>
      </div>
    </div>
  );
}
