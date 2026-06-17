import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '프롬프트 한국이 수집하는 정보, 쿠키·광고(Google AdSense) 사용, 제3자 서비스, 이용자 권리와 문의 방법을 안내합니다.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <article className="prose prose-sm max-w-none dark:prose-invert">
      <h1>개인정보처리방침</h1>
      <p>
        프롬프트 한국(이하 &lsquo;사이트&rsquo;)은 이용자의 개인정보를 중요하게 생각하며,
        수집·이용·보관·제공에 관한 사항을 아래와 같이 안내합니다. 최종 개정일: 2026-06-17.
      </p>

      <h2>1. 수집하는 정보</h2>
      <ul>
        <li>
          <strong>로그인 정보(선택):</strong> 카카오 계정으로 로그인하면 카카오가 제공하는
          식별자·닉네임과, 동의 시 이메일을 받습니다. 추천(좋아요)·테스트 결과 저장 등
          로그인 기능을 위해서만 사용합니다.
        </li>
        <li>
          <strong>이용 기록:</strong> 프롬프트 조회수·추천수, 테스트 시작 수 등 집계용 통계.
          개인을 식별하지 않는 합산 수치입니다.
        </li>
        <li>
          <strong>브라우저 저장(localStorage):</strong> 테마(다크모드), 즐겨찾기, 최근 본 프롬프트,
          사주 입력값 등은 이용자 기기에만 저장되며 서버로 전송되지 않습니다.
        </li>
        <li>
          <strong>AI 기능 입력:</strong> &lsquo;AI에게 바로 물어보기&rsquo;, &lsquo;카카오톡 리포트&rsquo;
          등 AI 기능을 사용할 때 입력한 내용은 응답 생성을 위해 AI 제공사(Anthropic)로 전송됩니다.
          민감한 개인정보는 입력하지 마세요.
        </li>
      </ul>

      <h2>2. 쿠키 및 광고</h2>
      <p>
        사이트는 Google AdSense를 통해 광고를 게재합니다. Google을 포함한 제3자 광고 사업자는
        쿠키를 사용해 이용자의 방문 기록을 바탕으로 맞춤 광고를 제공할 수 있습니다.
      </p>
      <ul>
        <li>
          Google의 광고 쿠키 사용은{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">
            Google 광고 정책
          </a>
          을 따릅니다.
        </li>
        <li>
          이용자는{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">
            Google 광고 설정
          </a>
          에서 맞춤 광고를 끄거나,{' '}
          <a href="https://www.aboutads.info/choices" target="_blank" rel="noreferrer">
            aboutads.info
          </a>
          에서 제3자 쿠키 사용을 거부할 수 있습니다.
        </li>
        <li>대부분의 브라우저 설정에서 쿠키를 차단·삭제할 수 있습니다.</li>
      </ul>

      <h2>3. 제3자 서비스</h2>
      <p>사이트는 다음 서비스를 이용하며, 각 서비스의 개인정보 처리방침이 적용됩니다.</p>
      <ul>
        <li>Supabase — 인증·데이터베이스</li>
        <li>Vercel — 호스팅·트래픽 처리</li>
        <li>Google AdSense — 광고 게재</li>
        <li>Anthropic — AI 응답 생성(입력 내용 전송)</li>
        <li>카카오 — 소셜 로그인·메시지 전송</li>
      </ul>

      <h2>4. 보관 및 파기</h2>
      <p>
        로그인 계정·추천·테스트 결과는 회원이 이용하는 동안 보관하며, 회원 탈퇴 또는 삭제 요청 시
        지체 없이 파기합니다. 브라우저에 저장된 정보는 이용자가 직접 삭제할 수 있습니다.
      </p>

      <h2>5. 이용자의 권리</h2>
      <p>
        이용자는 본인 정보의 열람·정정·삭제·처리정지를 요청할 수 있으며, 아래 문의처로 연락하면
        지체 없이 조치합니다.
      </p>

      <h2>6. 문의</h2>
      <p>
        개인정보 관련 문의:{' '}
        <a href="mailto:rijisub@naver.com">rijisub@naver.com</a>
      </p>
    </article>
  );
}
