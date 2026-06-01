-- Supabase 초기 스키마 — Authentication 활성화 후 SQL Editor에서 한 번 실행.
-- (Supabase Dashboard → SQL Editor → New query → 이 파일 내용 붙여넣기 → Run)

-- =====================================================
-- 1. 프롬프트별 통계 테이블 (views + recommend 카운터)
-- =====================================================
create table if not exists public.prompt_stats (
  slug text primary key,
  view_count bigint not null default 0,
  recommend_count bigint not null default 0,
  updated_at timestamptz not null default now()
);

-- =====================================================
-- 2. 사용자별 추천 기록 (중복 추천 방지 + 토글)
-- =====================================================
create table if not exists public.recommendations (
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, slug)
);

create index if not exists recommendations_slug_idx
  on public.recommendations (slug);

-- =====================================================
-- 3. Row-Level Security
-- =====================================================
alter table public.prompt_stats enable row level security;
alter table public.recommendations enable row level security;

-- 통계는 누구나 읽기. 쓰기는 RPC(security definer)만.
drop policy if exists "prompt_stats readable by all" on public.prompt_stats;
create policy "prompt_stats readable by all"
  on public.prompt_stats for select using (true);

-- 추천 기록은 누구나 읽기 (집계용). 본인 것만 추가·삭제.
drop policy if exists "recommendations readable by all" on public.recommendations;
create policy "recommendations readable by all"
  on public.recommendations for select using (true);

drop policy if exists "recommendations user can insert own" on public.recommendations;
create policy "recommendations user can insert own"
  on public.recommendations for insert with check (auth.uid() = user_id);

drop policy if exists "recommendations user can delete own" on public.recommendations;
create policy "recommendations user can delete own"
  on public.recommendations for delete using (auth.uid() = user_id);

-- =====================================================
-- 4. RPC: incr_view — 익명 호출 가능, 원자적 +1
-- =====================================================
create or replace function public.incr_view(p_slug text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  insert into public.prompt_stats (slug, view_count, updated_at)
  values (p_slug, 1, now())
  on conflict (slug)
  do update set
    view_count = public.prompt_stats.view_count + 1,
    updated_at = now()
  returning view_count into new_count;
  return new_count;
end;
$$;

grant execute on function public.incr_view(text) to anon, authenticated;

-- =====================================================
-- 5. RPC: toggle_recommend — 로그인 필요, 추천 추가/취소
-- =====================================================
create or replace function public.toggle_recommend(p_slug text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_existed boolean := false;
  v_count bigint;
begin
  if v_user_id is null then
    raise exception '로그인이 필요해요' using errcode = '28000';
  end if;

  -- 기존 추천 있으면 삭제 (취소)
  delete from public.recommendations
    where user_id = v_user_id and slug = p_slug;
  if found then
    v_existed := true;
  end if;

  if v_existed then
    -- 카운트 -1 (0 이하 방지)
    update public.prompt_stats
      set recommend_count = greatest(0, recommend_count - 1),
          updated_at = now()
      where slug = p_slug
      returning recommend_count into v_count;
  else
    -- 신규 추천 추가 + 카운트 +1
    insert into public.recommendations (user_id, slug) values (v_user_id, p_slug);
    insert into public.prompt_stats (slug, recommend_count, updated_at)
      values (p_slug, 1, now())
      on conflict (slug)
      do update set
        recommend_count = public.prompt_stats.recommend_count + 1,
        updated_at = now()
      returning recommend_count into v_count;
  end if;

  return json_build_object(
    'recommended', not v_existed,
    'count', coalesce(v_count, 0)
  );
end;
$$;

grant execute on function public.toggle_recommend(text) to authenticated;
