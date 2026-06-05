import { TERMS, type GlossaryGroup } from '@/lib/glossary-data';

export const metadata = {
  title: 'AI 용어집 — 한국어로 정리한 30개 핵심 용어',
  description: '프롬프트·LLM·RAG·MCP·에이전트 등 AI를 활용하려면 알아야 할 핵심 용어를 한국어로 정리.',
};

const GROUPS: GlossaryGroup[] = ['기초', '모델', '사용 기법', '평가·안전', '최신 트렌드'];

const GROUP_TONE: Record<GlossaryGroup, string> = {
  '기초':         'border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900',
  '모델':         'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30',
  '사용 기법':    'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30',
  '평가·안전':    'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30',
  '최신 트렌드':  'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/30',
};

export default function Glossary() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">AI 용어집</h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
          AI를 잘 쓰려면 알아야 할 {TERMS.length}개 핵심 용어. 한국어로 정리,
          영어 원어와 함께. 그룹별 색으로 구분 — 기초부터 최신 트렌드까지.
        </p>
      </header>

      <nav className="flex flex-wrap gap-2">
        {GROUPS.map(g => (
          <a
            key={g}
            href={`#g-${g}`}
            className={`rounded-full border px-3 py-1 text-xs font-medium hover:opacity-80 ${GROUP_TONE[g]}`}
          >
            {g} <span className="text-slate-500">({TERMS.filter(t => t.group === g).length})</span>
          </a>
        ))}
      </nav>

      {GROUPS.map(group => {
        const terms = TERMS.filter(t => t.group === group);
        return (
          <section key={group} id={`g-${group}`} className="scroll-mt-20">
            <h2 className="mb-3 text-xl font-bold">{group}</h2>
            <div className="space-y-3">
              {terms.map(t => (
                <div
                  key={t.en}
                  className={`rounded border-2 p-4 ${GROUP_TONE[t.group]}`}
                >
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{t.ko}</h3>
                    <span className="text-xs text-slate-500">{t.en}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-200">{t.short}</p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{t.body}</p>
                  {t.example && (
                    <p className="mt-2 rounded bg-white/60 p-2 text-xs italic text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                      예: {t.example}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </article>
  );
}
