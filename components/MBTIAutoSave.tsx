'use client';

import { useEffect } from 'react';

// 결과 페이지 마운트 시 1회 자동 저장. 로그인 X면 401 → 조용히 무시.
// sessionStorage 키로 같은 결과 페이지 새로고침 시 중복 저장 방지.
export default function MBTIAutoSave({ type }: { type: string }) {
  useEffect(() => {
    const key = `mbti_saved_${type}_${new Date().toISOString().slice(0, 10)}`;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      // sessionStorage 거부 모드 — 그대로 진행
    }
    fetch('/api/mbti', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    })
      .then(r => {
        if (r.ok) {
          try { sessionStorage.setItem(key, '1'); } catch {}
        }
      })
      .catch(() => {});
  }, [type]);

  return null;
}
