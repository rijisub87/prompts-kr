'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

// 사이클: light → dark → system → light. localStorage 'theme' 키에 저장.
// FOUC 방지는 layout.tsx <head>의 인라인 스크립트가 처리.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      setTheme(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // 시스템 모드일 때 OS 설정 변화 따라가기
  useEffect(() => {
    if (!mounted || theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      document.documentElement.classList.toggle('dark', mq.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [theme, mounted]);

  if (!mounted) {
    // 서버 렌더링 시점에 시스템 테마 모름 — placeholder
    return (
      <button
        aria-label="테마 전환"
        className="inline-flex h-7 w-7 items-center justify-center rounded text-base"
      >
        🌓
      </button>
    );
  }

  function cycle() {
    setTheme(
      theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light',
    );
  }

  const icon = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🖥️';
  const label =
    theme === 'light' ? '라이트' : theme === 'dark' ? '다크' : '시스템';

  return (
    <button
      onClick={cycle}
      aria-label={`테마: ${label} (클릭해서 전환)`}
      title={`테마: ${label}`}
      className="inline-flex h-7 w-7 items-center justify-center rounded text-base hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <span aria-hidden>{icon}</span>
    </button>
  );
}
