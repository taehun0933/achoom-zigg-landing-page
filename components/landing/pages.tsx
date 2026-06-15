"use client";

import {
  useReveal,
  Marquee,
  Lockup,
  Kinetic,
  NoticeCarousel,
  AuditionBanners,
} from "./shared";
import {
  FEEDBACK,
  KEYFUNCS,
  LINKS,
  type BannerDto,
  type PublicStats,
  type Tab,
} from "./data";

function fmt(n: number | null | undefined) {
  if (n == null) return "—";
  return n.toLocaleString("ko-KR");
}

/* ---------------- MAIN ---------------- */
export function MainPage({
  banners,
  go,
}: {
  banners: BannerDto[];
  go: (t: Tab) => void;
}) {
  const ref = useReveal();
  return (
    <div className="page" ref={ref}>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bigz">ZIGG</div>
        <div className="hero-grid">
          <div className="hero-copy">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="zmark" src="/landing/zigg-icon.png" alt="ZIGG" />
            <div className="kick">공연예술 지원 서비스 ‘ZIGG’</div>
            <h1>
              공연예술의 모든 순간을
              <br />
              <span className="accent">당신과 함께</span>합니다
            </h1>
            <p className="sub">
              메신저로 흩어지던 영상 피드백을 한 눈에.
              <br />
              연습부터 오디션까지, 아티스트의 모든 순간을 ZIGG에서.
            </p>
            <div className="hero-tags">
              <span className="tag">TEAM SPACE</span>
              <span className="tag">AUDITION</span>
              <span className="tag">CHALLENGE</span>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div className="hero-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/landing/hero-studio.png"
                alt="ZIGG x GODITION 연습 현장"
              />
            </div>
            {FEEDBACK.map((f, i) => (
              <div
                key={i}
                className="fb-float"
                style={{
                  left: i === 0 ? "-60px" : "auto",
                  right: i === 0 ? "auto" : i === 1 ? "-50px" : "-20px",
                  top: i === 0 ? "58%" : i === 1 ? "40%" : "auto",
                  bottom: i === 2 ? "4%" : "auto",
                }}
              >
                <div
                  className="fb"
                  style={{
                    animation: `bob ${5 + i * 0.5}s ease-in-out ${
                      i * 0.5
                    }s infinite`,
                  }}
                >
                  <div className="meta">
                    <span className="t">{f.t}</span>
                    <span className="who">{f.who}</span>
                  </div>
                  <div className="msg">{f.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      {/* NOTICE (API) — directly below hero */}
      <NoticeCarousel banners={banners} />

      {/* SERVICE */}
      <section className="svc">
        <div className="wrap">
          <div
            className="section-label reveal"
            style={{ display: "block", textAlign: "center", marginBottom: 60 }}
          >
            SERVICE
          </div>
          <div className="svc-grid">
            <div className="svc-icon reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/landing/zigg-icon.png" alt="ZIGG" />
            </div>
            <div>
              <div className="section-label reveal">엔터테인먼트의 A부터 Z까지</div>
              <h2 className="reveal">
                <b>ZIGG</b>는 공연예술 분야의 메신저 앱에서
                <br />
                경험하던 불편함을 개선합니다.
              </h2>
              <p className="hl reveal">
                영상의 피드백을 한 눈에 확인할 수 있게끔 기획되었습니다.
              </p>
              <p className="reveal">
                기존에 피드백을 주고받는 과정에서 느꼈던 불편함들을{" "}
                <span className="b">새로운 방식</span>으로 풀어나가는 경험을
                제공합니다.
              </p>
              <p className="reveal">
                <span className="blue">
                  엔터테인먼트 온라인 오디션 연계, 전문가 피드백, 유저끼리 정보를
                  나누는 커뮤니티까지!
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* cross-link to audition / team space */}
      <section className="section tight">
        <div className="wrap" style={{ textAlign: "center" }}>
          <div
            className="section-label reveal"
            style={{ display: "block", marginBottom: 28 }}
          >
            더 알아보기
          </div>
          <div
            className="reveal"
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button className="tag lg" onClick={() => go("audition")}>
              AUDITION →
            </button>
            <button className="tag lg" onClick={() => go("teamspace")}>
              TEAM SPACE →
            </button>
          </div>
        </div>
      </section>

      <ChallengeTeaser />
      <Footer go={go} />
    </div>
  );
}

/* ---------------- AUDITION ---------------- */
export function AuditionPage({
  banners,
  stats,
}: {
  banners: BannerDto[];
  stats: PublicStats | null;
}) {
  const ref = useReveal();
  return (
    <div className="page" ref={ref}>
      <section className="aud">
        <div className="wrap">
          <div className="ph">
            <Lockup />
            <Kinetic w1="AUDITION" w2="GODITION" />
            <div className="ph-sub reveal">
              GODITION과 함께 매월 진행되는 Global 오디션
            </div>
          </div>

          <AuditionBanners banners={banners} />

          <div className="aud-stats">
            <div className="aud-stat a reveal">
              <div className="as-k">누적 지원자 수</div>
              <div className="as-v">
                {fmt(stats?.totalApplications)}
                <small>명</small>
              </div>
              <div className="as-d">
                매 회차 글로벌 아티스트가 ZIGG x GODITION 오디션에 도전합니다.
              </div>
            </div>
            <div className="aud-stat b reveal">
              <div className="as-k">누적 오디션 수</div>
              <div className="as-v">
                {fmt(stats?.totalAuditions)}
                <small>회</small>
              </div>
              <div className="as-d">
                지금까지 ZIGG x GODITION에서 진행된 누적 오디션 횟수입니다.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee blue />
      <Footer />
    </div>
  );
}

/* ---------------- TEAM SPACE ---------------- */
export function TeamSpacePage() {
  const ref = useReveal();
  return (
    <div className="page" ref={ref}>
      <section className="ts">
        <div className="wrap">
          <div className="ph">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="z"
              src="/landing/zigg-icon.png"
              alt="ZIGG"
              style={{ width: 56, margin: "0 auto 22px" }}
            />
            <Kinetic w1="TEAM SPACE" w2="ZIGG" />
          </div>

          {/* SPACE — 멤버 초대 */}
          <div className="ts-block">
            <div className="tb-head reveal">
              <div className="lbl">SPACE</div>
              <div className="dsc">같이 공연을 준비할 멤버를 초대합니다.</div>
            </div>
            <div className="ts-space">
              <div className="reveal" style={{ maxWidth: 300, margin: "0 auto" }}>
                <div className="phone" style={{ width: 280 }}>
                  <div className="notch" />
                  <div className="phone-screen" style={{ background: "#fff" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/spaceMemberInvite.png"
                      alt="스페이스 멤버 초대"
                      style={{ objectPosition: "top" }}
                    />
                  </div>
                </div>
              </div>
              <div className="ts-annot">
                <div className="an">
                  <b>스페이스 이름을 정하고 팀을 만드세요</b>
                  <span>
                    함께 공연을 준비할 팀의 시작점. 한 스페이스에 모든 영상과
                    피드백이 모입니다.
                  </span>
                </div>
                <div className="an">
                  <b>닉네임 검색으로 멤버 초대</b>
                  <span>
                    함께할 동료를 닉네임으로 검색해 바로 스페이스에 초대할 수
                    있어요.
                  </span>
                </div>
                <div className="player reveal">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/landing/teamspace-1.png"
                    alt="전체화면 피드백"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* HISTORY — 연습 영상 업로드/피드백 */}
          <div className="ts-block">
            <div className="tb-head reveal">
              <div className="lbl">HISTORY</div>
              <div className="dsc">
                촬영한 연습 영상을 업로드하고 확인해볼 수 있어요.
              </div>
            </div>
            <div className="ts-history">
              <div className="reveal">
                <div className="player">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/landing/teamspace-2.png" alt="히스토리 상세" />
                </div>
              </div>
              <div className="ts-annot">
                <div className="an">
                  <b>각각의 영상을 HISTORY라고 부릅니다</b>
                  <span>
                    히스토리 안에서 간편하게 코멘트를 입력하면 팀 전체가 확인할
                    수 있어요.
                  </span>
                </div>
                <div className="an">
                  <b>핀 터치 시 코멘트로 타임스킵</b>
                  <span>
                    코멘트의 핀을 누르면 영상이 해당 구간으로 바로 이동합니다.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* KEY FUNCTION */}
          <div className="ts-block">
            <div
              className="section-label reveal"
              style={{ display: "block", fontSize: 22, letterSpacing: ".06em" }}
            >
              KEY FUNCTION
            </div>
            <div className="kf-grid">
              {KEYFUNCS.map((k, i) => (
                <div className="kf-card reveal" key={i}>
                  <div className="kf-n">{k.n}</div>
                  <div className="kf-pill">{k.pill}</div>
                  <div className="kf-shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={k.img} alt={k.title} />
                  </div>
                  <h4>{k.title}</h4>
                  <p>{k.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------------- CHALLENGE teaser ---------------- */
export function ChallengeTeaser() {
  const ref = useReveal();
  return (
    <section className="chl" ref={ref}>
      <div className="wrap">
        <div className="chl-inner reveal">
          <span className="soon-pill">◆ COMING SOON</span>
          <h2>
            ZIGG <span className="g">CHALLENGE</span>
          </h2>
          <p>
            같은 주제, 같은 무대. 아티스트들이 서로의 영상에 도전하고
            <br />
            전문가와 유저의 피드백으로 함께 성장하는 새로운 방식.
          </p>
          <div className="chl-row">
            <span className="tag">매월 새로운 챌린지</span>
            <span className="tag">랭킹 &amp; 투표</span>
            <span className="tag">전문가 심사</span>
          </div>
          <div className="chl-feat">
            <div>
              <b>주제별 챌린지</b>
              <span>댄스·보컬·랩 부문별 미션 공개</span>
            </div>
            <div>
              <b>피드백 배틀</b>
              <span>참가자 영상에 실시간 코멘트</span>
            </div>
            <div>
              <b>오디션 연계</b>
              <span>우수 참가자 GODITION 추천</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
export function Footer({ go }: { go?: (t: Tab) => void }) {
  return (
    <footer className="ft">
      <div className="wrap ft-grid">
        <div>
          <div className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/landing/zigg-icon.png" alt="" />
            <b>ZIGG</b>
          </div>
          <p className="ft-desc">공연예술의 모든 순간을 당신과 함께합니다.</p>
          <div className="ft-store">
            <a href={LINKS.appStore} target="_blank" rel="noopener noreferrer">
              App Store
            </a>
            <a href={LINKS.googlePlay} target="_blank" rel="noopener noreferrer">
              Google Play
            </a>
          </div>
        </div>
        <div className="ft-cols">
          <div className="ft-col">
            <h5>Product</h5>
            <a onClick={() => go?.("main")}>메인</a>
            <a onClick={() => go?.("audition")}>Audition</a>
            <a onClick={() => go?.("teamspace")}>Team Space</a>
            <a>
              Challenge{" "}
              <span style={{ color: "var(--violet-soft)", fontSize: 11 }}>
                SOON
              </span>
            </a>
          </div>
          <div className="ft-col">
            <h5>Company</h5>
            <a>About</a>
            <a>Team ZIGG</a>
            <a>Partners</a>
            <a href={`mailto:${LINKS.contactEmail}`}>{LINKS.contactEmail}</a>
          </div>
          <div className="ft-col">
            <h5>Follow</h5>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </div>
        </div>
      </div>
      <div className="wrap ft-base">
        <span>© 2025 ZIGG. All rights reserved.</span>
        <span>이용약관 · 개인정보처리방침</span>
      </div>
    </footer>
  );
}
