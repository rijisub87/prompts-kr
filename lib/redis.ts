// Upstash Redis (REST 클라이언트 — Vercel serverless 친화).
// env vars: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
// 미설정 시 NullRedis로 fallback — 빌드·배포가 깨지지 않음 (단, 카운트는 0/null 반환).

import { Redis } from '@upstash/redis';

const hasEnv =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

// Upstash가 없을 때 쓰는 no-op 구현. API 모양만 같으면 됨.
class NullRedis {
  async incr() { return 0; }
  async decr() { return 0; }
  async get<T>() { return null as T | null; }
  async sismember() { return 0; }
  async sadd() { return 0; }
  async srem() { return 0; }
  pipeline() {
    const ops: unknown[] = [];
    const self = {
      get() { ops.push(null); return self; },
      sismember() { ops.push(0); return self; },
      async exec() { return ops; },
    };
    return self;
  }
}

export const redis: Redis | NullRedis = hasEnv
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : new NullRedis();

// 키 네이밍 헬퍼 — 한곳에서 관리하면 마이그레이션이 쉬움.
export const k = {
  views:           (slug: string) => `views:${slug}`,
  recommendCount:  (slug: string) => `rec:count:${slug}`,
  recommendUsers:  (slug: string) => `rec:users:${slug}`,
};
