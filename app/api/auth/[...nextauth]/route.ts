// NextAuth v5 — handlers를 root auth.ts에서 export. 이 라우트는 단순 위임.
import { handlers } from '@/auth';
export const { GET, POST } = handlers;
